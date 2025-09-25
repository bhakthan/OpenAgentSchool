import { SystemDesignPattern } from './types';

export const policyGatedInvocationSystemDesign: SystemDesignPattern = {
  id: 'policy-gated-tool-invocation',
  name: 'Policy-Gated Tool Invocation System Design',
  overview: 'Adds an intent→capability→risk→policy lattice gating layer before tool/API execution.',
  problemStatement: 'Agents may invoke powerful tools unsafely without structured capability & policy mediation.',
  solution: 'Normalize invocation intent, score risk, traverse policy lattice, and sign approved calls with provenance.',
  steps: [
    { id: 'intent-parse', title: 'Intent Parse', category: 'context', description: 'Extract action + scope tokens', details: 'LLM or rules', considerations: ['Ambiguity'], bestPractices: ['Emit uncertainties'], patterns: ['policy-gated-tool-invocation'], examples: ['parse("bulk update region=EU")'] },
  { id: 'risk-score', title: 'Risk Scoring', category: 'evaluation', description: 'Evaluate scope sensitivity & rate limits', details: 'Composite function', considerations: ['False positives'], bestPractices: ['Weight calibration'], patterns: ['policy-gated-tool-invocation'], examples: ['risk(scoreContext)'] }
  ],
  architecture: {
    components: [
      { name: 'Intent Parser', type: 'processing', description: 'Derives structured intent' },
      { name: 'Capability Mapper', type: 'processing', description: 'Maps to taxonomized capability' },
      { name: 'Risk Engine', type: 'processing', description: 'Computes risk score' },
      { name: 'Policy Lattice', type: 'processing', description: 'Hierarchical allow/deny/escalate evaluation' },
      { name: 'Signature Service', type: 'processing', description: 'Signs approved invocation' },
      { name: 'Audit Log', type: 'storage', description: 'Persists decision trace' }
    ],
    flows: [
      { from: 'Intent Parser', to: 'Capability Mapper', description: 'Structured intent' },
      { from: 'Capability Mapper', to: 'Risk Engine', description: 'Capability context' },
      { from: 'Risk Engine', to: 'Policy Lattice', description: 'Risk attributes' },
      { from: 'Policy Lattice', to: 'Signature Service', description: 'Decision' }
    ]
  }
};
