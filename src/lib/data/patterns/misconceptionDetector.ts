import { PatternData } from './types';

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
  codeExample: `// Detect misconception (TypeScript)
export function detect(text: string) {
  return [{ label: 'Confusing precision vs recall', fix: 'Work through example confusion matrix.' }];
}
`,
  pythonCodeExample: `# Detect misconception (Python)
def detect(text: str):
    return [{ 'label': 'Confusing precision vs recall', 'fix': 'Work through example confusion matrix.' }]
`,
};
