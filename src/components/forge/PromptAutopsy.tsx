/**
 * Prompt Autopsy — Exercise runner
 *
 * Shows a flawed AI output. Learner identifies errors via structured form,
 * gets scored on how many they found and whether explanations are correct.
 */

import React, { useState, useCallback } from 'react';
import { completeExercise } from '@/lib/data/forge/progress';
import { trackEvent } from '@/lib/analytics/ga';
import type { PromptAutopsyExercise, EmbeddedError } from '@/lib/data/forge/types';

interface Finding {
  errorId: string;
  description: string;
  explanation: string;
  found: boolean;
}

type Phase = 'examine' | 'report' | 'result';

interface Props {
  exercise: PromptAutopsyExercise;
  onComplete: () => void;
}

export default function PromptAutopsy({ exercise, onComplete }: Props) {
  const { content } = exercise;
  const [phase, setPhase] = useState<Phase>('examine');
  const [findings, setFindings] = useState<Finding[]>(
    content.embeddedErrors.map(e => ({
      errorId: e.id,
      description: '',
      explanation: '',
      found: false,
    })),
  );
  const [freeformNotes, setFreeformNotes] = useState('');
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [revealedErrors, setRevealedErrors] = useState<EmbeddedError[]>([]);

  const maxScore = content.embeddedErrors.reduce(
    (sum, e) => sum + (e.severity === 'critical' ? 5 : e.severity === 'major' ? 3 : 1),
    0,
  );

  const revealHint = useCallback(() => {
    if (hintsUsed < content.hints.length) {
      setHintsUsed(prev => prev + 1);
      setShowHint(true);
    }
  }, [hintsUsed, content.hints.length]);

  const toggleFinding = useCallback((errorId: string) => {
    setFindings(prev =>
      prev.map(f => (f.errorId === errorId ? { ...f, found: !f.found } : f)),
    );
  }, []);

  const updateFindingExplanation = useCallback((errorId: string, explanation: string) => {
    setFindings(prev =>
      prev.map(f => (f.errorId === errorId ? { ...f, explanation } : f)),
    );
  }, []);

  const handleSubmitReport = useCallback(() => {
    // Score: points for each error correctly identified + explanation quality
    let earnedScore = 0;
    const found = findings.filter(f => f.found);

    for (const finding of found) {
      const error = content.embeddedErrors.find(e => e.id === finding.errorId);
      if (!error) continue;
      const basePoints = error.severity === 'critical' ? 5 : error.severity === 'major' ? 3 : 1;
      // Give full points for identification; bonus for explanation
      earnedScore += basePoints;
      if (finding.explanation.trim().length > 20) {
        earnedScore += Math.round(basePoints * 0.2); // 20% bonus for explanation
      }
    }

    // Penalty for unused hints
    earnedScore = Math.max(0, earnedScore - hintsUsed);

    const finalScore = Math.min(earnedScore, maxScore);
    setScore(finalScore);
    setRevealedErrors(content.embeddedErrors);
    completeExercise(exercise.discipline, exercise.id, finalScore, maxScore);
    trackEvent('forge_exercise_complete', {
      exercise_id: exercise.id,
      discipline: 'prompt-autopsies',
      score: finalScore,
      max_score: maxScore,
      errors_found: found.length,
      errors_total: content.embeddedErrors.length,
    });
    setPhase('result');
  }, [findings, hintsUsed, maxScore, content, exercise]);

  return (
    <div className="space-y-6">
      {/* Domain badge */}
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-medium">
        {content.domain}
      </div>

      {/* Flawed output */}
      <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20 p-4">
        <div className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide mb-2">
          AI-Generated Output (Contains Errors)
        </div>
        <div className="prose prose-sm dark:prose-invert max-w-none text-sm whitespace-pre-wrap font-mono leading-relaxed">
          {content.flawedOutput}
        </div>
      </div>

      {/* Hints */}
      {phase === 'examine' && content.hints.length > 0 && (
        <div className="flex items-center gap-3">
          <button
            onClick={revealHint}
            disabled={hintsUsed >= content.hints.length}
            className="text-xs px-3 py-1.5 rounded-md border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/30 disabled:opacity-40 transition-colors"
          >
            Hint ({hintsUsed}/{content.hints.length})
          </button>
          {showHint && hintsUsed > 0 && (
            <span className="text-xs text-amber-600 dark:text-amber-400 italic">
              {content.hints[hintsUsed - 1]}
            </span>
          )}
        </div>
      )}

      {/* Examination phase: checklist */}
      {phase === 'examine' && (
        <div className="space-y-4">
          <h4 className="font-semibold text-sm text-foreground">Autopsy Checklist</h4>
          <p className="text-xs text-muted-foreground">
            Identify each error you find. Check the box and optionally explain why it's wrong.
          </p>

          <div className="space-y-3">
            {content.embeddedErrors.map((error, i) => {
              const finding = findings.find(f => f.errorId === error.id)!;
              return (
                <div
                  key={error.id}
                  className={`rounded-md border p-3 transition-colors ${
                    finding.found
                      ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-950/20'
                      : 'border-border bg-background'
                  }`}
                >
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={finding.found}
                      onChange={() => toggleFinding(error.id)}
                      className="mt-0.5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium text-foreground">
                        Error #{i + 1}
                        {error.location && (
                          <span className="ml-1 text-xs text-muted-foreground">({error.location})</span>
                        )}
                      </span>
                      {finding.found && (
                        <textarea
                          className="mt-2 w-full min-h-[60px] rounded-md border border-input bg-background p-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
                          placeholder="Why is this wrong? (optional but improves your score)"
                          value={finding.explanation}
                          onChange={e => updateFindingExplanation(error.id, e.target.value)}
                        />
                      )}
                    </div>
                  </label>
                </div>
              );
            })}
          </div>

          {/* Freeform notes */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Additional Notes <span className="text-xs text-muted-foreground">(optional)</span>
            </label>
            <textarea
              className="w-full min-h-[80px] rounded-md border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Any patterns you noticed, meta-observations..."
              value={freeformNotes}
              onChange={e => setFreeformNotes(e.target.value)}
            />
          </div>

          <button
            onClick={handleSubmitReport}
            className="px-4 py-2 rounded-md bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
          >
            Submit Autopsy Report
          </button>
        </div>
      )}

      {/* Result phase */}
      {phase === 'result' && score !== null && (
        <div className="space-y-4">
          <div className="rounded-lg border-2 border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 p-6 text-center">
            <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
              {score} / {maxScore}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Found {findings.filter(f => f.found).length} of {content.embeddedErrors.length} errors
            </div>
          </div>

          {/* Revealed errors */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-foreground">Full Error Analysis</h4>
            {revealedErrors.map((error, i) => {
              const found = findings.find(f => f.errorId === error.id)?.found;
              return (
                <div
                  key={error.id}
                  className={`rounded-md border p-3 ${
                    found
                      ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-950/20'
                      : 'border-red-300 dark:border-red-700 bg-red-50/50 dark:bg-red-950/20'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                      error.severity === 'critical' ? 'bg-red-200 dark:bg-red-800 text-red-700 dark:text-red-200' :
                      error.severity === 'major' ? 'bg-amber-200 dark:bg-amber-800 text-amber-700 dark:text-amber-200' :
                      'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                    }`}>
                      {error.severity}
                    </span>
                    <span className="text-sm font-medium text-foreground">{found ? '✅ Found' : '❌ Missed'}</span>
                    {error.location && (
                      <span className="text-xs text-gray-600 dark:text-gray-400">— {error.location}</span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-foreground">{error.description}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{error.explanation}</p>
                </div>
              );
            })}
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
