import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const root = process.cwd();
const conceptsTs = path.join(root, 'src', 'lib', 'data', 'conceptContent.ts');
const conceptsHubTsx = path.join(root, 'src', 'components', 'concepts', 'ConceptsHub.tsx');
const outDir = path.join(root, 'data', 'export');

function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }

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
      else if (ts.isObjectLiteralExpression(el)) {
        const o = objectLiteralToJs(el);
        if (o) arr.push(o);
      }
      // skip unsupported elements (identifiers, jsx, etc.)
    }
    return arr;
  }
  if (ts.isObjectLiteralExpression(node)) return objectLiteralToJs(node);
  return undefined;
}

function objectLiteralToJs(obj) {
  const out = {};
  for (const prop of obj.properties) {
    if (!ts.isPropertyAssignment(prop)) continue;
    const name = ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name) ? prop.name.text : undefined;
    if (!name) continue;
    const val = literalToJs(prop.initializer);
    if (val === undefined) continue; // ignore unsupported shapes (e.g., JSX, functions)
    out[name] = val;
  }
  return out;
}

function extractExportedArray(filePath, varName) {
  const sourceText = fs.readFileSync(filePath, 'utf-8');
  const sf = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let items = null;
  function visit(node) {
  if (ts.isVariableStatement(node)) {
      for (const decl of node.declarationList.declarations) {
        const name = ts.isIdentifier(decl.name) ? decl.name.text : undefined;
        const init = decl.initializer;
        if (name === varName && init && ts.isArrayLiteralExpression(init)) {
          const out = [];
          for (const el of init.elements) {
            if (!ts.isObjectLiteralExpression(el)) continue;
            const js = objectLiteralToJs(el);
            if (js) out.push(js);
          }
          items = out;
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(sf);
  return items || [];
}

function main() {
  // Extract ConceptsHub list (22 items) and map to ConceptContent-like shape (hub-only)
  const hubItemsRaw = extractExportedArray(conceptsHubTsx, 'concepts');
  const fromHub = hubItemsRaw.map(it => ({
    id: it.id,
    name: it.title || it.name || it.id,
    description: it.description || '',
    keyFeatures: [],
    applicationAreas: [],
    technicalDetails: '',
    implementationConsiderations: [],
    examples: [],
  })).filter(x => x && x.id && x.name);
  // Dedupe by id (hub list should be authoritative)
  const byId = new Map();
  for (const c of fromHub) if (!byId.has(c.id)) byId.set(c.id, c);
  const items = Array.from(byId.values());

  ensureDir(outDir);
  const outPath = path.join(outDir, 'core_concepts.json');
  fs.writeFileSync(outPath, JSON.stringify(items, null, 2), 'utf-8');
  console.log(`Wrote ${items.length} concepts to ${outPath}`);
}

main();
