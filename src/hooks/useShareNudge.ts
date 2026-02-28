/**
 * useShareNudge — Central hook for behavioral sharing nudges
 *
 * Applies 4 trigger types rooted in behavioral psychology:
 *  1. concept-complete  → Peak-End Rule + Reciprocity (Cialdini)
 *  2. session-milestone → Endowed Progress Effect (Nunes & Dreze)
 *  3. scroll-depth      → Reciprocity after value received
 *  4. return-visitor    → Identity Labeling + Commitment (Cornelissen)
 *
 * Hard rules:
 *  - Never nudge on first visit or within first 60s
 *  - Max 1 nudge per session
 *  - Dismissed trigger types cool down for 7 days
 *  - After 5+ total dismissals → 50 % show-rate (fatigue dampener)
 */

import { useCallback, useEffect, useRef, useState } from 'react';

// ────────────────────────── Types ──────────────────────────

export type NudgeTrigger =
  | 'concept-complete'
  | 'session-milestone'
  | 'scroll-depth'
  | 'return-visitor';

export interface NudgePayload {
  trigger: NudgeTrigger;
  conceptId?: string;
  conceptTitle?: string;
  /** Number of concepts visited this session (for milestone) */
  conceptsVisited?: number;
}

export interface ShareNudgeState {
  /** Whether a nudge is currently visible */
  visible: boolean;
  /** The active nudge payload (null when hidden) */
  nudge: NudgePayload | null;
  /** Dismiss the current nudge (records to cooldown storage) */
  dismiss: () => void;
  /** Programmatically request a nudge — will be gated by cooldown logic */
  requestNudge: (payload: NudgePayload) => boolean;
  /** Record that the user clicked a share action on the nudge */
  recordConversion: () => void;
}

// ────────────────────────── Storage Keys ──────────────────────────

const LS_KEY = 'oas.shareNudge.v1';
const SS_NUDGE_SHOWN = 'oas.shareNudge.sessionShown';
const SS_FIRST_VISIT_TS = 'oas.shareNudge.sessionStart';
const LS_VISIT_DAYS = 'oas.shareNudge.visitDays';

const COOLDOWN_DAYS = 7;
const FATIGUE_THRESHOLD = 5;
const MIN_SECONDS_BEFORE_NUDGE = 60;

// ────────────────────────── Persistent State ──────────────────────────

interface NudgeStore {
  /** ISO timestamp of last nudge shown */
  lastShownAt: string | null;
  /** Map of trigger type → ISO timestamp of last dismissal */
  dismissedTypes: Partial<Record<NudgeTrigger, string>>;
  /** Running total of user dismissals (across all time) */
  totalDismissals: number;
}

function loadStore(): NudgeStore {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { lastShownAt: null, dismissedTypes: {}, totalDismissals: 0 };
}

function saveStore(store: NudgeStore) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(store));
  } catch { /* quota / private mode */ }
}

// ────────────────────────── Visit-Day Tracking ──────────────────────────

/** Returns how many unique calendar days the user has visited */
export function getVisitDayCount(): number {
  try {
    const raw = localStorage.getItem(LS_VISIT_DAYS);
    const days: string[] = raw ? JSON.parse(raw) : [];
    const today = new Date().toISOString().slice(0, 10);
    if (!days.includes(today)) {
      days.push(today);
      localStorage.setItem(LS_VISIT_DAYS, JSON.stringify(days));
    }
    return days.length;
  } catch {
    return 1;
  }
}

// ────────────────────────── Session Concept Tracker ──────────────────────────

const SS_CONCEPTS = 'oas.shareNudge.sessionConcepts';

/** Record a concept visit and return total unique concepts this session */
export function recordConceptVisit(conceptId: string): number {
  try {
    const raw = sessionStorage.getItem(SS_CONCEPTS);
    const set: string[] = raw ? JSON.parse(raw) : [];
    if (!set.includes(conceptId)) {
      set.push(conceptId);
      sessionStorage.setItem(SS_CONCEPTS, JSON.stringify(set));
    }
    return set.length;
  } catch {
    return 1;
  }
}

export function getSessionConceptCount(): number {
  try {
    const raw = sessionStorage.getItem(SS_CONCEPTS);
    return raw ? JSON.parse(raw).length : 0;
  } catch {
    return 0;
  }
}

// ────────────────────────── Gating Logic ──────────────────────────

function canShowNudge(trigger: NudgeTrigger): boolean {
  // 1. Already shown a nudge this session?
  if (sessionStorage.getItem(SS_NUDGE_SHOWN) === '1') return false;

  // 2. Too early in session? (< 60 seconds since page load)
  const startTs = sessionStorage.getItem(SS_FIRST_VISIT_TS);
  if (startTs) {
    const elapsed = (Date.now() - Number(startTs)) / 1000;
    if (elapsed < MIN_SECONDS_BEFORE_NUDGE) return false;
  }

  // 3. Check persistent cooldowns
  const store = loadStore();

  // Trigger-specific cooldown — was this type dismissed < 7 days ago?
  const dismissedAt = store.dismissedTypes[trigger];
  if (dismissedAt) {
    const daysSince = (Date.now() - new Date(dismissedAt).getTime()) / (1000 * 60 * 60 * 24);
    if (daysSince < COOLDOWN_DAYS) return false;
  }

  // Fatigue dampener — after 5+ total dismissals, skip 50 % of qualifying triggers
  if (store.totalDismissals >= FATIGUE_THRESHOLD && Math.random() < 0.5) return false;

  return true;
}

// ────────────────────────── Hook ──────────────────────────

export function useShareNudge(): ShareNudgeState {
  const [visible, setVisible] = useState(false);
  const [nudge, setNudge] = useState<NudgePayload | null>(null);
  const storeRef = useRef(loadStore());

  // Record session start timestamp (once per session)
  useEffect(() => {
    if (!sessionStorage.getItem(SS_FIRST_VISIT_TS)) {
      sessionStorage.setItem(SS_FIRST_VISIT_TS, String(Date.now()));
    }
    // Also register today's visit-day
    getVisitDayCount();
  }, []);

  const requestNudge = useCallback((payload: NudgePayload): boolean => {
    if (visible) return false; // Already showing one
    if (!canShowNudge(payload.trigger)) return false;

    // Mark session as "nudge shown"
    sessionStorage.setItem(SS_NUDGE_SHOWN, '1');

    // Update persistent store
    const store = loadStore();
    store.lastShownAt = new Date().toISOString();
    saveStore(store);
    storeRef.current = store;

    setNudge(payload);
    setVisible(true);
    return true;
  }, [visible]);

  const dismiss = useCallback(() => {
    if (!nudge) return;

    const store = loadStore();
    store.dismissedTypes[nudge.trigger] = new Date().toISOString();
    store.totalDismissals += 1;
    saveStore(store);
    storeRef.current = store;

    setVisible(false);
    setNudge(null);
  }, [nudge]);

  const recordConversion = useCallback(() => {
    // User clicked share from the nudge — close it without counting as dismissal
    setVisible(false);
    setNudge(null);
  }, []);

  return { visible, nudge, dismiss, requestNudge, recordConversion };
}
