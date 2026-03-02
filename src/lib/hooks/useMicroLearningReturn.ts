// ─── useMicroLearningReturn ──────────────────────────────────────────────────
// Reads "return to micro-learning" context from URL search params + sessionStorage.
// Used by MicroLearningReturnBanner to offer "Back to Capsule" / "Mark Complete & Next".

import { useMemo, useCallback } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { completeCapsule, isCapsuleCompleted, CAPSULES_BY_TRACK, getCapsuleById } from '@/lib/data/microLearning';
import type { CapsuleType } from '@/lib/data/microLearning';
import { trackEvent } from '@/lib/analytics/ga';

const SESSION_KEY = 'micro-learning-return-session';

export interface MicroLearningReturnSession {
  trackId: string;
  capsuleId: string;
  capsuleType: CapsuleType;
  capsuleTitle: string;
  timestamp: number;
}

/** Save return session when navigating away from a capsule. */
export function saveMicroLearningReturnSession(session: MicroLearningReturnSession): void {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch { /* quota / private browsing */ }
}

/** Clear return session (call when user returns to micro-learning). */
export function clearMicroLearningReturnSession(): void {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {}
}

/** Read the stored return session. */
function loadReturnSession(): MicroLearningReturnSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as MicroLearningReturnSession;
    // Expire after 30 min of inactivity
    if (Date.now() - parsed.timestamp > 30 * 60 * 1000) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Hook for consuming micro-learning return context.
 * Returns null if user did not arrive from a capsule.
 */
export function useMicroLearningReturn() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Don't show banner on micro-learning pages
  const isMicroLearningRoute = location.pathname.startsWith('/micro-learning');

  const session = useMemo<MicroLearningReturnSession | null>(() => {
    if (isMicroLearningRoute) return null;

    // Prefer URL params (freshest intent)
    const from = searchParams.get('from');
    const trackId = searchParams.get('track');
    const capsuleId = searchParams.get('capsule');

    if (from === 'micro' && trackId && capsuleId) {
      const capsule = getCapsuleById(capsuleId);
      if (capsule) {
        const sess: MicroLearningReturnSession = {
          trackId,
          capsuleId,
          capsuleType: capsule.type,
          capsuleTitle: capsule.title,
          timestamp: Date.now(),
        };
        // Persist to sessionStorage as backup
        saveMicroLearningReturnSession(sess);
        return sess;
      }
    }

    // Fallback to sessionStorage
    return loadReturnSession();
  }, [isMicroLearningRoute, searchParams]);

  // Compute next capsule info
  const nextCapsule = useMemo(() => {
    if (!session) return null;
    const trackCapsules = CAPSULES_BY_TRACK[session.trackId] ?? [];
    const idx = trackCapsules.findIndex((c) => c.id === session.capsuleId);
    if (idx < 0 || idx >= trackCapsules.length - 1) return null;
    return trackCapsules[idx + 1];
  }, [session]);

  const isCompleted = useMemo(
    () => (session ? isCapsuleCompleted(session.capsuleId) : false),
    [session],
  );

  /** Navigate back to the exact capsule. */
  const goBackToCapsule = useCallback(() => {
    if (!session) return;
    trackEvent({ action: 'micro_return_to_capsule', category: 'micro_learning', label: `${session.trackId}/${session.capsuleId}` });
    clearMicroLearningReturnSession();
    navigate(`/micro-learning/${session.trackId}?capsule=${session.capsuleId}`);
  }, [session, navigate]);

  /** Mark the capsule complete, then navigate to next capsule (or back to track). */
  const markCompleteAndContinue = useCallback(() => {
    if (!session) return;

    // Mark complete if not already
    if (!isCapsuleCompleted(session.capsuleId)) {
      completeCapsule(session.capsuleId, session.capsuleType);
    }

    trackEvent({ action: 'micro_mark_complete_from_banner', category: 'micro_learning', label: `${session.trackId}/${session.capsuleId}` });
    clearMicroLearningReturnSession();

    if (nextCapsule) {
      navigate(`/micro-learning/${session.trackId}?capsule=${nextCapsule.id}`);
    } else {
      // No more capsules — go to track detail
      navigate(`/micro-learning/${session.trackId}`);
    }
  }, [session, nextCapsule, navigate]);

  /** Dismiss the banner without navigating. */
  const dismiss = useCallback(() => {
    clearMicroLearningReturnSession();
    trackEvent({ action: 'micro_return_banner_dismiss', category: 'micro_learning' });
  }, []);

  if (!session) return null;

  return {
    session,
    isCompleted,
    nextCapsule,
    goBackToCapsule,
    markCompleteAndContinue,
    dismiss,
  };
}
