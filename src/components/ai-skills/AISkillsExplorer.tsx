import React, { useEffect, useState } from 'react'
import { trackEvent } from '@/lib/analytics/ga'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
// Tabs UI retained (import) only if we need to fall back; currently phased out in favor of section rendering
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Code, Users, Lightbulb, Rocket, ChartBar, Target, Calculator, Gauge, Wrench, Shield, CurrencyCircleDollar, Database, Network, BookOpen, CheckCircle, ArrowsOutSimple, ArrowsInSimple, CaretLeft, CaretRight } from "@phosphor-icons/react"
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
const AgentPaymentsAP2 = React.lazy(() => import('./AgentPaymentsAP2'))
import RAGSystems from "./RAGSystems"
import MultiAgentOrchestration from "./MultiAgentOrchestration"
import OrgPlaybooks from "./OrgPlaybooks"
import { CurriculumTabs } from '@/components/learning/CurriculumTabs'
import { perspectivesRegistry } from '@/data/perspectivesRegistry';
import { skillCategories } from '@/data/aiSkillsStructure'
import AISkillsSideNav from './AISkillsSideNav'

const AIProductManagementPillars = React.lazy(() => import("./AIProductManagementPillars"))
const AgentOpsPillars = React.lazy(() => import('./AgentOpsPillars'))
const AICostValuePillars = React.lazy(() => import('./AICostValuePillars'))
const HumanTrustPillars = React.lazy(() => import('./HumanTrustPillars'))

