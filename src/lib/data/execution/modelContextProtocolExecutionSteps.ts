// Execution steps for Model Context Protocol (Legal Services coordination)
// Line numbers map to the TypeScript codeExample inside modelContextProtocolPattern

export const modelContextProtocolExecutionSteps = [
  {
    id: 'imports-system-skeleton',
    title: 'Imports & System Skeleton',
    description: 'Import MCP primitives and declare the core system class shell with context + agent registry fields.',
    startLine: 1,
    endLine: 7
  },
  {
    id: 'constructor-agent-registry',
    title: 'Constructor & Agent Registry',
    description: 'Initialize McpContextManager and register specialized legal agents (research, drafting, compliance).',
    startLine: 8,
    endLine: 15
  },
  {
    id: 'request-intake-initial-message',
    title: 'Request Intake & Initial MCP Message',
    description: 'processLegalRequest creates a conversation ID and structured MCP message with protocol metadata and context envelope.',
    startLine: 17,
    endLine: 38
  },
  {
    id: 'context-store-route-aggregate',
    title: 'Context Store, Route & Aggregate Call',
    description: 'Persist initial contextual metadata, invoke routing to agents, then aggregate coordinated responses.',
    startLine: 40,
    endLine: 52
  },
  {
    id: 'routing-determination',
    title: 'Routing & Agent Message Construction',
    description: 'Determine required agents and build per‑agent MCP messages preserving trace & conversation IDs.',
    startLine: 54,
    endLine: 76
  },
  {
    id: 'agent-processing-context-update',
    title: 'Agent Processing & Context Update',
    description: 'Invoke each agent, append its response to conversation history ensuring sequential turn tracking.',
    startLine: 77,
    endLine: 89
  },
  {
    id: 'aggregation-function',
    title: 'Aggregation & Legal Response Assembly',
    description: 'Combine research, drafting, and compliance outputs into a structured, client‑ready legal analysis.',
    startLine: 92,
    endLine: 116
  },
  {
    id: 'agent-selection-specialized-context',
    title: 'Agent Selection & Specialized Context',
    description: 'Heuristics pick agents; specialized context blocks tailor data sources, templates, and regulation sets.',
    startLine: 118,
    endLine: 166
  },
  {
    id: 'id-generation-helpers',
    title: 'ID/Trace Generation Utilities',
    description: 'Helper methods produce unique conversation, message, and trace identifiers for auditability.',
    startLine: 168,
    endLine: 178
  },
  {
    id: 'context-manager',
    title: 'Context Manager Implementation',
    description: 'Manages per‑conversation metadata, messages, turn counter, and retrieval APIs.',
    startLine: 181,
    endLine: 219
  },
  {
    id: 'usage-example',
    title: 'Usage Example',
    description: 'Instantiate the MCP system and process a real legal compliance request.',
    startLine: 221,
    endLine: 226
  }
] as const;

export type ModelContextProtocolExecutionStep = typeof modelContextProtocolExecutionSteps[number];
