/**
 * Super Critical Learning Components
 * 
 * Main exports for the SCL feature system
 */

export { SuperCriticalLearning } from './SuperCriticalLearning';
export { SCLSession } from './SCLSession';
export { SCLControls } from './SCLControls';
export { SCLEffectGraph } from './SCLEffectGraph';
export { SCLSynthesis } from './SCLSynthesis';
export { SCLRubric } from './SCLRubric';

// Re-export types for convenience
export type {
  SCLSession as SCLSessionType,
  SCLMode,
  SCLObjective,
  SCLDomain,
  SCLEffectNode,
  SCLLeap,
  SCLSynthesis as SCLSynthesisType,
  SCLScore,
  SCLConstraints,
  SCLUIState,
} from '@/types/supercritical';
