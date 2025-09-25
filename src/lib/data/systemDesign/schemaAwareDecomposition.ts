import { SystemDesignPattern } from './types';

export const schemaAwareDecompositionSystemDesign: SystemDesignPattern = {
  id: 'schema-aware-decomposition',
  name: 'Schema-Aware Decomposition System Design',
  overview: 'Transforms a task + InfoBox into a validated dependency graph of subtasks referencing only real schema entities.',
  problemStatement: 'Naive decomposition may hallucinate tables/columns and produce redundant or poorly ordered subtasks.',
  solution: 'Use iterative generation + schema validation + optimization heuristics to converge on minimal, valid subtask graph.',
  steps: [
    { id: 'draft-subtasks', title: 'Draft Subtasks', category: 'prompt', description: 'LLM generates raw list', details: 'Chain-of-thought / tree prompt', considerations: ['Hallucinated entities'], bestPractices: ['Limit step granularity'], patterns: ['schema-aware-decomposition'], examples: ['llm.generateSubtasks()'] },
    { id: 'validate-schema', title: 'Schema Validation', category: 'evaluation', description: 'Filter invalid entity refs', details: 'Exact match against InfoBox sets', considerations: ['Alias resolution'], bestPractices: ['Log misses'], patterns: ['schema-aware-decomposition'], examples: ['validator(entity)'] },
    { id: 'optimize-graph', title: 'Graph Optimization', category: 'architecture', description: 'Merge/split tasks', details: 'Heuristics & size budgets', considerations: ['Over-splitting'], bestPractices: ['Track coverage metric'], patterns: ['schema-aware-decomposition'], examples: ['optimize(subtasks)'] }
  ],
  architecture: {
    components: [
      { name: 'Subtask Generator', type: 'processing', description: 'LLM prompt expansion' },
      { name: 'Schema Validator', type: 'processing', description: 'Entity presence checks' },
      { name: 'Graph Optimizer', type: 'processing', description: 'Refines structure & ordering' },
      { name: 'Plan Graph Store', type: 'storage', description: 'Persists final plan graph' }
    ],
    flows: [
      { from: 'Subtask Generator', to: 'Schema Validator', description: 'Draft subtasks' },
      { from: 'Schema Validator', to: 'Graph Optimizer', description: 'Validated tasks' },
      { from: 'Graph Optimizer', to: 'Plan Graph Store', description: 'Optimized plan graph' }
    ]
  }
};
