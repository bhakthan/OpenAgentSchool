import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Notebook, Users, Warning, CheckCircle } from "@phosphor-icons/react"
import MiniFlowMap from './visuals/MiniFlowMap'

interface Props {
  onNavigate: () => void
}

export default function OrgPlaybooks({ onNavigate }: Props) {
  return (
    <div className="space-y-6">
      <Card className="bg-muted text-foreground border">
        <CardHeader>
          <CardTitle className="text-xl">Org Playbooks & Change Management</CardTitle>
          <CardDescription className="text-base">
            Standardize AI-native practices across teams
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Practices */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Notebook className="w-5 h-5" />
            <CardTitle>Practices</CardTitle>
          </div>
          <CardDescription>Codify what good looks like</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="md:col-span-2">
            <MiniFlowMap
              title="Playbook rollout"
              steps={['Draft', 'Pilot', 'Measure', 'Refine', 'Approve', 'Adopt']}
              highlightIndices={[1, 2, 3]}
            />
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold mb-1">Playbook Library</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Templates for prompts, evals, RAG, safety</li>
              <li>Reference implementations and checklists</li>
              <li>Versioned with owners and SLAs</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold mb-1">Enablement & Training</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Workshops, office hours, and sandboxes</li>
              <li>Role-based learning paths</li>
              <li>Champion network and feedback loops</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold mb-1">Governance & Ops</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Review boards for high-risk changes</li>
              <li>Metrics dashboards and quarterly reviews</li>
              <li>Incident post-mortems feed back to playbooks</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="font-semibold mb-1">Adoption & Scale</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Minimum bar per tiered maturity model</li>
              <li>Self-serve scaffolds and golden paths</li>
              <li>Internal marketplace for reusable patterns</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Studio Lab */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            <CardTitle>Studio Lab: Playbook Rollout</CardTitle>
          </div>
          <CardDescription>Pilot a new playbook with two teams and measure impact</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <ol className="list-decimal pl-5 space-y-1">
            <li>Select a high-value playbook (e.g., canary prompts)</li>
            <li>Run a two-team pilot with baseline metrics</li>
            <li>Collect feedback; iterate templates and docs</li>
            <li>Graduate to org standard with governance</li>
          </ol>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 border rounded-lg">
              <div className="font-semibold">Success criteria</div>
              <ul className="list-disc pl-5 text-muted-foreground">
                <li>Improved Quality Score and time-to-ship</li>
                <li>Adoption by majority of teams in 90 days</li>
              </ul>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold">Edge cases</div>
              <ul className="list-disc pl-5 text-muted-foreground">
                <li>Team-specific constraints; resistance to change</li>
                <li>Under-specified templates causing drift</li>
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
          <CardDescription>Consistent excellence, sustainably</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 border rounded-lg">
            <div className="font-semibold mb-2">KPIs</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Playbook adoption rate</li>
              <li>Time-to-ship improvements</li>
              <li>Incident rate post-adoption</li>
              <li>Training completion rates</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 font-semibold mb-2"><Warning className="w-4 h-4 text-yellow-700"/> Anti‑patterns</div>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Playbooks without owners</li>
              <li>Governance theater without metrics</li>
              <li>One-off trainings; no reinforcement</li>
              <li>Too rigid templates blocking innovation</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Button variant="secondary" className="w-full" size="lg"
            onClick={() => window.location.assign('/study-mode?concept=org-playbooks&type=socratic')}
            aria-label="Start micro-assessment for Org Playbooks">
            Micro‑assessment
          </Button>
          <Button className="w-full" size="lg" onClick={onNavigate}>
            Next: Novel Organizational Patterns
          </Button>
        </div>
      </div>
    </div>
  )
}
