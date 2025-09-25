export interface ExecutionStep { id: string; title: string; description: string; startLine: number; endLine: number; }

export const schemaAwareDecompositionExecutionSteps: ExecutionStep[] = [
  { id: 'types', title: 'Define Subtask Types', description: 'Declare the subtask and graph structures used to represent the decomposition.', startLine: 1, endLine: 4 },
  { id: 'draft', title: 'Generate Draft Subtasks', description: 'Call the LLM to propose subtasks and normalize them against the schema index.', startLine: 6, endLine: 15 },
  { id: 'dependencies', title: 'Infer Dependencies', description: 'Build edges by comparing each subtask output to downstream inputs.', startLine: 16, endLine: 24 },
  { id: 'quality', title: 'Score Decomposition Quality', description: 'Compute simple coverage metrics and return the plan graph.', startLine: 25, endLine: 28 }
];