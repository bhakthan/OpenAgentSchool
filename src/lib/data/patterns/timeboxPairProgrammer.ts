import { PatternData } from './types';

export const timeboxPairProgrammerPattern: PatternData = {
  id: 'timebox-pair-programmer',
  name: 'Time‑box Pair Programmer',
  description: 'Pairs with the learner in short time-boxed cycles: plan → code → review → next.',
  category: 'Education',
  useCases: ['Focused work sprints', 'Pomodoro-style sessions'],
  whenToUse: 'Use to maintain momentum and get quick feedback loops.',
  nodes: [
    { id: 'goal', type: 'input', data: { label: 'Micro-goal (15–25m)', nodeType: 'input' }, position: { x: 40, y: 120 } },
    { id: 'coach', type: 'default', data: { label: 'Pair Coach', nodeType: 'llm' }, position: { x: 320, y: 100 } },
    { id: 'review', type: 'output', data: { label: 'Review + Next', nodeType: 'output' }, position: { x: 620, y: 100 } },
  ],
  edges: [
    { id: 'e1', source: 'goal', target: 'coach', animated: true },
    { id: 'e2', source: 'coach', target: 'review', animated: true },
  ],
  implementation: [
    'Clarify micro-goal and success criteria',
    'Start timer and focus on single task',
    'Review code diff and decide next micro-goal',
  ],
  advantages: ['Reduces procrastination', 'Frequent feedback'],
  limitations: ['May feel rigid if overused'],
  relatedPatterns: ['Self‑Remediation Loop', 'Reflection Journaler'],
  codeExample: `// Cycle helper (TypeScript)
export function nextCycle(goal: string) {
  return { plan: ['Write test'], durationMin: 20, reviewChecklist: ['Run tests', 'Commit diff'] };
}
`,
  pythonCodeExample: `# Cycle helper (Python)
def next_cycle(goal: str):
    return { 'plan': ['Write test'], 'durationMin': 20, 'reviewChecklist': ['Run tests', 'Commit diff'] }
`,
};
