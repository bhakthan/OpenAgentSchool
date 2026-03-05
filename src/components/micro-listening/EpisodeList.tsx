import { Play, Pause, Check } from '@phosphor-icons/react';
import type {
  ListeningEpisode,
  ListeningLevel,
  EpisodeProgress,
} from '@/lib/data/microListening/types';

interface EpisodeListProps {
  episodes: ListeningEpisode[];
  level: ListeningLevel;
  episodeProgress: Record<string, EpisodeProgress>;
  onPlay: (episodeId: string, level: ListeningLevel) => void;
  nowPlayingId?: string;
}

const formatDuration = (s: number) =>
  `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

const levelAccent: Record<ListeningLevel, string> = {
  beginner: 'bg-emerald-500',
  intermediate: 'bg-blue-500',
  advanced: 'bg-purple-500',
  expert: 'bg-amber-500',
};

export function EpisodeList({
  episodes,
  level,
  episodeProgress,
  onPlay,
  nowPlayingId,
}: EpisodeListProps) {
  return (
    <ul className="flex flex-col gap-1">
      {episodes.map((episode) => {
        const progressKey = `${episode.id}:${level}`;
        const progress = episodeProgress[progressKey];
        const isPlaying = nowPlayingId === episode.id;
        const isCompleted = progress?.completed ?? false;
        const isInProgress = !isCompleted && (progress?.playbackPosition ?? 0) > 0;
        const playbackFraction =
          isInProgress && episode.durationEstimate > 0
            ? (progress!.playbackPosition / episode.durationEstimate) * 100
            : 0;

        return (
          <li
            key={episode.id}
            className={`group relative flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
              isPlaying
                ? 'border border-indigo-500/40 bg-indigo-500/10 shadow-lg shadow-indigo-500/10'
                : 'border border-transparent hover:bg-muted'
            }`}
            style={isPlaying ? { animation: 'subtlePulse 2s ease-in-out infinite' } : undefined}
          >
            {/* Episode number */}
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground dark:bg-white/10">
              {episode.seriesOrder}
            </span>

            {/* Title + duration + progress bar */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{episode.title}</p>
              <span className="text-xs text-muted-foreground">
                {formatDuration(episode.durationEstimate)}
              </span>

              {/* In-progress bar */}
              {isInProgress && (
                <div className="mt-1 h-0.5 w-full overflow-hidden rounded-full bg-muted dark:bg-white/10">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${levelAccent[level]}`}
                    style={{ width: `${playbackFraction}%` }}
                  />
                </div>
              )}
            </div>

            {/* Status icon */}
            <div className="shrink-0">
              {isCompleted ? (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <Check size={14} weight="bold" />
                </span>
              ) : isInProgress ? (
                <span
                  className="block h-6 w-6 rounded-full border-2 border-current text-muted-foreground"
                  style={{
                    background: `conic-gradient(currentColor ${playbackFraction * 3.6}deg, transparent 0deg)`,
                    opacity: 0.5,
                  }}
                />
              ) : null}
            </div>

            {/* Play / Pause button */}
            <button
              onClick={() => onPlay(episode.id, level)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-foreground transition-all duration-200 hover:bg-indigo-500 hover:text-white hover:shadow-lg hover:shadow-indigo-500/20 dark:bg-white/10"
              aria-label={isPlaying ? `Pause ${episode.title}` : `Play ${episode.title}`}
            >
              {isPlaying ? <Pause size={14} weight="fill" /> : <Play size={14} weight="fill" />}
            </button>
          </li>
        );
      })}

      <style>{`
        @keyframes subtlePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.15); }
          50%      { box-shadow: 0 0 16px 2px rgba(99,102,241,0.10); }
        }
      `}</style>
    </ul>
  );
}
