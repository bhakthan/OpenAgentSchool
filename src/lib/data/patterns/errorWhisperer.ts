import { PatternData } from './types';
import { LearningVisualization } from '@/components/visualization/LearningVisualization';
import { CodeActVisualizer } from '@/components/visualization/business-use-cases/CodeActVisualizer';

export const errorWhispererPattern: PatternData = {
  id: 'error-whisperer',
  name: 'Error Whisperer',
  description: 'Diagnoses errors and teaches the why behind fixes to build debugging intuition.',
  category: 'Education',
  useCases: ['Test failures', 'Build errors', 'Runtime exceptions'],
  whenToUse: 'Use for debugging blockers, flaky tests, or unclear stack traces.',
  nodes: [
    { id: 'input', type: 'input', data: { label: 'Logs + Snippet', nodeType: 'input' }, position: { x: 40, y: 120 } },
    { id: 'analyzer', type: 'default', data: { label: 'Root Cause Analyzer', nodeType: 'evaluator' }, position: { x: 300, y: 100 } },
    { id: 'fix', type: 'default', data: { label: 'Minimal Fix + Prevention', nodeType: 'output' }, position: { x: 580, y: 100 } },
    { id: 'output', type: 'output', data: { label: 'Resolved + Explained', nodeType: 'output' }, position: { x: 860, y: 100 } }
  ],
  edges: [
    { id: 'e1', source: 'input', target: 'analyzer', animated: true },
    { id: 'e2', source: 'analyzer', target: 'fix', animated: true },
    { id: 'e3', source: 'fix', target: 'output', animated: true }
  ],
  implementation: [
    'Normalize logs and extract key signals',
    'Hypothesize root cause with references to code/stack',
    'Propose minimal diff and prevention tip',
    'Verify by rerunning failing step'
  ],
  advantages: ['Teaches debugging mental models', 'Faster incident resolution'],
  limitations: ['Needs good log/context quality'],
  relatedPatterns: ['Evaluator-Optimizer', 'Self-Reflection'],

  velocityProfile: {
    impact: 'medium',
    timeToImplement: '4-8 hours',
    complexityReduction: 'Medium - Reduces debugging time from hours to minutes via structured root-cause analysis and minimal diffs',
    reusabilityScore: 8,
    learningCurve: 'gentle',
    velocityPractices: [
      'Pattern Fluency - Debugging assistance pattern for educational platforms, developer tools, automated incident response',
      'Architecture Templates - Microsoft Agent Framework + prompt engineering for stack trace analysis',
      'Failure Scenario Libraries - Log parsing failures, incorrect hypotheses, context insufficiency documented',
      'Evaluation Automation - Root-cause accuracy, fix validity, student learning outcomes metrics'
    ]
  },

  businessUseCase: {
    industry: 'EdTech',
    description: 'An online IDE integrates Error Whisperer to turn stack traces into teachable moments. Learners get concise root-cause hypotheses, minimal diffs, and prevention tips, accelerating debugging skills.',
    visualization: CodeActVisualizer,
    enlightenMePrompt: `Design an "Error Whisperer" plugin for a web IDE.

Cover:
- Log normalization and PII scrubbing
- Heuristics + LLM chain for root cause and minimal fix
- Safety: sandbox execution when verifying fixes
- Telemetry: mean time to resolution, recurrence rate`
  },
  codeExample: `// Minimal root-cause template (TypeScript)
export type Diagnosis = { hypothesis: string; fix: string; prevent: string };

export function diagnose(errorLog: string, snippet: string): Diagnosis {
  return {
    hypothesis: 'Null reference likely from unguarded access in snippet.',
    fix: 'Add optional chaining or null guard before dereference.',
    prevent: 'Add unit test for null path; validate inputs early.'
  };
}
`,
  pythonCodeExample: `# Minimal root-cause template (Python)
from typing import Dict

def diagnose(error_log: str, snippet: str) -> Dict[str, str]:
    return {
        "hypothesis": "Null reference likely from unguarded access in snippet.",
        "fix": "Add optional chaining or null guard before dereference.",
        "prevent": "Add unit test for null path; validate inputs early.",
    }
`
};
