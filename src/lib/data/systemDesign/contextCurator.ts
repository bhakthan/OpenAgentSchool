import { SystemDesignPattern } from './types';

export const contextCuratorSystemDesign: SystemDesignPattern = {
  id: 'context-curator',
  name: 'Context Curator System Design',
  overview: 'Selects the most relevant artifacts from large corpora and returns a concise, trusted context set.',
  problemStatement: 'Learners drown in docs and examples; we need high-signal, low-noise context that’s trustworthy and current.',
  solution: 'Combine lexical and semantic retrieval with deduplication, trust scoring, and LLM-based curation and rationales.',
  steps: [
    { id: 'retrieve', title: 'Hybrid Retrieval', category: 'knowledge', description: 'BM25 + semantic search across code/docs.', details: 'Fan-out candidate search with filters (filetype, recency).', considerations: ['Index freshness', 'Private data boundaries'], bestPractices: ['Shard by domain', 'Snapshot versions'] },
    { id: 'curate', title: 'LLM Curation + Rationale', category: 'prompt', description: 'Ask LLM to choose top 3–5 with one-line why.', details: 'Provide task, constraints, and scoring rubric.', considerations: ['Hallucination risk'], bestPractices: ['Ground with quotes/snippets'] },
    { id: 'trust', title: 'Trust & Policy Guardrails', category: 'evaluation', description: 'Score authority and freshness; block low-trust.', details: 'Require source tags and dates; log rationale.', considerations: ['Stale guidance'], bestPractices: ['Age-out policy', 'Audit logs'] }
  ],
  architecture: {
    components: [
      { name: 'Retriever', type: 'processing', description: 'Hybrid lexical/semantic retriever' },
      { name: 'Curator LLM', type: 'processing', description: 'Selects artifacts and rationales' },
      { name: 'Trust Scorer', type: 'processing', description: 'Applies freshness and authority scores' },
      { name: 'Artifacts Store', type: 'storage', description: 'Indexed documents and code' },
      { name: 'Result Output', type: 'output', description: 'Top artifacts with why' }
    ],
    flows: [
      { from: 'Artifacts Store', to: 'Retriever', description: 'Query candidates' },
      { from: 'Retriever', to: 'Curator LLM', description: 'Provide candidate set + task' },
      { from: 'Curator LLM', to: 'Trust Scorer', description: 'Score selection' },
      { from: 'Trust Scorer', to: 'Result Output', description: 'Return curated set' }
    ]
  }
};
