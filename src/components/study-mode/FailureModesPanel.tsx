import React from 'react';
import { failureModes } from '@/lib/data/studyMode/failureModes';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export const FailureModesPanel: React.FC<{ patternId: string }> = ({ patternId }) => {
  const modes = failureModes.filter(m => m.patternId === patternId).slice(0,3);
  if (!modes.length) return null;
  return (
    <Card className="border border-red-200/80 bg-white shadow-sm dark:border-red-700/70 dark:bg-red-950/30">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-red-900 dark:text-red-100">Failure Modes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm leading-relaxed text-foreground">
        {modes.map(m => (
          <div
            key={m.mode}
            className="rounded-xl border border-red-100 bg-white p-4 shadow-[0_1px_0_rgba(0,0,0,0.04)] dark:border-red-900/40 dark:bg-red-900/20"
          >
            <div className="font-semibold text-red-900 dark:text-red-100">{m.mode}</div>
            <div className="text-muted-foreground">{m.description}</div>
            <div className="mt-1 text-sm font-medium text-red-600 dark:text-red-300">Detect: {m.detectionSignal}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
export default FailureModesPanel;
