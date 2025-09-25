import React from 'react';
import { masteryIndex } from '@/lib/data/studyMode/patternMastery';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const ORDER = ['recognition','application','optimization','governance'] as const;

export const MasteryPanel: React.FC<{ patternId: string; currentTier?: string | null }> = ({ patternId, currentTier }) => {
  const bands = masteryIndex[patternId];
  if (!bands) return null;
  const activeIdx = currentTier ? ORDER.indexOf(currentTier as any) : -1;
  return (
    <Card className="border-orange-300 dark:border-orange-700">
      <CardHeader><CardTitle className="text-sm">Mastery</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        {ORDER.map((t, i) => {
          const b = (bands as any)[t];
          if (!b) return null;
          return (
            <div key={t} className="p-1.5 rounded bg-orange-50 dark:bg-orange-900/20 text-[11px]">
              <div className="flex justify-between"><span className="font-medium">{t}</span>{i <= activeIdx && <span className="text-green-600 dark:text-green-400">✔</span>}</div>
              <ul className="list-disc ml-4 mt-1 space-y-0.5">
                {b.signals.slice(0,2).map((s: string) => <li key={s}>{s}</li>)}
              </ul>
            </div>
          );
        })}
        <Progress value={((activeIdx+1)/ORDER.length)*100} className="h-1" />
      </CardContent>
    </Card>
  );
};
export default MasteryPanel;
