import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Briefcase, TrendUp, Certificate, Users, Code, Brain, ChartLine, Target, Lightbulb, ArrowRight, CheckCircle, Star, Book } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface AgentCareerPathsConceptProps {
  onMarkComplete?: () => void;
  onNavigateToNext?: (nextConceptId: string) => void;
}

const CAREER_ROLES = [
  {
    role: "Prompt Engineer",
    level: "Entry-Mid",
    salary: "$80K-150K",
    demand: "Very High",
    description: "Design, test, and optimize prompts for agent behaviors and reliability",
    skills: ["Prompt design patterns", "Evaluation methodology", "A/B testing", "Token optimization"],
    dayToDay: ["Craft system prompts", "Run evals against golden sets", "Debug failure modes", "Collaborate with product on UX"],
    growth: "→ Senior Prompt Engineer → Agent Architect"
  },
  {
    role: "Agent Developer",
    level: "Mid-Senior",
    salary: "$120K-200K",
    demand: "High",
    description: "Build agent applications using frameworks like LangChain, AutoGen, or custom solutions",
    skills: ["Python/TypeScript", "Agent frameworks", "Tool integration", "MCP/A2A protocols"],
    dayToDay: ["Implement agent workflows", "Build tool integrations", "Set up observability", "Deploy to production"],
    growth: "→ Staff Engineer → Principal Agent Engineer"
  },
  {
    role: "Agent Architect",
    level: "Senior-Principal",
    salary: "$180K-300K",
    demand: "High",
    description: "Design agent systems, multi-agent topologies, and enterprise-grade architectures",
    skills: ["System design", "Multi-agent patterns", "Reliability engineering", "Security architecture"],
    dayToDay: ["Architecture reviews", "Pattern documentation", "Cross-team standards", "Technology roadmaps"],
    growth: "→ Distinguished Engineer → VP Engineering (AI)"
  },
  {
    role: "AI Product Manager",
    level: "Mid-Senior",
    salary: "$140K-220K",
    demand: "Very High",
    description: "Define agent product strategy, user experiences, and success metrics",
    skills: ["AI/ML product sense", "UX for AI", "Metrics design", "Stakeholder management"],
    dayToDay: ["Define agent capabilities", "Prioritize features", "Analyze user feedback", "Align engineering & business"],
    growth: "→ Senior PM → Director of AI Products"
  },
  {
    role: "Agent Operations Engineer",
    level: "Mid-Senior",
    salary: "$130K-180K",
    demand: "Growing",
    description: "Manage production agent systems—monitoring, incident response, and reliability",
    skills: ["Observability tools", "Incident management", "Cost optimization", "SRE practices"],
    dayToDay: ["Monitor golden signals", "Respond to incidents", "Capacity planning", "Runbook maintenance"],
    growth: "→ Staff SRE → Platform Engineering Lead"
  },
  {
    role: "AI Safety & Governance Specialist",
    level: "Mid-Senior",
    salary: "$140K-200K",
    demand: "Growing Fast",
    description: "Ensure agent safety, compliance, and responsible AI practices",
    skills: ["Red teaming", "Guardrail design", "Regulatory compliance", "Risk assessment"],
    dayToDay: ["Run red team exercises", "Design safety policies", "Audit agent behaviors", "Train teams on responsible AI"],
    growth: "→ Head of AI Safety → Chief AI Ethics Officer"
  },
  {
    role: "AI Solutions Architect",
    level: "Senior",
    salary: "$160K-250K",
    demand: "High",
    description: "Help enterprises design and deploy agent solutions aligned with business goals",
    skills: ["Enterprise architecture", "Cloud platforms", "Integration patterns", "Executive communication"],
    dayToDay: ["Client discovery sessions", "Solution design", "Reference architectures", "Proof of concepts"],
    growth: "→ Principal Architect → Field CTO"
  }
];

