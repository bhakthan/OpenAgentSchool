// Execution steps for Deep Agents pattern (TypeScript codeExample line mappings)
export interface ExecutionStep {
  id: string;
  title: string;
  description: string;
  startLine?: number;
  endLine?: number;
}

// Line numbers correspond to the codeExample string (1-based)
export const deepAgentsExecutionSteps: ExecutionStep[] = [
  {
    id: 'header-imports',
    title: 'Header & Imports',
    description: 'Introduces LangGraph / Azure OpenAI context and imports core creation utilities.',
    startLine: 1,
    endLine: 4
  },
  {
    id: 'research-tool',
    title: 'Research Tool Definition',
    description: 'Defines internetSearch tool leveraging Azure Cognitive Search for structured web data.',
    startLine: 5,
    endLine: 28
  },
  {
    id: 'research-subagent',
    title: 'Research Sub-Agent',
    description: 'Configures specialized researcher with focused prompt and tool access.',
    startLine: 30,
    endLine: 39
  },
  {
    id: 'critique-subagent',
    title: 'Critique Sub-Agent',
    description: 'Defines quality assurance agent offering structural and factual critique.',
    startLine: 41,
    endLine: 53
  },
  {
    id: 'main-instructions',
    title: 'Main Agent Instructions',
    description: 'Comprehensive multi-step research & report generation workflow specification.',
    startLine: 55,
    endLine: 74
  },
  {
    id: 'agent-construction',
    title: 'Deep Agent Construction',
    description: 'Instantiates deep agent with subagents, model configuration, and tools.',
    startLine: 76,
    endLine: 91
  },
  {
    id: 'usage-function',
    title: 'Usage Function',
    description: 'runDeepAgent orchestrates invocation passing user research directive and logs outputs.',
    startLine: 93,
    endLine: 104
  },
  {
    id: 'invoke',
    title: 'Execution Invocation',
    description: 'Executes the deep agent workflow and handles promise rejection.',
    startLine: 106,
    endLine: 106
  }
];
