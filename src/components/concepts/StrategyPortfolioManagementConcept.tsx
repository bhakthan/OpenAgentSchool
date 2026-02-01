import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  TrendingUp,
  Calculator,
  Calendar,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap,
  BarChart3,
  ArrowUpRight,
  FileSpreadsheet,
  GitBranch,
  Users,
  DollarSign,
  Clock
} from "lucide-react";
import ConceptLayout from "./ConceptLayout";
import CodeBlock from "@/components/ui/CodeBlock";
import ToolkitDownloadButtons from "./ToolkitDownloadButtons";

interface PriorityQuadrant {
  id: string;
  name: string;
  description: string;
  action: string;
  color: string;
  examples: string[];
}

interface IntakeCriterion {
  id: string;
  name: string;
  weight: number;
  description: string;
  questions: string[];
}

interface RoadmapPhase {
  name: string;
  duration: string;
  focus: string;
  initiatives: string[];
  exitCriteria: string[];
}

interface KillCriterion {
  trigger: string;
  threshold: string;
  action: string;
  grace: string;
}

const priorityQuadrants: PriorityQuadrant[] = [
  {
    id: "quick-wins",
    name: "Quick Wins",
    description: "High value, low effort. Ship immediately.",
    action: "Execute in current sprint",
    color: "bg-green-500/20 border-green-500/50",
    examples: ["Prompt template library", "Agent FAQ chatbot", "Document summarizer"]
  },
  {
    id: "strategic-bets",
    name: "Strategic Bets",
    description: "High value, high effort. Plan carefully.",
    action: "Roadmap for next quarter",
    color: "bg-blue-500/20 border-blue-500/50",
    examples: ["Multi-agent workflow engine", "Domain-specific fine-tuning", "Enterprise integration"]
  },
  {
    id: "fill-ins",
    name: "Fill-Ins",
    description: "Low value, low effort. Do when capacity allows.",
    action: "Backlog for idle time",
    color: "bg-amber-500/20 border-amber-500/50",
    examples: ["UI polish", "Additional export formats", "Minor tool integrations"]
  },
  {
    id: "money-pits",
    name: "Money Pits",
    description: "Low value, high effort. Avoid or deprioritize.",
    action: "Reject or re-scope",
    color: "bg-red-500/20 border-red-500/50",
    examples: ["AGI attempts", "Perfect accuracy goals", "Scope creep features"]
  }
];

const intakeCriteria: IntakeCriterion[] = [
  {
    id: "business-value",
    name: "Business Value",
    weight: 30,
    description: "Direct revenue impact, cost savings, or strategic importance",
    questions: [
      "What's the estimated annual impact ($)?",
      "Which revenue stream or cost center is affected?",
      "How many users/processes benefit?",
      "Is this a must-have for a key customer or segment?"
    ]
  },
  {
    id: "feasibility",
    name: "Technical Feasibility",
    weight: 25,
    description: "Technical complexity, team capability, and dependency risk",
    questions: [
      "Do we have the required skills in-house?",
      "What's the estimated development time?",
      "Are external APIs/data sources reliable?",
      "Can we reuse existing components?"
    ]
  },
  {
    id: "risk",
    name: "Risk Profile",
    weight: 25,
    description: "Security, compliance, reputation, and operational risks",
    questions: [
      "Does this handle sensitive data (PII, financial)?",
      "What's the blast radius if it fails?",
      "Are there regulatory implications?",
      "Can we test safely before full rollout?"
    ]
  },
  {
    id: "alignment",
    name: "Strategic Alignment",
    weight: 20,
    description: "Fit with company vision, AI strategy, and platform direction",
    questions: [
      "Does this advance our AI maturity?",
      "Is executive sponsorship confirmed?",
      "Does it build reusable capabilities?",
      "Is timing aligned with market/competitive needs?"
    ]
  }
];

