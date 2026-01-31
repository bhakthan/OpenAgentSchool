import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Building2, 
  GraduationCap, 
  Target, 
  TrendingUp, 
  Shield, 
  Lightbulb, 
  CheckCircle,
  AlertTriangle,
  Layers,
  Network,
  BookOpen,
  Award,
  BarChart3,
  MessageSquare,
  Zap,
  Clock
} from "lucide-react";
import ConceptLayout from "./ConceptLayout";
import CodeBlock from "@/components/ui/CodeBlock";
import ToolkitDownloadButtons from "./ToolkitDownloadButtons";

interface OperatingModel {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  bestFor: string[];
  tradeoffs: { pros: string[]; cons: string[] };
  structure: string;
}

interface MaturityLevel {
  level: number;
  name: string;
  description: string;
  characteristics: string[];
  nextSteps: string[];
  color: string;
}

interface RolePathway {
  id: string;
  title: string;
  description: string;
  skills: string[];
  certifications: string[];
  timeline: string;
}

const operatingModels: OperatingModel[] = [
  {
    id: "centralized-coe",
    name: "Centralized CoE",
    icon: <Building2 className="w-6 h-6" />,
    description: "A dedicated Center of Excellence owns all agent development, governance, and deployment. Business units consume agent services.",
    bestFor: [
      "Highly regulated industries (finance, healthcare)",
      "Organizations new to AI agents",
      "Companies requiring strict governance",
      "Enterprises with shared service models"
    ],
    tradeoffs: {
      pros: [
        "Consistent standards and quality",
        "Centralized expertise and governance",
        "Easier compliance and audit",
        "Reduced duplication of effort"
      ],
      cons: [
        "Potential bottleneck for requests",
        "May feel distant from business needs",
        "Slower response to department-specific needs",
        "Risk of ivory tower syndrome"
      ]
    },
    structure: `┌─────────────────────────────────────────┐
│           Executive Sponsor             │
│         (CTO / Chief AI Officer)        │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         AI Center of Excellence         │
│  ┌─────────┬─────────┬─────────────┐    │
│  │Platform │Governance│ Enablement │    │
│  │  Team   │  Team   │    Team    │    │
│  └─────────┴─────────┴─────────────┘    │
└─────────────────┬───────────────────────┘
                  │ Services
    ┌─────────────┼─────────────┐
    ▼             ▼             ▼
┌───────┐    ┌───────┐    ┌───────┐
│Sales  │    │Support│    │Finance│
│Agents │    │Agents │    │Agents │
└───────┘    └───────┘    └───────┘`
  },
  {
    id: "federated",
    name: "Federated Model",
    icon: <Network className="w-6 h-6" />,
    description: "Business units own their agent development with light central governance. Central team provides guardrails, tools, and standards.",
    bestFor: [
      "Large enterprises with diverse business units",
      "Organizations with strong domain expertise",
      "Companies valuing speed over consistency",
      "Mature AI organizations"
    ],
    tradeoffs: {
      pros: [
        "Faster time-to-value for BUs",
        "Domain expertise embedded in teams",
        "Higher business ownership",
        "Parallel development capacity"
      ],
      cons: [
        "Potential for inconsistent quality",
        "Duplication of effort across BUs",
        "Harder to enforce governance",
        "Skills gaps in some teams"
      ]
    },
    structure: `┌─────────────────────────────────────────┐
│         Central AI Governance           │
│   (Standards, Platform, Guardrails)     │
└───────┬─────────────┬───────────────────┘
        │   Guardrails│
   ┌────▼────┐   ┌────▼────┐   ┌─────────┐
   │ Sales   │   │ Support │   │ Finance │
   │   AI    │   │   AI    │   │   AI    │
   │  Team   │   │  Team   │   │  Team   │
   │ (5 FTE) │   │ (3 FTE) │   │ (2 FTE) │
   └────┬────┘   └────┬────┘   └────┬────┘
        │             │             │
   ┌────▼────┐   ┌────▼────┐   ┌────▼────┐
   │ SDR Bot │   │ Ticket  │   │ Invoice │
   │ Outreach│   │ Triage  │   │ Agent   │
   └─────────┘   └─────────┘   └─────────┘`
  },
  {
    id: "hybrid",
    name: "Hybrid Hub & Spoke",
    icon: <Layers className="w-6 h-6" />,
    description: "Central platform team provides infrastructure and governance while embedded AI champions in each BU drive adoption and customization.",
    bestFor: [
      "Mid-to-large organizations",
      "Companies balancing speed and governance",
      "Organizations with varying AI maturity across BUs",
      "Those scaling from pilot to enterprise"
    ],
    tradeoffs: {
      pros: [
        "Best of both worlds",
        "Scalable governance",
        "Domain expertise + central standards",
        "Clear escalation paths"
      ],
      cons: [
        "Requires strong coordination",
        "Dual reporting complexity",
        "Champion network needs investment",
        "Role clarity can be challenging"
      ]
    },
    structure: `┌─────────────────────────────────────────┐
│         Central Platform Team           │
│  (Infrastructure, Security, Standards)  │
└───────────────────┬─────────────────────┘
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
   ┌─────────┐ ┌─────────┐ ┌─────────┐
   │ Sales   │ │ Support │ │ Finance │
   │ Champion│ │ Champion│ │ Champion│
   │   ⭐    │ │   ⭐    │ │   ⭐    │
   └────┬────┘ └────┬────┘ └────┬────┘
        │           │           │
   ┌────▼────┐ ┌────▼────┐ ┌────▼────┐
   │ Local   │ │ Local   │ │ Local   │
   │ Agents  │ │ Agents  │ │ Agents  │
   └─────────┘ └─────────┘ └─────────┘

⭐ = AI Champion (embedded, dual-report)`
  }
];

