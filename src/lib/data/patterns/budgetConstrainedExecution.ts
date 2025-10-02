import { PatternData } from './types';
import { BudgetExecutionEcommerceVisual } from '@/components/visualization/business-use-cases/BudgetExecutionEcommerceVisual';

// Pattern 3: Budget-Constrained Closed-Loop Execution
// Purpose: Execute a validated plan graph (from schema-aware decomposition) while enforcing token/tool/latency budgets
// and adaptive early stopping. Integrates retry heuristics and success criteria gating.

export const budgetConstrainedExecutionPattern: PatternData = {
  id: 'budget-constrained-execution',
  name: 'Budget-Constrained Execution Loop',
  description: 'Executes plan steps with strict attempt, token, and latency budgets; adapts refinement and early stop decisions. Depends on validated plan (Pattern 2) and grounded actions (Pattern 4).',
  category: 'Data Autonomy',
  relatedPatterns: [
    'schema-aware-decomposition',
    'action-grounding-verification',
    'perception-normalization',
    'policy-gated-tool-invocation',
    'data-quality-feedback-repair-loop',
    'query-intent-structured-access',
    'strategy-memory-replay'
  ],
  businessUseCase: {
    industry: 'E-Commerce Analytics',
    description: 'An autonomous merchandising analyst must complete daily pricing elasticity analysis under a fixed LLM token and wall-clock budget, terminating early if confidence thresholds are met.',
  visualization: BudgetExecutionEcommerceVisual,
    enlightenMePrompt: 'Explain adaptive early stopping heuristics for a cost-governed pricing elasticity workflow.'
  },
  nodes: [
    { id: 'plan', type: 'input', data: { label: 'Plan Graph', nodeType: 'input' }, position: { x: 60, y: 200 } },
    { id: 'queue', type: 'default', data: { label: 'Ready Queue', nodeType: 'aggregator' }, position: { x: 240, y: 140 } },
    { id: 'tracker', type: 'default', data: { label: 'Budget Tracker', nodeType: 'evaluator' }, position: { x: 240, y: 260 } },
    { id: 'ground', type: 'default', data: { label: 'Ground & Verify', nodeType: 'planner' }, position: { x: 440, y: 180 } },
    { id: 'exec', type: 'default', data: { label: 'Execute Step', nodeType: 'executor' }, position: { x: 640, y: 180 } },
    { id: 'eval', type: 'default', data: { label: 'Result Evaluator', nodeType: 'evaluator' }, position: { x: 840, y: 180 } },
    { id: 'complete', type: 'output', data: { label: 'Task Result', nodeType: 'output' }, position: { x: 1040, y: 180 } }
  ],
  edges: [
    { id: 'b1', source: 'plan', target: 'queue', animated: true },
    { id: 'b2', source: 'plan', target: 'tracker', animated: true },
    { id: 'b3', source: 'queue', target: 'ground', animated: true },
    { id: 'b4', source: 'tracker', target: 'ground', animated: true },
    { id: 'b5', source: 'ground', target: 'exec', animated: true },
    { id: 'b6', source: 'exec', target: 'eval', animated: true },
    { id: 'b7', source: 'eval', target: 'queue', label: 'Next Steps', animated: true },
    { id: 'b8', source: 'eval', target: 'tracker', label: 'Metrics', animated: true },
    { id: 'b9', source: 'eval', target: 'complete', animated: true }
  ],
  useCases: [
    'Control cost of long multi-step analytical workflows',
    'Guarantee completion within fixed attempt/token budgets',
    'Adaptive early termination when success criteria met'
  ],
  whenToUse: 'Use when multi-step agent workflows risk runaway cost, loops, or diminishing return refinements.',
  advantages: [
    'Prevents infinite reasoning loops',
    'Ensures predictable cost ceilings',
    'Improves reliability via explicit success gating'
  ],
  limitations: [
    'May prematurely stop borderline improvements',
    'Needs accurate per-step cost estimation',
    'Complex tuning of adaptive thresholds'
  ],
  implementation: [
    'Step 1: Initialize budgets (maxAttempts, maxLatencyMs, maxTokens, maxFailures).',
    'Step 2: Topologically queue executable plan nodes.',
    'Step 3: Before each step, verify remaining budgets; if violated → early stop.',
    'Step 4: Ground step (Pattern 4) then execute; capture cost + outcome.',
    'Step 5: Evaluate result (coverage, quality, error heuristics).',
    'Step 6: Decide: enqueue dependents, retry (bounded), or early finish if success criteria satisfied.'
  ],
  codeExample: `// TypeScript execution loop skeleton
interface ExecutionBudgets { maxAttempts: number; maxTokens: number; maxLatencyMs: number; }
interface StepResult { id: string; success: boolean; tokens: number; latencyMs: number; }

export async function executePlan(plan: any, ground: any, evaluator: any, budgets: ExecutionBudgets) {
  const queue: string[] = plan.roots.slice();
  const results: Record<string, StepResult> = {};
  let attempts = 0, tokensUsed = 0, start = Date.now();
  while (queue.length && attempts < budgets.maxAttempts) {
    if (Date.now() - start > budgets.maxLatencyMs || tokensUsed > budgets.maxTokens) break;
    const stepId = queue.shift()!;
    const grounded = await ground(plan.nodes[stepId]);
    const exec = await grounded.execute();
    attempts++; tokensUsed += exec.tokens;
    results[stepId] = { id: stepId, success: exec.success, tokens: exec.tokens, latencyMs: exec.latency };
    const evalResult = evaluator(stepId, exec);
    if (evalResult.successCriteriaMet) return { status: 'completed', results };
    if (exec.success) queue.push(...plan.dependents[stepId]);
  }
  return { status: 'partial', results };
}
`,
  pythonCodeExample: `# Python execution loop skeleton
def execute_plan(plan, ground, evaluator, budgets):
    queue = list(plan['roots'])
    results = {}
    attempts = 0
    tokens_used = 0
    import time
    start = time.time()
    while queue and attempts < budgets['maxAttempts']:
        if (time.time() - start) * 1000 > budgets['maxLatencyMs'] or tokens_used > budgets['maxTokens']:
            break
        step_id = queue.pop(0)
        grounded = ground(plan['nodes'][step_id])
        exec_res = grounded.execute()
        attempts += 1
        tokens_used += exec_res['tokens']
        results[step_id] = { 'id': step_id, 'success': exec_res['success'], 'tokens': exec_res['tokens'], 'latencyMs': exec_res['latency'] }
        eval_result = evaluator(step_id, exec_res)
        if eval_result.get('successCriteriaMet'):
            return { 'status': 'completed', 'results': results }
        if exec_res['success']:
            queue.extend(plan['dependents'].get(step_id, []))
    return { 'status': 'partial', 'results': results }
`,
  completeCode: '',

  velocityProfile: {
    impact: 'high',
    timeToImplement: '6-10 hours',
    complexityReduction: 'Medium - Azure AI Evaluation SDK provides cost tracking, but budget enforcement requires custom circuit breakers',
    reusabilityScore: 8,
    learningCurve: 'moderate',
    velocityPractices: [
      'Operational Instrumentation - Cost tracking, latency monitoring, and token usage dashboards critical for budget optimization',
      'Failure Scenario Libraries - Budget exhaustion, quality degradation, and timeout scenarios documented',
      'Evaluation Automation - Cost-per-query and quality-at-budget-level metrics standard for optimization',
      'Pattern Fluency - Essential pattern for production agents with SLAs, cost constraints, and latency requirements'
    ]
  }
};
