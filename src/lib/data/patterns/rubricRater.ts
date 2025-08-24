import { PatternData } from './types';
import { LearningVisualization } from '@/components/visualization/LearningVisualization';
import { CodeVisualizer } from '@/components/visualization/business-use-cases/CodeVisualizer';
import { GradingVisual } from '@/components/visualization/business-use-cases/GradingVisual';

export const rubricRaterPattern: PatternData = {
  id: 'rubric-rater',
  name: 'Rubric Rater',
  description: 'Scores work against a transparent rubric and suggests concrete deltas for improvement.',
  category: 'Education',
  useCases: ['Autograding', 'Peer review', 'Submission checks'],
  whenToUse: 'Use for fast, consistent scoring and feedback tied to clear criteria.',
  nodes: [
    { id: 'rubric', type: 'input', data: { label: 'Rubric', nodeType: 'input' }, position: { x: 40, y: 120 } },
    { id: 'artifact', type: 'input', data: { label: 'Artifact', nodeType: 'input' }, position: { x: 40, y: 180 } },
    { id: 'rater', type: 'default', data: { label: 'Rater (LLM)', nodeType: 'evaluator' }, position: { x: 300, y: 130 } },
    { id: 'score', type: 'default', data: { label: 'Scores + 3 Deltas', nodeType: 'output' }, position: { x: 560, y: 130 } },
  ],
  edges: [
    { id: 'e1', source: 'rubric', target: 'rater', animated: true },
    { id: 'e2', source: 'artifact', target: 'rater', animated: true },
    { id: 'e3', source: 'rater', target: 'score', animated: true },
  ],
  implementation: [
    'Normalize rubric criteria and weights',
    'Score artifact per criterion with rationale',
    'Suggest three concrete improvements with examples',
  ],
  advantages: ['Consistent scoring', 'Actionable feedback'],
  limitations: ['Subjectivity in edge cases'],
  relatedPatterns: ['Evaluator-Optimizer'],
  businessUseCase: {
    industry: 'EdTech',
    description: 'Bootcamps use Rubric Rater to auto-score submissions with transparent criteria and provide concrete deltas. Instructors get consistency; learners get actionable next steps.',
  visualization: GradingVisual,
    enlightenMePrompt: `Design an autograder for project rubrics with human-in-the-loop.

Cover:
- Rubric normalization and weighting
- LLM rationale capture and evidence linking
- Patch suggestions as PR comments
- Bias checks and spot audits by TAs
- Data model for scores, comments, and appeals`
  },
  codeExample: `// Simple rubric rater (TypeScript)
type ScoreItem = { criterion: string; score: number; rationale: string };
export function rate(rubric: string[], artifact: string): { scores: ScoreItem[]; improvements: string[] } {
  const scores = rubric.map((c) => ({ criterion: c, score: 3, rationale: 'Meets expectations.' }));
  const improvements = ['Clarify README', 'Add tests for edge cases', 'Use consistent naming'];
  return { scores, improvements };
}
`,
  pythonCodeExample: `# Simple rubric rater (Python)
from typing import List, Dict
def rate(rubric: List[str], artifact: str) -> Dict[str, object]:
    scores = [{ 'criterion': c, 'score': 3, 'rationale': 'Meets expectations.' } for c in rubric]
    improvements = ['Clarify README', 'Add tests for edge cases', 'Use consistent naming']
    return { 'scores': scores, 'improvements': improvements }
`,
};
