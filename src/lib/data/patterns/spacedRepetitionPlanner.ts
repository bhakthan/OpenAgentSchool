import { PatternData } from './types';
import { LearningVisualization } from '@/components/visualization/LearningVisualization';
import AlgorithmVisualizer from '@/components/visualization/AlgorithmVisualizer';

export const spacedRepetitionPlannerPattern: PatternData = {
  id: 'spaced-repetition-planner',
  name: 'Spaced Repetition Planner',
  description: 'Schedules reviews using SM-2 style intervals and generates targeted prompts/questions.',
  category: 'Education',
  useCases: ['Flashcards', 'Concept mastery', 'Quiz scheduling'],
  whenToUse: 'Use to reinforce recall over time and track forgetting curves.',
  nodes: [
    { id: 'items', type: 'input', data: { label: 'Cards/Concepts', nodeType: 'input' }, position: { x: 40, y: 120 } },
    { id: 'scheduler', type: 'default', data: { label: 'Scheduler (SM-2)', nodeType: 'tool' }, position: { x: 320, y: 100 } },
    { id: 'prompter', type: 'default', data: { label: 'Question Generator', nodeType: 'llm' }, position: { x: 620, y: 100 } },
    { id: 'plan', type: 'output', data: { label: 'Daily Plan + Prompts', nodeType: 'output' }, position: { x: 920, y: 100 } },
  ],
  edges: [
    { id: 'e1', source: 'items', target: 'scheduler', animated: true },
    { id: 'e2', source: 'scheduler', target: 'prompter', animated: true },
    { id: 'e3', source: 'prompter', target: 'plan', animated: true },
  ],
  implementation: [
    'Track easiness factor, interval, and repetitions per item (SM-2)',
    'Select due items for the day',
    'Generate targeted prompts that vary difficulty/forms',
  ],
  advantages: ['Long-term retention', 'Adaptive difficulty'],
  limitations: ['Requires daily consistency'],
  relatedPatterns: ['Knowledge Map Navigator'],

  velocityProfile: {
    impact: 'medium',
    timeToImplement: '6-10 hours',
    complexityReduction: 'Medium - Implements proven SM-2 algorithm but requires careful scheduling and prompt generation logic',
    reusabilityScore: 8,
    learningCurve: 'moderate',
    velocityPractices: [
      'Pattern Fluency - Learning retention pattern for language apps, certification prep, onboarding programs, skill maintenance',
      'Architecture Templates - Azure Functions + Azure Cosmos DB provide scheduling and state tracking',
      'Evaluation Automation - Retention rate, engagement consistency, difficulty calibration metrics'
    ]
  },

  businessUseCase: {
    industry: 'EdTech',
    description: 'Language learning apps integrate Spaced Repetition Planner to schedule adaptive reviews and generate varied prompts, improving long‑term retention and daily engagement.',
    visualization: AlgorithmVisualizer,
    enlightenMePrompt: `Design an SRS microservice with SM-2 and prompt generation.

Include:
- Card schema with EF, interval, repetitions
- Daily due selection and difficulty mixing
- Prompt variety (cloze, translation, multiple-choice)
- Metrics: retention, review streaks, ease drift`
  },
  codeExample: `// Minimal SM-2 (TypeScript)
type Card = { ef: number; interval: number; reps: number };
export function sm2(card: Card, quality: 0|1|2|3|4|5): Card {
  const ef = Math.max(1.3, card.ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
  const reps = quality < 3 ? 0 : card.reps + 1;
  const interval = reps === 0 ? 1 : reps === 1 ? 1 : Math.round(card.interval * ef);
  return { ef, interval, reps };
}
`,
  pythonCodeExample: `# Minimal SM-2 (Python)
def sm2(card: dict, quality: int) -> dict:
    ef = max(1.3, card['ef'] + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)))
    reps = 0 if quality < 3 else card['reps'] + 1
    interval = 1 if reps in (0,1) else round(card['interval'] * ef)
    return { 'ef': ef, 'interval': interval, 'reps': reps }
`,
};
