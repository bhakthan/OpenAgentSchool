// Quiz questions for Agent Cost Optimization concept
// Covers: Token budgets, caching, model routing, cost efficiency

import type { QuizQuestion } from '../quizzes';

export const agentCostOptimizationQuestions: QuizQuestion[] = [
  {
    id: 'cost-1',
    conceptId: 'agent-cost-optimization',
    question: 'What is a "token budget" for an agent?',
    options: [
      'The total cost in dollars',
      'A limit on tokens consumed per request or session',
      'The number of API keys',
      'A marketing budget'
    ],
    correctAnswer: 1,
    explanation: 'Token budgets set limits on input+output tokens to control costs and prevent runaway spending. They can be per-request, per-user, or per-time-period.',
    difficulty: 'beginner',
    category: 'cost'
  },
  {
    id: 'cost-2',
    conceptId: 'agent-cost-optimization',
    question: 'How does semantic caching reduce LLM costs?',
    options: [
      'By using smaller models',
      'By returning cached responses for semantically similar queries',
      'By compressing tokens',
      'By reducing network latency'
    ],
    correctAnswer: 1,
    explanation: 'Semantic caching stores responses and returns them when a new query is semantically similar enough, avoiding redundant LLM calls for near-duplicate requests.',
    difficulty: 'intermediate',
    category: 'cost'
  },
  {
    id: 'cost-3',
    conceptId: 'agent-cost-optimization',
    question: 'What is "model routing" in cost optimization?',
    options: [
      'Sending requests to the nearest server',
      'Directing queries to different models based on complexity and cost',
      'Routing network traffic',
      'Training multiple models'
    ],
    correctAnswer: 1,
    explanation: 'Model routing sends simple queries to cheaper/faster models and complex queries to more capable (expensive) ones, optimizing the cost-quality tradeoff.',
    difficulty: 'intermediate',
    category: 'cost'
  },
  {
    id: 'cost-4',
    conceptId: 'agent-cost-optimization',
    question: 'What is "prompt compression" and when should you use it?',
    options: [
      'Making prompts shorter by removing unnecessary tokens',
      'Zipping prompt files',
      'Using abbreviations',
      'Speaking faster'
    ],
    correctAnswer: 0,
    explanation: 'Prompt compression reduces token count by removing redundancy, summarizing context, or using more concise phrasing—useful for long prompts hitting context limits or cost constraints.',
    difficulty: 'intermediate',
    category: 'cost'
  },
  {
    id: 'cost-5',
    conceptId: 'agent-cost-optimization',
    question: 'Why is output token cost often higher than input token cost?',
    options: [
      'Outputs are more valuable',
      'Generation requires sequential decoding, which is computationally expensive',
      'Outputs are longer',
      'Marketing reasons'
    ],
    correctAnswer: 1,
    explanation: 'Input tokens can be processed in parallel, but output tokens are generated one at a time (autoregressive). This sequential process is more compute-intensive.',
    difficulty: 'advanced',
    category: 'cost'
  },
  {
    id: 'cost-6',
    conceptId: 'agent-cost-optimization',
    question: 'What is "KV cache reuse" and why does it reduce costs?',
    options: [
      'Sharing API keys',
      'Reusing computed attention values for shared prefixes across requests',
      'Caching database queries',
      'Storing user sessions'
    ],
    correctAnswer: 1,
    explanation: 'When multiple requests share a system prompt prefix, KV (key-value) cache reuse avoids recomputing attention for the shared part, reducing compute and cost.',
    difficulty: 'advanced',
    category: 'cost'
  },
  {
    id: 'cost-7',
    conceptId: 'agent-cost-optimization',
    question: 'What is a cost-effective way to handle peak load periods?',
    options: [
      'Over-provision for peak at all times',
      'Use request queuing, rate limiting, and graceful degradation',
      'Reject all requests during peaks',
      'Increase prices during peaks'
    ],
    correctAnswer: 1,
    explanation: 'Queuing smooths spikes, rate limiting prevents cost explosions, and graceful degradation (simpler models during peaks) maintains service without breaking budget.',
    difficulty: 'intermediate',
    category: 'cost'
  },
  {
    id: 'cost-8',
    conceptId: 'agent-cost-optimization',
    question: 'How can you reduce costs for agents with long conversation histories?',
    options: [
      'Always send the full history',
      'Use summarization, sliding windows, or hierarchical memory',
      'Limit users to 3 messages',
      'Charge users per message'
    ],
    correctAnswer: 1,
    explanation: 'Instead of sending all history (expensive), summarize older context, keep only recent messages (sliding window), or use memory retrieval to fetch relevant past context.',
    difficulty: 'intermediate',
    category: 'cost'
  },
  {
    id: 'cost-9',
    conceptId: 'agent-cost-optimization',
    question: 'What is "speculative execution" in LLM optimization?',
    options: [
      'Guessing the answer without calling the LLM',
      'Running a fast model in parallel to draft, then verifying with a slower model',
      'Speculating on token prices',
      'Predicting future queries'
    ],
    correctAnswer: 1,
    explanation: 'Speculative decoding uses a small fast model to generate draft tokens, then a large model verifies them. Accepted tokens skip expensive sequential generation.',
    difficulty: 'advanced',
    category: 'cost'
  },
  {
    id: 'cost-10',
    conceptId: 'agent-cost-optimization',
    question: 'What metrics should you track for agent cost optimization?',
    options: [
      'Only total monthly cost',
      'Cost per query, tokens per task, cache hit rate, model distribution, and ROI',
      'Only token count',
      'Number of users'
    ],
    correctAnswer: 1,
    explanation: 'Effective cost optimization requires granular metrics: cost per query, tokens per successful task, cache hit rates, which models handle which queries, and business value delivered.',
    difficulty: 'intermediate',
    category: 'cost'
  }
];

export const agentCostOptimizationTimeEstimate = 12; // minutes
