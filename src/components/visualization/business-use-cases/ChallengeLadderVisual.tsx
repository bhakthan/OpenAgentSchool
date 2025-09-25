import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FlagCheckered, ArrowUp, MedalMilitary, Target } from "@phosphor-icons/react";

export const ChallengeLadderVisual: React.FC = () => {
  const levels = [
    { label: 'Level 1 · Foundations', tasks: ['Install toolchain', 'Run sample script'], color: 'bg-sky-100 dark:bg-sky-900/30' },
    { label: 'Level 2 · Guided Build', tasks: ['Call core API', 'Handle happy-path response'], color: 'bg-indigo-100 dark:bg-indigo-900/30' },
    { label: 'Level 3 · Resilience', tasks: ['Add retries + logging', 'Write smoke tests'], color: 'bg-purple-100 dark:bg-purple-900/30' },
    { label: 'Level 4 · Mastery', tasks: ['Ship demo feature', 'Author rubric + checklist'], color: 'bg-amber-100 dark:bg-amber-900/30' }
  ];

  return (
    <Card className="bg-muted/20 border-dashed">
      <CardContent className="p-4 space-y-4">
        <div className="text-center">
          <p className="text-sm font-semibold text-primary">Progressive Challenge Ladder</p>
          <p className="text-xs text-muted-foreground">Challenge Ladder Generator Pattern</p>
        </div>

        <div className="grid gap-3">
          {levels.map((level) => (
            <div key={level.label} className={`rounded-lg border p-3 ${level.color}`}>
              <div className="flex items-center justify-between text-xs font-semibold mb-2">
                <span>{level.label}</span>
                <ArrowUp size={16} className="text-primary" />
              </div>
              <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
                {level.tasks.map((task) => (
                  <li key={task}>{task}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border rounded-lg p-3 bg-background/70 text-xs flex items-start gap-2">
          <MedalMilitary size={16} className="text-emerald-600" />
          <div>
            <p className="font-semibold">Benchmark & Rubric</p>
            <p className="text-muted-foreground">Each rung ships with acceptance criteria, exemplar solution, and next-step recommendations.</p>
          </div>
        </div>

        <div className="border rounded-lg p-3 bg-background/60 text-xs flex items-center gap-2">
          <Target size={16} className="text-primary" />
          <span>Learners see prerequisites and dependencies before unlocking higher difficulty tiers.</span>
        </div>

        <div className="text-center text-xs text-muted-foreground flex items-center gap-2 justify-center">
          <FlagCheckered size={16} className="text-primary" />
          <span>End state: mastery project with evidence for hiring managers.</span>
        </div>
      </CardContent>
    </Card>
  );
};
