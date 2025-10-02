import { PatternData } from './types';
import { LearningVisualization } from '@/components/visualization/LearningVisualization';
import SimpleFlowDemo from '@/components/visualization/SimpleFlowDemo';
import { PairHandoffVisual } from '@/components/visualization/business-use-cases/PairHandoffVisual';

export const handoffSummarizerPattern: PatternData = {
  id: 'handoff-summarizer',
  name: 'Handoff Summarizer',
  description: 'Compresses a working session into a concise, actionable summary for the next agent or human.',
  category: 'Education',
  useCases: ['Shift changes', 'Pair rotations', 'Async collaboration'],
  whenToUse: 'Use when context needs to transfer quickly without losing decisions, blockers, and next steps.',
  nodes: [
    { id: 'log', type: 'input', data: { label: 'Session Log/Artifacts', nodeType: 'input' }, position: { x: 40, y: 120 } },
    { id: 'summarizer', type: 'default', data: { label: 'Summarizer (LLM)', nodeType: 'llm' }, position: { x: 320, y: 100 } },
    { id: 'brief', type: 'output', data: { label: 'Handoff Brief', nodeType: 'output' }, position: { x: 620, y: 100 } },
  ],
  edges: [
    { id: 'e1', source: 'log', target: 'summarizer', animated: true },
    { id: 'e2', source: 'summarizer', target: 'brief', animated: true },
  ],
  implementation: [
    'Chunk and score logs for salience',
    'Summarize decisions, rationale, open issues, and ordered next steps',
    'Include quick links/snippets to key artifacts',
  ],
  advantages: ['Faster onboarding', 'Reduced context loss'],
  limitations: ['Sensitive to log quality'],
  relatedPatterns: ['Context Curator', 'Reflection Journaler'],
  businessUseCase: {
    industry: 'EdTech',
    description: 'In project-based courses, Handoff Summarizer creates concise briefs between pair-programming rotations, preserving decisions and next steps so new partners can start fast.',
  visualization: PairHandoffVisual,
    enlightenMePrompt: `Design a handoff summarizer for rotating pairs.

Include:
- Signal extraction from commit messages, PRs, and chat
- Brief template (decisions, blockers, next steps, links)
- Privacy and audit logging for academic integrity
- Outcome metrics: setup time reduction, fewer duplicate efforts`
  },
  codeExample: `// Handoff brief (TypeScript)
export type Brief = { decisions: string[]; blockers: string[]; next: string[] };
export function handoff(log: string): Brief {
  return { decisions: ['Adopt approach A'], blockers: ['API limit'], next: ['Implement retry'] };
}
`,
  pythonCodeExample: `# Handoff brief (Python)
def handoff(log: str):
    return { 'decisions': ['Adopt approach A'], 'blockers': ['API limit'], 'next': ['Implement retry'] }
`,

  velocityProfile: {
    impact: 'medium',
    timeToImplement: '2-4 hours',
    complexityReduction: 'Medium - GPT-4 summarization with structured output eliminates manual handoff documentation',
    reusabilityScore: 9,
    learningCurve: 'gentle',
    velocityPractices: [
      'Pattern Fluency - Essential team collaboration pattern for shift handoffs, async teams, student projects',
      'Architecture Templates - OpenAI structured outputs and Pydantic models provide type-safe brief generation',
      'Operational Instrumentation - Handoff completeness scores and usage metrics track adoption',
      'Evaluation Automation - Summary quality and information retention metrics standard'
    ]
  }
};
