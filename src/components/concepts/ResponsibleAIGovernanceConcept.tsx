import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, DownloadSimple } from '@phosphor-icons/react';

/**
 * Responsible AI Governance Playbooks: operationalizing policies, controls, and risk reviews.
 */
export default function ResponsibleAIGovernanceConcept() {
  return (
    <div className="space-y-6">
      <Card className="border border-border/50 bg-background/60 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Responsible AI Governance Playbooks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed">
          <p>
            Move beyond static principles by wiring governance directly into agent delivery. Codify policy controls,
            escalation paths, and audit evidence so compliance is a daily habit, not a yearly scramble.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Risk Taxonomy:</strong> categorize harms (safety, security, fairness, privacy) with severity and mitigations.</li>
            <li><strong>Policy-to-Action Mapping:</strong> translate policies into gated workflows, required approvals, and automated checks.</li>
            <li><strong>Review Rituals:</strong> run pre-launch model cards, ongoing drift reviews, and quarterly board readouts.</li>
            <li><strong>Evidence Library:</strong> capture logs, decision rationales, and sign-offs for audits and retros.</li>
          </ul>
          <p className="text-muted-foreground text-xs flex items-start gap-2">
            <BookOpen size={14} className="mt-0.5 text-primary" />
            <span>
              Pair this module with Study Mode’s governance scenarios to practice real escalation decisions.
            </span>
          </p>
          <div className="pt-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <a href="/toolkits/responsible-ai-governance-playbook.md" download="responsible-ai-governance-playbook.md">
                <DownloadSimple size={16} />
                <span>Download Responsible AI Governance Playbook</span>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
