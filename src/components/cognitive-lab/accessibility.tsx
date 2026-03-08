/**
 * Accessibility hooks and components for Cognitive Lab.
 *
 * - useReducedMotion(): detects prefers-reduced-motion media query
 * - useSeizureConsent(): localStorage-backed seizure warning opt-in
 * - SeizureConsentGate: renders a warning + opt-in before flash-heavy paradigms
 */

import { useState, useEffect, useSyncExternalStore, useCallback } from 'react';

// ── prefers-reduced-motion ──────────────────────────────────────────────────

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function getReducedMotionSnapshot(): boolean {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot(): boolean {
  return false; // safe default for SSR
}

function subscribeReducedMotion(callback: () => void): () => void {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

// ── Seizure consent ─────────────────────────────────────────────────────────

const CONSENT_KEY = 'oas.cognitivelab.seizure-consent';

export function hasSeizureConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'accepted';
  } catch {
    return false;
  }
}

function grantSeizureConsent(): void {
  try {
    localStorage.setItem(CONSENT_KEY, 'accepted');
  } catch {
    // localStorage unavailable
  }
}

export function useSeizureConsent() {
  const [consented, setConsented] = useState(hasSeizureConsent);

  const accept = useCallback(() => {
    grantSeizureConsent();
    setConsented(true);
  }, []);

  return { consented, accept } as const;
}

// ── Seizure Consent Gate component ──────────────────────────────────────────

interface SeizureConsentGateProps {
  onAccept: () => void;
  onDecline: () => void;
  reducedMotion: boolean;
}

export function SeizureConsentGate({ onAccept, onDecline, reducedMotion }: SeizureConsentGateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-lg mx-auto text-center">
      <div className="text-4xl">⚠️</div>
      <h2 className="text-xl font-bold text-foreground">Photosensitivity Warning</h2>
      <div className="rounded-lg border-2 border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-950/20 p-5 space-y-3 text-sm text-amber-800 dark:text-amber-200">
        <p>
          This paradigm uses <strong>rapid visual flashes and animations</strong> that may affect
          people with photosensitive epilepsy or other photosensitive conditions.
        </p>
        <p>
          If you have a history of seizures, epilepsy, or photosensitive reactions, please choose
          the <strong>reduced-motion</strong> option or skip this paradigm entirely.
        </p>
        {reducedMotion && (
          <p className="text-emerald-700 dark:text-emerald-400 font-medium">
            ✓ Your device has <code className="px-1 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/30 text-xs">prefers-reduced-motion</code> enabled.
            All flash timings will be extended to 3–5 seconds automatically.
          </p>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onAccept}
          className="px-5 py-2.5 rounded-lg bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          I understand — continue
        </button>
        <button
          onClick={onDecline}
          className="feature-chip px-5 py-2.5 rounded-lg border font-semibold text-sm hover:bg-[color:var(--surface-panel-strong)] transition-colors"
        >
          Go back
        </button>
      </div>
    </div>
  );
}

// ── Audio availability check ────────────────────────────────────────────────

export function useAudioAvailable(): boolean {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    try {
      const ctx = new AudioContext();
      // If state is 'suspended' we can still try — it just needs user gesture
      setAvailable(ctx.state !== 'closed');
      ctx.close();
    } catch {
      setAvailable(false);
    }
  }, []);

  return available;
}
