import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Code, Users, Lightbulb, Rocket, ChartBar, Target, Calculator, Gauge, Wrench, Shield, CurrencyCircleDollar, Database, Network, BookOpen, CheckCircle } from "@phosphor-icons/react"
import AISkillsFundamentals from "./AISkillsFundamentals"
import InteractiveVisualizations from "./InteractiveVisualizations"
import SystemsThinkingTree from "./SystemsThinkingTree"
import FrontierFirmAssessment from "./FrontierFirmAssessment"
import HumanAgentRatioCalculator from "./HumanAgentRatioCalculator"
import CodeUnderstandingSkills from "./CodeUnderstandingSkills"
import DevelopmentVelocitySkills from "./DevelopmentVelocitySkills"
import CrossTeamCollaborationSkills from "./CrossTeamCollaborationSkills"
import NovelOrganizationalPatterns from "./NovelOrganizationalPatterns"
import FutureStateTrends from "./FutureStateTrends"
import ObservabilityEvalOps from "./ObservabilityEvalOps"
import PromptOpsTooling from "./PromptOpsTooling"
import SafetyRiskGovernance from "./SafetyRiskGovernance"
import CostPerformance from "./CostPerformance"
import SecurityDataBoundaries from "./SecurityDataBoundaries"
import RAGSystems from "./RAGSystems"
import MultiAgentOrchestration from "./MultiAgentOrchestration"
import OrgPlaybooks from "./OrgPlaybooks"
import { CurriculumTabs } from '@/components/learning/CurriculumTabs'

const AIProductManagementPillars = React.lazy(() => import("./AIProductManagementPillars"))

