// @ts-nocheck
// Educational Agent Patterns quiz questions - GPT-5 Era Learning Methodologies
import { QuizQuestion } from './types';

export const educationalAgentPatternsQuestions: QuizQuestion[] = [
  // Socratic Coach Pattern
  {
    id: 'socratic-coach-b1',
    question: 'What is the primary purpose of the Socratic Coach pattern?',
    text: 'What is the primary purpose of the Socratic Coach pattern?',
    options: [
      'To provide direct answers to learner questions',
      'To guide learners through strategic questioning that leads them to discover answers themselves',
      'To replace human teachers entirely',
      'To test learner knowledge through multiple choice questions'
    ],
    correctAnswer: 1,
    explanation: 'The Socratic Coach pattern guides learners through strategic questioning rather than providing direct answers, helping them build durable understanding through discovery and reasoning.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'socratic-coach',
    learningObjectives: ['Understand Socratic questioning principles', 'Recognize discovery-based learning benefits'],
    relatedConcepts: ['guided-discovery', 'metacognition', 'question-driven-learning'],
    persona: ['business-leader', 'educator', 'agent-designer'],
    timeEstimate: 30
  },
  {
    id: 'socratic-coach-i1',
    question: 'How does the Socratic Coach pattern avoid "answer over-reliance" in learners?',
    text: 'How does the Socratic Coach pattern avoid "answer over-reliance" in learners?',
    options: [
      'By providing multiple choice answers',
      'By generating 1-3 targeted questions that reveal gaps without spoiling solutions',
      'By refusing to help learners at all',
      'By only providing documentation links'
    ],
    correctAnswer: 1,
    explanation: 'The pattern generates targeted questions that expose conceptual gaps and guide thinking without revealing solutions, forcing learners to develop their own reasoning paths rather than memorizing answers.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'socratic-coach',
    learningObjectives: ['Design effective Socratic questioning strategies', 'Prevent answer dependency'],
    relatedConcepts: ['cognitive-load-management', 'misconception-detection', 'transfer-learning'],
    persona: ['educator', 'agent-developer', 'instructional-designer'],
    timeEstimate: 40
  },
  {
    id: 'socratic-coach-a1',
    question: 'What advanced techniques does the Socratic Coach pattern use for metacognitive development?',
    text: 'What advanced techniques does the Socratic Coach pattern use for metacognitive development?',
    options: [
      'Only asking about factual knowledge',
      'Process-focused questions like "How did you arrive at that conclusion?" and strategy reflection',
      'Providing step-by-step solutions',
      'Testing memorization of procedures'
    ],
    correctAnswer: 1,
    explanation: 'Advanced implementations include metacognitive questions about thinking processes, strategy awareness, and self-monitoring, developing learners\' awareness of their own cognitive processes.',
    difficulty: 'advanced',
    category: 'agent-patterns',
    subCategory: 'socratic-coach',
    learningObjectives: ['Implement metacognitive questioning', 'Develop self-aware learners'],
    relatedConcepts: ['metacognition', 'self-regulation', 'cognitive-strategies'],
    persona: ['educator', 'cognitive-scientist', 'advanced-agent-designer'],
    timeEstimate: 50
  },

  // Concept-to-Project Builder Pattern
  {
    id: 'concept-to-project-b1',
    question: 'What gap does the Concept-to-Project Builder pattern address in learning?',
    text: 'What gap does the Concept-to-Project Builder pattern address in learning?',
    options: [
      'Lack of theoretical knowledge',
      'The disconnect between understanding concepts intellectually and applying them practically',
      'Insufficient technical documentation',
      'Lack of assessment tools'
    ],
    correctAnswer: 1,
    explanation: 'This pattern bridges the gap between theoretical understanding and practical application by systematically transforming abstract concepts into concrete, implementable projects.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'concept-to-project',
    learningObjectives: ['Identify theory-practice gaps', 'Understand project-based learning benefits'],
    relatedConcepts: ['applied-learning', 'hands-on-experience', 'concept-application'],
    persona: ['educator', 'curriculum-designer', 'project-manager'],
    timeEstimate: 35
  },
  {
    id: 'concept-to-project-i1',
    question: 'How does the Concept-to-Project Builder ensure projects reinforce the original concept?',
    text: 'How does the Concept-to-Project Builder ensure projects reinforce the original concept?',
    options: [
      'By making projects as complex as possible',
      'Through conceptual mapping that explicitly connects each implementation step back to theoretical principles',
      'By avoiding any theoretical references',
      'By using only advanced programming concepts'
    ],
    correctAnswer: 1,
    explanation: 'The pattern includes conceptual mapping throughout the project, explicitly connecting each implementation step back to the theoretical concept, helping learners understand both "how" and "why".',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'concept-to-project',
    learningObjectives: ['Design concept-reinforcing projects', 'Map theory to practice'],
    relatedConcepts: ['conceptual-mapping', 'scaffolded-learning', 'progressive-complexity'],
    persona: ['instructional-designer', 'technical-educator', 'agent-developer'],
    timeEstimate: 45
  },

  // Error Whisperer Pattern
  {
    id: 'error-whisperer-b1',
    question: 'How does the Error Whisperer pattern transform the debugging experience?',
    text: 'How does the Error Whisperer pattern transform the debugging experience?',
    options: [
      'By automatically fixing all errors',
      'By transforming frustrating debugging into structured learning opportunities with educational guidance',
      'By avoiding errors completely',
      'By providing only error documentation'
    ],
    correctAnswer: 1,
    explanation: 'The Error Whisperer transforms typically frustrating debugging experiences into structured learning opportunities by providing intelligent, educational guidance through the error resolution process.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'error-whisperer',
    learningObjectives: ['Understand educational debugging approaches', 'Transform errors into learning'],
    relatedConcepts: ['error-driven-learning', 'debugging-methodology', 'problem-solving-skills'],
    persona: ['developer', 'educator', 'debugging-mentor'],
    timeEstimate: 30
  },
  {
    id: 'error-whisperer-i1',
    question: 'What systematic approach does the Error Whisperer use for root cause analysis?',
    text: 'What systematic approach does the Error Whisperer use for root cause analysis?',
    options: [
      'Immediately providing the fix',
      'Guiding learners through isolation, assumption checking, input/output examination, and systematic investigation',
      'Only explaining error messages',
      'Referring to documentation only'
    ],
    correctAnswer: 1,
    explanation: 'The pattern guides learners through systematic debugging approaches including problem isolation, assumption verification, input/output analysis, and methodical investigation rather than just fixing symptoms.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'error-whisperer',
    learningObjectives: ['Implement systematic debugging', 'Teach root cause analysis'],
    relatedConcepts: ['systematic-investigation', 'hypothesis-testing', 'diagnostic-reasoning'],
    persona: ['debugging-expert', 'technical-mentor', 'agent-developer'],
    timeEstimate: 40
  },

  // Knowledge Map Navigator Pattern
  {
    id: 'knowledge-map-navigator-b1',
    question: 'What advantage does the Knowledge Map Navigator pattern provide over linear learning paths?',
    text: 'What advantage does the Knowledge Map Navigator pattern provide over linear learning paths?',
    options: [
      'It moves faster through content',
      'It shows relationships, alternatives, and multiple paths that accommodate different learning styles',
      'It requires less preparation',
      'It avoids complex topics'
    ],
    correctAnswer: 1,
    explanation: 'Visual knowledge maps show relationships and alternatives that linear lists miss, providing multiple learning paths that accommodate different learning speeds and preferences.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'knowledge-map-navigator',
    learningObjectives: ['Understand visual learning paths', 'Design personalized curricula'],
    relatedConcepts: ['visual-learning', 'adaptive-paths', 'curriculum-design'],
    persona: ['curriculum-designer', 'educator', 'learning-path-architect'],
    timeEstimate: 35
  },
  {
    id: 'knowledge-map-navigator-i1',
    question: 'How does the Knowledge Map Navigator handle prerequisite dependencies?',
    text: 'How does the Knowledge Map Navigator handle prerequisite dependencies?',
    options: [
      'By ignoring all prerequisites',
      'Through dependency mapping that shows required foundations and consequences of wrong sequencing',
      'By making all topics independent',
      'By following only one fixed sequence'
    ],
    correctAnswer: 1,
    explanation: 'The pattern creates dependency mappings that identify prerequisite relationships, show required foundations, and demonstrate the consequences of incorrect learning sequence.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'knowledge-map-navigator',
    learningObjectives: ['Map learning dependencies', 'Sequence curriculum effectively'],
    relatedConcepts: ['prerequisite-mapping', 'dependency-analysis', 'curriculum-sequencing'],
    persona: ['curriculum-architect', 'learning-analyst', 'educational-technologist'],
    timeEstimate: 45
  },

  // Peer Review Simulator Pattern
  {
    id: 'peer-review-simulator-b1',
    question: 'What safe learning environment does the Peer Review Simulator create?',
    text: 'What safe learning environment does the Peer Review Simulator create?',
    options: [
      'An environment without any feedback',
      'A judgment-free space for practicing collaborative review skills before real peer interactions',
      'A competitive testing environment',
      'An environment focused only on criticism'
    ],
    correctAnswer: 1,
    explanation: 'The pattern creates a safe, judgment-free environment where learners can practice giving and receiving feedback, developing collaborative review skills before engaging in real peer interactions.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'peer-review-simulator',
    learningObjectives: ['Create safe practice environments', 'Develop collaborative skills'],
    relatedConcepts: ['safe-practice', 'feedback-skills', 'collaborative-learning'],
    persona: ['educator', 'team-leader', 'collaboration-facilitator'],
    timeEstimate: 30
  },
  {
    id: 'peer-review-simulator-i1',
    question: 'How does the Peer Review Simulator develop constructive feedback skills?',
    text: 'How does the Peer Review Simulator develop constructive feedback skills?',
    options: [
      'By avoiding all negative comments',
      'Through structured frameworks for balanced, actionable feedback with specific examples',
      'By only providing positive feedback',
      'By using standardized checklists only'
    ],
    correctAnswer: 1,
    explanation: 'The pattern teaches structured feedback frameworks that balance positive recognition with constructive criticism, ensuring feedback is specific, actionable, and developmentally focused.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'peer-review-simulator',
    learningObjectives: ['Structure effective feedback', 'Balance criticism with support'],
    relatedConcepts: ['constructive-feedback', 'feedback-frameworks', 'communication-skills'],
    persona: ['feedback-coach', 'team-facilitator', 'communication-trainer'],
    timeEstimate: 40
  },

  // Tool-Use Coach Pattern
  {
    id: 'tool-use-coach-b1',
    question: 'What problem does the Tool-Use Coach pattern solve in technical education?',
    text: 'What problem does the Tool-Use Coach pattern solve in technical education?',
    options: [
      'Lack of tool documentation',
      'Learners guessing at API usage and making reproducibility errors through undisciplined tool use',
      'Too many available tools',
      'Insufficient computing resources'
    ],
    correctAnswer: 1,
    explanation: 'The pattern addresses the common problem of learners guessing at API/CLI/SDK usage, making errors, and lacking reproducible approaches by providing disciplined guidance with exemplars and validation.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'tool-use-coach',
    learningObjectives: ['Understand disciplined tool usage', 'Prevent API misuse'],
    relatedConcepts: ['api-training', 'reproducible-methods', 'tool-validation'],
    persona: ['developer', 'technical-trainer', 'api-educator'],
    timeEstimate: 35
  },
  {
    id: 'tool-use-coach-i1',
    question: 'What validation approach does the Tool-Use Coach use to ensure correct tool usage?',
    text: 'What validation approach does the Tool-Use Coach use to ensure correct tool usage?',
    options: [
      'Only providing documentation links',
      'Validated exemplars with comments, pitfall lists, and validation checklists',
      'Trial and error approaches',
      'Generic examples only'
    ],
    correctAnswer: 1,
    explanation: 'The pattern provides validated exemplars with detailed comments, comprehensive lists of common pitfalls and counter-examples, plus validation checklists for systematic verification.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'tool-use-coach',
    learningObjectives: ['Create validated exemplars', 'Prevent common pitfalls'],
    relatedConcepts: ['validated-examples', 'pitfall-prevention', 'systematic-verification'],
    persona: ['api-expert', 'technical-mentor', 'tool-specialist'],
    timeEstimate: 45
  },

  // Context Curator Pattern
  {
    id: 'context-curator-b1',
    question: 'How does the Context Curator pattern help with information overload?',
    text: 'How does the Context Curator pattern help with information overload?',
    options: [
      'By providing all available information',
      'Through intelligent filtering and relevance management that prioritizes pertinent information',
      'By limiting information to single sources',
      'By removing all complex information'
    ],
    correctAnswer: 1,
    explanation: 'The Context Curator intelligently filters and manages information relevance, helping learners focus on pertinent information while avoiding overwhelming cognitive load.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'context-curator',
    learningObjectives: ['Manage information overload', 'Filter relevant content'],
    relatedConcepts: ['information-filtering', 'relevance-management', 'cognitive-load'],
    persona: ['information-architect', 'content-curator', 'learning-designer'],
    timeEstimate: 30
  },
  {
    id: 'context-curator-i1',
    question: 'What adaptive mechanisms does the Context Curator use for personalization?',
    text: 'What adaptive mechanisms does the Context Curator use for personalization?',
    options: [
      'Fixed filtering rules for everyone',
      'Learning style analysis, progress tracking, and dynamic relevance adjustment based on individual needs',
      'Random content selection',
      'Chronological information ordering'
    ],
    correctAnswer: 1,
    explanation: 'The pattern adapts to individual learning styles, tracks progress, and dynamically adjusts relevance criteria based on learner needs, goals, and demonstrated understanding.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'context-curator',
    learningObjectives: ['Implement adaptive filtering', 'Personalize content delivery'],
    relatedConcepts: ['adaptive-systems', 'personalization', 'dynamic-filtering'],
    persona: ['personalization-engineer', 'adaptive-system-designer', 'ai-tutor-developer'],
    timeEstimate: 40
  },

  // Rubric Rater Pattern
  {
    id: 'rubric-rater-b1',
    question: 'What consistency advantage does the Rubric Rater pattern provide over manual assessment?',
    text: 'What consistency advantage does the Rubric Rater pattern provide over manual assessment?',
    options: [
      'It grades faster only',
      'Automated assessment with detailed, consistent feedback that eliminates human grading variability',
      'It provides only numerical scores',
      'It requires no rubric development'
    ],
    correctAnswer: 1,
    explanation: 'The Rubric Rater provides consistent, detailed feedback based on structured rubrics, eliminating the variability and subjectivity that can occur with human grading.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'rubric-rater',
    learningObjectives: ['Understand automated assessment', 'Ensure grading consistency'],
    relatedConcepts: ['automated-assessment', 'consistent-feedback', 'structured-evaluation'],
    persona: ['educator', 'assessment-specialist', 'grading-coordinator'],
    timeEstimate: 35
  },
  {
    id: 'rubric-rater-i1',
    question: 'How does the Rubric Rater provide actionable feedback for improvement?',
    text: 'How does the Rubric Rater provide actionable feedback for improvement?',
    options: [
      'By giving only letter grades',
      'Through criterion-specific feedback with improvement suggestions and examples of quality work',
      'By comparing to other students only',
      'By providing generic comments'
    ],
    correctAnswer: 1,
    explanation: 'The pattern provides detailed, criterion-specific feedback with concrete improvement suggestions and examples of quality work, helping learners understand exactly how to improve.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'rubric-rater',
    learningObjectives: ['Design actionable feedback', 'Create improvement pathways'],
    relatedConcepts: ['criterion-based-feedback', 'improvement-guidance', 'quality-examples'],
    persona: ['feedback-specialist', 'assessment-designer', 'educational-evaluator'],
    timeEstimate: 40
  },

  // Self-Remediation Loop Pattern
  {
    id: 'self-remediation-loop-b1',
    question: 'How does the Self-Remediation Loop pattern approach learning gaps?',
    text: 'How does the Self-Remediation Loop pattern approach learning gaps?',
    options: [
      'By ignoring gaps until later',
      'Through proactive identification and correction of learning gaps before they compound',
      'By moving slower through all content',
      'By requiring teacher intervention for all gaps'
    ],
    correctAnswer: 1,
    explanation: 'The pattern proactively identifies learning gaps and provides immediate, targeted remediation to prevent knowledge gaps from compounding and becoming larger problems.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'self-remediation-loop',
    learningObjectives: ['Identify learning gaps early', 'Implement proactive remediation'],
    relatedConcepts: ['gap-detection', 'proactive-intervention', 'learning-analytics'],
    persona: ['adaptive-learning-designer', 'educational-analyst', 'remediation-specialist'],
    timeEstimate: 30
  },
  {
    id: 'self-remediation-loop-i1',
    question: 'What diagnostic mechanisms does the Self-Remediation Loop use for gap detection?',
    text: 'What diagnostic mechanisms does the Self-Remediation Loop use for gap detection?',
    options: [
      'Only end-of-unit tests',
      'Continuous assessment, misconception detection, and pattern analysis of learning behaviors',
      'Student self-reporting only',
      'Random knowledge checks'
    ],
    correctAnswer: 1,
    explanation: 'The pattern uses continuous assessment data, misconception detection algorithms, and behavioral pattern analysis to identify gaps before they become significant problems.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'self-remediation-loop',
    learningObjectives: ['Implement continuous assessment', 'Design gap detection systems'],
    relatedConcepts: ['continuous-assessment', 'misconception-detection', 'behavioral-analytics'],
    persona: ['learning-analytics-specialist', 'assessment-technologist', 'adaptive-system-architect'],
    timeEstimate: 45
  },

  // Spaced Repetition Planner Pattern
  {
    id: 'spaced-repetition-planner-b1',
    question: 'What scientific principle does the Spaced Repetition Planner pattern leverage?',
    text: 'What scientific principle does the Spaced Repetition Planner pattern leverage?',
    options: [
      'Cramming effectiveness',
      'Memory consolidation through scientifically-optimized review scheduling',
      'Random practice timing',
      'Immediate repetition only'
    ],
    correctAnswer: 1,
    explanation: 'The pattern leverages scientific research on memory consolidation and the spacing effect to optimize when and how frequently learners review material for maximum retention.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'spaced-repetition-planner',
    learningObjectives: ['Understand spaced repetition science', 'Optimize memory retention'],
    relatedConcepts: ['memory-consolidation', 'spacing-effect', 'retention-optimization'],
    persona: ['cognitive-scientist', 'memory-researcher', 'learning-efficiency-expert'],
    timeEstimate: 35
  },
  {
    id: 'spaced-repetition-planner-i1',
    question: 'How does the Spaced Repetition Planner adapt intervals to individual performance?',
    text: 'How does the Spaced Repetition Planner adapt intervals to individual performance?',
    options: [
      'Using fixed intervals for everyone',
      'Dynamic adjustment based on recall success, difficulty ratings, and forgetting curve analysis',
      'Random timing adjustments',
      'Weekly intervals only'
    ],
    correctAnswer: 1,
    explanation: 'The pattern dynamically adjusts review intervals based on recall success rates, learner difficulty ratings, and individual forgetting curve analysis to optimize retention for each person.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'spaced-repetition-planner',
    learningObjectives: ['Implement adaptive scheduling', 'Analyze forgetting curves'],
    relatedConcepts: ['adaptive-intervals', 'forgetting-curves', 'personalized-scheduling'],
    persona: ['learning-algorithm-designer', 'memory-optimization-specialist', 'adaptive-system-engineer'],
    timeEstimate: 45
  },

  // Challenge Ladder Generator Pattern
  {
    id: 'challenge-ladder-generator-b1',
    question: 'How does the Challenge Ladder Generator maintain optimal learning challenge?',
    text: 'How does the Challenge Ladder Generator maintain optimal learning challenge?',
    options: [
      'By using the same difficulty for everyone',
      'Through progressive difficulty adaptation that keeps learners in their zone of proximal development',
      'By making everything as difficult as possible',
      'By avoiding challenging content'
    ],
    correctAnswer: 1,
    explanation: 'The pattern progressively adapts difficulty to keep learners optimally challenged within their zone of proximal development - challenging enough to promote growth without causing frustration.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'challenge-ladder-generator',
    learningObjectives: ['Understand optimal challenge zones', 'Implement progressive difficulty'],
    relatedConcepts: ['zone-of-proximal-development', 'progressive-difficulty', 'optimal-challenge'],
    persona: ['learning-designer', 'difficulty-calibration-expert', 'engagement-specialist'],
    timeEstimate: 35
  },
  {
    id: 'challenge-ladder-generator-i1',
    question: 'What algorithms does the Challenge Ladder Generator use for difficulty calibration?',
    text: 'What algorithms does the Challenge Ladder Generator use for difficulty calibration?',
    options: [
      'Random difficulty selection',
      'Performance analytics, success rate monitoring, and adaptive difficulty algorithms',
      'Teacher-only difficulty assignment',
      'Fixed progression sequences'
    ],
    correctAnswer: 1,
    explanation: 'The pattern uses performance analytics, success rate monitoring, and adaptive algorithms to continuously calibrate difficulty levels based on individual learner capabilities and progress.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'challenge-ladder-generator',
    learningObjectives: ['Design adaptive algorithms', 'Calibrate difficulty dynamically'],
    relatedConcepts: ['performance-analytics', 'adaptive-algorithms', 'difficulty-calibration'],
    persona: ['algorithm-designer', 'learning-analytics-engineer', 'adaptive-system-specialist'],
    timeEstimate: 45
  },

  // Reflection Journaler Pattern
  {
    id: 'reflection-journaler-b1',
    question: 'What metacognitive skills does the Reflection Journaler pattern develop?',
    text: 'What metacognitive skills does the Reflection Journaler pattern develop?',
    options: [
      'Only content knowledge',
      'Self-awareness of learning processes, strategy evaluation, and thinking about thinking',
      'Faster content completion',
      'Memorization techniques only'
    ],
    correctAnswer: 1,
    explanation: 'The pattern develops metacognitive skills including self-awareness of learning processes, strategy evaluation, reflection on thinking patterns, and conscious learning strategy development.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'reflection-journaler',
    learningObjectives: ['Develop metacognitive awareness', 'Foster reflective practices'],
    relatedConcepts: ['metacognition', 'self-awareness', 'reflective-practice'],
    persona: ['metacognition-researcher', 'reflective-practice-facilitator', 'self-regulation-expert'],
    timeEstimate: 30
  },
  {
    id: 'reflection-journaler-i1',
    question: 'How does the Reflection Journaler guide effective reflection processes?',
    text: 'How does the Reflection Journaler guide effective reflection processes?',
    options: [
      'Through free-form writing only',
      'Using structured prompts, reflection frameworks, and guided questions for deep analysis',
      'By providing reflection templates only',
      'Through peer comparison exclusively'
    ],
    correctAnswer: 1,
    explanation: 'The pattern uses structured reflection prompts, established frameworks for reflection, and carefully designed questions that guide learners through deep analysis of their learning processes.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'reflection-journaler',
    learningObjectives: ['Structure reflection processes', 'Guide deep learning analysis'],
    relatedConcepts: ['structured-reflection', 'reflection-frameworks', 'guided-analysis'],
    persona: ['reflection-coach', 'metacognitive-trainer', 'learning-process-analyst'],
    timeEstimate: 40
  },

  // Handoff Summarizer Pattern
  {
    id: 'handoff-summarizer-b1',
    question: 'What continuity problem does the Handoff Summarizer pattern solve?',
    text: 'What continuity problem does the Handoff Summarizer pattern solve?',
    options: [
      'Too much information transfer',
      'Knowledge loss and context gaps when learning responsibility transfers between agents or people',
      'Too fast information sharing',
      'Excessive communication overhead'
    ],
    correctAnswer: 1,
    explanation: 'The pattern addresses knowledge continuity problems that occur when learning responsibility transfers between different agents, teachers, or learning systems, preventing context loss.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'handoff-summarizer',
    learningObjectives: ['Ensure knowledge continuity', 'Manage learning transitions'],
    relatedConcepts: ['knowledge-transfer', 'context-preservation', 'learning-continuity'],
    persona: ['transition-coordinator', 'knowledge-manager', 'continuity-specialist'],
    timeEstimate: 35
  },
  {
    id: 'handoff-summarizer-i1',
    question: 'What comprehensive information does the Handoff Summarizer capture for transitions?',
    text: 'What comprehensive information does the Handoff Summarizer capture for transitions?',
    options: [
      'Only final grades and scores',
      'Learning progress, misconceptions, successful strategies, and contextual understanding',
      'Basic demographic information only',
      'Course completion status only'
    ],
    correctAnswer: 1,
    explanation: 'The pattern captures comprehensive transition information including learning progress, identified misconceptions, successful teaching strategies, and deep contextual understanding of the learner.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'handoff-summarizer',
    learningObjectives: ['Capture comprehensive context', 'Design effective transitions'],
    relatedConcepts: ['comprehensive-profiling', 'context-capture', 'transition-design'],
    persona: ['transition-designer', 'context-analyst', 'knowledge-continuity-expert'],
    timeEstimate: 40
  },

  // Misconception Detector Pattern
  {
    id: 'misconception-detector-b1',
    question: 'How does the Misconception Detector pattern approach error prevention?',
    text: 'How does the Misconception Detector pattern approach error prevention?',
    options: [
      'By avoiding difficult topics',
      'Through proactive identification and correction of misconceptions before they lead to learning errors',
      'By providing more practice problems',
      'By slowing down all instruction'
    ],
    correctAnswer: 1,
    explanation: 'The pattern proactively identifies and addresses misconceptions before they become entrenched, preventing learning errors and building correct understanding from the foundation.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'misconception-detector',
    learningObjectives: ['Prevent learning errors', 'Identify misconceptions early'],
    relatedConcepts: ['error-prevention', 'misconception-identification', 'proactive-intervention'],
    persona: ['learning-error-specialist', 'cognitive-misconception-researcher', 'preventive-education-designer'],
    timeEstimate: 30
  },
  {
    id: 'misconception-detector-i1',
    question: 'What detection methods does the Misconception Detector use to identify faulty mental models?',
    text: 'What detection methods does the Misconception Detector use to identify faulty mental models?',
    options: [
      'Only multiple choice tests',
      'Pattern analysis, diagnostic questioning, and conceptual mapping to reveal underlying understanding',
      'Behavioral observation only',
      'Self-reporting exclusively'
    ],
    correctAnswer: 1,
    explanation: 'The pattern uses sophisticated pattern analysis, targeted diagnostic questioning, and conceptual mapping techniques to reveal underlying mental models and identify misconceptions.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'misconception-detector',
    learningObjectives: ['Implement diagnostic techniques', 'Map mental models'],
    relatedConcepts: ['diagnostic-questioning', 'mental-model-mapping', 'pattern-analysis'],
    persona: ['diagnostic-assessment-expert', 'cognitive-model-analyst', 'misconception-researcher'],
    timeEstimate: 45
  },

  // Timebox Pair Programmer Pattern
  {
    id: 'timebox-pair-programmer-b1',
    question: 'What collaborative learning approach does the Timebox Pair Programmer pattern implement?',
    text: 'What collaborative learning approach does the Timebox Pair Programmer pattern implement?',
    options: [
      'Individual coding practice only',
      'Structured pair programming with defined roles, time management, and collaborative problem-solving',
      'Group coding competitions',
      'Code review sessions only'
    ],
    correctAnswer: 1,
    explanation: 'The pattern implements structured pair programming with clearly defined roles (driver/navigator), time management through timeboxing, and collaborative problem-solving approaches.',
    difficulty: 'beginner',
    category: 'agent-patterns',
    subCategory: 'timebox-pair-programmer',
    learningObjectives: ['Understand pair programming benefits', 'Structure collaborative coding'],
    relatedConcepts: ['pair-programming', 'collaborative-learning', 'time-management'],
    persona: ['programming-instructor', 'collaborative-learning-facilitator', 'coding-mentor'],
    timeEstimate: 35
  },
  {
    id: 'timebox-pair-programmer-i1',
    question: 'How does the Timebox Pair Programmer ensure balanced participation and learning?',
    text: 'How does the Timebox Pair Programmer ensure balanced participation and learning?',
    options: [
      'By letting stronger programmers dominate',
      'Through role rotation, active facilitation, and structured reflection on collaboration processes',
      'By working on separate parts independently',
      'By avoiding any structure or guidance'
    ],
    correctAnswer: 1,
    explanation: 'The pattern ensures balanced participation through systematic role rotation, active facilitation of collaboration, and structured reflection on the collaborative learning process.',
    difficulty: 'intermediate',
    category: 'agent-patterns',
    subCategory: 'timebox-pair-programmer',
    learningObjectives: ['Facilitate balanced collaboration', 'Structure learning partnerships'],
    relatedConcepts: ['role-rotation', 'collaboration-facilitation', 'balanced-participation'],
    persona: ['collaboration-facilitator', 'pair-programming-coach', 'team-learning-specialist'],
    timeEstimate: 40
  }
];

// Calculate total time for educational agent patterns
export const educationalAgentPatternsTime = educationalAgentPatternsQuestions.reduce(
  (total, question) => total + question.timeEstimate, 0
);
