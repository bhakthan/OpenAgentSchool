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
    explanation: 'The A2A Protocol v1.0 RC, now under Linux Foundation governance, is designed to facilitate direct and secure communication between different AI agents. It ensures they can interact and collaborate effectively, even if they are built on different platforms. IBM\'s ACP merged into A2A in August 2025.',
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
    text: 'In A2A v1.0, how do agents typically establish trusted connections?',
    question: 'In A2A v1.0, how do agents typically establish trusted connections?',
    options: [
      'By broadcasting their private keys to the network.',
      'Through Agent Cards that advertise securitySchemes like OAuth2 or API keys.',
      'They trust each other by default without any verification.',
      'Using only IP address whitelisting.'
    ],
    correctAnswer: 1,
    explanation: 'A2A v1.0 uses Agent Cards that include securitySchemes defining authentication methods like OAuth2 authorization code flows or API key authentication. This allows agents to discover each other\'s capabilities and establish secure connections based on standardized security protocols.',
    difficulty: 'advanced',
    category: 'advanced-protocols',
    subCategory: 'a2a',
    relatedTopics: ['agent-card', 'oauth2', 'agent-security'],
    relatedConcepts: ['agent-card', 'oauth2', 'agent-security'],
    timeEstimate: 60,
    persona: ['agent-developer', 'ai-engineer', 'agent-architect']
  },
  {
    id: 'adv-proto-a1b',
    text: 'What are the three protocol bindings supported in A2A v1.0?',
    question: 'What are the three protocol bindings supported in A2A v1.0?',
    options: [
      'SOAP, XML-RPC, and WebSocket',
      'JSON-RPC 2.0, gRPC, and HTTP+JSON/REST',
      'GraphQL, MQTT, and AMQP',
      'TCP/IP, UDP, and ICMP'
    ],
    correctAnswer: 1,
    explanation: 'A2A v1.0 uses a 3-layer architecture with Protocol Buffers for the canonical data model, Abstract Operations for binding-agnostic logic, and three concrete Protocol Bindings: JSON-RPC 2.0 (with SSE streaming), gRPC (with server streaming), and HTTP+JSON/REST.',
    difficulty: 'advanced',
    category: 'advanced-protocols',
    subCategory: 'a2a',
    relatedTopics: ['protocol-bindings', 'grpc', 'json-rpc'],
    relatedConcepts: ['protocol-bindings', 'grpc', 'json-rpc'],
    timeEstimate: 45,
    persona: ['agent-developer', 'ai-engineer', 'agent-architect']
  },
  {
    id: 'adv-proto-i1b',
    text: 'Which task state in A2A v1.0 indicates that an agent needs additional information from the user?',
    question: 'Which task state in A2A v1.0 indicates that an agent needs additional information from the user?',
    options: [
      'WORKING',
      'SUBMITTED',
      'INPUT_REQUIRED',
      'COMPLETED'
    ],
    correctAnswer: 2,
    explanation: 'A2A v1.0 defines 8 task states: SUBMITTED, WORKING, COMPLETED, FAILED, CANCELED, INPUT_REQUIRED, AUTH_REQUIRED, and REJECTED. INPUT_REQUIRED indicates the agent needs more information from the user to proceed, enabling interactive multi-turn workflows.',
    difficulty: 'intermediate',
    category: 'advanced-protocols',
    subCategory: 'a2a',
    relatedTopics: ['task-states', 'multi-turn', 'workflow'],
    relatedConcepts: ['task-states', 'multi-turn', 'workflow'],
    timeEstimate: 30,
    persona: ['agent-developer', 'ai-engineer', 'agent-architect']
  },
  {
    id: 'adv-proto-i1c',
    text: 'What feature in A2A v1.0 enables grouping related tasks for multi-turn conversations?',
    question: 'What feature in A2A v1.0 enables grouping related tasks for multi-turn conversations?',
    options: [
      'sessionToken',
      'conversationId',
      'contextId',
      'threadId'
    ],
    correctAnswer: 2,
    explanation: 'The contextId feature in A2A v1.0 allows related tasks to be grouped together for multi-turn conversations. This maintains conversational continuity across task boundaries and enables agents to preserve context across multiple interactions.',
    difficulty: 'intermediate',
    category: 'advanced-protocols',
    subCategory: 'a2a',
    relatedTopics: ['context-id', 'multi-turn', 'conversation'],
    relatedConcepts: ['context-id', 'multi-turn', 'conversation'],
    timeEstimate: 30,
    persona: ['agent-developer', 'ai-engineer', 'agent-architect']
  },
  {
    id: 'adv-proto-i1d',
    text: 'Which organization now governs the A2A Protocol?',
    question: 'Which organization now governs the A2A Protocol?',
    options: [
      'Google exclusively',
      'The Linux Foundation with a TSC including Google, Microsoft, IBM, AWS, and others',
      'IBM exclusively',
      'The Apache Software Foundation'
    ],
    correctAnswer: 1,
    explanation: 'A2A Protocol v1.0 RC is now under Linux Foundation governance with a Technical Steering Committee including representatives from Google, Microsoft, IBM, AWS, Cisco, Salesforce, ServiceNow, and SAP. IBM\'s Agent Communication Protocol (ACP) merged into A2A in August 2025.',
    difficulty: 'intermediate',
    category: 'advanced-protocols',
    subCategory: 'a2a',
    relatedTopics: ['linux-foundation', 'governance', 'open-source'],
    relatedConcepts: ['linux-foundation', 'governance', 'open-source'],
    timeEstimate: 30,
    persona: ['agent-developer', 'ai-engineer', 'agent-architect']
  },
  {
    id: 'adv-proto-i2',
    text: 'What problem does the Model Context Protocol (MCP) aim to solve?',
    question: 'What problem does the Model Context Protocol (MCP) aim to solve?',
    options: [
      'It helps agents to render complex 3D graphics.',
      'It provides a standardized way for agents to connect to tools, APIs, and data sources.',
      'It is a protocol for agents to play games against each other.',
      'It is used for routing network traffic between agents.'
    ],
    correctAnswer: 1,
    explanation: 'MCP (Model Context Protocol) provides a standardized way for AI agents to connect to external tools, APIs, and data sources. While A2A handles agent-to-agent communication, MCP handles agent-to-tool connections. They are complementary protocols.',
    difficulty: 'intermediate',
    category: 'advanced-protocols',
    subCategory: 'mcp',
    relatedTopics: ['mcp', 'tools', 'context-management'],
    relatedConcepts: ['mcp', 'tools', 'context-management'],
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
  },
  {
    id: 'adv-proto-a3',
    text: 'What happened to IBM\'s Agent Communication Protocol (ACP)?',
    question: 'What happened to IBM\'s Agent Communication Protocol (ACP)?',
    options: [
      'It was deprecated and discontinued.',
      'It merged into the A2A Protocol under the Linux Foundation in August 2025.',
      'It became a separate standard competing with A2A.',
      'It was acquired by Google and renamed.'
    ],
    correctAnswer: 1,
    explanation: 'IBM\'s Agent Communication Protocol (ACP) officially merged into the A2A Protocol under the Linux Foundation in August 2025. ACP contributed enterprise orchestration patterns and the BeeAI platform\'s production-tested agent runtime. BeeAI users can migrate using A2AServer and A2AAgent adapters.',
    difficulty: 'advanced',
    category: 'advanced-protocols',
    subCategory: 'a2a',
    relatedTopics: ['acp', 'ibm', 'linux-foundation', 'beeai'],
    relatedConcepts: ['acp', 'ibm', 'linux-foundation', 'beeai'],
    timeEstimate: 45,
    persona: ['agent-developer', 'ai-engineer', 'agent-architect']
  },
  {
    id: 'adv-proto-a4',
    text: 'What is the relationship between A2A and MCP protocols?',
    question: 'What is the relationship between A2A and MCP protocols?',
    options: [
      'They are competing protocols that do the same thing.',
      'A2A replaced MCP entirely.',
      'They are complementary: A2A for agent-to-agent, MCP for agent-to-tool.',
      'MCP is a subset of A2A.'
    ],
    correctAnswer: 2,
    explanation: 'A2A and MCP are complementary protocols. A2A (Agent-to-Agent) handles peer collaboration between autonomous agents, while MCP (Model Context Protocol) handles connecting agents to tools, APIs, and data sources. An A2A agent may use MCP internally to access tools needed to complete tasks.',
    difficulty: 'advanced',
    category: 'advanced-protocols',
    subCategory: 'a2a',
    relatedTopics: ['a2a', 'mcp', 'integration'],
    relatedConcepts: ['a2a', 'mcp', 'integration'],
    timeEstimate: 45,
    persona: ['agent-developer', 'ai-engineer', 'agent-architect']
  }
];
