import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, DownloadSimple } from '@phosphor-icons/react';

/**
 * Organizational Enablement: operating models, talent strategy, and incentives.
 */
export default function OrganizationalEnablementConcept() {
  return (
    <div className="space-y-6">
      <Card className="border border-border/50 bg-background/60 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Organizational Enablement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed">
          <p>
            Design the human systems that sustain agent programs. Align governance councils, Center of Excellence
            structures, and talent development so adoption sticks across functions.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Operating Model Choices:</strong> centralized vs. federated teams, funding patterns, and accountability.</li>
            <li><strong>Capability Building:</strong> role-based learning pathways, mentoring, and certification ladders.</li>
            <li><strong>Performance &amp; Incentives:</strong> align KPIs with responsible usage, innovation velocity, and customer outcomes.</li>
            <li><strong>Change Management:</strong> communication rhythms, champion networks, and adoption dashboards.</li>
          </ul>
          <p className="text-muted-foreground text-xs flex items-start gap-2">
            <BookOpen size={14} className="mt-0.5 text-primary" />
            <span>
              Download the operating model playbook to facilitate executive alignment workshops.
            </span>
          </p>
          <div className="pt-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <a href="/toolkits/enablement-roadmap-canvas.md" download="enablement-roadmap-canvas.md">
                <DownloadSimple size={16} />
                <span>Download Enablement Roadmap Canvas</span>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
