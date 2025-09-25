export interface ExecutionStep { id: string; title: string; description: string; startLine: number; endLine: number; }

export const budgetConstrainedExecutionExecutionSteps: ExecutionStep[] = [
  { id: 'loop', title: 'Budgeted Loop', description: 'Iterate until the queue is empty or budget limits are exceeded.', startLine: 1, endLine: 6 },
  { id: 'ground', title: 'Ground Plan Nodes', description: 'Use the grounding hook to prepare the plan step for execution.', startLine: 7, endLine: 8 },
  { id: 'record', title: 'Record Cost Metrics', description: 'Update attempts, token usage, and execution results.', startLine: 9, endLine: 11 },
  { id: 'evaluate', title: 'Evaluate Success Criteria', description: 'Ask the evaluator if the success condition is met or enqueue dependents.', startLine: 12, endLine: 16 }
];