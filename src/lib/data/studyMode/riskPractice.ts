// Risk-Aware Practice Mode scaffold (#6)
export interface RiskBudget { costLimit: number; latencyMs: number; sensitivity: 'low'|'medium'|'high'; }
export interface RiskDecisionScore { correctness: number; riskAlignment: number; efficiency: number; composite: number; }
export function scoreRiskDecision(baseCorrect: number, budget: RiskBudget, actual: { cost: number; latencyMs: number; sensitivity: 'low'|'medium'|'high'; }): RiskDecisionScore {
  const costRatio = actual.cost / Math.max(1, budget.costLimit);
  const latencyRatio = actual.latencyMs / Math.max(1, budget.latencyMs);
  const sensitivityPenalty = actual.sensitivity === 'high' && budget.sensitivity !== 'high' ? 0.6 : 1;
  const riskAlignment = Math.max(0, 1 - (costRatio*0.4 + latencyRatio*0.3)) * sensitivityPenalty;
  const efficiency = Math.max(0, 1 - (latencyRatio * 0.5 + costRatio * 0.5));
  const composite = (baseCorrect * 0.5) + (riskAlignment * 0.3) + (efficiency * 0.2);
  return { correctness: baseCorrect, riskAlignment, efficiency, composite };
}
