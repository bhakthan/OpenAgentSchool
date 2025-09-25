import React from 'react';
import { failureModes } from '@/lib/data/studyMode/failureModes';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export const FailureModesPanel: React.FC<{ patternId: string }> = ({ patternId }) => {
  const modes = failureModes.filter(m => m.patternId === patternId).slice(0,3);
  if (!modes.length) return null;
  return (
    <Card className="border-red-300 dark:border-red-700">
      <CardHeader><CardTitle className="text-sm">Failure Modes</CardTitle></CardHeader>
      <CardContent className="space-y-2 text-[11px]">
        {modes.map(m => (
          <div key={m.mode}>
            <div className="font-medium">{m.mode}</div>
            <div className="text-muted-foreground">{m.description}</div>
            <div className="text-red-500 mt-0.5">Detect: {m.detectionSignal}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
export default FailureModesPanel;
