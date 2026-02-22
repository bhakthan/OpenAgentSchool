import { beforeEach, describe, expect, it } from 'vitest';
import { importSettingsJSON, loadSettings, saveSettings } from '@/lib/userSettings';

describe('UserSettings learningProfile', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads default learning profile when none is stored', () => {
    const settings = loadSettings();
    expect(settings.learningProfile.level).toBe('intermediate');
    expect(settings.learningProfile.lenses).toEqual([]);
    expect(settings.learningProfile.primaryLens).toBeUndefined();
  });

  it('persists selected level and compound lenses', () => {
    const settings = loadSettings();
    saveSettings({
      ...settings,
      learningProfile: {
        level: 'advanced',
        lenses: ['executive-leader', 'technology-architect'],
        primaryLens: 'executive-leader',
      },
    });

    const next = loadSettings();
    expect(next.learningProfile.level).toBe('advanced');
    expect(next.learningProfile.lenses).toEqual(['executive-leader', 'technology-architect']);
    expect(next.learningProfile.primaryLens).toBe('executive-leader');
  });

  it('merges imported JSON into learning profile without dropping defaults', () => {
    const merged = importSettingsJSON(JSON.stringify({
      learningProfile: {
        level: 'beginner',
        lenses: ['data-engineering'],
      },
    }));

    expect(merged.learningProfile.level).toBe('beginner');
    expect(merged.learningProfile.lenses).toEqual(['data-engineering']);
    expect(merged.learningProfile.primaryLens).toBeUndefined();
    expect(merged.sttPreference).toBe('auto');
  });
});
