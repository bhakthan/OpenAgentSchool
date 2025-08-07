// Python execution steps for MCP pattern (line mapping pending refinement)
export const modelContextProtocolPythonExecutionSteps = [
  { id: 'py-imports-dataclasses', title: 'Imports & Dataclasses', description: 'Python imports and McpMessage dataclass definition.' },
  { id: 'py-context-manager', title: 'Context Manager', description: 'McpContextManager storing, updating, and retrieving conversation context.' },
  { id: 'py-legal-agent-base', title: 'Base LegalAgent', description: 'Abstract LegalAgent with process and response generation hook.' },
  { id: 'py-research-agent', title: 'Research Agent', description: 'LegalResearchAgent implementing precedent and statute synthesis.' },
  { id: 'py-drafting-agent', title: 'Drafting Agent', description: 'DocumentDraftingAgent producing contract clause templates.' },
  { id: 'py-compliance-agent', title: 'Compliance Agent', description: 'ComplianceAgent performing regulatory checklist and recommendations.' },
  { id: 'py-mcp-system-init', title: 'System Init', description: 'ModelContextProtocolSystem initializes context manager and specialized agents.' },
  { id: 'py-process-request', title: 'Process Request', description: 'Creates conversation, initial MCP message, stores initial metadata.' },
  { id: 'py-routing', title: 'Routing & Agent Invocation', description: 'Determines required agents, builds agent messages, updates context.' },
  { id: 'py-aggregation', title: 'Aggregation', description: 'Combines research, drafting and compliance outputs into coordinated legal analysis.' },
  { id: 'py-agent-helpers', title: 'Helpers', description: 'Agent selection, specialized context provisioning, case type identification.' },
  { id: 'py-usage', title: 'Usage Example', description: 'Async main demonstrating end-to-end MCP request handling.' }
] as const;

export type ModelContextProtocolPythonExecutionStep = typeof modelContextProtocolPythonExecutionSteps[number];
