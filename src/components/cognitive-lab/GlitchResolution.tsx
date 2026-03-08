/**
 * Glitch Resolution — Cognitive Dissonance Engine
 *
 * Two contradictory statements that both seem true → screen fracture → resolution.
 * The dissonance drives active resolution, cementing nuanced understanding.
 */

import { useState, useCallback } from 'react';
import type { GlitchResolutionExercise } from '@/lib/data/cognitiveLab/types';
import { completeSession } from '@/lib/data/cognitiveLab/progress';
import {
  useReducedMotion,
  useSeizureConsent,
  SeizureConsentGate,
} from './accessibility';

interface Props {
  exercise: GlitchResolutionExercise;
  onComplete: () => void;
}

type Phase = 'ready' | 'glitch' | 'thinking' | 'resolution' | 'result';

export default function GlitchResolution({ exercise, onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>('ready');
  const [userResolution, setUserResolution] = useState('');
  const [score, setScore] = useState(0);
  const reducedMotion = useReducedMotion();
  const { consented, accept: acceptConsent } = useSeizureConsent();

  // Reduced-motion: extend glitch display from 5s to 10s
  const glitchDuration = reducedMotion ? 10000 : 5000;

  const triggerGlitch = useCallback(() => {
    setPhase('glitch');
    setTimeout(() => setPhase('thinking'), glitchDuration);
  }, [glitchDuration]);

  const submitResolution = useCallback(() => {
    const answer = userResolution.trim().toLowerCase();
    const resolution = exercise.content.resolution.toLowerCase();

    // Score based on keyword overlap
    const resolutionWords = new Set(resolution.split(/\s+/).filter(w => w.length > 4));
    const answerWords = new Set(answer.split(/\s+/).filter(w => w.length > 4));
    let overlap = 0;
    for (const w of answerWords) {
      if (resolutionWords.has(w)) overlap++;
    }
    const earned = answer.length < 10 ? 0 : Math.min(10, Math.round((overlap / Math.max(resolutionWords.size, 1)) * 10) + (answer.length > 30 ? 3 : 0));
    const finalScore = Math.min(10, earned);
    setScore(finalScore);
    completeSession(exercise.paradigm, exercise.id, finalScore, 10);
    setPhase('resolution');
  }, [exercise, userResolution]);

  const showResult = useCallback(() => {
    setPhase('result');
  }, []);

  // Seizure consent gate
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
        <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 p-4 text-sm text-amber-700 dark:text-amber-300 max-w-md text-center">
          Two statements that both seem true will appear. Your brain will glitch.
          Then you resolve the contradiction.
        </div>
        <button
          onClick={triggerGlitch}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          ⚡ Trigger Glitch
        </button>
      </div>
    );
  }

  if (phase === 'glitch') {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-6">
        <div className="text-xs text-amber-600 dark:text-amber-400 font-semibold" style={reducedMotion ? undefined : { animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
          ⚠ COGNITIVE DISSONANCE DETECTED
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
          <div className="p-5 rounded-xl border-2 border-blue-400 dark:border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 transform rotate-[-1deg]">
            <div className="text-blue-600 dark:text-blue-400 font-bold text-xs mb-2">Statement A</div>
            <p className="text-sm text-foreground font-medium">{exercise.content.statementA}</p>
          </div>
          <div className="p-5 rounded-xl border-2 border-red-400 dark:border-red-600 bg-red-50/50 dark:bg-red-950/20 transform rotate-[1deg]">
            <div className="text-red-600 dark:text-red-400 font-bold text-xs mb-2">Statement B</div>
            <p className="text-sm text-foreground font-medium">{exercise.content.statementB}</p>
          </div>
        </div>

        {/* Fracture line */}
        <div className="relative w-full max-w-2xl h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500 to-transparent animate-pulse" />
        </div>

        <p className="text-xs text-muted-foreground animate-pulse">Processing dissonance...</p>
      </div>
    );
  }

  if (phase === 'thinking') {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-6">
        <h3 className="text-xl font-bold text-foreground">Resolve the Glitch</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-xl w-full text-xs">
          <div className="p-3 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/10">
            <span className="font-bold text-blue-600 dark:text-blue-400">A:</span> {exercise.content.statementA}
          </div>
          <div className="p-3 rounded-lg border border-red-200 dark:border-red-800 bg-red-50/30 dark:bg-red-950/10">
            <span className="font-bold text-red-600 dark:text-red-400">B:</span> {exercise.content.statementB}
          </div>
        </div>
        <p className="text-sm text-muted-foreground">How can both statements be true? Write your resolution:</p>
        <textarea
          value={userResolution}
          onChange={e => setUserResolution(e.target.value)}
          placeholder="Both can be true because..."
          rows={4}
          autoFocus
          className="w-full max-w-lg px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
        />
        <button
          onClick={submitResolution}
          disabled={userResolution.trim().length < 5}
          className="px-6 py-2 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Resolution
        </button>
      </div>
    );
  }

  if (phase === 'resolution') {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-6">
        <div className={`text-5xl font-bold ${score >= 7 ? 'text-emerald-500' : score >= 4 ? 'text-amber-500' : 'text-red-500'}`}>
          {score}/10
        </div>

        <div className="rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/10 p-4 max-w-lg space-y-2">
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Model Resolution:</p>
          <p className="text-sm text-foreground">{exercise.content.resolution}</p>
        </div>

        <button
          onClick={showResult}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
        >
          See deeper explanation →
        </button>
      </div>
    );
  }

  // result — shows full explanation
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6">
      <div className="rounded-lg border border-border bg-muted/20 p-6 max-w-lg space-y-4">
        <div>
          <h4 className="text-sm font-bold text-foreground mb-1">Your Resolution:</h4>
          <p className="text-xs text-muted-foreground">{userResolution}</p>
        </div>
        <div>
          <h4 className="text-sm font-bold text-foreground mb-1">Model Resolution:</h4>
          <p className="text-xs text-muted-foreground">{exercise.content.resolution}</p>
        </div>
        <div>
          <h4 className="text-sm font-bold text-foreground mb-1">Deep Explanation:</h4>
          <p className="text-xs text-muted-foreground">{exercise.content.explanation}</p>
        </div>
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
