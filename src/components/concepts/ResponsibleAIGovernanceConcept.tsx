import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  FileText,
  Scale,
  Eye,
  Lock,
  Users,
  AlertCircle,
  ArrowRight,
  ClipboardCheck,
  Gavel,
  BookOpen,
  Timer
} from "lucide-react";
import ConceptLayout from "./ConceptLayout";
import CodeBlock from "@/components/ui/CodeBlock";
import ToolkitDownloadButtons from "./ToolkitDownloadButtons";

interface RiskCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  examples: string[];
  mitigations: string[];
  severity: "critical" | "high" | "medium";
}

interface PolicyControl {
  policy: string;
  control: string;
  automation: string;
  evidence: string;
}

interface ReviewRitual {
  name: string;
  frequency: string;
  participants: string[];
  outputs: string[];
  triggers: string[];
}

interface EscalationLevel {
  level: number;
  name: string;
  trigger: string;
  responder: string;
  sla: string;
  action: string;
}

const riskCategories: RiskCategory[] = [
  {
    id: "safety",
    name: "Safety & Harm",
    icon: <AlertTriangle className="w-6 h-6" />,
    description: "Physical, psychological, or reputational harm to users or third parties.",
    examples: [
      "Agent provides dangerous medical/legal advice",
      "Generates harmful content (violence, self-harm)",
      "Amplifies misinformation at scale"
    ],
    mitigations: [
      "Content filtering on inputs and outputs",
      "Refusal training for high-risk topics",
      "Human escalation for sensitive queries",
      "Red team testing before launch"
    ],
    severity: "critical"
  },
  {
    id: "privacy",
    name: "Privacy & Data",
    icon: <Lock className="w-6 h-6" />,
    description: "Unauthorized collection, use, or exposure of personal or sensitive data.",
    examples: [
      "Agent memorizes and leaks PII from training",
      "Logs contain unredacted sensitive data",
      "Cross-user data contamination in context"
    ],
    mitigations: [
      "PII detection and redaction in pipelines",
      "Data minimization in prompts",
      "Session isolation and context clearing",
      "Differential privacy techniques"
    ],
    severity: "critical"
  },
  {
    id: "fairness",
    name: "Fairness & Bias",
    icon: <Scale className="w-6 h-6" />,
    description: "Discriminatory or unfair treatment of users based on protected characteristics.",
    examples: [
      "Biased hiring recommendations",
      "Differential service quality by demographic",
      "Stereotyping in generated content"
    ],
    mitigations: [
      "Bias evaluation in test datasets",
      "Demographic parity monitoring",
      "Human review for high-stakes decisions",
      "Diverse red team composition"
    ],
    severity: "high"
  },
  {
    id: "security",
    name: "Security & Abuse",
    icon: <Shield className="w-6 h-6" />,
    description: "Exploitation of agent capabilities for malicious purposes.",
    examples: [
      "Prompt injection attacks",
      "Jailbreaking to bypass safety",
      "Agent used to generate malware/phishing"
    ],
    mitigations: [
      "Input validation and sanitization",
      "Output filtering for sensitive patterns",
      "Rate limiting and anomaly detection",
      "Capability restrictions by user tier"
    ],
    severity: "critical"
  },
  {
    id: "transparency",
    name: "Transparency & Explainability",
    icon: <Eye className="w-6 h-6" />,
    description: "Lack of clarity about AI involvement, capabilities, or decision rationale.",
    examples: [
      "Users don't know they're interacting with AI",
      "No explanation for agent recommendations",
      "Overconfident responses without uncertainty"
    ],
    mitigations: [
      "Clear AI disclosure in UI",
      "Confidence scores and source citations",
      "Explanation generation for decisions",
      "Model cards and capability documentation"
    ],
    severity: "medium"
  }
];

