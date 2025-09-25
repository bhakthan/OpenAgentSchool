import { PatternData } from './types';
import { ChallengeLadderVisual } from '@/components/visualization/business-use-cases/ChallengeLadderVisual';

export const challengeLadderGeneratorPattern: PatternData = {
  id: 'challenge-ladder-generator',
  name: 'Challenge Ladder Generator',
  description: 'Creates a staircase of challenges from beginner to mastery with prerequisites mapped.',
  category: 'Education',
  useCases: ['Course scaffolding', 'Skill drills', 'Onboarding tracks'],
  whenToUse: 'Use to structure progressive challenges that build on each other.',
  nodes: [
    { id: 'goal', type: 'input', data: { label: 'Learning Goal', nodeType: 'input' }, position: { x: 40, y: 120 } },
    { id: 'ladder', type: 'default', data: { label: 'Ladder Synthesizer', nodeType: 'llm' }, position: { x: 320, y: 100 } },
    { id: 'graph', type: 'output', data: { label: 'Levels + Prereqs Graph', nodeType: 'output' }, position: { x: 620, y: 100 } },
  ],
  edges: [
    { id: 'e1', source: 'goal', target: 'ladder', animated: true },
    { id: 'e2', source: 'ladder', target: 'graph', animated: true },
  ],
  implementation: [
    'Decompose goal into skills and dependencies',
    'Generate 5–7 levels with 2–3 tasks each',
    'Include benchmark/rubric and resources per task',
  ],
  advantages: ['Clear progression', 'Motivating milestones'],
  limitations: ['Needs domain vetting'],
  relatedPatterns: ['Rubric Rater', 'Spaced Repetition Planner'],
  businessUseCase: {
    industry: 'Workforce Upskilling',
    description: 'An enterprise academy turns role competencies into progression ladders. Learners unlock each tier after submitting evidence; managers see prerequisites, rubrics, and suggested practice projects.',
    visualization: ChallengeLadderVisual,
    enlightenMePrompt: `Architect a challenge ladder generator for a corporate academy.

Include:
- Skill graph ingestion and dependency detection
- Level design (wins, benchmarks, resources)
- Unlock logic and evidence submission workflow
- Analytics: cohort progression, stuck nodes, badge issuance`
  },
  codeExample: `// Levels scaffold (TypeScript)
export type Task = { title: string; prereqs: string[] };
export function ladder(goal: string): Task[][] {
  return [
    [{ title: 'Setup env', prereqs: [] }],
    [{ title: 'Hello API', prereqs: ['Setup env'] }],
  ];
}
`,
  pythonCodeExample: `# Levels scaffold (Python)
def ladder(goal: str):
    return [
        [{ 'title': 'Setup env', 'prereqs': [] }],
        [{ 'title': 'Hello API', 'prereqs': ['Setup env'] }],
    ]
`,
};
