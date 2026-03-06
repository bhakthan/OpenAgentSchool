/**
 * Trust Calibration Lab — Exercise runner
 *
 * Scenario-based decision tree where learner configures agent autonomy levels.
 * Scored on whether trust matches risk.
 */

import React, { useState, useCallback } from 'react';
import { completeExercise } from '@/lib/data/forge/progress';
import { trackEvent } from '@/lib/analytics/ga';
import type { TrustCalibrationExercise, TrustOption } from '@/lib/data/forge/types';

type Phase = 'scenario' | 'deciding' | 'result';

interface DecisionChoice {
  decisionId: string;
  chosenOptionId: string;
  option: TrustOption;
}

interface Props {
  exercise: TrustCalibrationExercise;
  onComplete: () => void;
}

export default function TrustCalibrationLab({ exercise, onComplete }: Props) {
  const { content } = exercise;
  const [phase, setPhase] = useState<Phase>('scenario');
  const [currentDecisionIndex, setCurrentDecisionIndex] = useState(0);
  const [choices, setChoices] = useState<DecisionChoice[]>([]);
  const [score, setScore] = useState<number | null>(null);

  const totalDecisions = content.decisions.length;
  const currentDecision = content.decisions[currentDecisionIndex];

  const handleStart = useCallback(() => {
    setPhase('deciding');
    trackEvent('forge_exercise_start', { exercise_id: exercise.id, discipline: 'trust-calibration' });
  }, [exercise.id]);

  const handleChoose = useCallback((option: TrustOption) => {
    const choice: DecisionChoice = {
      decisionId: currentDecision.id,
      chosenOptionId: option.id,
      option,
    };

    const newChoices = [...choices, choice];
    setChoices(newChoices);

    if (currentDecisionIndex + 1 >= totalDecisions) {
      // All decisions made — calculate score
      const totalScore = newChoices.reduce((sum, c) => sum + c.option.score, 0);
      setScore(totalScore);
      completeExercise(
        exercise.discipline,
        exercise.id,
        totalScore,
        content.scoringCriteria.maxScore,
      );
      trackEvent('forge_exercise_complete', {
        exercise_id: exercise.id,
        discipline: 'trust-calibration',
        score: totalScore,
        max_score: content.scoringCriteria.maxScore,
      });
      setPhase('result');
    } else {
      setCurrentDecisionIndex(prev => prev + 1);
    }
  }, [currentDecision, choices, currentDecisionIndex, totalDecisions, content, exercise]);

  const autonomyColor = (level: TrustOption['autonomyLevel']) => {
    switch (level) {
      case 'full-auto': return 'border-red-300 dark:border-red-700 bg-red-50/50 dark:bg-red-950/20';
      case 'supervised': return 'border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-950/20';
      case 'human-in-loop': return 'border-emerald-300 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-950/20';
      case 'manual': return 'border-blue-300 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-950/20';
    }
  };

  const autonomyLabel = (level: TrustOption['autonomyLevel']) => {
    switch (level) {
      case 'full-auto': return '🔴 Full Autonomy';
      case 'supervised': return '🟡 Supervised';
      case 'human-in-loop': return '🟢 Human-in-Loop';
      case 'manual': return '🔵 Manual';
    }
  };

  return (
    <div className="space-y-6">
      {/* Scenario phase */}
      {phase === 'scenario' && (
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <h3 className="font-semibold text-foreground mb-2">Scenario</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{content.scenario}</p>
          </div>

          {/* Agent profiles */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Agents in Play</h4>
            {content.agents.map(agent => (
              <div key={agent.id} className="rounded-md border border-border p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{agent.name}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    agent.riskLevel === 'high' ? 'bg-red-200 dark:bg-red-800 text-red-700 dark:text-red-200' :
                    agent.riskLevel === 'medium' ? 'bg-amber-200 dark:bg-amber-800 text-amber-700 dark:text-amber-200' :
                    'bg-emerald-200 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-200'
                  }`}>
                    {agent.riskLevel} risk
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{agent.role}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {agent.capabilities.map((cap, i) => (
                    <span key={i} className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground italic">
            You'll make {totalDecisions} decisions about agent autonomy. Each choice has consequences.
          </p>

          <button
            onClick={handleStart}
            className="px-6 py-3 rounded-md bg-cyan-600 text-white font-medium hover:bg-cyan-700 transition-colors"
          >
            Begin Calibration
          </button>
        </div>
      )}

      {/* Decision phase */}
      {phase === 'deciding' && currentDecision && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Decision {currentDecisionIndex + 1} of {totalDecisions}
          </div>

          {/* Previous choices summary */}
          {choices.length > 0 && (
            <div className="rounded-md border border-border bg-muted/20 p-3 space-y-1">
              <span className="text-xs font-semibold text-muted-foreground">Previous decisions:</span>
              {choices.map((c, i) => (
                <div key={c.decisionId} className="text-xs text-muted-foreground flex items-center gap-1">
                  <span>#{i + 1}:</span>
                  <span className="font-medium">{c.option.label}</span>
                </div>
              ))}
            </div>
          )}

          <div className="rounded-lg border border-cyan-200 dark:border-cyan-800 bg-cyan-50/50 dark:bg-cyan-950/20 p-4">
            <p className="text-sm text-foreground font-medium">{currentDecision.description}</p>
          </div>

          <div className="space-y-2">
            {currentDecision.options.map(option => (
              <button
                key={option.id}
                onClick={() => handleChoose(option)}
                className={`w-full text-left rounded-md border p-3 transition-colors hover:shadow-sm ${autonomyColor(option.autonomyLevel)}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold">{autonomyLabel(option.autonomyLevel)}</span>
                </div>
                <p className="text-sm text-foreground">{option.label}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Result phase */}
      {phase === 'result' && score !== null && (
        <div className="space-y-4">
          <div className="rounded-lg border-2 border-cyan-500/30 bg-cyan-50/50 dark:bg-cyan-950/20 p-6 text-center">
            <div className="text-4xl font-bold text-cyan-600 dark:text-cyan-400">
              {score} / {content.scoringCriteria.maxScore}
            </div>
            <div className="text-sm text-muted-foreground mt-1">Trust Calibration Score</div>
          </div>

          {/* Scoring bands */}
          <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-2">
            <h4 className="font-semibold text-sm text-foreground">Scoring Guide</h4>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">{content.scoringCriteria.idealRange}</p>
            <p className="text-xs text-amber-600 dark:text-amber-400">{content.scoringCriteria.underTrustPenalty}</p>
            <p className="text-xs text-red-600 dark:text-red-400">{content.scoringCriteria.overTrustPenalty}</p>
          </div>

          {/* Decision review */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-foreground">Decision Review</h4>
            {choices.map((choice, i) => {
              const decision = content.decisions.find(d => d.id === choice.decisionId)!;
              const bestOption = [...decision.options].sort((a, b) => b.score - a.score)[0];
              const isOptimal = choice.chosenOptionId === bestOption.id;
              return (
                <div
                  key={choice.decisionId}
                  className={`rounded-md border p-3 ${
                    isOptimal
                      ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-950/20'
                      : 'border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-950/20'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-foreground">
                      #{i + 1}: {decision.description}
                    </span>
                    <span className="text-xs">
                      {isOptimal ? '✅' : '⚠️'} +{choice.option.score} pts
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">
                    Your choice: {choice.option.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{choice.option.feedback}</p>
                  {!isOptimal && (
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                      Better choice: {bestOption.label} (+{bestOption.score} pts)
                    </p>
                  )}
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
