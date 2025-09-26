import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, DownloadSimple } from '@phosphor-icons/react';

/**
 * Program Setup & North Star: mission, metrics, and maturity framing for AI agent initiatives.
 */
export default function ProgramSetupNorthStarConcept() {
  return (
    <div className="space-y-6">
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
            <Button
              asChild
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <a href="/toolkits/north-star-alignment-canvas.md" download="north-star-alignment-canvas.md">
                <DownloadSimple size={16} />
                <span>Download North Star Alignment Canvas</span>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
