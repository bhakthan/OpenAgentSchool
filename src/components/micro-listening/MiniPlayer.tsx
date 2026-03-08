import { Play, Pause, Stop, ArrowsOutSimple } from '@phosphor-icons/react';
import type { ListeningEpisode } from '@/lib/data/microListening/types';

interface MiniPlayerProps {
  episode: ListeningEpisode | null;
  isPlaying: boolean;
  currentTime: number;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onExpand: () => void;
  visible: boolean;
}

export function MiniPlayer({
  episode,
  isPlaying,
  currentTime,
  onPlay,
  onPause,
  onStop,
  onExpand,
  visible,
}: MiniPlayerProps) {
  if (!episode || !visible) return null;

  const progress =
    episode.durationEstimate > 0 ? (currentTime / episode.durationEstimate) * 100 : 0;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      {/* Full-width thin progress bar */}
      <div className="h-0.5 w-full bg-muted">
        <div
          className="h-full bg-indigo-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Bar content */}
      <div className="flex h-16 items-center gap-4 border-t border-border bg-card/95 px-4 backdrop-blur-xl">
        {/* Left: episode info */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">{episode.title}</p>
          <p className="truncate text-xs text-foreground/60 dark:text-muted-foreground">{episode.seriesId}</p>
        </div>

        {/* Center: play/pause */}
        <button
          onClick={isPlaying ? onPause : onPlay}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-white transition-all duration-200 hover:bg-indigo-400 active:scale-95"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={16} weight="fill" /> : <Play size={16} weight="fill" />}
        </button>

        {/* Right: stop + expand */}
        <div className="flex items-center gap-2">
          <button
            onClick={onStop}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
            aria-label="Stop"
          >
            <Stop size={16} weight="fill" />
          </button>
          <button
            onClick={onExpand}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
            aria-label="Expand player"
          >
            <ArrowsOutSimple size={16} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
}
