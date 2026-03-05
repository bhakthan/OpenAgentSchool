import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import {
  Brain, Cpu, ShieldCheck, Rocket, TreeStructure, Sparkle, Flask, Factory,
  GraduationCap, Lightning, ChartLineUp, Scales, UsersThree, Binoculars,
  Headphones, Blueprint, Strategy,
} from '@phosphor-icons/react';
import { ListeningHero } from '@/components/micro-listening/ListeningHero';
import { DailyMixCard } from '@/components/micro-listening/DailyMixCard';
import { StreakFlame } from '@/components/micro-listening/StreakFlame';
import { SeriesCard } from '@/components/micro-listening/SeriesCard';
import { EpisodeList } from '@/components/micro-listening/EpisodeList';
import { LevelSelector } from '@/components/micro-listening/LevelSelector';
import { ListeningStats } from '@/components/micro-listening/ListeningStats';
import { ListeningPlayer } from '@/components/micro-listening/ListeningPlayer';
import { AchievementToast } from '@/components/micro-listening/AchievementToast';
import { useMicroListeningProgress } from '@/lib/hooks/useMicroListeningProgress';
import { trackEvent } from '@/lib/analytics/ga';
import {
  getAllSeries,
  getSeriesByCategory,
  getSeries,
  getEpisode,
} from '@/lib/data/microListening/series';

