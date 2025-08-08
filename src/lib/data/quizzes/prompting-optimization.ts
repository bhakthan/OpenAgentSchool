// Prompting optimization quiz questions
import { QuizQuestion } from './types';

export const promptingOptimizationQuestions: QuizQuestion[] = [
  // Agentic Prompting Fundamentals
  {
    id: 'prompting-f1',
    text: 'What is the primary purpose of eagerness control in agentic prompting?',
    question: 'What is the primary purpose of eagerness control in agentic prompting?',
    options: [
      'To make agents respond faster',
      'To control when agents should act versus observe',
      'To increase memory usage',
      'To improve user interface design'
    ],
    correctAnswer: 1,
    explanation: 'Eagerness control manages when agents should take action versus continue observing or gathering information, preventing premature responses.',
    difficulty: 'beginner',
    category: 'prompting-optimization',
    subCategory: 'agentic-fundamentals',
    relatedTopics: ['eagerness-control', 'agent-behavior', 'action-timing'],
    relatedConcepts: ['eagerness-control', 'agent-behavior'],
    timeEstimate: 35,
    persona: ['agent-developer', 'ai-engineer', 'agent-architect']
  },
  {
    id: 'prompting-f2',
    text: 'Which element helps agents understand available tools and their purposes?',
    question: 'Which element helps agents understand available tools and their purposes?',
    options: [
      'Memory buffers',
      'Tool preambles',
      'Response templates',
      'Error handlers'
    ],
    correctAnswer: 1,
    explanation: 'Tool preambles provide context about available tools, their capabilities, and when to use them, improving tool selection accuracy.',
    difficulty: 'beginner',
    category: 'prompting-optimization',
    subCategory: 'agentic-fundamentals',
    relatedTopics: ['tool-preambles', 'tool-selection', 'context'],
    relatedConcepts: ['tool-preambles', 'tool-selection'],
    timeEstimate: 30,
    persona: ['agent-developer', 'ai-engineer', 'agent-architect']
  },
  {
    id: 'prompting-f3',
    text: 'What does reasoning effort control in agentic systems?',
    question: 'What does reasoning effort control in agentic systems?',
    options: [
      'Network bandwidth usage',
      'The depth and thoroughness of agent thinking',
      'Database query optimization',
      'User interface responsiveness'
    ],
    correctAnswer: 1,
    explanation: 'Reasoning effort determines how much computational resources and time an agent invests in analyzing problems before taking action.',
    difficulty: 'beginner',
    category: 'prompting-optimization',
    subCategory: 'agentic-fundamentals',
    relatedTopics: ['reasoning-effort', 'thinking-depth', 'computation'],
    relatedConcepts: ['reasoning-effort', 'thinking-depth'],
    timeEstimate: 35,
    persona: ['agent-developer', 'ai-engineer', 'agent-architect']
  },

  // Prompt Optimization Patterns
  {
    id: 'optimization-p1',
    text: 'What is the primary goal of contradiction elimination in prompt optimization?',
    question: 'What is the primary goal of contradiction elimination in prompt optimization?',
    options: [
      'To reduce prompt length',
      'To remove conflicting instructions that confuse the agent',
      'To improve processing speed',
      'To add more examples'
    ],
    correctAnswer: 1,
    explanation: 'Contradiction elimination removes conflicting or inconsistent instructions that can cause agents to behave unpredictably or make poor decisions.',
    difficulty: 'intermediate',
    category: 'prompting-optimization',
    subCategory: 'optimization-patterns',
    relatedTopics: ['contradiction-elimination', 'consistency', 'clarity'],
    relatedConcepts: ['contradiction-elimination', 'consistency'],
    timeEstimate: 40,
    persona: ['agent-developer', 'ai-engineer', 'agent-architect']
  },
  {
    id: 'optimization-p2',
    text: 'Which optimization showed the most significant memory improvement in the case study?',
    question: 'Which optimization showed the most significant memory improvement in the case study?',
    options: [
      'Adding more examples',
      'Specificity improvements leading to -84% memory usage',
      'Increasing prompt length',
      'Adding more constraints'
    ],
    correctAnswer: 1,
    explanation: 'Specificity improvements led to an 84% reduction in memory usage (from 3626KB to 577KB) while maintaining 100% accuracy.',
    difficulty: 'intermediate',
    category: 'prompting-optimization',
    subCategory: 'optimization-patterns',
    relatedTopics: ['specificity', 'memory-optimization', 'performance'],
    relatedConcepts: ['specificity', 'memory-optimization'],
    timeEstimate: 35,
    persona: ['agent-developer', 'ai-engineer', 'agent-architect']
  },
  {
    id: 'optimization-p3',
    text: 'What is example consistency in prompt optimization?',
    question: 'What is example consistency in prompt optimization?',
    options: [
      'Using the same example multiple times',
      'Ensuring all examples follow the same format and quality standards',
      'Providing examples in alphabetical order',
      'Using only positive examples'
    ],
    correctAnswer: 1,
    explanation: 'Example consistency ensures all examples follow the same format, quality standards, and style to provide clear patterns for the agent.',
    difficulty: 'intermediate',
    category: 'prompting-optimization',
    subCategory: 'optimization-patterns',
    relatedTopics: ['example-consistency', 'format-standards', 'quality'],
    relatedConcepts: ['example-consistency', 'format-standards'],
    timeEstimate: 35,
    persona: ['agent-developer', 'ai-engineer', 'agent-architect']
  },

  // Agent Instruction Design
  {
    id: 'instruction-d1',
    text: 'What is the purpose of instruction hierarchy in agent design?',
    question: 'What is the purpose of instruction hierarchy in agent design?',
    options: [
      'To organize code files',
      'To prioritize instructions by importance and handle conflicts',
      'To improve database performance',
      'To design user interfaces'
    ],
    correctAnswer: 1,
    explanation: 'Instruction hierarchy establishes clear priorities among different types of instructions, ensuring agents follow the most important directives when conflicts arise.',
    difficulty: 'intermediate',
    category: 'prompting-optimization',
    subCategory: 'instruction-design',
    relatedTopics: ['instruction-hierarchy', 'priorities', 'conflict-resolution'],
    relatedConcepts: ['instruction-hierarchy', 'priorities'],
    timeEstimate: 40,
    persona: ['agent-developer', 'ai-engineer', 'agent-architect']
  },
  {
    id: 'instruction-d2',
    text: 'What does steerability refer to in agent instruction design?',
    question: 'What does steerability refer to in agent instruction design?',
    options: [
      'The ability to control agent behavior through instructions',
      'Network routing capabilities',
      'Database query optimization',
      'User authentication features'
    ],
    correctAnswer: 0,
    explanation: 'Steerability is the ability to guide and control agent behavior through well-designed instructions and constraints.',
    difficulty: 'intermediate',
    category: 'prompting-optimization',
    subCategory: 'instruction-design',
    relatedTopics: ['steerability', 'behavior-control', 'guidance'],
    relatedConcepts: ['steerability', 'behavior-control'],
    timeEstimate: 35,
    persona: ['agent-developer', 'ai-engineer', 'agent-architect']
  },
  {
    id: 'instruction-d3',
    text: 'Which verbosity level provides detailed explanations of reasoning?',
    question: 'Which verbosity level provides detailed explanations of reasoning?',
    options: [
      'Minimal (1-2)',
      'Balanced (3-4)',
      'Detailed (5-6)',
      'Comprehensive (7-8)'
    ],
    correctAnswer: 2,
    explanation: 'Detailed verbosity level (5-6) provides thorough explanations of reasoning processes while maintaining readability.',
    difficulty: 'beginner',
    category: 'prompting-optimization',
    subCategory: 'instruction-design',
    relatedTopics: ['verbosity-control', 'reasoning-explanations', 'output-management'],
    relatedConcepts: ['verbosity-control', 'reasoning-explanations'],
    timeEstimate: 30,
    persona: ['agent-developer', 'ai-engineer', 'agent-architect']
  },

  // Agentic Workflow Control
  {
    id: 'workflow-c1',
    text: 'What characterizes a sequential workflow pattern?',
    question: 'What characterizes a sequential workflow pattern?',
    options: [
      'Tasks executed simultaneously',
      'Tasks executed one after another in order',
      'Random task execution',
      'User-driven task selection'
    ],
    correctAnswer: 1,
    explanation: 'Sequential workflow patterns execute tasks one after another in a predetermined order, ensuring dependencies are respected.',
    difficulty: 'beginner',
    category: 'prompting-optimization',
    subCategory: 'workflow-control',
    relatedTopics: ['sequential-workflows', 'task-ordering', 'dependencies'],
    relatedConcepts: ['sequential-workflows', 'task-ordering'],
    timeEstimate: 30,
    persona: ['agent-developer', 'ai-engineer', 'agent-architect']
  },
  {
    id: 'workflow-c2',
    text: 'When should adaptive workflow patterns be used?',
    question: 'When should adaptive workflow patterns be used?',
    options: [
      'For simple, predictable tasks',
      'When workflow needs to change based on runtime conditions',
      'Only for user interface design',
      'For database operations only'
    ],
    correctAnswer: 1,
    explanation: 'Adaptive workflow patterns are ideal when the workflow needs to change dynamically based on runtime conditions, results, or environmental factors.',
    difficulty: 'advanced',
    category: 'prompting-optimization',
    subCategory: 'workflow-control',
    relatedTopics: ['adaptive-workflows', 'dynamic-behavior', 'conditions'],
    relatedConcepts: ['adaptive-workflows', 'dynamic-behavior'],
    timeEstimate: 40,
    persona: ['agent-developer', 'ai-engineer', 'agent-architect']
  },
  {
    id: 'workflow-c3',
    text: 'What is the benefit of parallel workflow patterns?',
    question: 'What is the benefit of parallel workflow patterns?',
    options: [
      'Simpler code structure',
      'Improved performance through concurrent execution',
      'Reduced memory usage',
      'Better user interfaces'
    ],
    correctAnswer: 1,
    explanation: 'Parallel workflow patterns improve performance by executing independent tasks concurrently, reducing overall completion time.',
    difficulty: 'intermediate',
    category: 'prompting-optimization',
    subCategory: 'workflow-control',
    relatedTopics: ['parallel-workflows', 'concurrency', 'performance'],
    relatedConcepts: ['parallel-workflows', 'concurrency'],
    timeEstimate: 35,
    persona: ['agent-developer', 'ai-engineer', 'agent-architect']
  },

  // Agent Evaluation Methodologies
  {
    id: 'evaluation-m1',
    text: 'What is LLM-as-judge methodology?',
    question: 'What is LLM-as-judge methodology?',
    options: [
      'Using humans to evaluate AI responses',
      'Using language models to assess subjective qualities of AI outputs',
      'Automated testing frameworks',
      'Performance monitoring tools'
    ],
    correctAnswer: 1,
    explanation: 'LLM-as-judge uses language models to evaluate subjective qualities like coherence, usefulness, and appropriateness that are difficult to measure with traditional metrics.',
    difficulty: 'intermediate',
    category: 'prompting-optimization',
    subCategory: 'evaluation-methodologies',
    relatedTopics: ['llm-as-judge', 'evaluation', 'quality-assessment'],
    relatedConcepts: ['llm-as-judge', 'evaluation'],
    timeEstimate: 40,
    persona: ['agent-developer', 'ai-engineer', 'agent-architect']
  },
  {
    id: 'evaluation-m2',
    text: 'Which metric combination provides the most comprehensive evaluation?',
    question: 'Which metric combination provides the most comprehensive evaluation?',
    options: [
      'Only accuracy metrics',
      'Quantitative and qualitative metrics together',
      'Only performance metrics',
      'Only user satisfaction scores'
    ],
    correctAnswer: 1,
    explanation: 'Combining quantitative metrics (accuracy, performance) with qualitative assessment (coherence, usefulness) provides the most comprehensive evaluation.',
    difficulty: 'intermediate',
    category: 'prompting-optimization',
    subCategory: 'evaluation-methodologies',
    relatedTopics: ['comprehensive-evaluation', 'quantitative-metrics', 'qualitative-assessment'],
    relatedConcepts: ['comprehensive-evaluation', 'metric-combination'],
    timeEstimate: 35,
    persona: ['agent-developer', 'ai-engineer', 'agent-architect']
  },
  {
    id: 'evaluation-m3',
    text: 'What is inter-judge agreement in evaluation validation?',
    question: 'What is inter-judge agreement in evaluation validation?',
    options: [
      'Agreement between different evaluation criteria',
      'Consistency between multiple judges evaluating the same content',
      'Agreement between human and AI evaluators',
      'Consistency in evaluation timing'
    ],
    correctAnswer: 1,
    explanation: 'Inter-judge agreement measures how consistently multiple judges (human or AI) evaluate the same content, indicating evaluation reliability.',
    difficulty: 'advanced',
    category: 'prompting-optimization',
    subCategory: 'evaluation-methodologies',
    relatedTopics: ['inter-judge-agreement', 'evaluation-reliability', 'consistency'],
    relatedConcepts: ['inter-judge-agreement', 'evaluation-reliability'],
    timeEstimate: 40,
    persona: ['agent-developer', 'ai-engineer', 'agent-architect']
  }
];

// Calculate total time for prompting optimization
export const promptingOptimizationTime = promptingOptimizationQuestions.reduce((total, q) => total + q.timeEstimate, 0);
