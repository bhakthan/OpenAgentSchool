import React from 'react';
import { transferChallenges } from '@/lib/data/studyMode/transferChallenges';
import { Button } from '@/components/ui/button';

export const TransferChallengesView: React.FC<{ onLaunchScenario?: (id: string) => void }> = ({ onLaunchScenario }) => (
  <div className="space-y-4 text-sm leading-relaxed">
    {transferChallenges.map(tc => (
      <div
        key={tc.id}
        className="rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm dark:border-indigo-800/60 dark:bg-indigo-950/30"
      >
        <div className="mb-1 text-base font-semibold text-gray-900 dark:text-indigo-100">{tc.title}</div>
        <div className="text-sm text-gray-700 dark:text-gray-300">{tc.description}</div>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-600 dark:text-indigo-300">
          {tc.compositePatterns.map(pattern => (
            <span key={pattern} className="rounded-full border border-gray-300 bg-gray-100 px-2 py-1 dark:border-indigo-800/60 dark:bg-indigo-900/40">
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