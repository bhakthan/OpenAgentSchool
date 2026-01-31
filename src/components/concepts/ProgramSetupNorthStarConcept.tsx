import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  Compass,
  Users,
  BarChart3,
  CheckCircle,
  TrendingUp,
  Calendar,
  Layers,
  Star,
  Flag,
  AlertTriangle,
  Zap,
  ArrowRight
} from "lucide-react";
import ConceptLayout from "./ConceptLayout";
import CodeBlock from "@/components/ui/CodeBlock";
import ToolkitDownloadButtons from "./ToolkitDownloadButtons";

interface NorthStarElement {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  questions: string[];
  examples: string[];
}

interface MaturityDimension {
  name: string;
  level1: string;
  level3: string;
  level5: string;
}

interface StakeholderRole {
  role: string;
  responsibility: string;
  cadence: string;
  deliverable: string;
}

interface MilestonePhase {
  name: string;
  duration: string;
  objectives: string[];
  successMetrics: string[];
  risks: string[];
}

const northStarElements: NorthStarElement[] = [
  {
    id: "mission",
    name: "Mission Narrative",
    icon: <Star className="w-6 h-6" />,
    description: "A crisp one-sentence promise that every team member can recite.",
    questions: [
      "What specific user problem are we solving?",
      "What makes our approach uniquely valuable?",
      "What are the non-negotiable guardrails?",
      "How does this advance company strategy?"
    ],
    examples: [
      "\"Reduce customer support resolution time by 50% while maintaining 95% satisfaction.\"",
      "\"Enable every knowledge worker to draft documents 3x faster with AI assistance.\"",
      "\"Automate 80% of routine compliance checks without sacrificing audit quality.\""
    ]
  },
  {
    id: "metrics",
    name: "Success Metrics",
    icon: <BarChart3 className="w-6 h-6" />,
    description: "Pair value metrics with responsibility metrics for balanced scorecards.",
    questions: [
      "What's the primary business outcome we're measuring?",
      "What safety/quality metrics must not regress?",
      "How will we detect early warning signals?",
      "What's the measurement frequency?"
    ],
    examples: [
      "Value: $2M annual cost savings | Responsibility: < 1% escalation rate",
      "Value: 40% productivity gain | Responsibility: 0 PII exposure incidents",
      "Value: NPS +15 points | Responsibility: 95% factual accuracy"
    ]
  },
  {
    id: "stakeholders",
    name: "Stakeholder Alignment",
    icon: <Users className="w-6 h-6" />,
    description: "Map decision rights, sponsors, and approval rituals.",
    questions: [
      "Who is the executive sponsor with budget authority?",
      "Who approves go/no-go at each phase?",
      "What's the escalation path for blockers?",
      "How often do stakeholders sync?"
    ],
    examples: [
      "Sponsor: VP of Operations | Weekly steerco with product & engineering leads",
      "Risk owner: Chief Risk Officer | Monthly review with compliance team",
      "Champion network: 5 business unit leads for adoption and feedback"
    ]
  },
  {
    id: "maturity",
    name: "Maturity Baseline",
    icon: <Layers className="w-6 h-6" />,
    description: "Score people, process, and platform readiness to identify gaps.",
    questions: [
      "What AI/ML skills exist in-house today?",
      "Are governance policies documented and enforced?",
      "Is infrastructure ready for agent workloads?",
      "What's the organization's risk appetite?"
    ],
    examples: [
      "People: Level 2 (some ML skills, need prompt engineering training)",
      "Process: Level 3 (documented but inconsistent governance)",
      "Platform: Level 4 (production-ready infrastructure, needs observability)"
    ]
  }
];

const maturityDimensions: MaturityDimension[] = [
  {
    name: "People & Skills",
    level1: "No AI expertise; reliance on vendors",
    level3: "Core team with prompt engineering skills; training program exists",
    level5: "Cross-functional AI literacy; internal CoE; continuous upskilling"
  },
  {
    name: "Process & Governance",
    level1: "No AI policies; ad-hoc decisions",
    level3: "Documented policies; manual compliance checks; review rituals",
    level5: "Automated compliance; continuous monitoring; risk-based gating"
  },
  {
    name: "Platform & Tools",
    level1: "Manual API calls; no observability",
    level3: "Agent framework in place; basic monitoring; dev/prod separation",
    level5: "Enterprise-grade platform; full observability; self-service onboarding"
  },
  {
    name: "Data Readiness",
    level1: "Siloed data; no access governance",
    level3: "Centralized data lake; access policies; quality monitoring",
    level5: "Real-time data pipelines; automated quality; privacy-by-design"
  }
];