const maturityLevels: MaturityLevel[] = [
  {
    level: 1,
    name: "Ad-hoc",
    description: "Individual experimentation with AI agents. No formal governance or strategy.",
    characteristics: [
      "Shadow AI usage by individuals",
      "No centralized visibility",
      "Inconsistent tool choices",
      "No shared learnings"
    ],
    nextSteps: [
      "Conduct AI usage audit",
      "Identify pilot use cases",
      "Establish governance basics",
      "Appoint AI sponsor"
    ],
    color: "bg-red-500"
  },
  {
    level: 2,
    name: "Exploring",
    description: "Formal pilots underway with executive sponsorship. Basic governance emerging.",
    characteristics: [
      "2-3 sanctioned pilots",
      "Pilot governance in place",
      "Learning captured informally",
      "Dedicated pilot team"
    ],
    nextSteps: [
      "Define success metrics",
      "Create playbooks from pilots",
      "Build business case for scaling",
      "Identify champion candidates"
    ],
    color: "bg-orange-500"
  },
  {
    level: 3,
    name: "Scaling",
    description: "Multiple production agents with defined operating model and growing capability.",
    characteristics: [
      "5-10 agents in production",
      "Operating model defined",
      "Training programs active",
      "CoE or equivalent exists"
    ],
    nextSteps: [
      "Mature platform capabilities",
      "Expand champion network",
      "Automate governance checks",
      "Build reusable components"
    ],
    color: "bg-yellow-500"
  },
  {
    level: 4,
    name: "Optimizing",
    description: "Agents are core to operations. Continuous improvement culture established.",
    characteristics: [
      "20+ agents in production",
      "Measurable business impact",
      "Self-service capabilities",
      "Automated compliance"
    ],
    nextSteps: [
      "Multi-agent orchestration",
      "Advanced analytics",
      "External agent integration",
      "Industry leadership"
    ],
    color: "bg-green-500"
  },
  {
    level: 5,
    name: "Leading",
    description: "AI agents are competitive advantage. Organization shapes industry practices.",
    characteristics: [
      "Agents drive strategy",
      "Industry benchmark setter",
      "Innovation pipeline",
      "Agent-first culture"
    ],
    nextSteps: [
      "Publish thought leadership",
      "Contribute to standards",
      "Acquire/build AI talent",
      "Explore new frontiers"
    ],
    color: "bg-purple-500"
  }
];

