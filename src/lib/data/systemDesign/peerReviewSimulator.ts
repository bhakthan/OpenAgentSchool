import { SystemDesignPattern } from './types';

export const peerReviewSimulatorSystemDesign: SystemDesignPattern = {
  id: 'peer-review-simulator',
  name: 'Peer‑Review Simulator System Design',
  overview: 'Emulates strict code/doc review with blocking vs non‑blocking comments and actionable fixes.',
  problemStatement: 'Reviews are inconsistent and slow. How can learners practice receiving actionable feedback pre‑PR?',
  solution: 'Parse diffs against standards, produce structured comments, and decide block vs approve with fixes.',
  steps: [
    { id: 'intake', title: 'Diff + Standards Intake', category: 'context', description: 'Collect changes and style/quality standards.', details: 'Support multiple linters and conventions.', considerations: ['False positives'], bestPractices: ['Whitelist common cases'] },
    { id: 'analysis', title: 'Heuristic + LLM Analysis', category: 'tools', description: 'Combine static checks with LLM judgment.', details: 'Group comments by severity.', considerations: ['Over‑flagging'], bestPractices: ['Provide examples'] },
    { id: 'decision', title: 'Decision & Summary', category: 'evaluation', description: 'Summarize decision with TODOs.', details: 'Include rationale and quick‑fix links.', considerations: ['Tone'], bestPractices: ['Be specific and kind'] }
  ],
  architecture: {
    components: [
      { name: 'Diff Intake', type: 'input', description: 'Receives changes and standards' },
      { name: 'Reviewer LLM', type: 'processing', description: 'Generates comments and decision' },
      { name: 'Comment Output', type: 'output', description: 'Structured review with actions' }
    ],
    flows: [
      { from: 'Diff Intake', to: 'Reviewer LLM', description: 'Provide diff + standards' },
      { from: 'Reviewer LLM', to: 'Comment Output', description: 'Return comments and decision' }
    ]
  }
};
