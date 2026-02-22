import { QuizQuestion } from './types';

export const contextEngineeringQuestions: QuizQuestion[] = [
  // Beginner questions
  {
    id: 'ctx-eng-b1',
    text: 'What is the primary goal of context engineering in AI agent systems?',
    question: 'What is the primary goal of context engineering in AI agent systems?',
    options: [
      'Making prompts longer and more detailed',
      'Reducing information entropy between human intent and machine action',
      'Replacing retrieval-augmented generation entirely',
      'Minimizing the number of API calls to the LLM'
    ],
    correctAnswer: 1,
    difficulty: 'beginner',
    category: 'context-engineering',
    subCategory: 'context-fundamentals',
    explanation: 'Context engineering focuses on reducing the information gap (entropy) between what a human intends and what the machine understands, by collecting, compressing, organizing, and selecting the right context at the right time.',
    relatedConcepts: ['context-engineering', 'ai-ready-data', 'agentic-prompting-fundamentals'],
    timeEstimate: 30,
    persona: ['ai-engineer', 'agent-architect', 'developer'],
    learningObjectives: ['Understand the core objective of context engineering']
  },
  {
    id: 'ctx-eng-b2',
    text: 'Which four pipeline nodes make up the Context Engineering 2.0 framework?',
    question: 'Which four pipeline nodes make up the Context Engineering 2.0 framework?',
    options: [
      'Input, Process, Output, Feedback',
      'Collection, Management, Organization, Selection',
      'Retrieval, Ranking, Rewriting, Response',
      'Embedding, Indexing, Searching, Filtering'
    ],
    correctAnswer: 1,
    difficulty: 'beginner',
    category: 'context-engineering',
    subCategory: 'context-fundamentals',
    explanation: 'The Context Engineering 2.0 framework defines four pipeline nodes: Collection (gathering raw context), Management (lifecycle and freshness), Organization (structuring for retrieval), and Selection (choosing what enters the context window).',
    relatedConcepts: ['context-engineering', 'agentic-rag'],
    timeEstimate: 30,
    persona: ['ai-engineer', 'developer'],
    learningObjectives: ['Identify the four context pipeline nodes']
  },
  {
    id: 'ctx-eng-b3',
    text: 'What does the "Self-Baking" pattern in context engineering refer to?',
    question: 'What does the "Self-Baking" pattern in context engineering refer to?',
    options: [
      'The model training itself during inference',
      'Pre-processing raw data into optimized context artifacts before query time',
      'Automatically generating prompts from user history',
      'Running the model in a self-hosted environment'
    ],
    correctAnswer: 1,
    difficulty: 'beginner',
    category: 'context-engineering',
    subCategory: 'context-patterns',
    explanation: 'Self-baking is a context engineering pattern where agents proactively transform raw data into QA pairs, summaries, schemas, and embeddings before query time—making retrieval faster and cheaper.',
    relatedConcepts: ['context-engineering', 'ai-ready-data', 'agent-cost-optimization'],
    timeEstimate: 30,
    persona: ['ai-engineer', 'developer', 'ml-engineer'],
    learningObjectives: ['Explain the self-baking context pattern']
  },
  // Intermediate questions
  {
    id: 'ctx-eng-i1',
    text: 'When implementing token-budgeted context selection, which factor is LEAST important for ranking candidate context chunks?',
    question: 'When implementing token-budgeted context selection, which factor is LEAST important for ranking candidate context chunks?',
    options: [
      'Semantic relevance to the current query',
      'The file size of the original source document',
      'Recency and freshness of the information',
      'Authority and reliability of the source'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    category: 'context-engineering',
    subCategory: 'context-selection',
    explanation: 'File size of the source document has minimal relevance to context selection quality. The important ranking signals are semantic relevance, recency/freshness, source authority, and diversity of coverage.',
    relatedConcepts: ['context-engineering', 'agentic-rag', 'agent-memory-systems'],
    timeEstimate: 40,
    persona: ['ai-engineer', 'agent-architect'],
    learningObjectives: ['Evaluate context ranking signals']
  },
  {
    id: 'ctx-eng-i2',
    text: 'What is the "lost in the middle" problem and how does it affect context engineering?',
    question: 'What is the "lost in the middle" problem and how does it affect context engineering?',
    options: [
      'Models lose track of conversation history after 5 turns',
      'Models pay less attention to content in the middle of long context windows',
      'Context compression causes information loss in the middle layers',
      'RAG systems fail to retrieve documents from the middle of large corpora'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    category: 'context-engineering',
    subCategory: 'context-selection',
    explanation: 'Research shows that LLMs attend more to content at the beginning and end of context windows, with reduced attention in the middle. Context engineers must position critical information strategically.',
    relatedConcepts: ['context-engineering', 'agent-reasoning-patterns', 'agent-memory-systems'],
    timeEstimate: 40,
    persona: ['ai-engineer', 'ml-engineer', 'agent-architect'],
    learningObjectives: ['Understand positional attention effects on context']
  },
  {
    id: 'ctx-eng-i3',
    text: 'How does proactive inference differ from reactive retrieval in context engineering?',
    question: 'How does proactive inference differ from reactive retrieval in context engineering?',
    options: [
      'Proactive inference runs faster than reactive retrieval',
      'Proactive inference anticipates context needs from behavioral signals before the user asks',
      'Reactive retrieval is more accurate than proactive inference',
      'Proactive inference requires no historical data'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    category: 'context-engineering',
    subCategory: 'context-patterns',
    explanation: 'Proactive inference analyzes behavioral signals (repeated failures, semantic drift, session patterns) to anticipate and pre-load context the user will likely need, rather than waiting for explicit queries.',
    relatedConcepts: ['context-engineering', 'agent-memory-systems', 'agent-reasoning-patterns'],
    timeEstimate: 35,
    persona: ['ai-engineer', 'agent-architect', 'product-manager'],
    learningObjectives: ['Compare proactive vs reactive context strategies']
  },
  // Advanced questions
  {
    id: 'ctx-eng-a1',
    text: 'In a context isolation architecture, why is it important to separate raw user input from system instructions in the context window?',
    question: 'In a context isolation architecture, why is it important to separate raw user input from system instructions in the context window?',
    options: [
      'To reduce token usage and costs',
      'To prevent prompt injection attacks where user input overrides system instructions',
      'To improve the model\'s response formatting',
      'To enable parallel processing of different context types'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    category: 'context-engineering',
    subCategory: 'context-security',
    explanation: 'Context isolation prevents prompt injection by ensuring user-provided content cannot be interpreted as system-level instructions. Clear boundaries between trusted (system) and untrusted (user) context are essential for security.',
    relatedConcepts: ['context-engineering', 'prompt-injection-defense', 'guardrails-layer'],
    timeEstimate: 45,
    persona: ['agent-architect', 'security-engineer'],
    learningObjectives: ['Design secure context isolation architectures']
  },
  {
    id: 'ctx-eng-a2',
    text: 'When designing a context pipeline for a multi-agent system, which approach best handles context handoff between agents?',
    question: 'When designing a context pipeline for a multi-agent system, which approach best handles context handoff between agents?',
    options: [
      'Pass the entire conversation history to every agent',
      'Let each agent independently retrieve its own context',
      'Use structured context summaries with task-specific projections for each agent',
      'Only pass the final output of the previous agent'
    ],
    correctAnswer: 2,
    difficulty: 'advanced',
    category: 'context-engineering',
    subCategory: 'context-architecture',
    explanation: 'Structured context summaries with task-specific projections give each agent the relevant context it needs while avoiding token waste from full history or information loss from output-only handoffs.',
    relatedConcepts: ['context-engineering', 'multi-agent-systems', 'agent-memory-systems'],
    timeEstimate: 45,
    persona: ['agent-architect', 'ai-engineer'],
    learningObjectives: ['Design context handoff in multi-agent systems']
  },
  {
    id: 'ctx-eng-a3',
    text: 'What is the key trade-off between aggressive context compression and context fidelity?',
    question: 'What is the key trade-off between aggressive context compression and context fidelity?',
    options: [
      'Compressed context is always faster to process',
      'Higher compression reduces token costs but risks losing nuance that causes hallucination',
      'Context fidelity only matters for creative writing tasks',
      'Compression always improves model accuracy by removing noise'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    category: 'context-engineering',
    subCategory: 'context-architecture',
    explanation: 'Aggressive compression saves tokens and costs but risks losing subtle details that prevent hallucination. The optimal compression level depends on task criticality, domain specificity, and the model\'s ability to infer from compressed context.',
    relatedConcepts: ['context-engineering', 'agent-cost-optimization', 'agent-evaluation-methodologies'],
    timeEstimate: 45,
    persona: ['agent-architect', 'ml-engineer', 'ai-engineer'],
    learningObjectives: ['Evaluate compression vs fidelity trade-offs']
  }
];

export const contextEngineeringTime = contextEngineeringQuestions.reduce(
  (total, q) => total + (q.timeEstimate || 40), 0
);
