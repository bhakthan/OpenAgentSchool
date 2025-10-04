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
    <Card className="border border-gray-200 bg-white shadow-sm dark:border-orange-700/70 dark:bg-orange-950/30">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-gray-900 dark:text-orange-100">Mastery</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm leading-relaxed">
        {ORDER.map((t, i) => {
          const b = (bands as any)[t];
          if (!b) return null;
          return (
            <div
              key={t}
              className="rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm dark:border-orange-900/40 dark:bg-orange-900/30"
            >
              <div className="flex items-center justify-between text-sm font-semibold capitalize text-gray-900 dark:text-orange-200">
                <span>{t}</span>
                {i <= activeIdx && <span className="text-green-600 dark:text-green-400">✔</span>}
              </div>
              <ul className="ml-4 mt-2 list-disc space-y-1 text-gray-700 dark:text-gray-300">
                {b.signals.slice(0, 2).map((s: string) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          );
        })}
        <Progress value={((activeIdx + 1) / ORDER.length) * 100} className="h-2" />
      </CardContent>
    </Card>
  );
};
export default MasteryPanel;
