import React, { useState } from 'react';
import { useEffectivePolicy } from '@/contexts/EffectivePolicyContext';
import { useUserSettings } from '@/contexts/UserSettingsContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { PolicyModuleKey } from '@/lib/policyContract';

const MODULE_LABELS: Record<PolicyModuleKey, string> = {
  'knowledge-search': 'Knowledge Search',
  'agents-console': 'Agents Console',
  'adoption-playbook': 'Adoption Playbook',
  'adoption-forms': 'Adoption Forms',
  'velocity-workshop': 'Velocity Workshop',
};

export const EffectiveAccessPolicyPanel: React.FC = () => {
  const { policy, loading, error, refreshPolicy } = useEffectivePolicy();

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Effective Access Policies</h3>
        <Button variant="outline" size="sm" onClick={refreshPolicy} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>

      {error && (
        <Alert>
          <AlertTitle>Policy unavailable</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!policy ? (
        <p className="text-sm text-muted-foreground">
          Sign in to load cloud policy evaluation. Local fallback remains active.
        </p>
      ) : (
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium">Module</th>
                <th className="text-left p-3 font-medium">Access</th>
                <th className="text-left p-3 font-medium">Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {(Object.keys(MODULE_LABELS) as PolicyModuleKey[]).map((key) => (
                <tr key={key}>
                  <td className="p-3">{MODULE_LABELS[key]}</td>
                  <td className="p-3">
                    <Badge variant={policy.modules[key] ? 'default' : 'outline'}>
                      {policy.modules[key] ? 'Allowed' : 'Restricted'}
                    </Badge>
                  </td>
                  <td className="p-3 text-xs text-muted-foreground">
                    {(policy.explanations[key] || []).join(' ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export const PolicySimulationPanel: React.FC = () => {
  const { settings } = useUserSettings();
  const { simulateForProfile } = useEffectivePolicy();
  const [result, setResult] = useState<Record<PolicyModuleKey, boolean> | null>(null);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runSimulation = async () => {
    setRunning(true);
    setError(null);
    try {
      const response = await simulateForProfile(settings.learningProfile);
      setResult(response.modules);
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : 'Policy simulation failed');
    } finally {
      setRunning(false);
    }
  };

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Preview &amp; Simulation</h3>
        <Button variant="outline" size="sm" onClick={runSimulation} disabled={running}>
          {running ? 'Simulating...' : 'Simulate Current Dial'}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Simulate uses your current role, level, and lens selections without saving new policy rules.
      </p>

      {error && (
        <Alert>
          <AlertTitle>Simulation unavailable</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {(Object.keys(MODULE_LABELS) as PolicyModuleKey[]).map((key) => (
            <div key={key} className="rounded-md border border-border p-3 text-sm flex items-center justify-between">
              <span>{MODULE_LABELS[key]}</span>
              <Badge variant={result[key] ? 'default' : 'outline'}>
                {result[key] ? 'Allowed' : 'Restricted'}
              </Badge>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
