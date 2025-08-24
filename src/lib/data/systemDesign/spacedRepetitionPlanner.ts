import { SystemDesignPattern } from './types';

export const spacedRepetitionPlannerSystemDesign: SystemDesignPattern = {
  id: 'spaced-repetition-planner',
  name: 'Spaced Repetition Planner System Design',
  overview: 'Schedules adaptive reviews using SM‑2 style intervals and generates varied prompts.',
  problemStatement: 'Learners forget without structured review; manual scheduling doesn’t adapt.',
  solution: 'Maintain EF/interval/reps per item; select due items daily; generate diverse prompts.',
  steps: [
    { id: 'model', title: 'Memory Model', category: 'architecture', description: 'Track EF, interval, reps per card.', details: 'Persist per user/item.', considerations: ['EF drift'], bestPractices: ['Clamp EF ≥ 1.3'] },
    { id: 'schedule', title: 'Daily Scheduler', category: 'tools', description: 'Select due set with difficulty mix.', details: 'Balance new/review; cap load.', considerations: ['Overload'], bestPractices: ['Streak-friendly caps'] },
    { id: 'prompts', title: 'Prompt Generator', category: 'prompt', description: 'Produce varied quizzes (cloze/MCQ/translate).', details: 'Rotate formats; add examples.', considerations: ['Monotony'], bestPractices: ['Spiral difficulty'] }
  ],
  architecture: {
    components: [
      { name: 'Card Store', type: 'storage', description: 'Holds EF/interval/reps' },
      { name: 'Scheduler', type: 'processing', description: 'Selects due cards' },
      { name: 'Prompt LLM', type: 'processing', description: 'Generates varied prompts' },
      { name: 'Study UI', type: 'output', description: 'Delivers daily plan' }
    ],
    flows: [
      { from: 'Card Store', to: 'Scheduler', description: 'Fetch items and stats' },
      { from: 'Scheduler', to: 'Prompt LLM', description: 'Request prompts per item' },
      { from: 'Prompt LLM', to: 'Study UI', description: 'Deliver plan and prompts' }
    ]
  }
};
