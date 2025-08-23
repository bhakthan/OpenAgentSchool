import { SystemDesignPattern } from './types';

export const conceptToProjectSystemDesign: SystemDesignPattern = {
  id: 'concept-to-project',
  name: 'Concept‑to‑Project Builder System Design',
  overview: 'Transforms a learning concept into a scoped, timeboxed project with milestones and a rubric.',
  problemStatement: 'Learners struggle to turn theory into practice. How do we produce scoped, assessable projects fast?',
  solution: 'Collect concept, level, and timebox; produce milestones, rubric, acceptance criteria, and demo checkpoints.',
  steps: [
    { id: 'collect', title: 'Collect Inputs', category: 'context', description: 'Capture concept, level, and timebox.', details: 'Normalize inputs and detect constraints.', considerations: ['Over/under-scoping'], bestPractices: ['Limit scope', 'Define acceptance criteria'] },
    { id: 'plan', title: 'Plan Milestones', category: 'prompt', description: 'Draft 2–4 milestones with clear outcomes.', details: 'Tie milestones to learning objectives.', considerations: ['Progressive complexity'], bestPractices: ['Small steps', 'Demo moments'] },
    { id: 'assess', title: 'Define Rubric', category: 'evaluation', description: 'Create rubric dimensions and levels.', details: 'Align with outcomes and evidence.', considerations: ['Clarity'], bestPractices: ['Observable criteria'] }
  ],
  architecture: {
    components: [
      { name: 'Intake', type: 'input', description: 'Collects concept and constraints' },
      { name: 'Planner LLM', type: 'processing', description: 'Generates milestones and rubric' },
      { name: 'Brief Output', type: 'output', description: 'One‑pager with plan' }
    ],
    flows: [
      { from: 'Intake', to: 'Planner LLM', description: 'Provide normalized inputs' },
      { from: 'Planner LLM', to: 'Brief Output', description: 'Return milestones and rubric' }
    ]
  }
};
