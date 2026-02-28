import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, BugBeetle, FlagCheckered, Sword, ClipboardText, Warning, CheckCircle } from "@phosphor-icons/react"
import MiniFlowMap from './visuals/MiniFlowMap'
import { trackEvent } from '@/lib/analytics/ga'

interface Props {
  onNavigate: () => void
}

export default function SafetyRiskGovernance({ onNavigate }: Props) {
  return (
    <div className="space-y-6">
      <Card className="bg-muted text-foreground border">
        <CardHeader>
          <CardTitle className="text-xl">Safety, Risk & Governance</CardTitle>
          <CardDescription className="text-base">
            Red teaming, jailbreak resilience, content policies, approvals & auditability
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Practices */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <CardTitle>Practices</CardTitle>
          </div>
          <CardDescription>Safety-by-design with measurable controls</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="md:col-span-2">
            <MiniFlowMap
              title="Guardrails lifecycle"
              steps={[
                'Threat Modeling',
                'Red Team Suite',
                'Policy Tuning',
                'Approvals',
                'Monitoring',
                'Post‑Incident Learn'
              ]}
              highlightIndices={[1, 2, 4]}
            />
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 font-semibold mb-1"><Sword className="w-4 h-4"/> Red Teaming</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Attack library: jailbreaks, injections, data exfil, prompt leaks</li>
              <li>Schedule continuous adversarial tests per release</li>
              <li>Prioritize mitigations by impact × likelihood</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 font-semibold mb-1"><ClipboardText className="w-4 h-4"/> Policies & Controls</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Content policy templates; role-based tool access</li>
              <li>PII masking, secrets redaction, output schema validation</li>
              <li>Human-in-the-loop for high-risk actions</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 font-semibold mb-1"><FlagCheckered className="w-4 h-4"/> Approvals & Audit</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Two-person review for sensitive prompt changes</li>
              <li>Immutable audit logs of prompts, tools, and outputs</li>
              <li>Exception flows with expiry and review</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 font-semibold mb-1"><BugBeetle className="w-4 h-4"/> Monitoring & Response</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Real-time violation alerts; auto-disable risky tools</li>
              <li>Playbooks for containment, comms, and recovery</li>
              <li>Post-incident learning integrated into policies</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Studio Lab */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FlagCheckered className="w-5 h-5" />
            <CardTitle>Studio Lab: Adversarial Test Suite</CardTitle>
          </div>
          <CardDescription>Build a red-team suite and tune policies until violations drop</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <ol className="list-decimal pl-5 space-y-1">
            <li>Assemble test cases: jailbreaks, injection, exfil, misinformation</li>
            <li>Run against current prompts/tools with safety logs enabled</li>
            <li>Tighten policies and schemas; add refusal messaging</li>
            <li>Re-run until violation rate is under target</li>
            <li>Automate in CI; block deployments on regression</li>
          </ol>
          <div className="mt-3">
            <MiniFlowMap
              title="Policy pipeline detail"
              steps={['Test Case', 'Detect', 'Refuse/Filter', 'Log', 'Tune', 'Approve']}
              highlightIndices={[1, 2, 4]}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 border rounded-lg">
              <div className="font-semibold">Success criteria</div>
              <ul className="list-disc pl-5 text-muted-foreground">
                <li>≥ 90–95% reduction in known violation patterns</li>
                <li>No critical policy bypasses in the suite</li>
              </ul>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold">Edge cases</div>
              <ul className="list-disc pl-5 text-muted-foreground">
                <li>Multi-turn probes that reset system prompts</li>
                <li>Tool side effects not captured by content filters</li>
              </ul>
            </div>
          </div>
          <div className="mt-3">
            <MiniFlowMap
              title="Incident response loop"
              steps={['Detect', 'Contain', 'Communicate', 'Eradicate', 'Recover', 'Learn']}
              highlightIndices={[0, 1, 5]}
            />
          </div>
        </CardContent>
      </Card>

      {/* KPIs & Anti‑patterns */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <CardTitle>KPIs and Anti‑patterns</CardTitle>
          </div>
          <CardDescription>Reduce risk without crushing usefulness</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 border rounded-lg">
            <div className="font-semibold mb-2">KPIs</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Policy violation rate (per 1k interactions)</li>
              <li>Mean time to detection and response (MTTD/MTTR)</li>
              <li>False positive rate of guardrails</li>
              <li>Approval lead time for high-risk changes</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 font-semibold mb-2"><Warning className="w-4 h-4 text-yellow-700"/> Anti‑patterns</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>One-off red teams; no regression suite</li>
              <li>Over-blocking policies that nuke usefulness</li>
              <li>Hidden manual overrides without audit</li>
              <li>Ignoring tool risks; focusing only on text filters</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Button variant="secondary" className="w-full" size="lg"
            onClick={() => { trackEvent({ action: 'micro_assessment', category: 'ai_skills', label: 'safety-risk-governance' }); window.location.assign('/study-mode?concept=safety-risk-governance&type=socratic'); }}
            aria-label="Start micro-assessment for Safety, Risk & Governance">
            Micro‑assessment
          </Button>
          <Button variant="outline" className="w-full" size="lg"
            onClick={() => { trackEvent({ action: 'try_scenario', category: 'ai_skills', label: 'safety-risk-governance' }); window.location.assign('/study-mode?concept=safety-risk-governance&type=scenario'); }}
            aria-label="Try a scenario for Safety, Risk & Governance">
            Try Scenario
          </Button>
          <Button className="w-full" size="lg" onClick={() => { trackEvent({ action: 'navigate_next', category: 'ai_skills', label: 'safety-risk-governance' }); onNavigate(); }}>
            Next: Cross-Team Collaboration
          </Button>
        </div>
      </div>
    </div>
  )
}
