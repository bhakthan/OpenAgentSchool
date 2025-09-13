// Extract Study Mode questions and quizzes from TS data files into CSVs.
// Outputs:
// - data/export/curated_questions.csv (columns compatible with DuckDB ingestion)
// - data/export/quizzes_full.csv (includes options and correct answers)

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';

const root = process.cwd();
const quizDir = path.join(root, 'src', 'lib', 'data', 'quizzes');
const studyDir = path.join(root, 'src', 'lib', 'data', 'studyMode');
const outDir = path.join(root, 'data', 'export');

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function listTsFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir)) {
    const p = path.join(dir, entry);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      out.push(...listTsFiles(p));
    } else if (entry.endsWith('.ts')) {
      out.push(p);
    }
  }
  return out;
}

function evalCjs(code, filename) {
  const sandbox = {
    module: { exports: {} },
    exports: {},
    require: () => { throw new Error('require disabled in sandbox'); },
    __dirname: path.dirname(filename),
    __filename: filename,
    console,
  };
  vm.createContext(sandbox);
  const script = new vm.Script(code, { filename });
  script.runInContext(sandbox);
  return sandbox.module.exports;
}

function toCsvCell(v) {
  if (v === null || v === undefined) return '';
  const s = String(v);
  if (s.includes('"') || s.includes(',') || s.includes('\n')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function writeCsv(filePath, headers, rows) {
  ensureDir(path.dirname(filePath));
  const lines = [headers.join(',')];
  for (const r of rows) {
    lines.push(headers.map(h => toCsvCell(r[h])).join(','));
  }
  fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
}

function literalToJs(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (ts.isArrayLiteralExpression(node)) {
    const arr = [];
    for (const el of node.elements) {
      if (ts.isStringLiteral(el) || ts.isNoSubstitutionTemplateLiteral(el)) arr.push(el.text);
      else if (ts.isNumericLiteral(el)) arr.push(Number(el.text));
      else if (ts.isObjectLiteralExpression(el)) arr.push(objectLiteralToJs(el));
      else return undefined; // unsupported
    }
    return arr;
  }
  if (ts.isObjectLiteralExpression(node)) return objectLiteralToJs(node);
  return undefined; // unsupported expr
}

function objectLiteralToJs(obj) {
  const out = {};
  for (const prop of obj.properties) {
    if (!ts.isPropertyAssignment(prop)) return undefined;
    const name = ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name) ? prop.name.text : undefined;
    if (!name) return undefined;
    const val = literalToJs(prop.initializer);
    if (val === undefined) return undefined;
    out[name] = val;
  }
  return out;
}

function extractArraysFromTsFile(filePath) {
  const sourceText = fs.readFileSync(filePath, 'utf-8');
  const sf = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true);
  const arrays = [];
  function visit(node) {
    if (ts.isVariableStatement(node) && node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
      for (const decl of node.declarationList.declarations) {
        const name = ts.isIdentifier(decl.name) ? decl.name.text : undefined;
        const init = decl.initializer;
        if (!name || !init) continue;
        if (ts.isArrayLiteralExpression(init)) {
          const items = [];
          let supported = true;
          for (const el of init.elements) {
            if (!ts.isObjectLiteralExpression(el)) { supported = false; break; }
            const js = objectLiteralToJs(el);
            if (js === undefined) { supported = false; break; }
            items.push(js);
          }
          if (supported && items.length) arrays.push({ name, items });
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(sf);
  return arrays;
}

function normalizeItem(it, sourceFile) {
  const id = it.id || it.slug || it.key || Math.random().toString(36).slice(2);
  const question = it.question || it.text || it.prompt || '';
  const difficulty = it.difficulty || '';
  const topic = it.category || it.topic || '';
  const subtopic = it.subCategory || it.subtopic || '';
  const tagsArr = it.tags || it.relatedTopics || it.relatedConcepts || [];
  const tags = Array.isArray(tagsArr) ? tagsArr.join('|') : String(tagsArr || '');
  const options = Array.isArray(it.options) ? it.options : null;
  const correctIndex = typeof it.correctAnswer === 'number' ? it.correctAnswer : null;
  const correctText = options && correctIndex != null && options[correctIndex] != null ? options[correctIndex] : '';
  const explanation = it.explanation || '';
  return {
    id,
    question_text: question,
    difficulty,
    topic,
    subtopic,
    tags,
    source_file: path.relative(root, sourceFile).replace(/\\/g, '/'),
    options_json: options ? JSON.stringify(options) : '',
    correct_answer_index: correctIndex != null ? String(correctIndex) : '',
    correct_answer_text: correctText,
    explanation,
  };
}

function main() {
  const files = [...listTsFiles(quizDir), ...listTsFiles(studyDir)].filter(f => !/index\.ts$/.test(f));
  const curatedRows = [];
  const quizRows = [];
  for (const f of files) {
    try {
      const arrays = extractArraysFromTsFile(f);
      if (!arrays.length) continue;
      for (const arr of arrays) {
        for (const it of arr.items) {
          const row = normalizeItem(it, f);
          curatedRows.push({
            id: row.id,
            topic: row.topic,
            subtopic: row.subtopic,
            difficulty: row.difficulty,
            question_text: row.question_text,
            tags: row.tags,
            source_url: '',
            tenant_id: '',
          });
          quizRows.push(row);
        }
      }
    } catch (e) {
      console.warn('Skip file (parse error):', f, e.message);
    }
  }
  writeCsv(path.join(outDir, 'curated_questions.csv'),
    ['id','topic','subtopic','difficulty','question_text','tags','source_url','tenant_id'], curatedRows);
  writeCsv(path.join(outDir, 'quizzes_full.csv'),
    ['id','topic','subtopic','difficulty','question_text','tags','source_file','options_json','correct_answer_index','correct_answer_text','explanation'], quizRows);
  console.log(`Wrote ${curatedRows.length} curated rows and ${quizRows.length} quiz rows to ${outDir}`);
}

main();
