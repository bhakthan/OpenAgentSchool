/**
 * Project Track Definitions for Phase 2 — Practice & Proof-of-Skill
 */

export type CheckType = 'quiz' | 'code' | 'reflection';
export type TrackDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Milestone {
  id: string;
  title: string;
  description: string;
  checkType: CheckType;
  requiredScore: number;
}

export interface ProjectTrack {
  id: string;
  title: string;
  description: string;
  difficulty: TrackDifficulty;
  estimatedHours: number;
  milestones: Milestone[];
}

export const PROJECT_TRACKS: ProjectTrack[] = [
  {
    id: 'support-bot-builder',
    title: 'Support Bot Builder',
    description: 'Build a customer-support chatbot that routes queries, retrieves docs, and escalates to humans.',
    difficulty: 'beginner',
    estimatedHours: 12,
    milestones: [
      { id: 'sbb-1', title: 'Design the conversation flow', description: 'Map user intents, fallback paths, and escalation triggers.', checkType: 'reflection', requiredScore: 70 },
      { id: 'sbb-2', title: 'Implement intent classifier', description: 'Write a keyword-based intent classifier that routes to the correct handler.', checkType: 'code', requiredScore: 80 },
      { id: 'sbb-3', title: 'Add document retrieval', description: 'Connect FAQ docs so the bot can answer common questions with sources.', checkType: 'code', requiredScore: 80 },
      { id: 'sbb-4', title: 'Human escalation & guardrails', description: 'Add safety checks and a handoff mechanism when confidence is low.', checkType: 'quiz', requiredScore: 75 },
      { id: 'sbb-5', title: 'End-to-end demo', description: 'Run a live conversation and reflect on what the bot handled well.', checkType: 'reflection', requiredScore: 70 },
    ],
  },
  {
    id: 'rag-tutor-pipeline',
    title: 'RAG Tutor Pipeline',
    description: 'Create a retrieval-augmented generation tutor that answers questions from your own study materials.',
    difficulty: 'intermediate',
    estimatedHours: 18,
    milestones: [
      { id: 'rtp-1', title: 'Chunk & embed documents', description: 'Split markdown notes into chunks and generate embeddings with a local model.', checkType: 'code', requiredScore: 80 },
      { id: 'rtp-2', title: 'Build a vector search index', description: 'Store embeddings and implement cosine-similarity retrieval.', checkType: 'code', requiredScore: 85 },
      { id: 'rtp-3', title: 'Prompt engineering for tutoring', description: 'Craft system prompts that make the LLM teach rather than just answer.', checkType: 'reflection', requiredScore: 70 },
      { id: 'rtp-4', title: 'Evaluate retrieval quality', description: 'Quiz on precision, recall, and hallucination detection in RAG systems.', checkType: 'quiz', requiredScore: 80 },
      { id: 'rtp-5', title: 'Add citation grounding', description: 'Ensure every answer cites the source chunk so learners can verify.', checkType: 'code', requiredScore: 85 },
    ],
  },
  {
    id: 'commerce-agent',
    title: 'Commerce Agent',
    description: 'Design an agent that browses a product catalogue, compares items, and recommends purchases.',
    difficulty: 'advanced',
    estimatedHours: 24,
    milestones: [
      { id: 'ca-1', title: 'Model the product domain', description: 'Define product, cart, and order schemas the agent will operate on.', checkType: 'code', requiredScore: 80 },
      { id: 'ca-2', title: 'Implement tool-use actions', description: 'Create search, compare, and add-to-cart tools the agent can invoke.', checkType: 'code', requiredScore: 85 },
      { id: 'ca-3', title: 'ReAct reasoning loop', description: 'Build a Reason-Act loop that plans multi-step shopping tasks.', checkType: 'code', requiredScore: 85 },
      { id: 'ca-4', title: 'Safety & budget constraints', description: 'Quiz on agentic guardrails: budget caps, PII handling, and confirmation gates.', checkType: 'quiz', requiredScore: 80 },
      { id: 'ca-5', title: 'Observability & tracing', description: 'Add structured logging so every agent decision can be audited.', checkType: 'code', requiredScore: 80 },
      { id: 'ca-6', title: 'Capstone reflection', description: 'Write a post-mortem on what went well and what you would change.', checkType: 'reflection', requiredScore: 70 },
    ],
  },
];

export function getTrackById(id: string): ProjectTrack | undefined {
  return PROJECT_TRACKS.find(t => t.id === id);
}
