import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics/ga';
import type { ByteCard as ByteCardType } from '@/lib/data/byteSized/types';
import { CARD_TYPE_META } from '@/lib/data/byteSized/types';
import { isByteCardCompleted } from '@/lib/data/microLearning/progress';
import { ByteCard } from './ByteCard';
import type { LanguageCode } from '@/lib/languages';

interface ByteCardStackProps {
  cards: ByteCardType[];
  conceptTitle: string;
  onBack: () => void;
  onConceptComplete?: () => void;
  contentLanguage?: LanguageCode;
}

export const ByteCardStack: React.FC<ByteCardStackProps> = ({
  cards,
  conceptTitle,
  onBack,
  onConceptComplete,
  contentLanguage = 'en',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [xpSession, setXpSession] = useState(0);
  const [completedSet, setCompletedSet] = useState<Set<string>>(
    () => new Set(cards.filter((c) => isByteCardCompleted(c.id)).map((c) => c.id)),
  );

  const total = cards.length;
  const card = cards[currentIndex];
  const allDone = completedSet.size === total;

  const goNext = useCallback(() => {
    if (currentIndex < total - 1) setCurrentIndex((i) => i + 1);
  }, [currentIndex, total]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev]);

  const handleCardComplete = useCallback(
    (xpEarned: number) => {
      setXpSession((x) => x + xpEarned);
      setCompletedSet((prev) => {
        const next = new Set(prev);
        next.add(card.id);
        if (next.size === total) {
          trackEvent({
            action: 'byte_concept_complete',
            category: 'byte_sized',
            label: card.conceptId,
          });
          onConceptComplete?.();
        }
        return next;
      });
    },
    [card, total, onConceptComplete],
  );

  return (
    <div className="mx-auto max-w-lg space-y-[clamp(1rem,2vw,1.25rem)]">
      {/* ─── Header ───────────────────────────────────────────── */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          ← Back
        </Button>
        <div className="min-w-0 flex-1">
          <h2 className="text-balance truncate text-sm font-semibold text-foreground">
            {conceptTitle}
          </h2>
          <p className="feature-secondary text-xs dark:text-muted-foreground">
            {completedSet.size}/{total} cards · +{xpSession} XP this session
          </p>
        </div>
      </div>

      {/* ─── Progress Dots ────────────────────────────────────── */}
      <div className="flex items-center justify-center gap-1.5">
        {cards.map((c, i) => {
          const done = completedSet.has(c.id);
          const active = i === currentIndex;
          const meta = CARD_TYPE_META[c.cardType];
          return (
            <button
              key={c.id}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-200 ${
                active ? 'w-6' : 'w-2'
              }`}
              style={{
                backgroundColor: done
                  ? meta.color
                  : active
                    ? `${meta.color}80`
                    : 'var(--muted)',
              }}
              aria-label={`Card ${i + 1}: ${CARD_TYPE_META[c.cardType].label}`}
            />
          );
        })}
      </div>

      {/* ─── Card ─────────────────────────────────────────────── */}
      <ByteCard
        key={card.id}
        card={card}
        onComplete={handleCardComplete}
        onReviewLater={currentIndex < total - 1 ? goNext : undefined}
        contentLanguage={contentLanguage}
      />

      {/* ─── Navigation ───────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={goPrev}
          disabled={currentIndex === 0}
        >
          ← Prev
        </Button>
        <span className="feature-secondary text-xs dark:text-muted-foreground">
          {currentIndex + 1} / {total}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={goNext}
          disabled={currentIndex === total - 1}
        >
          Next →
        </Button>
      </div>

      {/* ─── Celebration ──────────────────────────────────────── */}
      {allDone && (
        <div className="rounded-2xl border border-emerald-500/30 bg-[color-mix(in_oklch,var(--background)_82%,theme(colors.emerald.300))] p-5 text-center dark:bg-emerald-500/5">
          <span className="text-3xl">🎉</span>
          <h3 className="mt-2 text-lg font-bold text-foreground">Concept Mastered!</h3>
          <p className="feature-secondary text-sm dark:text-muted-foreground">
            You earned <strong>{xpSession} XP</strong> from {total} byte-sized cards.
          </p>
          <Button variant="outline" size="sm" onClick={onBack} className="mt-3">
            Browse More Concepts
          </Button>
        </div>
      )}
    </div>
  );
};

export default ByteCardStack;
