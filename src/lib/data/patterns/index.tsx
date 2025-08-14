// Export all pattern types
export * from './types';

// Export individual patterns
export { reactAgentPattern } from './reactAgent';
export { parallelizationPattern } from './parallelization';
export { promptChainingPattern } from './promptChaining';
export { agenticRAGPattern } from './agenticRAG';
export { codeActPattern } from './codeAct.tsx';
export { selfReflectionPattern } from './selfReflection';
export { modernToolUsePattern } from './modernToolUse';
export { modelContextProtocolPattern } from './modelContextProtocol';
export { agentToAgentPattern } from './agentToAgent';
export { computerUsePattern } from './computerUse';
export { voiceAgentPattern } from './voiceAgent';
export { routingPattern } from './routing';
export { orchestratorWorkerPattern } from './orchestratorWorker';
export { evaluatorOptimizerPattern } from './evaluatorOptimizer';
export { autonomousWorkflowPattern } from './autonomousWorkflow';
export { deepResearcherPattern } from './deepResearcher';
export { deepAgentsPattern } from './deep-agents';
export { agentEvaluationPattern } from './agentEvaluation';
export { autogenPattern } from './autogen';
export { autogenMultiAgentPattern } from './autogenMultiAgent';
export { swarmIntelligencePattern } from './swarm-intelligence';

// Export consolidated pattern array
import { reactAgentPattern } from './reactAgent';
import { parallelizationPattern } from './parallelization';
import { promptChainingPattern } from './promptChaining';
import { agenticRAGPattern } from './agenticRAG';
import { codeActPattern } from './codeAct.tsx';
import { selfReflectionPattern } from './selfReflection';
import { modernToolUsePattern } from './modernToolUse';
import { modelContextProtocolPattern } from './modelContextProtocol';
import { agentToAgentPattern } from './agentToAgent';
import { computerUsePattern } from './computerUse';
import { voiceAgentPattern } from './voiceAgent';
import { routingPattern } from './routing';
import { orchestratorWorkerPattern } from './orchestratorWorker';
import { evaluatorOptimizerPattern } from './evaluatorOptimizer';
import { autonomousWorkflowPattern } from './autonomousWorkflow';
import { deepResearcherPattern } from './deepResearcher';
import { deepAgentsPattern } from './deep-agents';
import { agentEvaluationPattern } from './agentEvaluation';
import { autogenPattern } from './autogen';
import { autogenMultiAgentPattern } from './autogenMultiAgent';
import { swarmIntelligencePattern } from './swarm-intelligence';

export const agentPatterns = [
  reactAgentPattern,
  parallelizationPattern,
  promptChainingPattern,
  agenticRAGPattern,
  codeActPattern,
  selfReflectionPattern,
  modernToolUsePattern,
  modelContextProtocolPattern,
  agentToAgentPattern,
  computerUsePattern,
  voiceAgentPattern,
  routingPattern,
  orchestratorWorkerPattern,
  evaluatorOptimizerPattern,
  autonomousWorkflowPattern,
  deepResearcherPattern,
  deepAgentsPattern,
  agentEvaluationPattern,
  autogenPattern,
  swarmIntelligencePattern,
  // autogenMultiAgentPattern,
];

// Export specific patterns for easy access
export const chainOfThoughtPattern = promptChainingPattern; // Using prompt-chaining as chain of thought pattern
