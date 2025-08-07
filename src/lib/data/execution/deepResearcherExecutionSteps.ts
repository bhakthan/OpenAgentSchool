export interface ExecutionStep { id: string; title: string; description: string; startLine?: number; endLine?: number; }

export const deepResearcherExecutionSteps: ExecutionStep[] = [
  { id: 'init', title: 'Initialize & Types', description: 'Define data interfaces for research docs & question results.', startLine: 1, endLine: 6 },
  { id: 'mock-services', title: 'Mock LLM & Search Services', description: 'Placeholder implementations for llm and legal source search.', startLine: 8, endLine: 18 },
  { id: 'planning', title: 'Plan Research Questions', description: 'Generate granular sub-questions from initial query.', startLine: 20, endLine: 32 },
  { id: 'synthesis-fn', title: 'Synthesis Function', description: 'Combine ranked docs into a cited answer per question.', startLine: 34, endLine: 42 },
  { id: 'main-loop-start', title: 'Main Runner Setup', description: 'Initialize log and derive question list.', startLine: 44, endLine: 50 },
  { id: 'question-iteration', title: 'Iterate Questions', description: 'Search, rank, and synthesize for each research question.', startLine: 52, endLine: 63 },
  { id: 'final-aggregate', title: 'Final Aggregation & Memo Prompt', description: 'Aggregate per-question answers and craft final memo prompt.', startLine: 65, endLine: 72 },
  { id: 'return', title: 'Return Structured Result', description: 'Return final report with trace log and intermediate artifacts.', startLine: 74, endLine: 80 }
];
