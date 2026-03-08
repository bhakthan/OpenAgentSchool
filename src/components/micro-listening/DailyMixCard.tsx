import { Shuffle, Play, Star, Clock } from '@phosphor-icons/react';
import type {
  DailyPlaylist,
  ListeningEpisode,
  ListeningLevel,
} from '@/lib/data/microListening/types';

interface DailyMixCardProps {
  playlist: DailyPlaylist;
  onPlay: (episodeId: string, level: ListeningLevel) => void;
  getEpisodeById: (id: string) => ListeningEpisode | undefined;
}

const levelColor: Record<ListeningLevel, string> = {
  beginner: 'border border-emerald-500/20 bg-emerald-500/12 text-emerald-700 dark:text-emerald-300',
  intermediate: 'border border-blue-500/20 bg-blue-500/12 text-blue-700 dark:text-blue-300',
  advanced: 'border border-violet-500/20 bg-violet-500/12 text-violet-700 dark:text-violet-300',
  expert: 'border border-amber-500/20 bg-amber-500/12 text-amber-700 dark:text-amber-300',
};

function formatDuration(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}

export function DailyMixCard({ playlist, onPlay, getEpisodeById }: DailyMixCardProps) {
  return (
    <div className="listening-daily-mix feature-card-enter feature-panel rounded-2xl border p-6 backdrop-blur-xl">
      {/* Header */}
      <div className="listening-daily-mix__header mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Shuffle size={20} weight="bold" className="text-indigo-500 dark:text-indigo-400" />
          <h2 className="text-balance text-lg font-bold text-foreground">Today&#39;s Mix</h2>
        </div>
        <span className="feature-chip inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium">
          <Clock size={14} />
          ~{playlist.estimatedMinutes} min
        </span>
      </div>

      {/* Theme */}
      <p className="feature-secondary text-pretty mb-5 text-sm dark:text-muted-foreground">{playlist.theme}</p>

      {/* Concept of the Day */}
      {playlist.conceptOfTheDay && (
        <div className="mb-5 flex items-center gap-2 rounded-xl border border-amber-500/20 bg-[color-mix(in_oklch,var(--background)_82%,theme(colors.amber.300))] px-4 py-2.5 dark:bg-amber-500/10">
          <Star size={18} weight="fill" className="text-amber-500 dark:text-amber-400" />
          <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
            Concept of the Day:{' '}
            <span className="text-amber-950 dark:text-amber-100">{playlist.conceptOfTheDay}</span>
          </span>
        </div>
      )}

      {/* Episode list */}
      <ul className="flex flex-col gap-2">
        {playlist.episodes.map(({ episodeId, level }) => {
          const episode = getEpisodeById(episodeId);
          if (!episode) return null;

          return (
            <li
              key={episodeId}
              className="listening-daily-mix__episode group grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 hover:bg-[color-mix(in_oklch,var(--background)_68%,var(--primary))] dark:hover:bg-muted"
            >
              <button
                onClick={() => onPlay(episodeId, level)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/85 text-foreground shadow-sm transition-all duration-200 group-hover:bg-indigo-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-500/20 dark:bg-white/10"
                aria-label={`Play ${episode.title}`}
              >
                <Play size={14} weight="fill" />
              </button>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{episode.title}</p>
                <span className="feature-secondary text-xs dark:text-muted-foreground">
                  {formatDuration(episode.durationEstimate)}
                </span>
              </div>

              <span
                className={`listening-daily-mix__level shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${levelColor[level]}`}
              >
                {level}
              </span>
            </li>
          );
        })}
      </ul>

      {/* Play All */}
      <button
        onClick={() => {
          const first = playlist.episodes[0];
          if (first) onPlay(first.episodeId, first.level);
        }}
        className="mt-5 w-full rounded-xl border border-indigo-500/60 bg-gradient-to-r from-indigo-600 to-violet-600 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:from-indigo-500 hover:to-violet-500 active:scale-[0.98]"
      >
        Play All
      </button>
    </div>
  );
}