export default function AISkillsExplorer() {
  const [activeTab, setActiveTab] = useState("fundamentals")
  const [progress, setProgress] = useState<Record<string, boolean>>({})
  const STORAGE_KEY = 'oas.aiSkillsProgress.v1'

  // Navigation function to move to next tab
  const navigateToTab = (tabId: string) => {
    setActiveTab(tabId)
    // Scroll to top when changing tabs
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Mark current as complete then navigate
  const completeAndNavigate = (currentId: string, nextId: string) => {
    setProgress(prev => ({ ...prev, [currentId]: true }))
    navigateToTab(nextId)
  }

  // Load/save progress
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setProgress(JSON.parse(saved))
    } catch {}
  }, [])
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    } catch {}
  }, [progress])

  const resetProgress = () => setProgress({})

  const tabs = [
    // 1. Fundamentals
    {
      id: "fundamentals",
      title: "Fundamentals",
      description: "What are AI-Native Practices?",
      icon: <Brain className="w-4 h-4" />,
      level: "Beginner",
  component: <AISkillsFundamentals onNavigate={() => completeAndNavigate("fundamentals","thinking-modes")} navigateToTab={navigateToTab} />
    },
    // 2. Thinking Modes → add consistent Next button to go to Interactive Visualizations
    {
      id: "thinking-modes",
      title: "Thinking Modes",
      description: "Design vs Breakthrough vs Systems Thinking",
      icon: <Brain className="w-4 h-4" />,
      level: "Beginner",
  component: (
        <div className="space-y-6">
          <SystemsThinkingTree />
          <div className="mt-2">
    <Button className="w-full" size="lg" onClick={() => completeAndNavigate("thinking-modes","interactive-visualizations")}> 
              <span>Next: Interactive Visualizations</span>
            </Button>
          </div>
        </div>
      )
    },
    // 3. Interactive Visualizations
    {
      id: "interactive-visualizations",
      title: "Interactive Visualizations",
      description: "Explore AI-native practices in detail",
      icon: <ChartBar className="w-4 h-4" />,
      level: "Beginner",
      component: <InteractiveVisualizations onNavigate={() => completeAndNavigate("interactive-visualizations","product-management")} />
    },
    // NEW: Product Management Perspective
    {
      id: "product-management",
      title: "Product Mgmt",
      description: "8 pillars: trust, memory, integration, capability, synergy, resilience, ethics, complexity",
      icon: <Target className="w-4 h-4" />,
      level: "Intermediate",
      component: (
        <React.Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Loading Product Management Pillars…</div>}>
          <AIProductManagementPillars onNavigate={() => completeAndNavigate("product-management","code-understanding")} />
        </React.Suspense>
      )
    },
    // 4. Code Understanding
    {
      id: "code-understanding",
      title: "Code Understanding",
      description: "Navigation, debugging & tracing",
      icon: <Code className="w-4 h-4" />,
      level: "Intermediate",
      component: <CodeUnderstandingSkills onNavigate={() => completeAndNavigate("code-understanding","development-velocity")} />
    },
    // 5. Development Velocity
    {
      id: "development-velocity",
      title: "Development Velocity",
      description: "Rapid scaffolding & async workflows",
      icon: <Rocket className="w-4 h-4" />,
      level: "Advanced",
  component: <DevelopmentVelocitySkills onNavigate={() => completeAndNavigate("development-velocity","observability")} />
    },
    // 6. Observability & EvalOps
    {
      id: "observability",
      title: "Observability & EvalOps",
      description: "Traces, evals, and quality gates for reliable agents",
      icon: <Gauge className="w-4 h-4" />,
      level: "Advanced",
  component: <ObservabilityEvalOps onNavigate={() => completeAndNavigate("observability","promptops")} />
    },
    // 7. PromptOps & Tooling
    {
      id: "promptops",
      title: "PromptOps & Tooling",
      description: "Versioned prompts, canaries, guardrails, golden sets",
      icon: <Wrench className="w-4 h-4" />,
      level: "Advanced",
  component: <PromptOpsTooling onNavigate={() => completeAndNavigate("promptops","safety")} />
    },
    // 8. Safety, Risk & Governance
    {
      id: "safety",
      title: "Safety & Governance",
      description: "Adversarial testing, policies, and approvals",
      icon: <Shield className="w-4 h-4" />,
      level: "Advanced",
  component: <SafetyRiskGovernance onNavigate={() => completeAndNavigate("safety","cost-perf")} />
    },
    // 9. Cost & Performance
    {
      id: "cost-perf",
      title: "Cost & Performance",
      description: "Latency, routing, and spend optimization",
      icon: <CurrencyCircleDollar className="w-4 h-4" />,
      level: "Advanced",
  component: <CostPerformance onNavigate={() => completeAndNavigate("cost-perf","security-data")} />
    },
    // 10. Security & Data Boundaries
    {
      id: "security-data",
      title: "Security & Data Boundaries",
      description: "Zero-trust patterns for LLMs and tools",
      icon: <Database className="w-4 h-4" />,
      level: "Advanced",
  component: <SecurityDataBoundaries onNavigate={() => completeAndNavigate("security-data","rag")} />
    },
    // 11. RAG Systems
    {
      id: "rag",
      title: "RAG Systems",
      description: "Hybrid retrieval, re-ranking, and grounding",
  icon: <BookOpen className="w-4 h-4" />,
      level: "Advanced",
  component: <RAGSystems onNavigate={() => completeAndNavigate("rag","multi-agent")} />
    },
    // 12. Multi-Agent Orchestration
    {
      id: "multi-agent",
      title: "Multi-Agent",
      description: "Supervisor/specialist patterns and safety",
      icon: <Network className="w-4 h-4" />,
      level: "Advanced",
  component: <MultiAgentOrchestration onNavigate={() => completeAndNavigate("multi-agent","org-playbooks")} />
    },
    // 13. Org Playbooks
    {
      id: "org-playbooks",
      title: "Org Playbooks",
      description: "Standardize and scale AI-native excellence",
      icon: <Users className="w-4 h-4" />,
      level: "Advanced",
  component: <OrgPlaybooks onNavigate={() => completeAndNavigate("org-playbooks","cross-team")} />
    },
    // 14. Cross-Team Collaboration
    {
      id: "cross-team",
      title: "Cross-Team Collaboration",
      description: "Non-technical teams using AI",
      icon: <Users className="w-4 h-4" />,
      level: "Advanced",
  component: <CrossTeamCollaborationSkills onNavigate={() => completeAndNavigate("cross-team","novel-patterns")} />
    },
    // 15. Novel Patterns
    {
      id: "novel-patterns",
      title: "Novel Patterns",
      description: "Revolutionary organizational practices",
      icon: <Lightbulb className="w-4 h-4" />,
      level: "Expert",
  component: <NovelOrganizationalPatterns onNavigate={() => completeAndNavigate("novel-patterns","assessment")} />
    },
    // 11. Frontier Assessment
    {
      id: "assessment",
      title: "Frontier Assessment",
      description: "Evaluate your organization's AI readiness",
      icon: <Target className="w-4 h-4" />,
      level: "Intermediate",
  component: <FrontierFirmAssessment onNavigate={() => completeAndNavigate("assessment","calculator")} />
    },
    // 12. Ratio Calculator
    {
      id: "calculator",
      title: "Ratio Calculator",
      description: "Optimize human-agent ratios",
      icon: <Calculator className="w-4 h-4" />,
      level: "Intermediate",
  component: <HumanAgentRatioCalculator onNavigate={() => completeAndNavigate("calculator","future-state")} />
    },
    // 13. Future State (end)
    {
      id: "future-state",
      title: "Future State",
      description: "Where AI‑native practices are heading",
      icon: <Rocket className="w-4 h-4" />,
      level: "Expert",
      component: <FutureStateTrends onNavigate={undefined} />
    }
    ,
    // 14. Hands-On Studios (renders CurriculumTabs)
    {
      id: "hands-on-studios",
      title: "Hands‑On Studios",
      description: "Interactive labs with evals, cost, HITL, RAG, and orchestration",
      icon: <Gauge className="w-4 h-4" />,
      level: "Advanced",
      component: (
        <div className="mt-2">
          <CurriculumTabs defaultModuleId={'observability-evalops' as any} />
        </div>
      )
    }
  ]

  // Accessible AI-native skills badge styles via CSS variables
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "ring-1 bg-[var(--badge-beginner-bg)] ring-[var(--badge-beginner-ring)] text-[var(--badge-beginner-text)] dark:text-[var(--badge-beginner-text)]"
      case "Intermediate":
        return "ring-1 bg-[var(--badge-intermediate-bg)] ring-[var(--badge-intermediate-ring)] text-[var(--badge-intermediate-text)] dark:text-[var(--badge-intermediate-text)]"
      case "Advanced":
        return "ring-1 bg-[var(--badge-advanced-skill-bg)] ring-[var(--badge-advanced-skill-ring)] text-[var(--badge-advanced-skill-text)] dark:text-[var(--badge-advanced-skill-text)]"
      case "Expert":
        return "ring-1 bg-[var(--badge-expert-bg)] ring-[var(--badge-expert-ring)] text-[var(--badge-expert-text)] dark:text-[var(--badge-expert-text)]"
      default:
        return "ring-1 bg-muted ring-border text-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">71%</div>
              <div className="text-sm text-muted-foreground">of employees are bringing their own AI to work</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">2.9x</div>
              <div className="text-sm text-muted-foreground">productivity increase for Frontier Firms</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">74%</div>
              <div className="text-sm text-muted-foreground">believe AI will make them more creative</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">132%</div>
              <div className="text-sm text-muted-foreground">increase in strategic thinking time</div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Path Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Learning Path Overview</CardTitle>
            <CardDescription>
              Progressive skill development from understanding AI-native mindset to implementing revolutionary organizational patterns. Now enhanced with Microsoft's 2025 Work Trend Index insights and interactive assessment tools.
            </CardDescription>
            <div className="mt-2 flex items-center gap-2">
              <div className="text-sm text-muted-foreground">
                Progress: {Object.values(progress).filter(Boolean).length}/{tabs.length} completed
              </div>
              <Button variant="secondary" size="sm" onClick={resetProgress}>Reset progress</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {tabs.map((tab, index) => (
                <div key={tab.id} className="relative">
                  {index < tabs.length - 1 && (
                    <div className="hidden md:block absolute top-6 right-0 w-full h-0.5 bg-border z-0" />
                  )}
                  <div className="relative z-10 bg-background p-4 rounded-lg border">
                    {progress[tab.id] && (
                      <div className="absolute top-2 right-2 text-green-600" title="Completed">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                    )}
                    <div className="flex items-center gap-2 mb-2">
                      {tab.icon}
                      <Badge className={getLevelColor(tab.level)} variant="secondary">
                        {tab.level}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-base mb-1">{tab.title}</h3>
                    <p className="text-sm text-muted-foreground">{tab.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 h-auto p-1">
            {tabs.map((tab) => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
        className="flex items-center gap-1 px-2 py-1.5 text-sm md:text-sm lg:text-sm data-[state=active]:bg-background data-[state=active]:text-foreground"
              >
                {tab.icon}
        <span className="hidden sm:inline text-sm md:text-sm lg:text-sm xl:text-base truncate" title={tab.title}>{tab.title}</span>
        {progress[tab.id] && <CheckCircle className="w-3 h-3 text-green-600" aria-label="completed" />}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-6">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold">{tab.title}</h2>
                  <Badge className={getLevelColor(tab.level)} variant="secondary">
                    {tab.level}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{tab.description}</p>
              </div>
              {tab.component}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
