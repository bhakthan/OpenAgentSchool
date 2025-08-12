// @ts-nocheck
// Agent patterns quiz questions
import { QuizQuestion } from './types';

export const agentPatternsQuestions: QuizQuestion[] = [
  // Voice Agent Pattern
  {
    id: 'patterns-voice-b1',
    question: 'What is the primary purpose of the Voice Agent pattern?',
    text: 'What is the primary purpose of the Voice Agent pattern?',
    options: [
      'To create text-only agents',
      'To enable AI agents to interact through voice interfaces with speech recognition and synthesis',
      'To create visual agents only',
      'To eliminate user interfaces entirely'
    ],
    correctAnswer: 1,
    explanation: 'The Voice Agent pattern enables AI agents to interact through voice interfaces, incorporating speech recognition for input and text-to-speech for output, creating natural conversational experiences.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'voice-agent',
    learningObjectives: ['Understand voice agent basics', 'Recognize voice interaction benefits'],
    relatedConcepts: ['speech-recognition', 'text-to-speech', 'natural-interaction'],
    persona: ['business-leader', 'no-code-engineer', 'agent-designer'],
    timeEstimate: 30
  },
  {
    id: 'patterns-voice-i1',
    question: 'Which Azure services are commonly used to implement Voice Agent patterns?',
    text: 'Which Azure services are commonly used to implement Voice Agent patterns?',
    options: [
      'Only Azure OpenAI',
      'Azure Speech Services, Azure OpenAI, and Azure Cognitive Services',
      'Only Azure Storage',
      'Only Azure Functions'
    ],
    correctAnswer: 1,
    explanation: 'Voice Agent patterns typically use Azure Speech Services for speech recognition and synthesis, Azure OpenAI for natural language processing, and Azure Cognitive Services for additional AI capabilities.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'voice-agent',
    learningObjectives: ['Identify Azure services for voice agents', 'Understand service integration'],
    relatedConcepts: ['azure-speech', 'service-integration', 'voice-pipeline'],
    persona: ['agent-developer', 'ai-engineer', 'agent-designer'],
    timeEstimate: 45
  },
  {
    id: 'patterns-voice-a1',
    question: 'What are the key considerations for implementing Voice Agent patterns in enterprise environments?',
    text: 'What are the key considerations for implementing Voice Agent patterns in enterprise environments?',
    options: [
      'Only cost considerations',
      'Latency, privacy, multi-language support, noise handling, and security',
      'Only technical specifications',
      'Only user preferences'
    ],
    correctAnswer: 1,
    explanation: 'Enterprise Voice Agent implementations must consider latency for real-time interaction, privacy for sensitive data, multi-language support for global users, noise handling for various environments, and security for voice data protection.',
    difficulty: 'advanced',
    category: 'agent-patterns',
    subCategory: 'voice-agent',
    learningObjectives: ['Evaluate enterprise voice requirements', 'Design secure voice systems'],
    relatedConcepts: ['enterprise-requirements', 'voice-security', 'performance-optimization'],
    persona: ['ai-engineer', 'agent-architect', 'ai-ops-engineer'],
    timeEstimate: 60
  },
  
  // Computer Use Pattern
  {
    id: 'patterns-computer-b1',
    question: 'What does the Computer Use pattern enable AI agents to do?',
    text: 'What does the Computer Use pattern enable AI agents to do?',
    options: [
      'Only process text data',
      'Interact with computer interfaces, click buttons, and manipulate UI elements',
      'Only read files',
      'Only send emails'
    ],
    correctAnswer: 1,
    explanation: 'The Computer Use pattern enables AI agents to interact with computer interfaces by clicking buttons, filling forms, navigating windows, and manipulating UI elements, essentially allowing agents to use software like humans do.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'computer-use',
    learningObjectives: ['Understand computer use capabilities', 'Recognize UI automation benefits'],
    relatedConcepts: ['ui-automation', 'screen-interaction', 'human-like-interaction'],
    persona: ['business-leader', 'no-code-engineer', 'agent-designer'],
    timeEstimate: 35
  },
  {
    id: 'patterns-computer-i1',
    question: 'What technologies are typically used to implement Computer Use patterns?',
    text: 'What technologies are typically used to implement Computer Use patterns?',
    options: [
      'Only keyboard inputs',
      'Screen capture, OCR, UI automation libraries, and vision models',
      'Only mouse clicks',
      'Only text processing'
    ],
    correctAnswer: 1,
    explanation: 'Computer Use patterns typically use screen capture for visual input, OCR for text recognition, UI automation libraries for interaction, and vision models for understanding screen content.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'computer-use',
    learningObjectives: ['Identify computer use technologies', 'Understand implementation stack'],
    relatedConcepts: ['screen-capture', 'ocr', 'ui-automation', 'computer-vision'],
    persona: ['agent-developer', 'ai-engineer', 'agent-designer'],
    timeEstimate: 50
  },
  {
    id: 'patterns-computer-a1',
    question: 'How should Computer Use patterns handle security and access control in enterprise environments?',
    text: 'How should Computer Use patterns handle security and access control in enterprise environments?',
    options: [
      'Allow unrestricted access',
      'Implement sandboxing, permission controls, audit logging, and secure credential management',
      'Only use basic passwords',
      'Disable all security features'
    ],
    correctAnswer: 1,
    explanation: 'Enterprise Computer Use patterns require sandboxing to isolate agent actions, permission controls to limit access, audit logging for compliance, and secure credential management for authentication.',
    difficulty: 'advanced',
    category: 'agent-patterns',
    subCategory: 'computer-use',
    learningObjectives: ['Design secure computer use systems', 'Implement enterprise controls'],
    relatedConcepts: ['sandboxing', 'access-control', 'security-compliance', 'audit-logging'],
    persona: ['ai-engineer', 'agent-architect', 'ai-ops-engineer'],
    timeEstimate: 65
  },
  
  // Code Act Pattern
  {
    id: 'patterns-codeact-b1',
    question: 'What is the Code Act pattern in AI agent development?',
    text: 'What is the Code Act pattern in AI agent development?',
    options: [
      'Writing only documentation',
      'An agent pattern that enables agents to write, execute, and iterate on code to solve problems',
      'Only reading code',
      'Only testing existing code'
    ],
    correctAnswer: 1,
    explanation: 'The Code Act pattern enables AI agents to write, execute, and iterate on code to solve problems, combining reasoning with code generation and execution in a feedback loop.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'code-act',
    learningObjectives: ['Understand code act concept', 'Recognize code-based problem solving'],
    relatedConcepts: ['code-generation', 'code-execution', 'iterative-development'],
    persona: ['agent-developer', 'ai-enthusiast', 'agent-designer'],
    timeEstimate: 40
  },
  {
    id: 'patterns-codeact-i1',
    question: 'What safety measures should be implemented for Code Act patterns?',
    text: 'What safety measures should be implemented for Code Act patterns?',
    options: [
      'No safety measures needed',
      'Code sandboxing, execution timeouts, resource limits, and output validation',
      'Only basic error handling',
      'Only syntax checking'
    ],
    correctAnswer: 1,
    explanation: 'Code Act patterns require sandboxing to isolate code execution, timeouts to prevent infinite loops, resource limits to prevent system overload, and output validation to ensure safe results.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'code-act',
    learningObjectives: ['Implement code execution safety', 'Design secure code environments'],
    relatedConcepts: ['code-sandboxing', 'execution-safety', 'resource-management'],
    persona: ['agent-developer', 'ai-engineer', 'ai-ops-engineer'],
    timeEstimate: 55
  },
  {
    id: 'patterns-codeact-a1',
    question: 'How can Code Act patterns be optimized for complex software development tasks?',
    text: 'How can Code Act patterns be optimized for complex software development tasks?',
    options: [
      'Only use simple scripts',
      'Implement code versioning, dependency management, testing frameworks, and collaborative development workflows',
      'Avoid all complexity',
      'Only use single-line commands'
    ],
    correctAnswer: 1,
    explanation: 'Advanced Code Act patterns can be optimized with code versioning for iteration tracking, dependency management for libraries, testing frameworks for validation, and collaborative workflows for team development.',
    difficulty: 'advanced',
    category: 'agent-patterns',
    subCategory: 'code-act',
    learningObjectives: ['Optimize code act for development', 'Implement advanced code workflows'],
    relatedConcepts: ['code-versioning', 'dependency-management', 'testing-frameworks', 'collaborative-development'],
    persona: ['ai-engineer', 'agent-architect', 'agent-developer'],
    timeEstimate: 70
  },
  
  // ReAct Pattern Questions
  {
    id: 'react-b1',
    question: 'What does "ReAct" stand for in AI agent patterns?',
    options: [
      'React to Actions',
      'Reason and Act',
      'Reactive Actions',
      'Real Actions'
    ],
    correctAnswer: 1,
    explanation: 'ReAct stands for "Reason and Act" - it\'s a pattern where agents alternate between reasoning about their situation and taking actions based on that reasoning.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'react-pattern',
    learningObjectives: ['Define ReAct pattern'],
    relatedConcepts: ['reasoning', 'action', 'thought-process'],
    persona: ['business-leader', 'no-code-engineer'],
    timeEstimate: 30
  },
  {
    id: 'react-b2',
    question: 'What is the main business advantage of the ReAct pattern?',
    text: 'What is the main business advantage of the ReAct pattern?',
    options: [
      'It makes agents work faster',
      'It eliminates all errors',
      'It provides transparent decision-making that can be audited and understood',
      'It works without any training'
    ],
    correctAnswer: 2,
    explanation: 'The ReAct pattern provides transparent decision-making by explicitly showing the reasoning process, making it easier to audit, understand, and trust agent decisions.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'react-pattern',
    learningObjectives: ['Understand ReAct business benefits'],
    relatedConcepts: ['transparency', 'auditability', 'trust'],
    persona: ['business-leader'],
    timeEstimate: 35
  },
  {
    id: 'react-i1',
    question: 'In the ReAct pattern, what is the typical sequence of operations?',
    text: 'In the ReAct pattern, what is the typical sequence of operations?',
    options: [
      'Action → Thought → Observation',
      'Thought → Action → Observation',
      'Observation → Action → Thought',
      'Only actions, no thoughts'
    ],
    correctAnswer: 1,
    explanation: 'The ReAct pattern follows: Thought (reasoning about current state) → Action (taking a step) → Observation (seeing the result), then repeating this cycle.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'react-pattern',
    learningObjectives: ['Understand ReAct sequence'],
    relatedConcepts: ['thought-action-observation', 'iterative-process', 'feedback-loop'],
    persona: ['agent-designer', 'agent-developer'],
    timeEstimate: 40
  },
  {
    id: 'react-i2',
    question: 'When should you use the ReAct pattern versus other agent patterns?',
    text: 'When should you use the ReAct pattern versus other agent patterns?',
    options: [
      'Always use ReAct for every task',
      'Use ReAct when you need explicit reasoning traces and step-by-step problem solving',
      'Never use ReAct',
      'Only use ReAct for simple tasks'
    ],
    correctAnswer: 1,
    explanation: 'ReAct is best used when you need explicit reasoning traces, step-by-step problem solving, or when decisions need to be explainable and auditable.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'react-pattern',
    learningObjectives: ['Know when to use ReAct'],
    relatedConcepts: ['pattern-selection', 'use-cases', 'explainability'],
    persona: ['agent-designer', 'agent-developer', 'ai-enthusiast'],
    timeEstimate: 45
  },
  {
    id: 'react-a1',
    question: 'What are the main challenges in implementing ReAct for complex multi-step tasks?',
    text: 'What are the main challenges in implementing ReAct for complex multi-step tasks?',
    options: [
      'There are no challenges',
      'Managing reasoning chain length, handling reasoning errors, and preventing infinite loops',
      'It works perfectly for all tasks',
      'Only the speed of execution'
    ],
    correctAnswer: 1,
    explanation: 'Complex ReAct implementations face challenges in managing reasoning chain length, handling reasoning errors gracefully, and preventing infinite loops in the thought-action cycle.',
    difficulty: 'advanced',
    category: 'agent-patterns',
    subCategory: 'react-pattern',
    learningObjectives: ['Understand ReAct implementation challenges'],
    relatedConcepts: ['chain-length-management', 'error-handling', 'loop-prevention'],
    persona: ['ai-engineer', 'agent-architect'],
    timeEstimate: 55
  },
  {
    id: 'react-a2',
    question: 'How can ReAct be optimized for production environments with latency constraints?',
    text: 'How can ReAct be optimized for production environments with latency constraints?',
    options: [
      'Remove all reasoning steps',
      'Implement reasoning caching, parallel action execution, and adaptive reasoning depth',
      'Use only simple actions',
      'Avoid production use'
    ],
    correctAnswer: 1,
    explanation: 'Production ReAct optimization includes reasoning caching for common patterns, parallel action execution where possible, and adaptive reasoning depth based on task complexity.',
    difficulty: 'advanced',
    category: 'agent-patterns',
    subCategory: 'react-pattern',
    learningObjectives: ['Optimize ReAct for production'],
    relatedConcepts: ['performance-optimization', 'caching', 'parallel-execution'],
    persona: ['ai-engineer', 'agent-architect', 'ai-ops-engineer'],
    timeEstimate: 60
  },
  
  // Self-Reflection Pattern Questions
  {
    id: 'reflection-b1',
    question: 'What is the self-reflection pattern in AI agents?',
    text: 'What is the self-reflection pattern in AI agents?',
    options: [
      'Agents looking at mirrors',
      'Agents evaluating their own performance and learning from mistakes',
      'Agents copying other agents',
      'Agents working alone'
    ],
    correctAnswer: 1,
    explanation: 'The self-reflection pattern involves agents evaluating their own performance, identifying mistakes or areas for improvement, and adjusting their behavior accordingly.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'self-reflection',
    learningObjectives: ['Define self-reflection pattern'],
    relatedConcepts: ['self-evaluation', 'performance-improvement', 'learning'],
    persona: ['business-leader', 'no-code-engineer'],
    timeEstimate: 30
  },
  {
    id: 'reflection-b2',
    question: 'What business value does self-reflection provide to AI agents?',
    text: 'What business value does self-reflection provide to AI agents?',
    options: [
      'Makes agents more expensive',
      'Enables continuous improvement and reduces the need for manual corrections',
      'Slows down agent performance',
      'Makes agents more complex to use'
    ],
    correctAnswer: 1,
    explanation: 'Self-reflection enables continuous improvement in agent performance and reduces the need for manual corrections, leading to more autonomous and reliable systems.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'self-reflection',
    learningObjectives: ['Understand self-reflection business value'],
    relatedConcepts: ['continuous-improvement', 'autonomy', 'reliability'],
    persona: ['business-leader'],
    timeEstimate: 35
  },
  {
    id: 'reflection-i1',
    question: 'What are the key components of the self-reflection cycle?',
    text: 'What are the key components of the self-reflection cycle?',
    options: [
      'Only action execution',
      'Action execution, outcome evaluation, learning extraction, and strategy adjustment',
      'Only outcome evaluation',
      'Just strategy adjustment'
    ],
    correctAnswer: 1,
    explanation: 'The self-reflection cycle includes: executing actions, evaluating outcomes, extracting learnings from successes and failures, and adjusting strategies for future actions.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'self-reflection',
    learningObjectives: ['Understand reflection cycle components'],
    relatedConcepts: ['reflection-cycle', 'outcome-evaluation', 'strategy-adjustment'],
    persona: ['agent-designer', 'agent-developer'],
    timeEstimate: 40
  },
  {
    id: 'reflection-i2',
    question: 'How does self-reflection integrate with other agent patterns like ReAct?',
    text: 'How does self-reflection integrate with other agent patterns like ReAct?',
    options: [
      'It replaces all other patterns',
      'It adds a meta-cognitive layer that evaluates the reasoning and actions of other patterns',
      'It cannot be used with other patterns',
      'It only works in isolation'
    ],
    correctAnswer: 1,
    explanation: 'Self-reflection adds a meta-cognitive layer that can evaluate the reasoning and actions of other patterns like ReAct, providing feedback for improvement.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'self-reflection',
    learningObjectives: ['Understand pattern integration'],
    relatedConcepts: ['meta-cognition', 'pattern-composition', 'feedback-loops'],
    persona: ['agent-designer', 'agent-developer', 'ai-enthusiast'],
    timeEstimate: 45
  },
  {
    id: 'react-b3',
    question: 'In the "Financial Analyst Assistant" business use case, what is the primary role of the ReAct pattern?',
    options: [
      'To write the final report in a single step.',
      'To alternate between reasoning (e.g., deciding what data is needed) and acting (e.g., fetching a stock price).',
      'To only use a calculator tool.',
      'To ask the user for every piece of information.'
    ],
    correctAnswer: 1,
    explanation: 'The ReAct pattern allows the agent to reason about the financial query, determine it needs a tool (like a stock API), use it, observe the result, and then reason again, repeating the cycle until it can synthesize the final answer.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'react-pattern',
    learningObjectives: ['Apply ReAct to a business problem'],
    relatedConcepts: ['use-cases', 'financial-analysis', 'tool-use'],
    persona: ['business-leader', 'agent-designer'],
    timeEstimate: 40
  },
  {
    id: 'agentic-rag-b1',
    question: 'In the "Corporate Policy Assistant" use case, how does Agentic RAG improve on basic RAG?',
    options: [
      'It only searches the web instead of internal documents.',
      'It uses a single, static query to find information.',
      'It intelligently refines search queries and verifies facts against the retrieved documents.',
      'It generates answers without retrieving any documents.'
    ],
    correctAnswer: 2,
    explanation: 'Agentic RAG improves the process by actively reasoning about the query, refining its search strategy to get better results from the policy documents, and grounding its final answer in the retrieved facts to ensure accuracy.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'agentic-rag',
    learningObjectives: ['Understand Agentic RAG benefits in a use case'],
    relatedConcepts: ['use-cases', 'knowledge-base', 'fact-checking'],
    persona: ['business-leader', 'agent-designer'],
    timeEstimate: 40
  },
  {
    id: 'codeact-b2',
    question: 'For the "Automated Unit Test Generation" business use case, why is the CodeAct pattern a good choice?',
    options: [
      'Because it can have a conversation with the developer.',
      'Because it can read the new function, write new Python test code, and execute it in a sandbox.',
      'Because it can only read documentation.',
      'Because it is the fastest pattern.'
    ],
    correctAnswer: 1,
    explanation: 'The CodeAct pattern is ideal because the task requires the agent to perform a sequence of actions involving code: reading the source code, writing new test code, and then executing that code to verify the result.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'code-act',
    learningObjectives: ['Apply CodeAct to a business problem'],
    relatedConcepts: ['use-cases', 'automated-testing', 'code-generation'],
    persona: ['agent-developer', 'ai-engineer'],
    timeEstimate: 40
  },
  {
    id: 'parallelization-b1',
    question: 'In the "Live Content Moderation" use case, how is the Parallelization pattern used?',
    options: [
      'A single, large agent watches all video streams at once.',
      'It processes one video stream at a time in a sequence.',
      'It spawns a separate "Moderator Agent" for each video stream to analyze them all simultaneously.',
      'It only analyzes the audio, not the video.'
    ],
    correctAnswer: 2,
    explanation: 'The Parallelization pattern is used to handle massive, concurrent workloads by creating a dedicated agent for each independent task (in this case, each live video stream), allowing the system to scale effectively.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'parallelization',
    learningObjectives: ['Apply Parallelization to a business problem'],
    relatedConcepts: ['use-cases', 'scalability', 'content-moderation'],
    persona: ['business-leader', 'agent-architect'],
    timeEstimate: 40
  },
  {
    id: 'prompt-chaining-b1',
    question: 'For the "Personalized Marketing Campaign Generator" use case, how does Prompt Chaining create the final email?',
    options: [
      'It uses one very large, complex prompt to do everything at once.',
      'It uses a sequence of prompts: one to analyze the customer, a second to suggest products, and a third to draft the email.',
      'It sends the same generic email to all customers.',
      'It asks the customer to write their own email.'
    ],
    correctAnswer: 1,
    explanation: 'Prompt Chaining is used to break the complex task into a linear sequence of simpler sub-tasks. The output of one prompt (e.g., customer preferences) becomes the input for the next prompt (e.g., product suggestions).',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'prompt-chaining',
    learningObjectives: ['Apply Prompt Chaining to a business problem'],
    relatedConcepts: ['use-cases', 'sequential-tasks', 'marketing-automation'],
    persona: ['business-leader', 'agent-designer'],
    timeEstimate: 40
  },
  {
    id: 'self-reflection-b3',
    question: 'In the "AI Clinical Scribe" use case, what is the main purpose of the Self-Reflection pattern?',
    options: [
      'To make the transcription process faster.',
      'To allow the agent to critique and refine its own generated medical notes to improve their accuracy and quality.',
      'To ask the doctor for clarification on every word.',
      'To automatically schedule patient appointments.'
    ],
    correctAnswer: 1,
    explanation: 'The Self-Reflection pattern enables the agent to perform a critical step: first generating a draft of the medical note, then reviewing it against a quality rubric (critique), and finally rewriting it to fix any errors (refine).',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'self-reflection',
    learningObjectives: ['Apply Self-Reflection to a business problem'],
    relatedConcepts: ['use-cases', 'quality-improvement', 'healthcare-ai'],
    persona: ['agent-developer', 'agent-architect'],
    timeEstimate: 40
  },
  {
    id: 'deep-researcher-b1',
    question: 'In the "AI Legal Research Assistant" use case, what is the key function of the Deep Researcher pattern?',
    options: [
      'It performs a single Google search.',
      'It asks the paralegal to find all the documents first.',
      'It iteratively generates research questions, searches multiple legal databases, and synthesizes the findings into a detailed memo.',
      'It only summarizes the initial case file.'
    ],
    correctAnswer: 2,
    explanation: 'The Deep Researcher pattern is designed for exhaustive investigation. It automates the process of planning the research, gathering information from many sources, and synthesizing it into a comprehensive, evidence-based report.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'deep-researcher',
    learningObjectives: ['Apply Deep Researcher to a business problem'],
    relatedConcepts: ['use-cases', 'legal-tech', 'automated-research'],
    persona: ['business-leader', 'agent-designer'],
    timeEstimate: 40
  },
  {
    id: 'routing-b1',
    question: 'In the "Smart Support Assistant" use case, what is the primary job of the Router Agent?',
    options: [
      'To try and solve all customer problems by itself.',
      'To analyze the customer\'s query and direct the conversation to the correct specialized agent (e.g., Billing or Technical Support).',
      'To immediately escalate every query to a human agent.',
      'To ask the user to choose from a long menu of options.'
    ],
    correctAnswer: 1,
    explanation: 'The Routing pattern uses a dedicated agent to act as an intelligent switchboard. It analyzes the incoming request to understand its intent and then transfers it to the agent with the specific skills or knowledge to handle it.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'routing',
    learningObjectives: ['Apply Routing to a business problem'],
    relatedConcepts: ['use-cases', 'customer-service', 'task-triage'],
    persona: ['business-leader', 'agent-architect'],
    timeEstimate: 40
  },
  {
    id: 'autogen-b1',
    question: 'For the "Supply Chain Disruption Manager" use case, how does the AutoGen pattern facilitate a solution?',
    options: [
      'A single agent handles everything from detection to notification.',
      'It allows multiple specialized agents (Planner, Logistics, Communications) to collaborate in a group chat to resolve the issue.',
      'It waits for a human to tell it what to do.',
      'It shuts down the supply chain to prevent further issues.'
    ],
    correctAnswer: 1,
    explanation: 'The AutoGen pattern excels at enabling a team of specialized agents to work together. In this case, each agent has a specific role, and they collaborate by conversing in a group chat to quickly and efficiently manage the disruption.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'autogen-multi-agent',
    learningObjectives: ['Apply AutoGen to a business problem'],
    relatedConcepts: ['use-cases', 'multi-agent-collaboration', 'supply-chain-management'],
    persona: ['business-leader', 'agent-architect'],
    timeEstimate: 40
  },

  // Deep Agents Pattern
  {
    id: 'patterns-deep-agents-b1',
    text: 'What is the primary purpose of the Deep Agents pattern?',
    question: 'What is the primary purpose of the Deep Agents pattern?',
    options: [
      'To create simple, single-step agents',
      'To handle complex, multi-step tasks requiring deep reasoning, research, and iterative refinement',
      'To replace all human workers',
      'To create agents that only work with databases'
    ],
    correctAnswer: 1,
    explanation: 'The Deep Agents pattern is designed to handle complex, multi-step tasks that require deep reasoning, comprehensive research, iterative refinement, and quality assurance through specialized sub-agents and persistent state management.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'deep-agents',
    relatedConcepts: ['multi-agent-systems', 'complex-reasoning', 'iterative-refinement'],
    persona: ['business-leader', 'agent-designer', 'no-code-engineer'],
    timeEstimate: 30
  },
  {
    id: 'patterns-deep-agents-i1',
    text: 'Which components are essential to the Deep Agents architecture?',
    question: 'Which components are essential to the Deep Agents architecture?',
    options: [
      'Only a main agent and database',
      'Main Deep Agent, Planning Tools, Research Sub-Agent, Critique Sub-Agent, and Virtual File System',
      'Just external APIs and storage',
      'Only machine learning models'
    ],
    correctAnswer: 1,
    explanation: 'Deep Agents architecture requires a Main Deep Agent (orchestrator), Planning Tools (strategy organization), specialized sub-agents (Research and Critique), and a Virtual File System for persistent state management across complex workflows.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'deep-agents',
    relatedConcepts: ['system-architecture', 'agent-orchestration', 'state-management'],
    persona: ['agent-developer', 'ai-engineer', 'agent-architect'],
    timeEstimate: 45
  },
  {
    id: 'patterns-deep-agents-a1',
    text: 'What is the role of the Virtual File System in Deep Agents?',
    question: 'What is the role of the Virtual File System in Deep Agents?',
    options: [
      'To store only final outputs',
      'To provide persistent state management, enable collaboration between agents, and maintain context across interactions',
      'To replace cloud storage entirely',
      'To only cache API responses'
    ],
    correctAnswer: 1,
    explanation: 'The Virtual File System serves as a critical component for persistent state management, enabling agents to store and retrieve work products, maintain context across multiple interactions, and facilitate collaboration between different specialized agents.',
    difficulty: 'advanced',
    category: 'agent-patterns',
    subCategory: 'deep-agents',
    relatedConcepts: ['state-management', 'context-preservation', 'agent-collaboration'],
    persona: ['ai-engineer', 'agent-architect', 'agent-developer'],
    timeEstimate: 50
  },
  {
    id: 'patterns-deep-agents-i2',
    text: 'How does the Critique Sub-Agent improve output quality in Deep Agents?',
    question: 'How does the Critique Sub-Agent improve output quality in Deep Agents?',
    options: [
      'By replacing the main agent entirely',
      'By providing systematic quality review, detailed feedback, and guiding iterative improvement cycles',
      'By only checking spelling and grammar',
      'By generating new content from scratch'
    ],
    correctAnswer: 1,
    explanation: 'The Critique Sub-Agent specializes in quality assurance by systematically reviewing work products against established criteria, providing specific improvement feedback, and guiding iterative refinement cycles until quality standards are met.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'deep-agents',
    relatedConcepts: ['quality-assurance', 'feedback-loops', 'iterative-improvement'],
    persona: ['agent-developer', 'agent-designer', 'ai-engineer'],
    timeEstimate: 40
  },
  {
    id: 'patterns-deep-agents-a2',
    text: 'In what business scenarios would Deep Agents be most appropriate?',
    question: 'In what business scenarios would Deep Agents be most appropriate?',
    options: [
      'Simple data entry tasks only',
      'Complex research projects, comprehensive analysis, strategic planning, and multi-step content creation',
      'Basic customer service inquiries',
      'Single-step calculations only'
    ],
    correctAnswer: 1,
    explanation: 'Deep Agents excel in complex business scenarios requiring comprehensive research, detailed analysis, strategic planning, multi-step workflows, and high-quality deliverables where iterative refinement and quality assurance are critical.',
    difficulty: 'advanced',
    category: 'agent-patterns',
    subCategory: 'deep-agents',
    relatedConcepts: ['business-applications', 'complex-workflows', 'strategic-analysis'],
    persona: ['business-leader', 'agent-architect', 'strategic-planner'],
    timeEstimate: 45
  },
  {
    id: 'patterns-deep-agents-i3',
    text: 'What Azure services would typically be used to implement Deep Agents?',
    question: 'What Azure services would typically be used to implement Deep Agents?',
    options: [
      'Only Azure Storage',
      'Azure OpenAI, Azure Cognitive Search, Azure App Service, Azure Storage, and Azure Key Vault',
      'Only Azure Functions',
      'Only Azure SQL Database'
    ],
    correctAnswer: 1,
    explanation: 'Deep Agents implementations typically leverage Azure OpenAI for language processing, Azure Cognitive Search for information retrieval, Azure App Service for orchestration, Azure Storage for the virtual file system, and Azure Key Vault for secure configuration management.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'deep-agents',
    relatedConcepts: ['azure-integration', 'service-architecture', 'cloud-deployment'],
    persona: ['ai-engineer', 'agent-developer', 'cloud-architect'],
    timeEstimate: 50
  }
];

// Calculate total time for all questions
export const agentPatternsTime = agentPatternsQuestions.reduce((total, question) => total + question.timeEstimate, 0);
