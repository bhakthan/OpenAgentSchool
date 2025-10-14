import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Target, Tree } from "@phosphor-icons/react"
import { Link } from "react-router-dom"

type Props = {
  onNavigate?: () => void
}

type Pillar = {
  id: string
  title: string
  subtitle?: string
  framing?: string
  core: string
  actions: string[]
  outcomes: string[]
  impact: string
  caseStudy: {
    context: string
    action: string
    outcome: string
    result: string
  }
}

const PILLARS: Pillar[] = [
  {
    id: "trust-engineering-system",
    title: "1. Trust Engineering System",
    framing: "Not “transparency” – a measurable system for truthfulness",
    core: "Quantify and calibrate user trust through data-driven mechanisms",
    actions: [
      "Confidence calibration dashboards: verify '85% confident' = truly ~85% correct",
      "Failure playbooks: If confidence <60% show action path + human escalation guidance",
      "Trust decay monitoring: detect when advanced usage declines after early success"
    ],
    outcomes: [
      "Confidence calibration error rate <5%",
      "90% of handoffs to humans include full context",
      "<10% user drop-off after first complex interaction"
    ],
    impact: "Turns trust from vague concept into KPI driving retention & 30–50% support cost reduction",
    caseStudy: {
      context: "Healthcare startup (telemedicine platform)",
      action: "Built confidence calibration dashboards; discovered mental health query accuracy gap (62% vs claimed 90%)",
      outcome: "Retrained with diversified clinical data; '85% confident' now lands 83–87%",
      result: "41% fewer malpractice complaints; 28% higher patient retention; 19% lift in premium conversions"
    }
  },
  {
    id: "memory-governance-framework",
    title: "2. Memory Governance Framework",
    framing: "Not “remembering things” – responsible data stewardship",
    core: "Design data retention as ethical & operational choice, not convenience",
    actions: [
      "User-controlled memory horizon (e.g. 'Remember 24h') with visible expiry",
      "Regulatory-by-design purge of GDPR/CCPA-sensitive data after 30 days",
      "Context expiration rules: forget billing issues post-resolution"
    ],
    outcomes: [
      "100% compliance with retention policies",
      "<5% of queries require re-explaining context",
      "40% reduction in memory infra costs"
    ],
    impact: "Prevents $500k+ fines & boosts user control sentiment (72% higher satisfaction)",
    caseStudy: {
      context: "European e-commerce retailer",
      action: "Implemented expirations + memory reset UI",
      outcome: "98% regulated data auto-purged; 73% users used controls",
      result: "Zero GDPR fines; +34% trust score; +12% repeat purchase rate"
    }
  },
  {
    id: "integration-stewardship",
    title: "3. Integration Stewardship",
    framing: "Not “connecting systems” – risk-aware value delivery",
    core: "Treat integrations as high-risk business decisions",
    actions: [
      "Least-privilege: read-only where possible; escalate only on proven need",
      "Cost-to-value scoring: integrate only if ROI >3x operational cost",
      "Failure isolation messaging instead of system crash ('Billing data unavailable — retry in 1h')"
    ],
    outcomes: [
      "80% of integrations deliver ROI ≤90 days",
      "Zero critical failures from dependencies",
      "60% reduction in API downtime complaints"
    ],
    impact: "Prevents $1M+ revenue loss; creates defensible lock-in via deliberate depth",
    caseStudy: {
      context: "Fintech neobank",
      action: "Delayed CRM integration until ROI model validated; enforced least privilege",
      outcome: "No payment outage cascades; CRM added only after 140% ROI proof",
      result: "67% fewer downtime complaints; $1.8M engineering debt avoided; +22% CSAT for payment flows"
    }
  },
  {
    id: "capability-prioritization-matrix",
    title: "4. Capability Prioritization Matrix",
    framing: "Not “building skills” – strategic dependency creation",
    core: "Prioritize capabilities solving end-to-end user jobs",
    actions: [
      "Map dependency pathways (multi-step flows resolved in one interaction)",
      "Risk gating: human approval for high-stakes tasks only",
      "Feature bloat guard: remove capabilities <5% adoption at 30 days"
    ],
    outcomes: [
      "90% of user queries resolved in ≤2 steps",
      "Zero zombie capabilities after 60 days",
      "45% higher task completion vs feature-rich competitors"
    ],
    impact: "Transforms agent into workflow backbone (3x retention in B2C tests)",
    caseStudy: {
      context: "Enterprise HR SaaS",
      action: "Killed 8 low-adoption features; doubled down on 2 critical flows",
      outcome: "94% queries solved ≤2 steps; no low-adoption residue",
      result: "51% faster resolution; 37% lower support cost; $2.3M new contracts citing workflow depth"
    }
  },
  {
    id: "human-ai-synergy-design",
    title: "5. Human-AI Synergy Design",
    framing: "Not “escalation” – intentional collaboration architecture",
    core: "Engineer complementarity, not fallback",
    actions: [
      "Context-preserving handoffs with attempts + state",
      "Explicit role boundary messaging during interaction",
      "Human feedback tagging loop retraining models <4h latency"
    ],
    outcomes: [
      "85% of human agents report 'sufficient context'",
      "30% faster escalated resolution",
      "50% reduction in 'agent incompetence' complaints"
    ],
    impact: "Turns human teams into accelerators (20% CSAT lift case study)",
    caseStudy: {
      context: "Global airline support",
      action: "Structured AI→human escalation packets + feedback loop",
      outcome: "89% agents satisfied with context; 43% fewer repeat questions",
      result: "31% faster complex resolution; $1.1M annual retraining savings"
    }
  },
  {
    id: "failure-resilience-architecture",
    title: "6. Failure Resilience Architecture",
    framing: "Not “graceful errors” – systemic containment",
    core: "Design for expected, isolated, recoverable failures",
    actions: [
      "Silent failure responses with user guidance",
      "Forward correction messaging when new data invalidates prior answer",
      "Edge case taxonomy (ambiguous / missing data / conflicting instructions / etc.)"
    ],
    outcomes: [
      "95% failures yield actionable next steps",
      "<2% errors cause permanent abandonment",
      "40% faster recovery time"
    ],
    impact: "Avoids viral negative incidents & cuts crisis overhead 70%",
    caseStudy: {
      context: "IoT smart home vendor",
      action: "Replaced crashes with recovery narratives + correction pattern",
      outcome: "97% failures guided; 0% abandonment",
      result: "82% fewer 'device broken' tickets; App rating 3.9 → 4.8; +19% renewal"
    }
  },
  {
    id: "ethical-compliance-layer",
    title: "7. Ethical Compliance Layer",
    framing: "Not 'avoiding bias' – proactive risk mitigation",
    core: "Integrate ethics into architectural gating & logging",
    actions: [
      "Bias detection workflows monitoring demographic variance",
      "Regulatory impact assessment pre-launch (HIPAA / finance / HR)",
      "Immutable audit trails: action + reason + approval"
    ],
    outcomes: [
      "Zero compliance violations",
      "Bias detection rate >90% in high-risk domains",
      "100% high-risk capabilities have review docs"
    ],
    impact: "Avoids $10M+ fines & supports premium pricing (15–20% willingness-to-pay delta)",
    caseStudy: {
      context: "Recruitment tech platform",
      action: "Implemented demographic variance flags + mandatory legal review",
      outcome: "92% disparity detection before launch; full documentation coverage",
      result: "Zero lawsuits; 33% higher candidate diversity; 27% faster enterprise sales"
    }
  },
  {
    id: "complexity-governance-model",
    title: "8. Complexity Governance Model",
    framing: "Not 'orchestration patterns' – deliberate scaling discipline",
    core: "Treat complexity as cost center with activation thresholds",
    actions: [
      "Technical debt scoring per capability (monthly $ + benefit)",
      "Scalability thresholds (single agent until >500 concurrent users)",
      "Cost transparency dashboards per query & workflow path"
    ],
    outcomes: [
      "60% reduction in unexplained spend spikes",
      "Zero complex systems launched without validated need",
      "35% lower infra cost vs premature scaling"
    ],
    impact: "Prevents $2M+ wasted engineering spend; discipline yields predictable performance",
    caseStudy: {
      context: "Telecom B2B support",
      action: "Gated multi-agent routing until >30% faster resolution proven",
      outcome: "No unjustified complexity; 28% infra cost reduction",
      result: "$3.7M spend avoided; 51% higher agent adoption among enterprises"
    }
  }
]

