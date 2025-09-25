import { PatternData } from './types';
import { TimeboxPairProgrammerVisual } from '@/components/visualization/business-use-cases/TimeboxPairProgrammerVisual';

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
  businessUseCase: {
    industry: 'Engineering Productivity',
    description: 'Internal developer experience teams embed Time-box Pair Programmer into IDE co-pilots so engineers run focused 20-minute cycles, capture blockers, and ship incremental value without losing context.',
    visualization: TimeboxPairProgrammerVisual,
    enlightenMePrompt: `Design a time-boxed pair-programming coach for internal dev teams.

Include:
- Micro-goal intake, timer orchestration, and reminder nudges
- Diff review rubric + retro capture
- Integrations with issue tracker and velocity metrics
- Guardrails to prevent over-scheduling or burnout`
  },
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
