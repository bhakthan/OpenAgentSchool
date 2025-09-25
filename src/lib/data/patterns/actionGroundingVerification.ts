import { PatternData } from './types';
import { ActionGroundingFinanceVisual } from '@/components/visualization/business-use-cases/ActionGroundingFinanceVisual';

// Pattern 4: Action Grounding & Verification
// Purpose: Convert abstract plan steps into executable code / tool calls with multilayer validation (syntax,
// schema, policy, dry-run) before real execution. Reduces runtime failures & hallucinated operations.

export const actionGroundingVerificationPattern: PatternData = {
  id: 'action-grounding-verification',
  name: 'Action Grounding & Verification',
  description: 'Grounds abstract agent actions into validated code or tool calls with preflight checks and dry-run execution. Consumes plan steps (Pattern 2) and supplies safe actions to execution loop (Pattern 3).',
  category: 'Data Autonomy',
  relatedPatterns: [
    'schema-aware-decomposition',
    'budget-constrained-execution',
    'perception-normalization',
    'policy-gated-tool-invocation',
    'data-quality-feedback-repair-loop',
    'query-intent-structured-access',
    'strategy-memory-replay'
  ],
  businessUseCase: {
    industry: 'Financial Data Engineering',
    description: 'Before altering a risk factor table, the agent generates a candidate SQL repair script, validates schema + policy (no PII leakage, no full table scans), dry-runs, then emits an approved action artifact.',
  visualization: ActionGroundingFinanceVisual,
    enlightenMePrompt: 'Describe layered validation sequence for grounding a VaR factor table repair SQL statement.'
  },
  nodes: [
    { id: 'planStep', type: 'input', data: { label: 'Plan Step', nodeType: 'input' }, position: { x: 80, y: 200 } },
    { id: 'generator', type: 'default', data: { label: 'Grounding Generator', nodeType: 'llm' }, position: { x: 260, y: 160 } },
    { id: 'schemaCheck', type: 'default', data: { label: 'Schema Check', nodeType: 'evaluator' }, position: { x: 440, y: 120 } },
    { id: 'policy', type: 'default', data: { label: 'Policy Gate', nodeType: 'evaluator' }, position: { x: 440, y: 240 } },
    { id: 'dryRun', type: 'default', data: { label: 'Dry Run Sandbox', nodeType: 'tool' }, position: { x: 640, y: 180 } },
    { id: 'approved', type: 'output', data: { label: 'Approved Action', nodeType: 'output' }, position: { x: 860, y: 180 } }
  ],
  edges: [
    { id: 'a1', source: 'planStep', target: 'generator', animated: true },
    { id: 'a2', source: 'generator', target: 'schemaCheck', animated: true },
    { id: 'a3', source: 'generator', target: 'policy', animated: true },
    { id: 'a4', source: 'schemaCheck', target: 'dryRun', animated: true },
    { id: 'a5', source: 'policy', target: 'dryRun', animated: true },
    { id: 'a6', source: 'dryRun', target: 'approved', animated: true },
    { id: 'a7', source: 'schemaCheck', target: 'generator', label: 'Fix', animated: true },
    { id: 'a8', source: 'policy', target: 'generator', label: 'Rewrite', animated: true }
  ],
  useCases: [
    'Generate safe SQL with schema + policy preflight',
    'Produce pandas feature engineering code with validation & rollback',
    'Prepare data repair scripts with dry-run verification'
  ],
  whenToUse: 'Use whenever executing generated code / tool invocations carries risk of schema errors, policy violations, or unintended side effects.',
  advantages: [
    'Reduces execution-time failures',
    'Enforces governance before side effects',
    'Produces auditable grounding trace'
  ],
  limitations: [
    'Adds latency (multi-stage validation)',
    'Requires sandbox or read-only environment',
    'Complex policy expressions may require separate engine'
  ],
  implementation: [
    'Step 1: Generate candidate action (SQL / code / tool params) with justification.',
    'Step 2: Static validation (syntax parse, column existence, join safety).',
    'Step 3: Policy gate (sensitivity tags, allowed operations, row filters).',
    'Step 4: Dry run / sandbox execute (no side effects) capturing row counts & schema.',
    'Step 5: If failures → regenerate with error context (bounded retries).',
    'Step 6: Emit approved action + provenance hash + metrics.'
  ],
  codeExample: `// TypeScript grounding skeleton
interface GroundingInput { planStep: string; intent: string; }
interface GroundedAction { code: string; type: 'sql'|'python'|'tool'; valid: boolean; policyPassed: boolean; dryRunResult?: any; errors: string[]; }

export async function groundAndVerify(input: GroundingInput, toolset: any, validators: any): Promise<GroundedAction> {
  for (let attempt=0; attempt<3; attempt++) {
    const draft = await toolset.llm.generateAction(input.intent, input.planStep);
    const syntaxOk = validators.syntax(draft.code);
    const schemaOk = syntaxOk && validators.schema(draft.code);
    const policyOk = schemaOk && validators.policy(draft.code);
    if (!policyOk) continue;
    const dry = await validators.dryRun(draft.code);
    if (dry.success) return { code: draft.code, type: draft.type, valid: true, policyPassed: true, dryRunResult: dry, errors: [] };
  }
  return { code: '', type: 'sql', valid: false, policyPassed: false, errors: ['GroundingFailed'] };
}
`,
  pythonCodeExample: `# Python grounding skeleton
def ground_and_verify(plan_step: str, intent: str, toolset, validators):
    for attempt in range(3):
        draft = toolset.llm.generate_action(intent, plan_step)
        if not validators.syntax(draft['code']):
            continue
        if not validators.schema(draft['code']):
            continue
        if not validators.policy(draft['code']):
            continue
        dry = validators.dry_run(draft['code'])
        if dry['success']:
            return { 'code': draft['code'], 'type': draft.get('type','sql'), 'valid': True, 'policyPassed': True, 'dryRunResult': dry, 'errors': [] }
    return { 'code': '', 'type': 'sql', 'valid': False, 'policyPassed': False, 'errors': ['GroundingFailed'] }
`,
  completeCode: ''
};
