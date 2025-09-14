import React from 'react';
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
  ArrowRight
} from '@phosphor-icons/react';
import type { SCLSession as SCLSessionType } from '@/types/supercritical';
import { ArrowSquareOut, Play } from '@phosphor-icons/react';
import { toast } from '@/components/ui/use-toast';

interface SCLSynthesisProps {
  session: SCLSessionType;
}

export function SCLSynthesis({ session }: SCLSynthesisProps) {
  const { synthesis, leaps } = session;
  const hasProductManagement = session.seeds.conceptIds.includes('product-management');

  return (
    <ScrollArea className="h-full">
      <div className="space-y-6">
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
                      window.dispatchEvent(new CustomEvent('studyMode:launchQuestion', { detail: { qid: 'product-mgmt-debug-1', concept: 'product-management', type: 'debug' }}));
                      toast({ title: 'Opening Debug Challenge', description: 'Trust Calibration Dashboard Drift' });
                    }}
                    className="text-left text-sm font-medium text-primary hover:underline"
                  >
                    Trust Calibration Dashboard Drift
                  </button>
                  <button
                    onClick={() => {
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
                      window.dispatchEvent(new CustomEvent('studyMode:launchQuestion', { detail: { qid: 'product-mgmt-debug-2', concept: 'product-management', type: 'debug' }}));
                      toast({ title: 'Opening Debug Challenge', description: 'Integration ROI Calculator Overstates Value' });
                    }}
                    className="text-left text-sm font-medium text-primary hover:underline"
                  >
                    Integration ROI Calculator Overstates Value
                  </button>
                  <button
                    onClick={() => {
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

        {/* Placeholder when no synthesis */}
        {Object.values(synthesis).every(arr => arr.length === 0) && (
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
