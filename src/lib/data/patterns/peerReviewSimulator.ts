import { PatternData } from './types';

export const peerReviewSimulatorPattern: PatternData = {
  id: 'peer-review-simulator',
  name: 'Peer‑Review Simulator',
  description: 'Emulates a strict reviewer for code/docs/PRs with actionable feedback.',
  category: 'Education',
  useCases: ['Pre‑PR checks', 'Code review training', 'Style enforcement'],
  whenToUse: 'Use to teach review culture and raise code quality before human review.',
  nodes: [
    { id: 'diff', type: 'input', data: { label: 'Diff + Standards', nodeType: 'input' }, position: { x: 40, y: 120 } },
    { id: 'reviewer', type: 'default', data: { label: 'Reviewer (LLM)', nodeType: 'evaluator' }, position: { x: 300, y: 100 } },
    { id: 'comments', type: 'default', data: { label: 'Block/Approve + Comments', nodeType: 'output' }, position: { x: 600, y: 100 } },
    { id: 'output', type: 'output', data: { label: 'Actionable TODOs', nodeType: 'output' }, position: { x: 900, y: 100 } }
  ],
  edges: [
    { id: 'e1', source: 'diff', target: 'reviewer', animated: true },
    { id: 'e2', source: 'reviewer', target: 'comments', animated: true },
    { id: 'e3', source: 'comments', target: 'output', animated: true }
  ],
  implementation: [
    'Parse diff and standards (linters, conventions)',
    'Produce structured comments with blocking vs non‑blocking',
    'Suggest concise fixes with examples',
    'Provide summary and approval decision'
  ],
  advantages: ['Improves quality', 'Faster reviews', 'Consistency with standards'],
  limitations: ['May over‑flag without context'],
  relatedPatterns: ['Evaluator-Optimizer', 'Self-Reflection'],

  velocityProfile: {
    impact: 'medium',
    timeToImplement: '3-6 hours',
    complexityReduction: 'Medium - Automates code review workflows, reduces PR review time by 50-70% via structured feedback',
    reusabilityScore: 9,
    learningCurve: 'gentle',
    velocityPractices: [
      'Pattern Fluency - Code quality pattern for CI/CD pipelines, PR automation, team collaboration, educational code grading',
      'Architecture Templates - GitHub Actions + Azure OpenAI provide automated PR comment generation',
      'Failure Scenario Libraries - Over-flagging, false positives, missing context issues documented with mitigation strategies',
      'Evaluation Automation - Review quality metrics (precision, recall, developer satisfaction) standard'
    ]
  },

  codeExample: `// Simple review function (TypeScript)
type Review = { decision: 'block' | 'approve'; comments: string[] };
export function reviewDiff(diff: string, standards: string[]): Review {
  const comments = [] as string[];
  if (diff.includes('console.log')) comments.push('Avoid console.log in production code.');
  return { decision: comments.length ? 'block' : 'approve', comments };
}
`,
  pythonCodeExample: `# Simple review function (Python)
from typing import Dict, List

def review_diff(diff: str, standards: List[str]) -> Dict[str, object]:
    comments: List[str] = []
    if 'console.log' in diff:
        comments.append('Avoid console.log in production code.')
    return { 'decision': 'block' if comments else 'approve', 'comments': comments }
`
};
