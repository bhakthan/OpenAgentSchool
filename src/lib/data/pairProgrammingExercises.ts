/**
 * Pair Programming Exercises for the AI Pair Programming Studio
 */

export interface CodeCheck {
  label: string;
  pattern: RegExp;
  feedback: string;
}

export interface PairProgrammingExercise {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  hints: string[];
  solutionPattern: string;
  checks: CodeCheck[];
}

export const PAIR_PROGRAMMING_EXERCISES: PairProgrammingExercise[] = [
  {
    id: 'intent-router',
    title: 'Build an Intent Router',
    description:
      'Write a function `routeIntent(message)` that returns "faq", "order-status", or "escalate" based on keywords in the user message.',
    starterCode: `// Route a user message to the correct handler.
// Return "faq" for questions, "order-status" for order lookups, "escalate" otherwise.
function routeIntent(message) {
  // TODO: implement
}`,
    hints: [
      'Convert the message to lowercase before checking keywords.',
      'Look for words like "how", "what", "why" for FAQ intent.',
      'Look for "order", "tracking", "shipment" for order-status.',
    ],
    solutionPattern: 'tool-use',
    checks: [
      { label: 'Defines routeIntent function', pattern: /function\s+routeIntent/, feedback: 'Define a function called routeIntent.' },
      { label: 'Handles FAQ intent', pattern: /faq/i, feedback: 'Return "faq" for question-like messages.' },
      { label: 'Handles order-status intent', pattern: /order[_-]?status/i, feedback: 'Return "order-status" for order-related messages.' },
      { label: 'Handles escalation fallback', pattern: /escalate/i, feedback: 'Return "escalate" as the default fallback.' },
    ],
  },
  {
    id: 'prompt-template',
    title: 'Craft a System Prompt',
    description:
      'Write a `buildSystemPrompt(context)` function that assembles a system prompt for a tutoring agent. It must include a role instruction, the retrieved context, and a constraint to cite sources.',
    starterCode: `// Build a system prompt for a RAG tutoring agent.
// The prompt must: (1) set the agent role, (2) include context, (3) require citations.
function buildSystemPrompt(context) {
  // TODO: implement
}`,
    hints: [
      'Start with "You are a helpful tutor…" as the role instruction.',
      'Include the context variable between XML-style tags like <context>.',
      'Add an explicit instruction: "Always cite the source chunk."',
    ],
    solutionPattern: 'rag-pattern',
    checks: [
      { label: 'Defines buildSystemPrompt function', pattern: /function\s+buildSystemPrompt/, feedback: 'Define a function called buildSystemPrompt.' },
      { label: 'Sets an agent role', pattern: /(you are|role|tutor|assistant)/i, feedback: 'Include a role instruction for the agent.' },
      { label: 'Uses the context parameter', pattern: /context/i, feedback: 'Incorporate the context parameter into the prompt.' },
      { label: 'Requires citations', pattern: /(cite|source|reference)/i, feedback: 'Instruct the agent to cite sources.' },
    ],
  },
  {
    id: 'guardrail-filter',
    title: 'Implement a Guardrail Filter',
    description:
      'Write a `filterResponse(response)` function that redacts PII (emails and phone numbers) from an agent response before returning it to the user.',
    starterCode: `// Redact PII from an agent response.
// Replace emails with [EMAIL] and phone numbers with [PHONE].
function filterResponse(response) {
  // TODO: implement
}`,
    hints: [
      'Use a regex like /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}/ for emails.',
      'Use a regex like /\\b\\d{3}[-.]?\\d{3}[-.]?\\d{4}\\b/ for US phone numbers.',
      'Chain .replace() calls to handle both patterns.',
    ],
    solutionPattern: 'guardrails',
    checks: [
      { label: 'Defines filterResponse function', pattern: /function\s+filterResponse/, feedback: 'Define a function called filterResponse.' },
      { label: 'Redacts emails', pattern: /\[EMAIL\]/i, feedback: 'Replace email addresses with [EMAIL].' },
      { label: 'Redacts phone numbers', pattern: /\[PHONE\]/i, feedback: 'Replace phone numbers with [PHONE].' },
      { label: 'Uses regex replacement', pattern: /\.replace\s*\(/, feedback: 'Use .replace() with regex patterns to redact PII.' },
    ],
  },
];

export function getExerciseById(id: string): PairProgrammingExercise | undefined {
  return PAIR_PROGRAMMING_EXERCISES.find(e => e.id === id);
}
