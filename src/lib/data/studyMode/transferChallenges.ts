// Cross-pattern transfer / fusion challenges metadata
export interface TransferChallenge {
  id: string;
  title: string;
  description: string;
  compositePatterns: string[]; // involved pattern ids
  objective: string;
  evaluationCriteria: string[];
  hint?: string;
  outcomeSignals: string[]; // what success looks like
}

export const transferChallenges: TransferChallenge[] = [
  {
    id: 'replay-under-perception-drift',
    title: 'Replay Viability With Partial Perception Drift',
    description: 'Decide whether to reuse a prior successful analytical strategy when two of six perception hashes changed.',
    compositePatterns: ['perception-normalization', 'strategy-memory-replay'],
    objective: 'Assess reuse vs partial adaptation vs full rebuild with justification.',
    evaluationCriteria: [
      'Identifies which hash deltas invalidate sub-steps',
      'Avoids full rebuild if majority unchanged',
      'Produces adaptation diff rationale'
    ],
    hint: 'List impacted sub-operations; adapt only those with upstream semantic shift.',
    outcomeSignals: [
      'Selective adaptation chosen',
      'Clear mapping from hash delta → plan segment change'
    ]
  },
  {
    id: 'decomposition-with-quality-repair',
    title: 'Integrating Repair Loop Into Decomposition Plan',
    description: 'Plan complex query decomposition while an anomaly flags a suspect dimension table requiring validation & optional repair.',
    compositePatterns: ['schema-aware-decomposition', 'data-quality-feedback-repair-loop'],
    objective: 'Embed conditional repair branch without blocking unaffected sub-queries.',
    evaluationCriteria: [
      'Separates core analytical path from repair branch',
      'Profiles before repair',
      'Parallelizes safe unaffected steps'
    ],
    outcomeSignals: [
      'Repair branch gated by anomaly confirmation',
      'Shadow validation before merge'
    ]
  }
];
