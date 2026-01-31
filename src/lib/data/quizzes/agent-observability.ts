// Quiz questions for Agent Observability concept
// Covers: Tracing, Logging, Metrics, Debugging distributed agents

import type { QuizQuestion } from '../quizzes';

export const agentObservabilityQuestions: QuizQuestion[] = [
  {
    id: 'observability-1',
    conceptId: 'agent-observability',
    question: 'What is a "trace" in agent observability?',
    options: [
      'A log message',
      'A record of an entire request journey through the system',
      'A debugging breakpoint',
      'A type of error'
    ],
    correctAnswer: 1,
    explanation: 'A trace follows a single request from start to finish, including all LLM calls, tool invocations, and intermediate steps—essential for debugging complex agent workflows.',
    difficulty: 'beginner',
    category: 'observability'
  },
  {
    id: 'observability-2',
    conceptId: 'agent-observability',
    question: 'What is a "span" in distributed tracing?',
    options: [
      'The total time of a request',
      'A single operation within a trace (e.g., one LLM call)',
      'The distance between services',
      'A type of metric'
    ],
    correctAnswer: 1,
    explanation: 'A span represents one unit of work—like an LLM call or tool execution. Spans are nested within traces and can have parent-child relationships.',
    difficulty: 'intermediate',
    category: 'observability'
  },
  {
    id: 'observability-3',
    conceptId: 'agent-observability',
    question: 'Why is trace context propagation important in multi-agent systems?',
    options: [
      'It reduces costs',
      'It connects related operations across service boundaries',
      'It makes agents faster',
      'It encrypts communications'
    ],
    correctAnswer: 1,
    explanation: 'Context propagation ensures that when Agent A calls Agent B, the trace ID is passed along. This creates a complete picture of the request flow across all agents.',
    difficulty: 'intermediate',
    category: 'observability'
  },
  {
    id: 'observability-4',
    conceptId: 'agent-observability',
    question: 'What should you log for LLM calls in production?',
    options: [
      'Nothing—LLM calls are private',
      'Prompt templates, token counts, latency, model version, and cost',
      'Only error messages',
      'The entire prompt and response verbatim'
    ],
    correctAnswer: 1,
    explanation: 'Log metadata (tokens, latency, model, cost) for all calls. Log full prompts/responses only in debug mode or with PII redaction for privacy compliance.',
    difficulty: 'intermediate',
    category: 'observability'
  },
  {
    id: 'observability-5',
    conceptId: 'agent-observability',
    question: 'What is "agent introspection"?',
    options: [
      'Training the agent on itself',
      'The agent\'s ability to report its own reasoning and state',
      'Debugging using print statements',
      'Automated testing'
    ],
    correctAnswer: 1,
    explanation: 'Introspection lets agents explain their reasoning, current goals, and decision-making process. This aids debugging and builds user trust through transparency.',
    difficulty: 'advanced',
    category: 'observability'
  },
  {
    id: 'observability-6',
    conceptId: 'agent-observability',
    question: 'Which metric is most important for detecting agent loops?',
    options: [
      'Total cost',
      'Number of steps per request with identical or similar actions',
      'Response length',
      'User satisfaction score'
    ],
    correctAnswer: 1,
    explanation: 'Tracking step count and action similarity helps detect infinite loops where the agent repeats the same actions. Alert when step count exceeds expected maximum.',
    difficulty: 'intermediate',
    category: 'observability'
  },
  {
    id: 'observability-7',
    conceptId: 'agent-observability',
    question: 'What is a "flamegraph" useful for in agent debugging?',
    options: [
      'Visualizing temperature settings',
      'Showing time spent in different parts of the agent workflow',
      'Displaying error rates',
      'Graphing token usage'
    ],
    correctAnswer: 1,
    explanation: 'Flamegraphs visualize where time is spent—which LLM calls, tools, or processing steps are slowest. Essential for performance optimization.',
    difficulty: 'advanced',
    category: 'observability'
  },
  {
    id: 'observability-8',
    conceptId: 'agent-observability',
    question: 'How should you handle PII in observability data?',
    options: [
      'Log everything for debugging',
      'Implement redaction, masking, or anonymization before logging',
      'Never log anything',
      'Store in a separate database'
    ],
    correctAnswer: 1,
    explanation: 'PII must be redacted or masked in logs and traces to comply with privacy regulations (GDPR, CCPA). Use automated detection and scrubbing.',
    difficulty: 'intermediate',
    category: 'observability'
  },
  {
    id: 'observability-9',
    conceptId: 'agent-observability',
    question: 'What is "semantic logging" for agents?',
    options: [
      'Logging in multiple languages',
      'Structured logs that capture agent intent and reasoning, not just actions',
      'Logging using vector embeddings',
      'Logging to semantic databases'
    ],
    correctAnswer: 1,
    explanation: 'Semantic logging captures the "why" behind actions—the agent\'s goals, reasoning, and decision points—not just the "what" of function calls and responses.',
    difficulty: 'advanced',
    category: 'observability'
  },
  {
    id: 'observability-10',
    conceptId: 'agent-observability',
    question: 'Which tool is commonly used for distributed tracing in agent systems?',
    options: [
      'printf debugging',
      'OpenTelemetry with Jaeger or similar backends',
      'Console.log only',
      'Manual log files'
    ],
    correctAnswer: 1,
    explanation: 'OpenTelemetry provides a standard for traces, metrics, and logs. Backends like Jaeger, Zipkin, or commercial solutions (Datadog, Honeycomb) visualize the data.',
    difficulty: 'intermediate',
    category: 'observability'
  }
];

export const agentObservabilityTimeEstimate = 12; // minutes
