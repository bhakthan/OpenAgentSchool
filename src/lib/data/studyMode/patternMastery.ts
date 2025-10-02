// Mastery rubric for Data Autonomy patterns
// Tiers progress from basic recognition to integrated governance alignment.
export type MasteryTier = 'recognition' | 'application' | 'optimization' | 'governance';

export interface PatternMasteryBand {
  patternId: string;           // concept / pattern id
  tier: MasteryTier;
  signals: string[];           // Positive observable behaviors / answers
  antiSignals: string[];       // Common misconceptions or wrong mental models
  upgradeCriteria: string[];   // Deterministic gates to advance
}

// Core nine Data Autonomy patterns
const patterns = [
  'perception-normalization',
  'schema-aware-decomposition',
  'action-grounding-verification',
  'budget-constrained-execution',
  'policy-gated-tool-invocation',
  'data-quality-feedback-repair-loop',
  'query-intent-structured-access',
  'strategy-memory-replay',
  'hierarchical-document-intelligence'
];

// Helper to compose bands quickly
function mk(
  patternId: string,
  tier: MasteryTier,
  signals: string[],
  antiSignals: string[],
  upgradeCriteria: string[]
): PatternMasteryBand {
  return { patternId, tier, signals, antiSignals, upgradeCriteria };
}

