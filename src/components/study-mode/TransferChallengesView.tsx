import React from 'react';
import { transferChallenges } from '@/lib/data/studyMode/transferChallenges';
import { Button } from '@/components/ui/button';

export const TransferChallengesView: React.FC<{ onLaunchScenario?: (id: string) => void }> = ({ onLaunchScenario }) => (
  <div className="space-y-4 text-sm leading-relaxed text-foreground">
    {transferChallenges.map(tc => (
      <div
        key={tc.id}
        className="rounded-xl border border-indigo-200 bg-white p-4 shadow-[0_1px_0_rgba(79,70,229,0.08)] dark:border-indigo-800/60 dark:bg-indigo-950/30"
      >
        <div className="mb-1 text-base font-semibold text-indigo-900 dark:text-indigo-100">{tc.title}</div>
        <div className="text-sm text-muted-foreground">{tc.description}</div>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
          {tc.compositePatterns.map(pattern => (
            <span key={pattern} className="rounded-full border border-indigo-200 bg-indigo-50 px-2 py-1 dark:border-indigo-800/60 dark:bg-indigo-900/40">
              {pattern}
            </span>
          ))}
        </div>
        {onLaunchScenario && (
          <Button
            size="sm"
            variant="secondary"
            className="mt-3"
            onClick={() => onLaunchScenario(tc.id)}
          >
            Launch fusion scenario
          </Button>
        )}
      </div>
    ))}
  </div>
);
export default TransferChallengesView;