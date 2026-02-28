/**
 * ShareNudgeProvider — App-level context that manages the global nudge state
 *
 * Wraps the app to provide:
 *  - Return-visitor nudge (3+ unique calendar days)
 *  - Session-milestone nudge (3+ concepts in one session)
 *  - Scroll-depth nudge (available for concept pages via hook)
 *  - Concept-complete nudge (triggered from ConceptLayout)
 *
 * Each page / component can call useShareNudgeContext().requestNudge(...)
 * and the provider handles gating, rendering, and GA4 tracking centrally.
 */

import React, { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import ShareNudge from '@/components/sharing/ShareNudge';
import {
  useShareNudge,
  getVisitDayCount,
  recordConceptVisit,
  getSessionConceptCount,
  type NudgePayload,
  type ShareNudgeState,
} from '@/hooks/useShareNudge';
import { useLocation } from 'react-router-dom';

// ────────────────────────── Context ──────────────────────────

interface ShareNudgeContextValue {
  /** Request a nudge — returns true if shown, false if gated */
  requestNudge: (payload: NudgePayload) => boolean;
  /** Record a concept page visit (auto-fires session milestone if 3+) */
  visitConcept: (conceptId: string, conceptTitle?: string) => void;
}

const ShareNudgeContext = createContext<ShareNudgeContextValue>({
  requestNudge: () => false,
  visitConcept: () => {},
});

export const useShareNudgeContext = () => useContext(ShareNudgeContext);

// ────────────────────────── Session milestone threshold ──────────────────────────

const SESSION_MILESTONE_THRESHOLD = 3;
const RETURN_VISITOR_DAY_THRESHOLD = 3;

// ────────────────────────── Provider ──────────────────────────

export const ShareNudgeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const state: ShareNudgeState = useShareNudge();
  const location = useLocation();
  const returnVisitorChecked = useRef(false);

  // 1. Return-visitor nudge — fire once per session if 3+ unique days
  useEffect(() => {
    if (returnVisitorChecked.current) return;
    returnVisitorChecked.current = true;

    // Small delay so it doesn't compete with page paint
    const timer = setTimeout(() => {
      const days = getVisitDayCount();
      if (days >= RETURN_VISITOR_DAY_THRESHOLD) {
        state.requestNudge({ trigger: 'return-visitor' });
      }
    }, 3000); // 3s after mount — gentle

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. Concept visit tracker — fires session-milestone at threshold
  const visitConcept = useCallback(
    (conceptId: string, conceptTitle?: string) => {
      const count = recordConceptVisit(conceptId);
      if (count === SESSION_MILESTONE_THRESHOLD) {
        state.requestNudge({
          trigger: 'session-milestone',
          conceptsVisited: count,
        });
      }
    },
    [state],
  );

  // 3. Auto-track concept page visits based on URL
  const prevPath = useRef(location.pathname);
  useEffect(() => {
    if (location.pathname === prevPath.current) return;
    prevPath.current = location.pathname;

    // Detect concept pages by URL pattern: /concepts/<id>
    const match = location.pathname.match(/^\/concepts\/([^/]+)/);
    if (match) {
      visitConcept(match[1]);
    }
  }, [location.pathname, visitConcept]);

  // Context value (stable references via useCallback in hook)
  const contextValue: ShareNudgeContextValue = {
    requestNudge: state.requestNudge,
    visitConcept,
  };

  return (
    <ShareNudgeContext.Provider value={contextValue}>
      {children}
      {state.visible && state.nudge && (
        <ShareNudge
          nudge={state.nudge}
          onDismiss={state.dismiss}
          onConversion={state.recordConversion}
        />
      )}
    </ShareNudgeContext.Provider>
  );
};

export default ShareNudgeProvider;
