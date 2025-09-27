import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

const root = process.cwd()
const patternsDir = path.join(root, 'src', 'lib', 'data', 'patterns')
const outDir = path.join(root, 'data', 'export')

function ensureDir(p) { fs.mkdirSync(p, { recursive: true }) }

function isSkippableFile(name) {
  return /^(index\.|types\.|README|__).*$/i.test(name)
}

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
        const child = objectLiteralToJs(el)
        if (child) arr.push(child)
      }
      // ignore unsupported entries
    }
    return arr
  }
  if (ts.isObjectLiteralExpression(node)) return objectLiteralToJs(node)
  // unsupported (identifiers, function calls, jsx, etc.)
  return undefined
}

function objectLiteralToJs(obj) {
  const out = {}
  for (const prop of obj.properties) {
    if (!ts.isPropertyAssignment(prop)) continue
    const name = ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name) ? prop.name.text : undefined
    if (!name) continue
    const val = literalToJs(prop.initializer)
    if (val !== undefined) out[name] = val
  }
  return out
}

function extractExportedPatternObject(filePath) {
  const sourceText = fs.readFileSync(filePath, 'utf-8')
  const sf = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true)
  let pattern = null
  function visit(node) {
    if (ts.isVariableStatement(node) && node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
      for (const decl of node.declarationList.declarations) {
        const name = ts.isIdentifier(decl.name) ? decl.name.text : undefined
        const init = decl.initializer
        if (name && /Pattern$/.test(name) && init && ts.isObjectLiteralExpression(init)) {
          pattern = objectLiteralToJs(init)
        }
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)
  if (!pattern) return null
  // Select only serializable and relevant fields
  const {
    id, name, description, category,
    useCases, whenToUse, advantages, limitations, relatedPatterns,
    implementation, codeExample, pythonCodeExample, completeCode,
    codeVisualizer, evaluation, evaluationProfile,
    nodes, edges, businessUseCase,
  } = pattern
  const business = businessUseCase ? {
    industry: businessUseCase.industry,
    description: businessUseCase.description,
    enlightenMePrompt: businessUseCase.enlightenMePrompt,
  } : undefined
  return {
    id, name, description, category,
    useCases, whenToUse, advantages, limitations, relatedPatterns,
    implementation, codeExample, pythonCodeExample, completeCode,
    codeVisualizer, evaluation, evaluationProfile,
    nodes, edges, businessUseCase: business,
  }
}

function extractNamedExport(filePath, exportName) {
  const sourceText = fs.readFileSync(filePath, 'utf-8')
  const sf = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true)
  let value = null

  function visit(node) {
    if (
      ts.isVariableStatement(node) &&
      node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      for (const decl of node.declarationList.declarations) {
        const name = ts.isIdentifier(decl.name) ? decl.name.text : undefined
        const init = decl.initializer
        if (name === exportName && init) {
          const literal = literalToJs(init)
          if (literal !== undefined) {
            value = literal
          }
        }
      }
    }
    ts.forEachChild(node, visit)
  }

  visit(sf)
  return value
}

function main() {
  const files = fs.readdirSync(patternsDir)
    .filter(f => (f.endsWith('.ts') || f.endsWith('.tsx')) && !isSkippableFile(f))
    .map(f => path.join(patternsDir, f))

  const items = []
  for (const file of files) {
    try {
      const obj = extractExportedPatternObject(file)
      if (obj && obj.id && obj.name) items.push(obj)
    } catch (e) {
      // skip file on parse error
    }
  }

  const evaluationRegistryPath = path.join(patternsDir, 'evaluationRegistry.ts')
  let evaluationRegistry = {}
  if (fs.existsSync(evaluationRegistryPath)) {
    const extracted = extractNamedExport(evaluationRegistryPath, 'patternEvaluationRegistry')
    if (extracted && typeof extracted === 'object') {
      evaluationRegistry = extracted
    }
  }

  for (const item of items) {
    const profile = evaluationRegistry?.[item.id]
    if (profile) {
      item.evaluationProfile = profile
    }
  }

  // Deduplicate by id (prefer first)
  const seen = new Set()
  const unique = []
  for (const it of items) {
    if (seen.has(it.id)) continue
    seen.add(it.id)
    unique.push(it)
  }

  ensureDir(outDir)
  const outPath = path.join(outDir, 'agent_patterns.json')
  fs.writeFileSync(outPath, JSON.stringify(unique, null, 2), 'utf-8')
  console.log(`Wrote ${unique.length} agent patterns to ${outPath}`)
}

main()
