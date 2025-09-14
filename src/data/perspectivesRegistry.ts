// Centralized registry for study perspectives & SCL integration
// Keeps identifiers, labels, default objectives, prompt hints, KPIs, and pillar component mapping in one place.

import type { SCLObjective } from '../types/supercritical';

export interface PerspectiveMeta {
  id: string;              // canonical id used across content libraries
  label: string;           // human-readable label
  short?: string;          // optional short label for badges
  description?: string;    // brief description for tooltips
  defaultObjectives?: SCLObjective[]; // objectives auto-added when perspective content detected
  promptHints?: string[];  // generic hint fragments (fallback)
  firstOrderHint?: string; // stage-specific rich hint for first-order effect prompt
  cascadeHint?: string;    // stage-specific rich hint for higher-order/cascade prompt
  synthesisHint?: string;  // stage-specific rich hint for synthesis prompt
  kpis?: string[];         // representative KPIs for documentation or UI reference
}

// NOTE: If adding a new perspective, update this registry only—code consuming it should be generic.
export const perspectivesRegistry: PerspectiveMeta[] = [
  {
    id: 'product-management',
    label: 'Product Management',
    short: 'Prod',
    description: 'Outcome-focused iteration, user value validation.',
    defaultObjectives: ['optimize', 'reduceComplexity'],
    promptHints: [
      'Prioritize lean validation loops and reduce feature footprint until signal is proven.'
    ],
    firstOrderHint: 'Emphasize trust calibration signals, integration ROI tradeoffs, and complexity reduction; surface instrumentation gaps creating false confidence.',
    cascadeHint: 'Trust drift, mis-weighted dashboards, integration overhead, latency-induced abandonment; include mitigation levers (telemetry enrichment, decay-weighted scoring, ROI externalities).',
    synthesisHint: 'Prioritize trust calibration, integration ROI externalities, complexity governance, and feedback loop tightening.',
    kpis: ['Activation uplift', 'Retention delta', 'Churn reduction']
  },
  {
    id: 'agent-ops',
    label: 'Agent Operations & Observability',
    short: 'Ops',
    description: 'Reliability, latency tail, failure containment.',
    defaultObjectives: ['hitSLOs', 'latencyTailReduction'],
    promptHints: [
      'Surface golden signals (latency p95/p99, error budget burn, queue depth) when proposing changes.'
    ],
    firstOrderHint: 'Highlight tail latency variance, retry amplification, tool failure cascades, drift emergence, and observability blind spots.',
    cascadeHint: 'Show propagation of tail latency + retry storms to abandonment, partial tool degradation effect chain shifts, and detection delays from missing drift probes.',
    synthesisHint: 'Include SLO risk register, tail latency mitigation roadmap, drift monitoring upgrades, and resilience playbook gaps.',
    kpis: ['p95 latency', 'Error budget burn', 'Incident MTTR']
  },
  {
    id: 'cost-value',
    label: 'Cost & Value Engineering',
    short: 'Cost',
    description: 'Marginal ROI, efficiency, unit economics.',
    defaultObjectives: ['marginalLiftValidation', 'optimize'],
    promptHints: [
      'Quantify marginal model lift vs incremental cost; highlight payback period and utilization efficiency.'
    ],
    firstOrderHint: 'Note intervention ladder discipline, marginal lift vs token cost, cache staleness risks, routing misclassification impacts.',
    cascadeHint: 'Cost compounding via premature fine-tunes, routing misallocation, stale cache erosion, diminishing marginal lift plateaus.',
    synthesisHint: 'Provide intervention ladder scorecard, marginal lift ROI table, cache integrity KPIs, routing arbitration adjustments.',
    kpis: ['Cost per successful task', 'GPU utilization %', 'Marginal lift per $']
  },
  {
    id: 'trust-experience',
    label: 'Human Trust & Interaction Experience',
    short: 'Trust',
    description: 'Transparency, calibrated confidence, user control.',
    defaultObjectives: ['calibratedConfidenceGap', 'minimizeRisk'],
    promptHints: [
      'Ensure confidence presentation is calibrated and actionable; expose uncertainty gracefully.'
    ],
    firstOrderHint: 'Include calibrated confidence shifts, explanation overload risk, intervention friction, recovery UX quality metrics.',
    cascadeHint: 'Model confidence miscalibration feedback loops, explanation fatigue reducing adoption, recovery experience shaping retention.',
    synthesisHint: 'Add calibrated confidence gap metric, explanation layering adoption stats, intervention friction points, recovery success rate actions.',
    kpis: ['Calibration gap', 'User reported trust score', 'Error recovery rate']
  }
];

export function getPerspective(id: string): PerspectiveMeta | undefined {
  return perspectivesRegistry.find(p => p.id === id);
}

export const perspectiveIds = perspectivesRegistry.map(p => p.id);

// Utility to collect all default objectives (deduplicated) for quick augmentation logic.
export const perspectiveObjectiveMap: Record<string, SCLObjective[]> = perspectivesRegistry.reduce(
  (acc, p) => {
    if (p.defaultObjectives?.length) acc[p.id] = p.defaultObjectives;
    return acc;
  },
  {} as Record<string, SCLObjective[]>
);
