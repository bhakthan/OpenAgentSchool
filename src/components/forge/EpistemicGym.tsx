/**
 * Epistemic Gym — AI-free timed reasoning exercise
 *
 * No LLM calls. Timer + text input + reveal.
 * Tests foundational reasoning without AI assistance.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { completeExercise } from '@/lib/data/forge/progress';
import { trackEvent } from '@/lib/analytics/ga';
import type { EpistemicGymExercise } from '@/lib/data/forge/types';

type Phase = 'ready' | 'thinking' | 'submitted' | 'reveal';

interface Props {
  exercise: EpistemicGymExercise;
  onComplete: () => void;
}

export default function EpistemicGym({ exercise, onComplete }: Props) {
  const { content } = exercise;
  const [phase, setPhase] = useState<Phase>('ready');
  const [answer, setAnswer] = useState('');
  const [elapsed, setElapsed] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [score, setScore] = useState<number | null>(null);
  const [selfRating, setSelfRating] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const timeLimit = content.timeLimit;

  // Timer
  useEffect(() => {
    if (phase === 'thinking') {
      timerRef.current = setInterval(() => {
        setElapsed(prev => {
          if (prev + 1 >= timeLimit) {
            // Time's up — auto-submit
            clearInterval(timerRef.current!);
            return timeLimit;
          }
          return prev + 1;
        });
      }, 1000);
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }
  }, [phase, timeLimit]);

  // Auto-submit on time up
  useEffect(() => {
    if (phase === 'thinking' && elapsed >= timeLimit) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elapsed, timeLimit, phase]);

  const startTimer = useCallback(() => {
    setPhase('thinking');
    setElapsed(0);
    trackEvent('forge_exercise_start', { exercise_id: exercise.id, discipline: 'epistemic-gym' });
  }, [exercise.id]);

  const revealHint = useCallback(() => {
    if (hintsUsed < content.hints.length) {
      setHintsUsed(prev => prev + 1);
    }
  }, [hintsUsed, content.hints.length]);

  const handleSubmit = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase('submitted');
  }, []);

  const handleSelfRate = useCallback((rating: number) => {
    setSelfRating(rating);

    // Score = self-rated quality + time bonus - hint penalty
    const selfScore = rating * 4; // 0-20 from self-rating
    const timeBonus = elapsed < timeLimit * 0.5 ? 5 : elapsed < timeLimit * 0.75 ? 3 : 1;
    const hintPenalty = hintsUsed * 2;
    const answerLengthBonus = answer.trim().length > 100 ? 3 : answer.trim().length > 50 ? 2 : 0;
    const totalScore = Math.max(0, Math.min(25, selfScore + timeBonus + answerLengthBonus - hintPenalty));

    setScore(totalScore);
    completeExercise(exercise.discipline, exercise.id, totalScore, 25);
    trackEvent('forge_exercise_complete', {
      exercise_id: exercise.id,
      discipline: 'epistemic-gym',
      score: totalScore,
      max_score: 25,
      time_used: elapsed,
      hints_used: hintsUsed,
    });
    setPhase('reveal');
  }, [elapsed, timeLimit, hintsUsed, answer, exercise]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const timePercent = Math.min((elapsed / timeLimit) * 100, 100);
  const timeColor = timePercent > 80 ? 'bg-red-500' : timePercent > 50 ? 'bg-amber-500' : 'bg-emerald-500';

  return (
    <div className="space-y-6">
      {/* AI-free badge */}
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-semibold">
        🧠 AI-Free Exercise — No LLM, No Hints from AI
      </div>

      {/* Ready phase */}
      {phase === 'ready' && (
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <p className="text-sm text-muted-foreground">
              This is a timed reasoning exercise. You have{' '}
              <strong className="text-foreground">{formatTime(timeLimit)}</strong> to answer.
              No AI tools, no autocomplete — just your thinking.
            </p>
          </div>
          <button
            onClick={startTimer}
            className="px-6 py-3 rounded-md bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
          >
            Start Timer
          </button>
        </div>
      )}

      {/* Thinking phase */}
      {phase === 'thinking' && (
        <div className="space-y-4">
          {/* Timer bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Time: {formatTime(elapsed)}</span>
              <span>{formatTime(timeLimit - elapsed)} remaining</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${timeColor}`}
                style={{ width: `${timePercent}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/20 p-4">
            <div className="text-sm whitespace-pre-wrap text-foreground leading-relaxed">
              {content.question}
            </div>
          </div>

          {/* Hints */}
          {content.hints.length > 0 && (
            <div className="flex items-start gap-3">
              <button
                onClick={revealHint}
                disabled={hintsUsed >= content.hints.length}
                className="text-xs px-3 py-1.5 rounded-md border border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/30 disabled:opacity-40 transition-colors shrink-0"
              >
                Hint ({hintsUsed}/{content.hints.length}) — costs 2 pts each
              </button>
              {hintsUsed > 0 && (
                <div className="text-xs text-purple-600 dark:text-purple-400 italic space-y-1">
                  {content.hints.slice(0, hintsUsed).map((h, i) => (
                    <p key={i}>{h}</p>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Answer */}
          <textarea
            className="w-full min-h-[200px] rounded-md border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring font-mono"
            placeholder="Write your answer here. Think carefully — there's no AI to help..."
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            autoFocus
          />

          <button
            onClick={handleSubmit}
            disabled={!answer.trim()}
            className="px-4 py-2 rounded-md bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Submit Answer
          </button>
        </div>
      )}

      {/* Self-assessment phase */}
      {phase === 'submitted' && (
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <h4 className="font-semibold text-sm text-foreground mb-2">Your Answer (submitted in {formatTime(elapsed)})</h4>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{answer}</p>
          </div>

          <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 p-4">
            <h4 className="font-semibold text-sm text-foreground mb-2">Self-Assessment</h4>
            <p className="text-xs text-muted-foreground mb-3">
              Before seeing the answer, honestly rate your confidence. The Forge values intellectual honesty.
            </p>
            <div className="flex gap-2">
              {[
                { value: 1, label: 'Wild guess' },
                { value: 2, label: 'Partial' },
                { value: 3, label: 'Mostly right' },
                { value: 4, label: 'Confident' },
                { value: 5, label: 'Nailed it' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleSelfRate(opt.value)}
                  className="flex-1 py-2 px-1 rounded-md border border-input hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 text-xs font-medium text-foreground transition-colors"
                >
                  {opt.value} — {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/20 p-4">
            <h4 className="font-semibold text-sm text-foreground mb-2">Key Reasoning Steps</h4>
            <ul className="space-y-1">
              {content.reasoningSteps.map((step, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="mt-0.5 text-purple-500 font-bold">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Reveal phase */}
      {phase === 'reveal' && score !== null && (
        <div className="space-y-4">
          <div className="rounded-lg border-2 border-purple-500/30 bg-purple-50/50 dark:bg-purple-950/20 p-6 text-center">
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
              {score} / 25
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Self-rated: {selfRating}/5 • Time: {formatTime(elapsed)} • Hints: {hintsUsed}
            </div>
          </div>

          {/* Your answer */}
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <h4 className="font-semibold text-sm text-foreground mb-2">Your Answer</h4>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{answer}</p>
          </div>

          {/* Reference answer */}
          <div className="rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 p-4">
            <h4 className="font-semibold text-sm text-emerald-700 dark:text-emerald-300 mb-2">Reference Answer</h4>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{content.correctAnswer}</p>
          </div>

          {/* Explanation */}
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <h4 className="font-semibold text-sm text-foreground mb-2">Why This Matters</h4>
            <p className="text-sm text-muted-foreground">{content.explanation}</p>
          </div>

          <button
            onClick={onComplete}
            className="px-4 py-2 rounded-md bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Back to Discipline
          </button>
        </div>
      )}
    </div>
  );
}
