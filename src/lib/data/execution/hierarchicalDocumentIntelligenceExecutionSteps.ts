export interface ExecutionStep { id: string; title: string; description: string; startLine: number; endLine: number; }

export const hierarchicalDocumentIntelligenceExecutionSteps: ExecutionStep[] = [
  { id: 'load', title: 'Load PDF Document', description: 'Load the dense technical PDF document (200+ pages, 2M+ tokens).', startLine: 1, endLine: 6 },
  { id: 'chunk', title: 'Intelligent Chunking', description: 'Create overlapping chunks (15% overlap) to preserve context boundaries.', startLine: 7, endLine: 14 },
  { id: 'visual', title: 'Visual Extraction', description: 'Parallel GPT-4V processing to extract diagram elements, symbols, and connections.', startLine: 15, endLine: 23 },
  { id: 'domain', title: 'Domain Interpretation', description: 'Apply engineering standards (IEC, ANSI, IEEE) to interpret components.', startLine: 24, endLine: 32 },
  { id: 'memory', title: 'Build Context Memory', description: 'Index chunks in ChromaDB vector store and build NetworkX relationship graph.', startLine: 33, endLine: 42 },
  { id: 'xref', title: 'Cross-Reference Resolution', description: 'Link detail callouts, page references, and drawing dependencies via graph traversal.', startLine: 43, endLine: 50 },
  { id: 'synthesize', title: 'Hierarchical Synthesis', description: 'Create 4-level understanding: components → subsystems → systems → meta-analysis.', startLine: 51, endLine: 60 },
  { id: 'query', title: 'Interactive Q&A', description: 'Answer questions using vector search + graph traversal within 50K context window.', startLine: 61, endLine: 70 }
];
