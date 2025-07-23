// Agent integration quiz questions
import { QuizQuestion } from './types';

export const agentIntegrationQuestions: QuizQuestion[] = [
  {
    id: 'integration-b1',
    question: 'Why is agent integration important for enterprise systems?',
    options: [
      'Only for technical reasons',
      'To enable agents to work with existing systems, data, and workflows',
      'Only for cost reduction',
      'Only for compliance'
    ],
    correctAnswer: 1,
    explanation: 'Agent integration allows AI agents to work seamlessly with existing enterprise systems, access relevant data sources, and fit into established workflows without disrupting operations.',
    difficulty: 'beginner',
    category: 'agent-integration',
    subCategory: 'integration-fundamentals',
    learningObjectives: ['Understand integration importance', 'Recognize enterprise needs'],
    relatedConcepts: ['system-integration', 'data-access', 'workflow-compatibility'],
    persona: ['business-leader', 'no-code-engineer', 'agent-designer'],
    timeEstimate: 35
  },
  {
    id: 'integration-i1',
    question: 'What are the common integration patterns for AI agents?',
    options: [
      'Only direct database access',
      'API integration, message queues, event-driven architectures, and microservices',
      'Only file-based integration',
      'Only manual data entry'
    ],
    correctAnswer: 1,
    explanation: 'Common integration patterns include API integration for service communication, message queues for asynchronous processing, event-driven architectures for reactive systems, and microservices for modular deployment.',
    difficulty: 'intermediate',
    category: 'agent-integration',
    subCategory: 'integration-patterns',
    learningObjectives: ['Identify integration patterns', 'Select appropriate approaches'],
    relatedConcepts: ['api-integration', 'message-queues', 'event-driven', 'microservices'],
    persona: ['agent-developer', 'ai-engineer', 'agent-architect'],
    timeEstimate: 50
  },
  {
    id: 'integration-a1',
    question: 'How should agent integration be designed for high-availability enterprise environments?',
    options: [
      'Only use single connections',
      'Implement connection pooling, circuit breakers, retry logic, and health monitoring',
      'Only use synchronous calls',
      'Only use basic error handling'
    ],
    correctAnswer: 1,
    explanation: 'High-availability integration requires connection pooling for resource management, circuit breakers for fault isolation, retry logic for transient failures, and health monitoring for system visibility.',
    difficulty: 'advanced',
    category: 'agent-integration',
    subCategory: 'high-availability',
    learningObjectives: ['Design resilient integration', 'Implement high-availability patterns'],
    relatedConcepts: ['connection-pooling', 'circuit-breakers', 'retry-logic', 'health-monitoring'],
    persona: ['ai-engineer', 'agent-architect', 'ai-ops-engineer'],
    timeEstimate: 65
  },
  {
    id: 'integration-a2',
    text: 'An agent needs to process a high volume of incoming requests asynchronously. Which integration pattern is most suitable, and why?',
    question: 'Which integration pattern is best for handling a high volume of asynchronous requests?',
    codeExample: "// Example of an agent processing messages from a queue\nconst { consumer } = setupMessageQueue('user-requests');\n\nconsumer.on('message', async (message) => {\n  const request = JSON.parse(message.body);\n  await processRequest(request);\n});",
    options: [
      'Synchronous API calls, because they are simpler to implement.',
      'A message queue, because it decouples the agent from the request source and allows for load balancing and retries.',
      'Direct database connections, to write requests straight to a table.',
      'File-based integration, where the agent polls a directory for new files.'
    ],
    correctAnswer: 1,
    explanation: 'A message queue is the ideal pattern for asynchronous, high-volume workloads. It decouples the message producer from the consumer (the agent), allowing the agent to process requests at its own pace and providing resilience against failures.',
    difficulty: 'advanced',
    category: 'agent-integration',
    subCategory: 'integration-patterns',
    relatedTopics: ['message-queues', 'rabbitmq', 'kafka', 'asynchronous-processing'],
    persona: ['agent-developer', 'ai-engineer', 'agent-architect']
  },
  {
    id: 'integration-a3',
    text: 'What is the purpose of a "circuit breaker" in agent integration?',
    question: 'What is the purpose of a "circuit breaker" in agent integration?',
    codeExample: "// Simplified circuit breaker logic\nfunction callApiWithCircuitBreaker(request) {\n  if (circuitBreaker.isOpen()) {\n    throw new Error('Circuit is open. Service is unavailable.');\n  }\n\n  try {\n    const response = await makeApiCall(request);\n    circuitBreaker.recordSuccess();\n    return response;\n  } catch (error) {\n    circuitBreaker.recordFailure();\n    throw error;\n  }\n}",
    options: [
      'To secure the agent against prompt injection attacks.',
      'To automatically translate messages between different data formats.',
      'To prevent an agent from repeatedly calling a service that is failing, thus preventing cascading failures.',
      'To enforce a strict budget on API calls to reduce cost.'
    ],
    correctAnswer: 2,
    explanation: 'A circuit breaker is a resilience pattern. When a downstream service (like an API) starts to fail, the circuit breaker "opens" and stops the agent from making further calls. This prevents the agent from wasting resources and overwhelming the failing service, which avoids cascading failures in the system.',
    difficulty: 'advanced',
    category: 'agent-integration',
    subCategory: 'high-availability',
    relatedTopics: ['circuit-breaker-pattern', 'resilience', 'fault-tolerance'],
    persona: ['agent-developer', 'ai-engineer', 'agent-architect']
  }
];
