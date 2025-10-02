import { PatternData } from './types';
import { LearningVisualization } from '@/components/visualization/LearningVisualization';
import D3TreeVisualization from '@/components/visualization/D3TreeVisualization';

export const knowledgeMapNavigatorPattern: PatternData = {
  id: 'knowledge-map-navigator',
  name: 'Knowledge Map Navigator',
  description: 'Builds a personalized curriculum map with prerequisites, branches, and checkpoints.',
  category: 'Education',
  useCases: ['Learning journey planning', 'Gap remediation', 'Prerequisite mapping'],
  whenToUse: 'Use when planning learning paths or remediating skill gaps.',
  nodes: [
    { id: 'goal', type: 'input', data: { label: 'Target Skill + Current Skills', nodeType: 'input' }, position: { x: 40, y: 120 } },
    { id: 'mapper', type: 'default', data: { label: 'Map Builder', nodeType: 'planner' }, position: { x: 300, y: 100 } },
    { id: 'map', type: 'default', data: { label: 'Nodes + Sequence + Checkpoints', nodeType: 'output' }, position: { x: 600, y: 100 } },
    { id: 'output', type: 'output', data: { label: 'Personalized Plan', nodeType: 'output' }, position: { x: 900, y: 100 } }
  ],
  edges: [
    { id: 'e1', source: 'goal', target: 'mapper', animated: true },
    { id: 'e2', source: 'mapper', target: 'map', animated: true },
    { id: 'e3', source: 'map', target: 'output', animated: true }
  ],
  implementation: [
    'Collect goal and current skill inventory',
    'Generate prerequisite graph and recommended order',
    'Insert checkpoints and remediation branches',
    'Export to study planner'
  ],
  advantages: ['Reduces detours', 'Clarifies progression', 'Supports personalization'],
  limitations: ['Needs accurate skill assessment'],
  relatedPatterns: ['Routing', 'Plan and Execute'],
  businessUseCase: {
    industry: 'EdTech',
    description: 'Corporate L&D uses Knowledge Map Navigator to generate personalized upskilling paths for cloud certifications. It maps prerequisites, inserts remediation branches, and exports to a planner with checkpoints.',
    visualization: D3TreeVisualization,
    enlightenMePrompt: `Architect a skill-map service for cloud certification prep.

Include:
- Skill graph schema (nodes, prerequisites, mastery thresholds)
- Personalization signals (prior courses, assessments, role)
- Checkpoints and remediation paths
- Export to calendar and spaced repetition
- Metrics: time-to-ready, pass rate`
  },
  codeExample: `// Build a tiny learning path (TypeScript)
export function buildPath(goal: string, current: string[]) {
  return {
    goal,
    sequence: ['Foundations', 'Core', 'Projects'],
    checkpoints: ['Quiz 1', 'Mini-Project', 'Capstone']
  };
}
`,
  pythonCodeExample: `# Build a tiny learning path (Python)
from typing import Dict, List

def build_path(goal: str, current: List[str]) -> Dict[str, object]:
    return {
        "goal": goal,
        "sequence": ["Foundations", "Core", "Projects"],
        "checkpoints": ["Quiz 1", "Mini-Project", "Capstone"],
    }
`,

  velocityProfile: {
    impact: 'medium',
    timeToImplement: '1-2 days',
    complexityReduction: 'High - GPT-4 knowledge graph reasoning eliminates manual curriculum design and prerequisite mapping',
    reusabilityScore: 8,
    learningCurve: 'moderate',
    velocityPractices: [
      'Pattern Fluency - Essential educational pattern for personalized learning, skill gap analysis, curriculum planning',
      'Architecture Templates - Knowledge graph libraries (Neo4j, NetworkX) + LLM reasoning provide prerequisite detection',
      'Evaluation Automation - Learning path completion rate and knowledge retention metrics standard',
      'Operational Instrumentation - Prerequisite coverage and skill mastery tracking dashboards critical'
    ]
  }
};
