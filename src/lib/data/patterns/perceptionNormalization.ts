import { PatternData } from './types';
import { PerceptionHealthcareVisual } from '@/components/visualization/business-use-cases/PerceptionHealthcareVisual';

// Perception Normalization Pattern
// Goal: Convert raw enterprise data context (schemas, sample stats, lineage, constraints) into a structured
// canonical "info box" artifact that downstream planning / decomposition steps can reliably consume.
// Inspired by DataAgent research emphasizing perception → planning separation and schema-grounded reasoning.

export const perceptionNormalizationPattern: PatternData = {
  id: 'perception-normalization',
  name: 'Perception Normalization',
  description: 'Transforms raw, heterogeneous data context into a validated, task-scoped info box for reliable downstream planning.',
  category: 'Data Autonomy',
  // Back-links expanded to include the extended Data Autonomy family
  relatedPatterns: [
    'schema-aware-decomposition',
    'action-grounding-verification',
    'budget-constrained-execution',
    'policy-gated-tool-invocation',
    'data-quality-feedback-repair-loop',
    'query-intent-structured-access',
    'strategy-memory-replay'
  ],
  businessUseCase: {
    industry: 'Healthcare Analytics',
    description: 'Before generating cohort risk stratification workflows, the agent assembles a compact InfoBox summarizing patient encounter tables, lab result distributions, PHI sensitivity tags, and freshness windows to ground safe planning.',
  visualization: PerceptionHealthcareVisual,
    enlightenMePrompt: 'Describe how a perception normalization layer reduces PHI exposure and token cost in healthcare analytics agents.'
  },
  // Minimal visualization graph (can be expanded later)
  nodes: [
    { id: 'sources', type: 'input', data: { label: 'Data Sources', nodeType: 'input' }, position: { x: 100, y: 200 } },
    { id: 'profilers', type: 'default', data: { label: 'Profilers', nodeType: 'tool' }, position: { x: 300, y: 160 } },
    { id: 'governance', type: 'default', data: { label: 'Governance Tags', nodeType: 'evaluator' }, position: { x: 300, y: 240 } },
    { id: 'assembler', type: 'default', data: { label: 'InfoBox Assembler', nodeType: 'aggregator' }, position: { x: 520, y: 200 } },
    { id: 'cache', type: 'default', data: { label: 'Cache & Hash', nodeType: 'router' }, position: { x: 720, y: 200 } },
    { id: 'output', type: 'output', data: { label: 'Canonical Info Box', nodeType: 'output' }, position: { x: 920, y: 200 } }
  ],
  edges: [
    { id: 'e1', source: 'sources', target: 'profilers', animated: true },
    { id: 'e2', source: 'sources', target: 'governance', animated: true },
    { id: 'e3', source: 'profilers', target: 'assembler', animated: true },
    { id: 'e4', source: 'governance', target: 'assembler', animated: true },
    { id: 'e5', source: 'assembler', target: 'cache', animated: true },
    { id: 'e6', source: 'cache', target: 'output' }
  ],
  useCases: [
    'Prepare enterprise table + semantic metadata for autonomous agents',
    'Stabilize NL → plan decomposition with schema-grounded context',
    'Improve reliability of Text-to-SQL / feature synthesis start states'
  ],
  whenToUse: 'Use whenever tasks reference structured data and you need to prevent schema hallucination, misaligned assumptions, or brittle prompt injection of raw catalog dumps.',
  implementation: [
    'Step 1: Collect sources (catalog API, profiling service, lineage, sample rows)',
    'Step 2: Profile & summarize (null %, distinct ratios, distribution sketches)',
    'Step 3: Extract governance tags (sensitivity, ownership, SLA)',
    'Step 4: Generate condensed canonical JSON (info box) within size budget',
    'Step 5: Validate (schema hash, freshness timestamp, size limit)',
    'Step 6: Emit hash-based cache key + telemetry (perception_success event)'
  ],
  advantages: [
    'Prevents schema hallucination and column misuse',
    'Reduces token footprint via structured compression',
    'Improves downstream planning determinism'
  ],
  limitations: [
    'Upfront profiling cost on very large datasets',
    'Needs re-generation on schema drift events',
    'Over-aggressive compaction may remove rare but important columns'
  ],
  codeExample: `// TypeScript skeleton for Perception Normalization
import crypto from 'crypto';

interface TableProfile { table: string; columns: Array<{ name: string; type: string; nullPct: number; distinctPct: number }>; rowsSampled: number; }
interface GovernanceTag { name: string; value: string; }
interface InfoBox { schema: any; profiles: TableProfile[]; constraints: any[]; lineage: any[]; governance: GovernanceTag[]; generatedAt: string; version: string; hash: string; }

export async function buildPerceptionInfoBox(inputs: { tables: string[]; catalogClient: any; profiler: any; lineageClient: any; governanceClient: any; maxBytes?: number }): Promise<InfoBox> {
  const profiles: TableProfile[] = [];
  for (const table of inputs.tables) {
    const meta = await inputs.catalogClient.getSchema(table);
    const prof = await inputs.profiler.profile(table, { sample: 5000 });
    profiles.push({ table, columns: prof.columns, rowsSampled: prof.rowsSampled });
  }
  const lineage = await inputs.lineageClient.getLineage(inputs.tables);
  const governance = await inputs.governanceClient.getTags(inputs.tables);
  const infoBox: InfoBox = {
    schema: profiles.map(p => ({ table: p.table, columns: p.columns.map(c => ({ name: c.name, type: c.type })) })),
    profiles,
    constraints: [],
    lineage,
    governance,
    generatedAt: new Date().toISOString(),
    version: 'v1',
    hash: ''
  };
  const raw = Buffer.from(JSON.stringify(infoBox));
  if (inputs.maxBytes && raw.byteLength > inputs.maxBytes) {
    // Simple truncation heuristic: drop detailed distribution fields if present
    // In production: apply semantic compaction strategies.
    while (raw.byteLength > inputs.maxBytes && infoBox.profiles.length > 0) {
      infoBox.profiles.pop();
    }
  }
  infoBox.hash = crypto.createHash('sha256').update(JSON.stringify(infoBox)).digest('hex').slice(0, 16);
  return infoBox;
}
`,
  pythonCodeExample: `# Python skeleton for Perception Normalization
import hashlib, json, datetime

def build_perception_info_box(tables, catalog_client, profiler, lineage_client, governance_client, max_bytes=None):
    profiles = []
    for table in tables:
        meta = catalog_client.get_schema(table)
        prof = profiler.profile(table, sample=5000)
        profiles.append({
            'table': table,
            'columns': prof['columns'],
            'rowsSampled': prof['rowsSampled']
        })
    lineage = lineage_client.get_lineage(tables)
    governance = governance_client.get_tags(tables)
    info_box = {
        'schema': [{ 'table': p['table'], 'columns': [{ 'name': c['name'], 'type': c['type'] } for c in p['columns']] } for p in profiles],
        'profiles': profiles,
        'constraints': [],
        'lineage': lineage,
        'governance': governance,
        'generatedAt': datetime.datetime.utcnow().isoformat(),
        'version': 'v1'
    }
    raw = json.dumps(info_box).encode('utf-8')
    if max_bytes and len(raw) > max_bytes:
        while len(raw) > max_bytes and len(info_box['profiles']) > 0:
            info_box['profiles'].pop()
            raw = json.dumps(info_box).encode('utf-8')
    info_box['hash'] = hashlib.sha256(json.dumps(info_box).encode('utf-8')).hexdigest()[:16]
    return info_box
`,
  completeCode: ''
};
