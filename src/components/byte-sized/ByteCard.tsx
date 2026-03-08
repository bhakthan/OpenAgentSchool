import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics/ga';
import type { ByteCard as ByteCardType } from '@/lib/data/byteSized/types';
import { CARD_TYPE_META } from '@/lib/data/byteSized/types';
import { completeByteCard, isByteCardCompleted } from '@/lib/data/microLearning/progress';
import { scheduleMicroLearningSync } from '@/lib/sync/microLearningSync';
import { useTranslatedText } from '@/lib/hooks/useTranslatedText';
import type { LanguageCode } from '@/lib/languages';

interface ByteCardProps {
  card: ByteCardType;
  onComplete: (xpEarned: number) => void;
  onReviewLater?: () => void;
  contentLanguage?: LanguageCode;
}

export const ByteCard: React.FC<ByteCardProps> = ({ card, onComplete, onReviewLater, contentLanguage = 'en' }) => {
  const [completed, setCompleted] = useState(() => isByteCardCompleted(card.id));
  const [showHighlight, setShowHighlight] = useState(false);
  const meta = CARD_TYPE_META[card.cardType];

  // Translate content fields
  const { translated: translatedTitle } = useTranslatedText(card.title, contentLanguage);
  const { translated: translatedContent, isTranslating } = useTranslatedText(card.content, contentLanguage);
  const { translated: translatedHighlight } = useTranslatedText(card.highlight || '', contentLanguage);

  const handleGotIt = () => {
    if (completed) return;
    const { xpEarned } = completeByteCard(card.id);
    scheduleMicroLearningSync();
    setCompleted(true);
    onComplete(xpEarned);

    trackEvent({
      action: 'byte_card_complete',
      category: 'byte_sized',
      label: `${card.conceptId}/${card.cardType}`,
      value: xpEarned,
    });
  };

  return (
    <div className="feature-card-enter flex h-full flex-col rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-200">
      {/* ─── Card Type Banner ─────────────────────────────────── */}
      <div
        className="flex items-center gap-3 rounded-t-2xl px-5 py-4"
        style={{ background: `linear-gradient(135deg, ${meta.color}22, ${meta.color}0a)` }}
      >
        <span className="text-3xl">{card.emoji}</span>
        <div className="min-w-0 flex-1">
          <Badge
            className="mb-1 text-[10px]"
            style={{
              backgroundColor: `${meta.color}20`,
              color: meta.color,
              borderColor: `${meta.color}30`,
            }}
          >
            {meta.emoji} {meta.label}
          </Badge>
          <h3 className="text-balance text-base font-bold text-foreground">{translatedTitle}</h3>
        </div>
        <span className="feature-secondary text-xs dark:text-muted-foreground">
          {card.order}/5
        </span>
      </div>

      {/* ─── Core Content ─────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-4 px-5 py-5">
        <p className="text-pretty text-sm leading-relaxed text-foreground/90">
          {isTranslating ? (
            <span className="inline-flex items-center gap-2">
              <span className="animate-pulse">⏳</span> Translating…
            </span>
          ) : translatedContent}
        </p>

        {/* Highlight — toggleable insight */}
        {card.highlight && (
          <button
            type="button"
            onClick={() => setShowHighlight(!showHighlight)}
            className="w-full text-left"
          >
            <div
              className="rounded-xl border px-4 py-3 transition-colors"
              style={{
                borderColor: `${meta.color}35`,
                backgroundColor: showHighlight ? `${meta.color}16` : `${meta.color}08`,
              }}
            >
              <span className="text-xs font-semibold" style={{ color: meta.color }}>
                💡 {showHighlight ? 'Key Insight' : 'Tap for key insight'}
              </span>
              {showHighlight && (
                <p className="text-pretty mt-1 text-xs leading-relaxed text-foreground/70 dark:text-muted-foreground">
                  {translatedHighlight}
                </p>
              )}
            </div>
          </button>
        )}

        {/* Tags */}
        {card.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {card.tags.map((tag) => (
              <span
                key={tag}
                className="feature-chip rounded-full px-2 py-0.5 text-[10px] dark:text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ─── Actions Footer ───────────────────────────────────── */}
      <div className="border-t border-border px-5 py-3 flex items-center justify-between">
        {completed ? (
          <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20">
            ✓ Got it · +{card.xpValue} XP
          </Badge>
        ) : (
          <>
            {onReviewLater && (
              <Button variant="ghost" size="sm" onClick={onReviewLater} className="text-xs">
                Review later
              </Button>
            )}
            <Button
              onClick={handleGotIt}
              size="sm"
              className="ml-auto bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 text-white"
            >
              ✓ Got it!
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ByteCard;
