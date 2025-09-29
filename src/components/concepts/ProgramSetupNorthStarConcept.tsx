import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Compass, Gauge, Users, Target } from '@phosphor-icons/react';
import ToolkitDownloadButtons from './ToolkitDownloadButtons';

/**
 * Program Setup & North Star: mission, metrics, and maturity framing for AI agent initiatives.
 */

const NorthStarCanvasPreview = () => (
  <Card className="border border-dashed border-border/60 bg-muted/40">
    <CardHeader>
      <CardTitle className="text-lg font-semibold flex items-center gap-2">
        <Compass className="w-5 h-5 text-primary" />
        North Star Alignment Canvas Preview
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div className="rounded-xl border bg-background p-4 shadow-sm">
          <div className="flex items-center gap-3 text-foreground font-semibold">
            <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center text-rose-600 dark:text-rose-300">
              <Target className="w-5 h-5" />
            </div>
            Mission Narrative
          </div>
          <p className="mt-2 text-muted-foreground">
            One-sentence promise, guardrails, and learner impact so every team sees the same north.
          </p>
        </div>
        <div className="rounded-xl border bg-background p-4 shadow-sm">
          <div className="flex items-center gap-3 text-foreground font-semibold">
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-600 dark:text-amber-300">
              <Gauge className="w-5 h-5" />
            </div>
            Success Metrics
          </div>
          <p className="mt-2 text-muted-foreground">
            Pair value KPIs (retention, revenue) with responsibility KPIs (safety incidents, review cadence).
          </p>
        </div>
        <div className="rounded-xl border bg-background p-4 shadow-sm">
          <div className="flex items-center gap-3 text-foreground font-semibold">
            <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center text-cyan-600 dark:text-cyan-300">
              <Users className="w-5 h-5" />
            </div>
            Stakeholder Alignment
          </div>
          <p className="mt-2 text-muted-foreground">
            Map sponsors, decision rights, and rituals to keep approvals flowing.
          </p>
        </div>
        <div className="rounded-xl border bg-background p-4 shadow-sm">
          <div className="flex items-center gap-3 text-foreground font-semibold">
            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-300">
              <BookOpen className="w-5 h-5" />
            </div>
            Maturity Baseline
          </div>
          <p className="mt-2 text-muted-foreground">
            Score people, process, platform readiness; highlight red zones that need sequencing.
          </p>
        </div>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Tip: Print the canvas at poster size for workshops, then sync updates back into the Excel export.
      </p>
    </CardContent>
  </Card>
)

export default function ProgramSetupNorthStarConcept() {
  return (
    <div className="space-y-6">
      <NorthStarCanvasPreview />

      <Card className="border border-border/50 bg-background/60 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Program Setup &amp; North Star</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed">
          <p>
            Anchor your agent program before shipping a single workflow. Establish a crisp vision, define measurable
            outcomes, and agree on the maturity runway so teams understand both the destination and the first milestone.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Mission Narrative:</strong> articulate user impact, strategic guardrails, and the organizational bet.</li>
            <li><strong>Success Metrics:</strong> pair value metrics (retention, revenue lift) with responsibility metrics (safety incidents, review velocity).</li>
            <li><strong>Maturity Baseline:</strong> score people, process, and platform readiness to spotlight capability gaps.</li>
            <li><strong>Stakeholder Alignment:</strong> clarify sponsorship, decision rights, and cadence for reviewing progress.</li>
          </ul>
          <p className="text-muted-foreground text-xs flex items-start gap-2">
            <BookOpen size={14} className="mt-0.5 text-primary" />
            <span>
              Use the North Star canvas export to run kickoff workshops and keep the charter visible across teams.
            </span>
          </p>
          <div className="pt-2">
            <ToolkitDownloadButtons
              baseName="north-star-alignment-canvas"
              markdownLabel="Download North Star Alignment Canvas"
              excelLabel="Download North Star Alignment (Excel)"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
