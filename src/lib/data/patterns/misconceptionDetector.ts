import { PatternData } from './types';
import { MisconceptionDetectorVisual } from '@/components/visualization/business-use-cases/MisconceptionDetectorVisual';

export const misconceptionDetectorPattern: PatternData = {
  id: 'misconception-detector',
  name: 'Misconception Detector',
  description: 'Identifies likely misconceptions from answers or code and proposes corrective micro-lessons.',
  category: 'Education',
  useCases: ['Quiz analysis', 'Code review', 'Tutor feedback'],
  whenToUse: 'Use to catch systematic errors early and personalize remediation.',
  nodes: [
    { id: 'artifact', type: 'input', data: { label: 'Answer/Code', nodeType: 'input' }, position: { x: 40, y: 120 } },
    { id: 'detector', type: 'default', data: { label: 'Pattern Detector', nodeType: 'llm' }, position: { x: 320, y: 100 } },
    { id: 'remedy', type: 'output', data: { label: 'Misconception + Fix', nodeType: 'output' }, position: { x: 620, y: 100 } },
  ],
  edges: [
    { id: 'e1', source: 'artifact', target: 'detector', animated: true },
    { id: 'e2', source: 'detector', target: 'remedy', animated: true },
  ],
  implementation: [
    'Map errors to known misconception taxonomy',
    'Generate 5-minute corrective micro-lesson with checks',
    'Optionally schedule follow-up via spaced repetition',
  ],
  advantages: ['Targeted remediation', 'Faster progress'],
  limitations: ['False positives possible'],
  relatedPatterns: ['Rubric Rater', 'Spaced Repetition Planner'],
  businessUseCase: {
    industry: 'EdTech',
    description: 'Assessment platforms run Misconception Detector after quizzes to catch systematic misunderstandings and instantly push micro-lessons plus spaced review cards to learners and instructors.',
    visualization: MisconceptionDetectorVisual,
    enlightenMePrompt: `Plan a misconception detection service for quiz pipelines.

Cover:
- Mapping responses to misconception taxonomy and confidence
- Generating corrective micro-lessons + formative checks
- Integrations with LMS gradebook & spaced repetition queues
- Precision/recall monitoring and human override tools`
  },
  codeExample: `// Detect misconception (TypeScript)
export function detect(text: string) {
  return [{ label: 'Confusing precision vs recall', fix: 'Work through example confusion matrix.' }];
}
`,
  pythonCodeExample: `# Detect misconception (Python)
def detect(text: str):
    return [{ 'label': 'Confusing precision vs recall', 'fix': 'Work through example confusion matrix.' }]
`,

  velocityProfile: {
    impact: 'medium',
    timeToImplement: '4-8 hours',
    complexityReduction: 'High - GPT-4 reasoning with few-shot examples eliminates manual misconception taxonomy creation',
    reusabilityScore: 7,
    learningCurve: 'moderate',
    velocityPractices: [
      'Pattern Fluency - Educational pattern for tutoring systems, formative assessment, adaptive learning platforms',
      'Architecture Templates - OpenAI structured outputs provide typed misconception detection responses',
      'Evaluation Automation - Detection precision/recall and corrective lesson effectiveness metrics standard',
      'Failure Scenario Libraries - False positives, overgeneralization, cultural bias in misconception labeling documented'
    ]
  }
};
