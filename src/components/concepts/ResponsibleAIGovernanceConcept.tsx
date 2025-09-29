import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ShieldCheck, FlowArrow, ClipboardText, ArrowRight } from '@phosphor-icons/react';
import ToolkitDownloadButtons from './ToolkitDownloadButtons';

/**
 * Responsible AI Governance Playbooks: operationalizing policies, controls, and risk reviews.
 */

const GovernanceSwimlaneVisual = () => {
  const chipStyles: Record<string, string> = {
    indigo: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300',
    emerald: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300',
    amber: 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-300',
    rose: 'bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-300'
  };

  const columns = [
    {
      title: 'Policy',
      icon: BookOpen,
      color: 'indigo',
      steps: ['Risk taxonomy', 'Mandated controls', 'Escalation triggers']
    },
    {
      title: 'Controls',
      icon: FlowArrow,
      color: 'emerald',
      steps: ['Gated workflows', 'Automated checks', 'Separation of duties']
    },
    {
      title: 'Evidence',
      icon: ClipboardText,
      color: 'amber',
      steps: ['Logs + model cards', 'Decision rationales', 'Sign-off ledger']
    },
    {
      title: 'Escalation',
      icon: ArrowRight,
      color: 'rose',
      steps: ['Triage playbooks', 'Board reporting', 'Audit response']
    }
  ];

  return (
    <Card className="border border-dashed border-border/60 bg-muted/40">
    <CardHeader>
      <CardTitle className="text-lg font-semibold flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-primary" />
        Policy-to-Production Swimlane
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid md:grid-cols-4 gap-3 text-sm">
          {columns.map((column) => {
            const Icon = column.icon;
            const chipClass = chipStyles[column.color];

            return (
              <div key={column.title} className="rounded-xl border bg-card p-4 shadow-sm h-full">
                <div className="flex items-center gap-3 font-semibold text-foreground">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${chipClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {column.title}
                </div>
                <ul className="mt-3 space-y-2 text-muted-foreground">
                  {column.steps.map((step) => (
                    <li key={step} className="flex items-start gap-2">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
      </div>
      <p className="mt-4 text-xs text-muted-foreground flex items-center gap-2">
        <FlowArrow className="w-4 h-4 text-primary" />
        Every launch review should trace a policy clause through its control, evidence trail, and escalation path—if the chain breaks, create a backlog fix before shipping.
      </p>
    </CardContent>
    </Card>
  );
};

export default function ResponsibleAIGovernanceConcept() {
  return (
    <div className="space-y-6">
      <GovernanceSwimlaneVisual />

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
            <ToolkitDownloadButtons
              baseName="responsible-ai-governance-playbook"
              markdownLabel="Download Responsible AI Governance Playbook"
              excelLabel="Download Responsible AI Governance (Excel)"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
