import { QuizQuestion } from './types';

export const dataAutonomyPatternsQuestions: QuizQuestion[] = [
  {
    id: 'dap-1',
    text: 'Which primary risk does Perception Normalization mitigate?',
    question: 'Which primary risk does Perception Normalization mitigate?',
    options: [
      'Excessive caching collisions',
      'Schema hallucination & irrelevant token bloat',
      'Slow vector similarity search latency',
      'Inability to compress embeddings'
    ],
    correctAnswer: 1,
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'data-autonomy',
    explanation: 'It structures raw metadata into a compact InfoBox reducing hallucinations and token waste.',
    relatedConcepts: ['perception-normalization'],
    learningObjectives: ['Identify perception layer purpose']
  },
  {
    id: 'dap-2',
    text: 'In Schema-Aware Decomposition, coverage metric best captures…',
    question: 'In Schema-Aware Decomposition, the coverage metric best captures:',
    options: [
      'Ratio of valid subtasks to total generated',
      'Total execution latency per subtask',
      'Number of columns per table',
      'Policy compliance score'
    ],
    correctAnswer: 0,
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'data-autonomy',
    explanation: 'Coverage indicates how many generated subtasks survive schema validation.',
    relatedConcepts: ['schema-aware-decomposition']
  },
  {
    id: 'dap-3',
    text: 'Action Grounding & Verification adds which final validation before approval?',
    question: 'Action Grounding & Verification adds which final validation before approval?',
    options: [
      'Embedding dimensionality reduction',
      'Dry-run sandbox execution',
      'Automated column type coercion',
      'Lossy compression of SQL'
    ],
    correctAnswer: 1,
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'data-autonomy',
    explanation: 'Sandbox dry-run ensures safe execution characteristics before committing.',
    relatedConcepts: ['action-grounding-verification']
  },
  {
    id: 'dap-4',
    text: 'Budget-Constrained Execution decides early stopping based on…',
    question: 'Budget-Constrained Execution decides early stopping primarily based on:',
    options: [
      'Remaining embedding dimensionality',
      'Coverage of subtasks & success criteria met',
      'Network socket pool utilization',
      'Size of InfoBox artifact'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'data-autonomy',
    explanation: 'When criteria are satisfied, loop terminates to save cost.',
    relatedConcepts: ['budget-constrained-execution']
  }
  ,
  {
    id: 'dap-5',
    text: 'Policy-Gated Tool Invocation adds which risk mitigation layer before execution?',
    question: 'Policy-Gated Tool Invocation adds which risk mitigation layer before execution?',
    options: [
      'Random delay injection',
      'Intent → capability mapping with risk scoring & policy lattice evaluation',
      'Vector quantization of tool names',
      'Silent fallback to cached responses'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'data-autonomy',
    explanation: 'The pattern mediates execution using structured intent mapping, risk scoring and layered policy evaluation.',
    relatedConcepts: ['policy-gated-tool-invocation'],
    learningObjectives: ['Understand policy mediation sequence']
  },
  {
    id: 'dap-6',
    text: 'Data Quality Feedback & Repair Loop closes the loop by…',
    question: 'Data Quality Feedback & Repair Loop closes the loop by:',
    options: [
      'Deleting anomalous records immediately',
      'Escalating all anomalies to humans only',
      'Generating candidate repair actions and validating improvement metrics',
      'Switching to a different LLM provider'
    ],
    correctAnswer: 2,
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'data-autonomy',
    explanation: 'Repairs are synthesized, ranked, and validated to confirm KPI stabilization before adoption.',
    relatedConcepts: ['data-quality-feedback-repair-loop'],
    learningObjectives: ['Recognize closed-loop quality improvement']
  },
  {
    id: 'dap-7',
    text: 'Query Intent → Structured Access reduces security & correctness risk primarily by…',
    question: 'Query Intent → Structured Access reduces security & correctness risk primarily by:',
    options: [
      'Inlining raw user text directly into SQL',
      'Binding natural language spans to vetted schema entities & applying access policies',
      'Expanding every noun into multiple wildcard searches',
      'Disabling joins entirely'
    ],
    correctAnswer: 1,
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'data-autonomy',
    explanation: 'Entity binding plus policy enforcement prevents unauthorized / hallucinated references.',
    relatedConcepts: ['query-intent-structured-access'],
    learningObjectives: ['Understand intent binding mechanics']
  },
  {
    id: 'dap-8',
    text: 'Strategy Memory Replay improves efficiency by…',
    question: 'Strategy Memory Replay improves efficiency by:',
    options: [
      'Discarding past execution traces to avoid bias',
      'Retrieving & adapting prior validated plan/action graphs to current task context',
      'Compressing all plans into a single hash to reuse blindly',
      'Skipping perception & decomposition entirely'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    category: 'agent-patterns',
    subCategory: 'data-autonomy',
    explanation: 'It leverages semantically similar historical strategies, mutating them with freshness & relevance checks.',
    relatedConcepts: ['strategy-memory-replay'],
    learningObjectives: ['Explain strategy retrieval benefits']
  }
];
