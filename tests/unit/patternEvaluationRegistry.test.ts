import { describe, expect, it } from 'vitest';
import { agentPatterns } from '@/lib/data/patterns';

describe('pattern evaluation registry guardrails', () => {
  it('ensures every agent pattern has an evaluation profile with core fields', () => {
    const missingProfiles: string[] = [];
    const missingMetrics: string[] = [];
    const missingNotes: string[] = [];

    for (const pattern of agentPatterns) {
      const profile = pattern.evaluationProfile;
      if (!profile) {
        missingProfiles.push(pattern.id);
        continue;
      }

      if (!profile.criticalMetrics?.length) {
        missingMetrics.push(pattern.id);
      }

      if (!profile.evaluationNotes?.length) {
        missingNotes.push(pattern.id);
      }
    }

    expect(missingProfiles, `Missing evaluation profile: ${missingProfiles.join(', ')}`).toEqual([]);
    expect(missingMetrics, `Missing critical metrics: ${missingMetrics.join(', ')}`).toEqual([]);
    expect(missingNotes, `Missing evaluation notes: ${missingNotes.join(', ')}`).toEqual([]);
  });
});
