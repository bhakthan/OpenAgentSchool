import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, DownloadSimple } from '@phosphor-icons/react';

/**
 * Strategy & Portfolio Management: prioritizing and sequencing agent initiatives.
 */
export default function StrategyPortfolioManagementConcept() {
  return (
    <div className="space-y-6">
      <Card className="border border-border/50 bg-background/60 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Strategy &amp; Portfolio Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed">
          <p>
            Treat agent capabilities like a product portfolio. Evaluate opportunities, model ROI, and create a living
            roadmap so the most valuable, feasible initiatives ship first.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Intake Framework:</strong> score ideas across value, feasibility, risk, and strategic alignment.</li>
            <li><strong>Business Case Lab:</strong> build lean canvases with cost-to-value ratios, success metrics, and dependencies.</li>
            <li><strong>Portfolio Cadence:</strong> revisit priorities quarterly, balancing experimentation with scale investments.</li>
            <li><strong>Kill Switches:</strong> define criteria to pause or retire efforts when learning plateaus or risk spikes.</li>
          </ul>
          <p className="text-muted-foreground text-xs flex items-start gap-2">
            <BookOpen size={14} className="mt-0.5 text-primary" />
            <span>
              Export the prioritization matrix to drive cross-functional planning sessions.
            </span>
          </p>
          <div className="pt-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <a href="/toolkits/portfolio-balance-canvas.md" download="portfolio-balance-canvas.md">
                <DownloadSimple size={16} />
                <span>Download Portfolio Balance Canvas</span>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
