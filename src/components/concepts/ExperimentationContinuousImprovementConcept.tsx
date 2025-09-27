import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from '@phosphor-icons/react';
import ToolkitDownloadButtons from './ToolkitDownloadButtons';

/**
 * Experimentation & Continuous Improvement: running evaluation loops post-launch.
 */
export default function ExperimentationContinuousImprovementConcept() {
  return (
    <div className="space-y-6">
      <Card className="border border-border/50 bg-background/60 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Experimentation &amp; Continuous Improvement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed">
          <p>
            Close the loop after release. Stand up experimentation infrastructure, codify hypotheses, and translate
            telemetry into iteration plans that keep agents sharp.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Experiment Toolkit:</strong> offline eval harnesses, A/B ramps, and sequential testing guidance.</li>
            <li><strong>Hypothesis Backlog:</strong> log ideas with expected lift, targeted user segments, and success metrics.</li>
            <li><strong>Feedback Intake:</strong> collect qualitative signals from reviewers, support, and opt-in users.</li>
            <li><strong>Regression Defense:</strong> guard-bands, champion/challenger pipelines, and automated rollback triggers.</li>
          </ul>
          <p className="text-muted-foreground text-xs flex items-start gap-2">
            <BookOpen size={14} className="mt-0.5 text-primary" />
            <span>
              Combine with Super Critical Learning telemetry to detect mastery gaps worth experimenting on.
            </span>
          </p>
          <div className="pt-2">
            <ToolkitDownloadButtons
              baseName="continuous-improvement-flywheel"
              markdownLabel="Download Continuous Improvement Flywheel"
              excelLabel="Download Continuous Improvement (Excel)"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
