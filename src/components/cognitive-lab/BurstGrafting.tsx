/**
 * Burst Grafting — 400ms Multi-Sensory Encoding
 *
 * Flash: geometric SVG + harmonic chord + 2-word nano-definition simultaneously.
 * Encodes across visual, auditory, and linguistic channels in one burst.
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import type { BurstGraftingExercise } from '@/lib/data/cognitiveLab/types';
import { completeSession } from '@/lib/data/cognitiveLab/progress';
import {
  useReducedMotion,
  useSeizureConsent,
  SeizureConsentGate,
} from './accessibility';

interface Props {
  exercise: BurstGraftingExercise;
  onComplete: () => void;
}

const SHAPES: Record<string, (size: number, color: string) => React.ReactNode> = {
  triangle: (s, c) => (
    <svg width={s} height={s} viewBox="0 0 100 100">
      <polygon points="50,5 95,95 5,95" fill={c} opacity="0.9" />
    </svg>
  ),
  hexagon: (s, c) => (
    <svg width={s} height={s} viewBox="0 0 100 100">
      <polygon points="50,3 93,25 93,75 50,97 7,75 7,25" fill={c} opacity="0.9" />
    </svg>
  ),
  circle: (s, c) => (
    <svg width={s} height={s} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="46" fill={c} opacity="0.9" />
    </svg>
  ),
  diamond: (s, c) => (
    <svg width={s} height={s} viewBox="0 0 100 100">
      <polygon points="50,2 98,50 50,98 2,50" fill={c} opacity="0.9" />
    </svg>
  ),
  square: (s, c) => (
    <svg width={s} height={s} viewBox="0 0 100 100">
      <rect x="5" y="5" width="90" height="90" rx="4" fill={c} opacity="0.9" />
    </svg>
  ),
};

type Phase = 'ready' | 'burst' | 'recall' | 'result';

export default function BurstGrafting({ exercise, onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>('ready');
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [audioFailed, setAudioFailed] = useState(false);
  const reducedMotion = useReducedMotion();
  const { consented, accept: acceptConsent } = useSeizureConsent();

  const playChord = useCallback((frequencies: [number, number, number]) => {
    try {
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      // Safari autoplay policy: if context is suspended, try to resume
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => setAudioFailed(true));
      }

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      gainNode.connect(ctx.destination);

      for (const freq of frequencies) {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;
        osc.connect(gainNode);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.5);
      }
    } catch {
      // Web Audio API not available — visual-only fallback
      setAudioFailed(true);
    }
  }, []);

  useEffect(() => {
    return () => {
      audioCtxRef.current?.close();
    };
  }, []);

  // Reduced-motion: extend burst from 1s to 4s so content is readable
  const burstDuration = reducedMotion ? 4000 : 1000;

  const triggerBurst = useCallback(() => {
    setPhase('burst');
    playChord(exercise.content.chordFrequencies);

    setTimeout(() => {
      setPhase('recall');
    }, burstDuration);
  }, [exercise.content.chordFrequencies, playChord, burstDuration]);

  const submitRecall = useCallback(() => {
    const { nanoDef } = exercise.content;
    const answer = userAnswer.trim().toLowerCase();
    const target = nanoDef.toLowerCase();
    // Score: exact match = 10, partial = 5, else 0
    let earned = 0;
    if (answer === target) {
      earned = 10;
    } else if (target.split(' ').some(w => answer.includes(w))) {
      earned = 5;
    }
    setScore(earned);
    completeSession(exercise.paradigm, exercise.id, earned, 10);
    setPhase('result');
  }, [exercise, userAnswer]);

  // Seizure consent gate — shown before first session
  if (phase === 'ready' && !consented) {
    return (
      <SeizureConsentGate
        onAccept={acceptConsent}
        onDecline={onComplete}
        reducedMotion={reducedMotion}
      />
    );
  }

  if (phase === 'ready') {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-6">
        <h2 className="text-2xl font-bold text-foreground">{exercise.title}</h2>
        <p className="text-sm text-muted-foreground max-w-md text-center">{exercise.description}</p>
        {audioFailed && (
          <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 p-3 text-xs text-amber-700 dark:text-amber-300 max-w-md text-center">
            🔇 Audio unavailable — running in visual-only mode.
          </div>
        )}
        <div className="rounded-lg border border-rose-200 dark:border-rose-800 bg-rose-50/50 dark:bg-rose-950/20 p-4 text-sm text-rose-700 dark:text-rose-300 max-w-md text-center">
          A shape, a chord, and a 2-word definition will flash for {reducedMotion ? '4 seconds' : '400ms'}. Then you recall the nano-definition.
          {reducedMotion && <span className="block mt-1 text-xs text-emerald-600 dark:text-emerald-400">✓ Reduced-motion: timings extended for accessibility.</span>}
        </div>
        <button
          onClick={triggerBurst}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          ⚡ Trigger Burst
        </button>
      </div>
    );
  }

  if (phase === 'burst') {
    const { geometricShape, colorFlash, conceptLabel, nanoDef } = exercise.content;
    return (
      <div className={`flex flex-col items-center justify-center py-16 ${reducedMotion ? '' : 'animate-pulse'}`}>
        <div className="relative">
          {SHAPES[geometricShape]?.(200, colorFlash)}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-white drop-shadow-lg">{conceptLabel}</span>
            <span className="text-lg font-bold text-white/90 drop-shadow-md">{nanoDef}</span>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'recall') {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-6">
        <h3 className="text-xl font-bold text-foreground">Recall the 2-word nano-definition</h3>
        <p className="text-sm text-muted-foreground">
          What was the nano-definition for <strong>{exercise.content.conceptLabel}</strong>?
        </p>
        <input
          type="text"
          value={userAnswer}
          onChange={e => setUserAnswer(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submitRecall()}
          placeholder="Type the 2-word definition…"
          autoFocus
          className="w-64 px-4 py-2 rounded-lg border border-border bg-background text-foreground text-center focus:outline-none focus:ring-2 focus:ring-rose-500"
        />
        <button
          onClick={submitRecall}
          className="px-6 py-2 rounded-lg bg-rose-600 text-white font-semibold hover:bg-rose-700 transition-colors"
        >
          Submit
        </button>
      </div>
    );
  }

  // result
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      <div className={`text-6xl font-bold ${score >= 8 ? 'text-emerald-500' : score >= 5 ? 'text-amber-500' : 'text-red-500'}`}>
        {score}/10
      </div>
      <p className="text-sm text-muted-foreground">
        Correct answer: <strong className="text-foreground">{exercise.content.nanoDef}</strong>
      </p>
      <p className="text-xs text-muted-foreground max-w-sm text-center">
        {score === 10
          ? 'Perfect burst encoding! The multi-sensory imprint locked in.'
          : score >= 5
            ? 'Partial recall — the sensory trace formed but wasn\'t complete. Try another burst.'
            : 'The burst didn\'t stick this time. Multi-sensory encoding improves with practice.'}
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
