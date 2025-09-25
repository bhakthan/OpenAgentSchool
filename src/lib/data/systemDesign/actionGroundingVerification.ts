import { SystemDesignPattern } from './types';

export const actionGroundingVerificationSystemDesign: SystemDesignPattern = {
  id: 'action-grounding-verification',
  name: 'Action Grounding & Verification System Design',
  overview: 'Translates abstract plan steps into executable actions with layered validation and dry-run gating.',
  problemStatement: 'Directly executing generated SQL/code risks schema errors, policy breaches, or costly failures.',
  solution: 'Introduce multi-stage grounding: generation → static checks → policy gate → sandbox dry run → approval.',
  steps: [
    { id: 'generate-action', title: 'Generate Action', category: 'prompt', description: 'Produce candidate code/tool call', details: 'Include justification', considerations: ['Ambiguous intent'], bestPractices: ['Embed constraints'], patterns: ['action-grounding-verification'], examples: ['llm.generateAction()'] },
    { id: 'static-validate', title: 'Static Validation', category: 'evaluation', description: 'Syntax + schema', details: 'AST & catalog checks', considerations: ['Dynamic SQL'], bestPractices: ['Fail fast'], patterns: ['action-grounding-verification'], examples: ['parse(sql)'] },
    { id: 'policy-gate', title: 'Policy Gate', category: 'evaluation', description: 'Check governance rules', details: 'Tag-based rules', considerations: ['Rule drift'], bestPractices: ['Version policies'], patterns: ['action-grounding-verification'], examples: ['policyEngine.evaluate()'] },
    { id: 'dry-run', title: 'Dry Run Sandbox', category: 'tools', description: 'Execute no-side-effect', details: 'Row count & schema diff', considerations: ['Sandbox realism'], bestPractices: ['Capture metrics'], patterns: ['action-grounding-verification'], examples: ['sandbox.execute()'] }
  ],
  architecture: {
    components: [
      { name: 'Grounding Generator', type: 'processing', description: 'LLM action generation' },
      { name: 'Static Validator', type: 'processing', description: 'Syntax & schema checks' },
      { name: 'Policy Engine', type: 'processing', description: 'Governance rules evaluation' },
      { name: 'Sandbox Executor', type: 'processing', description: 'Dry-run environment' },
      { name: 'Approval Store', type: 'storage', description: 'Provenance + approved actions' }
    ],
    flows: [
      { from: 'Grounding Generator', to: 'Static Validator', description: 'Candidate action' },
      { from: 'Static Validator', to: 'Policy Engine', description: 'Validated code' },
      { from: 'Policy Engine', to: 'Sandbox Executor', description: 'Policy-cleared action' },
      { from: 'Sandbox Executor', to: 'Approval Store', description: 'Approved artifact' }
    ]
  }
};
