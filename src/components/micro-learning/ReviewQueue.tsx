// ─── ReviewQueue Component ───────────────────────────────────────────────────
// Surfaces capsules that are due for spaced-repetition review, plus adaptive
// recommendations. Designed to slot into the Dashboard or as a standalone view.

import React, { useMemo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  getDueReviews,
  getUpcomingReviews,
  processReview,
  quizScoreToQuality,
  type ReviewCard,
  type QualityRating,
} from '@/lib/data/microLearning/spacedRepetition';
import {
  getRecommendations,
  computePerformanceProfile,
  type CapsuleRecommendation,
  type RecommendationReason,
} from '@/lib/data/microLearning/adaptiveEngine';
import { getCapsuleById } from '@/lib/data/microLearning/capsules';
import { getTrackById, TRACKS } from '@/lib/data/microLearning/tracks';
import type { MicroLearningProgress, Capsule } from '@/lib/data/microLearning/types';
import { scheduleMicroLearningSync } from '@/lib/sync/microLearningSync';

// ─── Props ───────────────────────────────────────────────────────────────────

interface ReviewQueueProps {
  progress: MicroLearningProgress;
  /** Navigate to a capsule (e.g. set active view in MicroLearningPage) */
  onNavigateToCapsule?: (capsuleId: string, trackId: string) => void;
}

// ─── Main Component ──────────────────────────────────────────────────────────

