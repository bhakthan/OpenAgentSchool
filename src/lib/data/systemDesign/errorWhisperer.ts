import { SystemDesignPattern } from './types';

export const errorWhispererSystemDesign: SystemDesignPattern = {
  id: 'error-whisperer',
  name: 'Error Whisperer System Design',
  overview: 'Diagnoses errors, explains root cause, proposes minimal fixes, and teaches prevention.',
  problemStatement: 'Logs are noisy and stack traces are cryptic. How can we build debugging intuition, not just fixes?',
  solution: 'Normalize logs, hypothesize root cause, propose minimal diff and prevention, and verify by rerun.',
  steps: [
    { id: 'normalize', title: 'Signal Extraction', category: 'context', description: 'Extract key signals from logs and snippets.', details: 'De‑dupe noise and isolate failure points.', considerations: ['PII in logs'], bestPractices: ['Mask secrets', 'Keep raw copy'] },
    { id: 'hypothesize', title: 'Root Cause Hypothesis', category: 'prompt', description: 'Form plausible causes tied to code.', details: 'Reference specific lines or modules.', considerations: ['Multiple candidates'], bestPractices: ['Rank by likelihood'] },
    { id: 'fix', title: 'Minimal Fix & Prevention', category: 'instruction', description: 'Propose the smallest change and prevention tips.', details: 'Explain why the fix works.', considerations: ['Side effects'], bestPractices: ['Add a regression test'] }
  ],
  architecture: {
    components: [
      { name: 'Log Ingest', type: 'input', description: 'Receives logs and code snippets' },
      { name: 'Analyzer LLM', type: 'processing', description: 'Builds diagnosis and fixes' },
      { name: 'Verification Runner', type: 'processing', description: 'Reruns tests/checks' },
      { name: 'Report Output', type: 'output', description: 'Explains fix and prevention' }
    ],
    flows: [
      { from: 'Log Ingest', to: 'Analyzer LLM', description: 'Send normalized signals' },
      { from: 'Analyzer LLM', to: 'Verification Runner', description: 'Attempt fix and rerun checks' },
      { from: 'Verification Runner', to: 'Report Output', description: 'Publish result and teaching notes' }
    ]
  }
};
