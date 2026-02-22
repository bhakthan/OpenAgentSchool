import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { fetchEffectivePolicy, simulatePolicy } from '@/lib/api/policy';
import type { PolicyEvaluationResponse, PolicyModuleKey } from '@/lib/policyContract';
import type { LearningProfile } from '@/lib/userSettings';
import { hasModuleAccess } from '@/lib/accessControl';
import { useUserSettings } from '@/contexts/UserSettingsContext';

interface EffectivePolicyContextValue {
  policy: PolicyEvaluationResponse | null;
  loading: boolean;
  error: string | null;
  refreshPolicy: () => Promise<void>;
  simulateForProfile: (profile: LearningProfile) => Promise<PolicyEvaluationResponse>;
  canAccess: (module: PolicyModuleKey) => boolean;
}

const EffectivePolicyContext = createContext<EffectivePolicyContextValue | null>(null);

export const EffectivePolicyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { settings } = useUserSettings();
  const [policy, setPolicy] = useState<PolicyEvaluationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshPolicy = useCallback(async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setPolicy(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const next = await fetchEffectivePolicy();
      setPolicy(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to evaluate policy');
      setPolicy(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const simulateForProfile = useCallback(async (profile: LearningProfile) => {
    return simulatePolicy(profile);
  }, []);

  useEffect(() => {
    refreshPolicy();
  }, [refreshPolicy, settings.learningProfile]);

  const canAccess = useCallback(
    (module: PolicyModuleKey) => {
      if (policy?.modules?.[module] !== undefined) {
        return policy.modules[module];
      }
      return hasModuleAccess(settings.learningProfile, module);
    },
    [policy, settings.learningProfile],
  );

  const value = useMemo<EffectivePolicyContextValue>(
    () => ({ policy, loading, error, refreshPolicy, simulateForProfile, canAccess }),
    [policy, loading, error, refreshPolicy, simulateForProfile, canAccess],
  );

  return <EffectivePolicyContext.Provider value={value}>{children}</EffectivePolicyContext.Provider>;
};

export function useEffectivePolicy(): EffectivePolicyContextValue {
  const ctx = useContext(EffectivePolicyContext);
  if (!ctx) {
    throw new Error('useEffectivePolicy must be used within <EffectivePolicyProvider>');
  }
  return ctx;
}
