import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FirstAidKit, Bank, Scales, GraduationCap, Factory, ShoppingCart, Buildings, Lightbulb, CheckCircle, Warning, Shield, Target, Brain, ChartLine, Lock } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface IndustryAgentsConceptProps {
  onMarkComplete?: () => void;
  onNavigateToNext?: (nextConceptId: string) => void;
}

const INDUSTRIES = [
  {
    id: "healthcare",
    name: "Healthcare",
    icon: <FirstAidKit className="w-5 h-5" />,
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-950/30",
    borderColor: "border-red-200 dark:border-red-800",
    overview: "AI agents in healthcare navigate strict regulations (HIPAA, FDA) while delivering clinical decision support, patient engagement, and administrative automation.",
    useCases: [
      { name: "Clinical Decision Support", description: "Assist physicians with differential diagnosis, drug interactions, and treatment recommendations", impact: "20-40% faster diagnosis" },
      { name: "Patient Intake & Triage", description: "Collect symptoms, prioritize urgency, route to appropriate care", impact: "50% reduction in wait times" },
      { name: "Medical Coding & Billing", description: "Automate ICD-10/CPT code assignment from clinical notes", impact: "30% fewer coding errors" },
      { name: "Prior Authorization", description: "Automate insurance pre-approval workflows", impact: "80% faster approvals" }
    ],
    regulations: ["HIPAA (PHI protection)", "FDA (medical device classification)", "21 CFR Part 11", "State licensing laws"],
    challenges: [
      "Liability: Who is responsible when an agent gives wrong medical advice?",
      "Explainability: Clinicians need to understand AI reasoning",
      "Integration: EHR systems (Epic, Cerner) have complex APIs",
      "Validation: Clinical validation studies required before deployment"
    ],
    patterns: [
      { pattern: "Human-in-the-loop mandatory", reason: "Clinical decisions require physician oversight" },
      { pattern: "Audit trail logging", reason: "Regulatory compliance requires full traceability" },
      { pattern: "Conservative confidence thresholds", reason: "High-stakes decisions need high certainty" },
      { pattern: "Staged rollout", reason: "Start with low-risk administrative tasks" }
    ]
  },
  {
    id: "finance",
    name: "Financial Services",
    icon: <Bank className="w-5 h-5" />,
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-950/30",
    borderColor: "border-green-200 dark:border-green-800",
    overview: "Financial agents handle sensitive transactions, regulatory compliance, and real-time market data while meeting strict security and audit requirements.",
    useCases: [
      { name: "Fraud Detection & Prevention", description: "Real-time transaction analysis and suspicious activity flagging", impact: "60% faster fraud detection" },
      { name: "Customer Service Automation", description: "Handle account inquiries, disputes, and routine transactions", impact: "70% deflection rate" },
      { name: "Regulatory Reporting", description: "Automate compliance reporting (SOX, Basel III)", impact: "90% reduction in manual work" },
      { name: "Investment Research", description: "Analyze filings, earnings calls, and market data", impact: "10x faster research coverage" }
    ],
    regulations: ["SOX", "PCI-DSS", "GDPR", "FINRA", "Basel III", "AML/KYC"],
    challenges: [
      "Security: Financial data is a prime target for attacks",
      "Latency: Trading systems require sub-millisecond responses",
      "Auditability: Every decision must be traceable for regulators",
      "Market manipulation: Agents must not create unfair advantages"
    ],
    patterns: [
      { pattern: "Zero-trust architecture", reason: "Assume breach; verify every action" },
      { pattern: "Real-time monitoring", reason: "Catch anomalies before they cause damage" },
      { pattern: "Dual-control for high-value actions", reason: "Large transactions need multiple approvals" },
      { pattern: "Sandboxed testing", reason: "Never test with production financial systems" }
    ]
  },
  {
    id: "legal",
    name: "Legal Services",
    icon: <Scales className="w-5 h-5" />,
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
    borderColor: "border-purple-200 dark:border-purple-800",
    overview: "Legal agents assist with document review, contract analysis, and research while navigating attorney-client privilege and unauthorized practice of law concerns.",
    useCases: [
      { name: "Contract Review & Analysis", description: "Extract key terms, flag risks, compare to standards", impact: "80% faster contract review" },
      { name: "Legal Research", description: "Find relevant case law, statutes, and precedents", impact: "5x more cases reviewed" },
      { name: "E-Discovery", description: "Process and categorize documents for litigation", impact: "90% cost reduction" },
      { name: "Due Diligence", description: "Analyze documents for M&A transactions", impact: "70% time savings" }
    ],
    regulations: ["Attorney-client privilege", "Unauthorized practice of law (UPL)", "Bar association ethics rules", "GDPR/CCPA for client data"],
    challenges: [
      "UPL concerns: Agents cannot give legal advice without attorney supervision",
      "Privilege: Ensure agent interactions don't waive attorney-client privilege",
      "Accuracy: Legal citations must be verified (hallucination is dangerous)",
      "Jurisdiction: Laws vary by state/country"
    ],
    patterns: [
      { pattern: "Lawyer-supervised output", reason: "All client-facing output reviewed by attorney" },
      { pattern: "Citation verification", reason: "Every case/statute citation must be validated" },
      { pattern: "Confidence scoring", reason: "Flag uncertain analysis for human review" },
      { pattern: "Jurisdiction awareness", reason: "Apply correct laws based on matter jurisdiction" }
    ]
  },
  {
    id: "education",
    name: "Education",
    icon: <GraduationCap className="w-5 h-5" />,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    borderColor: "border-blue-200 dark:border-blue-800",
    overview: "Educational agents personalize learning, provide tutoring, and assist educators while addressing academic integrity and age-appropriate content concerns.",
    useCases: [
      { name: "Personalized Tutoring", description: "Adapt explanations to student's level and learning style", impact: "30% improvement in outcomes" },
      { name: "Automated Grading", description: "Grade essays and provide feedback at scale", impact: "80% time savings for teachers" },
      { name: "Content Creation", description: "Generate lesson plans, quizzes, and study materials", impact: "50% faster curriculum development" },
      { name: "Student Support", description: "Answer questions 24/7, identify struggling students", impact: "3x faster support response" }
    ],
    regulations: ["FERPA (student privacy)", "COPPA (children's privacy)", "Accessibility (ADA/WCAG)", "State ed-tech laws"],
    challenges: [
      "Academic integrity: How to prevent and detect AI-assisted cheating?",
      "Age-appropriate content: Filter and safety for K-12 students",
      "Equity: Ensure AI benefits don't widen achievement gaps",
      "Teacher replacement fears: Position as augmentation, not replacement"
    ],
    patterns: [
      { pattern: "Scaffolded responses", reason: "Guide students to answers rather than giving them directly" },
      { pattern: "Content filtering", reason: "Age-appropriate guardrails for student-facing agents" },
      { pattern: "Progress tracking", reason: "Feed insights back to teachers and parents" },
      { pattern: "Socratic questioning", reason: "Promote critical thinking over rote answers" }
    ]
  },
  {
    id: "manufacturing",
    name: "Manufacturing & Supply Chain",
    icon: <Factory className="w-5 h-5" />,
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
    borderColor: "border-orange-200 dark:border-orange-800",
    overview: "Manufacturing agents optimize production, predict maintenance, and manage supply chains while integrating with OT systems and ensuring safety.",
    useCases: [
      { name: "Predictive Maintenance", description: "Forecast equipment failures before they occur", impact: "40% reduction in downtime" },
      { name: "Quality Control", description: "Detect defects and anomalies in real-time", impact: "50% fewer defects shipped" },
      { name: "Supply Chain Optimization", description: "Optimize inventory, routing, and demand planning", impact: "20% inventory reduction" },
      { name: "Production Scheduling", description: "Optimize machine utilization and job sequencing", impact: "15% throughput increase" }
    ],
    regulations: ["OSHA (worker safety)", "ISO 9001/14001", "Industry-specific (FDA for pharma, FAA for aerospace)", "Environmental regulations"],
    challenges: [
      "OT/IT integration: Legacy systems with proprietary protocols",
      "Real-time requirements: Millisecond decisions for control systems",
      "Safety-critical: Wrong decisions can harm workers",
      "Data quality: Sensor data can be noisy or incomplete"
    ],
    patterns: [
      { pattern: "Edge deployment", reason: "Latency requirements demand local processing" },
      { pattern: "Fail-safe defaults", reason: "On agent failure, system goes to safe state" },
      { pattern: "Human override", reason: "Operators can always take manual control" },
      { pattern: "Simulation testing", reason: "Test in digital twin before production" }
    ]
  },
  {
    id: "retail",
    name: "Retail & E-Commerce",
    icon: <ShoppingCart className="w-5 h-5" />,
    color: "text-pink-500",
    bgColor: "bg-pink-50 dark:bg-pink-950/30",
    borderColor: "border-pink-200 dark:border-pink-800",
    overview: "Retail agents drive personalization, customer service, and commerce automation while handling high volumes and diverse customer expectations.",
    useCases: [
      { name: "Personal Shopping Assistants", description: "Recommend products based on preferences and behavior", impact: "25% increase in conversion" },
      { name: "Customer Service", description: "Handle returns, order status, and product questions", impact: "80% of inquiries resolved without human" },
      { name: "Inventory Management", description: "Predict demand and optimize stock levels", impact: "30% reduction in stockouts" },
      { name: "Dynamic Pricing", description: "Optimize prices based on demand and competition", impact: "10% margin improvement" }
    ],
    regulations: ["CCPA/GDPR (consumer privacy)", "FTC (advertising claims)", "ADA (accessibility)", "State consumer protection laws"],
    challenges: [
      "Scale: Handle millions of concurrent sessions during peak",
      "Personalization vs privacy: Balance recommendations with data minimization",
      "Brand voice: Maintain consistent personality across channels",
      "Returns abuse: Detect and prevent policy exploitation"
    ],
    patterns: [
      { pattern: "A/B testing at scale", reason: "Continuously optimize agent behaviors" },
      { pattern: "Graceful degradation", reason: "Peak traffic shouldn't break the experience" },
      { pattern: "Omnichannel consistency", reason: "Same agent personality across web, app, chat" },
      { pattern: "Fraud detection integration", reason: "Block suspicious transactions early" }
    ]
  }
];