const SKILL_PROGRESSION = {
  foundation: {
    level: "Foundation (0-6 months)",
    skills: [
      { name: "LLM Fundamentals", description: "How language models work, tokens, temperature, context windows" },
      { name: "Basic Prompting", description: "Zero-shot, few-shot, chain-of-thought basics" },
      { name: "API Integration", description: "Calling OpenAI, Anthropic, Azure OpenAI APIs" },
      { name: "Python Basics", description: "Core Python for data and API work" }
    ],
    projects: ["Build a simple chatbot", "Create a RAG prototype", "Implement basic tool calling"]
  },
  practitioner: {
    level: "Practitioner (6-18 months)",
    skills: [
      { name: "Agent Frameworks", description: "LangChain, AutoGen, CrewAI, Microsoft Agent Framework" },
      { name: "MCP & Tool Integration", description: "Model Context Protocol, tool schemas, error handling" },
      { name: "Evaluation Methodology", description: "Golden sets, LLM-as-judge, A/B testing" },
      { name: "Observability", description: "Traces, metrics, logging for agent systems" }
    ],
    projects: ["Multi-step agent workflow", "Tool-using agent", "Production deployment with monitoring"]
  },
  expert: {
    level: "Expert (18+ months)",
    skills: [
      { name: "Multi-Agent Systems", description: "A2A protocol, orchestration patterns, team topologies" },
      { name: "Fine-Tuning & RLHF", description: "SFT, DPO, when to fine-tune vs prompt" },
      { name: "Safety & Red Teaming", description: "Jailbreak prevention, prompt injection defense, risk assessment" },
      { name: "Cost Optimization", description: "Token economics, caching, model routing" }
    ],
    projects: ["Multi-agent system", "Red teaming exercise", "Enterprise deployment"]
  },
  leadership: {
    level: "Leadership (3+ years)",
    skills: [
      { name: "AI Strategy", description: "Roadmapping, portfolio management, build vs buy" },
      { name: "Team Building", description: "Hiring, upskilling, culture development" },
      { name: "Executive Communication", description: "Business cases, risk framing, roadmap presentations" },
      { name: "Industry Expertise", description: "Deep domain knowledge + AI application" }
    ],
    projects: ["Enterprise AI program", "AI center of excellence", "Industry-specific solution"]
  }
};

const CERTIFICATIONS = [
  {
    name: "AWS Machine Learning - Specialty",
    provider: "Amazon Web Services",
    focus: "ML on AWS including SageMaker, Bedrock",
    difficulty: "Intermediate-Advanced",
    value: "High for AWS-focused roles"
  },
  {
    name: "Azure AI Engineer Associate (AI-102)",
    provider: "Microsoft",
    focus: "Azure AI services, Cognitive Services, Azure OpenAI",
    difficulty: "Intermediate",
    value: "High for enterprise/Azure roles"
  },
  {
    name: "Google Cloud Professional ML Engineer",
    provider: "Google Cloud",
    focus: "ML on GCP, Vertex AI",
    difficulty: "Advanced",
    value: "High for GCP-focused roles"
  },
  {
    name: "DeepLearning.AI Certifications",
    provider: "DeepLearning.AI / Coursera",
    focus: "LLMs, RAG, Agents (various courses)",
    difficulty: "Beginner-Intermediate",
    value: "Good for learning, moderate for hiring"
  },
  {
    name: "LangChain Academy Certificates",
    provider: "LangChain",
    focus: "LangGraph, agent development",
    difficulty: "Intermediate",
    value: "Growing recognition in agent space"
  },
  {
    name: "OpenAI Developer Certification",
    provider: "OpenAI (if available)",
    focus: "GPT API, function calling, assistants",
    difficulty: "Intermediate",
    value: "High brand recognition"
  }
];

const JOB_MARKET_TRENDS = [
  {
    trend: "Agent Engineers > ML Engineers",
    insight: "Job postings for 'AI Agent' roles grew 340% YoY, while traditional ML engineer postings grew 15%",
    implication: "Practical agent-building skills are in higher demand than research backgrounds"
  },
  {
    trend: "Prompt Engineering Specialization",
    insight: "Dedicated 'Prompt Engineer' roles emerged, with salaries matching mid-level software engineers",
    implication: "Prompt craft is a recognized specialized skill, not just 'anyone can do it'"
  },
  {
    trend: "Safety & Governance Surge",
    insight: "AI Safety roles increased 280% as regulations (EU AI Act, state laws) take effect",
    implication: "Compliance and safety expertise becoming mandatory for enterprise deployments"
  },
  {
    trend: "Full-Stack AI Developers",
    insight: "Companies prefer engineers who can build UI + backend + agent vs specialists",
    implication: "T-shaped skills (breadth + depth in agents) more valuable than pure specialization"
  },
  {
    trend: "Industry Specialization Premium",
    insight: "Healthcare, Finance, Legal AI specialists command 20-40% salary premiums",
    implication: "Domain expertise + AI skills = highest compensation"
  }
];