const rolePathways: RolePathway[] = [
  {
    id: "prompt-engineer",
    title: "Prompt Engineer",
    description: "Design and optimize prompts for agent behavior, safety, and performance.",
    skills: [
      "Prompt engineering patterns",
      "LLM behavior understanding",
      "Evaluation and testing",
      "Safety and alignment basics"
    ],
    certifications: [
      "DeepLearning.AI Prompt Engineering",
      "OpenAI Prompt Engineering Guide",
      "Internal Prompt Standards Cert"
    ],
    timeline: "3-6 months"
  },
  {
    id: "agent-developer",
    title: "Agent Developer",
    description: "Build, test, and deploy AI agents using frameworks and platforms.",
    skills: [
      "Python / TypeScript",
      "LangChain / LangGraph / Semantic Kernel",
      "Tool integration and APIs",
      "Testing and evaluation"
    ],
    certifications: [
      "Microsoft AI-102",
      "Google Cloud AI Engineer",
      "LangChain Certified Developer"
    ],
    timeline: "6-12 months"
  },
  {
    id: "ai-champion",
    title: "AI Champion",
    description: "Bridge between central AI team and business unit. Drive adoption and gather requirements.",
    skills: [
      "Business domain expertise",
      "AI literacy and use case identification",
      "Change management",
      "Stakeholder communication"
    ],
    certifications: [
      "AI for Business Leaders",
      "Change Management (PROSCI)",
      "Internal Champion Certification"
    ],
    timeline: "3-6 months"
  },
  {
    id: "ai-architect",
    title: "AI/Agent Architect",
    description: "Design enterprise-scale agent systems with security, observability, and governance.",
    skills: [
      "Multi-agent architectures",
      "Security and compliance",
      "Cloud infrastructure",
      "Performance optimization"
    ],
    certifications: [
      "AWS/Azure/GCP AI Specialty",
      "TOGAF / Solution Architecture",
      "AI Security certification"
    ],
    timeline: "12-24 months"
  }
];

const kpiFramework = {
  adoption: [
    { metric: "Active agent users", target: "80% of target population", frequency: "Monthly" },
    { metric: "Agent sessions per user", target: "> 5 sessions/week", frequency: "Weekly" },
    { metric: "Use case coverage", target: "Top 10 use cases deployed", frequency: "Quarterly" }
  ],
  quality: [
    { metric: "Task completion rate", target: "> 90%", frequency: "Weekly" },
    { metric: "User satisfaction (CSAT)", target: "> 4.2/5", frequency: "Monthly" },
    { metric: "Hallucination/error rate", target: "< 2%", frequency: "Weekly" }
  ],
  efficiency: [
    { metric: "Time saved per task", target: "> 50% reduction", frequency: "Monthly" },
    { metric: "Cost per resolution", target: "> 30% reduction", frequency: "Monthly" },
    { metric: "Agent-handled percentage", target: "> 60% of eligible tasks", frequency: "Weekly" }
  ],
  governance: [
    { metric: "Policy compliance rate", target: "100%", frequency: "Continuous" },
    { metric: "Security incidents", target: "0 critical", frequency: "Real-time" },
    { metric: "Audit readiness score", target: "> 95%", frequency: "Quarterly" }
  ]
};

/**
 * Organizational Enablement: operating models, talent strategy, and incentives for 2026.
 */
