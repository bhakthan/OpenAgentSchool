import { PatternData } from './types';

export const conceptToProjectPattern: PatternData = {
  id: 'concept-to-project',
  name: 'Concept‑to‑Project Builder',
  description: 'Turns a concept into a scoped, buildable project with milestones and a rubric.',
  category: 'Education',
  useCases: ['Course projects', 'Capstones', 'Hackathon scoping'],
  whenToUse: 'Use to transition from theory to applied practice with clear deliverables and timeboxes.',
  nodes: [
    { id: 'concept', type: 'input', data: { label: 'Concept + Level + Timebox', nodeType: 'input' }, position: { x: 40, y: 120 } },
    { id: 'planner', type: 'default', data: { label: 'Planner (LLM)', nodeType: 'planner' }, position: { x: 280, y: 100 } },
    { id: 'milestones', type: 'default', data: { label: 'Milestones + Rubric', nodeType: 'output' }, position: { x: 560, y: 100 } },
    { id: 'output', type: 'output', data: { label: 'MVP Plan', nodeType: 'output' }, position: { x: 820, y: 100 } }
  ],
  edges: [
    { id: 'e1', source: 'concept', target: 'planner', animated: true },
    { id: 'e2', source: 'planner', target: 'milestones', animated: true },
    { id: 'e3', source: 'milestones', target: 'output', animated: true }
  ],
  implementation: [
    'Collect concept, learner level, and available time',
    'Generate project brief, milestones, and rubric',
    'Include acceptance criteria and demo checkpoints',
    'Output as a one-pager and task list'
  ],
  advantages: ['Clarifies scope', 'Improves follow-through', 'Supports assessment'],
  limitations: ['Requires calibration to level', 'Over/under-scoping risk'],
  relatedPatterns: ['Plan and Execute', 'Routing'],
  codeExample: `// Concept to Project one-pager generator (TypeScript)
export function buildProjectBrief(concept: string, level: string, timeboxHrs: number) {
  return {
    title: \`${'${'}concept${'}'} — ${'${'}level${'}'} Project\`,
    milestones: ['Scope', 'MVP', 'Polish'],
    rubric: ['Completeness', 'Clarity', 'Demoability'],
    timeboxHrs
  };
}
`,
  pythonCodeExample: `# Concept to Project one-pager generator (Python)
from typing import Dict, List

def build_project_brief(concept: str, level: str, timebox_hrs: int) -> Dict[str, object]:
    return {
        "title": f"{concept} — {level} Project",
        "milestones": ["Scope", "MVP", "Polish"],
        "rubric": ["Completeness", "Clarity", "Demoability"],
        "timeboxHrs": timebox_hrs,
    }
`
};
