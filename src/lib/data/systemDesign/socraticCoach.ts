import { SystemDesignPattern } from './types';

export const socraticCoachSystemDesign: SystemDesignPattern = {
  id: 'socratic-coach',
  name: 'Socratic Coach System Design',
  overview: 'Guides learners with targeted questions instead of direct answers to build durable understanding and metacognition.',
  problemStatement: 'Learners often seek answers rather than understanding. How do we nudge them via questions that surface gaps without revealing solutions?',
  solution: 'Capture learner goals and attempts, generate 1–3 guiding questions per turn, iterate on reflections, and stop when the learner indicates readiness.',
  steps: [
    {
      id: 'intake',
      title: 'Learner Intake & Goal Framing',
      category: 'context',
      description: 'Collect learner goal, current attempt, and constraints (time, prior knowledge).',
      details: 'Normalize inputs; detect hints of misconceptions to seed tailored questioning later.',
      considerations: ['Minimize cognitive overload', 'Respect time constraints', 'Preserve learner voice'],
      bestPractices: ['Ask for the learner’s own words', 'Capture minimal context first', 'Delay content dumps'],
      patterns: ['self-reflection'],
      connections: []
    },
    {
      id: 'questioning',
      title: 'Socratic Question Generation',
      category: 'prompt',
      description: 'Generate 1–3 concise questions targeting conceptual gaps—no spoilers.',
      details: 'Favor probing invariants, assumptions, constraints, and restatements of the goal.',
      considerations: ['Avoid answer leakage', 'Tone calibration', 'Cultural sensitivity'],
      bestPractices: ['Prefer open questions', 'Target one concept at a time', 'Offer tiny optional hints'],
      examples: ['Which assumption might be false?', 'What invariant would make this work?']
    },
    {
      id: 'reflection-loop',
      title: 'Reflection & Iteration',
      category: 'evaluation',
      description: 'Read the learner’s reflection, detect progress, and iterate or stop.',
      details: 'If misunderstanding persists, pivot the question framing or level of abstraction.',
      considerations: ['Stop criteria', 'Frustration detection', 'Timeboxing'],
      bestPractices: ['Echo learner phrasing', 'Celebrate small wins', 'Escalate only as needed']
    }
  ],
  architecture: {
    components: [
      { name: 'Intake Form', type: 'input', description: 'Collects learner goal and attempt' },
      { name: 'Coach LLM', type: 'processing', description: 'Generates Socratic questions' },
      { name: 'Reflection Capture', type: 'input', description: 'Captures learner responses' },
      { name: 'Guidance Output', type: 'output', description: 'Delivers next-step guidance' }
    ],
    flows: [
      { from: 'Intake Form', to: 'Coach LLM', description: 'Provide normalized context' },
      { from: 'Coach LLM', to: 'Guidance Output', description: 'Deliver 1–3 questions' },
      { from: 'Guidance Output', to: 'Reflection Capture', description: 'Learner answers and reflects' },
      { from: 'Reflection Capture', to: 'Coach LLM', description: 'Iterate with new context' }
    ]
  }
};
