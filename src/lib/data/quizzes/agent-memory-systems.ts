// Quiz questions for Agent Memory Systems concept
// Covers: Short-term, Long-term, Episodic, Semantic, Working Memory

import type { QuizQuestion } from '../quizzes';

export const agentMemorySystemsQuestions: QuizQuestion[] = [
  {
    id: 'memory-1',
    conceptId: 'agent-memory-systems',
    question: 'What is the primary purpose of an agent\'s working memory?',
    options: [
      'Permanent storage of all conversations',
      'Holding active context for the current task',
      'Training the language model',
      'Storing user credentials'
    ],
    correctAnswer: 1,
    explanation: 'Working memory holds the current conversation context, tool outputs, and intermediate reasoning—the "active" information needed for the ongoing task.',
    difficulty: 'beginner',
    category: 'memory'
  },
  {
    id: 'memory-2',
    conceptId: 'agent-memory-systems',
    question: 'How does episodic memory differ from semantic memory in AI agents?',
    options: [
      'Episodic is faster than semantic',
      'Episodic stores specific experiences; semantic stores general knowledge',
      'Episodic uses more storage',
      'Semantic is for short-term only'
    ],
    correctAnswer: 1,
    explanation: 'Episodic memory records specific past interactions ("User asked X, I responded Y"). Semantic memory stores distilled knowledge and facts independent of specific experiences.',
    difficulty: 'intermediate',
    category: 'memory'
  },
  {
    id: 'memory-3',
    conceptId: 'agent-memory-systems',
    question: 'What technology is commonly used to implement semantic search in agent memory?',
    options: [
      'Regular expressions',
      'Vector embeddings and similarity search',
      'SQL databases only',
      'Keyword matching'
    ],
    correctAnswer: 1,
    explanation: 'Vector databases store embeddings of memories and enable semantic similarity search, allowing retrieval based on meaning rather than exact keyword matches.',
    difficulty: 'intermediate',
    category: 'memory'
  },
  {
    id: 'memory-4',
    conceptId: 'agent-memory-systems',
    question: 'What is "memory consolidation" in agent systems?',
    options: [
      'Deleting all memories',
      'Compressing and summarizing short-term memories for long-term storage',
      'Copying memories to backup',
      'Encrypting sensitive memories'
    ],
    correctAnswer: 1,
    explanation: 'Memory consolidation extracts key insights from raw interactions and stores them efficiently in long-term memory, similar to how human brains process daily experiences during sleep.',
    difficulty: 'advanced',
    category: 'memory'
  },
  {
    id: 'memory-5',
    conceptId: 'agent-memory-systems',
    question: 'Why is memory retrieval timing important for agent performance?',
    options: [
      'It affects the electricity bill',
      'Retrieved memories must fit within the LLM context window before generation',
      'Users can see the retrieval process',
      'It determines the model architecture'
    ],
    correctAnswer: 1,
    explanation: 'Relevant memories must be retrieved and injected into the prompt before the LLM generates a response. Slow retrieval or retrieving too much can impact latency and context limits.',
    difficulty: 'intermediate',
    category: 'memory'
  },
  {
    id: 'memory-6',
    conceptId: 'agent-memory-systems',
    question: 'What is "recency weighting" in memory retrieval?',
    options: [
      'Only keeping the newest memories',
      'Giving higher priority to recent memories in search results',
      'Deleting old memories automatically',
      'Ordering memories alphabetically'
    ],
    correctAnswer: 1,
    explanation: 'Recency weighting boosts the relevance score of newer memories, ensuring recent context is prioritized. This is often combined with semantic similarity for ranking.',
    difficulty: 'intermediate',
    category: 'memory'
  },
  {
    id: 'memory-7',
    conceptId: 'agent-memory-systems',
    question: 'What challenge does "memory hallucination" refer to?',
    options: [
      'The agent forgetting everything',
      'The agent fabricating memories of events that didn\'t happen',
      'Memories taking up too much space',
      'Slow memory access'
    ],
    correctAnswer: 1,
    explanation: 'Memory hallucination occurs when an agent confidently recalls information that was never stored, often by confusing retrieved content with generated content.',
    difficulty: 'advanced',
    category: 'memory'
  },
  {
    id: 'memory-8',
    conceptId: 'agent-memory-systems',
    question: 'What is a "memory index" and why is it useful?',
    options: [
      'A numbered list of all memories',
      'A searchable structure that speeds up memory retrieval',
      'The total count of memories',
      'A backup copy of memories'
    ],
    correctAnswer: 1,
    explanation: 'Memory indexes (like vector indexes) organize memories for fast retrieval. Without proper indexing, searching through millions of memories would be prohibitively slow.',
    difficulty: 'intermediate',
    category: 'memory'
  },
  {
    id: 'memory-9',
    conceptId: 'agent-memory-systems',
    question: 'How should sensitive user information be handled in agent memory?',
    options: [
      'Store everything without restrictions',
      'Apply encryption, access controls, and retention policies',
      'Never store any user information',
      'Store only in short-term memory'
    ],
    correctAnswer: 1,
    explanation: 'Sensitive data requires encryption at rest, access controls, data retention limits, and potentially anonymization. This balances personalization with privacy.',
    difficulty: 'intermediate',
    category: 'memory'
  },
  {
    id: 'memory-10',
    conceptId: 'agent-memory-systems',
    question: 'What is "memory pruning" and when is it necessary?',
    options: [
      'Adding new memories',
      'Removing outdated or low-value memories to manage storage and relevance',
      'Copying memories to another system',
      'Converting memories to text'
    ],
    correctAnswer: 1,
    explanation: 'Memory pruning removes outdated, duplicate, or low-importance memories. This prevents storage bloat and ensures retrieved memories remain relevant and high-quality.',
    difficulty: 'advanced',
    category: 'memory'
  }
];

export const agentMemorySystemsTimeEstimate = 12; // minutes
