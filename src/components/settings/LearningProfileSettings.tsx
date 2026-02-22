import React, { useMemo, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUserSettings } from '@/contexts/UserSettingsContext';
import { syncLearningProfile } from '@/lib/api/profile';
import type { LearningLens, LearningLevel, LearningRole } from '@/lib/userSettings';
import { Users, StackSimple, Database, Plugs } from '@phosphor-icons/react';

const LENS_OPTIONS: Array<{ id: LearningLens; label: string; icon: React.ReactNode }> = [
  { id: 'executive-leader', label: 'Executive & Leaders', icon: <Users size={16} className="text-muted-foreground" /> },
  { id: 'technology-architect', label: 'Technology AI Engineers & Architects', icon: <StackSimple size={16} className="text-muted-foreground" /> },
  { id: 'data-engineering', label: 'Data Focused Engineers', icon: <Database size={16} className="text-muted-foreground" /> },
  { id: 'infrastructure-operations', label: 'Infrastructure & Operations', icon: <Plugs size={16} className="text-muted-foreground" /> },
];

export const LearningProfileSettings: React.FC = () => {
  const { settings, patchSettings } = useUserSettings();
  const [syncState, setSyncState] = useState<'idle' | 'saving' | 'done' | 'error'>('idle');
  const [syncMessage, setSyncMessage] = useState<string>('');
  const backendSyncEnabled = import.meta.env.VITE_PROFILE_SYNC_ENABLED !== 'false';

  const profile = settings.learningProfile;
  const canSync = backendSyncEnabled;

  const toggleLens = (lens: LearningLens, checked: boolean) => {
    const nextLenses = checked
      ? Array.from(new Set([...profile.lenses, lens]))
      : profile.lenses.filter(item => item !== lens);
    const nextPrimaryLens = profile.primaryLens && nextLenses.includes(profile.primaryLens) ? profile.primaryLens : undefined;
    patchSettings({
      learningProfile: {
        ...profile,
        lenses: nextLenses,
        primaryLens: nextPrimaryLens,
      },
    });
  };

  const compoundModeLabel = useMemo(() => {
    if (profile.lenses.length <= 1) return 'Single lens';
    return `Compound mode (${profile.lenses.length} lenses)`;
  }, [profile.lenses.length]);

  const onSync = async () => {
    setSyncState('saving');
    setSyncMessage('');
    try {
      await syncLearningProfile(profile);
      setSyncState('done');
      setSyncMessage('Profile synced to backend.');
    } catch (error) {
      setSyncState('error');
      setSyncMessage(error instanceof Error ? error.message : 'Profile sync failed.');
    }
  };

  return (
    <section className="space-y-4 rounded-lg border border-border p-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Personalization Dial</h2>
        <p className="text-xs text-muted-foreground">
          Set your level and combine multiple lenses to shape recommendations without hiding content.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="learning-role" className="text-sm">Access Role</Label>
        <Select
          value={profile.role}
          onValueChange={value => patchSettings({
            learningProfile: { ...profile, role: value as LearningRole },
          })}
        >
          <SelectTrigger id="learning-role" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="learner">Learner</SelectItem>
            <SelectItem value="executive">Executive / Leader</SelectItem>
            <SelectItem value="architect">AI Engineer / Architect</SelectItem>
            <SelectItem value="data-engineer">Data Focused Engineer</SelectItem>
            <SelectItem value="operations">Infrastructure / Operations</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="learning-level" className="text-sm">Proficiency Level</Label>
        <Select
          value={profile.level}
          onValueChange={value => patchSettings({
            learningProfile: { ...profile, level: value as LearningLevel },
          })}
        >
          <SelectTrigger id="learning-level" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-sm">Lens Composition</Label>
        <div className="space-y-2">
          {LENS_OPTIONS.map(lens => (
            <label key={lens.id} className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={profile.lenses.includes(lens.id)}
                onCheckedChange={checked => toggleLens(lens.id, checked === true)}
              />
              {lens.icon}
              <span>{lens.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="primary-lens" className="text-sm">Primary Lens (optional)</Label>
        <Select
          value={profile.primaryLens ?? 'none'}
          onValueChange={value => patchSettings({
            learningProfile: {
              ...profile,
              primaryLens: value === 'none' ? undefined : (value as LearningLens),
            },
          })}
        >
          <SelectTrigger id="primary-lens" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No primary lens</SelectItem>
            {LENS_OPTIONS
              .filter(lens => profile.lenses.includes(lens.id))
              .map(lens => (
                <SelectItem key={lens.id} value={lens.id}>{lens.label}</SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Badge variant="outline">{profile.role}</Badge>
        <Badge variant={profile.level === 'advanced' ? 'default' : 'secondary'}>{profile.level}</Badge>
        <Badge variant="outline">{compoundModeLabel}</Badge>
      </div>

      <div className="space-y-2">
        <Button variant="outline" onClick={onSync} disabled={syncState === 'saving' || !canSync}>
          {syncState === 'saving' ? 'Syncing...' : 'Sync profile to backend (optional)'}
        </Button>
        <p className="text-[11px] text-muted-foreground">
          {backendSyncEnabled
            ? 'This uses your configured Core API URL and updates `/api/v1/users/me/profile`.'
            : 'Backend sync is disabled (VITE_PROFILE_SYNC_ENABLED=false). Local personalization still works.'}
        </p>
        {syncMessage && (
          <p className={`text-xs ${syncState === 'error' ? 'text-destructive' : 'text-emerald-600 dark:text-emerald-400'}`}>
            {syncMessage}
          </p>
        )}
      </div>
    </section>
  );
};
