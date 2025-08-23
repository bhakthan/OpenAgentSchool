import { QuizQuestion } from './types';

export const sensoryReasoningEnhancementQuestions: QuizQuestion[] = [
  // Beginner Level Questions
  {
    id: 'sensory-reasoning-b1',
    question: 'What is the primary advantage of multi-sensory reasoning in AI agents?',
    text: 'What is the primary advantage of multi-sensory reasoning in AI agents?',
    options: [
      'It reduces computational requirements',
      'It enables more comprehensive and accurate decision-making by processing multiple types of input',
      'It simplifies the AI architecture',
      'It only works with visual data'
    ],
    correctAnswer: 1,
    explanation: 'Multi-sensory reasoning allows AI agents to process visual, auditory, and textual inputs simultaneously, leading to more comprehensive understanding and more accurate decisions by cross-validating information across modalities.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'sensory-reasoning-enhancement',
    learningObjectives: ['Understand multi-modal benefits', 'Recognize comprehensive decision-making'],
    relatedConcepts: ['multi-modal-processing', 'decision-accuracy', 'cross-validation'],
    persona: ['business-leader', 'no-code-engineer', 'agent-designer'],
    timeEstimate: 30
  },
  {
    id: 'sensory-reasoning-b2',
    question: 'Which of the following best describes sensory reasoning enhancement?',
    text: 'Which of the following best describes sensory reasoning enhancement?',
    options: [
      'Using only text-based inputs for AI reasoning',
      'Enhancing AI agents with the ability to process and reason across multiple sensory modalities',
      'Increasing the speed of single-modal processing',
      'Reducing the complexity of AI systems'
    ],
    correctAnswer: 1,
    explanation: 'Sensory reasoning enhancement involves augmenting AI agents with capabilities to process and reason across multiple sensory modalities (visual, auditory, textual, etc.) to create more nuanced and comprehensive understanding.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'sensory-reasoning-enhancement',
    learningObjectives: ['Define sensory reasoning enhancement', 'Understand modality integration'],
    relatedConcepts: ['sensory-modalities', 'reasoning-enhancement', 'multi-modal-fusion'],
    persona: ['ai-enthusiast', 'agent-developer', 'agent-designer'],
    timeEstimate: 35
  },

  // Intermediate Level Questions
  {
    id: 'sensory-reasoning-i1',
    question: 'What role do attention mechanisms play in sensory reasoning enhancement?',
    text: 'What role do attention mechanisms play in sensory reasoning enhancement?',
    options: [
      'They slow down processing to be more careful',
      'They help focus on the most relevant features across different modalities',
      'They eliminate the need for preprocessing',
      'They only work with visual data'
    ],
    correctAnswer: 1,
    explanation: 'Attention mechanisms in sensory reasoning systems help dynamically focus computational resources on the most relevant features across different modalities, improving efficiency and accuracy by filtering out irrelevant information.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'sensory-reasoning-enhancement',
    learningObjectives: ['Understand attention mechanisms', 'Recognize feature relevance filtering'],
    relatedConcepts: ['attention-mechanisms', 'feature-selection', 'computational-efficiency'],
    persona: ['agent-developer', 'ai-engineer', 'agent-architect'],
    timeEstimate: 40
  },
  {
    id: 'sensory-reasoning-i2',
    question: 'How does evidence integration work in multi-modal AI systems?',
    text: 'How does evidence integration work in multi-modal AI systems?',
    options: [
      'By processing each modality completely separately',
      'By combining and weighing evidence from different sensory inputs with conflict resolution',
      'By only using the strongest signal from one modality',
      'By converting all inputs to the same format'
    ],
    correctAnswer: 1,
    explanation: 'Evidence integration in multi-modal systems involves combining information from different sensory inputs, weighing their reliability, resolving conflicts between contradictory evidence, and producing unified assessments.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'sensory-reasoning-enhancement',
    learningObjectives: ['Understand evidence integration', 'Learn conflict resolution methods'],
    relatedConcepts: ['evidence-fusion', 'conflict-resolution', 'reliability-weighting'],
    persona: ['agent-developer', 'ai-engineer', 'system-analyst'],
    timeEstimate: 45
  },
  {
    id: 'sensory-reasoning-i3',
    question: 'What is the primary challenge when dealing with conflicting evidence from different sensory modalities?',
    text: 'What is the primary challenge when dealing with conflicting evidence from different sensory modalities?',
    options: [
      'All modalities always agree with each other',
      'Determining which evidence is more reliable and how to weight conflicting information',
      'Converting all data to the same format',
      'Processing speed limitations'
    ],
    correctAnswer: 1,
    explanation: 'The primary challenge is determining the reliability of different evidence sources and developing strategies to weight and resolve conflicting information when different modalities provide contradictory signals.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'sensory-reasoning-enhancement',
    learningObjectives: ['Identify conflict resolution challenges', 'Understand reliability assessment'],
    relatedConcepts: ['evidence-conflicts', 'reliability-assessment', 'decision-uncertainty'],
    persona: ['agent-developer', 'ai-engineer', 'agent-architect'],
    timeEstimate: 40
  },

  // Advanced Level Questions
  {
    id: 'sensory-reasoning-a1',
    question: 'In a medical diagnosis scenario using sensory reasoning enhancement, how would you design a system to handle uncertainty and provide confidence scores?',
    text: 'In a medical diagnosis scenario using sensory reasoning enhancement, how would you design a system to handle uncertainty and provide confidence scores?',
    options: [
      'Always provide the highest confidence possible',
      'Use Bayesian inference to combine probabilistic evidence and propagate uncertainty through the system',
      'Only use the most reliable single modality',
      'Avoid uncertainty by requiring perfect data'
    ],
    correctAnswer: 1,
    explanation: 'A robust medical diagnosis system should use Bayesian inference to combine probabilistic evidence from multiple modalities, properly propagate uncertainty through the decision process, and provide calibrated confidence scores that reflect the actual reliability of the diagnosis.',
    difficulty: 'advanced',
    category: 'agent-patterns',
    subCategory: 'sensory-reasoning-enhancement',
    learningObjectives: ['Design uncertainty handling systems', 'Implement confidence scoring'],
    relatedConcepts: ['bayesian-inference', 'uncertainty-propagation', 'confidence-calibration'],
    persona: ['ai-engineer', 'agent-architect', 'research-scientist'],
    timeEstimate: 60
  },
  {
    id: 'sensory-reasoning-a2',
    question: 'What are the key architectural considerations for scaling sensory reasoning enhancement systems to handle real-time processing?',
    text: 'What are the key architectural considerations for scaling sensory reasoning enhancement systems to handle real-time processing?',
    options: [
      'Process all modalities sequentially to ensure accuracy',
      'Use parallel processing, efficient attention mechanisms, and adaptive preprocessing based on computational constraints',
      'Reduce the number of modalities to improve speed',
      'Only process data when the system is idle'
    ],
    correctAnswer: 1,
    explanation: 'Real-time sensory reasoning systems require parallel processing of modalities, efficient attention mechanisms to focus on relevant features, adaptive preprocessing to handle varying input quality, and smart resource allocation to meet timing constraints.',
    difficulty: 'advanced',
    category: 'agent-patterns',
    subCategory: 'sensory-reasoning-enhancement',
    learningObjectives: ['Design scalable architectures', 'Optimize real-time processing'],
    relatedConcepts: ['parallel-processing', 'real-time-systems', 'resource-optimization'],
    persona: ['agent-architect', 'system-analyst', 'performance-engineer'],
    timeEstimate: 55
  },
  {
    id: 'sensory-reasoning-a3',
    question: 'How would you implement adaptive learning in a sensory reasoning enhancement system that improves from feedback?',
    text: 'How would you implement adaptive learning in a sensory reasoning enhancement system that improves from feedback?',
    options: [
      'Retrain the entire system from scratch with each feedback',
      'Use online learning with separate adaptation rates for different modalities and components',
      'Ignore feedback to maintain system stability',
      'Only learn from positive feedback'
    ],
    correctAnswer: 1,
    explanation: 'Effective adaptive learning in multi-modal systems requires online learning approaches with component-specific adaptation rates, careful validation of feedback quality, and mechanisms to prevent catastrophic forgetting while enabling continuous improvement.',
    difficulty: 'advanced',
    category: 'agent-patterns',
    subCategory: 'sensory-reasoning-enhancement',
    learningObjectives: ['Implement adaptive learning', 'Design feedback integration'],
    relatedConcepts: ['online-learning', 'feedback-integration', 'continuous-adaptation'],
    persona: ['ai-engineer', 'research-scientist', 'agent-architect'],
    timeEstimate: 65
  },

  // Business Application Questions
  {
    id: 'sensory-reasoning-business-1',
    question: 'In which business scenario would sensory reasoning enhancement provide the most value?',
    text: 'In which business scenario would sensory reasoning enhancement provide the most value?',
    options: [
      'Simple data entry tasks',
      'Quality control in manufacturing with visual inspection, acoustic monitoring, and specification compliance',
      'Basic text processing workflows',
      'Single-user applications'
    ],
    correctAnswer: 1,
    explanation: 'Quality control in manufacturing is ideal for sensory reasoning enhancement because it combines visual inspection (defect detection), acoustic monitoring (operational sounds), and specification compliance (textual requirements) to make comprehensive quality assessments.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'sensory-reasoning-enhancement',
    learningObjectives: ['Identify optimal use cases', 'Understand business applications'],
    relatedConcepts: ['quality-control', 'manufacturing-applications', 'business-value'],
    persona: ['business-leader', 'operations-manager', 'quality-engineer'],
    timeEstimate: 45
  },
  {
    id: 'sensory-reasoning-business-2',
    question: 'What ROI considerations are important when implementing sensory reasoning enhancement systems?',
    text: 'What ROI considerations are important when implementing sensory reasoning enhancement systems?',
    options: [
      'Only initial implementation costs',
      'Improved decision accuracy, reduced errors, automation of complex tasks, and maintenance costs',
      'Only the cost of hardware',
      'Only training time'
    ],
    correctAnswer: 1,
    explanation: 'ROI for sensory reasoning systems should consider improved decision accuracy reducing costly errors, automation of complex multi-modal tasks, enhanced quality control, balanced against implementation and ongoing maintenance costs.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'sensory-reasoning-enhancement',
    learningObjectives: ['Evaluate business ROI', 'Understand cost-benefit analysis'],
    relatedConcepts: ['roi-analysis', 'cost-benefit', 'business-impact'],
    persona: ['business-leader', 'financial-analyst', 'project-manager'],
    timeEstimate: 50
  }
];

// Calculate estimated time for all questions
export const sensoryReasoningEnhancementTime = sensoryReasoningEnhancementQuestions.reduce(
  (total, question) => total + question.timeEstimate, 
  0
);
