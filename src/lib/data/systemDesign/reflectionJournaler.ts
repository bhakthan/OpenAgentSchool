import { SystemDesignPattern } from './types';

export const reflectionJournalerSystemDesign: SystemDesignPattern = {
  id: 'reflection-journaler',
  name: 'Reflection Journaler System Design',
  overview: 'Guides learners to reflect, extract insights, and create actionable next steps.',
  problemStatement: 'Reflection is skipped or shallow; learners don’t convert insights into action.',
  solution: 'Prompt structured reflection, summarize insights, and produce next-step commitments.',
  steps: [
    { id: 'prompt', title: 'Structured Prompts', category: 'prompt', description: 'Ask what worked, what didn’t, and why.', details: 'Short, specific questions.', considerations: ['Essay fatigue'], bestPractices: ['Timebox to 3–5 min'] },
    { id: 'synthesis', title: 'Synthesize Insights', category: 'knowledge', description: 'Extract themes and learnings.', details: 'Tag and summarize.', considerations: ['Overfit'], bestPractices: ['Use examples'] },
    { id: 'action', title: 'Actionable Next Steps', category: 'instruction', description: 'Produce 1–2 specific next actions.', details: 'Attach context and due date.', considerations: ['Too generic'], bestPractices: ['SMART tasks'] }
  ],
  architecture: {
    components: [
      { name: 'Journal UI', type: 'input', description: 'Captures responses' },
      { name: 'Summarizer LLM', type: 'processing', description: 'Builds insights' },
      { name: 'Planner', type: 'processing', description: 'Creates next steps' },
      { name: 'Reflection Store', type: 'storage', description: 'Saves entries and actions' }
    ],
    flows: [
      { from: 'Journal UI', to: 'Summarizer LLM', description: 'Provide responses' },
      { from: 'Summarizer LLM', to: 'Planner', description: 'Produce action candidates' },
      { from: 'Planner', to: 'Reflection Store', description: 'Persist insights and actions' }
    ]
  }
};