export default function IndustryAgentsConcept({ onMarkComplete, onNavigateToNext }: IndustryAgentsConceptProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedIndustry, setSelectedIndustry] = useState("healthcare");

  const tabs = [
    { id: "overview", label: "Overview", icon: <Buildings className="w-4 h-4" /> },
    { id: "deep-dive", label: "Deep Dive", icon: <Brain className="w-4 h-4" /> },
    { id: "patterns", label: "Cross-Industry Patterns", icon: <Target className="w-4 h-4" /> }
  ];

  const currentIndustry = INDUSTRIES.find(i => i.id === selectedIndustry)!;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border border-border/50 bg-background/60 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Buildings className="w-6 h-6" />
            Industry-Specific Agent Patterns
          </CardTitle>
          <CardDescription>
            Domain-specific knowledge for deploying agents in Healthcare, Finance, Legal, Education, Manufacturing, and Retail.
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex items-center gap-1.5 text-xs sm:text-sm data-[state=active]:bg-background"
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Buildings className="w-5 h-5" />
                Why Industry Matters for Agents
              </CardTitle>
              <CardDescription>
                The same agent architecture behaves very differently in healthcare vs retail.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Real-World Analogy */}
              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Think: Same Tool, Different Safety Rules
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  A chainsaw works the same way whether you're a homeowner trimming branches or a professional 
                  lumberjack. But the safety protocols, training requirements, and liability considerations are 
                  completely different. AI agents are the same—the technology is generic, but deployment 
                  requirements are industry-specific.
                </p>
              </div>

              {/* Industry Cards Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {INDUSTRIES.map((industry) => (
                  <div
                    key={industry.id}
                    className={cn(
                      "p-4 rounded-lg border cursor-pointer transition-all",
                      industry.bgColor,
                      industry.borderColor,
                      selectedIndustry === industry.id && "ring-2 ring-primary"
                    )}
                    onClick={() => {
                      setSelectedIndustry(industry.id);
                      setActiveTab("deep-dive");
                    }}
                  >
                    <div className={cn("flex items-center gap-2 mb-2", industry.color)}>
                      {industry.icon}
                      <h4 className="font-semibold">{industry.name}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{industry.overview}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {industry.useCases.slice(0, 2).map((uc, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {uc.name}
                        </Badge>
                      ))}
                      {industry.useCases.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{industry.useCases.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Deep Dive Tab */}
        <TabsContent value="deep-dive" className="space-y-6">
          {/* Industry Selector */}
          <div className="flex flex-wrap gap-2">
            {INDUSTRIES.map((industry) => (
              <button
                key={industry.id}
                onClick={() => setSelectedIndustry(industry.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  selectedIndustry === industry.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                {industry.icon}
                {industry.name}
              </button>
            ))}
          </div>

          <Card className={cn(currentIndustry.bgColor, currentIndustry.borderColor)}>
            <CardHeader>
              <CardTitle className={cn("flex items-center gap-2", currentIndustry.color)}>
                {currentIndustry.icon}
                {currentIndustry.name} Agents
              </CardTitle>
              <CardDescription>{currentIndustry.overview}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Use Cases */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4" /> Key Use Cases
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {currentIndustry.useCases.map((uc, idx) => (
                    <div key={idx} className="p-3 bg-background rounded-lg border">
                      <div className="font-medium text-sm">{uc.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{uc.description}</div>
                      <Badge variant="secondary" className="mt-2 text-xs">
                        <ChartLine className="w-3 h-3 mr-1" />
                        {uc.impact}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Regulations */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Regulatory Landscape
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentIndustry.regulations.map((reg, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      <Lock className="w-3 h-3 mr-1" />
                      {reg}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Challenges */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Warning className="w-4 h-4 text-yellow-500" /> Industry-Specific Challenges
                </h4>
                <div className="space-y-2">
                  {currentIndustry.challenges.map((challenge, idx) => (
                    <div key={idx} className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <span className="text-sm">{challenge}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Patterns */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" /> Recommended Patterns
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {currentIndustry.patterns.map((pattern, idx) => (
                    <div key={idx} className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="font-medium text-sm text-green-800 dark:text-green-200">{pattern.pattern}</div>
                      <div className="text-xs text-green-700 dark:text-green-300 mt-1">{pattern.reason}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cross-Industry Patterns Tab */}
        <TabsContent value="patterns" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Universal Patterns Across Industries
              </CardTitle>
              <CardDescription>
                Patterns that apply to every regulated industry
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  pattern: "Human-in-the-Loop for High-Stakes Decisions",
                  applies: ["Healthcare", "Finance", "Legal"],
                  implementation: "Require human approval for decisions above risk threshold",
                  why: "Liability, regulations, and user trust all demand human oversight for critical actions"
                },
                {
                  pattern: "Complete Audit Trail",
                  applies: ["All Industries"],
                  implementation: "Log every input, decision, tool call, and output with timestamps and user IDs",
                  why: "Regulatory compliance, incident investigation, and continuous improvement all need full traceability"
                },
                {
                  pattern: "Graceful Degradation",
                  applies: ["Healthcare", "Manufacturing", "Retail"],
                  implementation: "Define fallback behaviors when agent fails or confidence is low",
                  why: "Critical systems cannot simply crash; they must fail safely"
                },
                {
                  pattern: "Domain Expert Validation",
                  applies: ["Healthcare", "Legal", "Finance"],
                  implementation: "Have domain experts review agent outputs before deployment",
                  why: "AI can miss domain nuances that experts catch immediately"
                },
                {
                  pattern: "Staged Rollout",
                  applies: ["All Industries"],
                  implementation: "Start with low-risk use cases, expand after proving value",
                  why: "Builds trust, catches issues early, creates internal champions"
                },
                {
                  pattern: "Explainable Outputs",
                  applies: ["Healthcare", "Finance", "Legal"],
                  implementation: "Include reasoning chain and citations in agent responses",
                  why: "Users need to understand and verify agent recommendations"
                }
              ].map((pattern, idx) => (
                <div key={idx} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-semibold">{pattern.pattern}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{pattern.implementation}</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {pattern.applies.map((industry, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {industry}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 p-2 bg-muted/50 rounded text-sm">
                    <span className="font-medium">Why: </span>
                    <span className="text-muted-foreground">{pattern.why}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Industry Selection Guide */}
          <Card>
            <CardHeader>
              <CardTitle>Where Should You Start?</CardTitle>
              <CardDescription>Match your background to the right industry focus</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { background: "Healthcare/Life Sciences experience", recommend: "Healthcare agents", reason: "Domain knowledge is the moat" },
                  { background: "Banking/Fintech background", recommend: "Financial services agents", reason: "Regulatory expertise is valuable" },
                  { background: "E-commerce/Retail experience", recommend: "Retail agents", reason: "Fastest path to production at scale" },
                  { background: "Enterprise software background", recommend: "Cross-industry platform", reason: "Build horizontal agent infrastructure" }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="text-sm font-medium">{item.background}</div>
                    <div className="text-primary font-semibold mt-1">→ {item.recommend}</div>
                    <div className="text-xs text-muted-foreground mt-2">{item.reason}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
