// Agent Orchestration Quiz
import { Quiz } from './types';

export const agentOrchestrationQuiz: Quiz = {
  id: 'agent-orchestration',
  title: 'Agent Orchestration Patterns',
  description: 'Test your knowledge of coordinating multiple agents and workflows',
  difficulty: 'intermediate',
  estimatedTime: 10,
  questions: [
    {
      id: 'orch-1',
      question: 'What is the key difference between sequential and parallel orchestration?',
      options: [
        'Sequential is faster than parallel',
        'Sequential executes steps one after another; parallel executes independent steps simultaneously',
        'Parallel is always better than sequential',
        'They are the same thing'
      ],
      correctAnswer: 1,
      explanation: 'Sequential orchestration executes steps one at a time (Step 1 → Step 2 → Step 3), while parallel orchestration runs independent steps simultaneously. Choose based on whether steps depend on each other.',
      difficulty: 'beginner',
      tags: ['orchestration', 'patterns']
    },
    {
      id: 'orch-2',
      question: 'When is the supervisor pattern most appropriate?',
      options: [
        'For simple single-step tasks',
        'For complex workflows requiring planning and coordination of specialized agents',
        'Never, it\'s too complicated',
        'Only for small projects'
      ],
      correctAnswer: 1,
      explanation: 'The supervisor pattern works best for complex workflows where a coordinator agent plans the workflow and delegates specialized tasks to worker agents. Examples: content creation, research pipelines.',
      difficulty: 'intermediate',
      tags: ['supervisor', 'hierarchical']
    },
    {
      id: 'orch-3',
      question: 'What is the purpose of exponential backoff in retry logic?',
      options: [
        'To make retries happen faster',
        'To prevent overwhelming a failing service by increasing delays between retries',
        'To reduce costs',
        'To improve response quality'
      ],
      correctAnswer: 1,
      explanation: 'Exponential backoff increases delay between retries (1s, 2s, 4s, 8s...) to avoid hammering a failing service. This gives the service time to recover and prevents cascading failures.',
      difficulty: 'intermediate',
      tags: ['error-handling', 'reliability']
    },
    {
      id: 'orch-4',
      question: 'In event-driven orchestration, what is the main advantage?',
      options: [
        'It\'s faster than all other patterns',
        'Agents are decoupled and can react independently to events',
        'It requires no code',
        'It\'s cheaper'
      ],
      correctAnswer: 1,
      explanation: 'Event-driven orchestration decouples components - agents subscribe to events and react independently. This enables scalability, parallel processing, and flexible system evolution.',
      difficulty: 'advanced',
      tags: ['event-driven', 'architecture']
    },
    {
      id: 'orch-5',
      question: 'What is a circuit breaker and when should you use it?',
      options: [
        'A tool for debugging code',
        'A pattern that stops sending requests to a failing service to prevent cascading failures',
        'A database connection pooling mechanism',
        'A caching strategy'
      ],
      correctAnswer: 1,
      explanation: 'A circuit breaker detects repeated failures and "opens" to stop sending requests temporarily. After a timeout, it enters "half-open" to test if the service recovered. This prevents cascade failures.',
      difficulty: 'advanced',
      tags: ['circuit-breaker', 'resilience']
    },
    {
      id: 'orch-6',
      question: 'Why is idempotency important in workflow orchestration?',
      options: [
        'It makes workflows faster',
        'It allows workflows to be safely retried without duplicating effects',
        'It reduces memory usage',
        'It\'s not important'
      ],
      correctAnswer: 1,
      explanation: 'Idempotent operations can be repeated safely - running them multiple times has the same effect as running once. This is crucial for retries: if a workflow partially fails and is retried, completed steps won\'t cause issues.',
      difficulty: 'advanced',
      tags: ['idempotency', 'reliability']
    },
    {
      id: 'orch-7',
      question: 'What is the best orchestration pattern for aggregating data from multiple independent sources?',
      options: [
        'Sequential - one source at a time',
        'Parallel - query all sources simultaneously',
        'Event-driven - wait for sources to push data',
        'Conditional - choose only one source'
      ],
      correctAnswer: 1,
      explanation: 'Parallel orchestration is ideal for independent data sources (papers, news, docs). Query all simultaneously using Promise.all(), then combine results. This minimizes total time.',
      difficulty: 'intermediate',
      tags: ['parallel', 'data-aggregation']
    },
    {
      id: 'orch-8',
      question: 'What should you monitor in production orchestrated workflows?',
      options: [
        'Only the final result',
        'Step duration, success/failure rates, bottlenecks, and error patterns',
        'Just the database size',
        'Nothing, if it works'
      ],
      correctAnswer: 1,
      explanation: 'Production observability requires tracking: duration per step (find bottlenecks), success/failure rates (identify unreliable steps), error patterns (fix root causes), and end-to-end latency.',
      difficulty: 'intermediate',
      tags: ['monitoring', 'observability']
    },
    {
      id: 'orch-9',
      question: 'When implementing timeouts in orchestration, what is a good practice?',
      options: [
        'Never use timeouts',
        'Set different timeouts based on expected step duration and have fallback handling',
        'Use the same timeout for all steps',
        'Make timeouts as short as possible'
      ],
      correctAnswer: 1,
      explanation: 'Different steps have different expected durations. Set realistic timeouts based on normal performance + buffer. Too short causes false failures; too long delays error detection. Always have timeout handlers.',
      difficulty: 'intermediate',
      tags: ['timeouts', 'error-handling']
    },
    {
      id: 'orch-10',
      question: 'What is the fallback strategy pattern?',
      options: [
        'Always using the cheapest option',
        'Having alternative approaches when primary method fails (e.g., expert agent → general agent)',
        'Giving up immediately on errors',
        'Retrying the same approach infinitely'
      ],
      correctAnswer: 1,
      explanation: 'Fallback strategy tries a primary approach, and if it fails, falls back to alternatives. Example: try expert agent (better but slower), fallback to general agent (faster but simpler). Degrades gracefully.',
      difficulty: 'intermediate',
      tags: ['fallback', 'resilience']
    }
  ]
};
