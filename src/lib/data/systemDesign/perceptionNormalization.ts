import { SystemDesignPattern } from './types';

export const perceptionNormalizationSystemDesign: SystemDesignPattern = {
  id: 'perception-normalization',
  name: 'Perception Normalization System Design',
  overview: 'Generates a compact, governance-aware InfoBox from raw catalog, profiling, lineage, and policy sources to ground downstream planning.',
  problemStatement: 'Raw enterprise metadata is noisy, large, and inconsistently structured; direct injection into prompts causes hallucination and cost waste.',
  solution: 'Introduce a normalization layer that profiles, filters, compresses, and signs a canonical context artifact consumed by planning and decomposition steps.',
  steps: [
    {
      id: 'collect-metadata',
      title: 'Metadata & Signal Collection',
      category: 'context',
      description: 'Pull schemas, sample stats, lineage edges, and governance tags.',
      details: 'Use catalog + profiler APIs with sampling and column selection heuristics.',
      considerations: ['API rate limits', 'PHI masking', 'Schema drift detection'],
      bestPractices: ['Sample adaptively', 'Attach freshness timestamps'],
      patterns: ['perception-normalization'],
      examples: ['profiler.profile("orders")']
    },
    {
      id: 'compact-artifact',
      title: 'Artifact Compaction & Hash',
      category: 'architecture',
      description: 'Reduce token size while preserving task-relevant semantics.',
      details: 'Drop low-signal columns and attach a stable hash for caching.',
      considerations: ['Over-compaction risk', 'Cache invalidation triggers'],
      bestPractices: ['Target size budget', 'Version fields'],
      patterns: ['perception-normalization'],
      examples: ['createHash(infoBox)']
    }
  ],
  architecture: {
    components: [
      { name: 'Catalog Adapter', type: 'input', description: 'Retrieves structural metadata' },
      { name: 'Profiler Engine', type: 'processing', description: 'Computes column statistics' },
      { name: 'Governance Mapper', type: 'processing', description: 'Enriches sensitivity & ownership' },
      { name: 'InfoBox Composer', type: 'processing', description: 'Builds and signs canonical JSON' },
      { name: 'Cache Store', type: 'storage', description: 'Stores hashed artifacts' }
    ],
    flows: [
      { from: 'Catalog Adapter', to: 'InfoBox Composer', description: 'Schema & types' },
      { from: 'Profiler Engine', to: 'InfoBox Composer', description: 'Profiles' },
      { from: 'Governance Mapper', to: 'InfoBox Composer', description: 'Tags' },
      { from: 'InfoBox Composer', to: 'Cache Store', description: 'Signed artifact' }
    ]
  }
};