const LEARNING_PATHS = [
  {
    path: "Software Engineer → Agent Developer",
    duration: "3-6 months",
    steps: [
      "Learn LLM fundamentals (APIs, tokens, prompting)",
      "Build a tool-using agent with LangChain or similar",
      "Deploy an agent with observability",
      "Contribute to an open-source agent project"
    ]
  },
  {
    path: "Data Scientist → AI Product Manager",
    duration: "6-12 months",
    steps: [
      "Study AI product management frameworks",
      "Build and evaluate an agent end-to-end",
      "Practice stakeholder communication of AI capabilities",
      "Lead a small agent pilot project"
    ]
  },
  {
    path: "DevOps/SRE → Agent Ops Engineer",
    duration: "3-6 months",
    steps: [
      "Learn agent-specific observability patterns",
      "Set up monitoring for an agent system",
      "Practice incident response for AI failures",
      "Implement cost optimization strategies"
    ]
  },
  {
    path: "QA Engineer → AI Safety Specialist",
    duration: "6-9 months",
    steps: [
      "Learn red teaming and adversarial testing",
      "Study prompt injection and jailbreak techniques",
      "Practice guardrail design and evaluation",
      "Get familiar with AI regulations (EU AI Act)"
    ]
  },
  {
    path: "New Graduate → Agent Developer",
    duration: "6-12 months",
    steps: [
      "Complete LLM fundamentals course",
      "Build 3-5 agent projects for portfolio",
      "Contribute to open-source agent tools",
      "Apply to agent-focused startups or enterprise AI teams"
    ]
  }
];

