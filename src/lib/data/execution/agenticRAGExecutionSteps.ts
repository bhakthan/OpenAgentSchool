export interface AgenticRAGExecutionStep {
  id: string;
  title: string;
  description: string;
  startLine: number;
  endLine: number;
}

// Line numbers map to the TypeScript codeExample for agenticRAGPattern (business use case version)
export const agenticRAGExecutionSteps: AgenticRAGExecutionStep[] = [
  { id: 'init', title: 'Initialize State', description: 'Initialize cycle counters, context, and result containers.', startLine: 1, endLine: 14 },
  { id: 'tools', title: 'Define Retrieval + Utility Tools', description: 'Simulated tools: embed, hybridSearch, rankAndFilter, synthesizeWithCitations.', startLine: 16, endLine: 44 },
  { id: 'loop-start', title: 'Start Iteration Loop', description: 'Begin loop with max cycles guard.', startLine: 46, endLine: 52 },
  { id: 'reflect', title: 'Reflection & Query Decomposition', description: 'Generate reflection prompt to refine user query into focused sub-intent.', startLine: 54, endLine: 74 },
  { id: 'retrieve', title: 'Hybrid Retrieval', description: 'Perform vector + keyword (hybrid) search using refined query.', startLine: 76, endLine: 89 },
  { id: 'rank', title: 'Ranking & Filtering', description: 'Apply ranking + policy relevance filtering to retrieved chunks.', startLine: 91, endLine: 101 },
  { id: 'synthesize', title: 'Synthesis With Citations', description: 'Combine ranked context into grounded answer draft with citations.', startLine: 103, endLine: 118 },
  { id: 'final-check', title: 'Check Completion / Continue', description: 'Decide to finalize answer or continue refining next cycle.', startLine: 120, endLine: 134 },
  { id: 'return', title: 'Return Structured Result', description: 'Return final status, answer and trace metadata.', startLine: 136, endLine: 151 }
];
