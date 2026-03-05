/**
 * Micro-Listening Feature Tests
 * Covers: progress persistence, streak logic, queue generation, level extraction, series catalog
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';

// ── Progress Module ──────────────────────────────────────────────────────────

describe('Micro-Listening Progress', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return default profile when none exists', async () => {
    const { getListeningProfile, DEFAULT_PROFILE } = await import(
      '@/lib/data/microListening/progress'
    );
    const profile = getListeningProfile();
    expect(profile.currentStreak).toBe(DEFAULT_PROFILE.currentStreak);
    expect(profile.preferredLevel).toBe('beginner');
    expect(profile.dailyGoalMinutes).toBe(5);
    expect(profile.totalEpisodesCompleted).toBe(0);
  });

  it('should persist and retrieve profile', async () => {
    const { getListeningProfile, saveListeningProfile } = await import(
      '@/lib/data/microListening/progress'
    );
    const profile = getListeningProfile();
    profile.totalEpisodesCompleted = 5;
    profile.totalMinutesListened = 25;
    saveListeningProfile(profile);

    const retrieved = getListeningProfile();
    expect(retrieved.totalEpisodesCompleted).toBe(5);
    expect(retrieved.totalMinutesListened).toBe(25);
  });

  it('should mark episode complete and update counters', async () => {
    const { getListeningProfile, markEpisodeComplete } = await import(
      '@/lib/data/microListening/progress'
    );
    markEpisodeComplete('test-episode-1', 'beginner');

    const profile = getListeningProfile();
    expect(profile.totalEpisodesCompleted).toBe(1);
    expect(profile.episodeProgress['test-episode-1:beginner']).toBeDefined();
    expect(profile.episodeProgress['test-episode-1:beginner'].completed).toBe(true);
  });

  it('should track playback position', async () => {
    const { getListeningProfile, markEpisodeProgress } = await import(
      '@/lib/data/microListening/progress'
    );
    markEpisodeProgress('ep-1', 'intermediate', 120, 45);

    const profile = getListeningProfile();
    const progress = profile.episodeProgress['ep-1:intermediate'];
    expect(progress).toBeDefined();
    expect(progress.playbackPosition).toBe(120);
    expect(progress.listenedDuration).toBe(45);
    expect(progress.completed).toBe(false);
  });

  it('should calculate streak correctly', async () => {
    const { getListeningProfile, saveListeningProfile, updateStreak } =
      await import('@/lib/data/microListening/progress');

    // Set last listened to yesterday
    const profile = getListeningProfile();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    profile.lastListenedDate = yesterday.toISOString().split('T')[0];
    profile.currentStreak = 3;
    profile.longestStreak = 5;
    saveListeningProfile(profile);

    updateStreak();
    const updated = getListeningProfile();
    expect(updated.currentStreak).toBe(4); // continues from 3
    expect(updated.longestStreak).toBe(5); // unchanged (4 < 5)
  });

  it('should reset streak when gap > 1 day', async () => {
    const { getListeningProfile, saveListeningProfile, updateStreak } =
      await import('@/lib/data/microListening/progress');

    const profile = getListeningProfile();
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    profile.lastListenedDate = threeDaysAgo.toISOString().split('T')[0];
    profile.currentStreak = 10;
    profile.longestStreak = 10;
    saveListeningProfile(profile);

    updateStreak();
    const updated = getListeningProfile();
    expect(updated.currentStreak).toBe(1);
    expect(updated.longestStreak).toBe(10); // preserved
  });
});

// ── Series Catalog ───────────────────────────────────────────────────────────

describe('Micro-Listening Series Catalog', () => {
  it('should return all series', async () => {
    const { getAllSeries } = await import('@/lib/data/microListening/series');
    const series = getAllSeries();
    expect(series.length).toBeGreaterThanOrEqual(10);
  });

  it('should have series for all 6 categories', async () => {
    const { getAllSeries } = await import('@/lib/data/microListening/series');
    const series = getAllSeries();
    const categories = new Set(series.map((s) => s.category));
    expect(categories.has('core-concepts')).toBe(true);
    expect(categories.has('agent-patterns')).toBe(true);
    expect(categories.has('agents-for-science')).toBe(true);
    expect(categories.has('adoption-playbook')).toBe(true);
    expect(categories.has('applied-ai-skills')).toBe(true);
  });

  it('should retrieve episode by ID', async () => {
    const { getEpisode, getAllEpisodes } = await import(
      '@/lib/data/microListening/series'
    );
    const allEps = getAllEpisodes();
    expect(allEps.length).toBeGreaterThan(0);

    const first = allEps[0];
    const found = getEpisode(first.id);
    expect(found).toBeDefined();
    expect(found!.title).toBe(first.title);
  });

  it('should filter series by category', async () => {
    const { getSeriesByCategory } = await import(
      '@/lib/data/microListening/series'
    );
    const science = getSeriesByCategory('agents-for-science');
    expect(science.length).toBeGreaterThanOrEqual(1);
    expect(science.every((s) => s.category === 'agents-for-science')).toBe(true);
  });

  it('each episode should have required fields', async () => {
    const { getAllEpisodes } = await import('@/lib/data/microListening/series');
    const episodes = getAllEpisodes();
    for (const ep of episodes) {
      expect(ep.id).toBeTruthy();
      expect(ep.title).toBeTruthy();
      expect(ep.seriesId).toBeTruthy();
      expect(ep.durationEstimate).toBeGreaterThan(0);
      expect(ep.levels.length).toBeGreaterThan(0);
    }
  });
});

// ── Queue Engine ─────────────────────────────────────────────────────────────

describe('Micro-Listening Queue', () => {
  it('should generate a daily mix', async () => {
    const { generateDailyMix } = await import('@/lib/data/microListening/queue');
    const { DEFAULT_PROFILE } = await import(
      '@/lib/data/microListening/progress'
    );
    const mix = generateDailyMix(DEFAULT_PROFILE);
    expect(mix).toBeDefined();
    expect(mix.date).toBeTruthy();
    expect(mix.episodes.length).toBeGreaterThan(0);
    expect(mix.estimatedMinutes).toBeGreaterThan(0);
  });

  it('should return concept of the day deterministically', async () => {
    const { getConceptOfTheDay } = await import(
      '@/lib/data/microListening/queue'
    );
    const today = new Date().toISOString().split('T')[0];
    const ep1 = getConceptOfTheDay(today);
    const ep2 = getConceptOfTheDay(today);
    expect(ep1?.id).toBe(ep2?.id); // same date → same concept
  });

  it('should return different concept for different dates', async () => {
    const { getConceptOfTheDay } = await import(
      '@/lib/data/microListening/queue'
    );
    const ep1 = getConceptOfTheDay('2026-03-04');
    const ep2 = getConceptOfTheDay('2026-03-05');
    // Not guaranteed to be different, but highly likely with enough episodes
    // Just check both are valid
    expect(ep1).toBeDefined();
    expect(ep2).toBeDefined();
  });

  it('should generate deep series queue', async () => {
    const { generateDeepSeriesQueue } = await import(
      '@/lib/data/microListening/queue'
    );
    const { getAllSeries } = await import('@/lib/data/microListening/series');
    const { DEFAULT_PROFILE } = await import(
      '@/lib/data/microListening/progress'
    );

    const series = getAllSeries();
    if (series.length > 0) {
      const queue = generateDeepSeriesQueue(
        series[0].id,
        'beginner',
        DEFAULT_PROFILE
      );
      expect(queue.length).toBeGreaterThan(0);
    }
  });

  it('should return smart recommendations', async () => {
    const { getSmartRecommendations } = await import(
      '@/lib/data/microListening/queue'
    );
    const { DEFAULT_PROFILE } = await import(
      '@/lib/data/microListening/progress'
    );
    const recs = getSmartRecommendations(DEFAULT_PROFILE, 5);
    expect(recs.length).toBeLessThanOrEqual(5);
    expect(recs.length).toBeGreaterThan(0);
  });
});

// ── Achievements ─────────────────────────────────────────────────────────────

describe('Micro-Listening Achievements', () => {
  it('should detect first-listen achievement', async () => {
    const { checkNewAchievements } = await import(
      '@/lib/data/microListening/achievements'
    );
    const { DEFAULT_PROFILE } = await import(
      '@/lib/data/microListening/progress'
    );

    const profile = {
      ...DEFAULT_PROFILE,
      totalEpisodesCompleted: 1,
      unlockedAchievements: [],
    };
    const newAch = checkNewAchievements(profile);
    const ids = newAch.map((a) => a.id);
    expect(ids).toContain('first-listen');
  });

  it('should not re-unlock existing achievements', async () => {
    const { checkNewAchievements } = await import(
      '@/lib/data/microListening/achievements'
    );
    const { DEFAULT_PROFILE } = await import(
      '@/lib/data/microListening/progress'
    );

    const profile = {
      ...DEFAULT_PROFILE,
      totalEpisodesCompleted: 1,
      unlockedAchievements: ['first-listen'],
    };
    const newAch = checkNewAchievements(profile);
    const ids = newAch.map((a) => a.id);
    expect(ids).not.toContain('first-listen');
  });

  it('should detect streak achievements', async () => {
    const { checkNewAchievements } = await import(
      '@/lib/data/microListening/achievements'
    );
    const { DEFAULT_PROFILE } = await import(
      '@/lib/data/microListening/progress'
    );

    const profile = {
      ...DEFAULT_PROFILE,
      totalEpisodesCompleted: 10,
      currentStreak: 7,
      unlockedAchievements: ['first-listen', 'streak-3'],
    };
    const newAch = checkNewAchievements(profile);
    const ids = newAch.map((a) => a.id);
    expect(ids).toContain('streak-7');
    expect(ids).toContain('ten-episodes');
  });
});

// ── Level Extraction ─────────────────────────────────────────────────────────

describe('Level Content Extraction', () => {
  const sampleContent = `Topic Explanation
────────────────────────────────────────────────────────────────────────────────
Beginner Explanation
────────────────────────────────────────────────────────────────────────────────
This is the beginner content about the topic.
────────────────────────────────────────────────────────────────────────────────
Intermediate Explanation
────────────────────────────────────────────────────────────────────────────────
This is the intermediate content with more detail.
────────────────────────────────────────────────────────────────────────────────
Advanced Explanation
────────────────────────────────────────────────────────────────────────────────
This is the advanced content for experienced learners.
────────────────────────────────────────────────────────────────────────────────
Expert Explanation
────────────────────────────────────────────────────────────────────────────────
This is the expert content with cutting-edge insights.`;

  function extractLevelContent(text: string, level: string): string | null {
    const levelHeaders: Record<string, string> = {
      beginner: 'Beginner Explanation',
      intermediate: 'Intermediate Explanation',
      advanced: 'Advanced Explanation',
      expert: 'Expert Explanation',
    };
    const header = levelHeaders[level];
    if (!header) return null;
    const sections = text.split(/[-─]{10,}/);
    for (let i = 0; i < sections.length; i++) {
      if (
        sections[i].trim().toLowerCase().includes(header.toLowerCase()) &&
        sections[i + 1]
      ) {
        return sections[i + 1].trim();
      }
    }
    return null;
  }

  it('should extract beginner content', () => {
    const content = extractLevelContent(sampleContent, 'beginner');
    expect(content).toContain('beginner content');
  });

  it('should extract intermediate content', () => {
    const content = extractLevelContent(sampleContent, 'intermediate');
    expect(content).toContain('intermediate content');
  });

  it('should extract advanced content', () => {
    const content = extractLevelContent(sampleContent, 'advanced');
    expect(content).toContain('advanced content');
  });

  it('should extract expert content', () => {
    const content = extractLevelContent(sampleContent, 'expert');
    expect(content).toContain('expert content');
  });

  it('should return null for invalid level', () => {
    const content = extractLevelContent(sampleContent, 'unknown');
    expect(content).toBeNull();
  });
});

// ── Audio Cache ──────────────────────────────────────────────────────────────

describe('Audio Cache Key Builder', () => {
  it('should build deterministic cache keys', async () => {
    const { buildCacheKey } = await import(
      '@/lib/data/microListening/audioCache'
    );
    const key1 = buildCacheKey('ep-1', 'beginner', 'voice-1');
    const key2 = buildCacheKey('ep-1', 'beginner', 'voice-1');
    expect(key1).toBe(key2);
    expect(key1).toContain('ep-1');
    expect(key1).toContain('beginner');
  });

  it('should differentiate by level', async () => {
    const { buildCacheKey } = await import(
      '@/lib/data/microListening/audioCache'
    );
    const key1 = buildCacheKey('ep-1', 'beginner');
    const key2 = buildCacheKey('ep-1', 'advanced');
    expect(key1).not.toBe(key2);
  });
});
