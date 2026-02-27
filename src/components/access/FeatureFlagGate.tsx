import React from 'react';
import { Link } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { FeatureFlagKey } from '@/lib/featureFlags';
import { useFeatureFlags } from '@/contexts/FeatureFlagContext';

interface FeatureFlagGateProps {
  flag: FeatureFlagKey;
  title: string;
  children: React.ReactNode;
}

export const FeatureFlagGate: React.FC<FeatureFlagGateProps> = ({ flag, title, children }) => {
  const { isEnabled } = useFeatureFlags();
  if (isEnabled(flag)) return <>{children}</>;

  return (
    <Alert className="mx-auto max-w-2xl mt-4">
      <AlertTitle>Feature currently disabled</AlertTitle>
      <AlertDescription>
        <p className="mb-3">{title} is turned off by feature flag controls.</p>
        <Button asChild variant="outline" size="sm">
          <Link to="/settings">Open Settings</Link>
        </Button>
      </AlertDescription>
    </Alert>
  );
};

