import { PatternData } from './types';
import { DecompositionRiskAnalyticsVisual } from '@/components/visualization/business-use-cases/DecompositionRiskAnalyticsVisual';

// Pattern 2: Schema-Aware Task Decomposition
// Purpose: Convert a natural language analytic / data transformation request into a dependency-ordered
// subtask graph whose references are validated against actual schema entities (tables, columns, views, metrics).
// Emphasizes preventing over/under decomposition and eliminating hallucinated columns.

export const schemaAwareDecompositionPattern: PatternData = {
  id: 'schema-aware-decomposition',
  name: 'Schema-Aware Task Decomposition',
  description: 'Decomposes natural language data tasks into validated, schema-grounded subgoals with dependency ordering. Depends on Perception Normalization (Pattern 1) and feeds Budget-Constrained Execution (Pattern 3).',
  category: 'Data Autonomy',
  relatedPatterns: [
    'perception-normalization',
    'budget-constrained-execution',
    'action-grounding-verification',
    'policy-gated-tool-invocation',
    'data-quality-feedback-repair-loop',
    'query-intent-structured-access',
    'strategy-memory-replay'
  ],
  businessUseCase: {
    industry: 'Finance - Risk Analytics',
    description: 'Risk team asks: “Generate a daily VaR anomaly investigation workflow.” Schema-aware decomposition expands this into validated feature extraction, aggregation, residual analysis, and reporting subtasks referencing only approved fact tables.',
  visualization: DecompositionRiskAnalyticsVisual,
    enlightenMePrompt: 'Explain how schema-aware decomposition prevents hallucinated joins in a Value-at-Risk investigative pipeline.'
  },
  nodes: [
    { id: 'request', type: 'input', data: { label: 'User Task', nodeType: 'input' }, position: { x: 80, y: 180 } },
    { id: 'infobox', type: 'default', data: { label: 'Perception Info Box', nodeType: 'aggregator' }, position: { x: 260, y: 120 } },
    { id: 'candidate', type: 'default', data: { label: 'Candidate Subtasks', nodeType: 'planner' }, position: { x: 260, y: 240 } },
    { id: 'validator', type: 'default', data: { label: 'Schema Validator', nodeType: 'evaluator' }, position: { x: 460, y: 180 } },
    { id: 'optimizer', type: 'default', data: { label: 'Decomposition Optimizer', nodeType: 'router' }, position: { x: 660, y: 180 } },
    { id: 'plan', type: 'output', data: { label: 'Executable Plan Graph', nodeType: 'output' }, position: { x: 880, y: 180 } }
  ],
  edges: [
    { id: 'e1', source: 'request', target: 'candidate', animated: true },
    { id: 'e2', source: 'infobox', target: 'candidate', animated: true },
    { id: 'e3', source: 'candidate', target: 'validator', animated: true },
    { id: 'e4', source: 'validator', target: 'optimizer', animated: true },
    { id: 'e5', source: 'optimizer', target: 'plan', animated: true },
    { id: 'e6', source: 'optimizer', target: 'candidate', label: 'Refine', animated: true }
  ],
  useCases: [
    'Transform “find top churn predictors” → structured feature engineering + modeling steps',
    'Convert reporting request into validated SQL + aggregation workflow',
    'Prepare multi-stage anomaly analysis pipeline definition'
  ],
  whenToUse: 'Use whenever user requests reference enterprise data assets and require multi-step reasoning or transformations with strict schema adherence.',
  advantages: [
    'Eliminates hallucinated tables/columns early',
    'Provides deterministic dependency ordering',
    'Improves cost control by avoiding unnecessary subtasks'
  ],
  limitations: [
    'Requires up-to-date perception info box (Pattern 1)',
    'May under-decompose highly novel tasks without memory augmentation',
    'Adds initial latency vs naive direct generation'
  ],
  implementation: [
    'Step 1: Ingest perception artifact (schema + profiles + governance).',
    'Step 2: Generate first-pass subtask list using LLM (CoT / tree prompt).',
    'Step 3: Validate each subtask’s referenced entities against schema (reject & annotate misses).',
    'Step 4: Score decomposition quality: coverage, redundancy, dependency ambiguity.',
    'Step 5: Optimize: merge trivial subtasks, split overloaded ones (token & complexity heuristics).',
    'Step 6: Emit plan graph JSON (nodes + edges + resource hints).'
  ],
  codeExample: `// TypeScript skeleton
interface Subtask { id: string; goal: string; inputs: string[]; outputs: string[]; entities: string[]; valid: boolean; }
interface PlanGraph { nodes: Subtask[]; edges: Array<{ from: string; to: string; reason: string }>; quality: Record<string, number>; }

export async function decomposeTask(task: string, infoBox: any, llm: any, schemaIndex: Set<string>): Promise<PlanGraph> {
  const draft = await llm.generateSubtasks(task, infoBox); // returns array of candidate subtasks
  const validated: Subtask[] = draft.map((s: any, i: number) => ({
    id: 'st_' + (i + 1),
    goal: s.goal,
    inputs: s.inputs || [],
    outputs: s.outputs || [],
    entities: (s.entities || []).filter((e: string) => schemaIndex.has(e)),
    valid: (s.entities || []).every((e: string) => schemaIndex.has(e))
  }));
  // Simple dependency inference: if output name appears in another inputs
  const edges: PlanGraph['edges'] = [];
  for (const a of validated) {
    for (const b of validated) {
      if (a.id !== b.id && a.outputs.some(o => b.inputs.includes(o))) {
        edges.push({ from: a.id, to: b.id, reason: 'output->input' });
      }
    }
  }
  const quality = { coverage: validated.filter(v => v.valid).length / validated.length, total: validated.length };
  return { nodes: validated, edges, quality };
}
`,
  pythonCodeExample: `# Python skeleton
from typing import List, Dict, Any

def decompose_task(task: str, info_box: Dict[str, Any], llm, schema_index: set):
    draft = llm.generate_subtasks(task, info_box)
    validated = []
    for i, s in enumerate(draft):
        entities = [e for e in s.get('entities', []) if e in schema_index]
        validated.append({
            'id': f'st_{i+1}',
            'goal': s.get('goal'),
            'inputs': s.get('inputs', []),
            'outputs': s.get('outputs', []),
            'entities': entities,
            'valid': all(e in schema_index for e in s.get('entities', []))
        })
    edges = []
    for a in validated:
        for b in validated:
            if a['id'] != b['id']:
                if any(o in b['inputs'] for o in a['outputs']):
                    edges.append({'from': a['id'], 'to': b['id'], 'reason': 'output->input'})
    quality = { 'coverage': len([v for v in validated if v['valid']]) / (len(validated) or 1), 'total': len(validated) }
    return { 'nodes': validated, 'edges': edges, 'quality': quality }
`,
  completeCode: ''
};
