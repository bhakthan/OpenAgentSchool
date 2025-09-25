// Pattern Drift Labs scaffold (#13)
export interface DriftEvent { id: string; type: 'schema-rename'|'policy-update'|'anomaly'; description: string; affectedPatterns: string[]; }
export const driftEvents: DriftEvent[] = [
  { id: 'drift-schema-1', type: 'schema-rename', description: 'Customer table column renamed email_address -> primary_email', affectedPatterns: ['perception-normalization','strategy-memory-replay'] },
  { id: 'drift-policy-1', type: 'policy-update', description: 'New data residency constraint for EU PII fields', affectedPatterns: ['policy-gated-tool-invocation','action-grounding-verification'] }
];
