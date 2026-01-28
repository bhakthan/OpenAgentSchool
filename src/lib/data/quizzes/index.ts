// Main quiz data aggregation and utility functions
import { QuizCategory, QuizQuestion, UserPersona, QuizSession, QuizFeedback } from './types';
import { userPersonas } from './personas';
import { coreConceptsQuestions } from './core-concepts';
import { agentEthicsQuestions, agentEthicsTime } from './agent-ethics';
import { multiAgentSystemsQuestions } from './multi-agent-systems';
import { azureServicesQuestions } from './azure-services';
import { agentDeploymentQuestions } from './agent-deployment';
import { agentIntegrationQuestions } from './agent-integration';
import { advancedProtocolsQuestions } from './advanced-protocols';
import { agentEvaluationQuestions } from './agent-evaluation';
import { businessUseCasesQuestions } from './business-use-cases';
import { systemDesignQuestions } from './system-design';
import { promptingOptimizationQuestions } from './prompting-optimization';
import { agentPatternsQuestions, agentPatternsTime } from './agent-patterns';
import { agentLearningQuestions, agentLearningTime } from './agent-learning';
import { agentSecurityQuestions, agentSecurityTime } from './agent-security';
import { dataVisualizationQuestions, dataVisualizationTime } from './data-visualization';
import { agenticAIDesignQuestions, agenticAIDesignTime } from './agentic-ai-design';
import { sensoryReasoningEnhancementQuestions, sensoryReasoningEnhancementTime } from './sensory-reasoning-enhancement';
import { educationalAgentPatternsQuestions, educationalAgentPatternsTime } from './educational-agent-patterns';
import { fineTuningQuestions } from './fine-tuning';
import { agenticCommerceAp2Questions } from './agentic-commerce-ap2';
import { agentOpsQuestions } from './agent-ops';
import { dataAutonomyPatternsQuestions } from './data-autonomy-patterns.ts';
import { agenticRoboticsIntegrationQuestions } from './agentic-robotics';
import { adoptionPlaybookQuestions } from './adoption-playbook';
// New Phase 1 foundation quizzes
import { llmFundamentalsQuiz } from './llm-fundamentals';
import { gettingStartedAgentsQuiz } from './getting-started-agents';
import { ragFundamentalsQuiz } from './rag-fundamentals';
import { agentOrchestrationQuiz } from './agent-orchestration';

// Export types and personas
export type { QuizCategory, QuizQuestion, UserPersona, QuizSession, QuizFeedback };
export { userPersonas };

// Combine all quiz questions
const allQuestions = [
  ...llmFundamentalsQuiz.questions,
  ...gettingStartedAgentsQuiz.questions,
  ...ragFundamentalsQuiz.questions,
  ...agentOrchestrationQuiz.questions,
  ...coreConceptsQuestions,
  ...agentEthicsQuestions,
  ...multiAgentSystemsQuestions,
  ...azureServicesQuestions,
  ...agentDeploymentQuestions,
  ...agentIntegrationQuestions,
  ...advancedProtocolsQuestions,
  ...agentEvaluationQuestions,
  ...adoptionPlaybookQuestions,
  ...businessUseCasesQuestions,
  ...systemDesignQuestions,
  ...promptingOptimizationQuestions,
  ...agentPatternsQuestions,
  ...agentLearningQuestions,
  ...agentSecurityQuestions,
  ...dataVisualizationQuestions,
  ...agenticAIDesignQuestions,
  ...sensoryReasoningEnhancementQuestions,
  ...educationalAgentPatternsQuestions,
  ...fineTuningQuestions,
  ...agenticCommerceAp2Questions,
  ...agentOpsQuestions,
  ...dataAutonomyPatternsQuestions,
  ...agenticRoboticsIntegrationQuestions
];

// --- Dynamically calculate estimated time for each category ---
const calculateTotalTime = (questions: QuizQuestion[]): number => {
  return questions.reduce((total, question) => total + (question.timeEstimate || 40), 0);
};

