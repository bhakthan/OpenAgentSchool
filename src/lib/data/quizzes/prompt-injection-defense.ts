// Quiz questions for Prompt Injection Defense concept
// Covers: Direct injection, indirect injection, defense strategies

import type { QuizQuestion } from '../quizzes';

export const promptInjectionDefenseQuestions: QuizQuestion[] = [
  {
    id: 'injection-1',
    conceptId: 'prompt-injection-defense',
    question: 'What is the difference between direct and indirect prompt injection?',
    options: [
      'Direct is faster than indirect',
      'Direct comes from user input; indirect comes from retrieved/external data',
      'Direct affects only the user; indirect affects the system',
      'There is no difference'
    ],
    correctAnswer: 1,
    explanation: 'Direct injection: malicious prompts in user messages. Indirect injection: malicious content hidden in documents, websites, or other data the agent processes.',
    difficulty: 'beginner',
    category: 'security'
  },
  {
    id: 'injection-2',
    conceptId: 'prompt-injection-defense',
    question: 'What is "privilege escalation" in the context of prompt injection?',
    options: [
      'Getting a promotion',
      'Tricking the agent into performing actions beyond its intended permissions',
      'Increasing API rate limits',
      'Upgrading to a better model'
    ],
    correctAnswer: 1,
    explanation: 'Attackers may trick agents into bypassing restrictions, accessing unauthorized data, or performing prohibited actions by manipulating prompts.',
    difficulty: 'intermediate',
    category: 'security'
  },
  {
    id: 'injection-3',
    conceptId: 'prompt-injection-defense',
    question: 'How do input/output guardrails help prevent prompt injection?',
    options: [
      'They make the model faster',
      'They filter, validate, and sanitize inputs and outputs',
      'They encrypt all communications',
      'They reduce token usage'
    ],
    correctAnswer: 1,
    explanation: 'Guardrails scan inputs for known attack patterns and validate outputs before execution. They act as a security layer around the LLM.',
    difficulty: 'intermediate',
    category: 'security'
  },
  {
    id: 'injection-4',
    conceptId: 'prompt-injection-defense',
    question: 'What is "data/instruction separation" and why is it important?',
    options: [
      'Storing data in different servers',
      'Clearly marking which content is data vs. executable instructions for the LLM',
      'Separating training from inference',
      'Using different API keys'
    ],
    correctAnswer: 1,
    explanation: 'LLMs struggle to distinguish data from instructions. Using delimiters like XML tags (<data>content</data>) helps the model treat content as data, not commands.',
    difficulty: 'intermediate',
    category: 'security'
  },
  {
    id: 'injection-5',
    conceptId: 'prompt-injection-defense',
    question: 'What is an "allowlist" approach to agent actions?',
    options: [
      'Allowing any action the user requests',
      'Only permitting explicitly defined safe actions',
      'A list of allowed users',
      'Whitelisting IP addresses'
    ],
    correctAnswer: 1,
    explanation: 'Allowlists define exactly which actions an agent can take. Even if prompt injection tricks the LLM, the action layer rejects anything not on the list.',
    difficulty: 'beginner',
    category: 'security'
  },
  {
    id: 'injection-6',
    conceptId: 'prompt-injection-defense',
    question: 'How can "canary tokens" help detect prompt injection?',
    options: [
      'They encrypt the prompt',
      'They are secret strings that should never appear in outputs—if they do, injection occurred',
      'They make the model sing',
      'They speed up responses'
    ],
    correctAnswer: 1,
    explanation: 'Canary tokens (secret markers in system prompts) should never leak to outputs. If a canary appears in the response, it indicates the attacker extracted system prompt content.',
    difficulty: 'advanced',
    category: 'security'
  },
  {
    id: 'injection-7',
    conceptId: 'prompt-injection-defense',
    question: 'What is "jailbreaking" in the context of LLM security?',
    options: [
      'Escaping from prison',
      'Bypassing the model\'s safety restrictions and content policies',
      'Breaking the API',
      'Accessing the model weights'
    ],
    correctAnswer: 1,
    explanation: 'Jailbreaking attempts to override safety training and content policies, making the model produce harmful, unethical, or restricted content.',
    difficulty: 'intermediate',
    category: 'security'
  },
  {
    id: 'injection-8',
    conceptId: 'prompt-injection-defense',
    question: 'Why is RAG (Retrieval-Augmented Generation) particularly vulnerable to indirect injection?',
    options: [
      'RAG is slower',
      'Retrieved documents may contain malicious instructions that get injected into prompts',
      'RAG uses more tokens',
      'RAG requires special hardware'
    ],
    correctAnswer: 1,
    explanation: 'RAG retrieves external documents that may be attacker-controlled. Malicious content in these documents becomes part of the prompt context.',
    difficulty: 'intermediate',
    category: 'security'
  },
  {
    id: 'injection-9',
    conceptId: 'prompt-injection-defense',
    question: 'What is "output validation" and why is it essential?',
    options: [
      'Checking grammar in responses',
      'Verifying agent outputs are safe and authorized before execution',
      'Validating JSON format',
      'Spell-checking'
    ],
    correctAnswer: 1,
    explanation: 'Output validation ensures the agent\'s planned actions are safe, authorized, and within scope before they execute. It\'s a critical last line of defense.',
    difficulty: 'intermediate',
    category: 'security'
  },
  {
    id: 'injection-10',
    conceptId: 'prompt-injection-defense',
    question: 'What is the "confused deputy" problem in agent security?',
    options: [
      'An agent with unclear instructions',
      'An agent tricked into using its privileges on behalf of an attacker',
      'Two agents with the same name',
      'A deputy that is confused about its role'
    ],
    correctAnswer: 1,
    explanation: 'The confused deputy problem occurs when a trusted agent (with legitimate privileges) is manipulated into performing unauthorized actions for an attacker.',
    difficulty: 'advanced',
    category: 'security'
  }
];

export const promptInjectionDefenseTimeEstimate = 12; // minutes
