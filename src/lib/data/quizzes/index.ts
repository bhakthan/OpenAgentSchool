// Main quiz data aggregation and utility functions
import { QuizCategory, QuizQuestion, UserPersona, QuizSession, QuizFeedback } from './types';
import { userPersonas } from './personas';
import { coreConceptsQuestions } from './core-concepts';
import { agentPatternsQuestions } from './agent-patterns';
import { agentSecurityQuestions } from './agent-security';
import { agentEthicsQuestions } from './agent-ethics';
import { multiAgentSystemsQuestions } from './multi-agent-systems';
import { azureServicesQuestions } from './azure-services';
import { dataVisualizationQuestions } from './data-visualization';
import { agentDeploymentQuestions } from './agent-deployment';
import { agentLearningQuestions } from './agent-learning';
import { agentIntegrationQuestions } from './agent-integration';
import { advancedProtocolsQuestions } from './advanced-protocols';
import { agentEvaluationQuestions } from './agent-evaluation';
import { businessUseCasesQuestions } from './business-use-cases';
import { systemDesignQuestions } from './system-design';

// Export types and personas
export type { QuizCategory, QuizQuestion, UserPersona, QuizSession, QuizFeedback };
export { userPersonas };

// Combine all quiz questions
const allQuestions = [
  ...coreConceptsQuestions,
  ...agentPatternsQuestions,
  ...agentSecurityQuestions,
  ...agentEthicsQuestions,
  ...multiAgentSystemsQuestions,
  ...azureServicesQuestions,
  ...dataVisualizationQuestions,
  ...agentDeploymentQuestions,
  ...agentLearningQuestions,
  ...agentIntegrationQuestions,
  ...advancedProtocolsQuestions,
  ...agentEvaluationQuestions,
  ...businessUseCasesQuestions,
  ...systemDesignQuestions
];

// --- Dynamically calculate estimated time for each category ---
const calculateTotalTime = (questions: QuizQuestion[]): number => {
  const totalSeconds = questions.reduce((sum, q) => sum + (q.timeEstimate || 0), 0);
  return Math.round(totalSeconds / 60);
};

const coreConceptsTime = calculateTotalTime(coreConceptsQuestions);
const agentPatternsTime = calculateTotalTime(agentPatternsQuestions);
const agentSecurityTime = calculateTotalTime(agentSecurityQuestions);
const agentEthicsTime = calculateTotalTime(agentEthicsQuestions);
const multiAgentSystemsTime = calculateTotalTime(multiAgentSystemsQuestions);
const azureServicesTime = calculateTotalTime(azureServicesQuestions);
const dataVisualizationTime = calculateTotalTime(dataVisualizationQuestions);
const agentDeploymentTime = calculateTotalTime(agentDeploymentQuestions);
const agentLearningTime = calculateTotalTime(agentLearningQuestions);
const agentIntegrationTime = calculateTotalTime(agentIntegrationQuestions);
const advancedProtocolsTime = calculateTotalTime(advancedProtocolsQuestions);
const agentEvaluationTime = calculateTotalTime(agentEvaluationQuestions);
const businessUseCasesTime = calculateTotalTime(businessUseCasesQuestions);
const systemDesignTime = calculateTotalTime(systemDesignQuestions);
// ----------------------------------------------------------------

