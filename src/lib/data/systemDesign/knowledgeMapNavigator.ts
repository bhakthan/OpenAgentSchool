import { SystemDesignPattern } from './types';

export const knowledgeMapNavigatorSystemDesign: SystemDesignPattern = {
  id: 'knowledge-map-navigator',
  name: 'Knowledge Map Navigator System Design',
  overview: 'Builds personalized prerequisite maps, sequences, and checkpoints for learning paths.',
  problemStatement: 'Learners waste time on detours. How do we generate a clear path with remediation and checkpoints?',
  solution: 'Collect goals and current skills; produce prerequisite graph, sequence, and assessment checkpoints.',
  steps: [
    { id: 'inventory', title: 'Skill Inventory', category: 'context', description: 'Capture current skills and target depth.', details: 'Detect gaps and prior knowledge.', considerations: ['Self‑report bias'], bestPractices: ['Quick diagnostic'] },
    { id: 'map', title: 'Map Generation', category: 'prompt', description: 'Generate nodes (topics) and edges (prereqs).', details: 'Branch for remediation as needed.', considerations: ['Over‑branching'], bestPractices: ['Keep main path short'] },
    { id: 'checkpoints', title: 'Checkpoint Design', category: 'evaluation', description: 'Create quizzes/projects as gates.', details: 'Tie evidence to outcomes.', considerations: ['Assessment validity'], bestPractices: ['Show examples'] }
  ],
  architecture: {
    components: [
      { name: 'Goal Intake', type: 'input', description: 'Collects user goals and profile' },
      { name: 'Map Builder LLM', type: 'processing', description: 'Generates prerequisite graph and sequence' },
      { name: 'Checkpoint Bank', type: 'storage', description: 'Stores assessment items' },
      { name: 'Plan Output', type: 'output', description: 'Personalized learning plan' }
    ],
    flows: [
      { from: 'Goal Intake', to: 'Map Builder LLM', description: 'Provide profile and constraints' },
      { from: 'Map Builder LLM', to: 'Checkpoint Bank', description: 'Link checkpoints with topics' },
      { from: 'Map Builder LLM', to: 'Plan Output', description: 'Export plan for the learner' }
    ]
  }
};
