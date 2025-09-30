// Getting Started with AI Agents Quiz
import { Quiz } from './types';

export const gettingStartedAgentsQuiz: Quiz = {
  id: 'getting-started-agents',
  title: 'Getting Started with AI Agents',
  description: 'Test your knowledge of building your first AI agent',
  difficulty: 'beginner',
  estimatedTime: 8,
  questions: [
    {
      id: 'start-1',
      question: 'What are the three core components of an AI agent?',
      options: [
        'Frontend, Backend, Database',
        'LLM (Brain), Tools (Hands), Memory (Context)',
        'Input, Process, Output',
        'Training, Testing, Deployment'
      ],
      correctAnswer: 1,
      explanation: 'Every AI agent consists of: an LLM for processing and decisions, Tools for actions and external interactions, and Memory for maintaining context and state across conversations.',
      difficulty: 'beginner',
      tags: ['architecture', 'basics']
    },
    {
      id: 'start-2',
      question: 'Which model should you start with when prototyping a new agent?',
      options: [
        'Always use GPT-4 for best quality',
        'Start with GPT-3.5-Turbo, upgrade to GPT-4 only when needed',
        'Use the most expensive model available',
        'Build your own model from scratch'
      ],
      correctAnswer: 1,
      explanation: 'Start with GPT-3.5-Turbo for prototyping - it\'s faster and cheaper. Upgrade to GPT-4 only when you need better reasoning or have validated that the agent provides value.',
      difficulty: 'beginner',
      tags: ['best-practices', 'model-selection']
    },
    {
      id: 'start-3',
      question: 'What is conversation pruning and why is it necessary?',
      options: [
        'Removing profanity from user inputs',
        'Limiting conversation history to avoid exceeding context window limits',
        'Deleting old conversations from the database',
        'Filtering out irrelevant user questions'
      ],
      correctAnswer: 1,
      explanation: 'Conversation pruning removes old messages from the conversation history to stay within the model\'s context window. Without it, long conversations will eventually exceed token limits and fail.',
      difficulty: 'intermediate',
      tags: ['memory', 'context-management']
    },
    {
      id: 'start-4',
      question: 'What is the purpose of implementing retry logic with exponential backoff?',
      options: [
        'To make the agent respond faster',
        'To handle temporary API failures gracefully by retrying with increasing delays',
        'To reduce costs by batching requests',
        'To improve response quality'
      ],
      correctAnswer: 1,
      explanation: 'Exponential backoff retries failed requests with increasing delays (1s, 2s, 4s, 8s). This handles temporary failures (rate limits, network issues) while avoiding overwhelming the API with rapid retries.',
      difficulty: 'intermediate',
      tags: ['error-handling', 'reliability']
    },
    {
      id: 'start-5',
      question: 'Why should you never trust LLM outputs blindly in production?',
      options: [
        'LLMs are too slow',
        'LLMs can hallucinate incorrect information and make mistakes',
        'LLMs are too expensive',
        'LLMs only work with specific programming languages'
      ],
      correctAnswer: 1,
      explanation: 'LLMs can hallucinate (generate false information) and make mistakes, especially with structured data, math, or factual claims. Always validate critical outputs programmatically before using them.',
      difficulty: 'beginner',
      tags: ['validation', 'best-practices']
    },
    {
      id: 'start-6',
      question: 'What is the recommended way to store your OpenAI API key?',
      options: [
        'Hardcode it directly in your source code',
        'Store it in environment variables using .env file',
        'Share it in your GitHub repository',
        'Include it in comments for documentation'
      ],
      correctAnswer: 1,
      explanation: 'API keys should be stored in environment variables (e.g., .env file) and never committed to version control. This keeps credentials secure and separate from code.',
      difficulty: 'beginner',
      tags: ['security', 'best-practices']
    },
    {
      id: 'start-7',
      question: 'When should you implement a circuit breaker pattern?',
      options: [
        'When you want to make requests faster',
        'When you need to prevent cascading failures from a repeatedly failing service',
        'When you want to save money on API calls',
        'When you need better response quality'
      ],
      correctAnswer: 1,
      explanation: 'Circuit breakers detect when a service is failing repeatedly and "open the circuit" to stop sending requests temporarily. This prevents cascading failures and gives the failing service time to recover.',
      difficulty: 'advanced',
      tags: ['reliability', 'error-handling']
    },
    {
      id: 'start-8',
      question: 'What is the primary benefit of using function calling (tools) in your agent?',
      options: [
        'It makes the agent faster',
        'It allows the agent to perform actions and access external data beyond its training knowledge',
        'It reduces API costs',
        'It improves the agent\'s grammar'
      ],
      correctAnswer: 1,
      explanation: 'Function calling allows agents to execute real actions (search databases, call APIs, perform calculations) and access current information beyond the LLM\'s training data. This extends agent capabilities dramatically.',
      difficulty: 'beginner',
      tags: ['tools', 'function-calling']
    }
  ]
};
