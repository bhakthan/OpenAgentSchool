import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import {
  loadSettings,
  saveSettings as persistSettings,
  clearSettings as removeSettings,
  isUsingCustomSettings,
  exportSettingsJSON,
  importSettingsJSON,
  type UserSettings,
} from '@/lib/userSettings';

interface UserSettingsContextValue {
  settings: UserSettings;
  /** Replace the entire settings object and persist */
  updateSettings: (next: UserSettings) => void;
  /** Partially merge into existing settings */
  patchSettings: (partial: Partial<UserSettings>) => void;
  /** Wipe all user settings from localStorage */
  clearSettings: () => void;
  /** Whether the learner has stored any custom config */
  isCustom: boolean;
  /** Download settings as JSON */
  exportJSON: () => string;
  /** Import JSON and merge into current settings */
  importJSON: (json: string) => void;
}

const UserSettingsContext = createContext<UserSettingsContextValue | null>(null);

export const UserSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<UserSettings>(loadSettings);
  const [isCustom, setIsCustom] = useState(isUsingCustomSettings);

  const updateSettings = useCallback((next: UserSettings) => {
    persistSettings(next);
    setSettings(next);
    setIsCustom(true);
  }, []);

  const patchSettings = useCallback((partial: Partial<UserSettings>) => {
    setSettings(prev => {
      const merged: UserSettings = {
        ...prev,
        ...partial,
        providers: { ...prev.providers, ...(partial.providers ?? {}) },
        backends: { ...prev.backends, ...(partial.backends ?? {}) },
      };
      persistSettings(merged);
      setIsCustom(true);
      return merged;
    });
  }, []);

  const clearAll = useCallback(() => {
    removeSettings();
    const defaults = loadSettings(); // returns defaults when nothing is stored
    setSettings(defaults);
    setIsCustom(false);
  }, []);

  const exportJSON = useCallback(() => exportSettingsJSON(), []);

  const importJSON = useCallback((json: string) => {
    const merged = importSettingsJSON(json);
    setSettings(merged);
    setIsCustom(true);
  }, []);

  const value = useMemo<UserSettingsContextValue>(
    () => ({ settings, updateSettings, patchSettings, clearSettings: clearAll, isCustom, exportJSON, importJSON }),
    [settings, updateSettings, patchSettings, clearAll, isCustom, exportJSON, importJSON],
  );

  return <UserSettingsContext.Provider value={value}>{children}</UserSettingsContext.Provider>;
};

export function useUserSettings(): UserSettingsContextValue {
  const ctx = useContext(UserSettingsContext);
  if (!ctx) {
    throw new Error('useUserSettings must be used within <UserSettingsProvider>');
  }
  return ctx;
}