const stakeholderRoles: StakeholderRole[] = [
  {
    role: "Executive Sponsor",
    responsibility: "Budget authority, strategic alignment, blocker escalation",
    cadence: "Monthly steerco",
    deliverable: "Resource allocation, go/no-go decisions"
  },
  {
    role: "Product Owner",
    responsibility: "Requirements, prioritization, user advocacy",
    cadence: "Weekly sprint planning",
    deliverable: "Backlog, acceptance criteria, user feedback"
  },
  {
    role: "Technical Lead",
    responsibility: "Architecture, implementation, technical risk",
    cadence: "Daily standups, weekly tech review",
    deliverable: "System design, code reviews, deployment"
  },
  {
    role: "Risk/Compliance Owner",
    responsibility: "Policy enforcement, audit readiness, incident response",
    cadence: "Bi-weekly governance review",
    deliverable: "Risk assessments, compliance reports"
  },
  {
    role: "Champion Network",
    responsibility: "Adoption advocacy, feedback collection, training support",
    cadence: "Monthly champion sync",
    deliverable: "User feedback, adoption metrics, training sessions"
  }
];

const milestonePhases: MilestonePhase[] = [
  {
    name: "Discovery",
    duration: "2-4 weeks",
    objectives: [
      "Validate problem-solution fit",
      "Complete North Star canvas",
      "Identify pilot users",
      "Assess technical feasibility"
    ],
    successMetrics: [
      "North Star signed off by sponsor",
      "3+ potential use cases identified",
      "Technical POC completed"
    ],
    risks: ["Scope creep", "Stakeholder misalignment", "Unrealistic expectations"]
  },
  {
    name: "Foundation",
    duration: "4-8 weeks",
    objectives: [
      "Deploy agent infrastructure",
      "Establish governance baseline",
      "Train core team",
      "Build MVP agent"
    ],
    successMetrics: [
      "Platform operational",
      "Governance docs approved",
      "Team certifications complete"
    ],
    risks: ["Infrastructure delays", "Skill gaps", "Vendor dependencies"]
  },
  {
    name: "Pilot",
    duration: "6-12 weeks",
    objectives: [
      "Deploy with limited users",
      "Collect structured feedback",
      "Iterate based on learnings",
      "Validate business case"
    ],
    successMetrics: [
      "User satisfaction > 70%",
      "Target metrics hit for pilot group",
      "No critical incidents"
    ],
    risks: ["Low adoption", "Quality issues", "Changing requirements"]
  },
  {
    name: "Scale",
    duration: "Ongoing",
    objectives: [
      "Expand to broader user base",
      "Operationalize support model",
      "Document patterns for reuse",
      "Measure full ROI"
    ],
    successMetrics: [
      "Adoption targets met",
      "Cost per interaction optimized",
      "Positive ROI documented"
    ],
    risks: ["Scaling bottlenecks", "Support overload", "Governance drift"]
  }
];

/**
 * Program Setup & North Star: mission, metrics, and maturity framing for AI agent initiatives (2026 Edition).
 */
