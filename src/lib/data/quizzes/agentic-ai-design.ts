import { QuizQuestion } from './types';

export const agenticAIDesignQuestions: QuizQuestion[] = [
  // Beginner Level Questions
  {
    id: 'agentic-ai-design-1',
    text: 'What is the primary characteristic that defines an Agentic AI system?',
    question: 'What is the primary characteristic that defines an Agentic AI system?',
    options: [
      'High processing speed and computational power',
      'Autonomous decision-making based on goals and context',
      'Large memory capacity for data storage',
      'Advanced natural language processing capabilities'
    ],
    correctAnswer: 1,
    explanation: 'Agentic AI systems are defined by their ability to make autonomous decisions based on goals and context, rather than simply following predetermined instructions. Understanding autonomy is crucial for designing AI systems that can operate independently in business environments.',
    difficulty: 'beginner',
    category: 'agentic-ai-design',
    subCategory: 'agentic-ai-design',
    timeEstimate: 60
  },
  {
    id: 'agentic-ai-design-2',
    text: 'Which framework emphasizes plugin-based architecture for enterprise integration?',
    question: 'Which framework emphasizes plugin-based architecture for enterprise integration?',
    options: [
      'CrewAI',
      'LangGraph', 
      'Microsoft Agent Framework (unified Semantic Kernel + AutoGen)',
      'Custom implementation'
    ],
    correctAnswer: 2,
    explanation: 'Microsoft Agent Framework (which unified Semantic Kernel and AutoGen) is specifically designed with a plugin-based architecture to facilitate enterprise integration and skill orchestration. Semantic Kernel provided the production-grade plugin system, while AutoGen contributed prototyping patterns. Choosing the right framework for enterprise integration is critical for successful AI deployment.',
    difficulty: 'beginner',
    category: 'agentic-ai-design',
    subCategory: 'agent-framework',
    timeEstimate: 45
  },

  // Intermediate Level Questions
  {
    id: 'agentic-ai-design-3',
    text: 'What is the main advantage of graph-based workflow architecture like LangGraph?',
    question: 'What is the main advantage of graph-based workflow architecture like LangGraph?',
    options: [
      'Faster execution speed than linear workflows',
      'Better memory efficiency for large datasets',
      'Conditional logic and complex decision trees',
      'Simplified debugging and error handling'
    ],
    correctAnswer: 2,
    explanation: 'Graph-based architectures excel at handling conditional logic and complex decision trees, allowing for sophisticated workflow control. Complex business processes often require conditional logic and branching workflows that graph architectures handle well.',
    difficulty: 'intermediate',
    category: 'agentic-ai-design',
    subCategory: 'agentic-ai-design',
    timeEstimate: 75
  },
  {
    id: 'agentic-ai-design-4',
    text: 'Which communication protocol is emerging as the standard for secure tool integration?',
    question: 'Which communication protocol is emerging as the standard for secure tool integration?',
    options: [
      'HTTP REST API',
      'GraphQL',
      'Model Context Protocol (MCP)',
      'gRPC'
    ],
    correctAnswer: 2,
    explanation: 'Model Context Protocol (MCP) is emerging as the standard for secure tool integration with standardized interfaces for AI agents. Security and standardization in tool integration are essential for enterprise AI deployments.',
    difficulty: 'intermediate',
    category: 'agentic-ai-design',
    subCategory: 'agentic-ai-design',
    timeEstimate: 90
  },
  {
    id: 'agentic-ai-design-5',
    text: 'What is the primary challenge with rigid architectures in agentic AI systems?',
    question: 'What is the primary challenge with rigid architectures in agentic AI systems?',
    options: [
      'High computational costs',
      'Difficulty in debugging',
      'Limited agent adaptability and flexibility',
      'Poor integration with existing systems'
    ],
    correctAnswer: 2,
    explanation: 'Rigid architectures limit agent adaptability, preventing them from adjusting to new scenarios or requirements dynamically. Business environments change rapidly, requiring AI systems that can adapt to new requirements and scenarios.',
    difficulty: 'intermediate',
    category: 'agentic-ai-design',
    subCategory: 'agentic-ai-design',
    timeEstimate: 80
  },

  // Advanced Level Questions  
  {
    id: 'agentic-ai-design-6',
    text: 'In a service-oriented agentic AI architecture, what role do W3C specifications play?',
    question: 'In a service-oriented agentic AI architecture, what role do W3C specifications play?',
    options: [
      'Define security protocols for agent communication',
      'Provide performance benchmarks for agent evaluation',
      'Ensure web standards compliance for interoperability',
      'Specify memory management requirements for agents'
    ],
    correctAnswer: 2,
    explanation: 'W3C specifications ensure adherence to web standards, enabling interoperability across different platforms and systems. Enterprise systems must integrate with existing web infrastructure and standards for maximum compatibility.',
    difficulty: 'advanced',
    category: 'agentic-ai-design',
    subCategory: 'agentic-ai-design',
    timeEstimate: 120
  },
  {
    id: 'agentic-ai-design-7',
    text: 'What is the most critical factor for achieving scalability in multi-agent systems?',
    question: 'What is the most critical factor for achieving scalability in multi-agent systems?',
    options: [
      'Using the fastest available hardware',
      'Implementing hierarchical organization and load balancing',
      'Reducing the number of agents in the system',
      'Using only synchronous communication patterns'
    ],
    correctAnswer: 1,
    explanation: 'Hierarchical organization and load balancing are essential for managing large numbers of agents efficiently across distributed systems. Enterprise AI systems must scale to handle thousands of concurrent operations while maintaining performance.',
    difficulty: 'advanced',
    category: 'agentic-ai-design',
    subCategory: 'agentic-ai-design',
    timeEstimate: 150
  },
  {
    id: 'agentic-ai-design-8',
    text: 'How does the Agora Protocol address the challenge of agent discovery in distributed systems?',
    question: 'How does the Agora Protocol address the challenge of agent discovery in distributed systems?',
    options: [
      'By using centralized databases for agent registration',
      'Through decentralized marketplace and capability matching',
      'By implementing direct peer-to-peer connections only',
      'Through manual configuration and static routing'
    ],
    correctAnswer: 1,
    explanation: 'Agora Protocol creates a decentralized marketplace for agents with capability matching, enabling dynamic discovery without central coordination. Large distributed AI systems need efficient ways for agents to find and collaborate with relevant peers.',
    difficulty: 'advanced',
    category: 'agentic-ai-design',
    subCategory: 'agentic-ai-design',
    timeEstimate: 135
  }
];

// Calculate total time for this category
export const agenticAIDesignTime = agenticAIDesignQuestions.reduce((total, question) => total + question.timeEstimate, 0);
