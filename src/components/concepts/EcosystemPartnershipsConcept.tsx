import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, DownloadSimple } from '@phosphor-icons/react';

/**
 * Ecosystem & Partnerships: evaluating vendors and collaborating with the community.
 */
export default function EcosystemPartnershipsConcept() {
  return (
    <div className="space-y-6">
      <Card className="border border-border/50 bg-background/60 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Ecosystem &amp; Partnerships</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed">
          <p>
            Scale faster by partnering wisely. Assess third-party tools, open-source projects, and community alliances
            with a clear view of risk, interoperability, and shared value.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Partner Evaluation:</strong> score offerings on reliability, governance posture, and roadmap alignment.</li>
            <li><strong>Integration Contracts:</strong> define SLAs, escalation paths, and data-sharing agreements upfront.</li>
            <li><strong>Community Strategy:</strong> contribute fixes, publish learnings, and host showcases to build trust.</li>
            <li><strong>Interoperability Standards:</strong> adopt schemas and APIs that keep the ecosystem modular.</li>
          </ul>
          <p className="text-muted-foreground text-xs flex items-start gap-2">
            <BookOpen size={14} className="mt-0.5 text-primary" />
            <span>
              Use the ecosystem radar export to visualize coverage and partner health.
            </span>
          </p>
          <div className="pt-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <a href="/toolkits/partnership-evaluation-canvas.md" download="partnership-evaluation-canvas.md">
                <DownloadSimple size={16} />
                <span>Download Partnership Evaluation Canvas</span>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