export const ReviewQueue: React.FC<ReviewQueueProps> = ({
  progress,
  onNavigateToCapsule,
}) => {
  const [revision, setRevision] = useState(0);

  const dueReviews = useMemo(() => getDueReviews(), [revision]);
  const upcomingReviews = useMemo(() => getUpcomingReviews(3), [revision]);
  const recommendations = useMemo(() => getRecommendations(progress, 5), [progress, revision]);
  const profile = useMemo(() => computePerformanceProfile(progress), [progress]);

  const onlyUpcoming = upcomingReviews.filter(
    (r) => !dueReviews.some((d) => d.capsuleId === r.capsuleId),
  );

  const handleQuickReview = useCallback(
    (capsuleId: string, quality: QualityRating) => {
      processReview(capsuleId, quality);
      scheduleMicroLearningSync();
      setRevision((r) => r + 1);
    },
    [],
  );

  const isEmpty =
    dueReviews.length === 0 &&
    recommendations.length === 0 &&
    onlyUpcoming.length === 0;

  if (isEmpty) {
    return (
      <div className="rounded-2xl border bg-card text-card-foreground p-6 text-center">
        <p className="text-3xl mb-2">🎯</p>
        <p className="font-semibold text-foreground">All caught up!</p>
        <p className="text-sm text-foreground/70 dark:text-muted-foreground mt-1">
          Complete more capsules to unlock spaced-repetition reviews and adaptive recommendations.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ── Performance Snapshot ──────────────────────────── */}
      {profile.quizCount > 0 && (
        <div className="flex flex-wrap gap-3">
          <StatChip
            label="Avg Quiz"
            value={`${profile.avgQuizScore}%`}
            color={profile.avgQuizScore >= 80 ? 'emerald' : profile.avgQuizScore >= 60 ? 'amber' : 'rose'}
          />
          <StatChip label="Velocity" value={`${profile.velocity}/day`} color="sky" />
          <StatChip
            label="Comfort"
            value={profile.comfortZone}
            color="violet"
          />
          {profile.stretchZone !== profile.comfortZone && (
            <StatChip label="Stretch" value={profile.stretchZone} color="fuchsia" />
          )}
        </div>
      )}

      {/* ── Due Reviews ──────────────────────────────────── */}
      {dueReviews.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-lg font-semibold">🔄 Review Due</h3>
            <Badge variant="destructive" className="text-xs">
              {dueReviews.length}
            </Badge>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {dueReviews.map((card) => (
              <ReviewCardItem
                key={card.capsuleId}
                card={card}
                onQuickReview={handleQuickReview}
                onNavigate={onNavigateToCapsule}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── Adaptive Recommendations ─────────────────────── */}
      {recommendations.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold mb-3">✨ Recommended Next</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((rec) => (
              <RecommendationCard
                key={rec.capsuleId}
                rec={rec}
                onNavigate={onNavigateToCapsule}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── Upcoming Reviews ─────────────────────────────── */}
      {onlyUpcoming.length > 0 && (
        <section>
          <h3 className="text-base font-medium text-foreground/70 dark:text-muted-foreground mb-2">
            📅 Coming Up (next 3 days)
          </h3>
          <div className="flex flex-wrap gap-2">
            {onlyUpcoming.map((card) => {
              const capsule = getCapsuleById(card.capsuleId);
              return (
                <Badge key={card.capsuleId} variant="outline" className="text-xs py-1">
                  {capsule?.title ?? card.capsuleId} — {formatRelativeDate(card.nextReviewDate)}
                </Badge>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

// ─── Sub-Components ──────────────────────────────────────────────────────────

interface ReviewCardItemProps {
  card: ReviewCard;
  onQuickReview: (capsuleId: string, quality: QualityRating) => void;
  onNavigate?: (capsuleId: string, trackId: string) => void;
}

const ReviewCardItem: React.FC<ReviewCardItemProps> = ({
  card,
  onQuickReview,
  onNavigate,
}) => {
  const capsule = getCapsuleById(card.capsuleId);
  const trackId = findTrackForCapsule(capsule);

  return (
    <div className="rounded-xl border bg-card text-card-foreground p-4 space-y-3">
      <div>
        <p className="font-medium text-sm truncate text-foreground">{capsule?.title ?? card.capsuleId}</p>
        <p className="text-xs text-foreground/60 dark:text-muted-foreground">
          {card.repetition === 0 ? 'First review' : `Review #${card.repetition + 1}`}
          {' · '}
          Due {formatRelativeDate(card.nextReviewDate)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {onNavigate && trackId && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onNavigate(card.capsuleId, trackId)}
          >
            Open
          </Button>
        )}
        <div className="flex gap-1 ml-auto">
          {([
            { q: 1 as QualityRating, label: '😕', title: 'Hard' },
            { q: 3 as QualityRating, label: '🤔', title: 'OK' },
            { q: 5 as QualityRating, label: '😎', title: 'Easy' },
          ]).map(({ q, label, title }) => (
            <button
              key={q}
              onClick={() => onQuickReview(card.capsuleId, q)}
              className="rounded-lg border px-2.5 py-1 text-sm hover:bg-muted transition-colors"
              title={title}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Recommendation Card ─────────────────────────────────────────────────────

interface RecommendationCardProps {
  rec: CapsuleRecommendation;
  onNavigate?: (capsuleId: string, trackId: string) => void;
}

const REASON_LABELS: Record<RecommendationReason, { icon: string; text: string }> = {
  'review-due': { icon: '🔄', text: 'Review due' },
  'next-in-track': { icon: '➡️', text: 'Next step' },
  'comfort-zone': { icon: '🎯', text: 'Good fit' },
  'stretch-challenge': { icon: '🚀', text: 'Challenge' },
  'struggling-retry': { icon: '💪', text: 'Try again' },
  'fresh-start': { icon: '🌟', text: 'New topic' },
};

const RecommendationCard: React.FC<RecommendationCardProps> = ({ rec, onNavigate }) => {
  const capsule = getCapsuleById(rec.capsuleId);
  const trackId = findTrackForCapsule(capsule);
  const reasonInfo = REASON_LABELS[rec.reason];

  return (
    <div className="rounded-xl border bg-card text-card-foreground p-4 space-y-2 hover:shadow-sm transition-shadow">
      <div className="flex items-start gap-2">
        <span className="text-lg">{reasonInfo.icon}</span>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate text-foreground">{capsule?.title ?? rec.capsuleId}</p>
          <p className="text-xs text-foreground/60 dark:text-muted-foreground">{reasonInfo.text}</p>
        </div>
        <Badge variant="secondary" className="text-[10px] shrink-0">
          {capsule?.type ?? 'read'}
        </Badge>
      </div>
      {onNavigate && trackId && (
        <Button
          size="sm"
          variant="ghost"
          className="w-full text-xs"
          onClick={() => onNavigate(rec.capsuleId, trackId)}
        >
          Start →
        </Button>
      )}
    </div>
  );
};

// ─── Stat Chip ───────────────────────────────────────────────────────────────

const StatChip: React.FC<{
  label: string;
  value: string;
  color: string;
}> = ({ label, value, color }) => (
  <div
    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium bg-${color}-500/10 text-${color}-700 dark:text-${color}-400 border-${color}-200 dark:border-${color}-800`}
  >
    <span className="text-foreground/60 dark:text-muted-foreground">{label}</span>
    <span className="font-semibold">{value}</span>
  </div>
);

// ─── Utilities ───────────────────────────────────────────────────────────────

function findTrackForCapsule(capsule?: Capsule): string | undefined {
  if (!capsule) return undefined;
  return TRACKS.find((t) => t.conceptIds.includes(capsule.conceptId))?.id;
}

function formatRelativeDate(iso: string): string {
  const now = new Date();
  const target = new Date(iso);
  const diffMs = target.getTime() - now.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < -1) return `${Math.abs(diffDays)}d overdue`;
  if (diffDays === -1) return 'yesterday';
  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'tomorrow';
  return `in ${diffDays}d`;
}
