export interface ExecutionStep { id: string; title: string; description: string; startLine: number; endLine: number; }

export const timeboxPairProgrammerExecutionSteps: ExecutionStep[] = [
  { id: 'plan', title: 'Plan Cycle', description: 'Derive plan, duration, and checklist from goal.', startLine: 1, endLine: 3 },
  { id: 'return', title: 'Return Cycle Packet', description: 'Return plan array with review checklist for the session.', startLine: 1, endLine: 3 }
];