const policyControls: PolicyControl[] = [
  {
    policy: "No PII in prompts to external LLMs",
    control: "PII detection scanner before API call",
    automation: "Automated blocking with fallback to redacted prompt",
    evidence: "Scan logs with detection rates, block events"
  },
  {
    policy: "Human approval for high-stakes actions",
    control: "Approval gate for financial > $10K",
    automation: "Workflow pauses until manager approval in app",
    evidence: "Approval audit trail with timestamps"
  },
  {
    policy: "No generation of harmful content",
    control: "Content safety classifier on outputs",
    automation: "Flagged outputs blocked, logged for review",
    evidence: "Classifier scores, block rates, appeal outcomes"
  },
  {
    policy: "Transparency about AI involvement",
    control: "AI disclosure badge in all agent UIs",
    automation: "Enforced via UI component library",
    evidence: "UI audit screenshots, user survey results"
  },
  {
    policy: "Regular bias evaluation",
    control: "Quarterly bias testing on protected groups",
    automation: "Automated test suite with alert thresholds",
    evidence: "Test results, remediation tickets, trend reports"
  }
];

const reviewRituals: ReviewRitual[] = [
  {
    name: "Pre-Launch Review",
    frequency: "Before each new agent/major change",
    participants: ["Product Owner", "Tech Lead", "Risk Owner", "Legal (if needed)"],
    outputs: ["Model card", "Risk assessment", "Go/no-go decision"],
    triggers: ["New agent", "Capability expansion", "New data source", "External-facing launch"]
  },
  {
    name: "Operational Review",
    frequency: "Weekly",
    participants: ["On-call engineer", "Product Owner"],
    outputs: ["Incident summary", "Metric dashboard review", "Action items"],
    triggers: ["Any incident", "Metric threshold breach", "User escalations"]
  },
  {
    name: "Governance Review",
    frequency: "Monthly",
    participants: ["Risk Owner", "Compliance", "Tech Lead", "Product Owner"],
    outputs: ["Compliance status", "Policy exceptions", "Audit readiness"],
    triggers: ["Policy updates", "Regulatory changes", "Audit findings"]
  },
  {
    name: "Board Readout",
    frequency: "Quarterly",
    participants: ["Executive Sponsor", "Risk Owner", "External advisors (optional)"],
    outputs: ["Risk heat map", "Incident trends", "Strategic recommendations"],
    triggers: ["Quarter end", "Major incident", "Strategic pivot"]
  }
];

const escalationLevels: EscalationLevel[] = [
  {
    level: 1,
    name: "Team Triage",
    trigger: "Minor issue, single user affected",
    responder: "On-call engineer",
    sla: "4 hours",
    action: "Investigate and fix or document workaround"
  },
  {
    level: 2,
    name: "Manager Escalation",
    trigger: "Multiple users affected or repeated issue",
    responder: "Engineering manager + Product owner",
    sla: "2 hours",
    action: "Resource allocation, stakeholder communication"
  },
  {
    level: 3,
    name: "Leadership Alert",
    trigger: "Significant harm potential or widespread impact",
    responder: "VP/Director + Risk owner",
    sla: "1 hour",
    action: "Kill switch evaluation, external communication"
  },
  {
    level: 4,
    name: "Executive Crisis",
    trigger: "Critical harm, legal/regulatory, or reputational",
    responder: "C-suite + Legal + Comms",
    sla: "30 minutes",
    action: "Full shutdown, public statement, regulator notification"
  }
];

/**
 * Responsible AI Governance Playbooks: operationalizing policies, controls, and risk reviews (2026 Edition).
 */
