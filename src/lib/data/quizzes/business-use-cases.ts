// src/lib/data/quizzes/business-use-cases.ts
import { QuizQuestion } from './types';

export const businessUseCasesQuestions: QuizQuestion[] = [
  {
    id: 'use-case-i1',
    text: 'A company wants to automate its IT help desk. A single agent is created to handle password resets, software installation requests, and network troubleshooting. Which agent pattern is most suitable for this scenario?',
    question: 'Which agent pattern is most suitable for a single agent handling various IT help desk tasks?',
    options: [
      'A simple ReAct (Reason and Act) agent that can use a set of tools (e.g., a password reset API, a software deployment script).',
      'A multi-agent system with a dedicated agent for each type of task.',
      'A self-reflection agent that only analyzes its own performance without taking action.',
      'An agent that can only respond to user queries with text and cannot perform actions.'
    ],
    correctAnswer: 0,
    explanation: 'For a single agent that needs to decide which tool to use for a given request, the ReAct pattern is ideal. It allows the agent to reason about the user\'s intent and then act by selecting the appropriate tool from its toolkit.',
    difficulty: 'intermediate',
    category: 'business-use-cases',
    subCategory: 'single-agent',
    relatedTopics: ['react-pattern', 'tool-use', 'it-automation'],
    persona: ['agent-developer', 'ai-engineer', 'agent-architect', 'business-leader']
  },
  {
    id: 'use-case-a1',
    text: 'A financial services firm wants to build a system for analyzing market data. The system requires one agent to fetch real-time stock prices, another to run complex analytical models, and a third to summarize the findings into a report. How would you best architect this?',
    question: 'How would you best architect a multi-agent system for financial market analysis?',
    options: [
      'A single, monolithic agent trying to do all three tasks sequentially.',
      'A multi-agent system where the agents work in a hierarchical structure: a "manager" agent delegates tasks to the "data fetcher" and "analyst" agents, then passes the results to the "reporter" agent.',
      'Three independent agents that do not communicate and require manual intervention to connect their workflows.',
      'A single agent that relies only on a pre-trained LLM without access to any external tools or data.'
    ],
    correctAnswer: 1,
    explanation: 'This is a classic multi-agent use case. A hierarchical or collaborative multi-agent architecture is most effective. A manager or orchestrator agent can coordinate the specialized agents, ensuring a smooth workflow from data gathering to final report generation.',
    difficulty: 'advanced',
    category: 'business-use-cases',
    subCategory: 'multi-agent',
    relatedTopics: ['multi-agent-systems', 'hierarchical-agents', 'financial-analysis'],
    persona: ['agent-architect', 'ai-engineer', 'business-leader']
  },
  {
    id: 'use-case-a2',
    text: 'You are designing an e-commerce agent that provides personalized recommendations. The agent needs to access the user\'s purchase history and the product catalog. What is the most secure way to integrate this?',
    question: 'What is the most secure way to integrate an e-commerce recommendation agent with user data and product catalogs?',
    codeExample: "// Example of an agent making a secure API call\nasync function getRecommendations(userId: string): Promise<Product[]> {\n  const userHistory = await secureApi.get(`/user/${userId}/history`);\n  const productCatalog = await secureApi.get('/products');\n\n  // The agent uses the retrieved data to make a recommendation\n  const recommendation = await llm.generateRecommendation(userHistory, productCatalog);\n\n  return recommendation;\n}",
    options: [
      'Store the entire user database and product catalog in the agent\'s prompt.',
      'Allow the agent to have direct, unrestricted SQL database access.',
      'Provide the agent with read-only access to specific, secured API endpoints for fetching user history and product data.',
      'Hardcode a small, static list of products directly into the agent.'
    ],
    correctAnswer: 2,
    explanation: 'The most secure and scalable integration pattern is to provide the agent with limited, read-only access to well-defined APIs. This follows the principle of least privilege, preventing the agent from accessing or modifying sensitive data beyond its scope.',
    difficulty: 'advanced',
    category: 'business-use-cases',
    subCategory: 'integration',
    relatedTopics: ['agent-security', 'api-integration', 'principle-of-least-privilege'],
    persona: ['agent-developer', 'agent-architect', 'ai-engineer']
  }
];
