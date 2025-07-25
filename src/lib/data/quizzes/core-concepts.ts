// Core concepts quiz questions
import { QuizQuestion } from './types';

export const coreConceptsQuestions: QuizQuestion[] = [
  // Basic AI Agent concepts
  {
    id: 'core-b1',
    text: 'What is an AI agent?',
    question: 'What is an AI agent?',
    options: [
      'A human employee',
      'A software system that can perceive its environment and take actions to achieve goals',
      'A database',
      'A web server'
    ],
    correctAnswer: 1,
    explanation: 'An AI agent is a software system that can perceive its environment, process information, and take actions to achieve specific goals autonomously.',
    difficulty: 'beginner',
    category: 'core-concepts',
    subCategory: 'agents',
    relatedTopics: ['artificial-intelligence', 'autonomy', 'goal-oriented'],
    relatedConcepts: ['artificial-intelligence', 'autonomy', 'goal-oriented'],
    timeEstimate: 30,
    persona: ['business-leader', 'no-code-engineer', 'ai-enthusiast', 'agent-developer', 'ai-engineer', 'agent-architect']
  },
  {
    id: 'core-b2',
    text: 'What are the main components of an AI agent?',
    question: 'What are the main components of an AI agent?',
    options: [
      'Only a processor',
      'Sensors, actuators, and a decision-making system',
      'Only memory',
      'Only a user interface'
    ],
    correctAnswer: 1,
    explanation: 'AI agents consist of sensors to perceive the environment, actuators to perform actions, and a decision-making system to process information and choose appropriate actions.',
    difficulty: 'beginner',
    category: 'core-concepts',
    subCategory: 'agents',
    relatedTopics: ['sensors', 'actuators', 'decision-making'],
    relatedConcepts: ['sensors', 'actuators', 'decision-making'],
    timeEstimate: 30,
    persona: ['business-leader', 'no-code-engineer', 'ai-enthusiast', 'agent-developer', 'ai-engineer', 'agent-architect']
  },
  {
    id: 'core-i1',
    text: 'What is the difference between reactive and deliberative agents?',
    question: 'What is the difference between reactive and deliberative agents?',
    options: [
      'There is no difference',
      'Reactive agents respond immediately to stimuli, while deliberative agents plan and reason about actions',
      'Deliberative agents are faster',
      'Reactive agents are more intelligent'
    ],
    correctAnswer: 1,
    explanation: 'Reactive agents respond immediately to environmental stimuli without complex reasoning, while deliberative agents engage in planning and reasoning before taking actions.',
    difficulty: 'intermediate',
    category: 'core-concepts',
    subCategory: 'agents',
    relatedTopics: ['reactive-systems', 'deliberative-systems', 'planning'],
    relatedConcepts: ['reactive-systems', 'deliberative-systems', 'planning'],
    persona: ['agent-developer', 'ai-engineer', 'agent-architect'],
    timeEstimate: 40
  },
  {
    id: 'core-a1',
    text: 'How do multi-agent systems handle coordination and communication?',
    question: 'How do multi-agent systems handle coordination and communication?',
    options: [
      'They don\'t communicate',
      'Through protocols, message passing, and coordination mechanisms',
      'Only through databases',
      'Only through user interfaces'
    ],
    correctAnswer: 1,
    explanation: 'Multi-agent systems use communication protocols, message passing systems, and coordination mechanisms to enable agents to work together effectively.',
    difficulty: 'advanced',
    category: 'core-concepts',
    subCategory: 'agents',
    relatedTopics: ['multi-agent-systems', 'communication-protocols', 'coordination'],
    relatedConcepts: ['multi-agent-systems', 'communication-protocols', 'coordination'],
    persona: ['ai-engineer', 'agent-architect', 'agent-developer'],
    timeEstimate: 45
  },
  {
    id: 'core-azure-safety-pillars',
    text: 'Which of the following is NOT one of Microsoft Responsible AI Six Core Pillars?',
    question: 'Which of the following is NOT one of Microsoft Responsible AI Six Core Pillars?',
    options: [
      'Fairness',
      'Transparency',
      'Accountability',
      'Profitability'
    ],
    correctAnswer: 3,
    explanation: 'Profitability is not one of the six core pillars. The pillars are Fairness, Reliability & Safety, Privacy & Security, Inclusiveness, Transparency, and Accountability.',
    difficulty: 'beginner',
    category: 'azure-ai-safety',
    subCategory: 'responsible-ai',
    relatedTopics: ['responsible-ai', 'pillars', 'azure'],
    relatedConcepts: ['fairness', 'transparency', 'accountability'],
    timeEstimate: 30,
    persona: ['ai-enthusiast', 'agent-developer', 'ai-engineer', 'agent-architect']
  },
  {
    id: 'core-azure-content-filter',
    text: 'What is the primary purpose of Azure AI Foundry content filters?',
    question: 'What is the primary purpose of Azure AI Foundry content filters?',
    options: [
      'Speed up model inference',
      'Detect and block harmful or unsafe outputs',
      'Improve model accuracy',
      'Reduce cloud costs'
    ],
    correctAnswer: 1,
    explanation: 'Content filters are designed to detect and block harmful, unsafe, or inappropriate outputs from AI models.',
    difficulty: 'beginner',
    category: 'azure-ai-safety',
    subCategory: 'content-filter',
    relatedTopics: ['content-filter', 'safety', 'moderation'],
    relatedConcepts: ['content-filter', 'moderation'],
    timeEstimate: 30,
    persona: ['ai-enthusiast', 'agent-developer', 'ai-engineer', 'agent-architect']
  },
  {
    id: 'core-azure-defender',
    text: 'What does Azure Defender provide for AI resources?',
    question: 'What does Azure Defender provide for AI resources?',
    options: [
      'Threat detection and risk monitoring',
      'Data visualization',
      'Model training',
      'User authentication'
    ],
    correctAnswer: 0,
    explanation: 'Azure Defender provides threat detection, risk monitoring, and automated alerts for AI resources.',
    difficulty: 'beginner',
    category: 'azure-ai-safety',
    subCategory: 'defender',
    relatedTopics: ['defender', 'risk-monitoring', 'security'],
    relatedConcepts: ['defender', 'security'],
    timeEstimate: 30,
    persona: ['ai-enthusiast', 'agent-developer', 'ai-engineer', 'agent-architect']
  },
  {
    id: 'core-azure-guardrails',
    text: 'Which of the following is a function of guardrails in Azure AI Foundry?',
    question: 'Which of the following is a function of guardrails in Azure AI Foundry?',
    options: [
      'Restrict model behavior and enforce policies',
      'Increase GPU speed',
      'Provide user interface themes',
      'Store training data'
    ],
    correctAnswer: 0,
    explanation: 'Guardrails restrict model behavior, enforce policies, and prevent misuse.',
    difficulty: 'beginner',
    category: 'azure-ai-safety',
    subCategory: 'guardrails',
    relatedTopics: ['guardrails', 'controls', 'policy'],
    relatedConcepts: ['guardrails', 'policy'],
    timeEstimate: 30,
    persona: ['ai-enthusiast', 'agent-developer', 'ai-engineer', 'agent-architect']
  },
  {
    id: 'core-azure-monitoring',
    text: 'What can you monitor with Azure Application Insights for AI resources?',
    question: 'What can you monitor with Azure Application Insights for AI resources?',
    options: [
      'Resource usage and performance',
      'Weather forecasts',
      'Stock prices',
      'User passwords'
    ],
    correctAnswer: 0,
    explanation: 'Azure Application Insights allows monitoring of resource usage, performance, and anomalies for AI resources.',
    difficulty: 'beginner',
    category: 'azure-ai-safety',
    subCategory: 'monitoring',
    relatedTopics: ['monitoring', 'analytics', 'insights'],
    relatedConcepts: ['monitoring', 'analytics'],
    timeEstimate: 30,
    persona: ['ai-enthusiast', 'agent-developer', 'ai-engineer', 'agent-architect']
  },
  {
    id: 'core-azure-tracing',
    text: 'What is the benefit of distributed tracing in Azure Application Insights?',
    question: 'What is the benefit of distributed tracing in Azure Application Insights?',
    options: [
      'Track requests and dependencies across services',
      'Encrypt user data',
      'Generate random numbers',
      'Send marketing emails'
    ],
    correctAnswer: 0,
    explanation: 'Distributed tracing helps track requests, dependencies, and performance across services for debugging and optimization.',
    difficulty: 'beginner',
    category: 'azure-ai-safety',
    subCategory: 'tracing',
    relatedTopics: ['tracing', 'application-insights', 'monitoring'],
    relatedConcepts: ['tracing', 'monitoring'],
    timeEstimate: 30,
    persona: ['ai-enthusiast', 'agent-developer', 'ai-engineer', 'agent-architect']
  },
  {
    id: 'core-azure-purview',
    text: 'What is the main role of Microsoft Purview in AI governance?',
    question: 'What is the main role of Microsoft Purview in AI governance?',
    options: [
      'Unified data governance, policy management, and audit trails',
      'Train deep learning models',
      'Provide cloud storage',
      'Design user interfaces'
    ],
    correctAnswer: 0,
    explanation: 'Microsoft Purview provides unified data governance, policy management, and audit trails for AI resources.',
    difficulty: 'beginner',
    category: 'azure-ai-safety',
    subCategory: 'purview',
    relatedTopics: ['purview', 'governance', 'compliance'],
    relatedConcepts: ['purview', 'governance'],
    timeEstimate: 30,
    persona: ['ai-enthusiast', 'agent-developer', 'ai-engineer', 'agent-architect']
  }
];
