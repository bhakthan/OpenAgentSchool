import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, DownloadSimple } from '@phosphor-icons/react';

/**
 * Data & Knowledge Operations: building durable supply chains for agent intelligence.
 */
export default function DataKnowledgeOperationsConcept() {
  return (
    <div className="space-y-6">
      <Card className="border border-border/50 bg-background/60 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Data &amp; Knowledge Operations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed">
          <p>
            Engineer the pipelines that feed agents trustworthy context. Combine curation, evaluation, and knowledge
            stewardship so insights remain accurate as the business evolves.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Supply Chain Design:</strong> sourcing, labeling, synthetic augmentation, and retention policies.</li>
            <li><strong>Evaluation Suites:</strong> maintain golden datasets, adversarial probes, and continuous regression tests.</li>
            <li><strong>Knowledge Governance:</strong> establish taxonomy ownership, content SLAs, and versioning rules.</li>
            <li><strong>Operational Telemetry:</strong> monitor freshness, coverage, and remediation throughput.</li>
          </ul>
          <p className="text-muted-foreground text-xs flex items-start gap-2">
            <BookOpen size={14} className="mt-0.5 text-primary" />
            <span>
              Pair with the dual-mode data strategy visualization for interactive walkthroughs.
            </span>
          </p>
          <div className="pt-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <a href="/toolkits/knowledge-ops-runbook.md" download="knowledge-ops-runbook.md">
                <DownloadSimple size={16} />
                <span>Download Knowledge Ops Runbook</span>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
