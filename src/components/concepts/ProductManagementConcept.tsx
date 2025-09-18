import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

/**
 * Product Management Concept (elevated from skills module to core concept)
 * Focus: confidence calibration, experiment framing, metric hygiene, stakeholder alignment.
 */
export default function ProductManagementConcept() {
  return (
    <div className="space-y-6">
      <Card className="border border-border/50 bg-background/60 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">AI Product Management Core</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed">
          <p>
            Build AI products that earn sustainable trust and deliver measurable value. This concept threads together
            confidence calibration, outcome metrics, experiment design, and roadmap iteration so teams avoid vanity
            launches and brittle feature debt.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Confidence Calibration:</strong> Align displayed confidence with empirically measured accuracy & reliability.</li>
            <li><strong>Metric Architecture:</strong> North-star + guardrails + diagnostic layers to prevent tunnel vision.</li>
            <li><strong>Experimentation Loop:</strong> Hypothesis → instrument → analyze → decision → learning capture.</li>
            <li><strong>Stakeholder Alignment:</strong> Translate uncertainty into staged bets & risk-adjusted pacing.</li>
            <li><strong>Trust Signals:</strong> Design explanations & UX affordances that prevent overconfidence cascades.</li>
          </ul>
          <p className="text-muted-foreground text-xs">
            You&apos;ll reference this concept whenever scenarios surface retention drops, trust erosion, or misaligned
            confidence signals (see Confidence Calibration Crisis scenario).
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
