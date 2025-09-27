export interface AgentToAgentExecutionStep {
  id: string;
  title: string;
  description: string;
  startLine: number;
  endLine: number;
}

export const agentToAgentExecutionSteps: AgentToAgentExecutionStep[] = [
  {
    id: 'message-contract',
    title: 'Define message contract',
    description: 'Establish the AgentMessage interface with routing metadata, payload, and optional conversation tracking.',
    startLine: 1,
    endLine: 9
  },
  {
    id: 'register-agents',
    title: 'Register agents',
    description: 'Allow agents to join the communication system and receive a reference for future callbacks.',
    startLine: 12,
    endLine: 20
  },
  {
    id: 'dispatch-routing',
    title: 'Dispatch & routing',
    description: 'Push messages into history, broadcast to peers, or deliver to a targeted agent.',
    startLine: 22,
    endLine: 38
  },
  {
    id: 'coordinate-task',
    title: 'Coordinate delegated tasks',
    description: 'Coordinator analyzes the task, sends subtasks to specialists, and aggregates their responses.',
    startLine: 41,
    endLine: 75
  },
  {
    id: 'await-response',
    title: 'Await responses',
    description: 'Poll message history for matching responses and resolve once a reply arrives.',
    startLine: 78,
    endLine: 94
  },
  {
    id: 'agent-setup',
    title: 'Agent wiring',
    description: 'Provide constructor injection and allow agents to receive the shared communication system reference.',
    startLine: 97,
    endLine: 108
  },
  {
    id: 'handle-request',
    title: 'Handle incoming requests',
    description: 'Process tasks when a request arrives and trigger follow-up work such as sending responses.',
    startLine: 110,
    endLine: 118
  },
  {
    id: 'respond-to-coordinator',
    title: 'Respond to coordinator',
    description: 'Build response messages including correlation IDs and relay them back through the system.',
    startLine: 121,
    endLine: 137
  },
  {
    id: 'process-task',
    title: 'Process delegated task',
    description: 'Simulate task execution for the specialist agent prior to returning results.',
    startLine: 139,
    endLine: 142
  }
];
