// Quiz questions for Agent Reasoning Patterns concept
// Covers: Chain-of-Thought, Tree-of-Thought, Graph-of-Thought, ReAct

import type { QuizQuestion } from '../quizzes';

export const agentReasoningPatternsQuestions: QuizQuestion[] = [
  {
    id: 'reasoning-1',
    conceptId: 'agent-reasoning-patterns',
    question: 'What is the key characteristic of Chain-of-Thought (CoT) prompting?',
    options: [
      'Generating multiple parallel responses',
      'Breaking down problems into sequential reasoning steps',
      'Using tree structures for decision making',
      'Connecting to external knowledge bases'
    ],
    correctAnswer: 1,
    explanation: 'Chain-of-Thought prompting encourages the model to show its reasoning process step-by-step, improving accuracy on complex problems by making the reasoning explicit.',
    difficulty: 'beginner',
    category: 'reasoning'
  },
  {
    id: 'reasoning-2',
    conceptId: 'agent-reasoning-patterns',
    question: 'How does Tree-of-Thought (ToT) differ from Chain-of-Thought (CoT)?',
    options: [
      'ToT uses smaller models',
      'ToT explores multiple reasoning branches in parallel',
      'ToT requires less computation',
      'ToT only works with math problems'
    ],
    correctAnswer: 1,
    explanation: 'Tree-of-Thought extends CoT by exploring multiple reasoning paths simultaneously, allowing the model to evaluate different approaches and backtrack from dead ends.',
    difficulty: 'intermediate',
    category: 'reasoning'
  },
  {
    id: 'reasoning-3',
    conceptId: 'agent-reasoning-patterns',
    question: 'What does the "Act" in ReAct (Reasoning + Acting) refer to?',
    options: [
      'Activating neural networks',
      'Taking actions in the environment (tool use)',
      'Acting out scenarios for training',
      'Accelerated training'
    ],
    correctAnswer: 1,
    explanation: 'ReAct interleaves reasoning traces with actions (like tool calls) in the environment. The agent reasons about what to do, takes action, observes results, and continues reasoning.',
    difficulty: 'intermediate',
    category: 'reasoning'
  },
  {
    id: 'reasoning-4',
    conceptId: 'agent-reasoning-patterns',
    question: 'When should you use Graph-of-Thought (GoT) over Tree-of-Thought (ToT)?',
    options: [
      'When the problem is simple and linear',
      'When reasoning paths can merge or share intermediate results',
      'When you need the fastest possible response',
      'When working with small language models'
    ],
    correctAnswer: 1,
    explanation: 'Graph-of-Thought is useful when different reasoning paths can converge or share insights. Unlike trees, graphs allow merging branches, enabling richer reasoning structures.',
    difficulty: 'advanced',
    category: 'reasoning'
  },
  {
    id: 'reasoning-5',
    conceptId: 'agent-reasoning-patterns',
    question: 'What is a key limitation of Chain-of-Thought prompting?',
    options: [
      'It cannot be used with large language models',
      'It follows a single linear path and cannot explore alternatives',
      'It requires special hardware',
      'It only works in English'
    ],
    correctAnswer: 1,
    explanation: 'CoT follows one reasoning path. If that path leads to a wrong conclusion, there\'s no mechanism to try alternative approaches. ToT and GoT address this limitation.',
    difficulty: 'intermediate',
    category: 'reasoning'
  },
  {
    id: 'reasoning-6',
    conceptId: 'agent-reasoning-patterns',
    question: 'In ReAct, what happens after the agent observes the result of an action?',
    options: [
      'The agent terminates immediately',
      'The agent generates a new reasoning trace based on the observation',
      'The observation is discarded',
      'The agent starts over from the beginning'
    ],
    correctAnswer: 1,
    explanation: 'ReAct is iterative: Thought → Action → Observation → Thought. After observing action results, the agent reasons about what the observation means and what to do next.',
    difficulty: 'intermediate',
    category: 'reasoning'
  },
  {
    id: 'reasoning-7',
    conceptId: 'agent-reasoning-patterns',
    question: 'What is "self-consistency" in the context of reasoning patterns?',
    options: [
      'Making sure the model agrees with itself',
      'Sampling multiple reasoning paths and selecting the most common answer',
      'Training the model on consistent data',
      'Using the same prompt format consistently'
    ],
    correctAnswer: 1,
    explanation: 'Self-consistency sampling generates multiple CoT reasoning paths for the same problem and takes a majority vote on the final answer, improving reliability.',
    difficulty: 'advanced',
    category: 'reasoning'
  },
  {
    id: 'reasoning-8',
    conceptId: 'agent-reasoning-patterns',
    question: 'Which reasoning pattern is most appropriate for a web research agent?',
    options: [
      'Pure Chain-of-Thought (no tools)',
      'ReAct (interleaved reasoning and tool use)',
      'Tree-of-Thought without actions',
      'Direct answer generation'
    ],
    correctAnswer: 1,
    explanation: 'Web research requires interacting with tools (search, browse, read). ReAct naturally supports this by alternating between reasoning about what to search and executing searches.',
    difficulty: 'intermediate',
    category: 'reasoning'
  },
  {
    id: 'reasoning-9',
    conceptId: 'agent-reasoning-patterns',
    question: 'What is "thought decomposition" in Tree-of-Thought?',
    options: [
      'Breaking the model into smaller components',
      'Dividing a problem into intermediate thought steps that form tree nodes',
      'Reducing model size for efficiency',
      'Separating training from inference'
    ],
    correctAnswer: 1,
    explanation: 'Thought decomposition breaks the problem into meaningful intermediate steps. Each step becomes a node in the tree, allowing systematic exploration of the solution space.',
    difficulty: 'advanced',
    category: 'reasoning'
  },
  {
    id: 'reasoning-10',
    conceptId: 'agent-reasoning-patterns',
    question: 'Why is "few-shot" prompting often used with Chain-of-Thought?',
    options: [
      'To make the model respond faster',
      'To demonstrate the expected reasoning format through examples',
      'To reduce API costs',
      'To enable multilingual support'
    ],
    correctAnswer: 1,
    explanation: 'Few-shot CoT includes examples showing step-by-step reasoning. This demonstrates the expected format and teaches the model how to break down similar problems.',
    difficulty: 'beginner',
    category: 'reasoning'
  }
];

export const agentReasoningPatternsTimeEstimate = 12; // minutes
