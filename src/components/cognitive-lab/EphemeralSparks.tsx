/**
 * Ephemeral Sparks — One-Shot Decay Learning
 *
 * Flash knowledge for N seconds → destroyed forever → recall test.
 * Burned exercises cannot be re-attempted.
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import type { EphemeralSparksExercise } from '@/lib/data/cognitiveLab/types';
import { completeSession, burnEphemeral, isEphemeralBurned } from '@/lib/data/cognitiveLab/progress';

interface Props {
  exercise: EphemeralSparksExercise;
  onComplete: () => void;
}

type Phase = 'ready' | 'flash' | 'burned' | 'recall' | 'result' | 'already-burned';

export default function EphemeralSparks({ exercise, onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>(() =>
    isEphemeralBurned(exercise.id) ? 'already-burned' : 'ready'
  );
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [decayPercent, setDecayPercent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef(0);

  const duration = exercise.content.decayDurationMs || 4000;

  const startFlash = useCallback(() => {
    setPhase('flash');
    setDecayPercent(0);
    startRef.current = Date.now();

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setDecayPercent(pct);

      if (pct >= 100) {
        clearInterval(timerRef.current);
        // Burn the ephemeral — it can never be shown again
        burnEphemeral(exercise.id);
        setPhase('burned');

        // Brief dramatic pause, then recall
        setTimeout(() => setPhase('recall'), 1200);
      }
    }, 50);
  }, [duration, exercise.id]);

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const submitRecall = useCallback(() => {
    const input = answer.trim().toLowerCase();
    const correct = exercise.content.correctAnswer.toLowerCase();

    let earned = 0;
    if (input === correct) {
      earned = 10;
    } else if (correct.includes(input) || input.includes(correct)) {
      earned = 7;
    } else {
      const correctWords = new Set(correct.split(/\s+/).filter(w => w.length > 3));
      const inputWords = input.split(/\s+/).filter(w => w.length > 3);
      let hits = 0;
      for (const w of inputWords) {
        if (correctWords.has(w)) hits++;
      }
      earned = Math.min(6, Math.round((hits / Math.max(correctWords.size, 1)) * 6));
    }

    setScore(earned);
    completeSession(exercise.paradigm, exercise.id, earned, 10);
    setPhase('result');
  }, [exercise, answer]);

  if (phase === 'already-burned') {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-6">
        <div className="text-6xl">🔥</div>
        <h2 className="text-2xl font-bold text-foreground">Already Burned</h2>
        <p className="text-sm feature-secondary max-w-md text-center text-pretty">
          This ephemeral spark has already been consumed. It existed once and is now gone forever.
          That's the paradigm — one chance, maximum attention.
        </p>
        <button
          onClick={onComplete}
          className="px-6 py-2 rounded-lg bg-muted text-foreground font-semibold hover:bg-muted/80 transition-colors"
        >
          ← Back to Paradigm
        </button>
      </div>
    );
  }

  if (phase === 'ready') {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-6">
        <h2 className="text-2xl font-bold text-foreground">{exercise.title}</h2>
        <p className="text-sm feature-secondary max-w-md text-center text-pretty">{exercise.description}</p>
        <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20 p-4 text-sm text-red-700 dark:text-red-300 max-w-md text-center">
          ⚠️ <strong>One chance only.</strong> This knowledge will flash for {duration / 1000}s and then be destroyed forever.
          Focus completely.
        </div>
        <button
          onClick={startFlash}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          🔥 Ignite Spark
        </button>
      </div>
    );
  }

  if (phase === 'flash') {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-6">
        <div className="text-xs text-red-600 dark:text-red-400 font-semibold uppercase tracking-wide">
          ⚡ EPHEMERAL — MEMORIZE NOW
        </div>

        {/* Decay progress bar */}
        <div className="w-full max-w-md h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-100"
            style={{ width: `${100 - decayPercent}%` }}
          />
        </div>

        {/* Content that's decaying */}
        <div
          className="rounded-xl border-2 border-red-400 dark:border-red-600 bg-red-50/50 dark:bg-red-950/20 p-8 max-w-lg text-center transition-opacity duration-200"
          style={{ opacity: Math.max(0, 1 - decayPercent / 120) }}
        >
          <p className="text-lg font-medium text-foreground leading-relaxed">
            {exercise.content.flashContent}
          </p>
        </div>

        <div className="text-xs feature-secondary">
          {((duration - (decayPercent / 100 * duration)) / 1000).toFixed(1)}s remaining
        </div>
      </div>
    );
  }

  if (phase === 'burned') {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <div className="text-6xl animate-pulse">🔥</div>
        <div className="text-sm font-bold text-red-600 dark:text-red-500">Knowledge destroyed.</div>
        <div className="text-xs feature-secondary">Preparing recall test...</div>
      </div>
    );
  }

  if (phase === 'recall') {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-6">
        <div className="text-xs text-red-600 dark:text-red-400 font-semibold uppercase tracking-wide">
          Recall — What Did You Learn?
        </div>

        <p className="text-sm text-foreground font-medium max-w-md text-center">
          {exercise.content.recallPrompt}
        </p>

        <input
          type="text"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && answer.trim() && submitRecall()}
          placeholder="Type what you remember..."
          autoFocus
          className="feature-panel w-full max-w-md px-4 py-3 rounded-lg border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <button
          onClick={submitRecall}
          disabled={!answer.trim()}
          className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Recall
        </button>
      </div>
    );
  }

  // result
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6">
      <div className={`text-5xl font-bold ${score >= 7 ? 'text-emerald-500' : score >= 4 ? 'text-amber-500' : 'text-red-500'}`}>
        {score}/10
      </div>

      <div className="feature-panel rounded-lg p-4 max-w-md space-y-3">
        <div>
          <span className="text-xs feature-secondary font-semibold">Your recall:</span>
          <p className="text-sm text-foreground">{answer}</p>
        </div>
        <div>
          <span className="text-xs feature-secondary font-semibold">Correct answer:</span>
          <p className="text-sm text-foreground">{exercise.content.correctAnswer}</p>
        </div>
      </div>

      <div className="text-xs feature-secondary max-w-sm text-center text-pretty">
        This spark is permanently burned — your score is locked. Maximum attention yields maximum retention.
      </div>

      <button
        onClick={onComplete}
        className="px-6 py-2 rounded-lg bg-muted text-foreground font-semibold hover:bg-muted/80 transition-colors"
      >
        ← Back to Paradigm
      </button>
    </div>
  );
}
