export interface ExecutionStep { id: string; title: string; description: string; startLine: number; endLine: number; }

export const inventoryGuardianExecutionSteps: ExecutionStep[] = [
  {
    id: 'construct-agent',
    title: 'Construct guardian agent and twin',
    description: 'Initialize the inventory twin, guardian agent, and supporting work order and messaging tooling.',
    startLine: 1,
    endLine: 18
  },
  {
    id: 'anomaly-channel',
    title: 'Subscribe to anomaly channel',
    description: 'Register anomaly listeners that notify operations teams and record analytics.',
    startLine: 20,
    endLine: 27
  },
  {
    id: 'reconcile-sensor',
    title: 'Reconcile sensor packet',
    description: 'Update the twin, reason about variance, and optionally execute automated recovery plans.',
    startLine: 29,
    endLine: 57
  },
  {
    id: 'refresh-twin',
    title: 'Refresh digital twin',
    description: 'Collect telemetry for a site and refresh the twin snapshot for downstream analysis.',
    startLine: 59,
    endLine: 70
  }
];
