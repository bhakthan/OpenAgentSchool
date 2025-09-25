import { SystemDesignPattern } from './types';

export const strategyMemoryReplaySystemDesign: SystemDesignPattern = {
  id: 'strategy-memory-replay',
  name: 'Strategy Memory Replay System Design',
  overview: 'Embeds task signature, retrieves prior strategies, adapts and scores them.',
  problemStatement: 'Repeated similar tasks waste cost re-deriving near-identical plans.',
  solution: 'Store strategy artifacts; retrieve & mutate for new tasks to accelerate planning.',
  steps: [
    { id: 'embed', title: 'Signature Embedding', category: 'architecture', description: 'Vectorize task semantics', details: 'Combine intent + entities', considerations: ['Drift'], bestPractices: ['Version embeddings'], patterns: ['strategy-memory-replay'], examples: ['embed(task)'] },
  { id: 'adapt', title: 'Adaptation', category: 'architecture', description: 'Merge & mutate prior graphs', details: 'Heuristic or LLM guided', considerations: ['Stale nodes'], bestPractices: ['Validate freshness'], patterns: ['strategy-memory-replay'], examples: ['mutate(plan)'] }
  ],
  architecture: {
    components: [
      { name: 'Embedding Service', type: 'processing', description: 'Computes signatures' },
      { name: 'Strategy Store', type: 'storage', description: 'Houses prior strategies' },
      { name: 'Adaptation Engine', type: 'processing', description: 'Mutates strategies' },
      { name: 'Scoring Engine', type: 'processing', description: 'Ranks candidates' }
    ],
    flows: [
      { from: 'Embedding Service', to: 'Strategy Store', description: 'Similarity query' },
      { from: 'Strategy Store', to: 'Adaptation Engine', description: 'Candidate strategies' },
      { from: 'Adaptation Engine', to: 'Scoring Engine', description: 'Adapted set' }
    ]
  }
};
