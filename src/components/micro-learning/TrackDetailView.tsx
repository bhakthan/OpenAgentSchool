import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { trackEvent } from '@/lib/analytics/ga';
import {
  getTrackById,
  getCapsulesByTrackGrouped,
  getTrackProgress,
  isCapsuleCompleted,
  CAPSULES_BY_TRACK,
} from '@/lib/data/microLearning';
import type { Capsule, CapsuleType } from '@/lib/data/microLearning';

interface TrackDetailViewProps {
  trackId: string;
  onCapsuleSelect: (capsuleId: string) => void;
  onBack: () => void;
}

const TYPE_ICONS: Record<CapsuleType, string> = {
  read: '📖',
  visualize: '👁️',
  'quiz-checkpoint': '✅',
  apply: '🧠',
  'pattern-connect': '🔗',
};

const TYPE_LABELS: Record<CapsuleType, string> = {
  read: 'Read',
  visualize: 'Visualize',
  'quiz-checkpoint': 'Quiz',
  apply: 'Apply',
  'pattern-connect': 'Pattern',
};

export const TrackDetailView: React.FC<TrackDetailViewProps> = ({ trackId, onCapsuleSelect, onBack }) => {
  const navigate = useNavigate();
  const track = getTrackById(trackId);
  const { completed, total, percent } = getTrackProgress(trackId);
  const grouped = useMemo(() => getCapsulesByTrackGrouped(trackId), [trackId]);
  const allCapsules = CAPSULES_BY_TRACK[trackId] ?? [];

  // Find first incomplete capsule for "Continue" button
  const nextCapsule = useMemo(
    () => allCapsules.find((c) => !isCapsuleCompleted(c.id)),
    [allCapsules],
  );

  if (!track) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Track not found.</p>
        <Button variant="ghost" onClick={onBack} className="mt-4">← Back to tracks</Button>
      </div>
    );
  }

  const conceptEntries = Array.from(grouped.entries());
  let globalIndex = 0;

  return (
    <div className="space-y-8">
      {/* ─── Track Header ───────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="self-start">
          ← All Tracks
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${track.gradient} flex items-center justify-center text-white text-xl font-bold shrink-0`}>
              {track.title.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{track.title}</h1>
              <p className="text-sm text-muted-foreground">{track.tagline}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{percent}%</div>
            <div className="text-xs text-muted-foreground">{completed}/{total} capsules</div>
          </div>
        </div>
      </div>

      {/* Overall progress */}
      <Progress value={percent} className="h-2" />

      {/* Continue button */}
      {nextCapsule && (
        <Button
          onClick={() => {
            trackEvent({ action: completed > 0 ? 'micro_continue_track' : 'micro_start_track', category: 'micro_learning', label: trackId, value: percent });
            onCapsuleSelect(nextCapsule.id);
          }}
          className="w-full sm:w-auto bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 text-white"
          size="lg"
        >
          {completed > 0 ? '▶ Continue Learning' : '▶ Start Track'}
        </Button>
      )}

      {completed === total && total > 0 && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6 text-center">
          <div className="text-3xl mb-2">🎉</div>
          <h3 className="font-bold text-lg">Track Complete!</h3>
          <p className="text-sm text-muted-foreground mt-1">
            You've mastered all {total} capsules. Your skills are ready for real-world application.
          </p>
        </div>
      )}

      {/* ─── Capsule Timeline ───────────────────────────────────── */}
      <div className="space-y-6">
        {conceptEntries.map(([conceptId, capsules], chapterIdx) => {
          const chapterCompleted = capsules.every((c) => isCapsuleCompleted(c.id));
          const chapterStarted = capsules.some((c) => isCapsuleCompleted(c.id));

          return (
            <div key={conceptId} className="relative">
              {/* Chapter header */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${
                    chapterCompleted
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : chapterStarted
                      ? 'border-primary text-primary'
                      : 'border-muted-foreground/30 text-muted-foreground'
                  }`}
                >
                  {chapterCompleted ? '✓' : chapterIdx + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-sm capitalize">
                    {conceptId.replace(/-/g, ' ')}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {capsules.length} capsules · ~{capsules.reduce((s, c) => s + c.estimatedMinutes, 0)} min
                  </span>
                </div>
              </div>

              {/* Capsule nodes */}
              <div className="ml-4 border-l-2 border-muted pl-6 space-y-2">
                {capsules.map((capsule) => {
                  globalIndex++;
                  const done = isCapsuleCompleted(capsule.id);
                  const isCurrent = !done && nextCapsule?.id === capsule.id;

                  return (
                    <button
                      key={capsule.id}
                      onClick={() => {
                        trackEvent({ action: 'micro_capsule_select', category: 'micro_learning', label: `${trackId}/${capsule.id}`, value: done ? 1 : 0 });
                        onCapsuleSelect(capsule.id);
                      }}
                      className={`w-full text-left flex items-center gap-3 p-3 rounded-lg border transition-all text-foreground ${
                        done
                          ? 'bg-emerald-500/5 border-emerald-500/20 hover:bg-emerald-500/10'
                          : isCurrent
                          ? 'bg-primary/5 border-primary/30 shadow-sm ring-2 ring-primary/20'
                          : 'hover:bg-muted/50 border-transparent hover:border-border'
                      }`}
                    >
                      {/* Status indicator */}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                          done
                            ? 'bg-emerald-500 text-white'
                            : isCurrent
                            ? 'bg-primary/20 text-primary animate-pulse'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {done ? '✓' : TYPE_ICONS[capsule.type]}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-medium ${done ? 'text-emerald-700 dark:text-emerald-400' : ''}`}>
                            {capsule.title}
                          </span>
                          <Badge variant="outline" className="text-[10px] shrink-0">
                            {TYPE_LABELS[capsule.type]}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">{capsule.subtitle}</p>
                      </div>

                      <span className="text-xs text-muted-foreground shrink-0">{capsule.estimatedMinutes}m</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackDetailView;