/** Maps Phosphor icon name strings from series data to React elements. */
const ICON_MAP: Record<string, ReactNode> = {
  Brain: <Brain size={28} weight="duotone" />,
  Cpu: <Cpu size={28} weight="duotone" />,
  ShieldCheck: <ShieldCheck size={28} weight="duotone" />,
  Rocket: <Rocket size={28} weight="duotone" />,
  Blueprint: <Blueprint size={28} weight="duotone" />,
  TreeStructure: <TreeStructure size={28} weight="duotone" />,
  Sparkle: <Sparkle size={28} weight="duotone" />,
  Flask: <Flask size={28} weight="duotone" />,
  Factory: <Factory size={28} weight="duotone" />,
  Strategy: <Strategy size={28} weight="duotone" />,
  GraduationCap: <GraduationCap size={28} weight="duotone" />,
  Lightning: <Lightning size={28} weight="duotone" />,
  ChartLine: <ChartLineUp size={28} weight="duotone" />,
  Scales: <Scales size={28} weight="duotone" />,
  UsersThree: <UsersThree size={28} weight="duotone" />,
  Binoculars: <Binoculars size={28} weight="duotone" />,
  Headphones: <Headphones size={28} weight="duotone" />,
};
import {
  generateDailyMix,
  getSmartRecommendations,
} from '@/lib/data/microListening/queue';
import { checkNewAchievements } from '@/lib/data/microListening/achievements';
import type {
  ListeningLevel,
  ListeningEpisode,
  SeriesCategory,
  ListeningAchievement,
} from '@/lib/data/microListening/types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function extractLevelContent(
  text: string,
  level: ListeningLevel,
): string | null {
  const levelHeaders: Record<ListeningLevel, string> = {
    beginner: 'Beginner Explanation',
    intermediate: 'Intermediate Explanation',
    advanced: 'Advanced Explanation',
    expert: 'Expert Explanation',
  };
  const header = levelHeaders[level];
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

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type PageView = 'home' | 'library' | 'series-detail' | 'now-playing';

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function MicroListeningPage() {
  // ---- routing / view state ------------------------------------------------
  const [view, setView] = useState<PageView>('home');
  const [previousView, setPreviousView] = useState<PageView>('home');
  const [selectedSeriesId, setSelectedSeriesId] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<ListeningLevel>('beginner');
  const [currentEpisodeId, setCurrentEpisodeId] = useState<string | null>(null);

  // ---- playback state ------------------------------------------------------
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // ---- achievements --------------------------------------------------------
  const [activeAchievement, setActiveAchievement] =
    useState<ListeningAchievement | null>(null);

  // ---- library filter ------------------------------------------------------
  const [libraryFilter, setLibraryFilter] = useState<SeriesCategory | 'all'>(
    'all',
  );

  // ---- progress hook -------------------------------------------------------
  const {
    profile,
    markProgress,
    markComplete,
    getSeriesCompletion,
  } = useMicroListeningProgress();

  // ---- document title ------------------------------------------------------
  useEffect(() => {
    document.title = 'Micro-Listening | Open Agent School';
    return () => {
      document.title = 'Open Agent School';
    };
  }, []);

  // ---- GA page-view per view switch ----------------------------------------
  useEffect(() => {
    trackEvent({
      action: 'listening_page_view',
      category: 'micro_listening',
      label: view,
    });
  }, [view]);

  // ---- playback timer ------------------------------------------------------
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((t) => t + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  // ---- derived data --------------------------------------------------------
  const allSeries = useMemo(() => getAllSeries(), []);

  const filteredSeries = useMemo(
    () =>
      libraryFilter === 'all'
        ? allSeries
        : getSeriesByCategory(libraryFilter),
    [allSeries, libraryFilter],
  );

  const dailyMix = useMemo(
    () => generateDailyMix(profile),
    [profile],
  );

  const recommendations = useMemo(
    () => getSmartRecommendations(profile, 5),
    [profile],
  );

  const continueEpisode = useMemo(() => {
    const inProgress = Object.entries(profile.episodeProgress).find(
      ([_key, prog]) => prog.playbackPosition > 0 && !prog.completed,
    );
    if (!inProgress) return null;
    // Key is `${episodeId}:${level}`, extract episodeId from the progress record
    const episodeId = inProgress[1].episodeId;
    return getEpisode(episodeId) ?? null;
  }, [profile.episodeProgress]);

  const selectedSeries = useMemo(
    () => (selectedSeriesId ? getSeries(selectedSeriesId) : null),
    [selectedSeriesId],
  );

  const currentEpisode = useMemo(
    () => (currentEpisodeId ? getEpisode(currentEpisodeId) : null),
    [currentEpisodeId],
  );

  // ---- navigation helpers --------------------------------------------------
  const navigateTo = useCallback(
    (next: PageView) => {
      setPreviousView(view);
      setView(next);
    },
    [view],
  );

  const goBack = useCallback(() => {
    if (view === 'now-playing') {
      setView(previousView);
    } else if (view === 'series-detail') {
      setView('library');
    } else {
      setView('home');
    }
  }, [view, previousView]);

  // ---- playback ------------------------------------------------------------
  const handlePlay = useCallback(async () => {
    if (!currentEpisodeId) return;
    const episode = getEpisode(currentEpisodeId);
    if (!episode) return;

    trackEvent({
      action: 'listening_episode_play',
      category: 'micro_listening',
      label: `${episode.title} [${selectedLevel}]`,
    });

    // Get text content
    let text =
      episode.fallbackText?.[selectedLevel] ||
      `${episode.title}. ${episode.description}`;

    // If audioSource exists, try to fetch the text file
    if (episode.audioSource) {
      try {
        const resp = await fetch(`/${episode.audioSource}`);
        if (resp.ok) {
          const fullText = await resp.text();
          text = extractLevelContent(fullText, selectedLevel) || text;
        }
      } catch {
        /* use fallback */
      }
    }

    // Use Web Speech API
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = playbackSpeed;
    utterance.onend = () => {
      setIsPlaying(false);
      markComplete(currentEpisodeId, selectedLevel);
      trackEvent({
        action: 'listening_episode_complete',
        category: 'micro_listening',
        label: `${episode.title} [${selectedLevel}]`,
      });
      // Check achievements
      const newAchievements = checkNewAchievements(profile);
      if (newAchievements.length > 0) setActiveAchievement(newAchievements[0]);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setCurrentTime(0);
  }, [currentEpisodeId, selectedLevel, playbackSpeed, markComplete, profile]);

  const handlePause = useCallback(() => {
    window.speechSynthesis.pause();
    setIsPlaying(false);
    if (currentEpisodeId) {
      markProgress(currentEpisodeId, selectedLevel, currentTime, currentTime);
    }
  }, [currentEpisodeId, currentTime, selectedLevel, markProgress]);

  const handleStop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    if (currentEpisodeId) {
      markProgress(currentEpisodeId, selectedLevel, currentTime, currentTime);
    }
  }, [currentEpisodeId, currentTime, selectedLevel, markProgress]);

  const handleSeek = useCallback((time: number) => {
    setCurrentTime(time);
  }, []);

  const handleSkipForward = useCallback(() => {
    setCurrentTime((t) => t + 15);
  }, []);

  const handleSkipBack = useCallback(() => {
    setCurrentTime((t) => Math.max(0, t - 15));
  }, []);

  const handleSpeedChange = useCallback((speed: number) => {
    setPlaybackSpeed(speed);
    trackEvent({
      action: 'listening_speed_change',
      category: 'micro_listening',
      label: `${speed}x`,
    });
  }, []);

  const handleComplete = useCallback(() => {
    if (currentEpisodeId) {
      markComplete(currentEpisodeId, selectedLevel);
      trackEvent({
        action: 'listening_episode_complete',
        category: 'micro_listening',
        label: `manual [${selectedLevel}]`,
      });
      const newAchievements = checkNewAchievements(profile);
      if (newAchievements.length > 0) setActiveAchievement(newAchievements[0]);
    }
  }, [currentEpisodeId, selectedLevel, markComplete, profile]);

  const handleNextEpisode = useCallback(() => {
    // Play next in queue or do nothing
    const queueIdx = profile.queue.indexOf(currentEpisodeId ?? '');
    if (queueIdx >= 0 && queueIdx < profile.queue.length - 1) {
      const nextId = profile.queue[queueIdx + 1];
      setCurrentEpisodeId(nextId);
      setCurrentTime(0);
      setIsPlaying(false);
    }
  }, [currentEpisodeId, profile.queue]);

  const startEpisode = useCallback(
    (episodeId: string, _level?: ListeningLevel) => {
      setCurrentEpisodeId(episodeId);
      setCurrentTime(0);
      setIsPlaying(false);
      const ep = getEpisode(episodeId);
      trackEvent({
        action: 'listening_episode_select',
        category: 'micro_listening',
        label: ep?.title ?? episodeId,
      });
      // If we're already on series-detail, stay there (inline player)
      if (view !== 'series-detail') {
        navigateTo('now-playing');
      }
    },
    [navigateTo, view],
  );

  const openSeries = useCallback(
    (seriesId: string) => {
      setSelectedSeriesId(seriesId);
      const s = getSeries(seriesId);
      trackEvent({
        action: 'listening_series_select',
        category: 'micro_listening',
        label: s?.title ?? seriesId,
      });
      navigateTo('series-detail');
    },
    [navigateTo],
  );

  // ---- category labels -----------------------------------------------------
  const handleLevelChange = useCallback((level: ListeningLevel) => {
    setSelectedLevel(level);
    trackEvent({
      action: 'listening_level_change',
      category: 'micro_listening',
      label: level,
    });
  }, []);

  const categories: { value: SeriesCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'core-concepts', label: 'Core Concepts' },
    { value: 'agent-patterns', label: 'Agent Patterns' },
    { value: 'agents-for-science', label: 'Science Agents' },
    { value: 'ai-science-factory', label: 'Science Factory' },
    { value: 'adoption-playbook', label: 'Adoption' },
    { value: 'applied-ai-skills', label: 'AI Skills' },
  ];

  // ---- up-next episode for player ------------------------------------------
  const upNextEpisode = useMemo(() => {
    if (!currentEpisodeId) return undefined;
    const queueIdx = profile.queue.indexOf(currentEpisodeId);
    if (queueIdx >= 0 && queueIdx < profile.queue.length - 1) {
      return getEpisode(profile.queue[queueIdx + 1]) ?? undefined;
    }
    return undefined;
  }, [currentEpisodeId, profile.queue]);

  // =========================================================================
  // RENDER
  // =========================================================================

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-violet-500/30">
      {/* Achievement toast – global */}
      <AchievementToast
        achievement={activeAchievement}
        onDismiss={() => setActiveAchievement(null)}
      />

      {/* ---- Tab Bar ---- */}
      {view !== 'now-playing' && (
        <nav className="sticky top-0 z-30 flex items-center gap-2 border-b border-border bg-background/80 px-6 py-3 backdrop-blur-xl">
          <button
            onClick={() => setView('home')}
            className={`rounded-full px-5 py-1.5 text-sm font-medium transition-all ${
              view === 'home'
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/25'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setView('library')}
            className={`rounded-full px-5 py-1.5 text-sm font-medium transition-all ${
              view === 'library' || view === 'series-detail'
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/25'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            Library
          </button>
        </nav>
      )}

      {/* ================================================================== */}
      {/* HOME VIEW                                                          */}
      {/* ================================================================== */}
      {view === 'home' && (
        <div className="mx-auto max-w-5xl space-y-10 px-4 pb-20 pt-6 sm:px-6">
          {/* Hero or compact header */}
          {profile.totalEpisodesCompleted === 0 ? (
            <ListeningHero
              onStartListening={() => setView('library')}
              profile={profile}
            />
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  Welcome back
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {profile.totalEpisodesCompleted} episodes completed
                </p>
              </div>
              <StreakFlame
                streak={profile.currentStreak}
                dailyGoal={profile.dailyGoalMinutes}
                todayMinutes={profile.todayMinutesListened}
              />
            </div>
          )}

          {/* Streak (for new users show below hero) */}
          {profile.totalEpisodesCompleted === 0 && (
            <div className="flex justify-center">
              <StreakFlame
                streak={profile.currentStreak}
                dailyGoal={profile.dailyGoalMinutes}
                todayMinutes={profile.todayMinutesListened}
              />
            </div>
          )}

          {/* Daily Mix */}
          <section>
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Today&apos;s Daily Mix
            </h2>
            <DailyMixCard
              playlist={dailyMix}
              onPlay={(episodeId, level) => startEpisode(episodeId, level)}
              getEpisodeById={(id) => getEpisode(id) ?? undefined}
            />
          </section>

          {/* Continue Listening */}
          {continueEpisode && (
            <section>
              <h2 className="mb-4 text-lg font-semibold text-foreground">
                Continue Listening
              </h2>
              <button
                onClick={() => startEpisode(continueEpisode.id)}
                className="group w-full rounded-2xl border border-border bg-card p-5 text-left backdrop-blur transition-all hover:border-violet-500/30 hover:bg-muted"
              >
                <p className="font-medium text-foreground group-hover:text-violet-500 dark:group-hover:text-violet-300">
                  {continueEpisode.title}
                </p>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {continueEpisode.description}
                </p>
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-muted dark:bg-white/10">
                  <div
                    className="h-full rounded-full bg-violet-500 transition-all"
                    style={{
                      width: `${Math.min(
                        ((Object.values(profile.episodeProgress).find(
                          (p) => p.episodeId === continueEpisode.id,
                        )?.playbackPosition ?? 0) /
                          (continueEpisode.durationEstimate || 120)) *
                          100,
                        100,
                      )}%`,
                    }}
                  />
                </div>
              </button>
            </section>
          )}

          {/* Recommended for You */}
          {recommendations.length > 0 && (
            <section>
              <h2 className="mb-4 text-lg font-semibold text-foreground">
                Recommended for You
              </h2>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted">
                {recommendations.map((ep) => (
                  <button
                    key={ep.id}
                    onClick={() => startEpisode(ep.id)}
                    className="group min-w-[200px] flex-shrink-0 rounded-xl border border-border bg-card p-4 text-left backdrop-blur transition-all hover:border-violet-500/20 hover:bg-muted"
                  >
                    <p className="line-clamp-1 text-sm font-medium text-foreground group-hover:text-violet-500 dark:group-hover:text-violet-300">
                      {ep.title}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                      {ep.description}
                    </p>
                    <span className="mt-2 inline-block rounded-full bg-violet-500/10 px-2 py-0.5 text-[10px] font-medium text-violet-400">
                      {ep.durationEstimate
                        ? `${Math.ceil(ep.durationEstimate / 60)} min`
                        : '~2 min'}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Stats */}
          <ListeningStats profile={profile} />

          {/* Browse Library link */}
          <div className="flex justify-center pt-2">
            <button
              onClick={() => setView('library')}
              className="text-sm font-medium text-violet-600 transition-colors hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300"
            >
              Browse Library →
            </button>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* LIBRARY VIEW                                                       */}
      {/* ================================================================== */}
      {view === 'library' && (
        <div className="mx-auto max-w-6xl space-y-8 px-4 pb-20 pt-6 sm:px-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setView('home')}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
              aria-label="Back to home"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="text-2xl font-bold tracking-tight">
              Audio Library
            </h1>
          </div>

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  setLibraryFilter(cat.value as SeriesCategory | 'all');
                  trackEvent({
                    action: 'listening_library_filter',
                    category: 'micro_listening',
                    label: cat.label,
                  });
                }}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  libraryFilter === cat.value
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/25'
                    : 'border border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Series grid */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filteredSeries.map((series) => (
              <SeriesCard
                key={series.id}
                series={series}
                completionPercent={getSeriesCompletion(
                  series.id,
                  selectedLevel,
                  series.episodes?.length ?? 0,
                )}
                onSelect={openSeries}
              />
            ))}
          </div>

          {filteredSeries.length === 0 && (
            <p className="py-12 text-center text-muted-foreground">
              No series found in this category yet.
            </p>
          )}
        </div>
      )}

      {/* ================================================================== */}
      {/* SERIES DETAIL VIEW                                                 */}
      {/* ================================================================== */}
      {view === 'series-detail' && selectedSeries && (
        <div className="mx-auto max-w-4xl space-y-8 px-4 pb-20 pt-6 sm:px-6">
          {/* Back button */}
          <button
            onClick={() => setView('library')}
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Library
          </button>

          {/* Series header */}
          <div className="rounded-2xl border border-border bg-card p-6 backdrop-blur-lg sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              {/* Icon */}
              <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-3xl text-white shadow-lg shadow-violet-600/20">
                {ICON_MAP[selectedSeries.icon] ?? <Headphones size={28} weight="duotone" />}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {selectedSeries.title}
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {selectedSeries.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-600 dark:text-violet-400">
                    {selectedSeries.category}
                  </span>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    {selectedSeries.episodes?.length ?? 0} episodes
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Level selector */}
          <LevelSelector
            activeLevel={selectedLevel}
            onSelect={handleLevelChange}
          />

          {/* Episode list */}
          <EpisodeList
            episodes={selectedSeries.episodes ?? []}
            level={selectedLevel}
            episodeProgress={profile.episodeProgress}
            onPlay={(episodeId, level) => {
              if (episodeId === currentEpisodeId && isPlaying) {
                handlePause();
              } else if (episodeId === currentEpisodeId && !isPlaying) {
                handlePlay();
              } else {
                startEpisode(episodeId, level);
              }
            }}
            nowPlayingId={currentEpisodeId ?? undefined}
          />

          {/* Inline player — plays without navigating away */}
          {currentEpisode && (
            <div className="mt-6">
              <ListeningPlayer
                episode={currentEpisode}
                level={selectedLevel}
                isPlaying={isPlaying}
                currentTime={currentTime}
                playbackSpeed={playbackSpeed}
                onPlay={handlePlay}
                onPause={handlePause}
                onStop={handleStop}
                onSeek={handleSeek}
                onSkipForward={handleSkipForward}
                onSkipBack={handleSkipBack}
                onSpeedChange={handleSpeedChange}
                onComplete={handleComplete}
                onNextEpisode={handleNextEpisode}
                upNext={upNextEpisode}
              />
            </div>
          )}
        </div>
      )}

      {/* ================================================================== */}
      {/* NOW PLAYING VIEW                                                   */}
      {/* ================================================================== */}
      {view === 'now-playing' && currentEpisode && (
        <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-4 pb-20 pt-6 sm:px-6">
          {/* Back button */}
          <button
            onClick={goBack}
            className="mb-8 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>

          {/* Player */}
          <div className="flex flex-1 flex-col items-center justify-center">
            <ListeningPlayer
              episode={currentEpisode}
              level={selectedLevel}
              isPlaying={isPlaying}
              currentTime={currentTime}
              playbackSpeed={playbackSpeed}
              onPlay={handlePlay}
              onPause={handlePause}
              onStop={handleStop}
              onSeek={handleSeek}
              onSkipForward={handleSkipForward}
              onSkipBack={handleSkipBack}
              onSpeedChange={handleSpeedChange}
              onComplete={handleComplete}
              onNextEpisode={handleNextEpisode}
              upNext={upNextEpisode}
            />

            {/* Compact level selector */}
            <div className="mt-8">
              <LevelSelector
                activeLevel={selectedLevel}
                onSelect={handleLevelChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