// Helper function to filter questions by subCategory
const getQuestionsBySubCategory = (allQuestions: QuizQuestion[], subCategory: string): QuizQuestion[] => {
  return allQuestions.filter(q => q.subCategory === subCategory);
};

const coreConceptsTime = calculateTotalTime(coreConceptsQuestions);
// const agentEthicsTime = calculateTotalTime(agentEthicsQuestions);
const multiAgentSystemsTime = calculateTotalTime(multiAgentSystemsQuestions);
const azureServicesTime = calculateTotalTime(azureServicesQuestions);
const agentDeploymentTime = calculateTotalTime(agentDeploymentQuestions);
const agentIntegrationTime = calculateTotalTime(agentIntegrationQuestions);
const advancedProtocolsTime = calculateTotalTime(advancedProtocolsQuestions);
const agentEvaluationTime = calculateTotalTime(agentEvaluationQuestions);
const businessUseCasesTime = calculateTotalTime(businessUseCasesQuestions);
const systemDesignTime = calculateTotalTime(systemDesignQuestions);
const promptingOptimizationTime = calculateTotalTime(promptingOptimizationQuestions);
const dataAutonomyPatternsTime = calculateTotalTime(dataAutonomyPatternsQuestions);
const agenticRoboticsTime = calculateTotalTime(agenticRoboticsIntegrationQuestions);
// ----------------------------------------------------------------

