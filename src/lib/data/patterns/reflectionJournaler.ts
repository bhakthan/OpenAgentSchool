import { PatternData } from './types';
import { LearningVisualization } from '@/components/visualization/LearningVisualization';

export const reflectionJournalerPattern: PatternData = {
  id: 'reflection-journaler',
  name: 'Reflection Journaler',
  description: 'Guides learners to reflect on what they learned, confusion, and next steps with prompts.',
  category: 'Education',
  useCases: ['Exit tickets', 'Weekly reflections', 'Metacognition'],
  whenToUse: 'Use after learning sessions to consolidate knowledge and plan next actions.',
  nodes: [
    { id: 'session', type: 'input', data: { label: 'Session Notes', nodeType: 'input' }, position: { x: 40, y: 120 } },
    { id: 'coach', type: 'default', data: { label: 'Reflection Coach', nodeType: 'llm' }, position: { x: 320, y: 100 } },
    { id: 'journal', type: 'output', data: { label: 'Structured Journal', nodeType: 'output' }, position: { x: 620, y: 100 } },
  ],
  edges: [
    { id: 'e1', source: 'session', target: 'coach', animated: true },
    { id: 'e2', source: 'coach', target: 'journal', animated: true },
  ],
  implementation: [
    'Prompt with What/Why/How/Next prompts',
    'Extract misconceptions and todo list',
    'Summarize sentiment and confidence',
  ],
  advantages: ['Metacognitive gains', 'Better retention'],
  limitations: ['Quality depends on notes'],
  relatedPatterns: ['Misconception Detector'],

  velocityProfile: {
    impact: 'medium',
    timeToImplement: '2-4 hours',
    complexityReduction: 'Low - Reduces manual journaling workflow but requires careful prompt engineering for metacognitive insights',
    reusabilityScore: 8,
    learningCurve: 'gentle',
    velocityPractices: [
      'Pattern Fluency - Reflection pattern for educational platforms, employee training, professional development, therapy apps',
      'Architecture Templates - Azure OpenAI + prompt chaining for What/Why/How/Next structured reflection',
      'Evaluation Automation - Sentiment analysis accuracy, misconception detection rate, student engagement metrics'
    ]
  },

  businessUseCase: {
    industry: 'EdTech',
    description: 'K‑12 LMS adds Reflection Journaler as a weekly check-in to capture highlights, confusions, and next steps, improving metacognition and guiding teacher interventions.',
    visualization: LearningVisualization,
    enlightenMePrompt: `Specify a journaling feature for an LMS.

Include:
- Prompt templates (What/Why/How/Next)
- Sentiment/confidence tagging and misconception flags
- Teacher dashboards surfacing at-risk students
- Privacy and student data protections`
  },
  codeExample: `// Journal schema (TypeScript)
export type Journal = { highlights: string[]; confusions: string[]; next: string[] };
export function reflect(notes: string): Journal {
  return { highlights: ['Key concept'], confusions: ['X vs Y'], next: ['Try example'] };
}
`,
  pythonCodeExample: `# Journal schema (Python)
def reflect(notes: str):
    return { 'highlights': ['Key concept'], 'confusions': ['X vs Y'], 'next': ['Try example'] }
`,
};
