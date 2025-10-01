// NOTE: These execution steps demonstrate multi-agent conversation patterns that are now part of 
// Microsoft Agent Framework (https://aka.ms/agentframework), which unifies AutoGen (prototyping)
// and Semantic Kernel (production) into a single framework with graph-based workflows, built-in
// observability, and enterprise-ready features. For production implementations, see:
// https://github.com/microsoft/agent-framework

// Execution steps for Multi-Agent Conversation pattern (TypeScript codeExample line mapping)
export interface ExecutionStep {
  id: string;
  title: string;
  description: string;
  startLine?: number;
  endLine?: number;
}

// Line numbers refer to TypeScript codeExample above (1-based)
export const autogenMultiAgentExecutionSteps: ExecutionStep[] = [
  {
    id: 'ts-header',
    title: 'Header & Commentary',
    description: 'Pattern banner and high-level description of multi-agent collaboration intent.',
    startLine: 1,
    endLine: 6
  },
  {
    id: 'types-stubs',
    title: 'Types & LLM Stub',
    description: 'Define AgentMessage interface and mock llm() to emulate provider responses, enabling deterministic flow.',
    startLine: 8,
    endLine: 21
  },
  {
    id: 'base-agent',
    title: 'BaseAgent Abstraction',
    description: 'Abstract base encapsulates shared name/systemMessage and prompt construction for derived agents.',
    startLine: 23,
    endLine: 38
  },
  {
    id: 'assistant-agent',
    title: 'AssistantAgent Implementation',
    description: 'Concrete assistant generates responses and emits TERMINATE sentinel when model signals completion.',
    startLine: 40,
    endLine: 55
  },
  {
    id: 'user-proxy',
    title: 'UserProxyAgent (Initial Task Injection)',
    description: 'User proxy injects the initial software requirement once then becomes passive observer.',
    startLine: 57,
    endLine: 72
  },
  {
    id: 'group-chat',
    title: 'GroupChat Container',
    description: 'Holds agents, shared transcript, round limit, and termination detection logic.',
    startLine: 74,
    endLine: 90
  },
  {
    id: 'manager-loop',
    title: 'GroupChatManager Orchestration Loop',
    description: 'Round-robin over agents building transcript until termination or max rounds reached.',
    startLine: 92,
    endLine: 115
  },
  {
    id: 'example-usage',
    title: 'Example Usage (Commented)',
    description: 'Shows role-specific agent instantiation for Product Manager, Developer, QA and run invocation.',
    startLine: 117,
    endLine: 138
  },
  {
    id: 'format-helper',
    title: 'Transcript Formatting Helper',
    description: 'Utility to render final conversation log for inspection or UI display.',
    startLine: 140,
    endLine: 146
  },
  {
    id: 'exports',
    title: 'Module Exports',
    description: 'Expose core classes/utilities for external composition or tests.',
    startLine: 148,
    endLine: 156
  }
];