const roadmapPhases: RoadmapPhase[] = [
  {
    name: "Foundation",
    duration: "Q1",
    focus: "Establish infrastructure and governance",
    initiatives: [
      "AI platform selection and setup",
      "Data governance framework",
      "Security and compliance baseline",
      "Pilot use case identification"
    ],
    exitCriteria: [
      "Platform deployed and accessible",
      "Governance policies documented",
      "1-2 pilot use cases selected",
      "Team training completed"
    ]
  },
  {
    name: "Pilot",
    duration: "Q2",
    focus: "Prove value with controlled experiments",
    initiatives: [
      "Pilot agent deployment",
      "User feedback collection",
      "Metrics dashboard setup",
      "Iteration based on learnings"
    ],
    exitCriteria: [
      "Pilot achieves target metrics",
      "User satisfaction > 70%",
      "No critical security incidents",
      "Business case validated"
    ]
  },
  {
    name: "Scale",
    duration: "Q3-Q4",
    focus: "Expand proven patterns across organization",
    initiatives: [
      "Production hardening",
      "Self-service onboarding",
      "Additional use case rollout",
      "Center of Excellence formation"
    ],
    exitCriteria: [
      "3+ production use cases",
      "Self-service adoption active",
      "Cost per interaction optimized",
      "Knowledge base established"
    ]
  },
  {
    name: "Optimize",
    duration: "Ongoing",
    focus: "Continuous improvement and innovation",
    initiatives: [
      "Advanced agent patterns",
      "Cross-functional workflows",
      "Model fine-tuning",
      "Community building"
    ],
    exitCriteria: [
      "Measurable ROI documented",
      "Innovation pipeline active",
      "Org-wide AI literacy",
      "External recognition"
    ]
  }
];

const killCriteria: KillCriterion[] = [
  {
    trigger: "Adoption Plateau",
    threshold: "< 10% MAU growth for 2 consecutive months",
    action: "Pivot or sunset",
    grace: "One iteration cycle to test new approach"
  },
  {
    trigger: "Cost Overrun",
    threshold: "Actual cost > 150% of budget",
    action: "Pause and reassess scope",
    grace: "2-week analysis period"
  },
  {
    trigger: "Quality Degradation",
    threshold: "User satisfaction drops below 60%",
    action: "Halt new features, focus on reliability",
    grace: "30-day remediation window"
  },
  {
    trigger: "Strategic Misalignment",
    threshold: "Company direction shift invalidates use case",
    action: "Immediate pause for realignment",
    grace: "Executive review within 1 week"
  },
  {
    trigger: "Risk Materialization",
    threshold: "Any high-severity security or compliance incident",
    action: "Immediate halt pending investigation",
    grace: "None - immediate action required"
  }
];

/**
 * Strategy & Portfolio Management: prioritizing and sequencing agent initiatives (2026 Edition).
 */
