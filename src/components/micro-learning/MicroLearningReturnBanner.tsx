import React, { useState } from 'react';
import { useMicroLearningReturn } from '@/lib/hooks/useMicroLearningReturn';
import { getTrackById } from '@/lib/data/microLearning';

/**
 * Global floating banner shown when user navigated to a concept / pattern / quiz
 * page FROM a micro-learning capsule.
 *
 * Offers:
 *  - "Back to Capsule" — return to the exact capsule view
 *  - "Mark Complete & Next →" — complete the capsule and advance
 *  - Dismiss (×)
 *
 * Self-hides on /micro-learning/* routes and when no return session exists.
 */
export const MicroLearningReturnBanner: React.FC = () => {
  const returnCtx = useMicroLearningReturn();
  const [dismissed, setDismissed] = useState(false);

  if (!returnCtx || dismissed) return null;

  const { session, isCompleted, nextCapsule, goBackToCapsule, markCompleteAndContinue, dismiss } = returnCtx;
  const track = getTrackById(session.trackId);
  const trackTitle = track?.title ?? session.trackId;

  const handleDismiss = () => {
    dismiss();
    setDismissed(true);
  };

  return (
    <div className="sticky top-0 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className="bg-gradient-to-r from-violet-600/95 via-purple-600/95 to-fuchsia-600/95 backdrop-blur-sm text-white shadow-lg">
        <div className="container mx-auto px-4 py-2.5 flex items-center justify-between gap-3 flex-wrap">
          {/* Left: Context */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-lg flex-shrink-0" aria-hidden="true">🎯</span>
            <div className="min-w-0">
              <span className="text-xs font-medium text-white/70 block leading-tight">
                Learning Track: {trackTitle}
              </span>
              <span className="text-sm font-semibold truncate block leading-tight">
                {session.capsuleTitle}
              </span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={goBackToCapsule}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 hover:bg-white/25 px-3 py-1.5 text-xs font-medium transition-colors"
              aria-label="Return to capsule"
            >
              ← Back to Capsule
            </button>

            {!isCompleted && (
              <button
                onClick={markCompleteAndContinue}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white text-violet-700 hover:bg-white/90 px-3 py-1.5 text-xs font-bold transition-colors shadow-sm"
                aria-label={nextCapsule ? 'Mark complete and continue to next capsule' : 'Mark complete and return to track'}
              >
                ✓ Complete{nextCapsule ? ' & Next →' : ''}
              </button>
            )}

            {isCompleted && nextCapsule && (
              <button
                onClick={markCompleteAndContinue}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white text-violet-700 hover:bg-white/90 px-3 py-1.5 text-xs font-bold transition-colors shadow-sm"
                aria-label="Continue to next capsule"
              >
                Next Capsule →
              </button>
            )}

            <button
              onClick={handleDismiss}
              className="ml-1 rounded-full p-1 hover:bg-white/20 transition-colors"
              aria-label="Dismiss learning track banner"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MicroLearningReturnBanner;
