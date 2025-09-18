import { QuizQuestion } from './types';

export const agenticCommerceAp2Questions: QuizQuestion[] = [
  {
    id: 'ap2-1',
    text: 'Which mandate provides the original scoped delegation a user grants an agent in AP2?',
    question: 'Which mandate provides the original scoped delegation a user grants an agent in AP2?',
    options: [
      'Cart Mandate',
      'Intent Mandate',
      'Payment Mandate',
      'Settlement Mandate'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    category: 'agentic-commerce-ap2',
    subCategory: 'mandates',
    explanation: 'The Intent Mandate carries user constraints (price caps, categories, expiry) and presence mode; downstream mandates link back to it.',
    relatedConcepts: ['agent-security','mcp-a2a-integration','agentic-commerce-ap2'],
    timeEstimate: 35,
    learningObjectives: ['Identify mandate roles']
  },
  {
    id: 'ap2-2',
    text: 'Primary security purpose of the Cart Mandate?',
    question: 'What is the primary security / trust purpose of the Cart Mandate in AP2?',
    options: [
      'Allow post‑approval item substitution',
      'Capture immutable pricing & items snapshot',
      'Provide agent presence signaling to payment rails',
      'Define delegation constraints & expiry'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    category: 'agentic-commerce-ap2',
    subCategory: 'mandates',
    explanation: 'Cart Mandate is a cryptographically signed immutable snapshot binding items + totals to the originating Intent.',
    relatedConcepts: ['agent-security','agentic-commerce-ap2'],
    timeEstimate: 40
  },
  {
    id: 'ap2-3',
    text: 'Presence signaling is conveyed to networks via which mandate?',
    question: 'Presence signaling (human-present vs delegated) is conveyed to networks via which AP2 mandate?',
    options: [
      'Intent Mandate',
      'Cart Mandate',
      'Payment Mandate',
      'Offer Mandate'
    ],
    correctAnswer: 2,
    difficulty: 'beginner',
    category: 'agentic-commerce-ap2',
    subCategory: 'presence',
    explanation: 'Payment Mandate includes presence mode + agent metadata for risk tiering.',
    relatedConcepts: ['agent-security','agentic-commerce-ap2'],
    timeEstimate: 30
  },
  {
    id: 'ap2-4',
    text: 'Select ALL properties that typically belong in an Intent Mandate (multi-select).',
    question: 'Select ALL properties that typically belong in an Intent Mandate (multi-select).',
    options: [
      'Maximum spend limit',
      'Allowed product categories',
      'Immutable finalized item list',
      'Delegation expiry timestamp',
      'Presence mode (human_present / delegated)'
    ],
    correctAnswer: -1,
    correctAnswers: [0,1,3,4],
    difficulty: 'advanced',
    category: 'agentic-commerce-ap2',
    subCategory: 'constraints',
    explanation: 'Intent includes: max spend, allowed categories, expiry, presence. Immutable finalized list is only in the Cart Mandate.',
    relatedConcepts: ['agent-security','mcp','agentic-commerce-ap2'],
    timeEstimate: 70,
    learningObjectives: ['Differentiate mandate data placement']
  },
  {
    id: 'ap2-5',
    text: 'Ordered sequence: When delegated purchase is auto-triggered, what is the correct mandate chain emission order?',
    question: 'Ordered sequence: When delegated purchase is auto-triggered, what is the correct mandate chain emission order?',
    options: [
      'Payment → Intent → Cart',
      'Cart → Intent → Payment',
      'Intent → Cart → Payment',
      'Intent → Payment → Cart'
    ],
    correctAnswer: 2,
    difficulty: 'beginner',
    category: 'agentic-commerce-ap2',
    subCategory: 'sequence',
    explanation: 'The chain is foundational: Intent first; Cart binds items to Intent; Payment references Cart.',
    relatedConcepts: ['agentic-commerce-ap2'],
    timeEstimate: 35
  },
  {
    id: 'ap2-6',
    text: 'Main audit advantage of cryptographic linkage across mandates?',
    question: 'What is the main audit / dispute resolution advantage of cryptographic linkage across mandates?',
    options: [
      'Allows merchants to alter carts post-settlement',
      'Reduces need for any logging',
      'Enables deterministic reconstruction & non‑repudiation',
      'Eliminates PCI compliance obligations'
    ],
    correctAnswer: 2,
    difficulty: 'intermediate',
    category: 'agentic-commerce-ap2',
    subCategory: 'audit',
    explanation: 'Hash-linked mandate chain = verifiable path proving delegation & cart integrity.',
    relatedConcepts: ['agent-security','agentic-commerce-ap2'],
    timeEstimate: 45
  }
];
