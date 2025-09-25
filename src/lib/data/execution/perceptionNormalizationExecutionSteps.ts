export interface ExecutionStep { id: string; title: string; description: string; startLine: number; endLine: number; }

export const perceptionNormalizationExecutionSteps: ExecutionStep[] = [
  { id: 'collect', title: 'Collect Profiles', description: 'Iterate over tables to fetch schema metadata and profiling samples.', startLine: 1, endLine: 7 },
  { id: 'assemble', title: 'Assemble InfoBox', description: 'Build the structured info box with schema, profiles, lineage, and governance tags.', startLine: 8, endLine: 18 },
  { id: 'compact', title: 'Apply Size Guardrail', description: 'Trim profiles when the serialized payload exceeds the max byte budget.', startLine: 19, endLine: 25 },
  { id: 'hash', title: 'Hash Artifact', description: 'Derive a deterministic hash before returning the info box.', startLine: 26, endLine: 27 }
];