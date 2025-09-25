import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { driftEvents } from '@/lib/data/studyMode/driftLabs';
import { emitTelemetry } from '@/lib/data/studyMode/telemetry';

interface HistoricalSummary { id: string; cost: number; freshnessDays: number; hashDelta: number; patterns: string[]; }
const MOCK_HISTORY: HistoricalSummary[] = [
  { id: 'plan-A', cost: 3.2, freshnessDays: 2, hashDelta: 0, patterns: ['strategy-memory-replay','query-intent-structured-access'] },
  { id: 'plan-B', cost: 2.1, freshnessDays: 9, hashDelta: 12, patterns: ['strategy-memory-replay'] },
  { id: 'plan-C', cost: 5.0, freshnessDays: 1, hashDelta: 3, patterns: ['strategy-memory-replay','perception-normalization'] }
];

export const StrategyReplaySandbox: React.FC = () => {
  const [choice, setChoice] = useState<string | null>(null);
  const activeDrift = driftEvents[0];

  const handleSelect = (plan: HistoricalSummary, decision: 'reuse'|'adapt'|'rebuild') => {
    setChoice(plan.id + ':' + decision);
    emitTelemetry({ kind: 'replay_choice_made', patternId: 'strategy-memory-replay', meta: { plan: plan.id, decision, hashDelta: plan.hashDelta } });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Strategy Memory Replay Sandbox</CardTitle>
        <CardDescription>Decide reuse vs adapt vs rebuild under drift</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 text-xs">
        <div className="p-2 rounded bg-amber-50 dark:bg-amber-900/30">Active drift: {activeDrift.description}</div>
        <div className="grid md:grid-cols-3 gap-3">
          {MOCK_HISTORY.map(h => (
            <div key={h.id} className="p-2 border rounded-md dark:border-neutral-700 space-y-1">
              <div className="font-medium">{h.id}</div>
              <div>Cost: {h.cost.toFixed(1)}</div>
              <div>Freshness: {h.freshnessDays}d</div>
              <div>Hash Δ: {h.hashDelta}</div>
              <div className="text-[10px] text-muted-foreground">{h.patterns.join(', ')}</div>
              <div className="flex gap-1 mt-1">
                <Button size="sm" variant="outline" onClick={() => handleSelect(h,'reuse')}>Reuse</Button>
                <Button size="sm" variant="outline" onClick={() => handleSelect(h,'adapt')}>Adapt</Button>
                <Button size="sm" variant="destructive" onClick={() => handleSelect(h,'rebuild')}>Rebuild</Button>
              </div>
            </div>
          ))}
        </div>
        {choice && <div className="text-green-600 dark:text-green-400">Recorded decision: {choice}</div>}
      </CardContent>
    </Card>
  );
};
export default StrategyReplaySandbox;