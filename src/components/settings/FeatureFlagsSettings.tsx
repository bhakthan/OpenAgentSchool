import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useFeatureFlags } from '@/contexts/FeatureFlagContext';
import type { FeatureFlagKey } from '@/lib/featureFlags';

const FEATURE_FLAG_COPY: Record<FeatureFlagKey, { label: string; description: string }> = {
  'phase1-lab': {
    label: 'Phase 1 Lab',
    description: 'Gates the /phase1-lab route and nav entry.',
  },
  'realtime-sandbox': {
    label: 'Realtime Sandbox',
    description: 'Reserved gate for SSE/WebSocket streaming features.',
  },
  'offline-progress-sync': {
    label: 'Offline Progress Sync',
    description: 'Reserved gate for IndexedDB sync queue rollout.',
  },
  'spaced-repetition-engine': {
    label: 'Spaced Repetition Engine',
    description: 'Reserved gate for SM-2 review scheduling.',
  },
};

export const FeatureFlagsSettings: React.FC = () => {
  const { flags, setFlag, resetToDefaults } = useFeatureFlags();

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">Feature Flags</h3>
          <p className="text-xs text-muted-foreground">Local toggles stored in browser storage for safe staged rollouts.</p>
        </div>
        <Button variant="outline" size="sm" onClick={resetToDefaults}>Reset defaults</Button>
      </div>
      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-3 font-medium">Feature</th>
              <th className="text-left p-3 font-medium">Status</th>
              <th className="text-right p-3 font-medium">Toggle</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {(Object.keys(FEATURE_FLAG_COPY) as FeatureFlagKey[]).map((key) => (
              <tr key={key}>
                <td className="p-3">
                  <div className="font-medium">{FEATURE_FLAG_COPY[key].label}</div>
                  <div className="text-xs text-muted-foreground">{FEATURE_FLAG_COPY[key].description}</div>
                </td>
                <td className="p-3">
                  <Badge variant={flags[key] ? 'default' : 'outline'}>
                    {flags[key] ? 'Enabled' : 'Disabled'}
                  </Badge>
                </td>
                <td className="p-3 text-right">
                  <Switch
                    checked={!!flags[key]}
                    onCheckedChange={(checked) => setFlag(key, checked)}
                    aria-label={`Toggle ${FEATURE_FLAG_COPY[key].label}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