export default function StrategyPortfolioManagementConcept() {
  const [selectedQuadrant, setSelectedQuadrant] = useState(priorityQuadrants[0]);
  const [selectedCriterion, setSelectedCriterion] = useState(intakeCriteria[0]);

  return (
    <ConceptLayout
      conceptId="strategy-portfolio"
      title="Strategy & Portfolio Management"
      description="Prioritize, sequence, and govern your agent initiatives like a product portfolio. Build the business case, balance the roadmap, and know when to cut losses."
    >
      <div className="space-y-8">
        {/* Hero Card */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary/20 text-primary">2026 Update</Badge>
                  <Badge variant="outline">Portfolio Governance</Badge>
                </div>
                <h3 className="text-2xl font-bold">Strategic Agent Portfolio Management</h3>
                <p className="text-muted-foreground">
                  Not every AI idea deserves investment. Use structured intake, prioritization frameworks, and 
                  clear kill criteria to build a portfolio that maximizes value while managing risk.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="outline" className="bg-blue-500/10">Intake Scoring</Badge>
                  <Badge variant="outline" className="bg-green-500/10">Prioritization Matrix</Badge>
                  <Badge variant="outline" className="bg-purple-500/10">Roadmap Planning</Badge>
                  <Badge variant="outline" className="bg-red-500/10">Kill Criteria</Badge>
                </div>
              </div>
              <div className="flex flex-col gap-3 min-w-[200px]">
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="text-2xl font-bold text-green-400">3-5x</div>
                  <div className="text-xs text-muted-foreground">Target ROI on agent initiatives</div>
                </div>
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="text-2xl font-bold text-blue-400">Quarterly</div>
                  <div className="text-xs text-muted-foreground">Portfolio rebalancing cadence</div>
                </div>
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <div className="text-2xl font-bold text-amber-400">70/20/10</div>
                  <div className="text-xs text-muted-foreground">Core / Adjacent / Experimental</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="prioritization" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="prioritization">Prioritization</TabsTrigger>
            <TabsTrigger value="intake">Intake Scoring</TabsTrigger>
            <TabsTrigger value="roadmap">Roadmapping</TabsTrigger>
            <TabsTrigger value="governance">Kill Criteria</TabsTrigger>
          </TabsList>

          {/* Prioritization Tab */}
          <TabsContent value="prioritization" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-400" /> Value vs. Effort Matrix
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Plot initiatives on a 2×2 matrix to quickly identify where to invest resources.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {priorityQuadrants.map((quad) => (
                    <Card
                      key={quad.id}
                      className={`cursor-pointer transition-all hover:scale-[1.02] ${quad.color} ${
                        selectedQuadrant.id === quad.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedQuadrant(quad)}
                    >
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-1">{quad.name}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{quad.description}</p>
                        <Badge variant="outline" className="text-xs">{quad.action}</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{selectedQuadrant.name} - Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {selectedQuadrant.examples.map((ex, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <ArrowUpRight className="w-4 h-4 text-primary" />
                      {ex}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Portfolio Balance Framework</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">70%</div>
                    <h4 className="font-medium mb-1">Core</h4>
                    <p className="text-xs text-muted-foreground">Proven patterns, scaling what works</p>
                  </div>
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">20%</div>
                    <h4 className="font-medium mb-1">Adjacent</h4>
                    <p className="text-xs text-muted-foreground">New use cases, moderate risk</p>
                  </div>
                  <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20 text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">10%</div>
                    <h4 className="font-medium mb-1">Experimental</h4>
                    <p className="text-xs text-muted-foreground">Moonshots, high risk/reward</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <ToolkitDownloadButtons
              baseName="portfolio-balance-canvas"
              markdownLabel="Download Portfolio Balance Canvas"
              excelLabel="Download Portfolio Balance (Excel)"
            />
          </TabsContent>

          {/* Intake Scoring Tab */}
          <TabsContent value="intake" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {intakeCriteria.map((criterion) => (
                <Card
                  key={criterion.id}
                  className={`cursor-pointer transition-all hover:border-blue-500/50 ${
                    selectedCriterion.id === criterion.id ? 'border-blue-500 bg-blue-500/5' : ''
                  }`}
                  onClick={() => setSelectedCriterion(criterion)}
                >
                  <CardContent className="pt-4 text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">{criterion.weight}%</div>
                    <h4 className="font-medium text-xs">{criterion.name}</h4>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle>{selectedCriterion.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{selectedCriterion.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h4 className="font-medium mb-3">Scoring Questions</h4>
                <ul className="space-y-2">
                  {selectedCriterion.questions.map((q, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                      {q}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calculator className="w-5 h-5" /> Weighted Scoring Template
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="yaml">{`# Initiative Intake Scoring Card
initiative:
  name: "Customer Support Agent"
  sponsor: "VP of Customer Success"
  date: "2026-01-15"

scoring:
  business_value:      # Weight: 30%
    score: 8           # 1-10
    rationale: "$2M annual support cost savings projected"
  
  technical_feasibility:  # Weight: 25%
    score: 7
    rationale: "Proven patterns exist, some custom integration needed"
  
  risk_profile:        # Weight: 25%
    score: 6
    rationale: "Handles customer PII, needs careful data handling"
  
  strategic_alignment: # Weight: 20%
    score: 9
    rationale: "Core to AI-first customer experience strategy"

weighted_score: 7.45   # (8*.30)+(7*.25)+(6*.25)+(9*.20)
priority: high
recommendation: "Proceed to pilot phase"`}</CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Roadmap Tab */}
          <TabsContent value="roadmap" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-400" /> 4-Phase Adoption Roadmap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {roadmapPhases.map((phase, i) => (
                    <div key={phase.name} className="flex gap-4 p-4 rounded-lg border bg-background/50">
                      <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex flex-col items-center justify-center text-purple-400 shrink-0">
                        <span className="text-xs font-medium">Phase</span>
                        <span className="text-lg font-bold">{i + 1}</span>
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold">{phase.name}</h4>
                          <Badge variant="outline">{phase.duration}</Badge>
                          <Badge variant="outline" className="bg-muted">{phase.focus}</Badge>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-2">Key Initiatives:</p>
                            <ul className="space-y-1">
                              {phase.initiatives.map((init, j) => (
                                <li key={j} className="flex items-center gap-2 text-muted-foreground">
                                  <Zap className="w-3 h-3 text-amber-400" /> {init}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-2">Exit Criteria:</p>
                            <ul className="space-y-1">
                              {phase.exitCriteria.map((crit, j) => (
                                <li key={j} className="flex items-center gap-2 text-muted-foreground">
                                  <CheckCircle className="w-3 h-3 text-green-400" /> {crit}
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
                <CardTitle className="text-lg">Quarterly Review Agenda</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="markdown">{`# Quarterly Agent Portfolio Review

## 1. Performance Review (30 min)
- [ ] Review KPIs for each active initiative
- [ ] Identify over/under performers
- [ ] Surface blockers and dependencies

## 2. Portfolio Health (20 min)
- [ ] Check 70/20/10 balance
- [ ] Assess resource allocation vs. outcomes
- [ ] Review risk concentration

## 3. Prioritization Refresh (30 min)
- [ ] Re-score initiatives with new data
- [ ] Evaluate new intake requests
- [ ] Identify candidates for kill/pause

## 4. Roadmap Adjustment (20 min)
- [ ] Update timeline estimates
- [ ] Resequence based on dependencies
- [ ] Communicate changes to stakeholders

## Attendees
- AI/ML Lead, Product Owner, Finance Rep, Risk Owner`}</CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Governance/Kill Tab */}
          <TabsContent value="governance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" /> Initiative Kill Criteria
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Pre-defined triggers for pausing or sunsetting agent initiatives. Remove emotion from hard decisions.
                </p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-3">Trigger</th>
                        <th className="text-left py-2 px-3">Threshold</th>
                        <th className="text-left py-2 px-3">Action</th>
                        <th className="text-left py-2 px-3">Grace Period</th>
                      </tr>
                    </thead>
                    <tbody>
                      {killCriteria.map((kc, i) => (
                        <tr key={i} className="border-b border-muted/50">
                          <td className="py-3 px-3 font-medium">{kc.trigger}</td>
                          <td className="py-3 px-3 text-muted-foreground">{kc.threshold}</td>
                          <td className="py-3 px-3">
                            <Badge variant="outline" className="bg-red-500/10">{kc.action}</Badge>
                          </td>
                          <td className="py-3 px-3 text-muted-foreground">{kc.grace}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" /> Signs to Scale
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /> Consistent metric improvement over 3+ months</li>
                    <li className="flex items-center gap-2"><Users className="w-4 h-4 text-green-400" /> User pull (organic adoption without push)</li>
                    <li className="flex items-center gap-2"><DollarSign className="w-4 h-4 text-green-400" /> Clear path to positive unit economics</li>
                    <li className="flex items-center gap-2"><GitBranch className="w-4 h-4 text-green-400" /> Reusable patterns emerging</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-400" /> Signs to Sunset
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-red-400" /> Repeated timeline slips without progress</li>
                    <li className="flex items-center gap-2"><Users className="w-4 h-4 text-red-400" /> Low engagement despite promotion</li>
                    <li className="flex items-center gap-2"><DollarSign className="w-4 h-4 text-red-400" /> Cost per value continues rising</li>
                    <li className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-red-400" /> Core assumptions invalidated</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sunset Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="markdown">{`# Initiative Sunset Checklist

## Pre-Sunset (1-2 weeks before)
- [ ] Communicate decision to stakeholders
- [ ] Document lessons learned
- [ ] Identify reusable components to preserve
- [ ] Plan data retention/deletion

## Sunset Execution
- [ ] Disable new user signups
- [ ] Notify active users with transition plan
- [ ] Export valuable data for analysis
- [ ] Archive codebase and documentation

## Post-Sunset
- [ ] Publish retrospective summary
- [ ] Update portfolio dashboard
- [ ] Reallocate team resources
- [ ] Schedule 30-day follow-up for loose ends`}</CodeBlock>
              </CardContent>
            </Card>

            <ToolkitDownloadButtons
              baseName="initiative-sunset-template"
              markdownLabel="Download Sunset Checklist"
              excelLabel="Download Kill Criteria (Excel)"
            />
          </TabsContent>
        </Tabs>
      </div>
    </ConceptLayout>
  );
}









