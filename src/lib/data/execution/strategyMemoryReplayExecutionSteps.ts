export interface ExecutionStep { id: string; title: string; description: string; startLine: number; endLine: number; }

export const strategyMemoryReplayExecutionSteps: ExecutionStep[] = [
  { id: 'embed', title: 'Embed Task Signature', description: 'Generate the task signature embedding to anchor retrieval.', startLine: 1, endLine: 4 },
  { id: 'retrieve', title: 'Fetch Prior Strategies', description: 'Pull the most similar historical strategies from storage.', startLine: 5, endLine: 8 },
  { id: 'mutate', title: 'Adapt Plans', description: 'Mutate prior plans so they match the current task context.', startLine: 9, endLine: 16 },
  { id: 'score', title: 'Score and Select', description: 'Score adapted strategies and return the best replay candidate.', startLine: 17, endLine: 20 }
];