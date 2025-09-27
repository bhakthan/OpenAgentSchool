import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from '@phosphor-icons/react';
import ToolkitDownloadButtons from './ToolkitDownloadButtons';

/**
 * Architecture & Platform Operations: scaling agent platforms responsibly.
 */
export default function ArchitecturePlatformOperationsConcept() {
  return (
    <div className="space-y-6">
      <Card className="border border-border/50 bg-background/60 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Architecture &amp; Platform Operations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed">
          <p>
            Build a platform backbone that keeps advanced agent workloads reliable. Define reference architectures,
            shared services, and operating rhythms that accelerate delivery without sacrificing control.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Reference Blueprints:</strong> patterns for prototype, production, and regulated deployments.</li>
            <li><strong>Platform Services:</strong> model registry, capability catalogues, observability stack, and integration gateways.</li>
            <li><strong>Operational Runbooks:</strong> deployment checklists, incident response flows, disaster recovery simulations.</li>
            <li><strong>Guardrail Automation:</strong> policy enforcement, quota management, and cost controls as code.</li>
          </ul>
          <p className="text-muted-foreground text-xs flex items-start gap-2">
            <BookOpen size={14} className="mt-0.5 text-primary" />
            <span>
              Link to Agent Ops content for golden signals that keep the platform healthy.
            </span>
          </p>
          <div className="pt-2">
            <ToolkitDownloadButtons
              baseName="platform-operating-model"
              markdownLabel="Download Platform Operating Model Canvas"
              excelLabel="Download Platform Operating Model (Excel)"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
