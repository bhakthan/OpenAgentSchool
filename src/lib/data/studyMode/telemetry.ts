export type SclTelemetryKind =
  | 'pattern_attempt'
  | 'hint_used'
  | 'failure_mode_triggered'
  | 'transfer_challenge_start'
  | 'transfer_challenge_complete'
  | 'mastery_tier_up'
  | 'adaptive_rule_fired'
  | 'risk_mode_decision_scored'
  | 'replay_choice_made'
  | 'socratic_chain_depth'
  | 'multi_dimensional_score'
  | 'governance_impact_estimated';

export interface SclTelemetryEvent {
  kind: SclTelemetryKind;
  patternId?: string;
  challengeId?: string;
  transferId?: string;
  masteryTier?: string;
  // Multi-dimensional scoring fields (#11)
  correctness?: number;
  riskAlignment?: number;
  efficiency?: number; // relative (0-1 vs benchmark)
  generalization?: number; // composite / first-attempt performance
  chainDepth?: number; // (#8) Socratic chain depth
  riskBudget?: { cost?: number; latencyMs?: number; sensitivity?: 'low'|'medium'|'high' };
  governanceImpact?: { hypotheticalBreach?: string; severity?: 'low'|'medium'|'high' };
  timestamp: number;
  meta?: Record<string, any>;
}

type Sink = (e: SclTelemetryEvent) => void;
const sinks: Sink[] = [];

export function registerTelemetrySink(fn: Sink) { sinks.push(fn); }

export function emitTelemetry(e: Omit<SclTelemetryEvent,'timestamp'>) {
  const full: SclTelemetryEvent = { ...e, timestamp: Date.now() };
  try { window.dispatchEvent(new CustomEvent('scl:telemetry', { detail: full })); } catch {}
  for (const s of sinks) { try { s(full); } catch {} }
}
