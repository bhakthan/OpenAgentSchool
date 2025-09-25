export interface ExecutionStep { id: string; title: string; description: string; startLine: number; endLine: number; }

export const actionGroundingVerificationExecutionSteps: ExecutionStep[] = [
  { id: 'loop', title: 'Retry Loop', description: 'Attempt grounding up to three times, restarting when validations fail.', startLine: 1, endLine: 1 },
  { id: 'syntax', title: 'Syntax & Schema Validation', description: 'Run generated code through syntax and schema validators.', startLine: 2, endLine: 4 },
  { id: 'policy', title: 'Policy Gate', description: 'Require policy approval before moving forward.', startLine: 5, endLine: 5 },
  { id: 'dryRun', title: 'Dry Run Execution', description: 'Execute the candidate in a sandbox and return success when the dry run passes.', startLine: 6, endLine: 9 },
  { id: 'fallback', title: 'Failure Fallback', description: 'Return a failure artifact when all attempts are exhausted.', startLine: 10, endLine: 10 }
];