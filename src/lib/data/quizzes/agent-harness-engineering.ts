import { QuizQuestion } from './types';

export const agentHarnessEngineeringQuestions: QuizQuestion[] = [
  {
    id: 'agent-harness-b1',
    text: 'Why does Agent Harness Engineering reject the simple framing Agent = Model + Harness as a complete definition?',
    question: 'Why does Agent Harness Engineering reject the simple framing Agent = Model + Harness as a complete definition?',
    options: [
      'Because modern frontier models no longer need any harness at all',
      'Because the framing hides situatedness, stakes, and sovereignty that determine whether intelligence can act safely in the real world',
      'Because harnesses only matter for robotics and not software agents',
      'Because protocol standards like MCP make harness design obsolete'
    ],
    correctAnswer: 1,
    difficulty: 'beginner',
    category: 'agent-harness-engineering',
    subCategory: 'harness-fundamentals',
    explanation: 'The critique is not that harnesses do not matter. It is that a generic wrapper framing hides the deeper real-world requirements of situatedness, stakes, and sovereignty.',
    relatedConcepts: ['agent-harness-engineering', 'agent-architecture', 'context-engineering'],
    timeEstimate: 30,
    persona: ['agent-architect', 'ai-engineer', 'developer'],
    learningObjectives: ['Understand the core reframe behind Agent Harness Engineering']
  },
  {
    id: 'agent-harness-b2',
    text: 'In the proposed equation Agent = Intelligence × (Situatedness + Stakes + Sovereignty), what is the key implication of the multiplication sign?',
    question: 'In the proposed equation Agent = Intelligence × (Situatedness + Stakes + Sovereignty), what is the key implication of the multiplication sign?',
    options: [
      'Intelligence can compensate for zero situatedness if the model is large enough',
      'Stakes and sovereignty are optional enhancements, not core ingredients',
      'Low or missing situatedness can collapse agent value even when model intelligence is high',
      'The equation is only relevant for agents with long-term memory'
    ],
    correctAnswer: 2,
    difficulty: 'beginner',
    category: 'agent-harness-engineering',
    subCategory: 'harness-fundamentals',
    explanation: 'The multiplicative framing means raw reasoning capability is not enough. If the agent is poorly situated in the real environment, high intelligence still produces poor or unsafe outcomes.',
    relatedConcepts: ['agent-harness-engineering', 'agent-memory-systems'],
    timeEstimate: 30,
    persona: ['agent-architect', 'ai-engineer'],
    learningObjectives: ['Explain why the reframe is multiplicative rather than additive']
  },
  {
    id: 'agent-harness-i1',
    text: 'Which pairing best reflects the redefined lifelines proposed by Agent Harness Engineering?',
    question: 'Which pairing best reflects the redefined lifelines proposed by Agent Harness Engineering?',
    options: [
      'Prompt, Retrieval, Tools, Planner, Evaluator',
      'State, Affect, Ground, Govern, Situate',
      'Memory, Shell, Test, Retry, Cache',
      'Observe, Plan, Act, Verify, Deploy'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    category: 'agent-harness-engineering',
    subCategory: 'redefined-lifelines',
    explanation: 'The framework replaces software-centric assumptions with five domain-shaped lifelines: State, Affect, Ground, Govern, and Situate.',
    relatedConcepts: ['agent-harness-engineering', 'human-in-the-loop-patterns'],
    timeEstimate: 35,
    persona: ['agent-architect', 'developer'],
    learningObjectives: ['Identify the five redefined harness lifelines']
  },
  {
    id: 'agent-harness-i2',
    text: 'What is the "filesystem fallacy" in the context of harness engineering?',
    question: 'What is the "filesystem fallacy" in the context of harness engineering?',
    options: [
      'Assuming all agents need direct disk access for reliability',
      'Assuming persistence is equivalent to file storage instead of domain-appropriate continuity-of-self and world state',
      'Assuming vector databases are faster than files for retrieval',
      'Assuming user uploads should always be stored on local disk'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    category: 'agent-harness-engineering',
    subCategory: 'critique-of-defaults',
    explanation: 'The critique is that persistence in real domains often means relational continuity, trust state, and world state, not simply saving text files or diffs.',
    relatedConcepts: ['agent-harness-engineering', 'agent-memory-systems', 'context-engineering'],
    timeEstimate: 40,
    persona: ['agent-architect', 'ai-engineer'],
    learningObjectives: ['Recognize why storage primitives are not enough to define state']
  },
  {
    id: 'agent-harness-a1',
    text: 'Why is stopping theory central to the Govern lifeline?',
    question: 'Why is stopping theory central to the Govern lifeline?',
    options: [
      'Because the best agents always keep trying until they succeed',
      'Because halting, escalating, or deferring can be the correct behavior when further autonomous action increases risk',
      'Because stopping theory only matters in benchmark evaluation suites',
      'Because it reduces token costs more than any other optimization'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    category: 'agent-harness-engineering',
    subCategory: 'governance-and-frontier',
    explanation: 'In high-stakes domains, continuing to act is not always progress. Govern requires explicit authority boundaries, escalation paths, and principled stop conditions.',
    relatedConcepts: ['agent-harness-engineering', 'human-in-the-loop-patterns', 'agent-evaluation'],
    timeEstimate: 45,
    persona: ['agent-architect', 'security-engineer', 'product-manager'],
    learningObjectives: ['Explain why governance includes principled stopping, not just permissions']
  },
  {
    id: 'agent-harness-a2',
    text: 'Which future harness direction best matches an agent that encounters a novel SCADA environment, writes a custom interface layer, compiles it, and then continues operating?',
    question: 'Which future harness direction best matches an agent that encounters a novel SCADA environment, writes a custom interface layer, compiles it, and then continues operating?',
    options: [
      'Swarm-native shared memory',
      'Agent hypervisor',
      'Metamorphic harness',
      'Prompt injection defense'
    ],
    correctAnswer: 2,
    difficulty: 'advanced',
    category: 'agent-harness-engineering',
    subCategory: 'governance-and-frontier',
    explanation: 'A metamorphic harness can alter or extend its own operational substrate by generating and integrating new tool layers around novel problems.',
    relatedConcepts: ['agent-harness-engineering', 'agent-skills', 'client-coding-agents'],
    timeEstimate: 45,
    persona: ['agent-architect', 'developer', 'security-engineer'],
    learningObjectives: ['Distinguish future harness directions such as hypervisors, shared memory, and metamorphic systems']
  }
];

export const agentHarnessEngineeringTime = agentHarnessEngineeringQuestions.reduce(
  (total, question) => total + (question.timeEstimate || 40),
  0
);