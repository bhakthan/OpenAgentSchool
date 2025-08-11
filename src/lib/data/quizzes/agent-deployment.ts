// Agent deployment quiz questions
import { QuizQuestion } from './types';

export const agentDeploymentQuestions: QuizQuestion[] = [
  {
    id: 'deployment-b1',
    text: 'What are the key considerations for deploying AI agents to production?',
    question: 'What are the key considerations for deploying AI agents to production?',
    options: [
      'Only code quality',
      'Scalability, monitoring, security, and maintenance',
      'Only performance testing',
      'Only user acceptance'
    ],
    correctAnswer: 1,
    explanation: 'Production agent deployment requires scalability for handling load, monitoring for operational visibility, security for protection, and maintenance for ongoing updates and support.',
    difficulty: 'beginner',
    category: 'agent-deployment',
    subCategory: 'deployment-fundamentals',
    relatedConcepts: ['production-readiness', 'scalability', 'monitoring', 'security'],
    persona: ['business-leader', 'ai-ops-engineer', 'agent-developer'],
    timeEstimate: 40
  },
  {
    id: 'deployment-i1',
    text: 'What Azure services are commonly used for AI agent deployment?',
    question: 'What Azure services are commonly used for AI agent deployment?',
    options: [
      'Only Azure VMs',
      'Azure Container Instances, Azure Kubernetes Service, Azure Functions, and Azure App Service',
      'Only Azure Storage',
      'Only Azure SQL Database'
    ],
    correctAnswer: 1,
    explanation: 'Azure offers multiple deployment options: Container Instances for simple containerized agents, Kubernetes Service for orchestrated deployments, Functions for serverless agents, and App Service for web-based agents.',
    difficulty: 'intermediate',
    category: 'agent-deployment',
    subCategory: 'azure-deployment',
    relatedConcepts: ['containerization', 'orchestration', 'serverless', 'web-deployment'],
    persona: ['agent-developer', 'ai-engineer', 'ai-ops-engineer'],
    timeEstimate: 55
  },
  {
    id: 'deployment-a1',
    text: 'How should CI/CD pipelines be designed for AI agent deployments?',
    question: 'How should CI/CD pipelines be designed for AI agent deployments?',
    options: [
      'Only manual deployments',
      'Automated testing, model validation, gradual rollouts, and rollback capabilities',
      'Only code deployment',
      'Only documentation updates'
    ],
    correctAnswer: 1,
    explanation: 'AI agent CI/CD pipelines should include automated testing for functionality, model validation for performance, gradual rollouts for risk mitigation, and rollback capabilities for quick recovery.',
    difficulty: 'advanced',
    category: 'agent-deployment',
    subCategory: 'cicd-pipelines',
    relatedConcepts: ['automated-testing', 'model-validation', 'gradual-rollout', 'rollback-strategy'],
    persona: ['ai-engineer', 'agent-architect', 'ai-ops-engineer'],
    timeEstimate: 70
  },
  {
    id: 'deployment-a2',
    text: 'What is GenAIOps and how does it relate to AI agent deployment?',
    question: 'What is GenAIOps and how does it relate to AI agent deployment?',
    options: [
      'A specific deployment tool for containers',
      'An umbrella operational practice for generative AI, integrating technology, process, and people',
      'A programming language for AI agents',
      'A cloud service provider'
    ],
    correctAnswer: 1,
    explanation: 'GenAIOps is the umbrella operational practice for operationalizing Generative AI in production environments. It encompasses AgentOps, PromptOps, and RAGOps, integrating technology, processes, and people to ensure reliable AI deployments.',
    difficulty: 'advanced',
    category: 'agent-deployment',
    subCategory: 'genaiopsl',
    relatedConcepts: ['agentops', 'promptops', 'ragops', 'mlops'],
    persona: ['ai-engineer', 'agent-architect', 'ai-ops-engineer'],
    timeEstimate: 75
  },
  {
    id: 'deployment-a3',
    text: 'Which operational practice focuses specifically on AI agent tool management, orchestration, and memory?',
    question: 'Which operational practice focuses specifically on AI agent tool management, orchestration, and memory?',
    options: [
      'PromptOps',
      'RAGOps',
      'AgentOps',
      'ModelOps'
    ],
    correctAnswer: 2,
    explanation: 'AgentOps focuses on operationalizing AI agents, including tool management (API invocation, security), orchestration & memory (short/long-term memory, task decomposition), and metrics & observability.',
    difficulty: 'intermediate',
    category: 'agent-deployment',
    subCategory: 'agentops',
    relatedConcepts: ['tool-management', 'orchestration', 'memory-management', 'agent-observability'],
    persona: ['agent-developer', 'ai-engineer', 'ai-ops-engineer'],
    timeEstimate: 60
  },
  {
    id: 'deployment-i2',
    text: 'What are the key components of PromptOps in a GenAIOps framework?',
    question: 'What are the key components of PromptOps in a GenAIOps framework?',
    options: [
      'Only prompt storage',
      'Prompt storage & lineage, metadata & evaluation, template registry, and prompt optimizer',
      'Only prompt optimization',
      'Only template management'
    ],
    correctAnswer: 1,
    explanation: 'PromptOps encompasses prompt storage & lineage (version control), metadata & evaluation (evaluation scores), template registry (centralized management), and prompt optimizer (A/B testing and refinement).',
    difficulty: 'intermediate',
    category: 'agent-deployment',
    subCategory: 'promptops',
    relatedConcepts: ['prompt-versioning', 'prompt-evaluation', 'template-management', 'prompt-optimization'],
    persona: ['prompt-engineer', 'ai-engineer', 'agent-developer'],
    timeEstimate: 65
  },
  {
    id: 'deployment-a4',
    text: 'RAGOps focuses on operationalizing Retrieval-Augmented Generation. What are its main capabilities?',
    question: 'RAGOps focuses on operationalizing Retrieval-Augmented Generation. What are its main capabilities?',
    options: [
      'Only data retrieval',
      'Offline data preparation, retrieval optimization, prompt augmentation, and grounding',
      'Only prompt enhancement',
      'Only data storage'
    ],
    correctAnswer: 1,
    explanation: 'RAGOps includes offline data preparation (cleaning, chunking, vectorization), retrieval optimization (similarity search, re-ranking), prompt augmentation (context injection), and grounding (fact-checking, hallucination reduction).',
    difficulty: 'advanced',
    category: 'agent-deployment',
    subCategory: 'ragops',
    relatedConcepts: ['data-preparation', 'retrieval-optimization', 'prompt-augmentation', 'grounding'],
    persona: ['ai-engineer', 'data-engineer', 'ai-ops-engineer'],
    timeEstimate: 80
  }
];
