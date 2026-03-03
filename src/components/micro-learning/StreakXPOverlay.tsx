import React, { useEffect, useState, useCallback } from 'react';
import type { MicroAchievement } from '@/lib/hooks/microLearningAchievements';

interface StreakXPOverlayProps {
  /** XP just earned (triggers the animation) */
  xpEarned: number;
  /** Current streak count */
  streak: number;
  /** Milestone hit? (e.g., every 5 days, first capsule) */
  milestone?: string | null;
  /** Newly unlocked achievements to show */
  newAchievements?: MicroAchievement[];
  /** Called once animations finish */
  onDone: () => void;
}

/**
 * Animated toast overlay — shown when a learner completes a capsule.
 * - "+XP" fly-up
 * - Streak flame if streak > 0
 * - Optional milestone celebration with confetti-like particles
 */
export const StreakXPOverlay: React.FC<StreakXPOverlayProps> = ({
  xpEarned,
  streak,
  milestone,
  newAchievements = [],
  onDone,
}) => {
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter');
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; char: string }[]>([]);

  // Generate confetti-like particles for milestone
  useEffect(() => {
    if (milestone) {
      const chars = ['🎉', '⭐', '✨', '🔥', '🚀', '💎'];
      setParticles(
        Array.from({ length: 12 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          char: chars[i % chars.length],
        })),
      );
    }
  }, [milestone]);

  // Animation timeline
  useEffect(() => {
    const hasExtra = !!(milestone || newAchievements.length > 0);
    const enterTimer = setTimeout(() => setPhase('hold'), 100);
    const holdTimer = setTimeout(() => setPhase('exit'), hasExtra ? 3200 : 1800);
    const doneTimer = setTimeout(onDone, hasExtra ? 3800 : 2400);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(holdTimer);
      clearTimeout(doneTimer);
    };
  }, [milestone, newAchievements.length, onDone]);

  return (
    <div
      className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center"
      aria-live="polite"
    >
      {/* Backdrop pulse */}
      <div
        className={`absolute inset-0 bg-primary/5 transition-opacity duration-500 ${
          phase === 'hold' ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Particle layer (milestones) */}
      {milestone && particles.map((p) => (
        <span
          key={p.id}
          className="absolute text-2xl transition-all duration-[2s] ease-out"
          style={{
            left: `${p.x}%`,
            top: phase === 'enter' ? '50%' : `${p.y}%`,
            opacity: phase === 'exit' ? 0 : 1,
            transform: phase === 'hold' ? `scale(1.2) rotate(${p.id * 30}deg)` : 'scale(0)',
          }}
        >
          {p.char}
        </span>
      ))}

      {/* Central toast card */}
      <div
        className={`relative rounded-2xl bg-card text-card-foreground border shadow-2xl px-8 py-6 text-center transition-all duration-500 ${
          phase === 'enter' ? 'scale-50 opacity-0' :
          phase === 'hold' ? 'scale-100 opacity-100' :
          'scale-90 opacity-0 translate-y-4'
        }`}
      >
        {/* XP flyup */}
        <div className="text-3xl font-black bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 bg-clip-text text-transparent mb-1">
          +{xpEarned} XP
        </div>

        {/* Streak flame */}
        {streak > 0 && (
          <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">
            🔥 {streak}-day streak
          </p>
        )}

        {/* Milestone message */}
        {milestone && (
          <div className="mt-3 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
            <p className="text-sm font-bold text-amber-700 dark:text-amber-300">{milestone}</p>
          </div>
        )}

        {/* Achievement unlock toasts */}
        {newAchievements.length > 0 && (
          <div className="mt-3 space-y-1.5">
            {newAchievements.map((a) => (
              <div
                key={a.id}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20"
              >
                <span className="text-lg">{a.icon}</span>
                <div className="text-left">
                  <p className="text-xs font-bold text-violet-700 dark:text-violet-300">{a.title}</p>
                  <p className="text-[10px] text-muted-foreground">+{a.bonusXP} bonus XP</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StreakXPOverlay;
