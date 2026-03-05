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
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-amber-500/5" />

      <div className="relative px-6 py-10 sm:px-10 sm:py-14 text-center space-y-6">
        {/* Headline */}
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-600 dark:text-violet-400">
            ⚡ Byte-Sized Learning
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            AI Concepts in <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">60 Seconds</span>
          </h1>
          <p className="mx-auto max-w-xl text-sm text-muted-foreground">
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
            <div className="flex justify-between text-xs text-muted-foreground">
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
            className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/20"
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
        ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
        : 'bg-muted text-muted-foreground'
    }`}>
      <span className="font-bold">{value}</span>
      <span className="text-xs">{label}</span>
    </div>
  );
}

export default ByteSizedHero;
