import { Headphones, Play, Fire } from '@phosphor-icons/react';
import type { ListeningProfile } from '@/lib/data/microListening/types';

interface ListeningHeroProps {
  onStartListening: () => void;
  profile: ListeningProfile;
}

export function ListeningHero({ onStartListening, profile }: ListeningHeroProps) {
  const hasProgress = profile.totalEpisodesCompleted > 0;

  return (
    <section className="relative flex flex-col items-center justify-center gap-8 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-50 to-violet-100 px-6 py-20 text-center dark:from-slate-950 dark:to-indigo-950">
      {/* Animated soundwave */}
      <div className="flex items-end gap-1.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="w-1.5 rounded-full bg-indigo-400/80"
            style={{
              animation: `soundwave 1.2s ease-in-out ${i * 0.15}s infinite alternate`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes soundwave {
          0%   { height: 12px; opacity: 0.4; }
          50%  { height: 36px; opacity: 1; }
          100% { height: 18px; opacity: 0.6; }
        }
      `}</style>

      {/* Heading */}
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Micro-Listen. <span className="text-indigo-600 dark:text-indigo-400">Macro-Learn.</span>
        </h1>
        <p className="max-w-lg text-lg text-foreground/70 dark:text-muted-foreground">
          Turn any 5 minutes into an AI breakthrough. Adaptive audio that meets you where you are.
        </p>
      </div>

      {/* CTA */}
      <button
        onClick={onStartListening}
        className="inline-flex items-center gap-2.5 rounded-full bg-indigo-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:scale-105 hover:bg-indigo-400 active:scale-[0.98]"
      >
        {hasProgress ? (
          <>
            <Headphones size={22} weight="bold" />
            Continue Listening
          </>
        ) : (
          <>
            <Play size={22} weight="fill" />
            Press Play on Your AI Future
          </>
        )}
      </button>

      {/* Stats row */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-foreground/60 dark:text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Headphones size={16} weight="bold" className="text-indigo-600 dark:text-indigo-400" />
          <strong className="text-foreground">{profile.totalEpisodesCompleted}</strong> Episodes
        </span>
        <span className="h-4 w-px bg-border" aria-hidden="true" />
        <span className="inline-flex items-center gap-1.5">
          <Play size={16} weight="fill" className="text-indigo-600 dark:text-indigo-400" />
          <strong className="text-foreground">{profile.totalMinutesListened}</strong> Minutes
        </span>
        <span className="h-4 w-px bg-border" aria-hidden="true" />
        <span className="inline-flex items-center gap-1.5">
          <Fire size={16} weight="fill" className="text-orange-500 dark:text-orange-400" />
          <strong className="text-foreground">{profile.currentStreak}</strong> Day Streak
        </span>
      </div>
    </section>
  );
}
