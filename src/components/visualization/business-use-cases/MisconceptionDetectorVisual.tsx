import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Bug, Lightbulb, ClipboardText, ArrowsCounterClockwise } from "@phosphor-icons/react";

export const MisconceptionDetectorVisual: React.FC = () => {
  return (
    <Card className="bg-muted/20 border-dashed">
      <CardContent className="p-4 space-y-4">
        <div className="text-center">
          <p className="text-sm font-semibold text-primary">Real-Time Misconception Triage</p>
          <p className="text-xs text-muted-foreground">Misconception Detector Pattern</p>
        </div>

        <div className="border rounded-lg p-3 bg-background/70 text-xs space-y-2">
          <div className="flex items-center gap-2 font-semibold">
            <Bug size={16} className="text-rose-500" />
            <span>Detected Pattern</span>
          </div>
          <p className="text-muted-foreground">"Precision equals how many true positives we catch"</p>
          <p className="bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-200 px-2 py-1 rounded">Likely misconception: Precision vs Recall confusion</p>
        </div>

        <div className="border rounded-lg p-3 bg-emerald-50 dark:bg-emerald-900/20 text-xs space-y-2">
          <div className="flex items-center gap-2 font-semibold text-emerald-700 dark:text-emerald-200">
            <Lightbulb size={16} />
            <span>Micro-lesson (5 min)</span>
          </div>
          <ul className="list-disc pl-4 space-y-1 text-emerald-700 dark:text-emerald-100">
            <li>Walk through a confusion matrix example</li>
            <li>Contrast precision vs recall numerically</li>
            <li>Provide quick recall mnemonic</li>
          </ul>
        </div>

        <div className="border rounded-lg p-3 bg-background/70 text-xs space-y-2">
          <div className="flex items-center gap-2 font-semibold">
            <ClipboardText size={16} className="text-primary" />
            <span>Follow-up Checks</span>
          </div>
          <p className="text-muted-foreground">Schedule a spaced review card and add a targeted quiz item for next session.</p>
        </div>

        <div className="flex items-center gap-2 justify-center text-xs text-muted-foreground">
          <ArrowsCounterClockwise size={16} className="text-primary" />
          <span>Loop closes when learner passes remediation quiz.</span>
        </div>
      </CardContent>
    </Card>
  );
};
