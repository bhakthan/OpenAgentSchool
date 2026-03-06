/**
 * Socratic Defense — Exercise runner
 *
 * Flow: Topic → Learner writes their response → LLM Socratic examiner asks
 * probing questions → Learner defends → Scoring on defense quality.
 */

import React, { useState, useCallback } from 'react';
import { callLlmWithMessages, type LlmMessage } from '@/lib/llm';
import { getFirstAvailableProvider, isLlmProviderConfigured } from '@/lib/config';
import { completeExercise } from '@/lib/data/forge/progress';
import { trackEvent } from '@/lib/analytics/ga';
import type { SocraticDefenseExercise } from '@/lib/data/forge/types';

type Phase = 'prompt' | 'examining' | 'defense' | 'scoring' | 'result';

interface Message {
  role: 'examiner' | 'learner';
  content: string;
}

interface Props {
  exercise: SocraticDefenseExercise;
  onComplete: () => void;
}

export default function SocraticDefense({ exercise, onComplete }: Props) {
  const { content } = exercise;
  const [phase, setPhase] = useState<Phase>('prompt');
  const [initialResponse, setInitialResponse] = useState('');
  const [conversation, setConversation] = useState<Message[]>([]);
  const [currentReply, setCurrentReply] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');

  const hasLlm = isLlmProviderConfigured(getFirstAvailableProvider());
  const maxQuestions = content.fallbackQuestions.length;

  // Generate next examiner question
  const getExaminerQuestion = useCallback(async (history: Message[], response: string): Promise<string> => {
    if (!hasLlm) {
      return content.fallbackQuestions[questionIndex] ?? 'Summarize the key strengths and weaknesses of your approach.';
    }
    try {
      const messages: LlmMessage[] = [
        { role: 'system', content: content.systemPromptForExaminer },
        { role: 'user', content: `The student's initial proposal:\n\n${response}` },
        ...history.map(m => ({
          role: (m.role === 'examiner' ? 'assistant' : 'user') as LlmMessage['role'],
          content: m.content,
        })),
        { role: 'user', content: 'Ask the next probing Socratic question. One question only.' },
      ];
      const provider = getFirstAvailableProvider();
      const result = await callLlmWithMessages(messages, provider, { temperature: 0.7, maxTokens: 300 });
      return result.content;
    } catch {
      return content.fallbackQuestions[questionIndex] ?? 'Can you elaborate on your reasoning?';
    }
  }, [hasLlm, content, questionIndex]);

  // Submit initial response and start examination
  const handleSubmitResponse = useCallback(async () => {
    if (!initialResponse.trim()) return;
    setPhase('examining');
    setLoading(true);
    const question = await getExaminerQuestion([], initialResponse);
    setConversation([{ role: 'examiner', content: question }]);
    setQuestionIndex(1);
    setPhase('defense');
    setLoading(false);
    trackEvent('forge_exercise_start', { exercise_id: exercise.id, discipline: 'socratic-defense' });
  }, [initialResponse, getExaminerQuestion, exercise.id]);

  // Submit defense reply
  const handleDefenseReply = useCallback(async () => {
    if (!currentReply.trim()) return;
    const newConvo = [...conversation, { role: 'learner' as const, content: currentReply }];
    setConversation(newConvo);
    setCurrentReply('');

    if (questionIndex >= maxQuestions) {
      // Score the defense
      setPhase('scoring');
      setLoading(true);

      let finalScore = 0;
      let finalFeedback = '';

      if (hasLlm) {
        try {
          const messages: LlmMessage[] = [
            {
              role: 'system',
              content: `You are evaluating a student's Socratic defense. Score them on these criteria (each 0-5 points):\n${content.rubric.criteria.map((c, i) => `${i + 1}. ${c}`).join('\n')}\n\nReturn JSON: {"score": number, "feedback": "brief constructive feedback", "criteriaScores": [number, ...]}`,
            },
            { role: 'user', content: `Topic: ${content.topic}\nContext: ${content.context}\n\nInitial response:\n${initialResponse}\n\nDefense conversation:\n${newConvo.map(m => `${m.role}: ${m.content}`).join('\n\n')}` },
          ];
          const provider = getFirstAvailableProvider();
          const result = await callLlmWithMessages(messages, provider, {
            temperature: 0.3,
            maxTokens: 500,
            responseFormat: 'json',
          });
          const parsed = JSON.parse(result.content);
          finalScore = Math.min(parsed.score ?? 0, content.rubric.maxScore);
          finalFeedback = parsed.feedback ?? 'Defense evaluated.';
        } catch {
          // Fallback scoring
          finalScore = Math.round(content.rubric.maxScore * 0.6);
          finalFeedback = 'LLM scoring unavailable. Estimated score based on response completeness.';
        }
      } else {
        // No LLM: give a reasonable default
        const replyCount = newConvo.filter(m => m.role === 'learner').length;
        finalScore = Math.min(replyCount * 5, content.rubric.maxScore);
        finalFeedback = `You answered ${replyCount} questions. For deeper feedback, configure an LLM provider in Settings.`;
      }

      setScore(finalScore);
      setFeedback(finalFeedback);
      completeExercise(exercise.discipline, exercise.id, finalScore, content.rubric.maxScore, finalFeedback);
      trackEvent('forge_exercise_complete', {
        exercise_id: exercise.id,
        discipline: 'socratic-defense',
        score: finalScore,
        max_score: content.rubric.maxScore,
      });
      setPhase('result');
      setLoading(false);
    } else {
      // Next examiner question
      setLoading(true);
      const question = await getExaminerQuestion(newConvo, initialResponse);
      setConversation([...newConvo, { role: 'examiner', content: question }]);
      setQuestionIndex(prev => prev + 1);
      setLoading(false);
    }
  }, [currentReply, conversation, questionIndex, maxQuestions, hasLlm, content, initialResponse, exercise, getExaminerQuestion]);

  return (
    <div className="space-y-6">
      {/* Context */}
      <div className="rounded-lg border border-border bg-muted/30 p-4">
        <h3 className="font-semibold text-foreground mb-1">{content.topic}</h3>
        <p className="text-sm text-muted-foreground">{content.context}</p>
      </div>

      {/* Phase: Write initial response */}
      {phase === 'prompt' && (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-foreground">
            Your Response
            <span className="ml-1 text-xs text-muted-foreground">(propose your design or solution)</span>
          </label>
          <textarea
            className="w-full min-h-[160px] rounded-md border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Write your response here. Be specific — the examiner will probe every claim you make..."
            value={initialResponse}
            onChange={e => setInitialResponse(e.target.value)}
          />
          <button
            onClick={handleSubmitResponse}
            disabled={!initialResponse.trim()}
            className="px-4 py-2 rounded-md bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Submit & Begin Examination
          </button>
        </div>
      )}

      {/* Phase: Loading */}
      {(phase === 'examining' || phase === 'scoring') && loading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground py-8 justify-center">
          <div className="h-4 w-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          {phase === 'examining' ? 'The examiner is preparing a question...' : 'Evaluating your defense...'}
        </div>
      )}

      {/* Phase: Defense conversation */}
      {phase === 'defense' && (
        <div className="space-y-4">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Socratic Examination — Question {questionIndex} of {maxQuestions}
          </div>

          {/* Conversation history */}
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {conversation.map((msg, i) => (
              <div
                key={i}
                className={`rounded-lg p-3 text-sm ${
                  msg.role === 'examiner'
                    ? 'bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800'
                    : 'bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 ml-4'
                }`}
              >
                <span className="text-xs font-semibold uppercase tracking-wide block mb-1 text-muted-foreground">
                  {msg.role === 'examiner' ? '🔍 Examiner' : '💡 You'}
                </span>
                <span className="text-foreground">{msg.content}</span>
              </div>
            ))}
          </div>

          {/* Reply input */}
          {!loading && (
            <div className="space-y-2">
              <textarea
                className="w-full min-h-[100px] rounded-md border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Defend your position..."
                value={currentReply}
                onChange={e => setCurrentReply(e.target.value)}
              />
              <button
                onClick={handleDefenseReply}
                disabled={!currentReply.trim() || loading}
                className="px-4 py-2 rounded-md bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {questionIndex >= maxQuestions ? 'Submit Final Defense' : 'Reply to Examiner'}
              </button>
            </div>
          )}

          {loading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
              <div className="h-4 w-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
              Examiner is thinking...
            </div>
          )}
        </div>
      )}

      {/* Phase: Result */}
      {phase === 'result' && score !== null && (
        <div className="space-y-4">
          <div className="rounded-lg border-2 border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 p-6 text-center">
            <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
              {score} / {content.rubric.maxScore}
            </div>
            <div className="text-sm text-muted-foreground mt-1">Defense Score</div>
          </div>

          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <h4 className="font-semibold text-sm text-foreground mb-2">Feedback</h4>
            <p className="text-sm text-muted-foreground">{feedback}</p>
          </div>

          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <h4 className="font-semibold text-sm text-foreground mb-2">Rubric Criteria</h4>
            <ul className="space-y-1">
              {content.rubric.criteria.map((c, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
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