export default function AIProductManagementPillars({ onNavigate }: Props) {
  return (
    <div className="space-y-10">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            AI Product Management: 8 Critical Pillars
          </CardTitle>
          <CardDescription>
            A Product Manager’s operating framework for reliable, defensible, retention-driving AI Agents. Each pillar = 
            Core Responsibility → Concrete Actions → Measurable Outcomes → Business Impact.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Interactive Visualization Link */}
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Tree className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Interactive Framework Visualization</h3>
                  <p className="text-sm text-muted-foreground">Explore the 8 pillars with D3 tree visualization and detailed case studies</p>
                </div>
              </div>
              <Link to="/ai-product-framework">
                <Button variant="default">
                  Explore Framework
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {PILLARS.slice(0,4).map(p => (
              <a key={p.id} href={`#${p.id}`} className="p-4 rounded-lg border hover:bg-muted/40 transition">
                <div className="font-semibold">{p.title.replace(/^[0-9]+\\. /,'')}</div>
                <div className="text-xs text-muted-foreground line-clamp-2">{p.framing}</div>
              </a>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {PILLARS.slice(4).map(p => (
              <a key={p.id} href={`#${p.id}`} className="p-4 rounded-lg border hover:bg-muted/40 transition">
                <div className="font-semibold">{p.title.replace(/^[0-9]+\\. /,'')}</div>
                <div className="text-xs text-muted-foreground line-clamp-2">{p.framing}</div>
              </a>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Use these pillars as a living governance system: treat each metric as a dashboard candidate, 
            and only scale capability surface area when its pillar KPIs stabilize.
          </p>
        </CardContent>
      </Card>

      {PILLARS.map(p => (
        <Card key={p.id} id={p.id} className="scroll-mt-24">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>{p.title}</CardTitle>
              <Badge variant="secondary">{p.core.split(' ')[0]}</Badge>
            </div>
            {p.framing && (
              <CardDescription>{p.framing}</CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <h4 className="font-semibold mb-2">Core Responsibility</h4>
              <p className="text-sm text-muted-foreground">{p.core}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Concrete Actions</h4>
                <ul className="space-y-2 text-sm list-disc pl-5">
                  {p.actions.map(a => <li key={a}>{a}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Measurable Outcomes</h4>
                <ul className="space-y-2 text-sm list-disc pl-5">
                  {p.outcomes.map(o => <li key={o}>{o}</li>)}
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg border bg-background/60">
              <h4 className="font-semibold mb-1">Business Impact</h4>
              <p className="text-sm text-muted-foreground">{p.impact}</p>
            </div>

            <div className="p-4 bg-muted/40 rounded-lg space-y-2">
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Case Study
              </div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{p.caseStudy.context}</p>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="font-medium mb-1">Action</div>
                  <p className="text-muted-foreground">{p.caseStudy.action}</p>
                </div>
                <div>
                  <div className="font-medium mb-1">Outcome</div>
                  <p className="text-muted-foreground">{p.caseStudy.outcome}</p>
                </div>
                <div>
                  <div className="font-medium mb-1">Result</div>
                  <p className="text-muted-foreground">{p.caseStudy.result}</p>
                </div>
              </div>
            </div>

            <div className="text-right">
              <a href="#top" className="text-xs text-muted-foreground hover:underline">Back to top</a>
            </div>
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardHeader>
          <CardTitle>Operational Adoption Sequence</CardTitle>
          <CardDescription>Suggested rollout order for early → scaled maturity</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal pl-5 space-y-2 text-sm">
            <li>Trust Engineering (baseline truth metrics)</li>
            <li>Memory Governance (ethical retention + user control)</li>
            <li>Failure Resilience (containment before expansion)</li>
            <li>Capability Prioritization (prune & focus)</li>
            <li>Integration Stewardship (high-ROI surfaces only)</li>
            <li>Human-AI Synergy (optimize escalations & loops)</li>
            <li>Ethical Compliance Layer (embed auditability)</li>
            <li>Complexity Governance (cost visibility + scaling gates)</li>
          </ol>
        </CardContent>
      </Card>

      {onNavigate && (
        <div className="pt-2">
          <Button size="lg" className="w-full" onClick={onNavigate}>
            Next: Code Understanding
          </Button>
        </div>
      )}
    </div>
  )
}