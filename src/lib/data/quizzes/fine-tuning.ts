// Fine-tuning concepts quiz questions
import { QuizQuestion } from './types';

export const fineTuningQuestions: QuizQuestion[] = [
  // Beginner level questions
  {
    id: 'ft-b1',
    text: 'What is the primary goal of Supervised Fine-Tuning (SFT)?',
    question: 'What is the primary goal of Supervised Fine-Tuning (SFT)?',
    options: [
      'To increase model size',
      'To teach a model to imitate high-quality responses through input-output pairs',
      'To reduce computational costs',
      'To add new languages to the model'
    ],
    correctAnswer: 1,
    explanation: 'SFT trains a model to imitate desired behaviors by showing it input-output pairs, establishing consistent formatting, tone, and basic alignment.',
    difficulty: 'beginner',
    category: 'fine-tuning',
    subCategory: 'sft',
    relatedTopics: ['supervised-learning', 'imitation', 'alignment'],
    relatedConcepts: ['supervised-learning', 'imitation', 'alignment'],
    timeEstimate: 45,
    persona: ['ai-engineer', 'agent-developer', 'ai-enthusiast', 'agent-architect']
  },
  {
    id: 'ft-b2',
    text: 'What does DPO stand for in fine-tuning?',
    question: 'What does DPO stand for in fine-tuning?',
    options: [
      'Deep Performance Optimization',
      'Direct Preference Optimization',
      'Dynamic Parameter Optimization',
      'Distributed Processing Operations'
    ],
    correctAnswer: 1,
    explanation: 'DPO stands for Direct Preference Optimization, a method that trains models to prefer good responses over bad ones without needing a separate reward model.',
    difficulty: 'beginner',
    category: 'fine-tuning',
    subCategory: 'dpo',
    relatedTopics: ['preference-learning', 'alignment', 'optimization'],
    relatedConcepts: ['preference-learning', 'alignment', 'optimization'],
    timeEstimate: 30,
    persona: ['ai-engineer', 'agent-developer', 'ai-enthusiast', 'agent-architect']
  },
  {
    id: 'ft-b3',
    text: 'What is the main advantage of RFT over SFT?',
    question: 'What is the main advantage of RFT over SFT?',
    options: [
      'It uses less computational resources',
      'It can encourage reasoning and complex problem-solving through reward signals',
      'It requires no training data',
      'It works only with small models'
    ],
    correctAnswer: 1,
    explanation: 'RFT (Reinforcement Fine-Tuning) uses reward signals to encourage models to develop reasoning capabilities and solve complex problems, going beyond simple imitation.',
    difficulty: 'beginner',
    category: 'fine-tuning',
    subCategory: 'rft',
    relatedTopics: ['reinforcement-learning', 'reasoning', 'rewards'],
    relatedConcepts: ['reinforcement-learning', 'reasoning', 'rewards'],
    timeEstimate: 45,
    persona: ['ai-engineer', 'agent-developer', 'ai-enthusiast', 'agent-architect']
  },

  // Intermediate level questions
  {
    id: 'ft-i1',
    text: 'In DPO, what is the beta parameter used for?',
    question: 'In DPO, what is the beta parameter used for?',
    options: [
      'To control learning rate',
      'To balance preference sharpness versus training stability',
      'To set the batch size',
      'To determine model architecture'
    ],
    correctAnswer: 1,
    explanation: 'The beta parameter in DPO controls the trade-off between how sharply the model learns preferences versus maintaining training stability. Higher beta means sharper preferences but potential instability.',
    difficulty: 'intermediate',
    category: 'fine-tuning',
    subCategory: 'dpo',
    relatedTopics: ['hyperparameters', 'stability', 'preference-learning'],
    relatedConcepts: ['hyperparameters', 'stability', 'preference-learning'],
    timeEstimate: 60,
    persona: ['ai-engineer', 'agent-developer', 'agent-architect']
  },
  {
    id: 'ft-i2',
    text: 'What is KL divergence monitoring important for in fine-tuning?',
    question: 'What is KL divergence monitoring important for in fine-tuning?',
    options: [
      'To measure training speed',
      'To prevent the model from drifting too far from the reference model',
      'To calculate memory usage',
      'To determine optimal batch size'
    ],
    correctAnswer: 1,
    explanation: 'KL divergence measures how much the fine-tuned model differs from the reference model. Monitoring it prevents catastrophic forgetting and maintains desirable base capabilities.',
    difficulty: 'intermediate',
    category: 'fine-tuning',
    subCategory: 'evaluation',
    relatedTopics: ['kl-divergence', 'model-drift', 'evaluation'],
    relatedConcepts: ['kl-divergence', 'model-drift', 'evaluation'],
    timeEstimate: 60,
    persona: ['ai-engineer', 'agent-developer', 'agent-architect']
  },
  {
    id: 'ft-i3',
    text: 'What should you avoid when creating negative examples for DPO?',
    question: 'What should you avoid when creating negative examples for DPO?',
    options: [
      'Using real user queries',
      'Creating strawman negatives that are obviously wrong',
      'Including multiple response options',
      'Using domain-specific terminology'
    ],
    correctAnswer: 1,
    explanation: 'Strawman negatives that are obviously wrong provide little learning signal. Good negative examples should be plausible but subtly inferior to help the model learn meaningful distinctions.',
    difficulty: 'intermediate',
    category: 'fine-tuning',
    subCategory: 'data-strategy',
    relatedTopics: ['data-quality', 'preference-pairs', 'training-data'],
    relatedConcepts: ['data-quality', 'preference-pairs', 'training-data'],
    timeEstimate: 60,
    persona: ['ai-engineer', 'agent-developer', 'agent-architect']
  },

  // Advanced level questions
  {
    id: 'ft-a1',
    text: 'In RFT, what is adaptive KL targeting and why is it important?',
    question: 'In RFT, what is adaptive KL targeting and why is it important?',
    options: [
      'A method to reduce training time',
      'Dynamically adjusting KL penalty when divergence spikes to prevent model collapse',
      'A technique for data augmentation',
      'A way to optimize memory usage'
    ],
    correctAnswer: 1,
    explanation: 'Adaptive KL targeting monitors KL divergence during training and increases the penalty when the model starts drifting too far from the reference, preventing collapse while allowing beneficial learning.',
    difficulty: 'advanced',
    category: 'fine-tuning',
    subCategory: 'rft',
    relatedTopics: ['adaptive-regularization', 'model-collapse', 'policy-optimization'],
    relatedConcepts: ['adaptive-regularization', 'model-collapse', 'policy-optimization'],
    timeEstimate: 90,
    persona: ['ai-engineer', 'agent-architect']
  },
  {
    id: 'ft-a2',
    text: 'What is the recommended approach for reward decomposition in RFT?',
    question: 'What is the recommended approach for reward decomposition in RFT?',
    options: [
      'Use a single aggregate reward score',
      'Design separate components for accuracy, reasoning, safety, and format, then combine with weights',
      'Only use automated metrics',
      'Rely purely on human feedback'
    ],
    correctAnswer: 1,
    explanation: 'Reward decomposition involves creating separate reward components (accuracy, reasoning depth, safety, format) that can be weighted and combined, allowing for better interpretability and control.',
    difficulty: 'advanced',
    category: 'fine-tuning',
    subCategory: 'rft',
    relatedTopics: ['reward-engineering', 'interpretability', 'multi-objective'],
    relatedConcepts: ['reward-engineering', 'interpretability', 'multi-objective'],
    timeEstimate: 90,
    persona: ['ai-engineer', 'agent-architect']
  },
  {
    id: 'ft-a3',
    text: 'What is a critical governance practice for production fine-tuning pipelines?',
    question: 'What is a critical governance practice for production fine-tuning pipelines?',
    options: [
      'Using the largest possible model',
      'Maintaining version manifests linking base model, datasets, and hyperparameters with automated rollback triggers',
      'Always training from scratch',
      'Ignoring computational costs'
    ],
    correctAnswer: 1,
    explanation: 'Production fine-tuning requires strict versioning of all components (base model hash, dataset snapshots, hyperparameters) and automated rollback mechanisms tied to benchmark regression or safety drift.',
    difficulty: 'advanced',
    category: 'fine-tuning',
    subCategory: 'ops-risk',
    relatedTopics: ['mlops', 'versioning', 'governance', 'rollback-strategies'],
    relatedConcepts: ['mlops', 'versioning', 'governance', 'rollback-strategies'],
    timeEstimate: 90,
    persona: ['ai-engineer', 'agent-architect']
  },

  // Comparative and strategic questions
  {
    id: 'ft-i4',
    text: 'When should you escalate from SFT to DPO?',
    question: 'When should you escalate from SFT to DPO?',
    options: [
      'Always use DPO for better results',
      'When subtle preference gaps persist and you can curate quality preference pairs',
      'Only when SFT completely fails',
      'When you have unlimited computational resources'
    ],
    correctAnswer: 1,
    explanation: 'DPO should be used when SFT handles basic formatting but subtle preference issues remain, and when you can create high-quality chosen vs rejected pairs without needing full reward model infrastructure.',
    difficulty: 'intermediate',
    category: 'fine-tuning',
    subCategory: 'strategy',
    relatedTopics: ['escalation-criteria', 'preference-learning', 'cost-benefit'],
    relatedConcepts: ['escalation-criteria', 'preference-learning', 'cost-benefit'],
    timeEstimate: 75,
    persona: ['ai-engineer', 'agent-developer', 'agent-architect']
  },
  {
    id: 'ft-i5',
    text: 'What is a key risk when progressing through SFT → DPO → RFT?',
    question: 'What is a key risk when progressing through SFT → DPO → RFT?',
    options: [
      'Increased training speed',
      'Catastrophic forgetting and regression on previously learned capabilities',
      'Reduced model complexity',
      'Lower computational requirements'
    ],
    correctAnswer: 1,
    explanation: 'Each fine-tuning stage can cause the model to forget previously learned capabilities. This requires careful monitoring of style regression sets and benchmark performance throughout the pipeline.',
    difficulty: 'intermediate',
    category: 'fine-tuning',
    subCategory: 'risks',
    relatedTopics: ['catastrophic-forgetting', 'regression-testing', 'capability-preservation'],
    relatedConcepts: ['catastrophic-forgetting', 'regression-testing', 'capability-preservation'],
    timeEstimate: 75,
    persona: ['ai-engineer', 'agent-developer', 'agent-architect']
  }
];