export default function ProgramSetupNorthStarConcept() {
  const [selectedElement, setSelectedElement] = useState(northStarElements[0]);

  return (
    <ConceptLayout
      conceptId="program-setup"
      title="Program Setup & North Star"
      description="Anchor your agent program before shipping a single workflow. Establish vision, metrics, maturity baseline, and stakeholder alignment for 2026 success."
    >
      <div className="space-y-8">
        {/* Hero Card */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary/20 text-primary">2026 Update</Badge>
                  <Badge variant="outline">Strategic Foundation</Badge>
                </div>
                <h3 className="text-2xl font-bold">North Star Alignment Framework</h3>
                <p className="text-muted-foreground">
                  Most agent initiatives fail not from technical issues but from unclear goals and misaligned stakeholders. 
                  Invest in the North Star canvas before writing the first prompt.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="outline" className="bg-amber-500/10">Mission Narrative</Badge>
                  <Badge variant="outline" className="bg-blue-500/10">Success Metrics</Badge>
                  <Badge variant="outline" className="bg-green-500/10">Stakeholder Map</Badge>
                  <Badge variant="outline" className="bg-purple-500/10">Maturity Baseline</Badge>
                </div>
              </div>
              <div className="flex flex-col gap-3 min-w-[200px]">
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <div className="text-2xl font-bold text-amber-400">Day 0</div>
                  <div className="text-xs text-muted-foreground">Complete before building</div>
                </div>
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="text-2xl font-bold text-blue-400">1 Page</div>
                  <div className="text-xs text-muted-foreground">North Star canvas</div>
                </div>
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="text-2xl font-bold text-green-400">100%</div>
                  <div className="text-xs text-muted-foreground">Stakeholder sign-off</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="canvas" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="canvas">North Star Canvas</TabsTrigger>
            <TabsTrigger value="maturity">Maturity Assessment</TabsTrigger>
            <TabsTrigger value="stakeholders">Stakeholder RACI</TabsTrigger>
            <TabsTrigger value="milestones">Milestone Planning</TabsTrigger>
          </TabsList>

          {/* North Star Canvas Tab */}
          <TabsContent value="canvas" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {northStarElements.map((element) => (
                <Card
                  key={element.id}
                  className={`cursor-pointer transition-all hover:border-amber-500/50 ${
                    selectedElement.id === element.id ? 'border-amber-500 bg-amber-500/5' : ''
                  }`}
                  onClick={() => setSelectedElement(element)}
                >
                  <CardContent className="pt-4 text-center">
                    <div className="flex justify-center mb-2 text-amber-400">{element.icon}</div>
                    <h4 className="font-medium text-xs">{element.name}</h4>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">{selectedElement.icon}</div>
                  <div>
                    <CardTitle>{selectedElement.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{selectedElement.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Key Questions</h4>
                  <ul className="space-y-2">
                    {selectedElement.questions.map((q, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Examples</h4>
                  <ul className="space-y-2">
                    {selectedElement.examples.map((ex, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ArrowRight className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">North Star Canvas Template</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="yaml">{`# North Star Alignment Canvas
program:
  name: "Customer Support AI Agent"
  sponsor: "VP of Customer Success"
  date: "2026-01-15"

mission:
  statement: "Reduce customer support resolution time by 50% while maintaining 95% satisfaction"
  guardrails:
    - "Never share customer PII externally"
    - "Always offer human escalation path"
    - "Log all decisions for audit"
  strategic_bet: "AI-first customer experience differentiation"

success_metrics:
  value:
    - metric: "Average resolution time"
      baseline: "24 hours"
      target: "12 hours"
    - metric: "Cost per ticket"
      baseline: "$15"
      target: "$8"
  responsibility:
    - metric: "Escalation rate"
      threshold: "< 5%"
    - metric: "Customer satisfaction"
      threshold: "> 95%"
    - metric: "Accuracy (spot-checked)"
      threshold: "> 98%"

maturity_baseline:
  people: 3      # 1-5 scale
  process: 2
  platform: 4
  gaps:
    - "Prompt engineering skills"
    - "Governance documentation"

stakeholders:
  sponsor: "VP Customer Success"
  product_owner: "Head of Support"
  technical_lead: "AI Platform Lead"
  risk_owner: "Compliance Manager"`}</CodeBlock>
              </CardContent>
            </Card>

            <ToolkitDownloadButtons
              baseName="north-star-alignment-canvas"
              markdownLabel="Download North Star Alignment Canvas"
              excelLabel="Download North Star Alignment (Excel)"
            />
          </TabsContent>

          {/* Maturity Assessment Tab */}
          <TabsContent value="maturity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-purple-400" /> Maturity Assessment Grid
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Score each dimension 1-5 to identify gaps and prioritize investments.
                </p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-3">Dimension</th>
                        <th className="text-left py-2 px-3">Level 1 (Ad-hoc)</th>
                        <th className="text-left py-2 px-3">Level 3 (Defined)</th>
                        <th className="text-left py-2 px-3">Level 5 (Optimized)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {maturityDimensions.map((dim, i) => (
                        <tr key={i} className="border-b border-muted/50">
                          <td className="py-3 px-3 font-medium">{dim.name}</td>
                          <td className="py-3 px-3 text-muted-foreground text-xs">{dim.level1}</td>
                          <td className="py-3 px-3 text-muted-foreground text-xs">{dim.level3}</td>
                          <td className="py-3 px-3 text-muted-foreground text-xs">{dim.level5}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-red-500/5 border-red-500/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" /> Red Zone Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><Flag className="w-4 h-4 text-red-400" /> Level 1-2: Address before pilot launch</li>
                    <li className="flex items-center gap-2"><Flag className="w-4 h-4 text-red-400" /> Skills gap: Immediate training program</li>
                    <li className="flex items-center gap-2"><Flag className="w-4 h-4 text-red-400" /> No governance: Pause until policies exist</li>
                    <li className="flex items-center gap-2"><Flag className="w-4 h-4 text-red-400" /> Infra not ready: Cloud-first bootstrap</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-green-500/5 border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-400" /> Green Zone Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-green-400" /> Level 4-5: Proceed to production</li>
                    <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-green-400" /> Strong skills: Expand team scope</li>
                    <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-green-400" /> Solid governance: Scale automation</li>
                    <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-green-400" /> Mature platform: Self-service rollout</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Stakeholder RACI Tab */}
          <TabsContent value="stakeholders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" /> Stakeholder Role Matrix
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-3">Role</th>
                        <th className="text-left py-2 px-3">Responsibility</th>
                        <th className="text-left py-2 px-3">Cadence</th>
                        <th className="text-left py-2 px-3">Deliverable</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stakeholderRoles.map((sr, i) => (
                        <tr key={i} className="border-b border-muted/50">
                          <td className="py-3 px-3 font-medium">{sr.role}</td>
                          <td className="py-3 px-3 text-muted-foreground">{sr.responsibility}</td>
                          <td className="py-3 px-3">
                            <Badge variant="outline">{sr.cadence}</Badge>
                          </td>
                          <td className="py-3 px-3 text-muted-foreground">{sr.deliverable}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Kickoff Meeting Agenda</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="markdown">{`# Agent Program Kickoff Meeting

## Attendees
- Executive Sponsor, Product Owner, Technical Lead
- Risk/Compliance Owner, Champion Network Leads

## Agenda (90 min)

### 1. North Star Alignment (30 min)
- [ ] Review mission statement and guardrails
- [ ] Validate success metrics and baselines
- [ ] Confirm strategic importance and urgency

### 2. Maturity Assessment Review (20 min)
- [ ] Walk through dimension scores
- [ ] Discuss red zone mitigation plans
- [ ] Agree on gap closure timeline

### 3. Roles & Responsibilities (20 min)
- [ ] Confirm RACI assignments
- [ ] Establish communication channels
- [ ] Set meeting cadences

### 4. Milestone Planning (20 min)
- [ ] Review phase objectives
- [ ] Identify first sprint goals
- [ ] Flag dependencies and risks

## Action Items
- [ ] Circulate signed North Star canvas
- [ ] Schedule first governance review
- [ ] Set up project tracking`}</CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Milestone Planning Tab */}
          <TabsContent value="milestones" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-400" /> Milestone Phases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {milestonePhases.map((phase, i) => (
                    <div key={phase.name} className="flex gap-4 p-4 rounded-lg border bg-background/50">
                      <div className="w-12 h-12 rounded-lg bg-green-500/20 flex flex-col items-center justify-center text-green-400 shrink-0">
                        <span className="text-xs font-medium">Phase</span>
                        <span className="text-lg font-bold">{i + 1}</span>
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold">{phase.name}</h4>
                          <Badge variant="outline">{phase.duration}</Badge>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-2">Objectives:</p>
                            <ul className="space-y-1">
                              {phase.objectives.map((obj, j) => (
                                <li key={j} className="flex items-center gap-2 text-muted-foreground">
                                  <Target className="w-3 h-3 text-blue-400" /> {obj}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-2">Success Metrics:</p>
                            <ul className="space-y-1">
                              {phase.successMetrics.map((m, j) => (
                                <li key={j} className="flex items-center gap-2 text-muted-foreground">
                                  <CheckCircle className="w-3 h-3 text-green-400" /> {m}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-2">Key Risks:</p>
                            <ul className="space-y-1">
                              {phase.risks.map((r, j) => (
                                <li key={j} className="flex items-center gap-2 text-muted-foreground">
                                  <AlertTriangle className="w-3 h-3 text-amber-400" /> {r}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Phase Gate Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="markdown">{`# Phase Gate Review Checklist

## Pre-Gate Preparation
- [ ] All success metrics measured and documented
- [ ] Risk register updated with current status
- [ ] Budget actuals vs. forecast prepared
- [ ] Stakeholder feedback synthesized

## Gate Meeting (60 min)
- [ ] Review objectives vs. actuals
- [ ] Demonstrate key deliverables
- [ ] Present learnings and pivots
- [ ] Discuss next phase plan and resources

## Gate Decision
- [ ] **GO**: Proceed to next phase as planned
- [ ] **GO WITH CONDITIONS**: Proceed with specific mitigations
- [ ] **RECYCLE**: Return to current phase with new scope
- [ ] **STOP**: Pause or sunset the initiative

## Post-Gate Actions
- [ ] Document decision and rationale
- [ ] Communicate to all stakeholders
- [ ] Update project plan and resources
- [ ] Schedule next gate review`}</CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ConceptLayout>
  );
}
