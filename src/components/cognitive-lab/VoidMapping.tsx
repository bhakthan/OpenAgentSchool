/**
 * Void Mapping — Negative-Space Definitions
 *
 * 5 rapid "anti-flashes" of what a concept is NOT → blank → definition reveal.
 * Understanding sharpened by absence.
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import type { VoidMappingExercise } from '@/lib/data/cognitiveLab/types';
import { completeSession } from '@/lib/data/cognitiveLab/progress';
import {
  useReducedMotion,
  useSeizureConsent,
  SeizureConsentGate,
} from './accessibility';

interface Props {
  exercise: VoidMappingExercise;
  onComplete: () => void;
}

type Phase = 'ready' | 'anti-flash' | 'void' | 'choose' | 'result';

export default function VoidMapping({ exercise, onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>('ready');
  const [flashIndex, setFlashIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotion = useReducedMotion();
  const { consented, accept: acceptConsent } = useSeizureConsent();

  // Reduced-motion: extend flash from 800ms to 3s, void from 1.5s to 4s
  const flashInterval = reducedMotion ? 3000 : 800;
  const voidPause = reducedMotion ? 4000 : 1500;

  const startSequence = useCallback(() => {
    setPhase('anti-flash');
    setFlashIndex(0);
  }, []);

  // Auto-advance anti-flashes
  useEffect(() => {
    if (phase !== 'anti-flash') return;

    timerRef.current = setTimeout(() => {
      if (flashIndex < exercise.content.antiFlashes.length - 1) {
        setFlashIndex(f => f + 1);
      } else {
        // All anti-flashes shown → void pause → choose
        setPhase('void');
        timerRef.current = setTimeout(() => {
          // Shuffle options
          const opts = [...exercise.content.decoyDefinitions, exercise.content.definition];
          const shuffled = opts.sort(() => Math.random() - 0.5);
          setShuffledOptions(shuffled);
          setCorrectIndex(shuffled.indexOf(exercise.content.definition));
          setPhase('choose');
        }, voidPause);
      }
    }, flashInterval);

    return () => clearTimeout(timerRef.current);
  }, [phase, flashIndex, exercise.content, flashInterval, voidPause]);

  const submitChoice = useCallback((idx: number) => {
    setSelectedAnswer(idx);
    const earned = idx === correctIndex ? 10 : 0;
    setScore(earned);
    completeSession(exercise.paradigm, exercise.id, earned, 10);
    setPhase('result');
  }, [correctIndex, exercise]);

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
        <p className="text-sm feature-secondary max-w-md text-center text-pretty">{exercise.description}</p>
        <div className="rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/20 p-4 text-sm text-indigo-700 dark:text-indigo-300 max-w-md text-center">
          Five rapid flashes of what <strong>{exercise.content.concept}</strong> is NOT.
          Then silence. Then you pick the real definition from the void.
          {reducedMotion && <span className="block mt-1 text-xs text-emerald-600 dark:text-emerald-400">✓ Reduced-motion: flash timings extended to 3s each.</span>}
        </div>
        <button
          onClick={startSequence}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          🕳️ Enter the Void
        </button>
      </div>
    );
  }

  if (phase === 'anti-flash') {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-6">
        <div className="text-xs feature-secondary">
          Anti-flash {flashIndex + 1} of {exercise.content.antiFlashes.length}
        </div>
        <div className="relative">
          <div className="w-80 h-32 rounded-xl border-2 border-red-400 dark:border-red-600 bg-red-50 dark:bg-red-950/30 flex items-center justify-center px-6 animate-pulse" style={reducedMotion ? { animation: 'none' } : undefined}>
            <div className="text-center">
              <span className="text-red-500 font-bold text-lg">✕</span>
              <p className="text-red-700 dark:text-red-300 font-semibold text-sm mt-1">
                {exercise.content.antiFlashes[flashIndex]}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          {exercise.content.antiFlashes.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i <= flashIndex ? 'bg-red-500' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  if (phase === 'void') {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-6">
        <div className="w-80 h-40 rounded-xl bg-black/90 dark:bg-white/5 flex items-center justify-center">
          <span className="text-gray-400 dark:text-gray-500 text-xs tracking-widest uppercase animate-pulse">
            ...constructing from void...
          </span>
        </div>
      </div>
    );
  }

  if (phase === 'choose') {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-6">
        <h3 className="text-xl font-bold text-foreground">
          Now you know what it's NOT. What IS "{exercise.content.concept}"?
        </h3>
        <div className="space-y-3 w-full max-w-lg">
          {shuffledOptions.map((option, i) => (
            <button
              key={i}
              onClick={() => submitChoice(i)}
              className="feature-panel w-full text-left p-4 rounded-lg hover:border-indigo-400 hover:bg-indigo-50/70 dark:hover:bg-indigo-950/20 transition-all text-sm"
            >
              <span className="font-medium feature-secondary mr-2">{String.fromCharCode(65 + i)}.</span>
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // result
  const isCorrect = selectedAnswer === correctIndex;
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      <div className={`text-6xl font-bold ${isCorrect ? 'text-emerald-500' : 'text-red-500'}`}>
        {score}/10
      </div>
      <p className={`text-lg font-semibold ${isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
        {isCorrect ? 'The void revealed the truth.' : 'The void deceived you.'}
      </p>
      <div className="feature-panel rounded-lg p-4 max-w-lg">
        <p className="text-xs feature-secondary mb-1 font-semibold">Correct definition:</p>
        <p className="text-sm text-foreground">{exercise.content.definition}</p>
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