export default function AISkillsExplorer() {
  // activeTab kept for backward compatibility with existing child components that may expect tab navigation
  const [activeTab, setActiveTab] = useState("fundamentals")
  const [progress, setProgress] = useState<Record<string, boolean>>({})
  const [activePerspectives, setActivePerspectives] = useState<Set<string>>(new Set())
  // viewMode allows user to switch between restored tabbed experience and sectioned curriculum view
  const [viewMode, setViewMode] = useState<'tabs' | 'sections'>('sections')
  const [compactTabs, setCompactTabs] = useState(false)
  const [showTabScrollHints, setShowTabScrollHints] = useState(false)
  const STORAGE_KEY = 'oas.aiSkillsProgress.v2' // bump key to avoid collision with legacy progress map

  // Bridge between legacy tab IDs and new taxonomy IDs
  const legacyToNew: Record<string, string> = {
    'security-data': 'security-data-boundaries',
    'rag': 'rag-systems',
    'multi-agent': 'multi-agent-orchestration',
    'assessment': 'frontier-firm-assessment',
    'novel-patterns': 'novel-organizational-patterns',
    'future-state': 'future-state-trends'
  }
  const newToLegacy: Record<string, string> = Object.fromEntries(Object.entries(legacyToNew).map(([k,v]) => [v,k]))

  // Scroll helper (id can be either legacy or new)
  const scrollToModule = (id: string) => {
    const targetId = legacyToNew[id] || id // if legacy, map to new anchor
    const el = document.getElementById(targetId)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Replacement for navigateToTab in section world
  const navigateToModule = (moduleId: string) => {
    setActiveTab(moduleId)
    scrollToModule(moduleId)
  }

  // Mark complete & navigate (records progress under new taxonomy id when bridged)
  const completeAndNavigate = (currentId: string, nextId: string) => {
    const newId = legacyToNew[currentId] || currentId
    setProgress(prev => ({ ...prev, [newId]: true }))
    if (nextId) navigateToModule(nextId)
  }

  // Load/save progress
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setProgress(JSON.parse(saved))
    } catch {}
    // Fire entry analytics (direct path only; alias path tracked in redirect component)
    try {
      if (window.location.pathname.startsWith('/ai-skills')) {
        const viaAlias = sessionStorage.getItem('aiSkillsAliasRedirect') === '1';
        if (!viaAlias) {
          trackEvent({ action: 'ai_skills_entry', category: 'ai_skills', entry_source: 'direct' });
        }
        // Clear marker so refresh counts as direct again
        try { sessionStorage.removeItem('aiSkillsAliasRedirect'); } catch {}
      }
    } catch {}
  }, [])
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    } catch {}
  }, [progress])

  const resetProgress = () => setProgress({})

  const perspectiveTabs = perspectivesRegistry
    .filter(p => ['product-management','agent-ops','cost-value','trust-experience'].includes(p.id))
    .map(p => {
      const componentMap: Record<string, React.ReactNode> = {
        'product-management': (
          <React.Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Loading Product Management Pillars…</div>}>
            <AIProductManagementPillars onNavigate={() => completeAndNavigate('product-management','code-understanding')} />
          </React.Suspense>
        ),
        'agent-ops': (
          <React.Suspense fallback={<div className='p-6 text-sm text-muted-foreground'>Loading Agent Operations…</div>}>
            <AgentOpsPillars />
          </React.Suspense>
        ),
        'cost-value': (
          <React.Suspense fallback={<div className='p-6 text-sm text-muted-foreground'>Loading Cost & Value Engineering…</div>}>
            <AICostValuePillars />
          </React.Suspense>
        ),
        'trust-experience': (
          <React.Suspense fallback={<div className='p-6 text-sm text-muted-foreground'>Loading Trust & Interaction…</div>}>
            <HumanTrustPillars />
          </React.Suspense>
        )
      };
      return {
        id: p.id,
        title: p.short || p.label,
        description: p.description || '',
        icon: <Target className="w-4 h-4" />,
        level: 'Intermediate',
        component: componentMap[p.id]
      };
    });

  // Modules array (legacy) retained for metadata & component resolution
  // TODO: In a later pass, collapse into a schema-based registry to avoid dual maintenance.

  const tabs = [
    // 1. Fundamentals
    {
      id: "fundamentals",
      title: "Fundamentals",
      description: "What are AI-Native Practices?",
      icon: <Brain className="w-4 h-4" />,
      level: "Beginner",
  component: <AISkillsFundamentals onNavigate={() => completeAndNavigate("fundamentals","thinking-modes")} navigateToTab={navigateToModule as any} />
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
    // Registry-driven perspective tabs
    ...perspectiveTabs,
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
    // 10b. Agentic Commerce & AP2 (new)
    {
      id: "agent-payments-ap2",
      title: "Agentic Commerce & AP2",
      description: "Mandates & verifiable credentials for trusted agent payments",
      icon: <Shield className="w-4 h-4" />,
      level: "Advanced",
      component: (
        <React.Suspense fallback={<div className="p-4 text-sm text-muted-foreground">Loading AP2 module…</div>}>
          <AgentPaymentsAP2 onNavigate={() => completeAndNavigate("agent-payments-ap2","rag")} />
        </React.Suspense>
      )
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

  // Build a map for quick lookup by id (including bridge aliases)
  const tabMap: Record<string, typeof tabs[number]> = {}
  tabs.forEach(t => { tabMap[t.id] = t })
  Object.entries(legacyToNew).forEach(([legacyId, newId]) => {
    if (tabMap[legacyId]) tabMap[newId] = tabMap[legacyId]
  })

  // Total modules for progress depends on mode. In tabs mode we count unique tab ids (excluding lenses if desired? keep them included for completeness)
  const uniqueTabIds = Array.from(new Set(tabs.map(t => legacyToNew[t.id] || t.id)))
  const totalModules = viewMode === 'tabs'
    ? uniqueTabIds.length
    : skillCategories.reduce((acc, c) => acc + c.moduleIds.length, 0)

  const isCompleted = (id: string) => {
    const newId = legacyToNew[id] || id
    return !!progress[newId]
  }

  const togglePerspective = (id: string) => {
    setActivePerspectives(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  // Track last activated lens to auto-scroll & highlight
  const [lastActivatedLens, setLastActivatedLens] = useState<string | null>(null)
  useEffect(() => {
    if (!lastActivatedLens) return
    // Wait a tick for component mount
    const handle = requestAnimationFrame(() => {
      const el = document.getElementById(lastActivatedLens)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      // Clear highlight after short delay
      const clear = window.setTimeout(() => setLastActivatedLens(null), 1800)
      return () => window.clearTimeout(clear)
    })
    return () => cancelAnimationFrame(handle)
  }, [lastActivatedLens])

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
                Progress: {Object.values(progress).filter(Boolean).length}/{totalModules} modules completed
              </div>
              <Button variant="secondary" size="sm" onClick={resetProgress}>Reset progress</Button>
              <Button variant="outline" size="sm" onClick={() => setViewMode(m => m === 'tabs' ? 'sections' : 'tabs')}>
                {viewMode === 'tabs' ? 'Switch to Sections View' : 'Switch to Tabs View'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              {viewMode === 'tabs'
                ? 'Use the tab strip below to jump across all modules (including perspectives, assessment, calculator, and labs). Switch to Sections View for progressive, scroll-based exploration.'
                : 'Scroll through categorized sections below. Use perspective lenses to augment Foundations with role‑specific pillars or switch back to Tabs for a global overview.'}
            </div>
          </CardContent>
        </Card>
        {viewMode === 'tabs' && (
          <div className="mb-10 relative">
            <div className="flex items-center justify-between mb-2 gap-2">
              <div className="text-xs text-muted-foreground select-none">
                Tip: Shift + Scroll to pan. Use compact mode if the bar wraps.
              </div>
              <div className="flex items-center gap-1">
                <Button type="button" variant="ghost" size="icon" aria-label="Previous tabs" onClick={() => {
                  const scroller = document.getElementById('ai-skills-tab-strip')
                  if (scroller) scroller.scrollBy({left: -260, behavior:'smooth'})
                }}>
                  <CaretLeft className="w-4 h-4" />
                </Button>
                <Button type="button" variant="ghost" size="icon" aria-label="Next tabs" onClick={() => {
                  const scroller = document.getElementById('ai-skills-tab-strip')
                  if (scroller) scroller.scrollBy({left: 260, behavior:'smooth'})
                }}>
                  <CaretRight className="w-4 h-4" />
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => setCompactTabs(c => !c)} className="gap-1">
                  {compactTabs ? <ArrowsOutSimple className="w-4 h-4" /> : <ArrowsInSimple className="w-4 h-4" />}
                  <span className="hidden sm:inline">{compactTabs ? 'Expand Tabs' : 'Compact Tabs'}</span>
                </Button>
              </div>
            </div>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v)} className="w-full">
              <div className="relative">
                <div
                  id="ai-skills-tab-strip"
                  className={`flex overflow-x-auto no-scrollbar pb-2 -mb-2 gap-1 px-1 py-2 whitespace-nowrap ${compactTabs ? 'text-[11px] [&>div>button]:px-2' : ''}`}
                  onScroll={e => {
                    const el = e.currentTarget
                    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
                    const atStart = el.scrollLeft <= 4
                    setShowTabScrollHints(!(atEnd && atStart))
                  }}
                >
                  <TabsList className="flex gap-1 bg-transparent p-0 h-auto">
                    {tabs.map(t => (
                      <TabsTrigger key={t.id} value={t.id} className={`relative data-[state=active]:ring-2 data-[state=active]:ring-primary/40 rounded-md`}> 
                        <span className="flex items-center gap-1">
                          {t.icon}
                          {t.title}
                          {isCompleted(t.id) && (
                            <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                          )}
                        </span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                {showTabScrollHints && (
                  <>
                    <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-background to-transparent" />
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-background to-transparent" />
                  </>
                )}
              </div>
              {tabs.map(t => (
                <TabsContent key={t.id} value={t.id} className="pt-6 focus:outline-none">
                  <div className="border rounded-lg p-5 bg-card/40">
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        {t.icon}
                        <h3 className="text-xl font-semibold">{t.title}</h3>
                        <Badge className={getLevelColor(t.level)} variant="secondary">{t.level}</Badge>
                        {isCompleted(t.id) && <Badge variant="outline" className="border-green-500 text-green-600">Completed</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground max-w-2xl">{t.description}</p>
                    </div>
                    {t.component}
                    {!isCompleted(t.id) && (
                      <div className="mt-4 flex gap-2">
                        <Button size="sm" variant="secondary" onClick={() => setProgress(prev => ({...prev, [legacyToNew[t.id] || t.id]: true}))}>Mark Complete</Button>
                        {(() => {
                          const idx = tabs.findIndex(x => x.id === t.id)
                          const next = tabs[idx + 1]
                          return next ? (
                            <Button size="sm" onClick={() => completeAndNavigate(t.id, next.id)}>Complete & Next</Button>
                          ) : null
                        })()}
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}

        {viewMode === 'sections' && (
        /* Layout Grid: Side Nav + Content */
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
          <div className="order-2 lg:order-1">
            <AISkillsSideNav
              categories={skillCategories.map(c => ({ id: c.id, title: c.title, moduleIds: c.moduleIds }))}
              progress={progress}
              onJump={(id) => scrollToModule(id)}
            />
          </div>
          <div className="order-1 lg:order-2">
        {/* Overview Grid for quick scan */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Applied AI Skills Overview</h2>
          <div className="grid gap-2 sm:gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {skillCategories.flatMap(c => c.moduleIds).map(mid => {
              const t = tabMap[mid]
              if (!t) return null
              return (
                <button
                  key={mid}
                  onClick={() => scrollToModule(mid)}
                  className="group text-left border rounded-md p-2 bg-card/30 hover:bg-card/60 transition flex flex-col gap-1 focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  <span className="flex items-center gap-1 text-xs font-medium">
                    {t.icon}
                    {t.title}
                    {isCompleted(mid) && <CheckCircle className="w-3 h-3 text-green-600" />}
                  </span>
                  <span className="text-[10px] text-muted-foreground line-clamp-2 leading-tight">{t.description}</span>
                </button>
              )
            })}
          </div>
        </div>
        {/* Perspective Lenses */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Perspective Lenses</h2>
          <div className="flex flex-wrap gap-2">
            {perspectiveTabs.map(p => {
              const active = activePerspectives.has(p.id)
              return (
                <Button
                  key={p.id}
                  type="button"
                  aria-pressed={active}
                  variant={active ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    const willActivate = !active
                    togglePerspective(p.id)
                    if (willActivate) setLastActivatedLens(p.id)
                  }}
                  className={active ? 'ring-2 ring-primary/40 data-[pressed=true]:scale-[1.02]' : ''}
                >
                  {active ? '✓ ' : ''}{p.title}
                </Button>
              )
            })}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Toggle one or more lenses to inject role‑specific pillar frameworks into the Foundations section.</p>
          {activePerspectives.size > 0 && (
            <div className="mt-3 text-xs text-muted-foreground flex flex-wrap gap-3">
              <span className="font-medium">Active:</span>
              {[...activePerspectives].map(id => {
                const tab = perspectiveTabs.find(p => p.id === id)
                if (!tab) return null
                return (
                  <button
                    key={id}
                    onClick={() => document.getElementById(id)?.scrollIntoView({behavior:'smooth', block:'center'})}
                    className="underline decoration-dotted hover:text-primary transition-colors"
                    title="Jump to inserted pillar"
                  >{tab.title}</button>
                )
              })}
              <button onClick={() => setActivePerspectives(new Set())} className="ml-2 text-destructive underline decoration-dotted" title="Clear all lenses">Clear</button>
            </div>
          )}
        </div>

  {/* Sectioned Curriculum */}
  <div className="space-y-16">
          {skillCategories.map(category => {
            return (
              <section id={category.id} key={category.id} className="scroll-mt-24">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    {category.title}
                    <span className="text-sm font-normal text-muted-foreground">({category.moduleIds.length} modules)</span>
                  </h2>
                  {category.description && (
                    <p className="text-muted-foreground mt-1 max-w-3xl">{category.description}</p>
                  )}
                </div>
                <div className="space-y-10">
                  {category.moduleIds.map(moduleId => {
                    const t = tabMap[moduleId]
                    if (!t) return null
                    const progressKey = moduleId // already new taxonomy id
                    const isComplete = progress[progressKey]
                    return (
                      <div id={moduleId} key={moduleId} className="border rounded-lg p-5 bg-card/40 relative">
                        {isComplete && (
                          <div className="absolute top-3 right-3 text-green-600" title="Completed">
                            <CheckCircle className="w-5 h-5" />
                          </div>
                        )}
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            {t.icon}
                            <h3 className="text-xl font-semibold">{t.title}</h3>
                            <Badge className={getLevelColor(t.level)} variant="secondary">{t.level}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground max-w-2xl">{t.description}</p>
                        </div>
                        {t.component}
                        {!isComplete && (
                          <div className="mt-4 flex gap-2">
                            <Button size="sm" variant="secondary" onClick={() => setProgress(prev => ({...prev, [progressKey]: true}))}>Mark Complete</Button>
                            <Button size="sm" onClick={() => completeAndNavigate(newToLegacy[moduleId] || moduleId, '')}>Complete & Stay</Button>
                          </div>
                        )}
                      </div>
                    )
                  })}
                  {category.id === 'foundations' && activePerspectives.size > 0 && (
                    <div className="space-y-8">
                      {[...activePerspectives].map(pid => {
                        const pTab = perspectiveTabs.find(pt => pt.id === pid)
                        if (!pTab) return null
                        return (
                          <div
                            key={pid}
                            id={pid}
                            className={`border rounded-lg p-5 bg-card/60 relative transition-colors duration-700 ${lastActivatedLens === pid ? 'ring-2 ring-primary/60 bg-primary/5' : ''}`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              {pTab.icon}
                              <h3 className="text-lg font-semibold">{pTab.title} Pillars</h3>
                              <Badge className={getLevelColor(pTab.level)} variant="secondary">{pTab.level}</Badge>
                            </div>
                            {lastActivatedLens === pid && (
                              <div className="absolute -top-2 left-3 bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded shadow">Activated</div>
                            )}
                            {pTab.component}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </section>
            )
          })}
          {/* Labs now embedded via taxonomy under applied-tools */}
        </div>{/* end space-y sections */}
          </div>{/* end right content */}
        </div>/* end grid */
        )}
      </div>
    </div>
  )
}
