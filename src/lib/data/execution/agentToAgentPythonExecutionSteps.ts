export interface AgentToAgentPythonExecutionStep {
  id: string;
  title: string;
  description: string;
  startLine: number;
  endLine: number;
}

export const agentToAgentPythonExecutionSteps: AgentToAgentPythonExecutionStep[] = [
  {
    id: 'message-models',
    title: 'Define enums & message dataclass',
    description: 'Declare MessageType and AgentMessage structures for typed inter-agent packets.',
    startLine: 1,
    endLine: 22
  },
  {
    id: 'agent-init',
    title: 'Agent lifecycle & loop',
    description: 'Instantiate agent state, async queues, and background processing loop controls.',
    startLine: 24,
    endLine: 45
  },
  {
    id: 'receive-handle',
    title: 'Receive & handle messages',
    description: 'Queue inbound messages and branch on request, broadcast, or notification types.',
    startLine: 51,
    endLine: 65
  },
  {
    id: 'process-respond',
    title: 'Process tasks & respond',
    description: 'Execute the delegated task, craft a response payload, and emit it to the coordinator.',
    startLine: 67,
    endLine: 90
  },
  {
    id: 'send-message',
    title: 'Send targeted messages',
    description: 'Publish direct requests with correlation tracking via the communication system.',
    startLine: 91,
    endLine: 105
  },
  {
    id: 'broadcast-handlers',
    title: 'Handle broadcasts & notifications',
    description: 'Provide convenience hooks for broadcast or notification semantics.',
    startLine: 107,
    endLine: 113
  },
  {
    id: 'system-init',
    title: 'Initialize communication system',
    description: 'Maintain agent registry, message history, and pending response futures.',
    startLine: 115,
    endLine: 126
  },
  {
    id: 'system-send',
    title: 'Route messages & track responses',
    description: 'Broadcast or target deliveries and resolve waiting futures for responses.',
    startLine: 127,
    endLine: 147
  },
  {
    id: 'coordinate-task',
    title: 'Coordinate distributed task',
    description: 'Create a delegation plan, dispatch subtasks, and await responses from specialist agents.',
    startLine: 148,
    endLine: 185
  },
  {
    id: 'helpers',
    title: 'Delegation helpers & aggregation',
    description: 'Generate delegation plans and combine agent outputs into a summary artifact.',
    startLine: 187,
    endLine: 204
  }
];
