import { Headphones, Play, Fire } from '@phosphor-icons/react';
import type { ListeningProfile } from '@/lib/data/microListening/types';

interface ListeningHeroProps {
  onStartListening: () => void;
  profile: ListeningProfile;
}

export function ListeningHero({ onStartListening, profile }: ListeningHeroProps) {
  const hasProgress = profile.totalEpisodesCompleted > 0;

  return (
    <section
      className="feature-card-enter relative flex flex-col items-center justify-center gap-8 overflow-hidden rounded-3xl border border-indigo-200/70 bg-gradient-to-br from-indigo-100 via-violet-50 to-sky-100 px-6 py-[clamp(3.5rem,8vw,5rem)] text-center shadow-[0_18px_48px_-24px_rgba(79,70,229,0.35)] dark:border-indigo-900/60 dark:from-slate-950 dark:via-indigo-950 dark:to-violet-950 dark:shadow-none"
      style={{ animation: 'macroListenBounce 4.8s ease-in-out infinite' }}
    >
      {/* Animated soundwave */}
      <div className="flex items-end gap-1.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="w-1.5 rounded-full bg-indigo-500/80 dark:bg-indigo-400/80"
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

        @keyframes macroListenBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>

      {/* Heading */}
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-balance text-[clamp(2.4rem,4vw+1rem,3.75rem)] font-extrabold tracking-tight text-foreground">
          Micro-Listen. <span className="text-indigo-600 dark:text-indigo-400">Macro-Learn.</span>
        </h1>
        <p className="text-pretty max-w-lg text-lg text-slate-700 dark:text-muted-foreground">
          Turn any 5 minutes into an AI breakthrough. Adaptive audio that meets you where you are.
        </p>
      </div>

      {/* CTA */}
      <button
        onClick={onStartListening}
        className="inline-flex items-center gap-2.5 rounded-full border border-indigo-500/70 bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:scale-105 hover:from-indigo-500 hover:to-violet-500 hover:shadow-xl hover:shadow-indigo-500/35 active:scale-[0.98] dark:border-indigo-400/20"
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
      <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-slate-600 dark:text-muted-foreground">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/75 px-3 py-1.5 shadow-sm shadow-indigo-100/70 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-none">
          <Headphones size={16} weight="bold" className="text-indigo-600 dark:text-indigo-400" />
          <strong className="text-foreground">{profile.totalEpisodesCompleted}</strong> Episodes
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/75 px-3 py-1.5 shadow-sm shadow-indigo-100/70 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-none">
          <Play size={16} weight="fill" className="text-indigo-600 dark:text-indigo-400" />
          <strong className="text-foreground">{profile.totalMinutesListened}</strong> Minutes
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/75 px-3 py-1.5 shadow-sm shadow-indigo-100/70 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-none">
          <Fire size={16} weight="fill" className="text-orange-500 dark:text-orange-400" />
          <strong className="text-foreground">{profile.currentStreak}</strong> Day Streak
        </span>
      </div>
    </section>
  );
}
