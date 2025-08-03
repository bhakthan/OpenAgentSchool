// Export types
export * from './types';

// Import individual patterns
import { pythonReActAgentSystemDesign } from './pythonReActAgent';
import { agenticRAGSystemDesign } from './agenticRAG';
import { codeActAgentSystemDesign } from './codeAct';
import { parallelizationAgentSystemDesign } from './parallelization';
import { promptChainingAgentSystemDesign } from './promptChaining';
import { agentEvaluationSystemDesign } from './agentEvaluation';
import { autonomousWorkflowSystemDesign } from './autonomousWorkflow';
import { computerUseSystemDesign } from './computerUse';
import { deepResearcherSystemDesign } from './deepResearcher';
import { evaluatorOptimizerSystemDesign } from './evaluatorOptimizer';
import { modernToolUseSystemDesign } from './modernToolUse';
import { selfReflectionSystemDesign } from './selfReflection';
import { voiceAgentSystemDesign } from './voiceAgent';
import { agentToAgentSystemDesign } from './agentToAgent';
import { autoGenMultiAgentSystemDesign } from './autoGenMultiAgent';
import { orchestratorWorkerSystemDesign } from './orchestratorWorker';
import { routingSystemDesign } from './routing';
import { modelContextProtocolSystemDesign } from './modelContextProtocol';
import { deepAgentsSystemDesign } from './deep-agents';

// Export individual patterns
export { pythonReActAgentSystemDesign } from './pythonReActAgent';
export { agenticRAGSystemDesign } from './agenticRAG';
export { codeActAgentSystemDesign } from './codeAct';
export { parallelizationAgentSystemDesign } from './parallelization';
export { promptChainingAgentSystemDesign } from './promptChaining';
export { agentEvaluationSystemDesign } from './agentEvaluation';
export { autonomousWorkflowSystemDesign } from './autonomousWorkflow';
export { computerUseSystemDesign } from './computerUse';
export { deepResearcherSystemDesign } from './deepResearcher';
export { evaluatorOptimizerSystemDesign } from './evaluatorOptimizer';
export { modernToolUseSystemDesign } from './modernToolUse';
export { selfReflectionSystemDesign } from './selfReflection';
export { voiceAgentSystemDesign } from './voiceAgent';
export { agentToAgentSystemDesign } from './agentToAgent';
export { autoGenMultiAgentSystemDesign } from './autoGenMultiAgent';
export { orchestratorWorkerSystemDesign } from './orchestratorWorker';
export { routingSystemDesign } from './routing';
export { modelContextProtocolSystemDesign } from './modelContextProtocol';
export { deepAgentsSystemDesign } from './deep-agents';

// Create a registry of all system design patterns
export const systemDesignPatterns = {
  'react-agent': pythonReActAgentSystemDesign,
  'agentic-rag': agenticRAGSystemDesign,
  'code-act': codeActAgentSystemDesign,
  'codeact-agent': codeActAgentSystemDesign, // Add mapping for codeAct pattern ID
  'parallelization': parallelizationAgentSystemDesign,
  'prompt-chaining': promptChainingAgentSystemDesign,
  'agent-evaluation': agentEvaluationSystemDesign,
  'autonomous-workflow': autonomousWorkflowSystemDesign,
  'computer-use': computerUseSystemDesign,
  'deep-researcher': deepResearcherSystemDesign,
  'evaluator-optimizer': evaluatorOptimizerSystemDesign,
  'modern-tool-use': modernToolUseSystemDesign,
  'self-reflection': selfReflectionSystemDesign,
  'voice-agent': voiceAgentSystemDesign,
  'agent-to-agent': agentToAgentSystemDesign,
  'autogen-multi-agent': autoGenMultiAgentSystemDesign,
  'orchestrator-worker': orchestratorWorkerSystemDesign,
  'routing': routingSystemDesign,
  'model-context-protocol': modelContextProtocolSystemDesign,
  'deep-agents': deepAgentsSystemDesign,
};

/**
 * Get a specific system design pattern by ID
 * @param patternId - The ID of the pattern to retrieve
 * @returns The system design pattern or null if not found
 */
export function getSystemDesignPattern(patternId: string) {
  return systemDesignPatterns[patternId] || null;
}

/**
 * Get all available system design pattern IDs
 * @returns Array of pattern IDs
 */
export function getAvailableSystemDesignPatterns(): string[] {
  return Object.keys(systemDesignPatterns);
}

/**
 * Check if a system design pattern exists for a given pattern ID
 * @param patternId - The ID to check
 * @returns True if the pattern exists
 */
export function hasSystemDesignPattern(patternId: string): boolean {
  return patternId in systemDesignPatterns;
}