export default function ResponsibleAIGovernanceConcept() {
  const [selectedRisk, setSelectedRisk] = useState(riskCategories[0]);

  const severityColors = {
    critical: "bg-red-500/20 border-red-500/50 text-red-400",
    high: "bg-amber-500/20 border-amber-500/50 text-amber-400",
    medium: "bg-blue-500/20 border-blue-500/50 text-blue-400"
  };

  return (
    <ConceptLayout
      conceptId="responsible-ai-governance"
      title="Responsible AI Governance Playbooks"
      description="Wire governance directly into agent delivery. Codify policy controls, escalation paths, and audit evidence for 2026 compliance."
    >
      <div className="space-y-8">
        {/* Hero Card */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary/20 text-primary">2026 Update</Badge>
                  <Badge variant="outline">Governance-as-Code</Badge>
                </div>
                <h3 className="text-2xl font-bold">Operationalized AI Governance</h3>
                <p className="text-muted-foreground">
                  Static principles don't prevent incidents. Wire governance directly into agent delivery with 
                  automated controls, review rituals, and evidence trails that make compliance a daily habit.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="outline" className="bg-red-500/10">Risk Taxonomy</Badge>
                  <Badge variant="outline" className="bg-green-500/10">Policy Controls</Badge>
                  <Badge variant="outline" className="bg-blue-500/10">Review Rituals</Badge>
                  <Badge variant="outline" className="bg-purple-500/10">Escalation Paths</Badge>
                </div>
              </div>
              <div className="flex flex-col gap-3 min-w-[200px]">
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="text-2xl font-bold text-green-400">0</div>
                  <div className="text-xs text-muted-foreground">Target critical incidents</div>
                </div>
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="text-2xl font-bold text-blue-400">100%</div>
                  <div className="text-xs text-muted-foreground">Policy coverage</div>
                </div>
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <div className="text-2xl font-bold text-amber-400">&lt; 1hr</div>
                  <div className="text-xs text-muted-foreground">Escalation SLA</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="risks" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="risks">Risk Taxonomy</TabsTrigger>
            <TabsTrigger value="controls">Policy Controls</TabsTrigger>
            <TabsTrigger value="rituals">Review Rituals</TabsTrigger>
            <TabsTrigger value="escalation">Escalation Paths</TabsTrigger>
          </TabsList>

          {/* Risk Taxonomy Tab */}
          <TabsContent value="risks" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {riskCategories.map((risk) => (
                <Card
                  key={risk.id}
                  className={`cursor-pointer transition-all hover:scale-[1.02] ${
                    selectedRisk.id === risk.id ? 'ring-2 ring-primary' : ''
                  } ${severityColors[risk.severity]}`}
                  onClick={() => setSelectedRisk(risk)}
                >
                  <CardContent className="pt-4 text-center">
                    <div className="flex justify-center mb-2">{risk.icon}</div>
                    <h4 className="font-medium text-xs">{risk.name}</h4>
                    <Badge variant="outline" className="mt-2 text-[10px]">{risk.severity}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${severityColors[selectedRisk.severity]}`}>
                    {selectedRisk.icon}
                  </div>
                  <div>
                    <CardTitle>{selectedRisk.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{selectedRisk.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400" /> Risk Examples
                    </h4>
                    <ul className="space-y-2">
                      {selectedRisk.examples.map((ex, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <ArrowRight className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-400" /> Mitigations
                    </h4>
                    <ul className="space-y-2">
                      {selectedRisk.mitigations.map((m, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Risk Assessment Template</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="yaml">{`# Agent Risk Assessment
agent:
  name: "Customer Support Agent"
  version: "1.2.0"
  assessment_date: "2026-01-15"

risks:
  - category: "Privacy & Data"
    severity: critical
    likelihood: medium
    impact: high
    description: "Agent processes customer tickets containing PII"
    mitigations:
      - control: "PII redaction before LLM calls"
        status: implemented
        evidence: "scan_logs_jan2026.json"
      - control: "Session isolation"
        status: implemented
        evidence: "architecture_review.md"
    residual_risk: low
    owner: "Data Protection Officer"

  - category: "Safety & Harm"
    severity: high
    likelihood: low
    impact: medium
    description: "Agent might provide incorrect refund advice"
    mitigations:
      - control: "Confidence threshold for financial advice"
        status: implemented
        evidence: "threshold_config.yaml"
      - control: "Human escalation for refunds > $500"
        status: implemented
        evidence: "workflow_definition.json"
    residual_risk: low
    owner: "Product Manager"

sign_off:
  risk_owner: "Jane Smith, CRO"
  date: "2026-01-16"
  decision: "approved_with_monitoring"`}</CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Policy Controls Tab */}
          <TabsContent value="controls" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gavel className="w-5 h-5 text-green-400" /> Policy-to-Control Mapping
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Every policy must trace to a control, automation, and evidence trail.
                </p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-3">Policy</th>
                        <th className="text-left py-2 px-3">Control</th>
                        <th className="text-left py-2 px-3">Automation</th>
                        <th className="text-left py-2 px-3">Evidence</th>
                      </tr>
                    </thead>
                    <tbody>
                      {policyControls.map((pc, i) => (
                        <tr key={i} className="border-b border-muted/50">
                          <td className="py-3 px-3 font-medium">{pc.policy}</td>
                          <td className="py-3 px-3 text-muted-foreground">{pc.control}</td>
                          <td className="py-3 px-3 text-muted-foreground">{pc.automation}</td>
                          <td className="py-3 px-3 text-muted-foreground">{pc.evidence}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5" /> Model Card Template
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="yaml">{`# Model Card for Agent Launch Review
model_card:
  name: "Customer Support Agent v1.2"
  version: "1.2.0"
  date: "2026-01-15"
  
  intended_use:
    primary: "Answer customer support queries via chat"
    users: "End customers via support portal"
    out_of_scope:
      - "Medical or legal advice"
      - "Financial transactions"
      - "Children under 13"

  capabilities:
    - "Query ticket history"
    - "Summarize product documentation"
    - "Draft response templates"
    - "Escalate to human agent"
  
  limitations:
    - "May hallucinate product features"
    - "Limited to English language"
    - "No access to real-time inventory"

  training_data:
    sources: ["Historical tickets (anonymized)", "Product docs"]
    date_range: "2023-01 to 2025-12"
    known_biases: "Underrepresentation of enterprise tier issues"

  evaluation:
    accuracy: "92% on held-out test set"
    safety: "< 0.1% harmful output rate"
    fairness: "No significant demographic disparity detected"

  risks_and_mitigations:
    - risk: "PII exposure"
      mitigation: "PII scanner on all inputs/outputs"
    - risk: "Incorrect refund advice"
      mitigation: "Human approval for > $500"

  contacts:
    product_owner: "alice@example.com"
    technical_lead: "bob@example.com"
    risk_owner: "carol@example.com"`}</CodeBlock>
              </CardContent>
            </Card>

            <ToolkitDownloadButtons
              baseName="responsible-ai-governance-playbook"
              markdownLabel="Download Governance Playbook"
              excelLabel="Download Policy-Control Matrix (Excel)"
            />
          </TabsContent>

          {/* Review Rituals Tab */}
          <TabsContent value="rituals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardCheck className="w-5 h-5 text-blue-400" /> Governance Review Rituals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reviewRituals.map((ritual, i) => (
                    <div key={i} className="p-4 rounded-lg border bg-background/50">
                      <div className="flex items-center gap-3 mb-3">
                        <h4 className="font-semibold">{ritual.name}</h4>
                        <Badge variant="outline">{ritual.frequency}</Badge>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-2">Participants:</p>
                          <ul className="space-y-1">
                            {ritual.participants.map((p, j) => (
                              <li key={j} className="flex items-center gap-2 text-muted-foreground">
                                <Users className="w-3 h-3 text-blue-400" /> {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-2">Outputs:</p>
                          <ul className="space-y-1">
                            {ritual.outputs.map((o, j) => (
                              <li key={j} className="flex items-center gap-2 text-muted-foreground">
                                <FileText className="w-3 h-3 text-green-400" /> {o}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-2">Triggers:</p>
                          <ul className="space-y-1">
                            {ritual.triggers.map((t, j) => (
                              <li key={j} className="flex items-center gap-2 text-muted-foreground">
                                <AlertTriangle className="w-3 h-3 text-amber-400" /> {t}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pre-Launch Review Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="markdown">{`# Agent Pre-Launch Review Checklist

## Documentation (Required before review)
- [ ] Model card completed and current
- [ ] Risk assessment signed off
- [ ] Architecture diagram updated
- [ ] Runbook documented

## Technical Review
- [ ] Security review passed
- [ ] PII handling verified
- [ ] Rate limiting configured
- [ ] Monitoring/alerting in place
- [ ] Rollback procedure tested

## Safety & Quality
- [ ] Red team testing completed
- [ ] Bias evaluation passed
- [ ] Edge case testing documented
- [ ] Human escalation path verified

## Compliance
- [ ] Privacy review (DPO sign-off if PII)
- [ ] Legal review (if customer-facing)
- [ ] Regulatory requirements mapped
- [ ] Audit trail verified

## Approval
- [ ] Product owner sign-off
- [ ] Technical lead sign-off
- [ ] Risk owner sign-off
- [ ] Executive sponsor (if Tier 1)`}</CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Escalation Paths Tab */}
          <TabsContent value="escalation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Timer className="w-5 h-5 text-red-400" /> Escalation Ladder
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Pre-defined escalation paths with clear triggers, responders, and SLAs.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {escalationLevels.map((level) => (
                    <div 
                      key={level.level} 
                      className={`p-4 rounded-lg border ${
                        level.level >= 3 ? 'bg-red-500/5 border-red-500/20' : 'bg-background/50'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          level.level === 4 ? 'bg-red-500/20 text-red-400' :
                          level.level === 3 ? 'bg-amber-500/20 text-amber-400' :
                          level.level === 2 ? 'bg-blue-500/20 text-blue-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          L{level.level}
                        </div>
                        <div>
                          <h4 className="font-semibold">{level.name}</h4>
                          <p className="text-xs text-muted-foreground">{level.trigger}</p>
                        </div>
                        <Badge variant="outline" className="ml-auto">SLA: {level.sla}</Badge>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm pl-13">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">Responder:</p>
                          <p className="text-muted-foreground">{level.responder}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">Action:</p>
                          <p className="text-muted-foreground">{level.action}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Incident Response Playbook</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="markdown">{`# AI Incident Response Playbook

## Immediate Actions (First 30 min)
1. [ ] Assess severity using escalation ladder
2. [ ] Page appropriate responder
3. [ ] Open incident channel (e.g., #ai-incident-YYYYMMDD)
4. [ ] Evaluate kill switch activation
5. [ ] Preserve evidence (logs, screenshots, user reports)

## Investigation (1-4 hours)
1. [ ] Identify root cause category
   - Model behavior issue
   - Prompt injection attack
   - Data quality problem
   - Configuration error
2. [ ] Determine blast radius (users, data affected)
3. [ ] Document timeline of events
4. [ ] Identify immediate fixes

## Communication
- **Internal**: Update every 30 min in incident channel
- **Stakeholders**: Brief at each escalation level change
- **Users**: If affected, notify within regulatory SLA
- **Regulators**: If required, within legal timeline

## Post-Incident (Within 48 hours)
1. [ ] Complete incident report
2. [ ] Schedule blameless retrospective
3. [ ] Create remediation tickets
4. [ ] Update risk register
5. [ ] Adjust monitoring/alerting`}</CodeBlock>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-green-500/5 border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" /> Good Practices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-green-400" /> Document before building</li>
                    <li className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-green-400" /> Automate compliance checks</li>
                    <li className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-green-400" /> Practice escalation drills</li>
                    <li className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-green-400" /> Make evidence collection automatic</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-red-500/5 border-red-500/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" /> Anti-Patterns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><AlertCircle className="w-4 h-4 text-red-400" /> "We'll add governance later"</li>
                    <li className="flex items-center gap-2"><AlertCircle className="w-4 h-4 text-red-400" /> Manual-only compliance checks</li>
                    <li className="flex items-center gap-2"><AlertCircle className="w-4 h-4 text-red-400" /> Unclear escalation ownership</li>
                    <li className="flex items-center gap-2"><AlertCircle className="w-4 h-4 text-red-400" /> Evidence collected only during audits</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ConceptLayout>
  );
}









