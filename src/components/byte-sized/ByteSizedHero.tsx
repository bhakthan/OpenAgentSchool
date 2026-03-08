import React, { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { ALL_BYTE_CARDS, BYTE_CATEGORIES } from '@/lib/data/byteSized';
import { loadByteProgress } from '@/lib/data/microLearning/progress';

interface ByteSizedHeroProps {
  onBrowse: () => void;
  onRandom: () => void;
}

export const ByteSizedHero: React.FC<ByteSizedHeroProps> = ({ onBrowse, onRandom }) => {
  const stats = useMemo(() => {
    const bp = loadByteProgress();
    return {
      totalCards: ALL_BYTE_CARDS.length,
      totalConcepts: new Set(ALL_BYTE_CARDS.map((c) => c.conceptId)).size,
      categories: BYTE_CATEGORIES.length,
      completed: bp.completedCards.length,
      xpEarned: bp.totalXP,
    };
  }, []);

  const pct = stats.totalCards > 0 ? Math.round((stats.completed / stats.totalCards) * 100) : 0;

  return (
    <div className="feature-card-enter feature-panel-strong relative overflow-hidden rounded-3xl border">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/14 via-fuchsia-500/12 to-amber-500/14 dark:from-violet-500/5 dark:via-fuchsia-500/5 dark:to-amber-500/5" />

      <div className="relative space-y-6 px-[clamp(1.5rem,4vw,2.5rem)] py-[clamp(2.5rem,5vw,3.5rem)] text-center">
        {/* Headline */}
        <div className="space-y-2">
          <span className="feature-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-violet-700 dark:text-violet-300">
            ⚡ Byte-Sized Learning
          </span>
          <h1 className="text-balance text-[clamp(2.2rem,3.2vw+1rem,3.4rem)] font-extrabold tracking-tight text-foreground">
            AI Concepts in <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">60 Seconds</span>
          </h1>
          <p className="text-pretty feature-secondary mx-auto max-w-xl text-sm dark:text-muted-foreground">
            Each concept distilled into 5 bite-sized cards — definition, logic, pattern, learning loop, and real-world example. 
            Learn at your pace, earn XP along the way.
          </p>
        </div>

        {/* Stats row */}
        <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-4 sm:gap-6">
          <StatPill label="Cards" value={stats.totalCards} />
          <StatPill label="Concepts" value={stats.totalConcepts} />
          <StatPill label="Categories" value={stats.categories} />
          {stats.completed > 0 && <StatPill label="Completed" value={stats.completed} highlight />}
        </div>

        {/* Global progress */}
        {stats.completed > 0 && (
          <div className="mx-auto max-w-xs space-y-1">
            <div className="feature-secondary flex justify-between text-xs dark:text-muted-foreground">
              <span>{pct}% mastered</span>
              <span>+{stats.xpEarned} XP</span>
            </div>
            <div className="h-2 rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            onClick={onBrowse}
            className="border border-violet-500/60 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/20 hover:from-violet-500 hover:to-fuchsia-500"
          >
            Browse Categories
          </Button>
          <Button variant="outline" onClick={onRandom}>
            🎲 Random Card
          </Button>
        </div>
      </div>
    </div>
  );
};

function StatPill({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm ${
      highlight
        ? 'border border-emerald-500/20 bg-emerald-500/12 text-emerald-700 dark:text-emerald-300'
        : 'feature-chip'
    }`}>
      <span className="font-bold">{value}</span>
      <span className="text-xs">{label}</span>
    </div>
  );
}

export default ByteSizedHero;
