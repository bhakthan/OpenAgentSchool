import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Key, Lock, Warning, CheckCircle } from "@phosphor-icons/react"
import MiniFlowMap from './visuals/MiniFlowMap'
import { trackEvent } from '@/lib/analytics/ga'

interface Props {
  onNavigate: () => void
}

export default function SecurityDataBoundaries({ onNavigate }: Props) {
  return (
    <div className="space-y-6">
      <Card className="bg-muted text-foreground border">
        <CardHeader>
          <CardTitle className="text-xl">Security & Data Boundaries</CardTitle>
          <CardDescription className="text-base">
            Protect data, isolate tenants, and secure tools & agents
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Practices */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" />
            <CardTitle>Practices</CardTitle>
          </div>
          <CardDescription>Zero trust for LLMs and tools</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="md:col-span-2">
            <MiniFlowMap
              title="Tenant‑isolated data flow"
              steps={['Auth (Tenant)', 'Scoped Token', 'Isolated Index', 'Retrieval Filter', 'Tool Egress Check', 'Audit Log']}
              highlightIndices={[0, 2, 3, 5]}
            />
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold mb-1">Identity & Access</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Per-tenant identities and OBO tokens</li>
              <li>Fine-grained tool permissions & scopes</li>
              <li>Just-in-time access with expiry</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold mb-1">Data Isolation</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Hard tenant boundaries in vector stores</li>
              <li>PII detection, masking, and tokenization</li>
              <li>Egress controls; allowlists for external calls</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold mb-1">Secrets & Keys</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Vault-managed secrets; short-lived creds</li>
              <li>Never expose secrets to LLM context</li>
              <li>Rotate keys; monitor suspicious usage</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold mb-1">Tool Sandboxing</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Network and filesystem sandboxes</li>
              <li>Resource quotas; rate limits per tool</li>
              <li>Signed tools; provenance and SBOM</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Studio Lab */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            <CardTitle>Studio Lab: Tenant-Isolated RAG</CardTitle>
          </div>
          <CardDescription>Enforce tenant isolation and scoped retrieval</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <ol className="list-decimal pl-5 space-y-1">
            <li>Create per-tenant collections with enforced filters</li>
            <li>Implement OBO tokens; propagate identity to tools</li>
            <li>Block cross-tenant retrieval; add policy tests</li>
            <li>Audit logs for access and egress</li>
          </ol>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 border rounded-lg">
              <div className="font-semibold">Success criteria</div>
              <ul className="list-disc pl-5 text-muted-foreground">
                <li>Zero cross-tenant retrieval events</li>
                <li>All tool calls tagged with tenant identity</li>
              </ul>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold">Edge cases</div>
              <ul className="list-disc pl-5 text-muted-foreground">
                <li>Shared datasets; misconfigured filters</li>
                <li>Prompt injection attempting data exfiltration</li>
              </ul>
            </div>
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
          <CardDescription>Security posture that scales with usage</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 border rounded-lg">
            <div className="font-semibold mb-2">KPIs</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Cross-tenant access incidents</li>
              <li>Secrets exposure incidents</li>
              <li>% tool calls with proper tenant tags</li>
              <li>Policy test coverage</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 font-semibold mb-2"><Warning className="w-4 h-4 text-yellow-700"/> Anti‑patterns</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Single shared vector index for all tenants</li>
              <li>Embedding secrets in prompts</li>
              <li>Unscoped tool permissions</li>
              <li>No egress controls for external calls</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Button variant="secondary" className="w-full" size="lg"
            onClick={() => { trackEvent({ action: 'micro_assessment', category: 'ai_skills', label: 'security-data-boundaries' }); window.location.assign('/study-mode?concept=security-data-boundaries&type=socratic'); }}
            aria-label="Start micro-assessment for Security & Data Boundaries">
            Micro‑assessment
          </Button>
          <Button variant="outline" className="w-full" size="lg"
            onClick={() => { trackEvent({ action: 'try_scenario', category: 'ai_skills', label: 'security-data-boundaries' }); window.location.assign('/study-mode?concept=security-data-boundaries&type=scenario'); }}
            aria-label="Try a scenario for Security & Data Boundaries">
            Try Scenario
          </Button>
          <Button className="w-full" size="lg" onClick={() => { trackEvent({ action: 'navigate_next', category: 'ai_skills', label: 'security-data-boundaries' }); onNavigate(); }}>
            Next: Retrieval‑Augmented Generation (RAG)
          </Button>
        </div>
      </div>
    </div>
  )
}
