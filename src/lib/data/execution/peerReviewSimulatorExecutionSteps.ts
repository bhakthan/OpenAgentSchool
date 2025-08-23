export interface ExecutionStep { id: string; title: string; description: string; startLine: number; endLine: number; }

export const peerReviewSimulatorExecutionSteps: ExecutionStep[] = [
  { id: 'types', title: 'Review Type', description: 'Define Review type with decision and comments.', startLine: 1, endLine: 1 },
  { id: 'fn', title: 'reviewDiff()', description: 'Analyze diff and produce decision & comments.', startLine: 2, endLine: 7 }
];
