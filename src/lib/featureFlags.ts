export type FeatureFlagKey =
  | 'phase1-lab'
  | 'realtime-sandbox'
  | 'offline-progress-sync'
  | 'spaced-repetition-engine'
  | 'project-tracks'
  | 'pair-programming'
  | 'skill-passport'
  | 'community-voting'
  | 'cohorts'
  | 'safety-lab'
  | 'sandbox';

export type FeatureFlags = Record<FeatureFlagKey, boolean>;

export const FEATURE_FLAGS_STORAGE_KEY = 'oas.featureFlags.v1';

export const DEFAULT_FEATURE_FLAGS: FeatureFlags = {
  'phase1-lab': true,
  'realtime-sandbox': false,
  'offline-progress-sync': false,
  'spaced-repetition-engine': false,
  'project-tracks': true,
  'pair-programming': true,
  'skill-passport': true,
  'community-voting': true,
  'cohorts': true,
  'safety-lab': true,
  'sandbox': true,
};

export function loadFeatureFlags(): FeatureFlags {
  if (typeof window === 'undefined') return { ...DEFAULT_FEATURE_FLAGS };
  try {
    const raw = localStorage.getItem(FEATURE_FLAGS_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_FEATURE_FLAGS };
    const parsed = JSON.parse(raw) as Partial<FeatureFlags>;
    return {
      ...DEFAULT_FEATURE_FLAGS,
      ...parsed,
    };
  } catch {
    return { ...DEFAULT_FEATURE_FLAGS };
  }
}

export function saveFeatureFlags(flags: FeatureFlags): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(FEATURE_FLAGS_STORAGE_KEY, JSON.stringify(flags));
}

export function setFeatureFlag(key: FeatureFlagKey, enabled: boolean): FeatureFlags {
  const next = { ...loadFeatureFlags(), [key]: enabled };
  saveFeatureFlags(next);
  return next;
}

export function resetFeatureFlags(): FeatureFlags {
  const defaults = { ...DEFAULT_FEATURE_FLAGS };
  saveFeatureFlags(defaults);
  return defaults;
}

export function isFeatureEnabled(key: FeatureFlagKey): boolean {
  return !!loadFeatureFlags()[key];
}

