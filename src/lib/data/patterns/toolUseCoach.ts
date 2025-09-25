import { PatternData } from './types';
import { ToolUseCoachVisual } from '@/components/visualization/business-use-cases/ToolUseCoachVisual';

export const toolUseCoachPattern: PatternData = {
  id: 'tool-use-coach',
  name: 'Tool‑Use Coach',
  description: 'Teaches disciplined API/CLI/library usage with guardrails and validations.',
  category: 'Education',
  useCases: ['CLI training', 'API call hygiene', 'SDK usage checks'],
  whenToUse: 'Use when learners guess APIs, misuse tools, or need reproducible commands.',
  nodes: [
    { id: 'task', type: 'input', data: { label: 'Task + Chosen Tool', nodeType: 'input' }, position: { x: 40, y: 120 } },
    { id: 'coach', type: 'default', data: { label: 'Coach (LLM)', nodeType: 'llm' }, position: { x: 320, y: 100 } },
    { id: 'checklist', type: 'default', data: { label: 'Exemplars + Gotchas + Checklist', nodeType: 'output' }, position: { x: 640, y: 100 } },
    { id: 'output', type: 'output', data: { label: 'Validated Usage', nodeType: 'output' }, position: { x: 960, y: 100 } }
  ],
  edges: [
    { id: 'e1', source: 'task', target: 'coach', animated: true },
    { id: 'e2', source: 'coach', target: 'checklist', animated: true },
    { id: 'e3', source: 'checklist', target: 'output', animated: true }
  ],
  implementation: [
    'Ingest task and tool context',
    'Generate exemplar calls with comments',
    'List common pitfalls and a validation checklist',
    'Optionally validate a provided command or request'
  ],
  advantages: ['Reduces retries', 'Promotes best practices', 'Improves reproducibility'],
  limitations: ['Tool docs drift over time'],
  relatedPatterns: ['Modern Tool Use', 'Routing'],
  businessUseCase: {
    industry: 'Developer Enablement',
    description: 'Platform teams embed the Tool-Use Coach to review internal CLI/API usage before merge. Engineers paste commands, receive guardrail checks, and log policy-compliant exemplars for future teammates.',
    visualization: ToolUseCoachVisual,
    enlightenMePrompt: `Design a tool-use coaching agent for internal APIs.

Cover:
- Command/SDK linting heuristics and allowlists
- Linking to golden exemplars and platform docs
- Telemetry on common misuses for docs backlog
- Escalation path when violations persist`
  },
  codeExample: `// Validate a curl call (TypeScript)
export function validateCurl(cmd: string) {
  const hasSilent = cmd.includes('-s');
  const hasRetry = cmd.includes('--retry');
  return {
    ok: hasSilent && hasRetry,
    tips: [hasSilent ? '' : 'Add -s for silent mode.', hasRetry ? '' : 'Include --retry for resiliency'].filter(Boolean)
  };
}
`,
  pythonCodeExample: `# Validate a curl call (Python)
from typing import Dict, List

def validate_curl(cmd: str) -> Dict[str, object]:
    has_silent = '-s' in cmd
    has_retry = '--retry' in cmd
    tips = []
    if not has_silent:
        tips.append('Add -s for silent mode.')
    if not has_retry:
        tips.append('Include --retry for resiliency')
    return { 'ok': has_silent and has_retry, 'tips': tips }
`
};
