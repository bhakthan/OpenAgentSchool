import { PatternData } from './types';
import { AdaptiveLabTechnicianVisual } from '@/components/visualization/business-use-cases/AdaptiveLabTechnicianVisual';

export const adaptiveLabTechnicianPattern: PatternData = {
  id: 'adaptive-lab-technician',
  name: 'Adaptive Lab Technician',
  description: 'Instrument-aware agent that prepares samples, orchestrates assays, and flags anomalies before they compromise lab throughput.',
  category: 'Advanced',
  useCases: [
    'Automated sample prep with guardrailed tool control',
    'Daily instrument readiness sweeps and calibration handoffs',
    'Adaptive assay execution with mid-run parameter tuning'
  ],
  whenToUse: 'Adopt when your wet labs run complex assay queues that need responsive scheduling, tool orchestration, and compliance-grade audit trails without adding headcount.',
  nodes: [
    {
      id: 'sample-intake',
      type: 'input',
      data: { label: 'Sample Intake', nodeType: 'input', description: 'Barcodes + chain of custody' },
      position: { x: 60, y: 220 }
    },
    {
      id: 'lab-orchestrator',
      type: 'default',
      data: { label: 'Lab Orchestrator', nodeType: 'planner', description: 'LLM plans assay steps + tool usage' },
      position: { x: 300, y: 160 }
    },
    {
      id: 'instrument-hub',
      type: 'default',
      data: { label: 'Instrument Hub', nodeType: 'tool', description: 'Drivers + digital twin of lab assets' },
      position: { x: 300, y: 320 }
    },
    {
      id: 'assay-runner',
      type: 'default',
      data: { label: 'Assay Runner', nodeType: 'executor', description: 'Robotic pipettor / incubator control' },
      position: { x: 560, y: 220 }
    },
    {
      id: 'quality-guardian',
      type: 'default',
      data: { label: 'Quality Guardian', nodeType: 'evaluator', description: 'Sensor fusion + policy checks' },
      position: { x: 800, y: 160 }
    },
    {
      id: 'human-review',
      type: 'default',
      data: { label: 'Scientist Console', nodeType: 'aggregator', description: 'Interventions + approvals' },
      position: { x: 800, y: 320 }
    },
    {
      id: 'lab-ledger',
      type: 'output',
      data: { label: 'Lab Ledger Update', nodeType: 'output', description: 'Results + compliance log' },
      position: { x: 1040, y: 220 }
    }
  ],
  edges: [
    { id: 'edge-intake-orchestrator', source: 'sample-intake', target: 'lab-orchestrator', animated: true },
    { id: 'edge-intake-hub', source: 'sample-intake', target: 'instrument-hub', animated: true },
    { id: 'edge-orchestrator-runner', source: 'lab-orchestrator', target: 'assay-runner', animated: true },
    { id: 'edge-hub-runner', source: 'instrument-hub', target: 'assay-runner', animated: true, label: 'Tool commands' },
    { id: 'edge-runner-quality', source: 'assay-runner', target: 'quality-guardian', animated: true, label: 'Telemetry' },
    { id: 'edge-quality-orchestrator', source: 'quality-guardian', target: 'lab-orchestrator', animated: true, label: 'Parameter tuning' },
    { id: 'edge-quality-human', source: 'quality-guardian', target: 'human-review', animated: true, label: 'Escalations' },
    { id: 'edge-human-runner', source: 'human-review', target: 'assay-runner', animated: true, label: 'Overrides' },
    { id: 'edge-quality-ledger', source: 'quality-guardian', target: 'lab-ledger', animated: true },
    { id: 'edge-runner-ledger', source: 'assay-runner', target: 'lab-ledger', animated: true }
  ],
  codeExample: `// Adaptive Lab Technician pseudocode (TypeScript)
import { createAgent } from '@openagentschool/automation';

const labTech = createAgent({
  id: 'lab-tech-01',
  planner: 'gemini-1.5-pro',
  tools: {
    lims: createLimsClient(),
    robotics: createRoboticsController(),
    sensors: createSensorBus()
  },
  guardrails: ['policy:iso-17025', 'fail-safe:halt-on-temp-drift']
});

export async function runAssay(sampleId: string) {
  const assayPlan = await labTech.plan({
    goal: \`Process sample \${sampleId}\`,
    context: await labTech.tools.lims.fetchSample(sampleId)
  });

  return labTech.execute(assayPlan, {
    onTelemetry: event => labTech.tools.lims.log(event),
    onPolicyBreach: alert => notifyScientist(alert)
  });
}
`,
  implementation: [
    'Connect the LIMS queue, scheduling constraints, and assay recipes to the planning context.',
    'Expose calibrated instrument APIs (pipettors, incubators, sequencers) with dry-run modes for validation.',
    'Stream temperature, vibration, and reagent telemetry into an evaluator that can halt or retune parameters.',
    'Provide a scientist console for approvals, overrides, and audit signature capture.',
    'Archive every run with provenance: plan version, sensor timelines, and anomaly decisions.'
  ],
  advantages: [
    'Balances throughput gains with compliance-grade traceability and human oversight.',
    'Adapts assay steps mid-run based on telemetry rather than rerunning entire batches.',
    'Reuses core orchestration primitives across multiple lab lines or shifts.'
  ],
  limitations: [
    'Requires high-fidelity digital twin and vendor API coverage for instruments.',
    'Policy tuning must prevent over-sensitive halts that stall production.',
    'Change management needed to trust automated plan adjustments.'
  ],
  relatedPatterns: ['mobile-manipulator-steward', 'action-grounding-verification', 'policy-gated-tool-invocation'],
  evaluation: 'Score autonomous assay completion, calibration drift detection, human intervention frequency, and compliance audit completeness.',
  completeCode: `import { createAgent } from '@openagentschool/automation';
import type { AssayPlan, PolicyBreach, TelemetryEvent } from './types';

const labTechnician = createAgent({
  id: 'lab-tech-automation',
  planner: 'gemini-1.5-pro',
  memory: {
    episodic: 'vertex-vector-store://lab/runs',
    policies: 'vertex-vector-store://lab/policies'
  },
  tools: {
    lims: createLimsClient(),
    robotics: createRoboticsController({ dryRun: true }),
    sensors: createSensorBus()
  },
  guardrails: ['policy:iso-17025', 'fail-safe:halt-on-temp-drift']
});

async function composeAssayPlan(sampleId: string): Promise<AssayPlan> {
  const sample = await labTechnician.tools.lims.fetchSample(sampleId);
  return labTechnician.plan({
  goal: \`Process sample \${sampleId}\`,
    context: {
      queuePosition: sample.queuePosition,
      assayRecipeId: sample.recipeId,
      calibrationBaseline: await labTechnician.tools.lims.fetchCalibration(sample.instrumentId)
    }
  });
}

export async function runAssay(sampleId: string) {
  const plan = await composeAssayPlan(sampleId);
  const execution = await labTechnician.execute(plan, {
    onTelemetry: (event: TelemetryEvent) => labTechnician.tools.lims.log(event),
  onPolicyBreach: async (breach: PolicyBreach) => {
      await notifyScientist(breach);
      return 'halt-and-await-instructions';
    },
    onPlanAdjustment: update => labTechnician.tools.lims.log({ type: 'plan-adjustment', update })
  });

  await labTechnician.tools.lims.archiveRun({
    sampleId,
    planVersion: plan.version,
    telemetry: execution.telemetry,
    anomalies: execution.anomalies
  });

  return execution.summary;
}

export async function reconcileCalibration(sampleId: string, metric: string) {
  const diagnostics = await labTechnician.tools.sensors.getDiagnostics(metric);
  if (diagnostics.withinLimits) return 'calibration-ok';

  const correctivePlan = await labTechnician.plan({
  goal: \`Recalibrate instrument for \${sampleId}\`,
    context: { diagnostics }
  });

  return labTechnician.execute(correctivePlan, {
    onTelemetry: event => labTechnician.tools.lims.log(event),
    onPolicyBreach: notifyScientist
  });
}

async function notifyScientist(alert: PolicyBreach) {
  await labTechnician.tools.lims.createEscalation({
    alert,
    channel: 'scientist-console',
    createdAt: new Date().toISOString()
  });
}
`,
  businessUseCase: {
    industry: 'Biopharma & Diagnostics',
    description: 'A CLIA/ISO-accredited lab deploys the adaptive technician to prep oncology assay batches overnight. Gemini orchestrates pipetting, incubation, and QC telemetry while operators receive escalation packets when sensors breach tolerances.',
    visualization: AdaptiveLabTechnicianVisual,
    enlightenMePrompt: `
Design a deployment plan for the Adaptive Lab Technician in a genomics lab.

Cover:
- Integration steps to sync LIMS queues, assay recipes, and calibration baselines.
- Guardrail configuration that enforces compliance policies and halts on drift signals.
- Scientist console workflows for approvals, overrides, and audit signatures.
- Metrics proving readiness before expanding to additional lab lines.
`
  },

  velocityProfile: {
    impact: 'low',
    timeToImplement: '2-4 weeks',
    complexityReduction: 'Low - Requires custom hardware integration, LIMS APIs, and regulatory compliance validation',
    reusabilityScore: 5,
    learningCurve: 'steep',
    velocityPractices: [
      'Operational Instrumentation - Critical for CLIA/ISO compliance; sensor telemetry, audit trails, and escalation alerts required',
      'Failure Scenario Libraries - Equipment failures, reagent depletion, calibration drift extensively documented for safety',
      'Pattern Fluency - Specialized robotics pattern for automated labs, biotech manufacturing, pharmaceutical QC',
      'Evaluation Automation - Assay success rate, batch quality metrics, and regulatory audit compliance tracked'
    ]
  }
};