// Quiz categories configuration
export const quizCategories: QuizCategory[] = [
  {
    id: 'core-concepts',
    name: 'Core Concepts',
    description: 'Fundamental AI agent concepts and principles',
    icon: 'Brain',
    totalQuestions: coreConceptsQuestions.length,
    estimatedTime: coreConceptsTime,
    subCategories: [
      {
        id: 'agents',
        name: 'AI Agents',
        description: 'Understanding AI agents, their components, and lifecycle',
        prerequisites: [],
        questions: coreConceptsQuestions.filter(q => q.subCategory === 'agents')
      }
    ]
  },
  {
    id: 'agent-patterns',
    name: 'Agent Patterns',
    description: 'Common patterns and approaches for AI agent implementation',
    icon: 'Cog',
    totalQuestions: agentPatternsQuestions.length,
    estimatedTime: agentPatternsTime,
    subCategories: [
      {
        id: 'voice-agent',
        name: 'Voice Agent',
        description: 'Voice-enabled AI agent patterns',
        prerequisites: ['core-concepts'],
        questions: agentPatternsQuestions.filter(q => q.subCategory === 'voice-agent')
      },
      {
        id: 'computer-use',
        name: 'Computer Use',
        description: 'Agents that interact with computer interfaces',
        prerequisites: ['core-concepts'],
        questions: agentPatternsQuestions.filter(q => q.subCategory === 'computer-use')
      },
      {
        id: 'code-act',
        name: 'Code Act',
        description: 'Agents that write and execute code',
        prerequisites: ['core-concepts'],
        questions: agentPatternsQuestions.filter(q => q.subCategory === 'code-act')
      },
      {
        id: 'react-pattern',
        name: 'ReAct Pattern',
        description: 'Reason and Act pattern for transparent decision-making',
        prerequisites: ['voice-agent', 'computer-use', 'code-act'],
        questions: agentPatternsQuestions.filter(q => q.subCategory === 'react-pattern')
      },
      {
        id: 'self-reflection',
        name: 'Self-Reflection',
        description: 'Agents that evaluate and improve their own performance',
        prerequisites: ['react-pattern'],
        questions: agentPatternsQuestions.filter(q => q.subCategory === 'self-reflection')
      }
    ]
  },
  {
    id: 'agent-security',
    name: 'Agent Security',
    description: 'Security considerations for AI agent systems',
    icon: 'Shield',
    totalQuestions: agentSecurityQuestions.length,
    estimatedTime: agentSecurityTime,
    subCategories: [
      {
        id: 'security-fundamentals',
        name: 'Security Fundamentals',
        description: 'Basic security principles for AI agents',
        prerequisites: ['core-concepts'],
        questions: agentSecurityQuestions.filter(q => q.subCategory === 'security-fundamentals')
      },
      {
        id: 'threat-analysis',
        name: 'Threat Analysis',
        description: 'Identifying and mitigating security threats',
        prerequisites: ['security-fundamentals'],
        questions: agentSecurityQuestions.filter(q => q.subCategory === 'threat-analysis')
      },
      {
        id: 'enterprise-security',
        name: 'Enterprise Security',
        description: 'Security for enterprise AI agent deployments',
        prerequisites: ['threat-analysis'],
        questions: agentSecurityQuestions.filter(q => q.subCategory === 'enterprise-security')
      },
      {
        id: 'prompt-security',
        name: 'Prompt Security',
        description: 'Securing AI agents against prompt injection',
        prerequisites: ['security-fundamentals'],
        questions: agentSecurityQuestions.filter(q => q.subCategory === 'prompt-security')
      },
      {
        id: 'data-protection',
        name: 'Data Protection',
        description: 'Protecting sensitive data in AI agent systems',
        prerequisites: ['enterprise-security'],
        questions: agentSecurityQuestions.filter(q => q.subCategory === 'data-protection')
      }
    ]
  },
  {
    id: 'agent-ethics',
    name: 'Agent Ethics',
    description: 'Ethical considerations for AI agent development',
    icon: 'Heart',
    totalQuestions: agentEthicsQuestions.length,
    estimatedTime: agentEthicsTime,
    subCategories: [
      {
        id: 'ethical-principles',
        name: 'Ethical Principles',
        description: 'Core ethical principles for AI agent systems',
        prerequisites: ['core-concepts'],
        questions: agentEthicsQuestions.filter(q => q.subCategory === 'ethical-principles')
      },
      {
        id: 'bias-prevention',
        name: 'Bias Prevention',
        description: 'Preventing bias in AI agent systems',
        prerequisites: ['ethical-principles'],
        questions: agentEthicsQuestions.filter(q => q.subCategory === 'bias-prevention')
      },
      {
        id: 'governance-frameworks',
        name: 'Governance Frameworks',
        description: 'Frameworks for ethical AI agent governance',
        prerequisites: ['bias-prevention'],
        questions: agentEthicsQuestions.filter(q => q.subCategory === 'governance-frameworks')
      }
    ]
  },
  {
    id: 'multi-agent-systems',
    name: 'Multi-Agent Systems',
    description: 'Systems with multiple collaborating AI agents',
    icon: 'Users',
    totalQuestions: multiAgentSystemsQuestions.length,
    estimatedTime: multiAgentSystemsTime,
    subCategories: [
      {
        id: 'fundamentals',
        name: 'Fundamentals',
        description: 'Basic concepts of multi-agent systems',
        prerequisites: ['core-concepts'],
        questions: multiAgentSystemsQuestions.filter(q => q.subCategory === 'fundamentals')
      },
      {
        id: 'design-challenges',
        name: 'Design Challenges',
        description: 'Challenges in multi-agent system design',
        prerequisites: ['fundamentals'],
        questions: multiAgentSystemsQuestions.filter(q => q.subCategory === 'design-challenges')
      },
      {
        id: 'architecture-patterns',
        name: 'Architecture Patterns',
        description: 'Architectural patterns for multi-agent systems',
        prerequisites: ['design-challenges'],
        questions: multiAgentSystemsQuestions.filter(q => q.subCategory === 'architecture-patterns')
      },
      {
        id: 'communication-protocols',
        name: 'Communication Protocols',
        description: 'Protocols for agent communication',
        prerequisites: ['fundamentals'],
        questions: multiAgentSystemsQuestions.filter(q => q.subCategory === 'communication-protocols')
      },
      {
        id: 'autogen-framework',
        name: 'AutoGen Framework',
        description: 'Microsoft AutoGen for multi-agent conversations',
        prerequisites: ['fundamentals'],
        questions: multiAgentSystemsQuestions.filter(q => q.subCategory === 'autogen-framework')
      }
    ]
  },
  {
    id: 'azure-services',
    name: 'Azure Services',
    description: 'Azure services for AI agent development',
    icon: 'CloudArrowUp',
    totalQuestions: azureServicesQuestions.length,
    estimatedTime: azureServicesTime,
    subCategories: [
      {
        id: 'azure-openai',
        name: 'Azure OpenAI',
        description: 'Using Azure OpenAI Service with AI agents',
        prerequisites: ['core-concepts'],
        questions: azureServicesQuestions.filter(q => q.subCategory === 'azure-openai')
      }
    ]
  },
  {
    id: 'data-visualization',
    name: 'Data Visualization',
    description: 'Visualizing AI agent data and performance',
    icon: 'ChartBar',
    totalQuestions: dataVisualizationQuestions.length,
    estimatedTime: dataVisualizationTime,
    subCategories: [
      {
        id: 'fundamentals',
        name: 'Visualization Fundamentals',
        description: 'Basic concepts of data visualization for AI agents',
        prerequisites: ['core-concepts'],
        questions: dataVisualizationQuestions.filter(q => q.subCategory === 'fundamentals')
      },
      {
        id: 'visualization-types',
        name: 'Visualization Types',
        description: 'Different types of visualizations for agent data',
        prerequisites: ['fundamentals'],
        questions: dataVisualizationQuestions.filter(q => q.subCategory === 'visualization-types')
      },
      {
        id: 'real-time-systems',
        name: 'Real-time Systems',
        description: 'Real-time visualization for agent monitoring',
        prerequisites: ['visualization-types'],
        questions: dataVisualizationQuestions.filter(q => q.subCategory === 'real-time-systems')
      }
    ]
  },
  {
    id: 'agent-deployment',
    name: 'Agent Deployment',
    description: 'Deploying AI agents to production environments',
    icon: 'CloudUpload',
    totalQuestions: agentDeploymentQuestions.length,
    estimatedTime: agentDeploymentTime,
    subCategories: [
      {
        id: 'deployment-fundamentals',
        name: 'Deployment Fundamentals',
        description: 'Basic principles of agent deployment',
        prerequisites: ['core-concepts'],
        questions: agentDeploymentQuestions.filter(q => q.subCategory === 'deployment-fundamentals')
      },
      {
        id: 'azure-deployment',
        name: 'Azure Deployment',
        description: 'Deploying agents on Azure platform',
        prerequisites: ['deployment-fundamentals'],
        questions: agentDeploymentQuestions.filter(q => q.subCategory === 'azure-deployment')
      },
      {
        id: 'cicd-pipelines',
        name: 'CI/CD Pipelines',
        description: 'Continuous integration and deployment for agents',
        prerequisites: ['azure-deployment'],
        questions: agentDeploymentQuestions.filter(q => q.subCategory === 'cicd-pipelines')
      }
    ]
  },
  {
    id: 'agent-learning',
    name: 'Agent Learning',
    description: 'Learning and adaptation mechanisms for AI agents',
    icon: 'AcademicCap',
    totalQuestions: agentLearningQuestions.length,
    estimatedTime: agentLearningTime,
    subCategories: [
      {
        id: 'learning-fundamentals',
        name: 'Learning Fundamentals',
        description: 'Basic concepts of agent learning',
        prerequisites: ['core-concepts'],
        questions: agentLearningQuestions.filter(q => q.subCategory === 'learning-fundamentals')
      },
      {
        id: 'learning-types',
        name: 'Learning Types',
        description: 'Different types of learning mechanisms',
        prerequisites: ['learning-fundamentals'],
        questions: agentLearningQuestions.filter(q => q.subCategory === 'learning-types')
      },
      {
        id: 'continual-learning',
        name: 'Continual Learning',
        description: 'Advanced learning techniques for agents',
        prerequisites: ['learning-types'],
        questions: agentLearningQuestions.filter(q => q.subCategory === 'continual-learning')
      }
    ]
  },
  {
    id: 'agent-integration',
    name: 'Agent Integration',
    description: 'Integrating AI agents with existing systems',
    icon: 'Link',
    totalQuestions: agentIntegrationQuestions.length,
    estimatedTime: agentIntegrationTime,
    subCategories: [
      {
        id: 'integration-fundamentals',
        name: 'Integration Fundamentals',
        description: 'Basic principles of agent integration',
        prerequisites: ['core-concepts'],
        questions: agentIntegrationQuestions.filter(q => q.subCategory === 'integration-fundamentals')
      },
      {
        id: 'integration-patterns',
        name: 'Integration Patterns',
        description: 'Common patterns for agent integration',
        prerequisites: ['integration-fundamentals'],
        questions: agentIntegrationQuestions.filter(q => q.subCategory === 'integration-patterns')
      },
      {
        id: 'high-availability',
        name: 'High Availability',
        description: 'Building resilient agent integrations',
        prerequisites: ['integration-patterns'],
        questions: agentIntegrationQuestions.filter(q => q.subCategory === 'high-availability')
      }
    ]
  },
  {
    id: 'advanced-protocols',
    name: 'Advanced Protocols',
    description: 'Advanced communication and context protocols for agents',
    icon: 'ShareNetwork',
    totalQuestions: advancedProtocolsQuestions.length,
    estimatedTime: advancedProtocolsTime,
    subCategories: [
      {
        id: 'a2a',
        name: 'A2A Protocol',
        description: 'Agent-to-Agent communication patterns',
        prerequisites: ['multi-agent-systems'],
        questions: advancedProtocolsQuestions.filter(q => q.subCategory === 'a2a')
      },
      {
        id: 'mcp',
        name: 'Model Context Protocol',
        description: 'Managing and sharing contextual information with LLMs',
        prerequisites: ['core-concepts'],
        questions: advancedProtocolsQuestions.filter(q => q.subCategory === 'mcp')
      }
    ]
  },
  {
    id: 'agent-evaluation',
    name: 'Agent Evaluation',
    description: 'Methods and metrics for evaluating agent performance.',
    icon: 'ClipboardCheck',
    totalQuestions: agentEvaluationQuestions.length,
    estimatedTime: agentEvaluationTime,
    subCategories: [
      {
        id: 'fundamentals',
        name: 'Fundamentals',
        description: 'Core concepts in agent evaluation.',
        prerequisites: ['core-concepts'],
        questions: agentEvaluationQuestions.filter(q => q.subCategory === 'fundamentals')
      },
      {
        id: 'metrics',
        name: 'Metrics',
        description: 'Key metrics for assessing agent performance.',
        prerequisites: ['fundamentals'],
        questions: agentEvaluationQuestions.filter(q => q.subCategory === 'metrics')
      },
      {
        id: 'techniques',
        name: 'Techniques',
        description: 'Automated and manual evaluation techniques.',
        prerequisites: ['metrics'],
        questions: agentEvaluationQuestions.filter(q => q.subCategory === 'techniques')
      }
    ]
  },
  {
    id: 'business-use-cases',
    name: 'Business Use Cases',
    description: 'Practical applications of AI agents in business.',
    icon: 'Briefcase',
    totalQuestions: businessUseCasesQuestions.length,
    estimatedTime: businessUseCasesTime,
    subCategories: [
      {
        id: 'single-agent',
        name: 'Single-Agent Scenarios',
        description: 'Use cases solved by a single, autonomous agent.',
        prerequisites: ['agent-patterns'],
        questions: businessUseCasesQuestions.filter(q => q.subCategory === 'single-agent')
      },
      {
        id: 'multi-agent',
        name: 'Multi-Agent Scenarios',
        description: 'Complex problems solved by collaborating agents.',
        prerequisites: ['multi-agent-systems'],
        questions: businessUseCasesQuestions.filter(q => q.subCategory === 'multi-agent')
      },
      {
        id: 'integration',
        name: 'Integration Use Cases',
        description: 'Examples of agents integrated with enterprise systems.',
        prerequisites: ['agent-integration'],
        questions: businessUseCasesQuestions.filter(q => q.subCategory === 'integration')
      }
    ]
  },
  {
    id: 'system-design',
    name: 'System Design',
    description: 'Architectural patterns and design principles for agent systems.',
    icon: 'Blueprint',
    totalQuestions: systemDesignQuestions.length,
    estimatedTime: systemDesignTime,
    subCategories: [
      {
        id: 'prompt-engineering',
        name: 'Prompt Engineering',
        description: 'Designing effective prompts for agent systems.',
        prerequisites: ['core-concepts'],
        questions: systemDesignQuestions.filter(q => q.subCategory === 'prompt-engineering')
      },
      {
        id: 'context-management',
        name: 'Context Management',
        description: 'Managing memory and conversation state in agents.',
        prerequisites: ['prompt-engineering'],
        questions: systemDesignQuestions.filter(q => q.subCategory === 'context-management')
      },
      {
        id: 'architecture',
        name: 'Architecture',
        description: 'System architecture patterns for agent systems.',
        prerequisites: ['context-management'],
        questions: systemDesignQuestions.filter(q => q.subCategory === 'architecture')
      },
      {
        id: 'evaluation',
        name: 'Evaluation',
        description: 'Evaluation frameworks and metrics for agent systems.',
        prerequisites: ['architecture'],
        questions: systemDesignQuestions.filter(q => q.subCategory === 'evaluation')
      },
      {
        id: 'tools',
        name: 'Tool Integration',
        description: 'Integrating external tools with agent systems.',
        prerequisites: ['architecture'],
        questions: systemDesignQuestions.filter(q => q.subCategory === 'tools')
      },
      {
        id: 'security',
        name: 'Security Design',
        description: 'Security considerations in agent system design.',
        prerequisites: ['tools'],
        questions: systemDesignQuestions.filter(q => q.subCategory === 'security')
      },
      {
        id: 'business-alignment',
        name: 'Business Alignment',
        description: 'Aligning agent systems with business objectives.',
        prerequisites: ['core-concepts'],
        questions: systemDesignQuestions.filter(q => q.subCategory === 'business-alignment')
      },
      {
        id: 'user-experience',
        name: 'User Experience',
        description: 'Designing intuitive user experiences for agent systems.',
        prerequisites: ['business-alignment'],
        questions: systemDesignQuestions.filter(q => q.subCategory === 'user-experience')
      },
      {
        id: 'codeact-pattern',
        name: 'CodeAct Pattern',
        description: 'System design for code-generating agents.',
        prerequisites: ['architecture'],
        questions: systemDesignQuestions.filter(q => q.subCategory === 'codeact-pattern')
      },
      {
        id: 'multi-agent',
        name: 'Multi-Agent Design',
        description: 'System design for multi-agent coordination.',
        prerequisites: ['architecture'],
        questions: systemDesignQuestions.filter(q => q.subCategory === 'multi-agent')
      },
      {
        id: 'voice-agent',
        name: 'Voice Agent Design',
        description: 'System design for voice-enabled agents.',
        prerequisites: ['architecture'],
        questions: systemDesignQuestions.filter(q => q.subCategory === 'voice-agent')
      }
    ]
  }
];

