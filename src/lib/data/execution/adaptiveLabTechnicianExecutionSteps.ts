export interface ExecutionStep { id: string; title: string; description: string; startLine: number; endLine: number; }

export const adaptiveLabTechnicianExecutionSteps: ExecutionStep[] = [
  {
    id: 'bootstrap-agent',
    title: 'Bootstrap lab technician agent',
    description: 'Instantiate the agent with LIMS, robotics, and sensor tooling plus ISO-17025 guardrails.',
    startLine: 1,
    endLine: 17
  },
  {
    id: 'plan-assay',
    title: 'Compose assay plan',
    description: 'Fetch sample context from LIMS and generate an executable assay plan with calibration baselines.',
    startLine: 19,
    endLine: 33
  },
  {
    id: 'execute-plan',
    title: 'Execute assay with telemetry',
    description: 'Run the plan while streaming telemetry and routing policy breaches to scientist notifications.',
    startLine: 35,
    endLine: 64
  },
  {
    id: 'archive-run',
    title: 'Archive provenance',
    description: 'Persist plan, telemetry, and anomaly artifacts back into the LIMS for compliance.',
    startLine: 66,
    endLine: 74
  },
  {
    id: 'recalibrate',
    title: 'Recalibrate instrumentation',
    description: 'Plan and execute corrective calibration missions when diagnostics detect drift.',
    startLine: 76,
    endLine: 96
  }
];
