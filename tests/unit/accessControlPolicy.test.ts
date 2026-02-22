import { describe, expect, it } from 'vitest';
import { hasModuleAccess } from '@/lib/accessControl';
import type { LearningProfile } from '@/lib/userSettings';

const defaultProfile: LearningProfile = {
  role: 'learner',
  level: 'intermediate',
  lenses: [],
};

describe('accessControl policy matrix', () => {
  it('bypasses gating for default profile', () => {
    expect(hasModuleAccess(defaultProfile, 'knowledge-search')).toBe(true);
    expect(hasModuleAccess(defaultProfile, 'agents-console')).toBe(true);
    expect(hasModuleAccess(defaultProfile, 'adoption-playbook')).toBe(true);
  });

  it('allows executive lens for adoption modules', () => {
    const profile: LearningProfile = {
      role: 'learner',
      level: 'intermediate',
      lenses: ['executive-leader'],
      primaryLens: 'executive-leader',
    };
    expect(hasModuleAccess(profile, 'adoption-playbook')).toBe(true);
    expect(hasModuleAccess(profile, 'adoption-forms')).toBe(true);
  });

  it('enforces min level for technical modules', () => {
    const profile: LearningProfile = {
      role: 'architect',
      level: 'beginner',
      lenses: ['technology-architect'],
      primaryLens: 'technology-architect',
    };
    expect(hasModuleAccess(profile, 'knowledge-search')).toBe(false);
    expect(hasModuleAccess(profile, 'agents-console')).toBe(false);
  });

  it('supports blended persona access when one lens/role matches', () => {
    const profile: LearningProfile = {
      role: 'executive',
      level: 'advanced',
      lenses: ['executive-leader', 'technology-architect'],
      primaryLens: 'executive-leader',
    };
    expect(hasModuleAccess(profile, 'adoption-playbook')).toBe(true);
    expect(hasModuleAccess(profile, 'agents-console')).toBe(true);
    expect(hasModuleAccess(profile, 'velocity-workshop')).toBe(true);
  });
});
