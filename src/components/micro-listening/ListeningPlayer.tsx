import { useCallback } from 'react';
import {
  Play,
  Pause,
  Stop,
  ClockCounterClockwise,
  ClockClockwise,
  ArrowRight,
} from '@phosphor-icons/react';
import type { ListeningEpisode, ListeningLevel } from '@/lib/data/microListening/types';

interface ListeningPlayerProps {
  episode: ListeningEpisode | null;
  level: ListeningLevel;
  isPlaying: boolean;
  currentTime: number;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onSeek: (time: number) => void;
  onSkipForward: () => void;
  onSkipBack: () => void;
  onSpeedChange: (speed: number) => void;
  onComplete: () => void;
  onNextEpisode: () => void;
  playbackSpeed: number;
  upNext?: ListeningEpisode;
}

const speedOptions = [0.75, 1, 1.25, 1.5, 2];

const levelColors: Record<ListeningLevel, string> = {
  beginner: '#10b981',
  intermediate: '#3b82f6',
  advanced: '#a855f7',
  expert: '#f59e0b',
};

const levelBadge: Record<ListeningLevel, string> = {
  beginner: 'bg-emerald-500/20 text-emerald-400',
  intermediate: 'bg-blue-500/20 text-blue-400',
  advanced: 'bg-purple-500/20 text-purple-400',
  expert: 'bg-amber-500/20 text-amber-400',
};

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

export function ListeningPlayer({
  episode,
  level,
  isPlaying,
  currentTime,
  onPlay,
  onPause,
  onStop,
  onSeek,
  onSkipForward,
  onSkipBack,
  onSpeedChange,
  onComplete,
  onNextEpisode,
  playbackSpeed,
  upNext,
}: ListeningPlayerProps) {
  const cycleSpeed = useCallback(() => {
    const idx = speedOptions.indexOf(playbackSpeed);
    const next = speedOptions[(idx + 1) % speedOptions.length];
    onSpeedChange(next);
  }, [playbackSpeed, onSpeedChange]);

  if (!episode) {
    return (
      <div className="flex items-center justify-center rounded-3xl bg-gradient-to-b from-slate-50/95 to-white/95 p-12 text-muted-foreground backdrop-blur-2xl dark:from-slate-900/95 dark:to-slate-950/95">
        Select an episode to start listening
      </div>
    );
  }

  const duration = episode.durationEstimate;
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const color = levelColors[level];
  const nearComplete = currentTime > 0.9 * duration;

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-border bg-gradient-to-b from-slate-50/95 to-white/95 p-6 shadow-2xl backdrop-blur-2xl dark:from-slate-900/95 dark:to-slate-950/95 sm:p-8">
      {/* Series + category */}
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-semibold text-muted-foreground dark:bg-white/10">
          {episode.seriesId}
        </span>
        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold capitalize ${levelBadge[level]}`}>
          {level}
        </span>
      </div>

      {/* Title + description */}
      <div>
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">{episode.title}</h2>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{episode.description}</p>
      </div>

      {/* Progress bar */}
      <div className="flex flex-col gap-1.5">
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={(e) => onSeek(Number(e.target.value))}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted outline-none dark:bg-white/10 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:shadow-md"
          style={{
            background: `linear-gradient(to right, ${color} ${progress}%, var(--muted) ${progress}%)`,
          }}
          aria-label="Seek"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>{fmt(currentTime)}</span>
          <span>{fmt(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        {/* Speed */}
        <button
          onClick={cycleSpeed}
          className="rounded-full bg-muted px-3 py-1.5 text-xs font-bold text-foreground transition-all duration-200 hover:bg-muted/80 dark:bg-white/10 dark:hover:bg-white/20"
          aria-label={`Playback speed ${playbackSpeed}x`}
        >
          {playbackSpeed}x
        </button>

        {/* Skip back */}
        <button
          onClick={onSkipBack}
          className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
          aria-label="Skip back 15 seconds"
        >
          <ClockCounterClockwise size={22} weight="bold" />
        </button>

        {/* Play / Pause */}
        <button
          onClick={isPlaying ? onPause : onPlay}
          className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-all duration-200 hover:brightness-110 active:scale-95"
          style={{ backgroundColor: color }}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={28} weight="fill" /> : <Play size={28} weight="fill" />}
        </button>

        {/* Skip forward */}
        <button
          onClick={onSkipForward}
          className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
          aria-label="Skip forward 15 seconds"
        >
          <ClockClockwise size={22} weight="bold" />
        </button>

        {/* Stop */}
        <button
          onClick={onStop}
          className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
          aria-label="Stop"
        >
          <Stop size={20} weight="fill" />
        </button>
      </div>

      {/* Bottom section */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        {/* Up next */}
        {upNext && (
          <button
            onClick={onNextEpisode}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            Up Next: <span className="font-medium text-foreground">{upNext.title}</span>
          </button>
        )}

        {/* Related link */}
        {episode.relatedLinks && episode.relatedLinks.length > 0 && (
          <a
            href={episode.relatedLinks[0].path}
            className="inline-flex items-center gap-1 text-xs font-medium text-indigo-400 transition-colors duration-200 hover:text-indigo-300"
          >
            See it <ArrowRight size={12} />
          </a>
        )}

        {/* Mark Complete */}
        <button
          onClick={onComplete}
          className={`ml-auto rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
            nearComplete
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
              : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground dark:bg-white/10 dark:hover:bg-white/20'
          }`}
        >
          Mark Complete
        </button>
      </div>
    </div>
  );
}
