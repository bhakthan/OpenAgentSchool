import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ClockCounterClockwise, Brain, Repeat, ChartLineUp } from '@phosphor-icons/react';

export const StrategyMemoryReplayVisual: React.FC = () => (
  <Card className="bg-muted/30 border-dashed">
    <CardContent className="p-4 space-y-3 text-xs">
      <div className="flex items-center gap-2 font-semibold text-primary"><ClockCounterClockwise size={18}/> Strategy Memory Replay</div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2 border rounded flex flex-col gap-1">
          <span className="font-medium flex items-center gap-1"><Brain size={14}/> Retrieve</span>
          <span className="text-[10px]">Match prior execution traces</span>
        </div>
        <div className="p-2 border rounded flex flex-col gap-1">
          <span className="font-medium flex items-center gap-1"><Repeat size={14}/> Adapt</span>
          <span className="text-[10px]">Blend + mutate steps</span>
        </div>
      </div>
      <div className="flex items-center gap-1 text-green-600 text-xs"><ChartLineUp size={12}/> Boosts decomposition quality & cost efficiency.</div>
    </CardContent>
  </Card>
);
