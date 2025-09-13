import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

const root = process.cwd()
const skillsTsx = path.join(root, 'src', 'components', 'ai-skills', 'AISkillsExplorer.tsx')
const outDir = path.join(root, 'data', 'export')

function ensureDir(p) { fs.mkdirSync(p, { recursive: true }) }

function literalToJs(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  if (ts.isNumericLiteral(node)) return Number(node.text)
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false
  if (ts.isArrayLiteralExpression(node)) {
    const arr = []
    for (const el of node.elements) {
      if (ts.isStringLiteral(el) || ts.isNoSubstitutionTemplateLiteral(el)) arr.push(el.text)
      else if (ts.isNumericLiteral(el)) arr.push(Number(el.text))
      else if (ts.isObjectLiteralExpression(el)) {
        const o = objectLiteralToJs(el)
        if (o) arr.push(o)
      }
    }
    return arr
  }
  if (ts.isObjectLiteralExpression(node)) return objectLiteralToJs(node)
  return undefined
}

function objectLiteralToJs(obj) {
  const out = {}
  for (const prop of obj.properties) {
    if (!ts.isPropertyAssignment(prop)) continue
    const name = ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name) ? prop.name.text : undefined
    if (!name) continue
    const val = literalToJs(prop.initializer)
    if (val === undefined) continue
    out[name] = val
  }
  return out
}

function extractTabs(filePath) {
  const text = fs.readFileSync(filePath, 'utf-8')
  const sf = ts.createSourceFile(filePath, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  let items = []
  function visit(node) {
    if (ts.isVariableStatement(node)) {
      for (const decl of node.declarationList.declarations) {
        const name = ts.isIdentifier(decl.name) ? decl.name.text : undefined
        const init = decl.initializer
        if (name === 'tabs' && init && ts.isArrayLiteralExpression(init)) {
          const out = []
          for (const el of init.elements) {
            if (!ts.isObjectLiteralExpression(el)) continue
            const js = objectLiteralToJs(el)
            if (js) out.push(js)
          }
          items = out
        }
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)
  return items
}

function main() {
  const raw = extractTabs(skillsTsx)
  const items = raw.map((it, idx) => ({
    id: it.id,
    title: it.title || it.name || it.id,
    description: it.description || '',
    level: it.level || '',
    order: idx,
  })).filter(x => x && x.id && x.title)

  ensureDir(outDir)
  const outPath = path.join(outDir, 'ai_skills.json')
  fs.writeFileSync(outPath, JSON.stringify(items, null, 2), 'utf-8')
  console.log(`Wrote ${items.length} AI-native skills to ${outPath}`)
}

main()
