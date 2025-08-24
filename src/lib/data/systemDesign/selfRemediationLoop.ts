import { SystemDesignPattern } from './types';

export const selfRemediationLoopSystemDesign: SystemDesignPattern = {
  id: 'self-remediation-loop',
  name: 'Self‑Remediation Loop System Design',
  overview: 'Turns failing tests/errors into targeted remediation prompts and patches, iterating until green.',
  problemStatement: 'Learners stall on failing tests without a tight fix→verify loop.',
  solution: 'Ingest failures, propose minimal patch, run tests, and iterate with shrinking diff and guardrails.',
  steps: [
    { id: 'ingest', title: 'Failure Ingest', category: 'context', description: 'Collect failing tests and logs.', details: 'Summarize failure signature.', considerations: ['Noise'], bestPractices: ['Minimal repro'] },
    { id: 'patch', title: 'Minimal Patch Proposal', category: 'tools', description: 'Propose smallest safe change.', details: 'Guard side effects, add tests.', considerations: ['Regression risk'], bestPractices: ['One change at a time'] },
    { id: 'verify', title: 'Verify & Iterate', category: 'evaluation', description: 'Run tests; loop if still failing.', details: 'Stop on plateau; surface diff.', considerations: ['Infinite loops'], bestPractices: ['Iteration cap'] }
  ],
  architecture: {
    components: [
      { name: 'Signal Ingest', type: 'input', description: 'Receives failures' },
      { name: 'Patch LLM', type: 'processing', description: 'Suggests minimal diffs' },
      { name: 'Test Runner', type: 'processing', description: 'Validates fixes' },
      { name: 'Report Output', type: 'output', description: 'Shows status and next steps' }
    ],
    flows: [
      { from: 'Signal Ingest', to: 'Patch LLM', description: 'Provide failure context' },
      { from: 'Patch LLM', to: 'Test Runner', description: 'Apply candidate patch' },
      { from: 'Test Runner', to: 'Report Output', description: 'Return pass/fail and diffs' }
    ]
  }
};
