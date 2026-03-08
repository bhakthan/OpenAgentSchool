/**
 * Glyph Cognition — Symbol-to-Meaning Recall
 *
 * Display an abstract SVG glyph + seed syllable.
 * User must recall the AI concept the glyph represents.
 */

import { useState, useCallback } from 'react';
import type { GlyphCognitionExercise } from '@/lib/data/cognitiveLab/types';
import { getGlyph } from '@/lib/data/cognitiveLab/glyphs';
import { completeSession } from '@/lib/data/cognitiveLab/progress';

interface Props {
  exercise: GlyphCognitionExercise;
  onComplete: () => void;
}

type Phase = 'ready' | 'study' | 'recall' | 'result';

export default function GlyphCognition({ exercise, onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>('ready');
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);

  const glyph = getGlyph(exercise.content.glyphId);

  const beginStudy = useCallback(() => {
    setPhase('study');
  }, []);

  const moveToRecall = useCallback(() => {
    setPhase('recall');
  }, []);

  const submitAnswer = useCallback(() => {
    const input = answer.trim().toLowerCase();
    const correct = exercise.content.correctAnswer.toLowerCase();

    let earned = 0;
    if (input === correct) {
      earned = 10;
    } else if (correct.includes(input) || input.includes(correct)) {
      earned = 7;
    } else {
      // Check keyword overlap
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

  if (phase === 'ready') {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-6">
        <h2 className="text-2xl font-bold text-foreground">{exercise.title}</h2>
        <p className="text-sm text-muted-foreground max-w-md text-center">{exercise.description}</p>
        <div className="text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 rounded-lg px-3 py-2">
          Study the glyph and its seed syllable. Then recall the concept from memory.
        </div>
        <button
          onClick={beginStudy}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          🔮 Study Glyph
        </button>
      </div>
    );
  }

  if (phase === 'study') {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-8">
        <div className="text-xs text-amber-700 dark:text-amber-400 font-semibold uppercase tracking-wide">
          Study Phase — Memorize the Glyph
        </div>

        {/* Glyph display */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-40 h-40 rounded-2xl border-2 border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-950/20 flex items-center justify-center p-4">
            {glyph ? (
              <svg viewBox="0 0 100 100" className="w-full h-full text-amber-600 dark:text-amber-400">
                <path d={glyph.svgPath} fill="currentColor" />
              </svg>
            ) : (
              <div className="text-5xl">🔮</div>
            )}
          </div>

          <div className="text-center space-y-1">
            <div className="text-3xl font-mono font-bold text-foreground tracking-widest">
              {exercise.content.seedSyllable}
            </div>
            {glyph && (
              <div className="text-xs text-muted-foreground italic">{glyph.meaning}</div>
            )}
          </div>
        </div>

        <button
          onClick={moveToRecall}
          className="px-6 py-2 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-colors"
        >
          I've Studied It — Test Me
        </button>
      </div>
    );
  }

  if (phase === 'recall') {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-6">
        <div className="text-xs text-amber-700 dark:text-amber-400 font-semibold uppercase tracking-wide">
          Recall Phase
        </div>

        {/* Show glyph without context */}
        <div className="w-24 h-24 rounded-xl border border-border bg-muted/20 flex items-center justify-center p-3">
          {glyph ? (
            <svg viewBox="0 0 100 100" className="w-full h-full text-muted-foreground">
              <path d={glyph.svgPath} fill="currentColor" />
            </svg>
          ) : (
            <div className="text-3xl">🔮</div>
          )}
        </div>

        <p className="text-sm text-foreground font-medium max-w-md text-center">
          {exercise.content.recallPrompt}
        </p>

        <input
          type="text"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && answer.trim() && submitAnswer()}
          placeholder="Type the concept this glyph represents..."
          autoFocus
          className="w-full max-w-md px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        <button
          onClick={submitAnswer}
          disabled={!answer.trim()}
          className="px-6 py-2 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

      {/* Show the glyph with full context */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-950/20 flex items-center justify-center p-2">
          {glyph && (
            <svg viewBox="0 0 100 100" className="w-full h-full text-amber-600 dark:text-amber-400">
              <path d={glyph.svgPath} fill="currentColor" />
            </svg>
          )}
        </div>
        <div className="text-left">
          <div className="text-sm font-bold text-foreground">{exercise.content.seedSyllable}</div>
          <div className="text-xs text-muted-foreground">= {exercise.content.correctAnswer}</div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/20 p-4 max-w-md space-y-2">
        <div>
          <span className="text-xs text-muted-foreground font-semibold">Your answer:</span>
          <p className="text-sm text-foreground">{answer}</p>
        </div>
        <div>
          <span className="text-xs text-muted-foreground font-semibold">Correct:</span>
          <p className="text-sm text-foreground">{exercise.content.correctAnswer}</p>
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
