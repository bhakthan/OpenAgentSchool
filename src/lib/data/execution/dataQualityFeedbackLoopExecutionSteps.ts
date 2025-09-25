export interface ExecutionStep { id: string; title: string; description: string; startLine: number; endLine: number; }

export const dataQualityFeedbackLoopExecutionSteps: ExecutionStep[] = [
  { id: 'detect', title: 'Check Detector Stream', description: 'Pull the next anomaly event and exit early if nothing needs repair.', startLine: 1, endLine: 6 },
  { id: 'profile', title: 'Profile Impacted Columns', description: 'Invoke the profiler in targeted mode to inspect the affected columns.', startLine: 7, endLine: 11 },
  { id: 'propose', title: 'Generate Repair Candidates', description: 'Ask the proposer for repair options and iterate through the top choices.', startLine: 12, endLine: 17 },
  { id: 'validate', title: 'Ground and Validate Fix', description: 'Ground each candidate, validate KPI stability, and return once a repair sticks.', startLine: 18, endLine: 27 }
];