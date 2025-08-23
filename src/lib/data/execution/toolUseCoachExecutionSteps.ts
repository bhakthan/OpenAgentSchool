export interface ExecutionStep { id: string; title: string; description: string; startLine: number; endLine: number; }

export const toolUseCoachExecutionSteps: ExecutionStep[] = [
  { id: 'fn', title: 'validateCurl()', description: 'Define validator function with flag checks.', startLine: 1, endLine: 1 },
  { id: 'logic', title: 'Validation Logic', description: 'Check flags and assemble tips & status.', startLine: 2, endLine: 9 }
];
