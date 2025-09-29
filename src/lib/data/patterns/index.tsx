// Export all pattern types
export * from './types';
export * from './evaluationRegistry';

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
export { sensoryReasoningEnhancementPattern } from './sensory-reasoning-enhancement';
export { socraticCoachPattern } from './socraticCoach';
export { conceptToProjectPattern } from './conceptToProject';
export { errorWhispererPattern } from './errorWhisperer';
export { knowledgeMapNavigatorPattern } from './knowledgeMapNavigator';
export { peerReviewSimulatorPattern } from './peerReviewSimulator';
export { toolUseCoachPattern } from './toolUseCoach';
export { contextCuratorPattern } from './contextCurator';
export { rubricRaterPattern } from './rubricRater';
export { selfRemediationLoopPattern } from './selfRemediationLoop';
export { spacedRepetitionPlannerPattern } from './spacedRepetitionPlanner';
export { challengeLadderGeneratorPattern } from './challengeLadderGenerator';
export { reflectionJournalerPattern } from './reflectionJournaler';
export { handoffSummarizerPattern } from './handoffSummarizer';
export { misconceptionDetectorPattern } from './misconceptionDetector';
export { timeboxPairProgrammerPattern } from './timeboxPairProgrammer';
export { perceptionNormalizationPattern } from './perceptionNormalization';
export { schemaAwareDecompositionPattern } from './schemaAwareDecomposition';
export { budgetConstrainedExecutionPattern } from './budgetConstrainedExecution';
export { actionGroundingVerificationPattern } from './actionGroundingVerification';
export { policyGatedInvocationPattern } from './policyGatedInvocation';
export { dataQualityFeedbackLoopPattern } from './dataQualityFeedbackLoop';
export { queryIntentStructuredAccessPattern } from './queryIntentStructuredAccess';
export { strategyMemoryReplayPattern } from './strategyMemoryReplay';
export { mobileManipulatorStewardPattern } from './mobileManipulatorSteward';

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
import { sensoryReasoningEnhancementPattern } from './sensory-reasoning-enhancement';
import { socraticCoachPattern } from './socraticCoach';
import { conceptToProjectPattern } from './conceptToProject';
import { errorWhispererPattern } from './errorWhisperer';
import { knowledgeMapNavigatorPattern } from './knowledgeMapNavigator';
import { peerReviewSimulatorPattern } from './peerReviewSimulator';
import { toolUseCoachPattern } from './toolUseCoach';
import { contextCuratorPattern } from './contextCurator';
import { rubricRaterPattern } from './rubricRater';
import { selfRemediationLoopPattern } from './selfRemediationLoop';
import { spacedRepetitionPlannerPattern } from './spacedRepetitionPlanner';
import { challengeLadderGeneratorPattern } from './challengeLadderGenerator';
import { reflectionJournalerPattern } from './reflectionJournaler';
import { handoffSummarizerPattern } from './handoffSummarizer';
import { misconceptionDetectorPattern } from './misconceptionDetector';
import { timeboxPairProgrammerPattern } from './timeboxPairProgrammer';
import { perceptionNormalizationPattern } from './perceptionNormalization';
import { schemaAwareDecompositionPattern } from './schemaAwareDecomposition';
import { budgetConstrainedExecutionPattern } from './budgetConstrainedExecution';
import { actionGroundingVerificationPattern } from './actionGroundingVerification';
import { policyGatedInvocationPattern } from './policyGatedInvocation';
import { dataQualityFeedbackLoopPattern } from './dataQualityFeedbackLoop';
import { queryIntentStructuredAccessPattern } from './queryIntentStructuredAccess';
import { strategyMemoryReplayPattern } from './strategyMemoryReplay';
import { mobileManipulatorStewardPattern } from './mobileManipulatorSteward';
import { patternEvaluationRegistry } from './evaluationRegistry';

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
  sensoryReasoningEnhancementPattern,
  socraticCoachPattern,
  conceptToProjectPattern,
  errorWhispererPattern,
  knowledgeMapNavigatorPattern,
  peerReviewSimulatorPattern,
  toolUseCoachPattern,
  contextCuratorPattern,
  rubricRaterPattern,
  selfRemediationLoopPattern,
  spacedRepetitionPlannerPattern,
  challengeLadderGeneratorPattern,
  reflectionJournalerPattern,
  handoffSummarizerPattern,
  misconceptionDetectorPattern,
  timeboxPairProgrammerPattern,
  perceptionNormalizationPattern,
  schemaAwareDecompositionPattern,
  budgetConstrainedExecutionPattern,
  actionGroundingVerificationPattern,
  policyGatedInvocationPattern,
  dataQualityFeedbackLoopPattern,
  queryIntentStructuredAccessPattern,
  strategyMemoryReplayPattern,
  mobileManipulatorStewardPattern,
  // autogenMultiAgentPattern,
];

for (const pattern of agentPatterns) {
  const evaluationProfile = patternEvaluationRegistry[pattern.id];
  if (evaluationProfile) {
    pattern.evaluationProfile = evaluationProfile;
  }
}

// Export specific patterns for easy access
export const chainOfThoughtPattern = promptChainingPattern; // Using prompt-chaining as chain of thought pattern
