import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, XCircle, ListChecks, Star, Scales } from '@phosphor-icons/react';

export const GradingVisual: React.FC = () => {
  const criteria = [
    { name: 'Correctness', score: 4, max: 5 },
    { name: 'Clarity', score: 3, max: 5 },
    { name: 'Style', score: 3, max: 5 },
  ];
  const total = criteria.reduce((acc, c) => acc + c.score, 0);
  const max = criteria.reduce((acc, c) => acc + c.max, 0);

  return (
    <Card className="bg-muted/20 border-dashed">
      <CardContent className="p-4">
        <div className="text-center mb-3">
          <p className="text-sm font-semibold text-primary">Automated Grading</p>
          <p className="text-xs text-muted-foreground">Rubric Rater</p>
        </div>

        {/* Score Summary */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <Scales size={18} className="text-primary" />
          <span className="text-sm font-medium text-foreground">Score: {total} / {max}</span>
          {total / max >= 0.7 ? (
            <CheckCircle size={18} className="text-emerald-600 dark:text-emerald-400" />
          ) : (
            <XCircle size={18} className="text-rose-600 dark:text-rose-400" />
          )}
        </div>

        {/* Criteria Bars */}
        <div className="space-y-3">
          {criteria.map((c) => (
            <div key={c.name}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-medium">{c.name}</span>
                <span className="text-muted-foreground">{c.score}/{c.max}</span>
              </div>
        <div className="h-2 rounded bg-border overflow-hidden">
                <div
          className="h-2 bg-primary"
                  style={{ width: `${(c.score / c.max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Suggested Improvements */}
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <ListChecks size={16} className="text-primary" />
            <span className="text-xs font-semibold">Suggested Deltas</span>
          </div>
          <ul className="text-xs list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Clarify README sections with examples</li>
            <li>Add tests for edge cases (null, empty input)</li>
            <li>Use consistent naming for modules and functions</li>
          </ul>
        </div>

        {/* Badge */}
        <div className="mt-4 flex items-center justify-center gap-1 text-amber-600 dark:text-amber-400">
          <Star size={16} weight="fill" />
          <span className="text-xs">Transparent rubric and actionable feedback</span>
        </div>
      </CardContent>
    </Card>
  );
};
