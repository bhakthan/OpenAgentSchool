import { QuizQuestion } from './types';

export const xyzClawQuestions: QuizQuestion[] = [
  // Beginner — Big Picture
  {
    id: 'xyz-b1',
    text: 'What analogy best describes TinyClaw\'s file-based queue system?',
    question: 'What analogy best describes TinyClaw\'s file-based queue system?',
    options: [
      'A shared database that agents read and write to simultaneously',
      'An office mailroom — messages go into folders and agents pick them up',
      'A real-time WebSocket connection between agents',
      'A compiled binary that agents execute together'
    ],
    correctAnswer: 1,
    difficulty: 'beginner',
    category: 'xyz-claw',
    subCategory: 'architecture-overview',
    explanation: 'TinyClaw uses a file-based queue where incoming/, processing/, and outgoing/ directories act like an office mailroom. Messages land as JSON files, get moved atomically through processing stages, and agents pick them up independently.',
    relatedConcepts: ['xyz-claw', 'multi-agent-systems', 'agent-architecture'],
    timeEstimate: 30,
    persona: ['ai-engineer', 'agent-architect'],
    learningObjectives: ['Understand TinyClaw file-based queue metaphor']
  },
  {
    id: 'xyz-b2',
    text: 'In TinyClaw, which component is responsible for routing messages to the correct agent?',
    question: 'In TinyClaw, which component is responsible for routing messages to the correct agent?',
    options: [
      'The Discord client',
      'The settings.json configuration file',
      'The queue processor (queue-processor.ts)',
      'Each individual AI agent'
    ],
    correctAnswer: 2,
    difficulty: 'beginner',
    category: 'xyz-claw',
    subCategory: 'architecture-overview',
    explanation: 'The queue processor is "The Brain" of TinyClaw. It polls the incoming/ directory, parses @mentions to determine the target agent, moves files atomically to processing/, invokes the correct agent, and writes responses to outgoing/.',
    relatedConcepts: ['xyz-claw', 'agent-architecture'],
    timeEstimate: 30,
    persona: ['ai-engineer', 'agent-architect'],
    learningObjectives: ['Identify the central routing component']
  },
  {
    id: 'xyz-b3',
    text: 'Why does TinyClaw give each agent its own isolated workspace directory?',
    question: 'Why does TinyClaw give each agent its own isolated workspace directory?',
    options: [
      'To save disk space by distributing files',
      'To prevent conversations from mixing and protect each agent\'s context',
      'Because file systems require separate folders for each process',
      'To enable agents to share code more easily'
    ],
    correctAnswer: 1,
    difficulty: 'beginner',
    category: 'xyz-claw',
    subCategory: 'design-patterns',
    explanation: 'Agent isolation is a key design decision. Each agent has its own workspace, configuration, and conversation history. This prevents context contamination — one agent\'s failure never corrupts another\'s state, and debugging is straightforward.',
    relatedConcepts: ['xyz-claw', 'agent-architecture', 'agent-security'],
    timeEstimate: 30,
    persona: ['ai-engineer', 'agent-architect'],
    learningObjectives: ['Understand agent workspace isolation rationale']
  },
  // Intermediate — Message Flow & Patterns
  {
    id: 'xyz-i1',
    text: 'How do agents collaborate in TinyClaw\'s team system?',
    question: 'How do agents collaborate in TinyClaw\'s team system?',
    options: [
      'By directly calling each other\'s functions in code',
      'By embedding @mentions in their responses, which the queue processor detects and routes',
      'By sharing a common memory store that all agents read from',
      'By broadcasting messages to all agents simultaneously'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    category: 'xyz-claw',
    subCategory: 'message-flow',
    explanation: 'TinyClaw uses the Actor Model for team collaboration. When an agent like @coder needs @reviewer to check work, it puts "[@reviewer: please review]" in its response. The queue processor detects this mention and creates a new internal message for @reviewer.',
    relatedConcepts: ['xyz-claw', 'multi-agent-systems'],
    timeEstimate: 45,
    persona: ['ai-engineer', 'agent-architect'],
    learningObjectives: ['Understand actor-model message passing in TinyClaw']
  },
  {
    id: 'xyz-i2',
    text: 'What guarantees atomicity when the queue processor moves a message from incoming/ to processing/?',
    question: 'What guarantees atomicity when the queue processor moves a message from incoming/ to processing/?',
    options: [
      'Database transactions',
      'File system rename (mv) operation — atomic on the same filesystem',
      'Distributed locking with Redis',
      'Two-phase commit protocol'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    category: 'xyz-claw',
    subCategory: 'design-patterns',
    explanation: 'TinyClaw uses the file system\'s atomic rename (mv) operation. On POSIX systems, rename is guaranteed atomic on the same filesystem, meaning no partial states. This eliminates race conditions without needing external databases or locks.',
    relatedConcepts: ['xyz-claw', 'agent-architecture'],
    timeEstimate: 45,
    persona: ['ai-engineer', 'agent-architect'],
    learningObjectives: ['Understand file-based atomicity guarantees']
  },
  {
    id: 'xyz-i3',
    text: 'In TinyClaw, how does message parallelism work across agents?',
    question: 'In TinyClaw, how does message parallelism work across agents?',
    options: [
      'All messages run in a single thread sequentially',
      'Messages to the same agent run sequentially; messages to different agents run in parallel',
      'All messages run in parallel regardless of target agent',
      'Parallelism is handled by the AI provider, not TinyClaw'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    category: 'xyz-claw',
    subCategory: 'message-flow',
    explanation: 'TinyClaw groups messages by target agent. Within one agent, messages are sequential to preserve conversation context. Across different agents, messages execute in parallel, providing ~3x throughput improvement for multi-agent workloads.',
    relatedConcepts: ['xyz-claw', 'multi-agent-systems', 'agent-architecture'],
    timeEstimate: 45,
    persona: ['ai-engineer', 'agent-architect'],
    learningObjectives: ['Understand per-agent sequential, cross-agent parallel processing']
  },
  // Intermediate — Systems Thinking
  {
    id: 'xyz-i4',
    text: 'Which systems thinking concept explains why adding more agents to TinyClaw doesn\'t require rewriting the queue processor?',
    question: 'Which systems thinking concept explains why adding more agents to TinyClaw doesn\'t require rewriting the queue processor?',
    options: [
      'Feedback loops',
      'Emergence — the system behavior arises from interactions, not central control',
      'Resilience — the system recovers from component failures',
      'Causality chains — direct A→B relationships'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    category: 'xyz-claw',
    subCategory: 'systems-thinking',
    explanation: 'Emergence is the key concept here. Because each agent follows simple rules (read from inbox, process, write response), the system\'s collective behavior (multi-agent collaboration, routing, escalation) emerges from interactions without central orchestration changes.',
    relatedConcepts: ['xyz-claw', 'multi-agent-systems'],
    timeEstimate: 45,
    persona: ['ai-engineer', 'agent-architect'],
    learningObjectives: ['Apply systems thinking to multi-agent architecture']
  },
  // Advanced — Architecture Decisions
  {
    id: 'xyz-a1',
    text: 'Why does TinyClaw\'s Discord client contain zero AI libraries?',
    question: 'Why does TinyClaw\'s Discord client contain zero AI libraries?',
    options: [
      'Because Discord doesn\'t support AI integrations',
      'To enforce separation of concerns — the channel client only moves text, the processor handles AI',
      'Because AI libraries are too large for Discord bots',
      'Because the system only works with one AI provider'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    category: 'xyz-claw',
    subCategory: 'design-patterns',
    explanation: 'This enforces strict separation of concerns. The channel client imports zero AI libraries — it only copies text from Discord to JSON files and polls for replies. This makes it trivial to add new channels (Telegram, WhatsApp) without touching AI logic, and the AI layer can be swapped independently.',
    relatedConcepts: ['xyz-claw', 'agent-architecture', 'acp'],
    timeEstimate: 60,
    persona: ['agent-architect', 'ai-engineer'],
    learningObjectives: ['Understand separation of concerns in multi-agent systems']
  },
  {
    id: 'xyz-a2',
    text: 'What is the biggest trade-off of using a file-based queue instead of Redis or RabbitMQ?',
    question: 'What is the biggest trade-off of using a file-based queue instead of Redis or RabbitMQ?',
    options: [
      'File-based queues can\'t handle any concurrency',
      'No external dependencies, but limited to single-machine throughput and polling-based latency',
      'File-based queues don\'t support JSON messages',
      'Redis is always worse for message queues'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    category: 'xyz-claw',
    subCategory: 'design-patterns',
    explanation: 'TinyClaw\'s file queue has zero infrastructure dependencies (no Redis, no database), survives reboots naturally, and is debuggable with `ls` and `cat`. The trade-off is single-machine throughput ceiling and polling latency (vs push-based). For most AI agent workloads where LLM inference is the bottleneck, this is perfectly adequate.',
    relatedConcepts: ['xyz-claw', 'agent-architecture', 'agent-deployment'],
    timeEstimate: 60,
    persona: ['agent-architect', 'ai-engineer'],
    learningObjectives: ['Evaluate file-queue vs message-broker trade-offs']
  },
  {
    id: 'xyz-a3',
    text: 'How does TinyClaw\'s architecture relate to the Actor Model from computer science?',
    question: 'How does TinyClaw\'s architecture relate to the Actor Model from computer science?',
    options: [
      'It doesn\'t — TinyClaw uses a centralized controller pattern',
      'Each agent is an actor with isolated state, communicating only through message passing via the queue',
      'It uses the Actor Model only for the queue processor, not agents',
      'The Actor Model is only used in Erlang/Akka, not in TypeScript systems'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    category: 'xyz-claw',
    subCategory: 'systems-thinking',
    explanation: 'TinyClaw directly implements the Actor Model: each agent has isolated state (own workspace, config, history), communicates exclusively through message passing (file queue), processes messages sequentially per-actor, and can spawn new actors (team collaboration). This is the same model that powers Erlang/OTP and Akka.',
    relatedConcepts: ['xyz-claw', 'multi-agent-systems', 'agent-architecture'],
    timeEstimate: 60,
    persona: ['agent-architect'],
    learningObjectives: ['Connect TinyClaw to formal Actor Model theory']
  }
];

export const xyzClawTime = xyzClawQuestions.reduce(
  (total, q) => total + (q.timeEstimate || 40), 0
);
