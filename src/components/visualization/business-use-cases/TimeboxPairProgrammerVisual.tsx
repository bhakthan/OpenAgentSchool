import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Timer, Keyboard, ChatCircleDots, ArrowClockwise, Trophy } from "@phosphor-icons/react";

export const TimeboxPairProgrammerVisual: React.FC = () => {
  const phases = [
    { icon: Keyboard, title: 'Plan (3 min)', detail: 'Agree on micro-goal & success criteria.' },
    { icon: Timer, title: 'Build (15 min)', detail: 'Focus sprint with nudges & shortcuts.' },
    { icon: ChatCircleDots, title: 'Review (5 min)', detail: 'Diff walk-through & checklist.' }
  ];

  return (
    <Card className="bg-muted/20 border-dashed">
      <CardContent className="p-4 space-y-4">
        <div className="text-center">
          <p className="text-sm font-semibold text-primary">20-Minute Pairing Cycle</p>
          <p className="text-xs text-muted-foreground">Time‑box Pair Programmer Pattern</p>
        </div>

        <div className="grid gap-3">
          {phases.map(({ icon: Icon, title, detail }) => (
            <div key={title} className="border rounded-lg p-3 bg-background/70 text-xs flex gap-3 items-start">
              <Icon size={18} className="text-primary" />
              <div>
                <p className="font-semibold">{title}</p>
                <p className="text-muted-foreground">{detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border rounded-lg p-3 bg-indigo-50 dark:bg-indigo-900/20 text-xs flex items-center gap-2">
          <ArrowClockwise size={16} className="text-indigo-600" />
          <span>Cycle repeats with next priority pulled from backlog; bot nudges to capture blockers.</span>
        </div>

        <div className="text-center text-xs text-muted-foreground flex items-center gap-2 justify-center">
          <Trophy size={16} className="text-amber-500" />
          <span>Teams ship twice as many micro-features with fewer context switches.</span>
        </div>
      </CardContent>
    </Card>
  );
};
