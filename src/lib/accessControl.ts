import type { LearningLevel, LearningLens, LearningProfile, LearningRole } from '@/lib/userSettings';

export type ModuleAccessKey =
  | 'knowledge-search'
  | 'agents-console'
  | 'adoption-playbook'
  | 'adoption-forms'
  | 'velocity-workshop';

type AccessPolicy = {
  minLevel?: LearningLevel;
  roles?: LearningRole[];
  lenses?: LearningLens[];
};

const LEVEL_ORDER: Record<LearningLevel, number> = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
};

const MODULE_POLICIES: Record<ModuleAccessKey, AccessPolicy> = {
  'knowledge-search': {
    minLevel: 'intermediate',
    roles: ['architect', 'data-engineer', 'operations', 'admin'],
    lenses: ['technology-architect', 'data-engineering', 'infrastructure-operations'],
  },
  'agents-console': {
    minLevel: 'intermediate',
    roles: ['architect', 'operations', 'admin'],
    lenses: ['technology-architect', 'infrastructure-operations'],
  },
  'adoption-playbook': {
    roles: ['executive', 'admin'],
    lenses: ['executive-leader'],
  },
  'adoption-forms': {
    roles: ['executive', 'admin'],
    lenses: ['executive-leader'],
  },
  'velocity-workshop': {
    minLevel: 'intermediate',
    roles: ['executive', 'architect', 'data-engineer', 'operations', 'admin'],
  },
};

export function hasModuleAccess(profile: LearningProfile, key: ModuleAccessKey): boolean {
  const gatingEnabled =
    profile.role !== 'learner' ||
    profile.level !== 'intermediate' ||
    profile.lenses.length > 0 ||
    !!profile.primaryLens;
  if (!gatingEnabled) return true;

  const policy = MODULE_POLICIES[key];
  if (!policy) return true;

  const meetsLevel = !policy.minLevel || LEVEL_ORDER[profile.level] >= LEVEL_ORDER[policy.minLevel];
  const meetsRole = !policy.roles || policy.roles.includes(profile.role);
  const meetsLens = !policy.lenses || policy.lenses.some(lens => profile.lenses.includes(lens));

  return meetsLevel && (meetsRole || meetsLens);
}
