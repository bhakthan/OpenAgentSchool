export interface ExecutionStep {
  id: string;
  title: string;
  description: string;
  startLine?: number;
  endLine?: number;
}

// Precise line mappings added for Agent Evaluation TS codeExample.
export const agentEvaluationExecutionSteps: ExecutionStep[] = [
  {
    id: 'init-profile',
    title: 'Initialize & Profile Agent',
    description: 'Create / load agent profile (capabilities, limitations, safety constraints) using profiling prompt.',
    startLine: 1,
    endLine: 74
  },
  {
    id: 'load-suite',
    title: 'Load or Generate Test Suite',
    description: 'Fetch cached suite or dynamically generate capability, performance, behavior, and safety test cases.',
    startLine: 75,
    endLine: 156
  },
  {
    id: 'coordination',
    title: 'Coordinate Evaluation',
    description: 'Invoke TestCoordinator to iterate through all test cases and dispatch specialized runners.',
    startLine: 157,
    endLine: 210
  },
  {
    id: 'execute-tests',
    title: 'Execute Test Categories',
    description: 'Run capability, performance, behavior, and safety tests; capture outputs, durations, flags, and pass status.',
    startLine: 211,
    endLine: 345
  },
  {
    id: 'aggregate-metrics',
    title: 'Aggregate Metrics',
    description: 'Compute per-category pass rates and overall pass rate; timestamp each metric.',
    startLine: 346,
    endLine: 402
  },
  {
    id: 'recommendations',
    title: 'Generate Recommendations',
    description: 'Analyze failed tests & unmet thresholds to produce targeted improvement actions.',
    startLine: 403,
    endLine: 449
  },
  {
    id: 'risk-assessment',
    title: 'Assess Risk',
    description: 'Evaluate safety / behavior weaknesses to derive risk level, concerns, and mitigations.',
    startLine: 450,
    endLine: 493
  },
  {
    id: 'report-store',
    title: 'Compose Report & Store History',
    description: 'Assemble evaluation result object (scores, metrics, recommendations, risk) and persist to history.',
    startLine: 494,
    endLine: 560
  }
];
