import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  SORTER_QUESTIONS,
  buildRoleProfile,
  saveRoleProfile,
  getTrackById,
} from '@/lib/data/microLearning';
import type { LearnerRole, ExperienceLevel, LearnerGoal } from '@/lib/data/microLearning';
import { trackEvent } from '@/lib/analytics/ga';

interface RoleSorterProps {
  open: boolean;
  onClose: () => void;
  onComplete: (recommendedTrackIds: string[]) => void;
}

export const RoleSorter: React.FC<RoleSorterProps> = ({ open, onClose, onComplete }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = SORTER_QUESTIONS[step];
  const isLastStep = step === SORTER_QUESTIONS.length - 1;
  const isResultStep = step === SORTER_QUESTIONS.length;

  const handleSelect = useCallback(
    (value: string) => {
      const updated = { ...answers, [currentQuestion.id]: value };
      setAnswers(updated);
      trackEvent({ action: 'micro_sorter_answer', category: 'micro_learning', label: `${currentQuestion.id}::${value}`, value: step + 1 });

      if (isLastStep) {
        // Move to result step
        setStep(step + 1);
      } else {
        setStep(step + 1);
      }
    },
    [answers, currentQuestion, isLastStep, step],
  );

  const handleBack = useCallback(() => {
    if (step > 0) setStep(step - 1);
  }, [step]);

  const handleSkip = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleStartLearning = useCallback(() => {
    const profile = buildRoleProfile(
      answers.role as LearnerRole,
      answers.experience as ExperienceLevel,
      answers.goal as LearnerGoal,
    );
    saveRoleProfile(profile);

    trackEvent({ action: 'micro_sorter_complete', category: 'micro_learning', label: `${profile.role}/${profile.experience}/${profile.goal}`, value: profile.recommendedTrackIds.length });

    // Fire analytics (legacy custom event)
    try {
      window.dispatchEvent(
        new CustomEvent('analytics:microLearning:roleSorter', {
          detail: {
            role: profile.role,
            experience: profile.experience,
            goal: profile.goal,
            recommendedTracks: profile.recommendedTrackIds,
          },
        }),
      );
    } catch {}

    onComplete(profile.recommendedTrackIds);
  }, [answers, onComplete]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Find your learning path"
    >
      <div className="relative w-full max-w-lg mx-4 rounded-2xl border bg-card shadow-2xl overflow-hidden">
        {/* Progress bar */}
        <div className="h-1 bg-muted">
          <div
            className="h-full bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 transition-all duration-500"
            style={{ width: `${((step + 1) / (SORTER_QUESTIONS.length + 1)) * 100}%` }}
          />
        </div>

        <div className="p-6 md:p-8">
          {/* Close / Skip */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs text-muted-foreground">
              {isResultStep ? 'Your Results' : `Step ${step + 1} of ${SORTER_QUESTIONS.length}`}
            </span>
            <button
              onClick={handleSkip}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Skip and browse all tracks"
            >
              Skip →
            </button>
          </div>

          {isResultStep ? (
            /* ─── Results Screen ────────────────────────────────────── */
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl mb-2">🎯</div>
                <h2 className="text-xl font-bold">Your Recommended Path</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Based on your profile, here are the best tracks for you
                </p>
              </div>

              <div className="space-y-3">
                {buildRoleProfile(
                  answers.role as LearnerRole,
                  answers.experience as ExperienceLevel,
                  answers.goal as LearnerGoal,
                ).recommendedTrackIds.map((trackId, i) => {
                  const track = getTrackById(trackId);
                  if (!track) return null;
                  return (
                    <div
                      key={trackId}
                      className={`relative rounded-xl border p-4 transition-all ${
                        i === 0
                          ? 'border-primary/50 bg-primary/5 shadow-md'
                          : 'hover:border-border/80'
                      }`}
                    >
                      {i === 0 && (
                        <Badge className="absolute -top-2 left-4 bg-gradient-to-r from-primary to-violet-500 text-white text-[10px]">
                          Best Match
                        </Badge>
                      )}
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${track.gradient} flex items-center justify-center text-white text-lg font-bold shrink-0`}>
                          {i + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-sm">{track.title}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{track.tagline}</p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <span>{track.capsuleCount} capsules</span>
                            <span>~{track.estimatedHours}h</span>
                            <Badge variant="outline" className="text-[10px] capitalize">{track.difficulty}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  onClick={handleStartLearning}
                  className="w-full bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 text-white"
                  size="lg"
                >
                  Start Learning
                </Button>
                <Button variant="ghost" size="sm" onClick={handleSkip} className="text-xs">
                  I'll browse all tracks instead
                </Button>
              </div>
            </div>
          ) : (
            /* ─── Question Screen ───────────────────────────────────── */
            <div className="space-y-6">
              <h2 className="text-lg font-bold">{currentQuestion.question}</h2>

              <div className="grid gap-2">
                {currentQuestion.options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className={`w-full text-left rounded-xl border p-4 transition-all hover:border-primary/50 hover:bg-primary/5 hover:shadow-sm ${
                      answers[currentQuestion.id] === opt.value
                        ? 'border-primary/50 bg-primary/5'
                        : ''
                    }`}
                  >
                    <div className="font-medium text-sm">{opt.label}</div>
                    {opt.description && (
                      <div className="text-xs text-muted-foreground mt-0.5">{opt.description}</div>
                    )}
                  </button>
                ))}
              </div>

              {step > 0 && (
                <Button variant="ghost" size="sm" onClick={handleBack} className="text-xs">
                  ← Back
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleSorter;
