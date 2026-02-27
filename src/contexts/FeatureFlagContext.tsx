import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  DEFAULT_FEATURE_FLAGS,
  FeatureFlagKey,
  FeatureFlags,
  loadFeatureFlags,
  resetFeatureFlags,
  saveFeatureFlags,
} from '@/lib/featureFlags';

interface FeatureFlagContextValue {
  flags: FeatureFlags;
  isEnabled: (key: FeatureFlagKey) => boolean;
  setFlag: (key: FeatureFlagKey, enabled: boolean) => void;
  resetToDefaults: () => void;
}

const FeatureFlagContext = createContext<FeatureFlagContextValue | null>(null);

export const FeatureFlagProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [flags, setFlags] = useState<FeatureFlags>(loadFeatureFlags);

  const setFlag = (key: FeatureFlagKey, enabled: boolean) => {
    setFlags(prev => {
      const next = { ...prev, [key]: enabled };
      saveFeatureFlags(next);
      return next;
    });
  };

  const resetToDefaults = () => {
    const next = resetFeatureFlags();
    setFlags(next);
  };

  const value = useMemo<FeatureFlagContextValue>(() => ({
    flags,
    isEnabled: (key: FeatureFlagKey) => flags[key] ?? DEFAULT_FEATURE_FLAGS[key],
    setFlag,
    resetToDefaults,
  }), [flags]);

  return (
    <FeatureFlagContext.Provider value={value}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

export function useFeatureFlags(): FeatureFlagContextValue {
  const ctx = useContext(FeatureFlagContext);
  if (!ctx) throw new Error('useFeatureFlags must be used within <FeatureFlagProvider>');
  return ctx;
}

