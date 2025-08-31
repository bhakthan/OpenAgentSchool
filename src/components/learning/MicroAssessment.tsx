import React, { useState } from 'react';
import { progressStore } from '@/lib/learning/progressStore';
import { Button } from '@/components/ui/button';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
}

interface MicroAssessmentProps {
  moduleId: import('@/lib/learning/progressStore').ModuleId;
  assessmentId: string;
  title?: string;
  questions: Question[];
  passThreshold?: number; // 0-100
  feedback?: { pass?: string; fail?: string };
}

export const MicroAssessment: React.FC<MicroAssessmentProps> = ({ moduleId, assessmentId, title = 'Micro‑assessment', questions, passThreshold = 70, feedback }) => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [score, setScore] = useState<number | undefined>(progressStore.getMicroAssessmentScore(moduleId, assessmentId)?.score);
  const [submitted, setSubmitted] = useState<boolean>(typeof score === 'number');

  const submit = () => {
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctIndex) correct++;
    });
    const pct = Math.round((correct / questions.length) * 100);
    progressStore.setMicroAssessmentScore(moduleId, assessmentId, pct);
    setScore(pct);
    setSubmitted(true);
  };

  const reset = () => {
    setAnswers({});
    setScore(undefined);
    setSubmitted(false);
    // Keep stored score; user can improve on resubmit
  };

  return (
    <div className="rounded border p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="font-medium">{title}</div>
        {typeof score === 'number' && (
          <span className="text-xs text-muted-foreground">Score: {score}</span>
        )}
      </div>
      <div className="space-y-3">
        {questions.map(q => (
          <div key={q.id}>
            <div className="text-sm font-medium">{q.text}</div>
            <div className="mt-1 flex flex-col gap-1">
              {q.options.map((opt, idx) => (
                <label key={idx} className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    checked={answers[q.id] === idx}
                    onChange={() => setAnswers({ ...answers, [q.id]: idx })}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <Button size="sm" onClick={submit} disabled={submitted && typeof score === 'number'}>Submit</Button>
        <Button size="sm" variant="ghost" onClick={reset}>Retake</Button>
        <span className="text-xs text-muted-foreground">Pass ≥ {passThreshold}%</span>
      </div>
      {submitted && typeof score === 'number' && (
        <div className="mt-2 text-sm">
          {score >= passThreshold ? (
            <div className="text-green-600">{feedback?.pass || 'Passed. Well done!'}</div>
          ) : (
            <div className="text-amber-600">{feedback?.fail || 'Keep practicing and try again.'}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MicroAssessment;
