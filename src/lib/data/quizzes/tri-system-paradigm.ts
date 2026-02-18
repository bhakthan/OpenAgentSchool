import { QuizQuestion } from './types';

export const triSystemParadigmQuestions: QuizQuestion[] = [
  // ── Beginner ──────────────────────────────────────────────
  {
    id: 'tsp-b1',
    text: 'In the Tri-System Paradigm, System 1 is best described as:',
    question: 'In the Tri-System Paradigm, System 1 is best described as:',
    options: [
      'Deliberate, effortful analytical reasoning',
      'Fast, automatic pattern matching that fires before conscious awareness',
      'Probabilistic token prediction by a large language model',
      'A meta-cognitive monitoring layer'
    ],
    correctAnswer: 1,
    difficulty: 'beginner',
    category: 'tri-system-paradigm',
    subCategory: 'three-systems',
    explanation: 'System 1 is the fast, automatic heuristic processor inherited from evolution. It fires virtually instantly through pattern matching\u2014before the person has conscious access to the reasoning behind the response.',
    relatedConcepts: ['tri-system-paradigm', 'agent-ethics'],
    timeEstimate: 30,
    persona: ['ai-engineer', 'agent-architect', 'educator'],
    learningObjectives: ['Distinguish the three cognitive systems']
  },
  {
    id: 'tsp-b2',
    text: 'What biological resource most directly constrains System 2 (deliberate reasoning)?',
    question: 'What biological resource most directly constrains System 2 (deliberate reasoning)?',
    options: [
      'Oxygen saturation in the lungs',
      'Glucose availability to prefrontal cortex neurons',
      'Serotonin reuptake speed',
      'Long-term memory storage capacity'
    ],
    correctAnswer: 1,
    difficulty: 'beginner',
    category: 'tri-system-paradigm',
    subCategory: 'three-systems',
    explanation: 'System 2 thinking is metabolically expensive. Prefrontal-cortex neurons consume disproportionate glucose, and when supplies dip (fatigue, decision fatigue), the brain routes decisions back to cheaper System 1 heuristics.',
    relatedConcepts: ['tri-system-paradigm', 'agent-ethics'],
    timeEstimate: 30,
    persona: ['ai-engineer', 'educator'],
    learningObjectives: ['Understand metabolic cost of deliberate reasoning']
  },
  {
    id: 'tsp-b3',
    text: 'The "Law of Least Mental Effort" predicts that humans will:',
    question: 'The "Law of Least Mental Effort" predicts that humans will:',
    options: [
      'Always choose the most accurate answer regardless of cost',
      'Default to the cognitive path that requires the least energy expenditure',
      'Prefer System 2 thinking whenever a problem is novel',
      'Ignore AI outputs that contradict their priors'
    ],
    correctAnswer: 1,
    difficulty: 'beginner',
    category: 'tri-system-paradigm',
    subCategory: 'cognitive-surrender',
    explanation: 'The Law of Least Mental Effort states that when multiple cognitive paths exist, the brain preferentially selects the one with the lowest metabolic cost. This is efficiency, not laziness—but it creates vulnerability when AI provides a "free" answer.',
    relatedConcepts: ['tri-system-paradigm', 'agent-ethics'],
    timeEstimate: 25,
    persona: ['ai-engineer', 'educator', 'agent-architect'],
    learningObjectives: ['Explain why cognitive shortcuts are efficient, not lazy']
  },
  {
    id: 'tsp-b4',
    text: 'What does "attribute substitution" mean in the context of System 1?',
    question: 'What does "attribute substitution" mean in the context of System 1?',
    options: [
      'Replacing a difficult question with a simpler heuristic question',
      'Swapping one AI model for another during inference',
      'Converting qualitative assessments into quantitative scores',
      'Translating user prompts into embedding vectors'
    ],
    correctAnswer: 0,
    difficulty: 'beginner',
    category: 'tri-system-paradigm',
    subCategory: 'cognitive-surrender',
    explanation: 'Attribute substitution is a System 1 heuristic where the brain replaces a hard question ("Is this AI output correct?") with an easier proxy ("Does this output look fluent and confident?"). Fluent AI prose exploits this bias.',
    relatedConcepts: ['tri-system-paradigm', 'prompt-injection-defense'],
    timeEstimate: 30,
    persona: ['ai-engineer', 'educator'],
    learningObjectives: ['Identify attribute substitution in human-AI interaction']
  },
  {
    id: 'tsp-b5',
    text: 'System 3 in the Tri-System Paradigm refers to:',
    question: 'System 3 in the Tri-System Paradigm refers to:',
    options: [
      'The human unconscious mind',
      'A second layer of System 2 reasoning',
      'AI/LLM probabilistic token prediction that mimics but is not cognition',
      'The social influence layer of group decision-making'
    ],
    correctAnswer: 2,
    difficulty: 'beginner',
    category: 'tri-system-paradigm',
    subCategory: 'three-systems',
    explanation: 'System 3 is the novel addition: AI-based "thinking" (stochastic token prediction) that now participates in human cognitive ecology. It mimics System 2 output but via statistical pattern completion, not genuine understanding.',
    relatedConcepts: ['tri-system-paradigm', 'agent-architecture'],
    timeEstimate: 30,
    persona: ['ai-engineer', 'agent-architect', 'educator'],
    learningObjectives: ['Define System 3 and its relationship to biological cognition']
  },

  // ── Intermediate ──────────────────────────────────────────
  {
    id: 'tsp-i1',
    text: 'Cognitive surrender occurs when:',
    question: 'Cognitive surrender occurs when:',
    options: [
      'System 1 suppresses System 2 during time pressure',
      'System 2 offloads effortful reasoning to System 3, atrophying critical evaluation capacity',
      'A user manually copies AI output without reading it',
      'System 3 completely replaces System 1 as the default heuristic'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    category: 'tri-system-paradigm',
    subCategory: 'cognitive-surrender',
    explanation: 'Cognitive surrender is the progressive offloading of System 2 deliberation to System 3 (AI). Repeated offloading atrophies the neural pathways that sustain independent critical reasoning, creating dependency.',
    relatedConcepts: ['tri-system-paradigm', 'agent-ethics', 'human-in-the-loop-patterns'],
    timeEstimate: 35,
    persona: ['ai-engineer', 'agent-architect', 'educator'],
    learningObjectives: ['Explain the mechanism of cognitive surrender']
  },
  {
    id: 'tsp-i2',
    text: 'Which mechanism explains why fluent AI-generated text is more likely to be accepted uncritically?',
    question: 'Which mechanism explains why fluent AI-generated text is more likely to be accepted uncritically?',
    options: [
      'Anchoring bias from the first number seen',
      'Confidence inflation — System 1 equates fluency with accuracy',
      'The Dunning-Kruger effect in the evaluator',
      'Recency bias from the latest model version'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    category: 'tri-system-paradigm',
    subCategory: 'cognitive-surrender',
    explanation: 'Confidence inflation occurs because System 1 uses fluency as a proxy for truth (attribute substitution). LLMs produce maximally fluent text, which triggers automatic acceptance unless System 2 is deliberately engaged.',
    relatedConcepts: ['tri-system-paradigm', 'agent-evaluation'],
    timeEstimate: 35,
    persona: ['ai-engineer', 'agent-architect'],
    learningObjectives: ['Connect fluency heuristic to AI over-reliance']
  },
  {
    id: 'tsp-i3',
    text: 'A "beneficial friction" pattern in AI interface design is:',
    question: 'A "beneficial friction" pattern in AI interface design is:',
    options: [
      'Adding latency to responses so they feel more "thoughtful"',
      'Deliberately introducing a cognitive checkpoint that forces System 2 engagement before acceptance',
      'Making the UI more complex to discourage casual users',
      'Hiding the AI-generated answer behind a paywall'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    category: 'tri-system-paradigm',
    subCategory: 'beneficial-friction',
    explanation: 'Beneficial friction patterns (e.g., prediction-first prompts, confidence calibration, structured disagreement protocols) add purposeful checkpoints that re-engage System 2 thinking before the user accepts System 3 output.',
    relatedConcepts: ['tri-system-paradigm', 'human-in-the-loop-patterns'],
    timeEstimate: 30,
    persona: ['ai-engineer', 'agent-architect', 'educator'],
    learningObjectives: ['Define beneficial friction and its purpose']
  },
  {
    id: 'tsp-i4',
    text: 'The three evolutionary trajectories for human-AI cognition are:',
    question: 'The three evolutionary trajectories for human-AI cognition are:',
    options: [
      'Adoption, Rejection, Regulation',
      'Augmentation (AI amplifies human reasoning), Atrophy (AI replaces human reasoning), Symbiosis (dynamic cognitive partnership)',
      'Supervised, Unsupervised, Reinforcement',
      'Pre-training, Fine-tuning, Alignment'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    category: 'tri-system-paradigm',
    subCategory: 'evolutionary-paths',
    explanation: 'The paradigm identifies three possible futures: Augmentation (AI as cognitive amplifier), Atrophy (progressive surrender to AI), and Symbiosis (dynamic partnership where each system handles what it does best).',
    relatedConcepts: ['tri-system-paradigm', 'agent-ethics'],
    timeEstimate: 35,
    persona: ['ai-engineer', 'agent-architect', 'educator'],
    learningObjectives: ['Compare the three evolutionary trajectories']
  },
  {
    id: 'tsp-i5',
    text: 'Which of the following is an example of the "prediction-first" beneficial friction pattern?',
    question: 'Which of the following is an example of the "prediction-first" beneficial friction pattern?',
    options: [
      'The AI shows three alternative answers for the user to compare',
      'The user must write their own answer before seeing the AI suggestion',
      'The system delays showing the AI answer by 5 seconds',
      'The AI highlights which parts it is least confident about'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    category: 'tri-system-paradigm',
    subCategory: 'beneficial-friction',
    explanation: 'The prediction-first pattern forces users to commit to their own reasoning (engaging System 2) before revealing the AI answer. This prevents System 1 from simply anchoring on the first answer it sees.',
    relatedConcepts: ['tri-system-paradigm', 'human-in-the-loop-patterns'],
    timeEstimate: 30,
    persona: ['agent-architect', 'educator'],
    learningObjectives: ['Apply prediction-first friction in interface design']
  },

  // ── Advanced ──────────────────────────────────────────────
  {
    id: 'tsp-a1',
    text: 'How does the glucose-depletion model of System 2 fatigue interact with System 3 availability to create a cognitive dependency spiral?',
    question: 'How does the glucose-depletion model of System 2 fatigue interact with System 3 availability to create a cognitive dependency spiral?',
    options: [
      'System 2 fatigue is unrelated to System 3 usage patterns',
      'As glucose depletes, System 2 disengages earlier; if System 3 is always available, the brain learns to skip System 2 entirely, creating a feedback loop where critical thinking capacity atrophies',
      'System 3 actually reduces System 2 fatigue by providing pre-processed reasoning',
      'The spiral only affects users who spend more than 8 hours per day with AI tools'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    category: 'tri-system-paradigm',
    subCategory: 'cognitive-surrender',
    explanation: 'This is the core dependency spiral: biological fatigue (glucose depletion) makes System 2 expensive to engage. System 3 offers a zero-cost substitute. Over time, the brain optimizes by routing decisions straight to System 3, and the neural pathways supporting independent System 2 reasoning weaken from disuse.',
    relatedConcepts: ['tri-system-paradigm', 'agent-ethics', 'agent-evaluation'],
    timeEstimate: 45,
    persona: ['agent-architect', 'educator'],
    learningObjectives: ['Analyze the cognitive dependency feedback loop']
  },
  {
    id: 'tsp-a2',
    text: 'An AI agent team is deploying a medical diagnosis assistant. Using the Tri-System Paradigm, which intervention is most effective against cognitive surrender in radiologists?',
    question: 'An AI agent team is deploying a medical diagnosis assistant. Using the Tri-System Paradigm, which intervention is most effective against cognitive surrender in radiologists?',
    options: [
      'Display AI confidence scores alongside every diagnosis',
      'Require the radiologist to commit a preliminary read before revealing the AI suggestion, combined with periodic AI-free assessment sessions',
      'Remove the AI from the workflow and rely solely on human judgment',
      'Train a more accurate model so the radiologist never needs to override'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    category: 'tri-system-paradigm',
    subCategory: 'beneficial-friction',
    explanation: 'Prediction-first (commit before reveal) forces System 2 engagement on every case. Periodic AI-free sessions (cognitive gym) maintain independent diagnostic capacity. Confidence scores alone are insufficient — System 1 filters them through the same fluency heuristic.',
    relatedConcepts: ['tri-system-paradigm', 'human-in-the-loop-patterns', 'agent-evaluation'],
    timeEstimate: 45,
    persona: ['agent-architect', 'educator'],
    learningObjectives: ['Design cognitive-surrender countermeasures for high-stakes domains']
  },
  {
    id: 'tsp-a3',
    text: 'From a systems-design perspective, which architectural pattern best achieves Symbiosis (Trajectory 3)?',
    question: 'From a systems-design perspective, which architectural pattern best achieves Symbiosis (Trajectory 3)?',
    options: [
      'Full automation with human override button',
      'Dynamic cognitive load balancing where the system adjusts friction intensity based on measured user engagement and task criticality',
      'Static rule-based human-in-the-loop checkpoints at every decision',
      'AI makes all decisions but emails a weekly summary for human review'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    category: 'tri-system-paradigm',
    subCategory: 'evolutionary-paths',
    explanation: 'True symbiosis requires dynamic calibration: the system monitors cognitive engagement signals and adjusts friction inversely. High engagement + routine task → low friction. Low engagement + critical task → high friction. Static checkpoints either over-burden or under-protect.',
    relatedConcepts: ['tri-system-paradigm', 'human-in-the-loop-patterns', 'agent-architecture'],
    timeEstimate: 50,
    persona: ['agent-architect'],
    learningObjectives: ['Architect systems that promote cognitive symbiosis']
  },
  {
    id: 'tsp-a4',
    text: 'In the paradigm\'s framework, what distinguishes a System 3 hallucination from a System 1 cognitive bias?',
    question: 'In the paradigm\'s framework, what distinguishes a System 3 hallucination from a System 1 cognitive bias?',
    options: [
      'Hallucinations are random; biases are systematic',
      'System 3 errors appear structurally flawless (fluent, coherent) because they are optimized for surface plausibility, while System 1 biases are detectable through known deviation patterns',
      'There is no meaningful distinction; both are noise',
      'Hallucinations only occur with temperature > 0; biases only occur under stress'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    category: 'tri-system-paradigm',
    subCategory: 'three-systems',
    explanation: 'System 1 biases follow catalogued patterns (anchoring, availability, representativeness) that can be anticipated and checked. System 3 errors are more insidious: they are optimized for surface plausibility by the fluency objective, making them harder to detect without ground-truth verification.',
    relatedConcepts: ['tri-system-paradigm', 'agent-evaluation', 'agent-red-teaming'],
    timeEstimate: 45,
    persona: ['agent-architect', 'ai-engineer'],
    learningObjectives: ['Distinguish AI failure modes from human cognitive biases']
  },
  {
    id: 'tsp-a5',
    text: 'A company measures a 40% drop in independent problem-solving among engineers after 6 months of AI copilot use. Using the Tri-System Paradigm, which combination of interventions addresses the root cause?',
    question: 'A company measures a 40% drop in independent problem-solving among engineers after 6 months of AI copilot use. Using the Tri-System Paradigm, which combination of interventions addresses the root cause?',
    options: [
      'Ban AI copilots entirely and return to manual coding',
      'Add mandatory code review + periodic "AI-free" sprint days + structured disagreement prompts that force engineers to articulate why AI suggestions might be wrong',
      'Upgrade to a better AI model with fewer errors',
      'Add a "Did the AI help?" survey after each session'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    category: 'tri-system-paradigm',
    subCategory: 'beneficial-friction',
    explanation: 'The root cause is cognitive atrophy from sustained System 3 offloading. The fix requires: (1) Code review as social-accountability friction, (2) AI-free days as cognitive gym sessions to rebuild System 2 pathways, (3) Structured disagreement to force critical evaluation. Banning AI discards benefits; better models increase surrender risk.',
    relatedConcepts: ['tri-system-paradigm', 'human-in-the-loop-patterns', 'agent-ethics'],
    timeEstimate: 50,
    persona: ['agent-architect', 'educator'],
    learningObjectives: ['Design multi-layered cognitive-surrender countermeasures']
  }
];

export const triSystemParadigmTime = 35;
