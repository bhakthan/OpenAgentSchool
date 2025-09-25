import React from 'react';
import { transferChallenges } from '@/lib/data/studyMode/transferChallenges';
import { Button } from '@/components/ui/button';

export const TransferChallengesView: React.FC<{ onLaunchScenario?: (id: string) => void }> = ({ onLaunchScenario }) => (
  <div className="space-y-3 text-[11px]">
    {transferChallenges.map(tc => (
      <div key={tc.id} className="p-2 border rounded-md dark:border-indigo-700 border-indigo-300">
        <div className="font-medium mb-1">{tc.title}</div>
        <div className="text-muted-foreground mb-1">{tc.description}</div>
        <div className="text-indigo-500 mb-1">{tc.compositePatterns.join(', ')}</div>
  {onLaunchScenario && <Button size="sm" variant="outline" onClick={() => onLaunchScenario(tc.id)}>Launch</Button>}
      </div>
    ))}
  </div>
);
export default TransferChallengesView;