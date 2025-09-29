export interface ExecutionStep {
  id: string;
  title: string;
  description: string;
  startLine: number;
  endLine: number;
}

export const mobileManipulatorStewardExecutionSteps: ExecutionStep[] = [
  {
    id: 'configure-agent',
    title: 'Configure embodied steward agent',
    description: 'Instantiate the steward with Gemini perception, skill-graph planner, navigation and manipulation controllers, safety guardian policies, and status narrator.',
    startLine: 1,
    endLine: 14
  },
  {
    id: 'ingest-context',
    title: 'Ground in facility context',
    description: 'Observe the guest location, gather multimodal scene state, and synthesize a fulfillment plan that sequences navigation and manipulation skills.',
    startLine: 16,
    endLine: 19
  },
  {
    id: 'execute-plan',
    title: 'Execute plan with guardrails',
    description: 'Iterate through each plan step, executing skills while routing safety interventions and human overrides through the reporter.',
    startLine: 21,
    endLine: 26
  },
  {
    id: 'close-loop',
    title: 'Archive proof of completion',
    description: 'Collect telemetry artifacts then broadcast the fulfillment completion payload back to operators and guests.',
    startLine: 28,
    endLine: 29
  }
];
