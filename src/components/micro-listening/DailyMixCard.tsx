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
  beginner: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  intermediate: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  advanced: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  expert: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
};

function formatDuration(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}

export function DailyMixCard({ playlist, onPlay, getEpisodeById }: DailyMixCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 backdrop-blur-xl">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Shuffle size={20} weight="bold" className="text-indigo-400" />
          <h2 className="text-lg font-bold text-foreground">Today&#39;s Mix</h2>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-medium text-indigo-300">
          <Clock size={14} />
          ~{playlist.estimatedMinutes} min
        </span>
      </div>

      {/* Theme */}
      <p className="mb-5 text-sm text-foreground/70 dark:text-muted-foreground">{playlist.theme}</p>

      {/* Concept of the Day */}
      {playlist.conceptOfTheDay && (
        <div className="mb-5 flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-2.5">
          <Star size={18} weight="fill" className="text-amber-400" />
          <span className="text-sm font-medium text-amber-200">
            Concept of the Day:{' '}
            <span className="text-amber-100">{playlist.conceptOfTheDay}</span>
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
              className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 hover:bg-muted"
            >
              <button
                onClick={() => onPlay(episodeId, level)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-foreground transition-all duration-200 group-hover:bg-indigo-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-500/20 dark:bg-white/10"
                aria-label={`Play ${episode.title}`}
              >
                <Play size={14} weight="fill" />
              </button>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{episode.title}</p>
                <span className="text-xs text-foreground/60 dark:text-muted-foreground">
                  {formatDuration(episode.durationEstimate)}
                </span>
              </div>

              <span
                className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${levelColor[level]}`}
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
        className="mt-5 w-full rounded-xl bg-indigo-500 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-400 active:scale-[0.98]"
      >
        Play All
      </button>
    </div>
  );
}
