import React, { useEffect, useState, useRef, useCallback } from 'react'
import { trackEvent } from '@/lib/analytics/ga'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShareButton } from '@/components/ui/ShareButton'
import { Microphone, MicrophoneStage } from "@phosphor-icons/react"
import { useVoiceInput } from '@/contexts/VoiceInputContext'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Brain, Code, Users, Lightbulb, Rocket, ChartBar, Target, Calculator, Gauge, Wrench, Shield, CurrencyCircleDollar, Database, Network, BookOpen, CheckCircle, CaretLeft, CaretRight, ArrowSquareOut } from "@phosphor-icons/react"
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
import { perspectivesRegistry } from '@/data/perspectivesRegistry'
import { skillCategories } from '@/data/aiSkillsStructure'
import { references } from '@/lib/data/references'

const AIProductManagementPillars = React.lazy(() => import("./AIProductManagementPillars"))
const AgentOpsPillars = React.lazy(() => import('./AgentOpsPillars'))
const AICostValuePillars = React.lazy(() => import('./AICostValuePillars'))
const HumanTrustPillars = React.lazy(() => import('./HumanTrustPillars'))

export default function AISkillsExplorer() {
  // ── 3-level drill-down: hub → category → module ──
  const [activeView, setActiveView] = useState<'hub' | 'category' | 'module'>('hub')
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null)
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null)
  const [viewKey, setViewKey] = useState(0)
  const [progress, setProgress] = useState<Record<string, boolean>>({})
  const [activePerspectives, setActivePerspectives] = useState<Set<string>>(new Set())
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const STORAGE_KEY = 'oas.aiSkillsProgress.v2'

  const closeVideo = () => {
    setIsVideoOpen(false)
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0 }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVideoOpen) closeVideo()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isVideoOpen])

  const benchmarkReferenceGroups = references.concepts['applied-ai-skills'] ?? []
  const benchmarkReferences = benchmarkReferenceGroups.flatMap(group =>
    (group.references || []).map(ref => ({ ...ref, groupName: group.name ?? group.id ?? 'Reference' }))
  )

  // ── Legacy ↔ new taxonomy bridge ──
  const legacyToNew: Record<string, string> = {
    'security-data': 'security-data-boundaries',
    'rag': 'rag-systems',
    'multi-agent': 'multi-agent-orchestration',
    'assessment': 'frontier-firm-assessment',
    'novel-patterns': 'novel-organizational-patterns',
    'future-state': 'future-state-trends'
  }
  const _newToLegacy: Record<string, string> = Object.fromEntries(Object.entries(legacyToNew).map(([k, v]) => [v, k]))

  // ── Navigation helpers ──
  const perspectiveIds = new Set(['product-management', 'agent-ops', 'cost-value', 'trust-experience'])

  const goHub = () => {
    history.pushState(null, '', window.location.pathname)
    setActiveView('hub'); setActiveCategoryId(null); setActiveModuleId(null)
    setViewKey(k => k + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goCategory = (catId: string) => {
    history.pushState(null, '', `#category/${catId}`)
    setActiveCategoryId(catId); setActiveModuleId(null); setActiveView('category')
    setViewKey(k => k + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goModule = (moduleId: string) => {
    const resolvedId = legacyToNew[moduleId] || moduleId
    let cat = skillCategories.find(c => c.moduleIds.includes(resolvedId))
    if (!cat && perspectiveIds.has(resolvedId)) cat = skillCategories.find(c => c.id === 'foundations')
    history.pushState(null, '', `#module/${resolvedId}`)
    setActiveCategoryId(cat?.id || null); setActiveModuleId(resolvedId); setActiveView('module')
    setViewKey(k => k + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Alias for child component prop compatibility
  const navigateToModule = goModule

  const completeAndNavigate = (currentId: string, nextId: string) => {
    const newId = legacyToNew[currentId] || currentId
    setProgress(prev => ({ ...prev, [newId]: true }))
    if (nextId) goModule(nextId)
  }

  // ── Progress persistence ──
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setProgress(JSON.parse(saved))
    } catch { /* ignore */ }
    try {
      if (window.location.pathname.startsWith('/ai-skills')) {
        const viaAlias = sessionStorage.getItem('aiSkillsAliasRedirect') === '1'
        if (!viaAlias) trackEvent({ action: 'ai_skills_entry', category: 'ai_skills', entry_source: 'direct' })
        try { sessionStorage.removeItem('aiSkillsAliasRedirect') } catch { /* ignore */ }
      }
    } catch { /* ignore */ }
  }, [])

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)) } catch { /* ignore */ }
  }, [progress])

  const resetProgress = () => setProgress({})

  // ── Voice input for module navigation ──
  const voice = useVoiceInput()
  const voiceHandlerRef = useRef<(text: string) => void>(() => {})

  useEffect(() => {
    return voice.onResult((text: string) => voiceHandlerRef.current(text))
  }, [voice])

  const handleVoiceMicClick = useCallback(() => {
    if (voice.isListening) voice.stopVoice()
    else voice.startVoice()
  }, [voice])

  // ── Perspective tabs ──
  const perspectiveTabs = perspectivesRegistry
    .filter(p => ['product-management', 'agent-ops', 'cost-value', 'trust-experience'].includes(p.id))
    .map(p => {
      const componentMap: Record<string, React.ReactNode> = {
        'product-management': (
          <React.Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Loading Product Management Pillars…</div>}>
            <AIProductManagementPillars onNavigate={() => completeAndNavigate('product-management', 'code-understanding')} />
          </React.Suspense>
        ),
        'agent-ops': (
          <React.Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Loading Agent Operations…</div>}>
            <AgentOpsPillars />
          </React.Suspense>
        ),
        'cost-value': (
          <React.Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Loading Cost & Value Engineering…</div>}>
            <AICostValuePillars />
          </React.Suspense>
        ),
        'trust-experience': (
          <React.Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Loading Trust & Interaction…</div>}>
            <HumanTrustPillars />
          </React.Suspense>
        )
      }
      return {
        id: p.id,
        title: p.short || p.label,
        description: p.description || '',
        icon: <Target className="w-4 h-4" />,
        level: 'Intermediate',
        component: componentMap[p.id]
      }
    })

  // ── Module registry ──
  const tabs = [
    {
      id: "fundamentals",
      title: "Fundamentals",
      description: "What are AI-Native Practices?",
      icon: <Brain className="w-4 h-4" />,
      level: "Beginner",
      component: <AISkillsFundamentals onNavigate={() => completeAndNavigate("fundamentals", "thinking-modes")} navigateToTab={navigateToModule as any} />
    },
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
            <Button className="w-full" size="lg" onClick={() => completeAndNavigate("thinking-modes", "interactive-visualizations")}>
              <span>Next: Interactive Visualizations</span>
            </Button>
          </div>
        </div>
      )
    },
    {
      id: "interactive-visualizations",
      title: "Interactive Visualizations",
      description: "Explore AI-native practices in detail",
      icon: <ChartBar className="w-4 h-4" />,
      level: "Beginner",
      component: <InteractiveVisualizations onNavigate={() => completeAndNavigate("interactive-visualizations", "product-management")} />
    },
    ...perspectiveTabs,
    {
      id: "code-understanding",
      title: "Code Understanding",
      description: "Navigation, debugging & tracing",
      icon: <Code className="w-4 h-4" />,
      level: "Intermediate",
      component: <CodeUnderstandingSkills onNavigate={() => completeAndNavigate("code-understanding", "development-velocity")} />
    },
    {
      id: "development-velocity",
      title: "Development Velocity",
      description: "Rapid scaffolding & async workflows",
      icon: <Rocket className="w-4 h-4" />,
      level: "Advanced",
      component: <DevelopmentVelocitySkills onNavigate={() => completeAndNavigate("development-velocity", "agent-velocity-engineering")} />
    },
    {
      id: "agent-velocity-engineering",
      title: "Agent Velocity Engineering",
      description: "Master the 5 practices that 10x your agent development speed",
      icon: <Rocket className="w-4 h-4" />,
      level: "Advanced",
      component: <AgentVelocityEngineering />
    },
    {
      id: "observability",
      title: "Observability & EvalOps",
      description: "Traces, evals, and quality gates for reliable agents",
      icon: <Gauge className="w-4 h-4" />,
      level: "Advanced",
      component: <ObservabilityEvalOps onNavigate={() => completeAndNavigate("observability", "promptops")} />
    },
    {
      id: "promptops",
      title: "PromptOps & Tooling",
      description: "Versioned prompts, canaries, guardrails, golden sets",
      icon: <Wrench className="w-4 h-4" />,
      level: "Advanced",
      component: <PromptOpsTooling onNavigate={() => completeAndNavigate("promptops", "safety")} />
    },
    {
      id: "safety",
      title: "Safety & Governance",
      description: "Adversarial testing, policies, and approvals",
      icon: <Shield className="w-4 h-4" />,
      level: "Advanced",
      component: <SafetyRiskGovernance onNavigate={() => completeAndNavigate("safety", "cost-perf")} />
    },
    {
      id: "cost-perf",
      title: "Cost & Performance",
      description: "Latency, routing, and spend optimization",
      icon: <CurrencyCircleDollar className="w-4 h-4" />,
      level: "Advanced",
      component: <CostPerformance onNavigate={() => completeAndNavigate("cost-perf", "security-data")} />
    },
    {
      id: "security-data",
      title: "Security & Data Boundaries",
      description: "Zero-trust patterns for LLMs and tools",
      icon: <Database className="w-4 h-4" />,
      level: "Advanced",
      component: <SecurityDataBoundaries onNavigate={() => completeAndNavigate("security-data", "rag")} />
    },
    {
      id: "agent-payments-ap2",
      title: "Agentic Commerce: UCP & AP2",
      description: "Universal Commerce Protocol + Agent Payments for agentic transactions",
      icon: <Shield className="w-4 h-4" />,
      level: "Advanced",
      component: (
        <React.Suspense fallback={<div className="p-4 text-sm text-muted-foreground">Loading AP2 module…</div>}>
          <AgentPaymentsAP2 onNavigate={() => completeAndNavigate("agent-payments-ap2", "rag")} />
        </React.Suspense>
      )
    },
    {
      id: "rag",
      title: "RAG Systems",
      description: "Hybrid retrieval, re-ranking, and grounding",
      icon: <BookOpen className="w-4 h-4" />,
      level: "Advanced",
      component: <RAGSystems onNavigate={() => completeAndNavigate("rag", "multi-agent")} />
    },
    {
      id: "multi-agent",
      title: "Multi-Agent",
      description: "Supervisor/specialist patterns and safety",
      icon: <Network className="w-4 h-4" />,
      level: "Advanced",
      component: <MultiAgentOrchestration onNavigate={() => completeAndNavigate("multi-agent", "org-playbooks")} />
    },
    {
      id: "org-playbooks",
      title: "Org Playbooks",
      description: "Standardize and scale AI-native excellence",
      icon: <Users className="w-4 h-4" />,
      level: "Advanced",
      component: <OrgPlaybooks onNavigate={() => completeAndNavigate("org-playbooks", "cross-team")} />
    },
    {
      id: "cross-team",
      title: "Cross-Team Collaboration",
      description: "Non-technical teams using AI",
      icon: <Users className="w-4 h-4" />,
      level: "Advanced",
      component: <CrossTeamCollaborationSkills onNavigate={() => completeAndNavigate("cross-team", "novel-patterns")} />
    },
    {
      id: "novel-patterns",
      title: "Novel Patterns",
      description: "Revolutionary organizational practices",
      icon: <Lightbulb className="w-4 h-4" />,
      level: "Expert",
      component: <NovelOrganizationalPatterns onNavigate={() => completeAndNavigate("novel-patterns", "assessment")} />
    },
    {
      id: "assessment",
      title: "Frontier Assessment",
      description: "Evaluate your organization's AI readiness",
      icon: <Target className="w-4 h-4" />,
      level: "Intermediate",
      component: <FrontierFirmAssessment onNavigate={() => completeAndNavigate("assessment", "calculator")} />
    },
    {
      id: "calculator",
      title: "Ratio Calculator",
      description: "Optimize human-agent ratios",
      icon: <Calculator className="w-4 h-4" />,
      level: "Intermediate",
      component: <HumanAgentRatioCalculator onNavigate={() => completeAndNavigate("calculator", "future-state")} />
    },
    {
      id: "future-state-trends",
      title: "Future State Trends",
      description: "Where AI‑native practices are heading",
      icon: <Rocket className="w-4 h-4" />,
      level: "Expert",
      component: <FutureStateTrends onNavigate={undefined} />
    },
    {
      id: "frontier-agent-patterns",
      title: "Frontier Agent Patterns",
      description: "Quantum computing, robotics & advanced sensing",
      icon: <Rocket className="w-4 h-4" />,
      level: "Expert",
      component: <FrontierAgentPatterns onComplete={() => completeAndNavigate("frontier-agent-patterns", "hands-on-studios")} />
    },
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

  // ── Helpers ──
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

  const tabMap: Record<string, typeof tabs[number]> = {}
  tabs.forEach(t => { tabMap[t.id] = t })
  Object.entries(legacyToNew).forEach(([legacyId, newId]) => {
    if (tabMap[legacyId]) tabMap[newId] = tabMap[legacyId]
  })

  const isCompleted = (id: string) => {
    const newId = legacyToNew[id] || id
    return !!progress[newId]
  }

  const togglePerspective = (id: string) => {
    setActivePerspectives(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  // ── Voice handler (after tabs is defined) ──
  voiceHandlerRef.current = (text: string) => {
    const q = text.toLowerCase().trim()
    const allModules = [...tabs, ...perspectiveTabs]
    const match = allModules.find(m =>
      m.title.toLowerCase().includes(q) ||
      q.includes(m.title.toLowerCase()) ||
      m.id.replace(/-/g, ' ').includes(q) ||
      q.includes(m.id.replace(/-/g, ' '))
    )
    if (match) goModule(match.id)
  }

  // ── Hash-based URL routing ──
  useEffect(() => {
    const onNav = () => {
      const hash = window.location.hash.slice(1)
      if (hash.startsWith('module/')) {
        const mid = hash.slice(7)
        const resolvedMid = legacyToNew[mid] || mid
        let cat = skillCategories.find(c => c.moduleIds.includes(resolvedMid))
        if (!cat && perspectiveIds.has(resolvedMid)) cat = skillCategories.find(c => c.id === 'foundations')
        if (cat && (tabMap[resolvedMid] || tabMap[mid])) {
          setActiveCategoryId(cat.id); setActiveModuleId(resolvedMid); setActiveView('module')
          setViewKey(k => k + 1); return
        }
      }
      if (hash.startsWith('category/')) {
        const cid = hash.slice(9)
        if (skillCategories.find(c => c.id === cid)) {
          setActiveCategoryId(cid); setActiveModuleId(null); setActiveView('category')
          setViewKey(k => k + 1); return
        }
      }
      // Backward compat: bare hash = module id (old share URLs like #fundamentals)
      if (hash) {
        const resolvedId = legacyToNew[hash] || hash
        if (tabMap[resolvedId] || tabMap[hash]) {
          let cat = skillCategories.find(c => c.moduleIds.includes(resolvedId))
          if (!cat && perspectiveIds.has(resolvedId)) cat = skillCategories.find(c => c.id === 'foundations')
          if (cat) {
            setActiveCategoryId(cat.id); setActiveModuleId(resolvedId); setActiveView('module')
            setViewKey(k => k + 1); return
          }
        }
      }
      setActiveView('hub'); setActiveCategoryId(null); setActiveModuleId(null)
    }
    onNav()
    window.addEventListener('popstate', onNav)
    window.addEventListener('hashchange', onNav)
    return () => {
      window.removeEventListener('popstate', onNav)
      window.removeEventListener('hashchange', onNav)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Computed navigation values ──
  const currentCategory = activeCategoryId ? skillCategories.find(c => c.id === activeCategoryId) : null
  const currentModuleIdx = currentCategory && activeModuleId
    ? currentCategory.moduleIds.indexOf(activeModuleId) : -1
  const prevModuleId = currentCategory && currentModuleIdx > 0
    ? currentCategory.moduleIds[currentModuleIdx - 1] : null
  const nextModuleId = currentCategory && currentModuleIdx >= 0 && currentModuleIdx < currentCategory.moduleIds.length - 1
    ? currentCategory.moduleIds[currentModuleIdx + 1] : null
  const activeModuleData = activeModuleId ? tabMap[activeModuleId] : null
  const totalModules = skillCategories.reduce((acc, c) => acc + c.moduleIds.length, 0)
  const completedCount = Object.values(progress).filter(Boolean).length

  // ── Visual maps ──
  const categoryCover: Record<string, string> = {
    'foundations': '/covers/ai-skills-foundations.webp',
    'build': '/covers/ai-skills-build.webp',
    'operate': '/covers/ai-skills-operate.webp',
    'govern-optimize': '/covers/ai-skills-govern.webp',
    'multi-agent': '/covers/ai-skills-multi-agent.webp',
    'strategy-future': '/covers/ai-skills-strategy-future.webp',
    'applied-tools': '/covers/ai-skills-applied-tools.webp',
  }
  const categoryIcons: Record<string, React.ReactNode> = {
    'foundations': <Brain className="w-5 h-5" />,
    'build': <Rocket className="w-5 h-5" />,
    'operate': <Gauge className="w-5 h-5" />,
    'govern-optimize': <Shield className="w-5 h-5" />,
    'multi-agent': <Network className="w-5 h-5" />,
    'strategy-future': <Lightbulb className="w-5 h-5" />,
    'applied-tools': <Calculator className="w-5 h-5" />,
  }
  const categoryAccent: Record<string, string> = {
    'foundations': 'from-blue-500/20 to-blue-500/5',
    'build': 'from-orange-500/20 to-orange-500/5',
    'operate': 'from-cyan-500/20 to-cyan-500/5',
    'govern-optimize': 'from-rose-500/20 to-rose-500/5',
    'multi-agent': 'from-violet-500/20 to-violet-500/5',
    'strategy-future': 'from-amber-500/20 to-amber-500/5',
    'applied-tools': 'from-emerald-500/20 to-emerald-500/5',
  }
  const categoryGradient: Record<string, string> = {
    'foundations': 'from-blue-600 to-sky-400',
    'build': 'from-orange-600 to-amber-400',
    'operate': 'from-cyan-600 to-teal-400',
    'govern-optimize': 'from-rose-600 to-pink-400',
    'multi-agent': 'from-violet-600 to-purple-400',
    'strategy-future': 'from-amber-600 to-yellow-400',
    'applied-tools': 'from-emerald-600 to-green-400',
  }
  const bentoSize: Record<string, string> = {
    'foundations': 'lg:col-span-2 lg:row-span-2',
    'govern-optimize': 'lg:col-span-2',
    'strategy-future': 'lg:col-span-2 lg:row-span-2',
  }

  // ════════════════════════════════════════════════════════════════
  //  JSX
  // ════════════════════════════════════════════════════════════════
  return (
    <div className="flat-ui-2-theme ai-skills-flat-ui min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">

        {/* ═══ Glass Breadcrumb ═══ */}
        {activeView !== 'hub' && (
          <nav
            className="skills-breadcrumb sticky top-2 z-30 mb-6 flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm"
            aria-label="Navigation breadcrumb"
          >
            <button
              onClick={goHub}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
            >
              <CaretLeft className="w-4 h-4" />
              <span>Applied AI Skills</span>
            </button>
            {activeView === 'category' && currentCategory && (
              <>
                <span className="text-muted-foreground/40 select-none">/</span>
                <span className="text-foreground font-medium">{currentCategory.title}</span>
              </>
            )}
            {activeView === 'module' && currentCategory && (
              <>
                <span className="text-muted-foreground/40 select-none">/</span>
                <button
                  onClick={() => goCategory(currentCategory.id)}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {currentCategory.title}
                </button>
              </>
            )}
            {activeView === 'module' && activeModuleData && (
              <>
                <span className="text-muted-foreground/40 select-none">/</span>
                <span className="text-foreground font-medium truncate max-w-[220px]">{activeModuleData.title}</span>
              </>
            )}
          </nav>
        )}

        {/* ═══════════════════════════════════════════
              HUB VIEW
           ═══════════════════════════════════════════ */}
        {activeView === 'hub' && (
          <div key={`hub-${viewKey}`} className="skills-view-enter space-y-10">

            {/* Hero stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { value: '71%', label: 'of employees bring their own AI to work' },
                { value: '2.9×', label: 'productivity increase for Frontier Firms' },
                { value: '74%', label: 'believe AI will make them more creative' },
                { value: '132%', label: 'increase in strategic thinking time' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="skills-card-stagger group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 text-center"
                  style={{ '--stagger': i } as React.CSSProperties}
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <div className="text-3xl font-bold tracking-tight text-foreground">{stat.value}</div>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed" style={{ textWrap: 'balance' } as React.CSSProperties}>
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Title + actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight" style={{ textWrap: 'balance' } as React.CSSProperties}>
                  Applied AI Skills
                </h1>
                <p className="text-muted-foreground mt-1.5 max-w-2xl">
                  {completedCount}/{totalModules} modules completed — progressive skill development from AI-native mindset to revolutionary organizational patterns.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {voice.isSupported && (
                  <TooltipProvider delayDuration={300}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost" size="sm" onClick={handleVoiceMicClick}
                          className={voice.isListening
                            ? 'relative text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-950/40'
                            : 'text-muted-foreground hover:text-foreground'}
                          aria-label={voice.isListening ? 'Stop voice input' : 'Voice navigation'}
                        >
                          {voice.isListening
                            ? <MicrophoneStage size={16} weight="fill" />
                            : <Microphone size={16} />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="text-xs">
                        {voice.isListening ? 'Tap to stop' : 'Say a module name to jump there'}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                <Button variant="outline" size="sm" onClick={resetProgress}>Reset</Button>
                <ShareButton
                  url={`${window.location.origin}/ai-skills`}
                  title="Applied AI Skills - Open Agent School"
                  description="Progressive skill development from understanding AI-native mindset to implementing revolutionary organizational patterns"
                  variant="outline" size="sm" analyticsCategory="AI Skills Share"
                />
              </div>
            </div>

            {/* Video preview */}
            <button
              onClick={() => setIsVideoOpen(true)}
              className="group relative w-full max-w-lg rounded-2xl overflow-hidden border border-border/60 hover:border-primary/40 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="aspect-video bg-gradient-to-br from-primary/20 via-background to-accent/20 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/25">
                    <svg className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-foreground/90 bg-background/80 px-3 py-1 rounded-full backdrop-blur-sm">
                    See Agents in Action
                  </span>
                </div>
              </div>
            </button>

            {/* Perspective lenses */}
            <div className="skills-glass-panel rounded-2xl p-5">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Perspective Lenses</h2>
              <div className="flex flex-wrap gap-2">
                {perspectiveTabs.map(p => {
                  const active = activePerspectives.has(p.id)
                  return (
                    <Button
                      key={p.id} type="button" aria-pressed={active}
                      variant={active ? 'default' : 'outline'} size="sm"
                      onClick={() => togglePerspective(p.id)}
                      className={`transition-all duration-200 ${active ? 'ring-2 ring-primary/40 shadow-sm shadow-primary/10' : ''}`}
                    >
                      {active ? '✓ ' : ''}{p.title}
                    </Button>
                  )
                })}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Toggle lenses to inject role-specific pillar frameworks into the Foundations category.
              </p>
            </div>

            {/* ── Category bento grid ── */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Explore by Category</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(180px,auto)] gap-4 lg:gap-5">
                {skillCategories.map((cat, idx) => {
                  const done = cat.moduleIds.filter(mid => isCompleted(mid)).length
                  const pct = cat.moduleIds.length > 0 ? Math.round((done / cat.moduleIds.length) * 100) : 0
                  const hasCover = !!categoryCover[cat.id]
                  return (
                    <div
                      key={cat.id}
                      className={`skills-card-stagger skills-bento-tile group relative rounded-2xl border border-border/60 dark:border-white/[0.08] overflow-hidden cursor-pointer bg-card text-card-foreground ${bentoSize[cat.id] || ''}`}
                      style={{ '--stagger': idx + 4 } as React.CSSProperties}
                      onClick={() => goCategory(cat.id)}
                      role="button" tabIndex={0}
                      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goCategory(cat.id) } }}
                    >
                      {hasCover ? (
                        <>
                          <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                            style={{ backgroundImage: `url(${categoryCover[cat.id]})` }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,12,0.94)] via-[rgba(10,10,12,0.50)] to-[rgba(10,10,12,0.12)] group-hover:via-[rgba(10,10,12,0.45)] transition-colors duration-500" />
                        </>
                      ) : (
                        <div className={`absolute inset-0 bg-gradient-to-b ${categoryAccent[cat.id] || ''}`} />
                      )}
                      <div className="relative h-full flex flex-col justify-end p-5 gap-2.5">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 backdrop-blur-sm ${hasCover ? 'bg-white/10 text-white/90' : 'bg-muted/80 text-muted-foreground'}`}>
                            {categoryIcons[cat.id] || <BookOpen className="w-5 h-5" />}
                          </div>
                          <div className="min-w-0">
                            <h3 className={`font-semibold text-lg leading-tight tracking-tight ${hasCover ? 'text-white' : ''}`}>{cat.title}</h3>
                            <span className={`text-xs ${hasCover ? 'text-white/55' : 'text-muted-foreground'}`}>{cat.moduleIds.length} modules</span>
                          </div>
                          <CaretRight className={`w-5 h-5 ml-auto shrink-0 transition-transform duration-300 group-hover:translate-x-1 ${hasCover ? 'text-white/50' : 'text-muted-foreground'}`} />
                        </div>
                        {cat.description && (
                          <p className={`text-sm leading-relaxed ${hasCover ? 'text-white/65' : 'text-muted-foreground'}`}>{cat.description}</p>
                        )}
                        <div>
                          <div className={`flex justify-between text-[11px] mb-1 ${hasCover ? 'text-white/50' : 'text-muted-foreground'}`}>
                            <span>{done}/{cat.moduleIds.length}</span>
                            <span>{pct}%</span>
                          </div>
                          <div className={`w-full h-1 rounded-full overflow-hidden ${hasCover ? 'bg-white/15' : 'bg-muted'}`}>
                            <div
                              className={`h-full rounded-full transition-all duration-700 ease-out ${hasCover ? 'bg-white/50' : 'bg-primary/50'}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Benchmark references */}
            {benchmarkReferences.length > 0 && (
              <section>
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
                            Stress-test your agents with community benchmarks and competitive arenas.
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
                          key={ref.url} href={ref.url} target="_blank" rel="noopener noreferrer"
                          className="group relative overflow-hidden rounded-xl border border-white/20 bg-background/90 p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl dark:border-white/10 dark:bg-background/70"
                        >
                          <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-wide text-muted-foreground">
                            <span>{ref.groupName}</span>
                            <ArrowSquareOut className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                          </div>
                          <h3 className="mt-3 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">{ref.title}</h3>
                          {ref.description && (
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{ref.description}</p>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        )}

        {/* ═══════════════════════════════════════════
              CATEGORY VIEW
           ═══════════════════════════════════════════ */}
        {activeView === 'category' && currentCategory && (
          <div key={`cat-${activeCategoryId}-${viewKey}`} className="skills-view-enter space-y-8">

            {/* Category hero banner */}
            <div className="relative rounded-2xl overflow-hidden">
              {categoryCover[currentCategory.id] ? (
                <>
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${categoryCover[currentCategory.id]})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[rgba(10,10,12,0.92)] via-[rgba(10,10,12,0.65)] to-[rgba(10,10,12,0.25)]" />
                </>
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${categoryAccent[currentCategory.id] || ''}`} />
              )}
              <div className="relative px-8 py-10">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center backdrop-blur-sm ${categoryCover[currentCategory.id] ? 'bg-white/10 text-white' : 'bg-muted text-muted-foreground'}`}>
                    {categoryIcons[currentCategory.id] || <BookOpen className="w-7 h-7" />}
                  </div>
                  <div>
                    <h1 className={`text-3xl font-bold tracking-tight ${categoryCover[currentCategory.id] ? 'text-white' : ''}`}>
                      {currentCategory.title}
                    </h1>
                    {currentCategory.description && (
                      <p className={`mt-1 text-lg ${categoryCover[currentCategory.id] ? 'text-white/70' : 'text-muted-foreground'}`}>
                        {currentCategory.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className={`mt-4 text-sm ${categoryCover[currentCategory.id] ? 'text-white/50' : 'text-muted-foreground'}`}>
                  {currentCategory.moduleIds.filter(mid => isCompleted(mid)).length} of {currentCategory.moduleIds.length} modules completed
                </div>
              </div>
            </div>

            {/* Module cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {currentCategory.moduleIds.map((mid, idx) => {
                const t = tabMap[mid]
                if (!t) return null
                const complete = isCompleted(mid)
                return (
                  <div
                    key={mid}
                    className="skills-card-stagger skills-module-card group relative rounded-2xl border border-border/60 bg-card overflow-hidden cursor-pointer"
                    style={{ '--stagger': idx } as React.CSSProperties}
                    onClick={() => goModule(mid)}
                    role="button" tabIndex={0}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goModule(mid) } }}
                  >
                    <div className={`h-1 w-full bg-gradient-to-r ${categoryGradient[currentCategory.id] || 'from-primary to-primary/60'} ${complete ? 'opacity-100' : 'opacity-30 group-hover:opacity-60'} transition-opacity duration-300`} />
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-lg bg-muted/80 flex items-center justify-center shrink-0 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-200">
                            {t.icon}
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-semibold text-[15px] leading-tight group-hover:text-primary transition-colors duration-200">{t.title}</h3>
                            <div className="flex items-center gap-2 mt-1.5">
                              <Badge className={getLevelColor(t.level)} variant="secondary">{t.level}</Badge>
                              {complete && (
                                <span className="inline-flex items-center gap-1 text-green-600 text-[11px] font-medium">
                                  <CheckCircle className="w-3.5 h-3.5" /> Done
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <CaretRight className="w-5 h-5 shrink-0 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200 mt-2" />
                      </div>
                      <p className="text-sm text-muted-foreground mt-3 leading-relaxed line-clamp-2">{t.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Perspective pillar cards (foundations + active lenses) */}
            {currentCategory.id === 'foundations' && activePerspectives.size > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Active Perspective Lenses
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...activePerspectives].map((pid, idx) => {
                    const pTab = perspectiveTabs.find(pt => pt.id === pid)
                    if (!pTab) return null
                    return (
                      <div
                        key={pid}
                        className="skills-card-stagger skills-module-card group rounded-2xl border border-primary/20 bg-primary/[0.02] overflow-hidden cursor-pointer"
                        style={{ '--stagger': currentCategory.moduleIds.length + idx } as React.CSSProperties}
                        onClick={() => goModule(pid)}
                        role="button" tabIndex={0}
                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goModule(pid) } }}
                      >
                        <div className="h-1 w-full bg-gradient-to-r from-primary to-primary/40" />
                        <div className="p-5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">{pTab.icon}</div>
                            <div>
                              <h3 className="font-semibold group-hover:text-primary transition-colors">{pTab.title} Pillars</h3>
                              <Badge className={getLevelColor(pTab.level)} variant="secondary">{pTab.level}</Badge>
                            </div>
                            <CaretRight className="w-5 h-5 ml-auto text-primary/40 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{pTab.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══════════════════════════════════════════
              MODULE VIEW
           ═══════════════════════════════════════════ */}
        {activeView === 'module' && activeModuleData && (
          <div key={`mod-${activeModuleId}-${viewKey}`} className="skills-view-enter">

            {/* Module header */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${categoryGradient[activeCategoryId || ''] || 'from-primary to-primary/60'} text-white shadow-lg shadow-primary/20`}>
                  {activeModuleData.icon}
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">{activeModuleData.title}</h1>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Badge className={getLevelColor(activeModuleData.level)} variant="secondary">{activeModuleData.level}</Badge>
                    {isCompleted(activeModuleId!) && (
                      <span className="inline-flex items-center gap-1 text-green-600 text-sm font-medium">
                        <CheckCircle className="w-4 h-4" /> Completed
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <ShareButton
                url={`${window.location.origin}/ai-skills#module/${activeModuleId}`}
                title={`${activeModuleData.title} - Applied AI Skills`}
                description={activeModuleData.description}
                variant="outline" size="sm"
                analyticsCategory="AI Skills Module Share"
              />
            </div>

            <p className="text-muted-foreground mb-6 max-w-3xl">{activeModuleData.description}</p>

            {/* Module content */}
            <div className="skills-module-content rounded-2xl border border-border/60 bg-card/50 p-6 lg:p-8">
              {activeModuleData.component}
            </div>

            {/* Completion + Prev/Next */}
            <div className="mt-8 space-y-4">
              {!isCompleted(activeModuleId!) && (
                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary" onClick={() => setProgress(prev => ({ ...prev, [activeModuleId!]: true }))}>
                    <CheckCircle className="w-4 h-4 mr-1.5" /> Mark Complete
                  </Button>
                  {nextModuleId && (
                    <Button onClick={() => {
                      setProgress(prev => ({ ...prev, [activeModuleId!]: true }))
                      goModule(nextModuleId)
                    }}>
                      Complete &amp; Next <CaretRight className="w-4 h-4 ml-1" />
                    </Button>
                  )}
                </div>
              )}
              <div className="flex items-center justify-between pt-4 border-t border-border/40">
                {prevModuleId ? (
                  <Button variant="ghost" size="sm" onClick={() => goModule(prevModuleId)} className="gap-1.5 text-muted-foreground hover:text-foreground">
                    <CaretLeft className="w-4 h-4" />
                    <span className="hidden sm:inline max-w-[160px] truncate">{tabMap[prevModuleId]?.title || 'Previous'}</span>
                    <span className="sm:hidden">Previous</span>
                  </Button>
                ) : <div />}
                {nextModuleId ? (
                  <Button variant="ghost" size="sm" onClick={() => goModule(nextModuleId)} className="gap-1.5 text-muted-foreground hover:text-foreground">
                    <span className="hidden sm:inline max-w-[160px] truncate">{tabMap[nextModuleId]?.title || 'Next'}</span>
                    <span className="sm:hidden">Next</span>
                    <CaretRight className="w-4 h-4" />
                  </Button>
                ) : <div />}
              </div>
            </div>
          </div>
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
