export interface ExecutionStep { id: string; title: string; description: string; startLine: number; endLine: number; }

export const queryIntentStructuredAccessExecutionSteps: ExecutionStep[] = [
  { id: 'intent', title: 'Classify Intent', description: 'Use the classifier to categorize the natural language query.', startLine: 1, endLine: 4 },
  { id: 'bind', title: 'Bind Entities', description: 'Map referenced entities before any downstream generation.', startLine: 5, endLine: 7 },
  { id: 'validate', title: 'Validate Parameters', description: 'Confirm metrics and filters with the validator against schema rules.', startLine: 8, endLine: 10 },
  { id: 'policy', title: 'Enforce Policies', description: 'Run policy checks prior to emitting the structured access plan.', startLine: 11, endLine: 14 }
];