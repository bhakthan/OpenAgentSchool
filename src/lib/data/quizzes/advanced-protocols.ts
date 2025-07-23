// src/lib/data/quizzes/advanced-protocols.ts
import { QuizQuestion } from './types';

export const advancedProtocolsQuestions: QuizQuestion[] = [
  {
    id: 'adv-proto-i1',
    text: 'What is the primary purpose of the Agent-to-Agent (A2A) communication protocol?',
    question: 'What is the primary purpose of the Agent-to-Agent (A2A) communication protocol?',
    options: [
      'To render user interfaces in agent systems.',
      'To enable direct, secure, and interoperable communication between autonomous agents.',
      'To manage agent lifecycle and deployment.',
      'To store and retrieve data for a single agent.'
    ],
    correctAnswer: 1,
    explanation: 'The A2A protocol is designed to facilitate direct and secure communication between different AI agents, ensuring they can interact and collaborate effectively, even if they are built on different platforms.',
    difficulty: 'intermediate',
    category: 'advanced-protocols',
    subCategory: 'a2a',
    relatedTopics: ['a2a', 'multi-agent-systems', 'interoperability'],
    relatedConcepts: ['a2a', 'multi-agent-systems', 'interoperability'],
    timeEstimate: 45,
    persona: ['agent-developer', 'ai-engineer', 'agent-architect']
  },
  {
    id: 'adv-proto-a1',
    text: 'In a multi-agent system using A2A, how would two agents typically establish a trusted connection?',
    question: 'In a multi-agent system using A2A, how would two agents typically establish a trusted connection?',
    options: [
      'By broadcasting their private keys to the network.',
      'Through a centralized directory service where agents are pre-registered.',
      'Using a decentralized identity system (e.g., DIDs) and exchanging verifiable credentials.',
      'They trust each other by default without any verification.'
    ],
    correctAnswer: 2,
    explanation: 'Modern A2A communication often relies on decentralized identifiers (DIDs) and verifiable credentials. This allows agents to prove their identity and capabilities to each other without relying on a central authority, establishing a secure and trustless connection.',
    difficulty: 'advanced',
    category: 'advanced-protocols',
    subCategory: 'a2a',
    relatedTopics: ['decentralized-identity', 'verifiable-credentials', 'agent-security'],
    relatedConcepts: ['decentralized-identity', 'verifiable-credentials', 'agent-security'],
    timeEstimate: 60,
    persona: ['agent-developer', 'ai-engineer', 'agent-architect']
  },
  {
    id: 'adv-proto-i2',
    text: 'What problem does the Model Context Protocol (MCP) aim to solve?',
    question: 'What problem does the Model Context Protocol (MCP) aim to solve?',
    options: [
      'It helps agents to render complex 3D graphics.',
      'It provides a standardized way for agents to manage and share contextual information with LLMs.',
      'It is a protocol for agents to play games against each other.',
      'It is used for routing network traffic between agents.'
    ],
    correctAnswer: 1,
    explanation: 'MCP provides a structured format for agents to package and send contextual data (like user preferences, session history, or external data) to a language model. This ensures the model has the necessary information to generate relevant and accurate responses.',
    difficulty: 'intermediate',
    category: 'advanced-protocols',
    subCategory: 'mcp',
    relatedTopics: ['mcp', 'llm', 'context-management'],
    relatedConcepts: ['mcp', 'llm', 'context-management'],
    timeEstimate: 45,
    persona: ['agent-developer', 'ai-engineer', 'agent-architect']
  },
  {
    id: 'adv-proto-a2',
    text: 'Which of the following code snippets correctly formats a message according to a simplified Model Context Protocol (MCP)?',
    question: 'Which of the following code snippets correctly formats a message according to a simplified Model Context Protocol (MCP)?',
    options: [
      '`const mcp_message = { "user_query": "find flights", "data": { "from": "SFO", "to": "LAX" } }`',
      '`const mcp_message = { "protocol": "mcp", "version": "1.0", "context": { "user_id": "123", "session_id": "abc" }, "messages": [{ "role": "user", "content": "Find flights from SFO to LAX" }] }`',
      '`const mcp_message = "protocol: mcp, content: Find flights from SFO to LAX"`',
      '`const mcp_message = <mcp><user>Find flights from SFO to LAX</user></mcp>`'
    ],
    correctAnswer: 1,
    explanation: 'A well-structured MCP message includes metadata like the protocol and version, a context object for persistent information, and a list of messages. This structure allows the receiving model to understand the full context of the request.',
    difficulty: 'advanced',
    category: 'advanced-protocols',
    subCategory: 'mcp',
    codeExample: 'const mcp_message = {\n  "protocol": "mcp",\n  "version": "1.0",\n  "context": {\n    "user_id": "123",\n    "session_id": "abc",\n    "app_state": { "page": "flight-search" }\n  },\n  "messages": [\n    { "role": "user", "content": "Find flights from SFO to LAX" },\n    { "role": "assistant", "content": "I can help with that. When would you like to travel?" },\n    { "role": "user", "content": "Tomorrow." }\n  ]\n}',
    relatedTopics: ['mcp', 'json', 'api-design'],
    relatedConcepts: ['mcp', 'json', 'api-design'],
    timeEstimate: 90,
    persona: ['agent-developer', 'ai-engineer', 'agent-architect']
  }
];
