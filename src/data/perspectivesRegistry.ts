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
  },
  {
    id: 'security-adversarial',
    label: 'Security & Adversarial',
    short: 'Sec',
    description: 'Threat modeling, injection attacks, data exfiltration via agents.',
    defaultObjectives: ['minimizeRisk'],
    promptHints: [
      'Surface prompt-injection attack vectors, tool-misuse chains, and data-exfiltration paths.'
    ],
    firstOrderHint: 'Highlight injection surfaces, privilege escalation via tool chains, data leakage through agent memory, and authorization bypass vectors.',
    cascadeHint: 'Show how a single compromised tool call cascades to full agent takeover, data exfiltration amplification, and lateral movement through multi-agent systems.',
    synthesisHint: 'Prioritize defense-in-depth controls: input sanitization, output filtering, least-privilege tool access, and runtime anomaly detection.',
    kpis: ['Injection detection rate', 'Mean time to containment', 'Attack surface area']
  },
  {
    id: 'governance-compliance',
    label: 'Governance & Compliance',
    short: 'Gov',
    description: 'Audit trails, regulatory frameworks, bias monitoring.',
    defaultObjectives: ['minimizeRisk', 'reduceComplexity'],
    promptHints: [
      'Map effects to regulatory requirements (EU AI Act, NIST AI RMF, ISO 42001) and identify documentation gaps.'
    ],
    firstOrderHint: 'Identify audit trail gaps, model card requirements, mandatory human-oversight points, and bias monitoring blind spots created by agent deployment.',
    cascadeHint: 'Show how documentation debt compounds into compliance failures, how unchecked bias amplifies through feedback loops, and how oversight gaps create regulatory exposure.',
    synthesisHint: 'Produce a compliance readiness scorecard: EU AI Act risk tier, NIST controls coverage, audit trail completeness, and human-oversight checkpoints.',
    kpis: ['Compliance coverage %', 'Audit finding count', 'Documentation freshness']
  },
  {
    id: 'team-org-design',
    label: 'Team & Org Design',
    short: 'Org',
    description: 'Hiring, cognitive load, on-call, team topology.',
    defaultObjectives: ['scaleTeam', 'reduceComplexity'],
    promptHints: [
      'Assess cognitive load shifts, on-call burden changes, and skill-gap emergence when agents are introduced.'
    ],
    firstOrderHint: 'Surface cognitive load spikes from agent supervision, on-call rotation impacts, skill-gap emergence for prompt engineering, and team boundary shifts.',
    cascadeHint: 'Show how initial cognitive load shifts compound into burnout, how skill gaps become hiring bottlenecks, and how team boundaries evolve toward platform teams.',
    synthesisHint: 'Recommend team topology evolution: platform team formation, cognitive load budgets, skill investment priorities, and on-call automation targets.',
    kpis: ['Cognitive load index', 'On-call incident ratio', 'Skill coverage %']
  },
  {
    id: 'data-knowledge',
    label: 'Data & Knowledge Management',
    short: 'Data',
    description: 'RAG quality, knowledge freshness, embedding drift.',
    defaultObjectives: ['optimize', 'hitSLOs'],
    promptHints: [
      'Assess RAG retrieval quality, knowledge graph freshness, embedding drift, and grounding accuracy.'
    ],
    firstOrderHint: 'Identify RAG retrieval degradation patterns, embedding drift from distribution shift, knowledge staleness windows, and grounding hallucination rates.',
    cascadeHint: 'Show how stale embeddings compound retrieval errors, how knowledge graph gaps create hallucination feedback loops, and how grounding failures erode user trust.',
    synthesisHint: 'Prioritize knowledge pipeline health: embedding refresh cadence, retrieval quality SLOs, grounding accuracy targets, and knowledge graph coverage metrics.',
    kpis: ['Retrieval precision@k', 'Knowledge freshness age', 'Grounding accuracy %']
  },
  {
    id: 'reliability-sre',
    label: 'Reliability Engineering',
    short: 'SRE',
    description: 'Error budgets, incident response, chaos experiments.',
    defaultObjectives: ['hitSLOs', 'minimizeRisk'],
    promptHints: [
      'Apply SRE principles: error budgets, SLO-based alerting, chaos experiments, and incident retrospectives.'
    ],
    firstOrderHint: 'Surface error budget burn rates from agent failures, cascade blast radii through tool dependency chains, retry storm amplification, and alerting blind spots.',
    cascadeHint: 'Show how agent failure modes compound error budget consumption, how tool-chain cascades extend MTTR, and how alert fatigue from false positives delays incident detection.',
    synthesisHint: 'Produce an SRE readiness plan: error budget allocation per agent, SLO targets with burn-rate alerts, chaos experiment schedule, and incident playbook coverage.',
    kpis: ['Error budget remaining %', 'Incident MTTR', 'Chaos experiment coverage']
  },
  {
    id: 'ethics-fairness',
    label: 'Ethics & Fairness',
    short: 'Ethics',
    description: 'Bias amplification, fairness metrics, responsible AI.',
    defaultObjectives: ['minimizeRisk', 'calibratedConfidenceGap'],
    promptHints: [
      'Assess bias amplification cascades, fairness metric drift under distribution shift, and responsible AI guardrail effectiveness.'
    ],
    firstOrderHint: 'Identify bias amplification through agent decision loops, fairness metric degradation from data drift, transparency gaps in agent reasoning, and disparate impact risks.',
    cascadeHint: 'Show how initial bias compounds through feedback loops, how fairness violations erode trust across demographics, and how opacity in agent decisions creates accountability gaps.',
    synthesisHint: 'Prioritize fairness monitoring: demographic parity tracking, bias audit cadence, transparency report generation, and human-in-the-loop override checkpoints.',
    kpis: ['Demographic parity delta', 'Bias audit frequency', 'Transparency report coverage']
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