// Utility functions for quiz management
export const getQuizzesByPersona = (persona: string, difficulty?: 'beginner' | 'intermediate' | 'advanced') => {
  try {
    const filteredQuestions = allQuestions.filter(question => {
      try {
        // Ensure question exists and has required properties
        if (!question || typeof question !== 'object') {
          return false;
        }
        
        // Check if persona property exists and is an array
        const hasPersona = question.persona && Array.isArray(question.persona);
        if (!hasPersona) {
          return false; // Skip questions without persona array
        }
        
        const matchesPersona = question.persona.includes(persona);
        const matchesDifficulty = !difficulty || question.difficulty === difficulty;
        return matchesPersona && matchesDifficulty;
      } catch (err) {
        console.error('Error processing question:', question, err);
        return false;
      }
    });
    
    return filteredQuestions;
  } catch (err) {
    console.error('Error in getQuizzesByPersona:', err);
    return [];
  }
};

export const getQuizzesByCategory = (categoryId: string, difficulty?: 'beginner' | 'intermediate' | 'advanced') => {
  const category = quizCategories.find(c => c.id === categoryId);
  if (!category) return [];
  
  const categoryQuestions: QuizQuestion[] = [];
  category.subCategories.forEach(subCategory => {
    subCategory.questions.forEach(question => {
      if (!difficulty || question.difficulty === difficulty) {
        categoryQuestions.push(question);
      }
    });
  });
  
  return categoryQuestions;
};

