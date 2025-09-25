// Adaptive sequencing rules (heuristic first pass)
export interface AdaptiveRule {
  id: string;
  trigger: {
    patternId: string;
    signal: 'quiz-fail' | 'debug-misdiagnosis' | 'scenario-misstep';
    topic?: string; // optional subtopic (e.g., 'ambiguous-entity')
    threshold?: number; // number of consecutive failures
  };
  prescribe: {
    action: 'inject-hint-card' | 'route-remediation-scenario' | 'recommend-review';
    resourceRef: string; // ID of card / scenario / doc
    rationale: string;
  };
}

export const adaptiveRules: AdaptiveRule[] = [
  {
    id: 'qi-ambiguous-entity-remediate',
    trigger: { patternId: 'query-intent-structured-access', signal: 'quiz-fail', topic: 'entity-disambiguation', threshold: 2 },
    prescribe: {
      action: 'route-remediation-scenario',
      resourceRef: 'qi-access-scenario',
      rationale: 'Repeated failures on entity disambiguation → reinforce early clarification discipline.'
    }
  },
  {
    id: 'policy-gate-risk-lattice-hint',
    trigger: { patternId: 'policy-gated-tool-invocation', signal: 'debug-misdiagnosis', topic: 'risk-lattice', threshold: 1 },
    prescribe: {
      action: 'inject-hint-card',
      resourceRef: 'risk-lattice-mini',
      rationale: 'Misdiagnosed gating failure—need structured risk factor framing.'
    }
  },
  {
    id: 'strategy-replay-drift-review',
    trigger: { patternId: 'strategy-memory-replay', signal: 'scenario-misstep', topic: 'drift-detection', threshold: 1 },
    prescribe: {
      action: 'recommend-review',
      resourceRef: 'strategy-replay-drift-checklist',
      rationale: 'Missed hash delta gate—review drift evaluation checklist.'
    }
  }
];
