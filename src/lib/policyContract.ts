import type { LearningProfile, LearningLevel, LearningLens, LearningRole } from '@/lib/userSettings';

export type PolicyModuleKey =
  | 'knowledge-search'
  | 'agents-console'
  | 'adoption-playbook'
  | 'adoption-forms'
  | 'velocity-workshop';

export type PolicyEffect = 'allow' | 'deny';

export interface PolicyRuleCondition {
  min_level?: LearningLevel;
  roles?: LearningRole[];
  lenses?: LearningLens[];
}

export interface PolicyRule {
  id: string;
  target: PolicyModuleKey;
  effect: PolicyEffect;
  reason: string;
  condition: PolicyRuleCondition;
  priority: number;
  source: string;
}

export interface PolicyBundle {
  bundle_id: string;
  name: string;
  version: string;
  source: string;
  rules: PolicyRule[];
}

export interface PolicyEvaluationResponse {
  user_id: number;
  learning_profile: LearningProfile;
  bundle: PolicyBundle;
  modules: Record<PolicyModuleKey, boolean>;
  explanations: Record<PolicyModuleKey, string[]>;
}

export interface PolicySimulationRequest {
  learning_profile: LearningProfile;
}
