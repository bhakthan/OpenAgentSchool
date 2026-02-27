import { describe, expect, it } from 'vitest';
import {
  DEFAULT_FEATURE_FLAGS,
  FEATURE_FLAGS_STORAGE_KEY,
  loadFeatureFlags,
  resetFeatureFlags,
  setFeatureFlag,
} from '@/lib/featureFlags';

describe('featureFlags', () => {
  it('loads defaults when storage is empty', () => {
    localStorage.removeItem(FEATURE_FLAGS_STORAGE_KEY);
    expect(loadFeatureFlags()).toEqual(DEFAULT_FEATURE_FLAGS);
  });

  it('updates and persists a feature flag', () => {
    setFeatureFlag('phase1-lab', false);
    expect(loadFeatureFlags()['phase1-lab']).toBe(false);
  });

  it('resets to defaults', () => {
    setFeatureFlag('phase1-lab', false);
    const reset = resetFeatureFlags();
    expect(reset).toEqual(DEFAULT_FEATURE_FLAGS);
    expect(loadFeatureFlags()['phase1-lab']).toBe(true);
  });
});

