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
import { swarmIntelligenceSystemDesign } from './swarm-intelligence';
import { sensoryReasoningEnhancementSystemDesign } from './sensory-reasoning-enhancement';
import { socraticCoachSystemDesign } from './socraticCoach';
import { conceptToProjectSystemDesign } from './conceptToProject';
import { errorWhispererSystemDesign } from './errorWhisperer';
import { knowledgeMapNavigatorSystemDesign } from './knowledgeMapNavigator';
import { peerReviewSimulatorSystemDesign } from './peerReviewSimulator';
import { toolUseCoachSystemDesign } from './toolUseCoach';
import { contextCuratorSystemDesign } from './contextCurator';
import { rubricRaterSystemDesign } from './rubricRater';
import { selfRemediationLoopSystemDesign } from './selfRemediationLoop';
import { spacedRepetitionPlannerSystemDesign } from './spacedRepetitionPlanner';
import { reflectionJournalerSystemDesign } from './reflectionJournaler';
import { handoffSummarizerSystemDesign } from './handoffSummarizer';
import { perceptionNormalizationSystemDesign } from './perceptionNormalization';
import { schemaAwareDecompositionSystemDesign } from './schemaAwareDecomposition';
import { actionGroundingVerificationSystemDesign } from './actionGroundingVerification';
import { budgetConstrainedExecutionSystemDesign } from './budgetConstrainedExecution';
import { policyGatedInvocationSystemDesign } from './policyGatedInvocation';
import { dataQualityFeedbackLoopSystemDesign } from './dataQualityFeedbackLoop';
import { queryIntentStructuredAccessSystemDesign } from './queryIntentStructuredAccess';
import { strategyMemoryReplaySystemDesign } from './strategyMemoryReplay';
import { hierarchicalDocumentIntelligenceSystemDesign } from './hierarchicalDocumentIntelligence';
import { mobileManipulatorStewardSystemDesign } from './mobileManipulatorSteward';
import { adaptiveLabTechnicianSystemDesign } from './adaptiveLabTechnician';
import { inventoryGuardianSystemDesign } from './inventoryGuardian';
import { emergencyResponseMateSystemDesign } from './emergencyResponseMate';

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
export { swarmIntelligenceSystemDesign } from './swarm-intelligence';
export { sensoryReasoningEnhancementSystemDesign } from './sensory-reasoning-enhancement';
export { socraticCoachSystemDesign } from './socraticCoach';
export { conceptToProjectSystemDesign } from './conceptToProject';
export { errorWhispererSystemDesign } from './errorWhisperer';
export { knowledgeMapNavigatorSystemDesign } from './knowledgeMapNavigator';
export { peerReviewSimulatorSystemDesign } from './peerReviewSimulator';
export { toolUseCoachSystemDesign } from './toolUseCoach';
export { contextCuratorSystemDesign } from './contextCurator';
export { rubricRaterSystemDesign } from './rubricRater';
export { selfRemediationLoopSystemDesign } from './selfRemediationLoop';
export { spacedRepetitionPlannerSystemDesign } from './spacedRepetitionPlanner';
export { reflectionJournalerSystemDesign } from './reflectionJournaler';
export { handoffSummarizerSystemDesign } from './handoffSummarizer';
export { perceptionNormalizationSystemDesign } from './perceptionNormalization';
export { schemaAwareDecompositionSystemDesign } from './schemaAwareDecomposition';
export { actionGroundingVerificationSystemDesign } from './actionGroundingVerification';
export { budgetConstrainedExecutionSystemDesign } from './budgetConstrainedExecution';
export { policyGatedInvocationSystemDesign } from './policyGatedInvocation';
export { dataQualityFeedbackLoopSystemDesign } from './dataQualityFeedbackLoop';
export { queryIntentStructuredAccessSystemDesign } from './queryIntentStructuredAccess';
export { strategyMemoryReplaySystemDesign } from './strategyMemoryReplay';
export { hierarchicalDocumentIntelligenceSystemDesign } from './hierarchicalDocumentIntelligence';
export { mobileManipulatorStewardSystemDesign } from './mobileManipulatorSteward';
export { adaptiveLabTechnicianSystemDesign } from './adaptiveLabTechnician';
export { inventoryGuardianSystemDesign } from './inventoryGuardian';
export { emergencyResponseMateSystemDesign } from './emergencyResponseMate';

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
  'swarm-intelligence': swarmIntelligenceSystemDesign,
  'sensory-reasoning-enhancement': sensoryReasoningEnhancementSystemDesign,
  'socratic-coach': socraticCoachSystemDesign,
  'concept-to-project': conceptToProjectSystemDesign,
  'error-whisperer': errorWhispererSystemDesign,
  'knowledge-map-navigator': knowledgeMapNavigatorSystemDesign,
  'peer-review-simulator': peerReviewSimulatorSystemDesign,
  'tool-use-coach': toolUseCoachSystemDesign,
  'context-curator': contextCuratorSystemDesign,
  'rubric-rater': rubricRaterSystemDesign,
  'self-remediation-loop': selfRemediationLoopSystemDesign,
  'spaced-repetition-planner': spacedRepetitionPlannerSystemDesign,
  'reflection-journaler': reflectionJournalerSystemDesign,
  'handoff-summarizer': handoffSummarizerSystemDesign,
  'perception-normalization': perceptionNormalizationSystemDesign,
  'schema-aware-decomposition': schemaAwareDecompositionSystemDesign,
  'action-grounding-verification': actionGroundingVerificationSystemDesign,
  'budget-constrained-execution': budgetConstrainedExecutionSystemDesign,
  'policy-gated-tool-invocation': policyGatedInvocationSystemDesign,
  'data-quality-feedback-repair-loop': dataQualityFeedbackLoopSystemDesign,
  'query-intent-structured-access': queryIntentStructuredAccessSystemDesign,
  'strategy-memory-replay': strategyMemoryReplaySystemDesign,
  'hierarchical-document-intelligence': hierarchicalDocumentIntelligenceSystemDesign,
  'mobile-manipulator-steward': mobileManipulatorStewardSystemDesign,
  'adaptive-lab-technician': adaptiveLabTechnicianSystemDesign,
  'inventory-guardian': inventoryGuardianSystemDesign,
  'emergency-response-mate': emergencyResponseMateSystemDesign,
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
