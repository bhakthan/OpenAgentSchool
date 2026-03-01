import React, { useEffect, useState, useRef, useCallback } from 'react'
import { trackEvent } from '@/lib/analytics/ga'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShareButton } from '@/components/ui/ShareButton'
import { Microphone, MicrophoneStage } from "@phosphor-icons/react"
import { useVoiceInput } from '@/contexts/VoiceInputContext'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
// Tabs UI retained (import) only if we need to fall back; currently phased out in favor of section rendering
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Code, Users, Lightbulb, Rocket, ChartBar, Target, Calculator, Gauge, Wrench, Shield, CurrencyCircleDollar, Database, Network, BookOpen, CheckCircle, ArrowsOutSimple, ArrowsInSimple, CaretLeft, CaretRight, ArrowSquareOut } from "@phosphor-icons/react"
import AISkillsFundamentals from "./AISkillsFundamentals"
import InteractiveVisualizations from "./InteractiveVisualizations"
import SystemsThinkingTree from "./SystemsThinkingTree"
import FrontierFirmAssessment from "./FrontierFirmAssessment"
import HumanAgentRatioCalculator from "./HumanAgentRatioCalculator"
import CodeUnderstandingSkills from "./CodeUnderstandingSkills"
import DevelopmentVelocitySkills from "./DevelopmentVelocitySkills"
import { AgentVelocityEngineering } from "./AgentVelocityEngineering"
import CrossTeamCollaborationSkills from "./CrossTeamCollaborationSkills"
import NovelOrganizationalPatterns from "./NovelOrganizationalPatterns"
import FutureStateTrends from "./FutureStateTrends"
import FrontierAgentPatterns from "./FrontierAgentPatterns"
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
import { references } from '@/lib/data/references'

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
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const STORAGE_KEY = 'oas.aiSkillsProgress.v2' // bump key to avoid collision with legacy progress map

  const closeVideo = () => {
    setIsVideoOpen(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  // Escape key handler for video modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVideoOpen) closeVideo()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isVideoOpen])

  const benchmarkReferenceGroups = references.concepts['applied-ai-skills'] ?? []
  const benchmarkReferences = benchmarkReferenceGroups.flatMap(group =>
    (group.references || []).map(ref => ({ ...ref, groupName: group.name ?? group.id ?? 'Reference' }))
  )

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

  // ── Voice input for module navigation ─────────────────────────────────
  const voice = useVoiceInput();

  const handleVoiceResult = useCallback((text: string) => {
    const q = text.toLowerCase().trim();
    // Try to match a module/tab by title
    const allModules = [...(tabs ?? []), ...(perspectiveTabs ?? [])];
    const match = allModules.find(m =>
      m.title.toLowerCase().includes(q) ||
      q.includes(m.title.toLowerCase()) ||
      m.id.replace(/-/g, ' ').includes(q) ||
      q.includes(m.id.replace(/-/g, ' '))
    );
    if (match) {
      navigateToModule(match.id);
    }
  }, []);

  useEffect(() => {
    return voice.onResult(handleVoiceResult);
  }, [voice, handleVoiceResult]);

  const handleVoiceMicClick = useCallback(() => {
    if (voice.isListening) {
      voice.stopVoice();
    } else {
      voice.startVoice();
    }
  }, [voice]);

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
  component: <DevelopmentVelocitySkills onNavigate={() => completeAndNavigate("development-velocity","agent-velocity-engineering")} />
    },
    // 5b. Agent Velocity Engineering
    {
      id: "agent-velocity-engineering",
      title: "Agent Velocity Engineering",
      description: "Master the 5 practices that 10x your agent development speed",
      icon: <Rocket className="w-4 h-4" />,
      level: "Advanced",
      component: <AgentVelocityEngineering />
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
    // 10b. Agentic Commerce: UCP & AP2 (updated 2026)
    {
      id: "agent-payments-ap2",
      title: "Agentic Commerce: UCP & AP2",
      description: "Universal Commerce Protocol + Agent Payments for agentic transactions",
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
      id: "future-state-trends",
      title: "Future State Trends",
      description: "Where AI‑native practices are heading",
      icon: <Rocket className="w-4 h-4" />,
      level: "Expert",
      component: <FutureStateTrends onNavigate={undefined} />
    },
    // 14. Frontier Agent Patterns
    {
      id: "frontier-agent-patterns",
      title: "Frontier Agent Patterns",
      description: "Quantum computing, robotics & advanced sensing",
      icon: <Rocket className="w-4 h-4" />,
      level: "Expert",
      component: <FrontierAgentPatterns onComplete={() => completeAndNavigate("frontier-agent-patterns", "hands-on-studios")} />
    }
    ,
    // 15. Hands-On Studios (renders CurriculumTabs)
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
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
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

  // ── Cover images & icons for category bento tiles + section banners ──
  const categoryCover: Record<string, string> = {
    'foundations': '/covers/ai-skills-foundations.webp',
    'build': '/covers/ai-skills-build.webp',
    'operate': '/covers/ai-skills-operate.webp',
    'govern-optimize': '/covers/ai-skills-govern.webp',
    'multi-agent': '/covers/ai-skills-multi-agent.webp',
    'strategy-future': '/covers/ai-skills-strategy-future.webp',
    'applied-tools': '/covers/ai-skills-applied-tools.webp',
  };
  const categoryIcons: Record<string, React.ReactNode> = {
    'foundations': <Brain className="w-5 h-5" />,
    'build': <Rocket className="w-5 h-5" />,
    'operate': <Gauge className="w-5 h-5" />,
    'govern-optimize': <Shield className="w-5 h-5" />,
    'multi-agent': <Network className="w-5 h-5" />,
    'strategy-future': <Lightbulb className="w-5 h-5" />,
    'applied-tools': <Calculator className="w-5 h-5" />,
  };

  return (
    <div className="flat-ui-2-theme ai-skills-flat-ui min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="interactive-card">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">71%</div>
              <div className="text-sm text-muted-foreground">of employees are bringing their own AI to work</div>
            </CardContent>
          </Card>
          <Card className="interactive-card">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">2.9x</div>
              <div className="text-sm text-muted-foreground">productivity increase for Frontier Firms</div>
            </CardContent>
          </Card>
          <Card className="interactive-card">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">74%</div>
              <div className="text-sm text-muted-foreground">believe AI will make them more creative</div>
            </CardContent>
          </Card>
          <Card className="interactive-card">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">132%</div>
              <div className="text-sm text-muted-foreground">increase in strategic thinking time</div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Path Overview */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle>Learning Path Overview</CardTitle>
                <CardDescription>
                  Progressive skill development from understanding AI-native mindset to implementing revolutionary organizational patterns. Now enhanced with Microsoft's 2025 Work Trend Index insights and interactive assessment tools.
                </CardDescription>
              </div>
              <ShareButton
                url={`${window.location.origin}/ai-skills`}
                title="AI Skills - Open Agent School"
                description="Progressive skill development from understanding AI-native mindset to implementing revolutionary organizational patterns"
                variant="outline"
                size="sm"
                analyticsCategory="AI Skills Share"
              />
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="text-sm text-muted-foreground">
                Progress: {Object.values(progress).filter(Boolean).length}/{totalModules} modules completed
              </div>
              <Button variant="secondary" size="sm" onClick={resetProgress}>Reset progress</Button>
              <Button variant="outline" size="sm" onClick={() => setViewMode(m => m === 'tabs' ? 'sections' : 'tabs')}>
                {viewMode === 'tabs' ? 'Switch to Sections View' : 'Switch to Tabs View'}
              </Button>
              {/* Voice module navigation */}
              {voice.isSupported && (
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleVoiceMicClick}
                        className={
                          voice.isListening
                            ? 'relative text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-950/40 gap-1'
                            : 'gap-1 text-muted-foreground hover:text-foreground'
                        }
                        aria-label={voice.isListening ? 'Stop voice input' : 'Say a module name to jump there'}
                      >
                        {voice.isListening && (
                          <span className="absolute inset-0 rounded-md bg-red-500/20 dark:bg-red-400/20 animate-pulse" />
                        )}
                        {voice.isListening ? (
                          <MicrophoneStage size={16} weight="fill" className="relative z-10" />
                        ) : (
                          <Microphone size={16} />
                        )}
                        <span className="hidden sm:inline text-xs relative z-10">{voice.isListening ? 'Listening…' : 'Voice nav'}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-xs">
                      {voice.isListening ? 'Tap to stop' : 'Say a module name to jump there'}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            {/* Video Preview Section */}
            <div className="mt-4 pt-4 border-t border-border/50">
              <button
                onClick={() => setIsVideoOpen(true)}
                className="group relative w-full max-w-md rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 via-background to-accent/20 flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <svg className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-foreground/90 bg-background/80 px-3 py-1 rounded-full">See Agents in Action</span>
                  </div>
                </div>
              </button>
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
        {/* Overview Bento Grid — category tiles */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Applied AI Skills Overview</h2>
          {(() => {
            const categoryAccent: Record<string, string> = {
              'foundations': 'from-blue-500/15 to-transparent',
              'build': 'from-orange-500/15 to-transparent',
              'operate': 'from-cyan-500/15 to-transparent',
              'govern-optimize': 'from-rose-500/15 to-transparent',
              'multi-agent': 'from-violet-500/15 to-transparent',
              'strategy-future': 'from-amber-500/15 to-transparent',
              'applied-tools': 'from-emerald-500/15 to-transparent',
            };
            /* Bento placement: 7 categories → 4-col grid
               Large (2×2): foundations, strategy-future (most modules)
               Standard (1×1): build, operate, govern-optimize, multi-agent, applied-tools */
            const bentoSize: Record<string, string> = {
              'foundations': 'lg:col-span-2 lg:row-span-2',
              'build': '',
              'operate': '',
              'govern-optimize': 'lg:col-span-2',
              'multi-agent': '',
              'strategy-future': 'lg:col-span-2 lg:row-span-2',
              'applied-tools': '',
            };
            return (
              <div className="bento-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(140px,auto)] gap-4 lg:gap-5">
                {skillCategories.map(cat => {
                  const completedCount = cat.moduleIds.filter(mid => isCompleted(mid)).length;
                  const pct = cat.moduleIds.length > 0 ? Math.round((completedCount / cat.moduleIds.length) * 100) : 0;
                  return (
                    <div
                      key={cat.id}
                      className={`bento-tile group relative rounded-2xl border border-border dark:border-white/[0.08] overflow-hidden cursor-pointer
                        bg-card text-card-foreground
                        transition-all duration-[400ms] ease-[cubic-bezier(0.165,0.84,0.44,1)]
                        hover:-translate-y-1.5
                        hover:shadow-[0_14px_28px_rgba(0,0,0,0.25),0_0_20px_rgba(79,172,254,0.1)]
                        hover:border-primary/30
                        ${bentoSize[cat.id] || ''}`}
                      onClick={() => scrollToModule(cat.moduleIds[0])}
                      role="button"
                      tabIndex={0}
                      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); scrollToModule(cat.moduleIds[0]); } }}
                    >
                      {/* Cover image or accent gradient */}
                      {categoryCover[cat.id] ? (
                        <>
                          <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{ backgroundImage: `url(${categoryCover[cat.id]})` }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,12,0.92)] via-[rgba(10,10,12,0.55)] to-[rgba(10,10,12,0.15)]" />
                        </>
                      ) : (
                        <div className={`absolute inset-0 bg-gradient-to-b ${categoryAccent[cat.id] || ''}`} />
                      )}

                      {/* Tile content */}
                      <div className="relative h-full flex flex-col justify-end p-5 gap-3">
                        {/* Header */}
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${categoryCover[cat.id] ? 'bg-white/10 text-white/90' : 'bg-muted/80 text-muted-foreground'}`}>
                            {categoryIcons[cat.id] || <BookOpen className="w-5 h-5" />}
                          </div>
                          <div className="min-w-0">
                            <h3 className={`font-semibold text-lg leading-tight tracking-tight ${categoryCover[cat.id] ? 'text-white' : ''}`}>{cat.title}</h3>
                            <span className={`text-xs ${categoryCover[cat.id] ? 'text-white/60' : 'text-muted-foreground'}`}>{cat.moduleIds.length} modules</span>
                          </div>
                          <CaretRight className={`w-5 h-5 ml-auto shrink-0 group-hover:translate-x-1 transition-transform duration-300 ${categoryCover[cat.id] ? 'text-white/60' : 'text-muted-foreground'}`} />
                        </div>

                        {/* Description */}
                        {cat.description && (
                          <p className={`text-sm leading-relaxed ${categoryCover[cat.id] ? 'text-white/70' : 'text-muted-foreground'}`}>{cat.description}</p>
                        )}

                        {/* Progress */}
                        <div>
                          <div className={`flex justify-between text-xs mb-1 ${categoryCover[cat.id] ? 'text-white/60' : 'text-muted-foreground'}`}>
                            <span>{completedCount} / {cat.moduleIds.length} completed</span>
                            <span>{pct}%</span>
                          </div>
                          <div className={`w-full h-1.5 rounded-full overflow-hidden ${categoryCover[cat.id] ? 'bg-white/15' : 'bg-muted'}`}>
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${categoryCover[cat.id] ? 'bg-white/40' : 'bg-foreground/25'}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>

                        {/* Module chips */}
                        <div className="flex flex-wrap gap-1 pt-1">
                          {cat.moduleIds.map(mid => {
                            const t = tabMap[mid];
                            if (!t) return null;
                            return (
                              <button
                                key={mid}
                                onClick={(e) => { e.stopPropagation(); scrollToModule(mid); }}
                                className={`inline-flex items-center gap-1 text-[10px] leading-tight px-1.5 py-0.5 rounded-sm
                                  backdrop-blur-sm transition-colors
                                  ${categoryCover[cat.id]
                                    ? 'bg-white/10 text-white/80 border border-white/20 hover:bg-white/20 hover:border-white/40'
                                    : 'bg-background/80 text-foreground/85 border border-border/60 hover:bg-primary/10 hover:border-primary/40 hover:text-primary'}`}
                              >
                                {isCompleted(mid) && <CheckCircle className="w-3 h-3 shrink-0 text-green-600" />}
                                <span className="truncate max-w-[150px]">{t.title}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
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
                {/* Section banner — cover image or plain card */}
                {categoryCover[category.id] ? (
                  <div className="bento-tile mb-6 relative rounded-xl overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${categoryCover[category.id]})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[rgba(10,10,12,0.88)] via-[rgba(10,10,12,0.65)] to-[rgba(10,10,12,0.30)]" />
                    <div className="relative flex items-start gap-3 px-5 py-5">
                      <div className="w-10 h-10 rounded-md flex items-center justify-center shrink-0 bg-white/10 text-white/90 backdrop-blur-sm">
                        {categoryIcons[category.id] || <BookOpen className="w-5 h-5" />}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                          {category.title}
                          <span className="text-sm font-normal text-white/60">({category.moduleIds.length} modules)</span>
                        </h2>
                        {category.description && (
                          <p className="text-white/70 mt-1 max-w-3xl">{category.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-6 flex items-start gap-3 rounded-lg border border-border bg-card px-3.5 py-3">
                    <div className="w-10 h-10 rounded-md flex items-center justify-center shrink-0 bg-muted text-muted-foreground">
                      {categoryIcons[category.id] || <BookOpen className="w-5 h-5" />}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold flex items-center gap-3">
                        {category.title}
                        <span className="text-sm font-normal text-muted-foreground">({category.moduleIds.length} modules)</span>
                      </h2>
                      {category.description && (
                        <p className="text-muted-foreground mt-1 max-w-3xl">{category.description}</p>
                      )}
                    </div>
                  </div>
                )}
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
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              {t.icon}
                              <h3 className="text-xl font-semibold">{t.title}</h3>
                              <Badge className={getLevelColor(t.level)} variant="secondary">{t.level}</Badge>
                            </div>
                            <ShareButton
                              url={`${window.location.origin}/ai-skills#${moduleId}`}
                              title={`${t.title} - Applied AI Skills`}
                              description={t.description}
                              variant="outline"
                              size="sm"
                              analyticsCategory="AI Skills Module Share"
                            />
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
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2">
                                {pTab.icon}
                                <h3 className="text-lg font-semibold">{pTab.title} Pillars</h3>
                                <Badge className={getLevelColor(pTab.level)} variant="secondary">{pTab.level}</Badge>
                              </div>
                              <ShareButton
                                url={`${window.location.origin}/ai-skills#${pid}`}
                                title={`${pTab.title} Pillars - Applied AI Skills`}
                                description={pTab.description}
                                variant="outline"
                                size="sm"
                                analyticsCategory="AI Skills Perspective Share"
                              />
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

        {benchmarkReferences.length > 0 && (
          <section className="mt-16">
            <div className="relative overflow-hidden rounded-2xl border border-primary/15 bg-card/60 shadow-lg shadow-primary/10 dark:bg-background/60 dark:shadow-primary/20">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/15 via-transparent to-primary/10 dark:from-primary/25 dark:via-primary/10 dark:to-primary/5" />
              <div className="relative z-10 p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary dark:bg-primary/20">
                      <ChartBar className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight text-foreground">Benchmark &amp; Evaluation References</h2>
                      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                        Stress-test your agents with community benchmarks and competitive arenas that surface planning gaps, tool coordination issues, and real-world failure modes.
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="self-start whitespace-nowrap bg-primary/10 text-primary dark:bg-primary/20">
                    Updated as the ecosystem evolves
                  </Badge>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {benchmarkReferences.map(ref => (
                    <a
                      key={ref.url}
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden rounded-xl border border-white/20 bg-background/90 p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl dark:border-white/10 dark:bg-background/70"
                    >
                      <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-wide text-muted-foreground">
                        <span>{ref.groupName}</span>
                        <ArrowSquareOut className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                      </div>
                      <h3 className="mt-3 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                        {ref.title}
                      </h3>
                      {ref.description && (
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {ref.description}
                        </p>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeVideo}
        >
          <div className="relative w-full max-w-4xl mx-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeVideo}
              className="absolute -top-12 right-0 text-white hover:text-primary transition-colors"
              aria-label="Close video"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <video
              ref={videoRef}
              className="w-full rounded-xl shadow-2xl"
              controls
              autoPlay
              src="/video/Agentic_Processes_in_Action_version_1.mp4"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  )
}
