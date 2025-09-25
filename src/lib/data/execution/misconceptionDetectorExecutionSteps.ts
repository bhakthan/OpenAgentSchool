export interface ExecutionStep { id: string; title: string; description: string; startLine: number; endLine: number; }

export const misconceptionDetectorExecutionSteps: ExecutionStep[] = [
  { id: 'analyze', title: 'Scan Artifact', description: 'Inspect learner answer for known misconception signals.', startLine: 1, endLine: 3 },
  { id: 'remedy', title: 'Return Fix', description: 'Return misconception label and targeted fix guidance.', startLine: 1, endLine: 3 }
];
