import React from 'react';
import { Link } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { loadSettings } from '@/lib/userSettings';
import { hasModuleAccess, type ModuleAccessKey } from '@/lib/accessControl';

interface ModuleAccessGateProps {
  module: ModuleAccessKey;
  title: string;
  children: React.ReactNode;
}

export const ModuleAccessGate: React.FC<ModuleAccessGateProps> = ({ module, title, children }) => {
  const profile = loadSettings().learningProfile;
  if (hasModuleAccess(profile, module)) return <>{children}</>;

  return (
    <Alert className="mx-auto max-w-2xl mt-4">
      <AlertTitle>Access limited by profile</AlertTitle>
      <AlertDescription>
        <p className="mb-3">Your current role/level/lens settings do not allow access to {title}.</p>
        <Button asChild variant="outline" size="sm">
          <Link to="/settings">Update Personalization Dial</Link>
        </Button>
      </AlertDescription>
    </Alert>
  );
};