// Quiz categories configuration
export const quizCategories: QuizCategory[] = [
  {
    id: 'data-autonomy',
    name: 'Data Autonomy Patterns',
    description: 'Closed-loop data agent patterns: perception, decomposition, grounding, budgeted execution.',
    icon: 'Database',
    totalQuestions: dataAutonomyPatternsQuestions.length,
    estimatedTime: dataAutonomyPatternsTime,
    subCategories: [
      {
        id: 'data-autonomy-core',
        name: 'Core Data Autonomy',
        description: 'Foundational patterns enabling schema-grounded autonomous analytic workflows.',
        prerequisites: ['agent-patterns'],
        questions: dataAutonomyPatternsQuestions
      }
    ]
  },
  {
    id: 'agent-ops',
    name: 'Agent Ops & Reliability',
    description: 'Golden signals, graceful degradation, circuit breakers & rollback patterns',
    icon: 'Activity',
    totalQuestions: agentOpsQuestions.length,
    estimatedTime: calculateTotalTime(agentOpsQuestions),
    subCategories: [
      {
        id: 'agent-ops-core',
        name: 'Operational Foundations',
        description: 'Identify and act on reliability signals for agent systems',
        prerequisites: ['agent-deployment'],
        questions: agentOpsQuestions
      }
    ]
  },
  {
    id: 'agentic-robotics',
    name: 'Agentic Robotics Integration',
    description: 'Blend perception, planning, and safety guardrails for embodied agents and mobile manipulators.',
    icon: 'Robot',
    totalQuestions: agenticRoboticsIntegrationQuestions.length,
    estimatedTime: agenticRoboticsTime,
    subCategories: [
      {
        id: 'agentic-robotics-integration',
        name: 'Integration & Safety Stack',
        description: 'Design policy-gated control loops, telemetry, and guardrails for embodied agents.',
        prerequisites: ['agent-integration', 'agent-ops'],
        questions: agenticRoboticsIntegrationQuestions.filter(q => q.subCategory === 'agentic-robotics-integration')
      },
      {
        id: 'mobile-manipulator-steward',
        name: 'Mobile Manipulator Steward',
        description: 'Apply the steward pattern to autonomous pickup, fallback, and governance routines.',
        prerequisites: ['agentic-robotics-integration'],
        questions: agenticRoboticsIntegrationQuestions.filter(q => q.subCategory === 'mobile-manipulator-steward')
      },
      {
        id: 'adaptive-lab-technician',
        name: 'Adaptive Lab Technician',
        description: 'Govern assay orchestration, calibration discipline, and telemetry-driven recovery loops.',
        prerequisites: ['agentic-robotics-integration'],
        questions: agenticRoboticsIntegrationQuestions.filter(q => q.subCategory === 'adaptive-lab-technician')
      },
      {
        id: 'inventory-guardian',
        name: 'Inventory Guardian',
        description: 'Maintain truthful digital twins, policy-aware replenishment, and audit-grade evidence.',
        prerequisites: ['agentic-robotics-integration'],
        questions: agenticRoboticsIntegrationQuestions.filter(q => q.subCategory === 'inventory-guardian')
      },
      {
        id: 'emergency-response-mate',
        name: 'Emergency Response Mate',
        description: 'Coordinate incident comms, acknowledgement loops, and after-action knowledge capture.',
        prerequisites: ['agentic-robotics-integration'],
        questions: agenticRoboticsIntegrationQuestions.filter(q => q.subCategory === 'emergency-response-mate')
      }
    ]
  },
  {
    id: 'prompting-optimization',
    name: 'Prompting & Optimization',
    description: 'Master agentic prompting, optimization patterns, and evaluation methodologies',
    icon: 'LadderIcon',
    totalQuestions: promptingOptimizationQuestions.length,
    estimatedTime: promptingOptimizationTime,
    subCategories: [
      {
        id: 'agentic-fundamentals',
        name: 'Agentic Prompting Fundamentals',
        description: 'Core principles of prompting AI agents for optimal performance',
        prerequisites: [],
        questions: promptingOptimizationQuestions.filter(q => q.subCategory === 'agentic-fundamentals')
      },
      {
        id: 'optimization-patterns',
        name: 'Prompt Optimization Patterns',
        description: 'Systematic approaches to eliminate contradictions and improve effectiveness',
        prerequisites: ['agentic-fundamentals'],
        questions: promptingOptimizationQuestions.filter(q => q.subCategory === 'optimization-patterns')
      },
      {
        id: 'instruction-design',
        name: 'Agent Instruction Design',
        description: 'Design effective instruction hierarchies and steerability controls',
        prerequisites: ['agentic-fundamentals'],
        questions: promptingOptimizationQuestions.filter(q => q.subCategory === 'instruction-design')
      },
      {
        id: 'workflow-control',
        name: 'Agentic Workflow Control',
        description: 'Advanced workflow patterns, timing control, and multi-tool coordination',
        prerequisites: ['optimization-patterns', 'instruction-design'],
        questions: promptingOptimizationQuestions.filter(q => q.subCategory === 'workflow-control')
      },
      {
        id: 'evaluation-methodologies',
        name: 'Agent Evaluation Methodologies',
        description: 'Comprehensive evaluation frameworks using quantitative and LLM-as-judge techniques',
        prerequisites: ['workflow-control'],
        questions: promptingOptimizationQuestions.filter(q => q.subCategory === 'evaluation-methodologies')
      }
    ]
  },
  {
    id: 'core-concepts',
    name: 'Core Concepts',
    description: 'Fundamental AI agent concepts and principles',
    icon: 'LadderIcon',
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
    estimatedTime: agentPatternsTime,
    totalQuestions: agentPatternsQuestions.length,
    subCategories: [
      {
        id: 'voice-agent',
        name: 'Voice Agent',
        description: 'Voice-enabled AI agent patterns',
        prerequisites: ['core-concepts'],
        questions: getQuestionsBySubCategory(allQuestions, 'voice-agent')
      },
      {
        id: 'computer-use',
        name: 'Computer Use',
        description: 'Agents that interact with computer interfaces',
        prerequisites: ['core-concepts'],
        questions: getQuestionsBySubCategory(allQuestions, 'computer-use')
      },
      {
        id: 'code-act',
        name: 'Code Act',
        description: 'Agents that write and execute code',
        prerequisites: ['core-concepts'],
        questions: getQuestionsBySubCategory(allQuestions, 'code-act')
      },
      {
        id: 'react-pattern',
        name: 'ReAct Pattern',
        description: 'Reason and Act pattern for transparent decision-making',
        prerequisites: ['voice-agent', 'computer-use', 'code-act'],
        questions: getQuestionsBySubCategory(allQuestions, 'react-pattern')
      },
      {
        id: 'self-reflection',
        name: 'Self-Reflection',
        description: 'Agents that evaluate and improve their own performance',
        prerequisites: ['react-pattern'],
        questions: getQuestionsBySubCategory(allQuestions, 'self-reflection')
      },
      {
        id: 'sensory-reasoning-enhancement',
        name: 'Sensory Reasoning Enhancement',
        description: 'Multi-modal AI agents that process visual, auditory, and textual inputs',
        prerequisites: ['self-reflection'],
        questions: getQuestionsBySubCategory(allQuestions, 'sensory-reasoning-enhancement')
      }
    ]
  },
  {
    id: 'agent-security',
    name: 'Agent Security',
    description: 'Security considerations for AI agent systems',
    icon: 'Shield',
    estimatedTime: agentSecurityTime,
    totalQuestions: agentSecurityQuestions.length,
    subCategories: [
      {
        id: 'security-fundamentals',
        name: 'Security Fundamentals',
        description: 'Basic security principles for AI agents',
        prerequisites: ['core-concepts'],
      },
      {
        id: 'threat-analysis',
        name: 'Threat Analysis',
        description: 'Identifying and mitigating security threats',
        prerequisites: ['security-fundamentals'],
      },
      {
        id: 'enterprise-security',
        name: 'Enterprise Security',
        description: 'Security for enterprise AI agent deployments',
        prerequisites: ['threat-analysis'],
      },
      {
        id: 'prompt-security',
        name: 'Prompt Security',
        description: 'Securing AI agents against prompt injection',
        prerequisites: ['security-fundamentals'],
      },
      {
        id: 'data-protection',
        name: 'Data Protection',
        description: 'Protecting sensitive data in AI agent systems',
        prerequisites: ['enterprise-security'],
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
//         questions: agentEthicsQuestions.filter(q => q.subCategory === 'ethical-principles')
      },
      {
        id: 'bias-prevention',
        name: 'Bias Prevention',
        description: 'Preventing bias in AI agent systems',
        prerequisites: ['ethical-principles'],
//         questions: agentEthicsQuestions.filter(q => q.subCategory === 'bias-prevention')
      },
      {
        id: 'governance-frameworks',
        name: 'Governance Frameworks',
        description: 'Frameworks for ethical AI agent governance',
        prerequisites: ['bias-prevention'],
//         questions: agentEthicsQuestions.filter(q => q.subCategory === 'governance-frameworks')
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
        name: 'Agent Framework',
        description: 'Microsoft Agent Framework for multi-agent conversations',
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
    estimatedTime: dataVisualizationTime,
    totalQuestions: dataVisualizationQuestions.length,
    subCategories: [
      {
        id: 'fundamentals',
        name: 'Visualization Fundamentals',
        description: 'Basic concepts of data visualization for AI agents',
        prerequisites: ['core-concepts'],
      },
      {
        id: 'visualization-types',
        name: 'Visualization Types',
        description: 'Different types of visualizations for agent data',
        prerequisites: ['fundamentals'],
      },
      {
        id: 'real-time-systems',
        name: 'Real-time Systems',
        description: 'Real-time visualization for agent monitoring',
        prerequisites: ['visualization-types'],
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
    estimatedTime: agentLearningTime,
    totalQuestions: agentLearningQuestions.length,
    subCategories: [
      {
        id: 'learning-fundamentals',
        name: 'Learning Fundamentals',
        description: 'Basic concepts of agent learning',
        prerequisites: ['core-concepts'],
      },
      {
        id: 'learning-types',
        name: 'Learning Types',
        description: 'Different types of learning mechanisms',
        prerequisites: ['learning-fundamentals'],
      },
      {
        id: 'continual-learning',
        name: 'Continual Learning',
        description: 'Advanced learning techniques for agents',
        prerequisites: ['learning-types'],
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
  },
  {
    id: 'agentic-ai-design',
    name: 'Agentic AI Design Taxonomy',
    description: 'Comprehensive framework for understanding architectural patterns, design principles, and implementation challenges in Agentic AI systems',
    icon: 'Brain',
    totalQuestions: agenticAIDesignQuestions.length,
    estimatedTime: agenticAIDesignTime,
    subCategories: [
      {
        id: 'agentic-ai-design',
        name: 'Agentic AI Design',
        description: 'Architectural patterns and design principles for Agentic AI systems',
        prerequisites: ['core-concepts'],
        questions: agenticAIDesignQuestions
      }
    ]
  },
  {
    id: 'educational-agent-patterns',
    name: 'Educational Agent Patterns',
    description: 'Revolutionary GPT-5 era learning methodologies that transform AI-assisted education',
    icon: 'BookOpen',
    estimatedTime: educationalAgentPatternsTime,
    totalQuestions: educationalAgentPatternsQuestions.length,
    subCategories: [
      {
        id: 'socratic-coach',
        name: 'Socratic Coach',
        description: 'Guide learners through strategic questioning for discovery-based learning',
        prerequisites: ['agent-patterns'],
        questions: getQuestionsBySubCategory(allQuestions, 'socratic-coach')
      },
      {
        id: 'concept-to-project',
        name: 'Concept-to-Project Builder',
        description: 'Transform abstract concepts into concrete implementable projects',
        prerequisites: ['agent-patterns'],
        questions: getQuestionsBySubCategory(allQuestions, 'concept-to-project')
      },
      {
        id: 'error-whisperer',
        name: 'Error Whisperer',
        description: 'Transform debugging frustration into structured learning opportunities',
        prerequisites: ['agent-patterns'],
        questions: getQuestionsBySubCategory(allQuestions, 'error-whisperer')
      },
      {
        id: 'knowledge-map-navigator',
        name: 'Knowledge Map Navigator',
        description: 'Create visual learning paths that accommodate different learning styles',
        prerequisites: ['socratic-coach'],
        questions: getQuestionsBySubCategory(allQuestions, 'knowledge-map-navigator')
      },
      {
        id: 'peer-review-simulator',
        name: 'Peer Review Simulator',
        description: 'Safe practice environment for developing collaborative review skills',
        prerequisites: ['socratic-coach'],
        questions: getQuestionsBySubCategory(allQuestions, 'peer-review-simulator')
      },
      {
        id: 'tool-use-coach',
        name: 'Tool-Use Coach',
        description: 'Disciplined guidance for API/CLI/SDK usage with validated exemplars',
        prerequisites: ['concept-to-project', 'error-whisperer'],
        questions: getQuestionsBySubCategory(allQuestions, 'tool-use-coach')
      },
      {
        id: 'context-curator',
        name: 'Context Curator',
        description: 'Intelligent filtering and relevance management for information overload',
        prerequisites: ['knowledge-map-navigator'],
        questions: getQuestionsBySubCategory(allQuestions, 'context-curator')
      },
      {
        id: 'rubric-rater',
        name: 'Rubric Rater',
        description: 'Automated assessment with detailed, consistent feedback',
        prerequisites: ['peer-review-simulator'],
        questions: getQuestionsBySubCategory(allQuestions, 'rubric-rater')
      },
      {
        id: 'self-remediation-loop',
        name: 'Self-Remediation Loop',
        description: 'Proactive identification and correction of learning gaps',
        prerequisites: ['context-curator', 'rubric-rater'],
        questions: getQuestionsBySubCategory(allQuestions, 'self-remediation-loop')
      },
      {
        id: 'spaced-repetition-planner',
        name: 'Spaced Repetition Planner',
        description: 'Memory consolidation through scientifically-optimized review scheduling',
        prerequisites: ['self-remediation-loop'],
        questions: getQuestionsBySubCategory(allQuestions, 'spaced-repetition-planner')
      },
      {
        id: 'challenge-ladder-generator',
        name: 'Challenge Ladder Generator',
        description: 'Progressive difficulty adaptation for optimal learning challenge',
        prerequisites: ['tool-use-coach', 'self-remediation-loop'],
        questions: getQuestionsBySubCategory(allQuestions, 'challenge-ladder-generator')
      },
      {
        id: 'reflection-journaler',
        name: 'Reflection Journaler',
        description: 'Develop metacognitive skills through structured reflection processes',
        prerequisites: ['spaced-repetition-planner'],
        questions: getQuestionsBySubCategory(allQuestions, 'reflection-journaler')
      },
      {
        id: 'handoff-summarizer',
        name: 'Handoff Summarizer',
        description: 'Ensure knowledge continuity when learning responsibility transfers',
        prerequisites: ['challenge-ladder-generator'],
        questions: getQuestionsBySubCategory(allQuestions, 'handoff-summarizer')
      },
      {
        id: 'misconception-detector',
        name: 'Misconception Detector',
        description: 'Proactive identification and correction of faulty mental models',
        prerequisites: ['reflection-journaler'],
        questions: getQuestionsBySubCategory(allQuestions, 'misconception-detector')
      },
      {
        id: 'timebox-pair-programmer',
        name: 'Timebox Pair Programmer',
        description: 'Structured collaborative coding with time management and balanced participation',
        prerequisites: ['handoff-summarizer', 'misconception-detector'],
        questions: getQuestionsBySubCategory(allQuestions, 'timebox-pair-programmer')
      }
    ]
  },
  {
    id: 'fine-tuning',
    name: 'Fine-Tuning Methods',
    description: 'Progressive alignment techniques: SFT, DPO, and RFT for model optimization',
    icon: 'Brain',
    estimatedTime: calculateTotalTime(fineTuningQuestions),
    totalQuestions: fineTuningQuestions.length,
    subCategories: [
      {
        id: 'sft',
        name: 'Supervised Fine-Tuning (SFT)',
        description: 'Imitation learning through input-output pairs for basic alignment',
        prerequisites: [],
        questions: getQuestionsBySubCategory(allQuestions, 'sft')
      },
      {
        id: 'dpo',
        name: 'Direct Preference Optimization (DPO)', 
        description: 'Preference learning without separate reward models',
        prerequisites: ['sft'],
        questions: getQuestionsBySubCategory(allQuestions, 'dpo')
      },
      {
        id: 'rft',
        name: 'Reinforcement Fine-Tuning (RFT)',
        description: 'Reward-based training for reasoning and complex capabilities',
        prerequisites: ['dpo'],
        questions: getQuestionsBySubCategory(allQuestions, 'rft')
      },
      {
        id: 'data-strategy',
        name: 'Data Strategy & Curation',
        description: 'Best practices for dataset composition and quality control',
        prerequisites: ['sft'],
        questions: getQuestionsBySubCategory(allQuestions, 'data-strategy')
      },
      {
        id: 'evaluation',
        name: 'Evaluation & Monitoring',
        description: 'Metrics, monitoring, and safety measures for fine-tuning',
        prerequisites: ['dpo'],
        questions: getQuestionsBySubCategory(allQuestions, 'evaluation')
      },
      {
        id: 'strategy',
        name: 'Strategic Decision Making',
        description: 'When and how to escalate between fine-tuning methods',
        prerequisites: ['rft', 'evaluation'],
        questions: getQuestionsBySubCategory(allQuestions, 'strategy')
      },
      {
        id: 'ops-risk',
        name: 'Operations & Risk Management',
        description: 'Production deployment, governance, and rollback strategies',
        prerequisites: ['strategy'],
        questions: getQuestionsBySubCategory(allQuestions, 'ops-risk')
      },
      {
        id: 'risks',
        name: 'Risk Assessment',
        description: 'Understanding and mitigating fine-tuning risks',
        prerequisites: ['evaluation'],
        questions: getQuestionsBySubCategory(allQuestions, 'risks')
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
    const questions = subCategory.questions || [];
    questions.forEach(question => {
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
  if (!subCategory || !subCategory.questions) return [];
  
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
    if (question.correctAnswers && question.correctAnswers.length > 0) {
      // userAnswer expected to encode multi-select as a bitmask OR index referencing a stored selection set (future enhancement)
      // For current minimal implementation we assume UI collects a bitmask in userAnswer when multi-select used.
      const bitmask = userAnswer ?? 0;
      const allCorrect = question.correctAnswers.every(i => (bitmask & (1 << i)) !== 0);
      const noExtras = question.options.every((_, optIdx) => {
        const selected = (bitmask & (1 << optIdx)) !== 0;
        if (selected && !question.correctAnswers!.includes(optIdx)) return false;
        return true;
      });
      return (allCorrect && noExtras) ? count + 1 : count;
    }
    return question.correctAnswer === userAnswer ? count + 1 : count;
  }, 0);
  
  return Math.round((correctAnswers / session.questions.length) * 100);
};

export const generateQuizFeedback = (session: QuizSession): QuizFeedback[] => {
  if (!session.questions || !session.userAnswers) return [];
  
  const feedback: QuizFeedback[] = [];
  
  session.questions.forEach((question, index) => {
    const userAnswer = session.userAnswers[index];
    let isCorrect = false;
    let correctLabel: string;
    if (question.correctAnswers && question.correctAnswers.length > 0) {
      const bitmask = userAnswer ?? 0;
      const allCorrect = question.correctAnswers.every(i => (bitmask & (1 << i)) !== 0);
      const noExtras = question.options.every((_, optIdx) => {
        const selected = (bitmask & (1 << optIdx)) !== 0;
        if (selected && !question.correctAnswers!.includes(optIdx)) return false;
        return true;
      });
      isCorrect = allCorrect && noExtras;
      correctLabel = question.correctAnswers.map(i => question.options[i]).join(', ');
    } else {
      isCorrect = question.correctAnswer === userAnswer;
      correctLabel = question.options[question.correctAnswer];
    }
    
    feedback.push({
      type: isCorrect ? 'correct' : 'incorrect',
      message: isCorrect 
        ? 'Correct! Well done.' 
  : `Incorrect. The correct answer${question.correctAnswers && question.correctAnswers.length>1 ? 's are' : ' is'}: ${correctLabel}`,
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

/**
 * Get static quiz questions by category (for fallback when API unavailable)
 */
export const getStaticQuestionsByCategory = (categoryId: string, limit: number = 15, difficulty?: 'beginner' | 'intermediate' | 'advanced'): QuizQuestion[] => {
  let categoryQuestions = allQuestions.filter(q => q.category === categoryId);
  
  if (categoryQuestions.length === 0) {
    // If exact category not found, try to find by subcategory
    categoryQuestions = allQuestions.filter(q => q.subCategory === categoryId);
  }
  
  // Filter by difficulty if specified
  if (difficulty) {
    const filteredByDifficulty = categoryQuestions.filter(q => q.difficulty === difficulty);
    // If we have enough questions at the specified difficulty, use them
    if (filteredByDifficulty.length >= Math.min(limit, 5)) {
      return filteredByDifficulty.slice(0, limit);
    }
    // Otherwise, prioritize the specified difficulty but include others
    const otherQuestions = categoryQuestions.filter(q => q.difficulty !== difficulty);
    return [...filteredByDifficulty, ...otherQuestions].slice(0, limit);
  }
  
  return categoryQuestions.slice(0, limit);
};

/**
 * Get all static questions (useful for debugging)
 */
export const getAllStaticQuestions = (): QuizQuestion[] => {
  return allQuestions;
};

