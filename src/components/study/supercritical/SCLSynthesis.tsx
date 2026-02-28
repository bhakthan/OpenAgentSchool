import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Warning, 
  TrendUp, 
  Lightbulb, 
  Target, 
  CheckCircle,
  ArrowRight,
  Lightning,
  ListChecks,
  Wrench,
  ShieldWarning,
  ChartBar,
  Scales,
  CaretDown,
  CaretUp,
  Question,
  Link as LinkIcon,
} from '@phosphor-icons/react';
import { trackEvent } from '@/lib/analytics/ga';
import type {
  SCLSession as SCLSessionType,
  SCLDeepDive,
  SecondaryFindings,
  TertiaryFindings,
} from '@/types/supercritical';
import { ArrowSquareOut, Play, FilePdf } from '@phosphor-icons/react';
import { toast } from '@/components/ui/use-toast';
import { openExecutiveReport } from './SCLExecutiveReport';

interface SCLSynthesisProps {
  session: SCLSessionType;
}

export function SCLSynthesis({ session }: SCLSynthesisProps) {
  const { synthesis, leaps } = session;
  const hasProductManagement = session.seeds.conceptIds.includes('product-management');
  const deepDives = session.deepDives ?? [];
  const [expandedDive, setExpandedDive] = useState<string | null>(
    deepDives.length > 0 ? deepDives[deepDives.length - 1].id : null
  );

  return (
    <ScrollArea className="h-full">
      <div className="space-y-6">
        {/* Executive Report Banner */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="flex items-center justify-between py-4">
            <div>
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <FilePdf className="h-4 w-4 text-primary" />
                Executive Report
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Generate a professional print-ready report with graphs, KPIs, and visual narrative
              </p>
            </div>
            <Button size="sm" onClick={() => { trackEvent({ action: 'open_executive_report', category: 'scl', label: session.id }); openExecutiveReport(session); }} className="gap-2">
              <FilePdf className="h-4 w-4" />
              Open Report
            </Button>
          </CardContent>
        </Card>

        {/* Leaps Section */}
        {leaps.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendUp className="h-5 w-5 text-destructive" />
                Critical Discontinuities
                <Badge variant="destructive">{leaps.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {leaps.map((leap, index) => (
                <div key={index} className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                  <div className="flex items-start gap-3">
                    <Warning className="h-5 w-5 text-destructive mt-1" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-destructive mb-2">{leap.trigger}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong>Threshold:</strong> {leap.threshold}
                      </p>
                      <p className="text-sm mb-2">{leap.result}</p>
                      <p className="text-xs text-muted-foreground">
                        <strong>Mechanism:</strong> {leap.mechanism}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Risks */}
        {synthesis.risks.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Warning className="h-5 w-5 text-amber-500" />
                Key Risks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {synthesis.risks.map((risk, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                    <span className="text-sm">{risk}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Opportunities */}
        {synthesis.opportunities.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-accent" />
                Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {synthesis.opportunities.map((opportunity, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span className="text-sm">{opportunity}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Recommended Practices */}
        {synthesis.recommendedPractices.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Recommended Practice Changes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {synthesis.recommendedPractices.map((practice, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{practice}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* KPIs */}
        {synthesis.kpis.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-secondary-foreground" />
                Key Performance Indicators
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {synthesis.kpis.map((kpi, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                    <span className="text-sm">{kpi}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Action Plan */}
        {synthesis.actionPlan.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                Implementation Action Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {synthesis.actionPlan.map((action, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center justify-center flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-sm">{action}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        )}

        {/* Product Management Cross-Links */}
        {hasProductManagement && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowSquareOut className="h-5 w-5 text-primary" />
                Product Management Deep Dives
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">Explore focused debugging scenarios to reinforce synthesis insights:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 group">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                  <button
                    onClick={() => {
                      trackEvent({ action: 'launch_debug_challenge', category: 'scl', label: 'product-mgmt-debug-1' });
                      window.dispatchEvent(new CustomEvent('studyMode:launchQuestion', { detail: { qid: 'product-mgmt-debug-1', concept: 'product-management', type: 'debug' }}));
                      toast({ title: 'Opening Debug Challenge', description: 'Trust Calibration Dashboard Drift' });
                    }}
                    className="text-left text-sm font-medium text-primary hover:underline"
                  >
                    Trust Calibration Dashboard Drift
                  </button>
                  <button
                    onClick={() => {
                      trackEvent({ action: 'start_debug_challenge', category: 'scl', label: 'product-mgmt-debug-1' });
                      window.dispatchEvent(new CustomEvent('studyMode:launchQuestion', { detail: { qid: 'product-mgmt-debug-1', concept: 'product-management', type: 'debug' }}));
                      toast({ title: 'Starting Challenge', description: 'Trust Calibration Dashboard Drift' });
                    }}
                    className="ml-auto inline-flex items-center gap-1 text-xs px-2 py-1 rounded border border-primary/40 text-primary hover:bg-primary/10 transition-colors"
                  >
                    <Play className="h-3 w-3" /> Start
                  </button>
                </li>
                <li className="flex items-start gap-2 group">
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                  <button
                    onClick={() => {
                      trackEvent({ action: 'launch_debug_challenge', category: 'scl', label: 'product-mgmt-debug-2' });
                      window.dispatchEvent(new CustomEvent('studyMode:launchQuestion', { detail: { qid: 'product-mgmt-debug-2', concept: 'product-management', type: 'debug' }}));
                      toast({ title: 'Opening Debug Challenge', description: 'Integration ROI Calculator Overstates Value' });
                    }}
                    className="text-left text-sm font-medium text-primary hover:underline"
                  >
                    Integration ROI Calculator Overstates Value
                  </button>
                  <button
                    onClick={() => {
                      trackEvent({ action: 'start_debug_challenge', category: 'scl', label: 'product-mgmt-debug-2' });
                      window.dispatchEvent(new CustomEvent('studyMode:launchQuestion', { detail: { qid: 'product-mgmt-debug-2', concept: 'product-management', type: 'debug' }}));
                      toast({ title: 'Starting Challenge', description: 'Integration ROI Calculator Overstates Value' });
                    }}
                    className="ml-auto inline-flex items-center gap-1 text-xs px-2 py-1 rounded border border-primary/40 text-primary hover:bg-primary/10 transition-colors"
                  >
                    <Play className="h-3 w-3" /> Start
                  </button>
                </li>
              </ul>
              <p className="text-xs text-muted-foreground">These align with detected risk/opportunity patterns (instrumentation integrity, externality-adjusted value modeling). Consider opening the Debug Challenges view and filtering by Product Management.</p>
            </CardContent>
          </Card>
        )}

        {/* ── Deep Dive Findings ────────────────────────────────────────── */}
        {deepDives.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Lightning weight="fill" className="h-5 w-5 text-primary" />
              Deep Dive Findings
              <Badge variant="outline" className="ml-1">{deepDives.length}</Badge>
            </h3>

            {deepDives.map(dive => {
              const isOpen = expandedDive === dive.id;
              return (
                <Card key={dive.id} className="overflow-hidden">
                  {/* Dive header */}
                  <button
                    onClick={() => setExpandedDive(isOpen ? null : dive.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge
                        variant={dive.level === 'tertiary' ? 'secondary' : 'default'}
                        className="capitalize"
                      >
                        {dive.level}
                      </Badge>
                      <span className="text-sm font-medium">
                        {dive.selectedNodes.map(n => n.title).join(' + ')}
                      </span>
                      <Badge variant="outline" className="text-[10px]">
                        {dive.effects.length} sub-effects
                      </Badge>
                      {dive.leaps.length > 0 && (
                        <Badge variant="destructive" className="text-[10px]">
                          {dive.leaps.length} leaps
                        </Badge>
                      )}
                    </div>
                    {isOpen ? (
                      <CaretUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <CaretDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <CardContent className="pt-0 space-y-5 border-t">
                      {dive.userQuestion && (
                        <p className="text-xs text-muted-foreground italic pt-3">
                          <Question weight="bold" className="inline h-3.5 w-3.5 mr-1 -mt-0.5" />
                          Focused on: "{dive.userQuestion}"
                        </p>
                      )}

                      {/* Sub-effects summary */}
                      {dive.effects.length > 0 && (
                        <div className="pt-2">
                          <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                            <Target className="h-4 w-4 text-primary" /> Sub-Effects
                          </h4>
                          <div className="grid gap-2">
                            {dive.effects.map(eff => (
                              <div
                                key={eff.id}
                                className="flex items-start gap-2 p-2 rounded border border-border/50 bg-muted/20"
                              >
                                <Badge variant="outline" className="text-[10px] mt-0.5 flex-shrink-0">
                                  {eff.domain}
                                </Badge>
                                <div className="flex-1 min-w-0">
                                  <span className="text-sm font-medium">{eff.title}</span>
                                  <p className="text-xs text-muted-foreground mt-0.5">
                                    {eff.justification}
                                  </p>
                                </div>
                                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                                  Impact {eff.impact > 0 ? '+' : ''}{eff.impact}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* New leaps at this level */}
                      {dive.leaps.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5 text-destructive">
                            <Warning className="h-4 w-4" /> New Discontinuities
                          </h4>
                          {dive.leaps.map((l, i) => (
                            <div key={i} className="p-3 border border-destructive/20 rounded-lg bg-destructive/5 mb-2">
                              <span className="font-medium text-sm text-destructive">{l.trigger}</span>
                              <p className="text-xs text-muted-foreground mt-1">
                                Threshold: {l.threshold} → {l.result}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* ── Secondary Findings ────────────────────────────── */}
                      {dive.findings.kind === 'secondary' && (() => {
                        const f = dive.findings as SecondaryFindings;
                        return (
                          <div className="space-y-4">
                            {f.hiddenRisks.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium mb-1.5 flex items-center gap-1.5">
                                  <ShieldWarning className="h-4 w-4 text-amber-500" /> Hidden Risks
                                </h4>
                                <ul className="space-y-1">
                                  {f.hiddenRisks.map((r, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm">
                                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                                      {r}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {f.crossConnections.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium mb-1.5 flex items-center gap-1.5">
                                  <LinkIcon className="h-4 w-4 text-primary" /> Cross-Connections
                                </h4>
                                <ul className="space-y-1">
                                  {f.crossConnections.map((c, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm">
                                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                      {c}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {f.implementationSteps.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium mb-1.5 flex items-center gap-1.5">
                                  <ListChecks className="h-4 w-4 text-primary" /> Implementation Steps
                                </h4>
                                <ol className="space-y-1.5">
                                  {f.implementationSteps.map((s, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm">
                                      <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-medium flex items-center justify-center flex-shrink-0 mt-0.5">
                                        {i + 1}
                                      </div>
                                      {s}
                                    </li>
                                  ))}
                                </ol>
                              </div>
                            )}

                            {f.revisedKPIs.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium mb-1.5 flex items-center gap-1.5">
                                  <ChartBar className="h-4 w-4 text-secondary-foreground" /> Revised KPIs
                                </h4>
                                <ul className="space-y-1">
                                  {f.revisedKPIs.map((k, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm">
                                      <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                                      {k}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {f.openQuestions.length > 0 && (
                              <div className="bg-muted/30 rounded-lg p-3">
                                <h4 className="text-sm font-medium mb-1.5 flex items-center gap-1.5">
                                  <Question className="h-4 w-4 text-muted-foreground" /> Open Questions (for tertiary dive)
                                </h4>
                                <ul className="space-y-1">
                                  {f.openQuestions.map((q, i) => (
                                    <li key={i} className="text-sm text-muted-foreground italic">
                                      {q}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        );
                      })()}

                      {/* ── Tertiary Findings ─────────────────────────────── */}
                      {dive.findings.kind === 'tertiary' && (() => {
                        const f = dive.findings as TertiaryFindings;
                        return (
                          <div className="space-y-5">
                            {/* Runbook */}
                            {f.runbook.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                                  <ListChecks className="h-4 w-4 text-primary" /> Operational Runbook
                                </h4>
                                <ol className="space-y-2">
                                  {f.runbook.map((step, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm">
                                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center justify-center flex-shrink-0 mt-0.5">
                                        {i + 1}
                                      </div>
                                      {step}
                                    </li>
                                  ))}
                                </ol>
                              </div>
                            )}

                            {/* Tool Recommendations */}
                            {f.toolRecommendations.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                                  <Wrench className="h-4 w-4 text-primary" /> Tool Recommendations
                                </h4>
                                <div className="grid gap-2">
                                  {f.toolRecommendations.map((rec, i) => (
                                    <div key={i} className="p-3 border border-border rounded-lg">
                                      <span className="font-medium text-sm">{rec.tool}</span>
                                      <p className="text-xs text-muted-foreground mt-0.5">{rec.purpose}</p>
                                      <p className="text-xs text-muted-foreground mt-0.5 italic">
                                        Tradeoffs: {rec.tradeoffs}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* FMEA Table */}
                            {f.fmeaEntries.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                                  <ShieldWarning className="h-4 w-4 text-destructive" /> Failure Mode Analysis (FMEA)
                                </h4>
                                <div className="border border-border rounded-lg overflow-x-auto">
                                  <table className="w-full text-xs">
                                    <thead>
                                      <tr className="bg-muted/50 text-muted-foreground">
                                        <th className="text-left p-2 font-medium">Failure Mode</th>
                                        <th className="text-left p-2 font-medium">Cause</th>
                                        <th className="text-center p-2 font-medium">S</th>
                                        <th className="text-center p-2 font-medium">L</th>
                                        <th className="text-center p-2 font-medium">D</th>
                                        <th className="text-center p-2 font-medium">RPN</th>
                                        <th className="text-left p-2 font-medium">Mitigation</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {f.fmeaEntries.map((entry, i) => {
                                        const rpnClass =
                                          entry.rpn >= 200 ? 'text-destructive font-bold' :
                                          entry.rpn >= 100 ? 'text-amber-600 font-semibold' :
                                          'text-emerald-600';
                                        return (
                                          <tr key={i} className="border-t border-border/50">
                                            <td className="p-2 font-medium">{entry.failureMode}</td>
                                            <td className="p-2 text-muted-foreground">{entry.cause}</td>
                                            <td className="p-2 text-center">{entry.severity}</td>
                                            <td className="p-2 text-center">{entry.likelihood}</td>
                                            <td className="p-2 text-center">{entry.detection}</td>
                                            <td className={`p-2 text-center ${rpnClass}`}>{entry.rpn}</td>
                                            <td className="p-2 text-muted-foreground">{entry.mitigation}</td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </div>
                                <p className="text-[10px] text-muted-foreground mt-1">
                                  S = Severity, L = Likelihood, D = Detection difficulty (1-10). RPN = S × L × D.
                                  Higher RPN = higher priority.
                                </p>
                              </div>
                            )}

                            {/* Quantitative Projections */}
                            {f.projections.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                                  <ChartBar className="h-4 w-4 text-primary" /> Quantitative Projections
                                </h4>
                                <div className="border border-border rounded-lg overflow-x-auto">
                                  <table className="w-full text-xs">
                                    <thead>
                                      <tr className="bg-muted/50 text-muted-foreground">
                                        <th className="text-left p-2 font-medium">Metric</th>
                                        <th className="text-left p-2 font-medium">Baseline</th>
                                        <th className="text-left p-2 font-medium">Projected</th>
                                        <th className="text-left p-2 font-medium">Timeframe</th>
                                        <th className="text-center p-2 font-medium">Confidence</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {f.projections.map((proj, i) => (
                                        <tr key={i} className="border-t border-border/50">
                                          <td className="p-2 font-medium">{proj.metric}</td>
                                          <td className="p-2 text-muted-foreground">{proj.baseline}</td>
                                          <td className="p-2">{proj.projected}</td>
                                          <td className="p-2 text-muted-foreground">{proj.timeframe}</td>
                                          <td className="p-2 text-center">
                                            <Badge
                                              variant={proj.confidence >= 0.7 ? 'default' : proj.confidence >= 0.4 ? 'secondary' : 'outline'}
                                              className="text-[10px]"
                                            >
                                              {Math.round(proj.confidence * 100)}%
                                            </Badge>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}

                            {/* Mitigation Comparison */}
                            {f.mitigationComparison.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                                  <Scales className="h-4 w-4 text-primary" /> Mitigation Strategy Comparison
                                </h4>
                                <div className="grid gap-3 md:grid-cols-2">
                                  {f.mitigationComparison.map((m, i) => {
                                    const effortColor =
                                      m.effort === 'high' ? 'text-red-500' :
                                      m.effort === 'medium' ? 'text-amber-500' :
                                      'text-emerald-500';
                                    const impactColor =
                                      m.impact === 'high' ? 'text-emerald-600' :
                                      m.impact === 'medium' ? 'text-amber-500' :
                                      'text-red-500';
                                    return (
                                      <div key={i} className="p-3 border border-border rounded-lg space-y-1">
                                        <span className="font-medium text-sm">{m.strategy}</span>
                                        <div className="flex items-center gap-3 text-xs">
                                          <span>
                                            Effort: <strong className={effortColor}>{m.effort}</strong>
                                          </span>
                                          <span>
                                            Impact: <strong className={impactColor}>{m.impact}</strong>
                                          </span>
                                          <span className="text-muted-foreground">
                                            Time to value: {m.timeToValue}
                                          </span>
                                        </div>
                                        {m.risks && (
                                          <p className="text-xs text-muted-foreground italic">
                                            Risks: {m.risks}
                                          </p>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        )}

        {/* Placeholder when no synthesis */}
        {Object.values(synthesis).every(arr => arr.length === 0) && deepDives.length === 0 && (
          <Card>
            <CardContent className="py-12">
              <div className="text-center text-muted-foreground">
                <Lightbulb className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">Synthesis Placeholder</p>
                <p className="text-sm">
                  AI-generated insights, risks, opportunities, and action plans will appear here
                  after the effect graph is analyzed.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ScrollArea>
  );
}

export default SCLSynthesis;
