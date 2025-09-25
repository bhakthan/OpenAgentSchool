// Failure mode taxonomy per pattern (top 3) powering targeted remediation
export interface FailureMode {
  patternId: string;
  mode: string;           // short label
  description: string;    // explanation
  impact: 'low' | 'medium' | 'high';
  detectionSignal: string; // how learner/system can detect it
  remediation: string;    // corrective guidance
}

export const failureModes: FailureMode[] = [
  // Policy-Gated Tool Invocation
  { patternId: 'policy-gated-tool-invocation', mode: 'silent-bypass', description: 'Tool invoked without gating pass executing latent sensitive operation.', impact: 'high', detectionSignal: 'Missing audit log entry for invocation.', remediation: 'Enforce mandatory gating wrapper & assert log presence.' },
  { patternId: 'policy-gated-tool-invocation', mode: 'over-blocking', description: 'Legitimate low-risk requests denied reducing utility.', impact: 'medium', detectionSignal: 'High deny rate on low sensitivity intents.', remediation: 'Re-calibrate risk lattice thresholds; add approval caching.' },
  { patternId: 'policy-gated-tool-invocation', mode: 'stale-cache', description: 'Cached approval used after policy update.', impact: 'high', detectionSignal: 'Cache TTL exceeded or policy version mismatch.', remediation: 'Invalidate cache on policy version bump.' },

  // Strategy Memory Replay
  { patternId: 'strategy-memory-replay', mode: 'reuse-under-drift', description: 'Reused plan despite semantic schema change.', impact: 'high', detectionSignal: 'Hash delta on critical dimension entity.', remediation: 'Force adaptation path when critical entity hash changes.' },
  { patternId: 'strategy-memory-replay', mode: 'full-rebuild-overuse', description: 'Always rebuilding plan ignoring stable segments.', impact: 'medium', detectionSignal: 'High rebuild frequency with minimal hash delta.', remediation: 'Introduce segment-level diffing & reuse unchanged steps.' },
  { patternId: 'strategy-memory-replay', mode: 'cost-blind-reuse', description: 'Reuse chosen though cost profile regressed.', impact: 'medium', detectionSignal: 'Plan reuse yet projected cost > previous baseline + threshold.', remediation: 'Add cost delta gating prior to reuse confirmation.' },

  // Query Intent → Structured Access
  { patternId: 'query-intent-structured-access', mode: 'premature-sql', description: 'SQL generation prior to disambiguating entities.', impact: 'high', detectionSignal: 'SQL contains ambiguous column tokens.', remediation: 'Insert disambiguation phase with user / memory resolution.' },
  { patternId: 'query-intent-structured-access', mode: 'redundant-clarification', description: 'Repeated clarification of same term wasting latency.', impact: 'low', detectionSignal: 'Multiple identical clarification prompts per session.', remediation: 'Cache resolved entity bindings with confidence scores.' },
  { patternId: 'query-intent-structured-access', mode: 'late-policy-check', description: 'Policy evaluation after full plan generation.', impact: 'medium', detectionSignal: 'Denied queries still consumed planning tokens.', remediation: 'Shift policy gate pre-planning after intent binding.' },

  // Data Quality Feedback & Repair Loop
  { patternId: 'data-quality-feedback-repair-loop', mode: 'repair-without-profile', description: 'Direct mutation without confirming anomaly scope.', impact: 'high', detectionSignal: 'No profile artifact recorded pre-repair.', remediation: 'Insert profiling + anomaly validation step before patch.' },
  { patternId: 'data-quality-feedback-repair-loop', mode: 'shadow-skip', description: 'Repair applied to prod data without shadow validation.', impact: 'high', detectionSignal: 'No shadow dataset metrics captured.', remediation: 'Mandate shadow validation pipeline before merge.' },
  { patternId: 'data-quality-feedback-repair-loop', mode: 'flat-priority', description: 'All anomalies treated equally causing backlog churn.', impact: 'medium', detectionSignal: 'No severity ranking among open anomalies.', remediation: 'Rank anomalies by blast radius & recalc risk periodically.' },

  // Perception Normalization
  { patternId: 'perception-normalization', mode: 'non-deterministic', description: 'Normalization yields variable output for identical input.', impact: 'high', detectionSignal: 'Hash variance for duplicate raw inputs.', remediation: 'Establish deterministic canonicalization & stable hashing.' },
  { patternId: 'perception-normalization', mode: 'no-cache', description: 'Re-normalizing unchanged artifacts every request.', impact: 'medium', detectionSignal: 'Low cache hit rate vs duplication rate.', remediation: 'Introduce content-addressable cache keyed by hash.' },
  { patternId: 'perception-normalization', mode: 'missing-lineage', description: 'Cannot trace normalized field transformations.', impact: 'medium', detectionSignal: 'Lineage query returns null for sampled fields.', remediation: 'Record transformation steps + input references.' },

  // Schema-Aware Decomposition
  { patternId: 'schema-aware-decomposition', mode: 'monolith-plan', description: 'Large query executed without decomposition.', impact: 'high', detectionSignal: 'Single generative call for complex multi-join analysis.', remediation: 'Introduce sub-intent segmentation & dependency graph.' },
  { patternId: 'schema-aware-decomposition', mode: 'serial-over-parallel', description: 'Independent sub-queries executed sequentially.', impact: 'medium', detectionSignal: 'Critical path latency inflated vs parallelizable steps.', remediation: 'Detect independent steps & schedule concurrently.' },
  { patternId: 'schema-aware-decomposition', mode: 'redundant-subquery', description: 'Duplicate sub-query executed multiple times.', impact: 'low', detectionSignal: 'Identical SQL fingerprints appear >1 in plan.', remediation: 'Add query fingerprint deduplication stage.' },

  // Budget-Constrained Execution
  { patternId: 'budget-constrained-execution', mode: 'single-budget-scalar', description: 'Treats cost, latency, tokens as one undifferentiated metric.', impact: 'high', detectionSignal: 'No per-dimension allocation present.', remediation: 'Track separate axes & enforce individually.' },
  { patternId: 'budget-constrained-execution', mode: 'no-rebalance', description: 'Never reallocates budget after surplus emerges.', impact: 'medium', detectionSignal: 'Unused token budget persists while latency breaches.', remediation: 'Implement adaptive rebalancing rules.' },
  { patternId: 'budget-constrained-execution', mode: 'silent-breach', description: 'Budget breach occurs without escalation.', impact: 'high', detectionSignal: 'Exceeded limits absent alert event.', remediation: 'Emit escalation event & degrade gracefully.' }
  ,
  // Action Grounding & Verification
  { patternId: 'action-grounding-verification', mode: 'ungrounded-action', description: 'Model output executed without verifying binding to real environment state.', impact: 'high', detectionSignal: 'No pre-state snapshot recorded.', remediation: 'Capture pre/post state and compare before executing mutation.' },
  { patternId: 'action-grounding-verification', mode: 'missing-rollback', description: 'Failure path lacks compensating action leaving system inconsistent.', impact: 'high', detectionSignal: 'Error event without corresponding rollback log.', remediation: 'Implement transactional wrapper & rollback registry.' },
  { patternId: 'action-grounding-verification', mode: 'over-verification', description: 'Expensive full validation on trivial low-risk actions inflating cost.', impact: 'medium', detectionSignal: 'Uniform heavy verification regardless of delta size.', remediation: 'Adopt differential verification strategy keyed by change surface.' }
];
