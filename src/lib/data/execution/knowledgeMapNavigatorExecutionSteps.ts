export interface ExecutionStep { id: string; title: string; description: string; startLine: number; endLine: number; }

export const knowledgeMapNavigatorExecutionSteps: ExecutionStep[] = [
  { id: 'fn', title: 'Function Definition', description: 'Define buildPath(goal, current).', startLine: 1, endLine: 1 },
  { id: 'return', title: 'Return Path', description: 'Return goal, sequence, and checkpoints.', startLine: 2, endLine: 7 }
];