export default function AgentCareerPathsConcept({ onMarkComplete, onNavigateToNext }: AgentCareerPathsConceptProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedLevel, setSelectedLevel] = useState<string>("foundation");

  const tabs = [
    { id: "overview", label: "Overview", icon: <GraduationCap className="w-4 h-4" /> },
    { id: "roles", label: "Career Roles", icon: <Briefcase className="w-4 h-4" /> },
    { id: "skills", label: "Skill Progression", icon: <TrendUp className="w-4 h-4" /> },
    { id: "certifications", label: "Certifications", icon: <Certificate className="w-4 h-4" /> },
    { id: "market", label: "Job Market", icon: <ChartLine className="w-4 h-4" /> },
    { id: "paths", label: "Learning Paths", icon: <ArrowRight className="w-4 h-4" /> }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border border-border/50 bg-background/60 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <GraduationCap className="w-6 h-6" />
            Agent Career Paths
          </CardTitle>
          <CardDescription>
            Navigate your career in AI agents—from roles and skills to certifications and job market trends.
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
                <GraduationCap className="w-5 h-5 text-blue-500" />
                The AI Agent Career Landscape
              </CardTitle>
              <CardDescription>
                A new category of high-demand, high-compensation roles is emerging around AI agents.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Real-World Analogy */}
              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Think: The Mobile Developer Boom (2008-2015)
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  When the iPhone launched, "mobile developer" wasn't a job title. Within 5 years, it was one of the 
                  hottest careers in tech. AI agents are having their iPhone moment now. Early practitioners who 
                  build deep expertise will have career advantages for the next decade.
                </p>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Avg Salary Premium", value: "+35%", icon: <TrendUp className="w-4 h-4" />, color: "text-green-500" },
                  { label: "YoY Job Growth", value: "340%", icon: <ChartLine className="w-4 h-4" />, color: "text-blue-500" },
                  { label: "Roles Tracked", value: "7+", icon: <Briefcase className="w-4 h-4" />, color: "text-purple-500" },
                  { label: "Skill Levels", value: "4", icon: <Target className="w-4 h-4" />, color: "text-orange-500" }
                ].map((stat) => (
                  <div key={stat.label} className="p-4 border rounded-lg text-center">
                    <div className={`flex justify-center mb-2 ${stat.color}`}>{stat.icon}</div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Career Principles */}
              <div>
                <h4 className="font-semibold mb-3">Career Principles for the Agent Era</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    { principle: "Build in public", detail: "Open-source contributions and blog posts are better than credentials" },
                    { principle: "Ship production agents", detail: "Deployed systems beat prototype demos every time" },
                    { principle: "Master evaluation", detail: "Knowing if your agent works is as valuable as making it work" },
                    { principle: "Learn safety early", detail: "Every serious role will require safety/governance skills within 2 years" }
                  ].map((item, idx) => (
                    <div key={idx} className="p-3 border rounded-lg">
                      <div className="font-medium flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        {item.principle}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">{item.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Roles Tab */}
        <TabsContent value="roles" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                AI Agent Career Roles
              </CardTitle>
              <CardDescription>
                Emerging roles in the agent ecosystem with salaries, skills, and growth paths
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {CAREER_ROLES.map((role, idx) => (
                <div key={idx} className="border rounded-lg overflow-hidden">
                  <div className="p-4 bg-muted/50">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h4 className="font-semibold">{role.role}</h4>
                        <p className="text-sm text-muted-foreground">{role.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">{role.level}</Badge>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                          {role.salary}
                        </Badge>
                        <Badge variant={role.demand === "Very High" ? "default" : "secondary"}>
                          Demand: {role.demand}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 grid md:grid-cols-3 gap-4">
                    <div>
                      <h5 className="text-sm font-medium mb-2 flex items-center gap-1">
                        <Code className="w-3 h-3" /> Key Skills
                      </h5>
                      <ul className="text-sm space-y-1">
                        {role.skills.map((skill, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-3 h-3 mt-1 text-green-500" />
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium mb-2 flex items-center gap-1">
                        <Users className="w-3 h-3" /> Day-to-Day
                      </h5>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        {role.dayToDay.map((task, i) => (
                          <li key={i}>• {task}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium mb-2 flex items-center gap-1">
                        <TrendUp className="w-3 h-3" /> Growth Path
                      </h5>
                      <p className="text-sm text-blue-600 dark:text-blue-400">{role.growth}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skills Progression Tab */}
        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendUp className="w-5 h-5" />
                Skill Progression Framework
              </CardTitle>
              <CardDescription>
                From beginner to leadership—a structured path to agent expertise
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {Object.entries(SKILL_PROGRESSION).map(([key, level]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedLevel(key)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                      selectedLevel === key
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80"
                    )}
                  >
                    {level.level.split(" ")[0]}
                  </button>
                ))}
              </div>

              {Object.entries(SKILL_PROGRESSION).map(([key, level]) => (
                selectedLevel === key && (
                  <div key={key} className="space-y-4">
                    <h4 className="font-semibold text-lg">{level.level}</h4>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium mb-3 flex items-center gap-2">
                          <Brain className="w-4 h-4" /> Core Skills
                        </h5>
                        <div className="space-y-3">
                          {level.skills.map((skill, idx) => (
                            <div key={idx} className="p-3 border rounded-lg">
                              <div className="font-medium text-sm">{skill.name}</div>
                              <div className="text-xs text-muted-foreground">{skill.description}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-3 flex items-center gap-2">
                          <Target className="w-4 h-4" /> Portfolio Projects
                        </h5>
                        <div className="space-y-2">
                          {level.projects.map((project, idx) => (
                            <div key={idx} className="p-3 bg-muted/50 rounded-lg flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm">{project}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Certifications Tab */}
        <TabsContent value="certifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Certificate className="w-5 h-5" />
                Relevant Certifications
              </CardTitle>
              <CardDescription>
                Industry certifications that can boost your agent career
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {CERTIFICATIONS.map((cert, idx) => (
                <div key={idx} className="p-4 border rounded-lg">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-semibold">{cert.name}</h4>
                      <p className="text-sm text-muted-foreground">{cert.provider}</p>
                    </div>
                    <Badge variant="outline">{cert.difficulty}</Badge>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mt-3">
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">FOCUS</span>
                      <p className="text-sm">{cert.focus}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">HIRING VALUE</span>
                      <p className="text-sm">{cert.value}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">⚠️ Certification Reality Check</h4>
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  In the fast-moving agent space, <strong>shipping projects &gt; certifications</strong>. 
                  Certifications help with HR filters and signal foundational knowledge, but portfolio projects 
                  and open-source contributions matter more to hiring managers and technical interviews.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Job Market Tab */}
        <TabsContent value="market" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartLine className="w-5 h-5" />
                Job Market Trends
              </CardTitle>
              <CardDescription>
                What's happening in the AI agent job market and what it means for you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {JOB_MARKET_TRENDS.map((trend, idx) => (
                <div key={idx} className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">{trend.trend}</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">INSIGHT</span>
                      <p className="text-sm">{trend.insight}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-green-600 dark:text-green-400">YOUR IMPLICATION</span>
                      <p className="text-sm">{trend.implication}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Learning Paths Tab */}
        <TabsContent value="paths" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRight className="w-5 h-5" />
                Transition Learning Paths
              </CardTitle>
              <CardDescription>
                How to transition from your current role into agent-focused careers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {LEARNING_PATHS.map((path, idx) => (
                <div key={idx} className="border rounded-lg overflow-hidden">
                  <div className="p-4 bg-muted/50 flex justify-between items-center">
                    <h4 className="font-semibold">{path.path}</h4>
                    <Badge variant="outline">{path.duration}</Badge>
                  </div>
                  <div className="p-4">
                    <ol className="space-y-2">
                      {path.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                            {i + 1}
                          </span>
                          <span className="text-sm pt-0.5">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))}

              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                  <Book className="w-4 h-4" />
                  Open Agent School Is Your Path
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  You're already in the right place! Complete the concept modules, work through the study modes, 
                  and build portfolio projects. The structured curriculum here covers Foundation → Practitioner → Expert 
                  skill progression with hands-on practice.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
