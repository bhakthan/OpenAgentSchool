export interface ExecutionStep { id: string; title: string; description: string; startLine: number; endLine: number; }

export const errorWhispererExecutionSteps: ExecutionStep[] = [
  { id: 'types', title: 'Diagnosis Type', description: 'Define Diagnosis structure.', startLine: 1, endLine: 1 },
  { id: 'fn', title: 'Diagnose Function', description: 'Implement diagnose() to produce hypothesis, fix, and prevention.', startLine: 3, endLine: 10 }
];
