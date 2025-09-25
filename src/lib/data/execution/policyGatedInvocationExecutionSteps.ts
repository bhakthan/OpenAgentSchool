export interface ExecutionStep { id: string; title: string; description: string; startLine: number; endLine: number; }

export const policyGatedInvocationExecutionSteps: ExecutionStep[] = [
  { id: 'map', title: 'Map Intent to Capability', description: 'Use the taxonomy to translate raw intent and parameters into a canonical capability.', startLine: 3, endLine: 4 },
  { id: 'risk', title: 'Score Risk', description: 'Run risk scoring on the capability and invocation parameters.', startLine: 5, endLine: 5 },
  { id: 'policy', title: 'Evaluate Policy Lattice', description: 'Ask the policy lattice for an allow or deny decision.', startLine: 6, endLine: 7 },
  { id: 'sign', title: 'Sign Approved Invocation', description: 'Attach a signature to permitted calls before returning.', startLine: 8, endLine: 9 }
];