export const getQuizzesBySubCategory = (categoryId: string, subCategoryId: string, difficulty?: 'beginner' | 'intermediate' | 'advanced') => {
  const category = quizCategories.find(c => c.id === categoryId);
  if (!category) return [];
  
  const subCategory = category.subCategories.find(sc => sc.id === subCategoryId);
  if (!subCategory) return [];
  
  return subCategory.questions.filter(question => 
    !difficulty || question.difficulty === difficulty
  );
};

export const getRandomQuizzes = (count: number, difficulty?: 'beginner' | 'intermediate' | 'advanced') => {
  const availableQuestions = difficulty 
    ? allQuestions.filter(q => q.difficulty === difficulty)
    : allQuestions;
  
  const shuffled = [...availableQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getQuizById = (id: string): QuizQuestion | undefined => {
  return allQuestions.find(q => q.id === id);
};

export const getPersonaById = (id: string): UserPersona | undefined => {
  return userPersonas.find(p => p.id === id);
};

export const getAllQuestions = () => allQuestions;

export const getQuizStatistics = () => {
  const stats = {
    totalQuestions: allQuestions.length,
    byDifficulty: {
      beginner: allQuestions.filter(q => q.difficulty === 'beginner').length,
      intermediate: allQuestions.filter(q => q.difficulty === 'intermediate').length,
      advanced: allQuestions.filter(q => q.difficulty === 'advanced').length
    },
    byCategory: {} as Record<string, number>,
    byPersona: {} as Record<string, number>
  };
  
  // Count by category
  quizCategories.forEach(category => {
    stats.byCategory[category.id] = category.totalQuestions;
  });
  
  // Count by persona
  userPersonas.forEach(persona => {
    stats.byPersona[persona.id] = allQuestions.filter(q => 
      q.persona && q.persona.includes(persona.id)
    ).length;
  });
  
  return stats;
};

// Additional functions for quiz management
export const generateAdaptiveQuiz = (
  persona: string,
  category: string,
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  questionCount: number = 10
): QuizQuestion[] => {
  const personaQuestions = getQuizzesByPersona(persona, difficulty);
  const categoryQuestions = getQuizzesByCategory(category, difficulty);
  
  // Combine and prioritize questions that match both persona and category
  const prioritizedQuestions = personaQuestions.filter(q => q.category === category);
  const additionalQuestions = categoryQuestions.filter(q => 
    !prioritizedQuestions.find(pq => pq.id === q.id)
  );
  
  let combinedQuestions = [...prioritizedQuestions, ...additionalQuestions];
  
  // If no questions found, try without difficulty filter
  if (combinedQuestions.length === 0) {
    const allPersonaQuestions = getQuizzesByPersona(persona);
    const allCategoryQuestions = getQuizzesByCategory(category);
    
    const allPrioritizedQuestions = allPersonaQuestions.filter(q => q.category === category);
    const allAdditionalQuestions = allCategoryQuestions.filter(q => 
      !allPrioritizedQuestions.find(pq => pq.id === q.id)
    );
    
    combinedQuestions = [...allPrioritizedQuestions, ...allAdditionalQuestions];
  }
  
  // If still no questions, fallback to core concepts
  if (combinedQuestions.length === 0) {
    combinedQuestions = getQuizzesByCategory('core-concepts', difficulty);
    if (combinedQuestions.length === 0) {
      combinedQuestions = getQuizzesByCategory('core-concepts');
    }
  }
  
  // Shuffle and return the requested number of questions
  const shuffled = combinedQuestions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, questionCount);
};

export const calculateQuizScore = (session: QuizSession): number => {
  if (!session.questions || !session.userAnswers) return 0;
  
  const correctAnswers = session.questions.reduce((count, question, index) => {
    const userAnswer = session.userAnswers[index];
    return question.correctAnswer === userAnswer ? count + 1 : count;
  }, 0);
  
  return Math.round((correctAnswers / session.questions.length) * 100);
};

export const generateQuizFeedback = (session: QuizSession): QuizFeedback[] => {
  if (!session.questions || !session.userAnswers) return [];
  
  const feedback: QuizFeedback[] = [];
  
  session.questions.forEach((question, index) => {
    const userAnswer = session.userAnswers[index];
    const isCorrect = question.correctAnswer === userAnswer;
    
    feedback.push({
      type: isCorrect ? 'correct' : 'incorrect',
      message: isCorrect 
        ? 'Correct! Well done.' 
        : `Incorrect. The correct answer is: ${question.options[question.correctAnswer]}`,
      concept: question.category,
      resources: question.relatedTopics,
      isCorrect: isCorrect,
      questionId: question.id,
      explanation: question.explanation || '',
      improvementSuggestions: !isCorrect ? ['Review the concepts related to this topic', 'Practice similar questions'] : []
    });
  });
  
  // Add improvement suggestions based on performance
  const score = calculateQuizScore(session);
  if (score < 70) {
    feedback.push({
      type: 'improvement',
      message: 'Consider reviewing the fundamentals before attempting more advanced topics.',
      concept: 'study-strategy',
      resources: ['Review core concepts', 'Practice with beginner-level questions'],
      isCorrect: false,
      questionId: 'improvement-1',
      explanation: 'Your overall score suggests focusing on foundational concepts will help improve performance.',
      improvementSuggestions: ['Review core concepts', 'Practice with beginner-level questions', 'Take breaks between study sessions']
    });
  }
  
  return feedback;
};