export default function OrganizationalEnablementConcept() {
  const [selectedModel, setSelectedModel] = useState(operatingModels[2]); // Default to Hybrid
  const [selectedRole, setSelectedRole] = useState(rolePathways[0]);

  return (
    <ConceptLayout
      conceptId="organizational-enablement"
      title="Organizational Enablement"
      description="Design human systems that sustain agent programs: operating models, talent strategy, governance, and incentives for 2026 and beyond."
    >
      <div className="space-y-8">
        {/* Hero Card */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary/20 text-primary">2026 Update</Badge>
                  <Badge variant="outline">Enterprise Ready</Badge>
                </div>
                <h3 className="text-2xl font-bold">
                  From AI Pilots to Enterprise-Scale Agent Programs
                </h3>
                <p className="text-muted-foreground">
                  In 2026, the difference between AI leaders and laggards isn't technology—it's organizational design. 
                  Learn how to structure teams, build capabilities, and create incentives that make agent adoption stick.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="outline" className="bg-blue-500/10">Operating Models</Badge>
                  <Badge variant="outline" className="bg-green-500/10">Talent Development</Badge>
                  <Badge variant="outline" className="bg-purple-500/10">Governance</Badge>
                  <Badge variant="outline" className="bg-orange-500/10">Change Management</Badge>
                </div>
              </div>
              <div className="flex flex-col gap-3 min-w-[200px]">
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="text-2xl font-bold text-blue-400">73%</div>
                  <div className="text-xs text-muted-foreground">of AI projects fail due to org factors</div>
                </div>
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="text-2xl font-bold text-green-400">4.2x</div>
                  <div className="text-xs text-muted-foreground">ROI with proper enablement</div>
                </div>
                <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <div className="text-2xl font-bold text-purple-400">18 mo</div>
                  <div className="text-xs text-muted-foreground">avg time to scale with CoE</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="models" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="models">Operating Models</TabsTrigger>
            <TabsTrigger value="maturity">Maturity Model</TabsTrigger>
            <TabsTrigger value="talent">Talent & Roles</TabsTrigger>
            <TabsTrigger value="kpis">KPIs & Incentives</TabsTrigger>
            <TabsTrigger value="change">Change Mgmt</TabsTrigger>
          </TabsList>

          {/* Operating Models Tab */}
          <TabsContent value="models" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {operatingModels.map((model) => (
                <Card
                  key={model.id}
                  className={`cursor-pointer transition-all hover:border-blue-500/50 ${
                    selectedModel.id === model.id ? 'border-blue-500 bg-blue-500/5' : ''
                  }`}
                  onClick={() => setSelectedModel(model)}
                >
                  <CardContent className="pt-4">
                    <div className="flex justify-center mb-2 text-blue-400">
                      {model.icon}
                    </div>
                    <h4 className="font-medium text-center">{model.name}</h4>
                    <p className="text-xs text-muted-foreground text-center mt-1">
                      {model.description.slice(0, 60)}...
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                    {selectedModel.icon}
                  </div>
                  <div>
                    <CardTitle>{selectedModel.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{selectedModel.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-400" /> Best For
                    </h4>
                    <ul className="space-y-2">
                      {selectedModel.bestFor.map((item, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 text-green-400 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" /> Advantages
                      </h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        {selectedModel.tradeoffs.pros.map((pro, i) => (
                          <li key={i}>• {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-amber-400 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> Considerations
                      </h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        {selectedModel.tradeoffs.cons.map((con, i) => (
                          <li key={i}>• {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Layers className="w-4 h-4" /> Organizational Structure
                  </h4>
                  <pre className="text-xs bg-black/50 p-4 rounded-lg overflow-x-auto font-mono text-green-400">
                    {selectedModel.structure}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Maturity Model Tab */}
          <TabsContent value="maturity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  AI Agent Maturity Model (2026)
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Assess your organization's current state and plan your journey to AI agent excellence.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {maturityLevels.map((level) => (
                    <div key={level.level} className="flex gap-4 p-4 rounded-lg border bg-background/50">
                      <div className={`w-12 h-12 rounded-full ${level.color} flex items-center justify-center text-white font-bold text-lg shrink-0`}>
                        {level.level}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{level.name}</h4>
                          <Badge variant="outline" className="text-xs">{level.description.split('.')[0]}</Badge>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">Characteristics:</p>
                            <ul className="space-y-1">
                              {level.characteristics.map((c, i) => (
                                <li key={i} className="text-muted-foreground">• {c}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">Next Steps:</p>
                            <ul className="space-y-1">
                              {level.nextSteps.map((s, i) => (
                                <li key={i} className="text-muted-foreground">• {s}</li>
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
                <CardTitle className="text-lg">Self-Assessment Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="font-medium mb-1">📊 How many AI agents are in production today?</p>
                    <p className="text-muted-foreground text-xs">0 = Level 1, 2-5 = Level 2, 5-10 = Level 3, 10+ = Level 4+</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="font-medium mb-1">🏢 Is there a formal AI governance body?</p>
                    <p className="text-muted-foreground text-xs">No = Level 1-2, Emerging = Level 3, Mature = Level 4+</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="font-medium mb-1">👥 What percentage of staff have AI training?</p>
                    <p className="text-muted-foreground text-xs">&lt;10% = Level 1, 10-30% = Level 2-3, &gt;50% = Level 4+</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="font-medium mb-1">📈 Can you measure agent ROI?</p>
                    <p className="text-muted-foreground text-xs">No = Level 1-2, Partially = Level 3, Fully = Level 4+</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Talent & Roles Tab */}
          <TabsContent value="talent" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {rolePathways.map((role) => (
                <Card
                  key={role.id}
                  className={`cursor-pointer transition-all hover:border-green-500/50 ${
                    selectedRole.id === role.id ? 'border-green-500 bg-green-500/5' : ''
                  }`}
                  onClick={() => setSelectedRole(role)}
                >
                  <CardContent className="pt-4 text-center">
                    <GraduationCap className="w-6 h-6 mx-auto mb-2 text-green-400" />
                    <h4 className="font-medium text-sm">{role.title}</h4>
                    <Badge variant="outline" className="mt-2 text-xs">{role.timeline}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle>{selectedRole.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{selectedRole.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-400" /> Core Skills
                    </h4>
                    <ul className="space-y-2">
                      {selectedRole.skills.map((skill, i) => (
                        <li key={i} className="text-sm flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-400" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4 text-purple-400" /> Recommended Certifications
                    </h4>
                    <ul className="space-y-2">
                      {selectedRole.certifications.map((cert, i) => (
                        <li key={i} className="text-sm flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-purple-400" />
                          {cert}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="font-medium text-sm">Development Timeline:</span>
                    <span className="text-sm text-muted-foreground">{selectedRole.timeline}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5" /> 2026 Team Composition Benchmark
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="p-4 rounded-lg bg-muted/30">
                    <h4 className="font-medium mb-2">Small Team (5-10 agents)</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• 1 AI Lead / Architect</li>
                      <li>• 2-3 Agent Developers</li>
                      <li>• 1 Prompt Engineer</li>
                      <li>• 2-3 AI Champions (part-time)</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <h4 className="font-medium mb-2">Medium Team (10-30 agents)</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• 1 AI Director</li>
                      <li>• 2 Architects</li>
                      <li>• 5-8 Agent Developers</li>
                      <li>• 2 Prompt Engineers</li>
                      <li>• 1 AI Ops/SRE</li>
                      <li>• 5-8 Champions (embedded)</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <h4 className="font-medium mb-2">Large Team (30+ agents)</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Chief AI Officer</li>
                      <li>• Platform Team (5-8)</li>
                      <li>• Governance Team (3-5)</li>
                      <li>• Enablement Team (3-5)</li>
                      <li>• Embedded teams per BU</li>
                      <li>• Champion network (10+)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* KPIs & Incentives Tab */}
          <TabsContent value="kpis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  Agent Program KPI Framework
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Balanced metrics across adoption, quality, efficiency, and governance dimensions.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(kpiFramework).map(([category, metrics]) => (
                    <div key={category} className="space-y-3">
                      <h4 className="font-medium capitalize flex items-center gap-2">
                        {category === 'adoption' && <Users className="w-4 h-4 text-blue-400" />}
                        {category === 'quality' && <CheckCircle className="w-4 h-4 text-green-400" />}
                        {category === 'efficiency' && <Zap className="w-4 h-4 text-yellow-400" />}
                        {category === 'governance' && <Shield className="w-4 h-4 text-purple-400" />}
                        {category}
                      </h4>
                      <div className="space-y-2">
                        {metrics.map((m, i) => (
                          <div key={i} className="p-2 rounded bg-muted/30 text-sm">
                            <div className="flex justify-between">
                              <span className="font-medium">{m.metric}</span>
                              <Badge variant="outline" className="text-xs">{m.frequency}</Badge>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">Target: {m.target}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5" /> Incentive Alignment Examples
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                    <h4 className="font-medium mb-2 text-green-400">✓ Good Incentives</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Reward agent adoption + quality metrics together</li>
                      <li>• Tie bonuses to customer satisfaction improvement</li>
                      <li>• Recognize champions publicly</li>
                      <li>• Career path progression for AI skills</li>
                      <li>• Team-level goals for collaboration</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                    <h4 className="font-medium mb-2 text-red-400">✗ Anti-Patterns</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Rewarding only speed/volume (ignoring quality)</li>
                      <li>• Penalizing errors without learning culture</li>
                      <li>• No recognition for AI contributions</li>
                      <li>• Conflicting metrics between teams</li>
                      <li>• Short-term focus over sustainable adoption</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Change Management Tab */}
          <TabsContent value="change" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-orange-400" />
                  Change Management Playbook
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-blue-400" /> Awareness
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Executive town halls</li>
                      <li>• Success story showcases</li>
                      <li>• Internal newsletter</li>
                      <li>• Demo Fridays</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-green-400" /> Enablement
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Role-based training tracks</li>
                      <li>• Hands-on workshops</li>
                      <li>• Certification programs</li>
                      <li>• Mentoring pairs</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-purple-400" /> Reinforcement
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Champion network meetings</li>
                      <li>• Quarterly reviews</li>
                      <li>• Adoption dashboards</li>
                      <li>• Recognition programs</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Communication Rhythm</h4>
                  <CodeBlock language="yaml">{`# Change Management Communication Calendar 2026

weekly:
  - "Demo Friday" - Live agent demos (30 min)
  - Champion Slack channel updates
  - Adoption metrics in team standups

monthly:
  - AI Newsletter with success stories
  - Champion network sync (1 hr)
  - Executive dashboard review

quarterly:
  - All-hands AI update (CEO/CTO)
  - Training completion reviews
  - Roadmap planning sessions
  - External speaker series

annually:
  - AI Strategy refresh
  - Maturity assessment
  - Talent planning
  - Budget review`}</CodeBlock>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Overcoming Common Resistance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5" />
                      <div>
                        <p className="font-medium">"AI will replace my job"</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Response: Focus on augmentation messaging. Show examples where agents handle tedious work, 
                          freeing humans for higher-value tasks. Create career paths that reward AI collaboration.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5" />
                      <div>
                        <p className="font-medium">"I don't have time to learn new tools"</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Response: Provide dedicated learning time (e.g., 4 hrs/month). Start with quick-win 
                          use cases that save time immediately. Offer just-in-time microlearning.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5" />
                      <div>
                        <p className="font-medium">"The agents make mistakes"</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Response: Set realistic expectations—agents are tools, not replacements. Implement 
                          human-in-the-loop for critical decisions. Share error rates and improvement trends.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Downloads Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5" /> Toolkit Downloads
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Download templates and playbooks to accelerate your organizational enablement journey.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <ToolkitDownloadButtons
                baseName="enablement-roadmap-canvas"
                markdownLabel="Enablement Roadmap Canvas (MD)"
                excelLabel="Enablement Roadmap Canvas (Excel)"
              />
              <ToolkitDownloadButtons
                baseName="maturity-assessment"
                markdownLabel="Maturity Assessment Template"
                excelLabel="Maturity Scorecard (Excel)"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </ConceptLayout>
  );
}
