// Execution steps for Parallelization pattern (TypeScript codeExample line mappings)
export interface ExecutionStep {
  id: string;
  title: string;
  description: string;
  startLine?: number;
  endLine?: number;
}

export const parallelizationExecutionSteps: ExecutionStep[] = [
  {
    id: 'header-context',
    title: 'Header & Business Context',
    description: 'Introduce pattern purpose: concurrent customer review analysis.',
    startLine: 1,
    endLine: 6
  },
  {
    id: 'types-llm-stub',
    title: 'Types & LLM Stub',
    description: 'Define ReviewAnalysis structure and stub llmAnalyze simulating structured extraction.',
    startLine: 8,
    endLine: 22
  },
  {
    id: 'single-analysis',
    title: 'Single Review Analyzer',
    description: 'Wrapper analyzeReview delegating to underlying model/tool routine.',
    startLine: 24,
    endLine: 26
  },
  {
    id: 'pool-controller',
    title: 'Concurrency Pool Controller',
    description: 'Custom bounded parallel dispatcher controlling max active review analyses.',
    startLine: 28,
    endLine: 59
  },
  {
    id: 'aggregation',
    title: 'Aggregate Analytics',
    description: 'Compute sentiment and topic frequency distributions from batch results.',
    startLine: 61,
    endLine: 74
  },
  {
    id: 'example-usage',
    title: 'Example Usage (Commented)',
    description: 'Demonstrates large batch processing with configured concurrency and summarization.',
    startLine: 76,
    endLine: 95
  }
];
