export interface ExecutionStep { id: string; title: string; description: string; startLine: number; endLine: number; }

export const emergencyResponseMateExecutionSteps: ExecutionStep[] = [
  {
    id: 'initialize-agent',
    title: 'Initialize crisis agent',
    description: 'Configure the Emergency Response Mate with communication channels, knowledge bases, and guardrails.',
    startLine: 1,
    endLine: 11
  },
  {
    id: 'handle-incident',
    title: 'Handle incoming incident',
    description: 'Classify the incident, compose a response playbook, broadcast assignments, and archive after-action data.',
    startLine: 13,
    endLine: 38
  },
  {
    id: 'classification-support',
    title: 'Support classification',
    description: 'Derive enriched incident classification with contextual attachments.',
    startLine: 40,
    endLine: 49
  },
  {
    id: 'compose-plan',
    title: 'Compose response plan',
    description: 'Build playbooks using location context and policy ordering.',
    startLine: 51,
    endLine: 58
  },
  {
    id: 'archive',
    title: 'Archive incident artifacts',
    description: 'Persist the final incident package with timestamps for compliance.',
    startLine: 60,
    endLine: 66
  }
];