export const patternMasteryBands: PatternMasteryBand[] = [
  // Perception Normalization
  mk('perception-normalization', 'recognition', [
    'Identifies raw multi-format inputs need unification',
    'Mentions hashing or canonical forms'
  ], [
    'Assumes raw LLM embeddings suffice without normalization'
  ], [
    'Can articulate why perceptual drift hurts downstream reuse'] ),
  mk('perception-normalization', 'application', [
    'Chooses stable schema for canonical record',
    'Implements idempotent normalization step'
  ], [
    'Re-processes identical inputs producing divergent hashes'
  ], [
    'Produces consistent hash across duplicate ingestion'] ),
  mk('perception-normalization', 'optimization', [
    'Profiles latency vs fidelity tradeoffs',
    'Caches normalized artifacts effectively'
  ], [
    'Re-normalizes every request despite cache hits'
  ], [
    'Achieves >80% cache hit rate in scenario drill'] ),
  mk('perception-normalization', 'governance', [
    'Links normalization lineage to governance logs'
  ], [
    'Cannot trace normalized field provenance'
  ], [
    'Produces lineage map for sample batch'] ),

  // Schema-Aware Decomposition
  mk('schema-aware-decomposition', 'recognition', [
    'Breaks complex query into sub-intents',
    'Maps sub-intents to schema entities'
  ], [
    'Attempts monolithic generation without plan'] , [
    'Enumerates at least two valid sub-operations for sample task'] ),
  mk('schema-aware-decomposition', 'application', [
    'Orders sub-queries respecting dependencies'
  ], [
    'Ignores join key alignment'
  ], [
    'Generates executable ordered plan'] ),
  mk('schema-aware-decomposition', 'optimization', [
    'Prunes redundant sub-queries',
    'Parallelizes independent steps'
  ], [
    'Executes sequentially when safe parallelism exists'
  ], [
    'Reduces execution cost vs naive baseline'] ),
  mk('schema-aware-decomposition', 'governance', [
    'Annotates plan steps with policy sensitivity'
  ], [
    'Produces plan lacking sensitivity labels'
  ], [
    'All steps labeled with sensitivity + justification'] ),

  // Action Grounding & Verification
  mk('action-grounding-verification', 'recognition', [
    'Distinguishes model suggestion vs executable grounded action'
  ], [
    'Blindly trusts generative output as executed state'
  ], [
    'Explains need for verification harness'] ),
  mk('action-grounding-verification', 'application', [
    'Implements pre/post state checks'
  ], [
    'Skips rollback logic'
  ], [
    'Demonstrates rollback on simulated failure'] ),
  mk('action-grounding-verification', 'optimization', [
    'Uses differential verification to minimize cost'
  ], [
    'Full re-validation even on trivial changes'
  ], [
    'Implements selective verification path'] ),
  mk('action-grounding-verification', 'governance', [
    'Attaches audit metadata to verified actions'
  ], [
    'No audit trail for critical changes'
  ], [
    'Produces signed audit entry example'] ),

  // Budget-Constrained Execution
  mk('budget-constrained-execution', 'recognition', [
    'Identifies distinct budget dimensions (latency, cost, tokens)'
  ], [
    'Treats budget as single scalar without breakdown'
  ], [
    'Lists at least two budget axes with constraints'] ),
  mk('budget-constrained-execution', 'application', [
    'Allocates per-step token/latency budget'
  ], [
    'Lets steps exceed cap without mitigation'
  ], [
    'Produces per-step budget table for sample plan'] ),
  mk('budget-constrained-execution', 'optimization', [
    'Adapts allocation based on observed usage'
  ], [
    'Never rebalances after slack accumulates'
  ], [
    'Shows improved utilization vs static allocation'] ),
  mk('budget-constrained-execution', 'governance', [
    'Escalates when budget breach risk > threshold'
  ], [
    'Silently degrades quality without escalation'
  ], [
    'Simulates escalation event with proper metadata'] ),

  // Policy-Gated Tool Invocation
  mk('policy-gated-tool-invocation', 'recognition', [
    'Explains why intent classification precedes gating'
  ], [
    'Applies generic blocklist without context'
  ], [
    'Describes flow: intent → capability map → risk score → policy gate'] ),
  mk('policy-gated-tool-invocation', 'application', [
    'Attaches structured risk factors to decision'
  ], [
    'Single opaque risk label'
  ], [
    'Produces JSON risk lattice sample'] ),
  mk('policy-gated-tool-invocation', 'optimization', [
    'Caches low-risk approvals with TTL'
  ], [
    'Re-evaluates identical safe requests repeatedly'
  ], [
    'Shows cache hit example avoiding recompute'] ),
  mk('policy-gated-tool-invocation', 'governance', [
    'Logs allow/deny with rationale & policy reference'
  ], [
    'Missing rationale in gating logs'
  ], [
    'Generates compliant audit log entry'] ),

  // Data Quality Feedback & Repair Loop
  mk('data-quality-feedback-repair-loop', 'recognition', [
    'Differentiates anomaly detection vs repair synthesis'
  ], [
    'Jumps straight to patching without profiling'
  ], [
    'Outlines detect → profile → hypothesize → validate sequence'] ),
  mk('data-quality-feedback-repair-loop', 'application', [
    'Runs validation on shadow dataset'
  ], [
    'Applies fix directly to prod sample'
  ], [
    'Demonstrates shadow validation step'] ),
  mk('data-quality-feedback-repair-loop', 'optimization', [
    'Prioritizes repairs by blast radius'
  ], [
    'Treats all anomalies equally'
  ], [
    'Ranks sample anomalies with rationale'] ),
  mk('data-quality-feedback-repair-loop', 'governance', [
    'Records repair lineage & reversion plan'
  ], [
    'No rollback metadata'
  ], [
    'Produces repair record including rollback'] ),

  // Query Intent → Structured Access
  mk('query-intent-structured-access', 'recognition', [
    'Clarifies ambiguous entity terms'
  ], [
    'Generates SQL before disambiguation'
  ], [
    'Resolves at least one ambiguous term in example'] ),
  mk('query-intent-structured-access', 'application', [
    'Maps intent segments to schema objects'
  ], [
    'Direct mapping failure not detected'
  ], [
    'Produces binding table (term → entity → confidence)'] ),
  mk('query-intent-structured-access', 'optimization', [
    'Reuses disambiguation memory'
  ], [
    'Re-asks identical clarifications'
  ], [
    'Shows reuse reducing clarification count'] ),
  mk('query-intent-structured-access', 'governance', [
    'Enforces policy tags pre-plan emission'
  ], [
    'Checks policy only after SQL generation'
  ], [
    'Demonstrates early denial with explanation'] ),

  // Strategy Memory Replay
  mk('strategy-memory-replay', 'recognition', [
    'Explains reuse depends on freshness & drift'
  ], [
    'Assumes any close embedding is safe to reuse'
  ], [
    'Enumerates reuse gating factors'] ),
  mk('strategy-memory-replay', 'application', [
    'Compares perception hash sets before reuse'
  ], [
    'Ignores hash delta'
  ], [
    'Documents hash diff prior to adaptation'] ),
  mk('strategy-memory-replay', 'optimization', [
    'Adapts only changed sub-plan segments'
  ], [
    'Rebuilds entire plan unnecessarily'
  ], [
    'Shows partial adaptation diff'] ),
  mk('strategy-memory-replay', 'governance', [
    'Flags reuse decisions in audit log'
  ], [
    'Opaque reuse with no criteria logged'
  ], [
    'Produces reuse decision record example'] )
];

// Quick index by patternId + tier for lookup
export const masteryIndex: Record<string, Record<MasteryTier, PatternMasteryBand>> = {};
for (const band of patternMasteryBands) {
  masteryIndex[band.patternId] = masteryIndex[band.patternId] || {} as Record<MasteryTier, PatternMasteryBand>;
  masteryIndex[band.patternId][band.tier] = band;
}

export const allMasteryPatternIds = patterns;

// Compute highest mastery tier satisfied by provided evidence signals.
export function computeMasteryTier(patternId: string, evidenceSignals: string[]): MasteryTier | null {
  const tiers = patternMasteryBands.filter(b => b.patternId === patternId);
  if (!tiers.length) return null;
  const order: MasteryTier[] = ['recognition','application','optimization','governance'];
  let achieved: MasteryTier | null = null;
  for (const t of order) {
    const band = tiers.find(b => b.tier === t);
    if (!band) continue;
    const ok = band.upgradeCriteria.every(c => evidenceSignals.includes(c));
    if (ok) achieved = t; else break;
  }
  return achieved;
}

