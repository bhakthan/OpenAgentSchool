export interface ExecutionStep { id: string; title: string; description: string; startLine: number; endLine: number; }

export const conceptToProjectExecutionSteps: ExecutionStep[] = [
  { id: 'fn', title: 'Function Definition', description: 'Define buildProjectBrief() with inputs.', startLine: 1, endLine: 1 },
  { id: 'return', title: 'Return Brief', description: 'Return title, milestones, rubric, and timebox.', startLine: 2, endLine: 8 }
];
