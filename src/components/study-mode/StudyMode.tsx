import React, { useState, useEffect, useMemo, useRef } from 'react';

// Ambient window flag typing
declare global {
  interface Window {
    __OAS_FLAGS?: { studyModeGating?: boolean };
  }
}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Brain, PuzzlePiece, Bug, Lightbulb, Target, TrendUp,
  CheckCircle, Clock, Star, ArrowRight, Play, BookOpen, DownloadSimple
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

// Import Study Mode components
import ReactLazy = React.lazy;
const SocraticQuestionMode = React.lazy(async () => {
  const t0 = performance.now();
  const mod = await import('./SocraticQuestionMode.tsx');
  const t1 = performance.now();
  try { window.dispatchEvent(new CustomEvent('analytics:chunkLoad', { detail: { source: 'SocraticQuestionMode', ms: +(t1 - t0).toFixed(2) } })); } catch {}
  return mod;
});
const InteractiveScenarioMode = React.lazy(async () => {
  const t0 = performance.now();
  const mod = await import('./InteractiveScenarioMode.tsx');
  const t1 = performance.now();
  try { window.dispatchEvent(new CustomEvent('analytics:chunkLoad', { detail: { source: 'InteractiveScenarioMode', ms: +(t1 - t0).toFixed(2) } })); } catch {}
  return mod;
});
const DebugChallengeMode = React.lazy(async () => {
  const t0 = performance.now();
  const mod = await import('./DebugChallengeMode.tsx');
  const t1 = performance.now();
  try { window.dispatchEvent(new CustomEvent('analytics:chunkLoad', { detail: { source: 'DebugChallengeMode', ms: +(t1 - t0).toFixed(2) } })); } catch {}
  return mod;
});
import { SuperCriticalLearning } from '../study/supercritical/SuperCriticalLearning';

// Import Study Mode data
// Replace direct heavy library imports with dynamic loader utilities
import {
  getStudyModeProgress,
  calculateStudyModeProgress,
  clearTypeProgress,
} from '@/lib/data/studyMode/progress';
import { loadStudyModeData, flattenQuestions, filterQuestionsByConcept, getRecommendedQuestion, deriveCategories } from '@/lib/data/studyMode/lazy';
import { StudyModeType, StudyModeQuestion, StudyModeSession } from '@/lib/data/studyMode/types';
import { toast } from '@/components/ui/use-toast';
import { MasteryPanel, FailureModesPanel, TransferChallengesView } from './index';
import { emitTelemetry } from '../../lib/data/studyMode/telemetry';
import StrategyReplaySandbox from './StrategyReplaySandbox';
import { evaluateAdaptiveRules } from '@/lib/data/studyMode/adaptiveRuntime';
import { scoreRiskDecision } from '@/lib/data/studyMode/riskPractice';
import { misconceptionRefutations } from '@/lib/data/studyMode/misconceptionRefutations';
import { flashcards, getDueFlashcards, reviewFlashcard, persistFlashcard } from '@/lib/data/studyMode/flashcards';
import { mockBenchmark } from '@/lib/data/studyMode/cohortBenchmarks';
import MarkdownRenderer from './MarkdownRenderer';
// patternInterlockEdges no longer needed directly (visualized via InterlockMap)
import { driftEvents } from '@/lib/data/studyMode/driftLabs';
import { computeMasteryTier } from '@/lib/data/studyMode/patternMastery';
interface StudyModeProps {
  conceptId?: string;
  onComplete?: (session: StudyModeSession) => void;
}

const strategicToolkits = [
  {
    id: 'north-star-alignment',
    title: 'North Star Alignment Canvas',
    description: 'Capture mission, metrics, and guardrails that ground your agent charter.',
    href: '/toolkits/north-star-alignment-canvas.md',
    downloadName: 'north-star-alignment-canvas.md',
  },
  {
    id: 'portfolio-balance',
    title: 'Portfolio Balance Canvas',
    description: 'Prioritize agent investments by balancing value, readiness, and risk.',
    href: '/toolkits/portfolio-balance-canvas.md',
    downloadName: 'portfolio-balance-canvas.md',
  },
  {
    id: 'responsible-ai-governance',
    title: 'Responsible AI Governance Playbook',
    description: 'Map oversight forums, escalation paths, and control checkpoints.',
    href: '/toolkits/responsible-ai-governance-playbook.md',
    downloadName: 'responsible-ai-governance-playbook.md',
  },
  {
    id: 'continuous-improvement',
    title: 'Continuous Improvement Flywheel',
    description: 'Translate telemetry and feedback signals into iterative upgrades.',
    href: '/toolkits/continuous-improvement-flywheel.md',
    downloadName: 'continuous-improvement-flywheel.md',
  },
  {
    id: 'knowledge-ops',
    title: 'Knowledge Ops Runbook',
    description: 'Operationalize sourcing, curation, and verification for trusted knowledge.',
    href: '/toolkits/knowledge-ops-runbook.md',
    downloadName: 'knowledge-ops-runbook.md',
  },
  {
    id: 'platform-operating-model',
    title: 'Platform Operating Model Canvas',
    description: 'Define tiers, funding cadences, and paved roads for platform growth.',
    href: '/toolkits/platform-operating-model.md',
    downloadName: 'platform-operating-model.md',
  },
  {
    id: 'partnership-evaluation',
    title: 'Partnership Evaluation Canvas',
    description: 'Compare partner capabilities, risk posture, and integration effort.',
    href: '/toolkits/partnership-evaluation-canvas.md',
    downloadName: 'partnership-evaluation-canvas.md',
  },
  {
    id: 'enablement-roadmap',
    title: 'Enablement Roadmap Canvas',
    description: 'Plan enablement waves, incentives, and feedback signals for adoption.',
    href: '/toolkits/enablement-roadmap-canvas.md',
    downloadName: 'enablement-roadmap-canvas.md',
  },
] as const;

const StudyMode: React.FC<StudyModeProps> = ({ conceptId, onComplete }) => {
  const [activeTab, setActiveTab] = useState<'overview' | StudyModeType>('overview');
  const [selectedQuestion, setSelectedQuestion] = useState<StudyModeQuestion | null>(null);
  const [sessions, setSessions] = useState<StudyModeSession[]>([]);
  const [progress, setProgress] = useState(calculateStudyModeProgress([]));
  const [dataBundle, setDataBundle] = useState<any | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [inlineToolkit, setInlineToolkit] = useState<typeof strategicToolkits[number] | null>(null);
  const [toolkitMarkdown, setToolkitMarkdown] = useState<string>('');
  const [loadingToolkit, setLoadingToolkit] = useState<boolean>(false);
  const [toolkitError, setToolkitError] = useState<string | null>(null);
  // Live region for announcing session completion
  const [lastCompletionMessage, setLastCompletionMessage] = useState<string | null>(null);
  const liveRegionRef = useRef<HTMLDivElement | null>(null);
  // Feature flag (can be toggled via localStorage.setItem('studyModeGating','1'))
  const gatingEnabled = useMemo(() => {
    try {
      if (typeof window !== 'undefined') {
        // Allow runtime override via global flag (e.g., window.__OAS_FLAGS.studyModeGating)
        // @ts-ignore
        if (window.__OAS_FLAGS && typeof window.__OAS_FLAGS.studyModeGating === 'boolean') {
          return !!window.__OAS_FLAGS.studyModeGating;
        }
        const v = localStorage.getItem('studyModeGating');
        return v === '1' || v === 'true';
      }
    } catch {}
    return false;
  }, []);

  // Ordered progression (used for recommendations + optional gating)
  const MODE_ORDER: StudyModeType[] = ['socratic','scenario','debug','scl'];

  // Unlock logic (only applied if gatingEnabled). Simple rule: a mode is unlocked if it's first, or the previous mode progress >= 40% OR at least 1 session completed in that previous mode.
  const isTypeUnlocked = (type: StudyModeType) => {
    if (!gatingEnabled) return true;
    const idx = MODE_ORDER.indexOf(type);
    if (idx <= 0) return true; // first always unlocked
    const prevType = MODE_ORDER[idx - 1];
    const prevProgress = progress.typeProgress[prevType] || 0;
    const prevCompleted = sessions.filter(s => s.type === prevType && s.isComplete).length;
    return prevProgress >= 40 || prevCompleted > 0; // threshold
  };

  // Load progress + data bundle only once (avoid flicker from re-runs)
  useEffect(() => {
    const loadedSessions = getStudyModeProgress();
    setSessions(loadedSessions);
    setProgress(calculateStudyModeProgress(loadedSessions));
    (async () => {
      try {
        const t0 = performance.now();
        const bundle = await loadStudyModeData();
        const t1 = performance.now();
        try { window.dispatchEvent(new CustomEvent('analytics:chunkLoad', { detail: { source: 'studyModeData', ms: +(t1 - t0).toFixed(2) } })); } catch {}
        setDataBundle(bundle);
        setCategories(deriveCategories(bundle));
      } catch (e) {
        console.error('Failed to load Study Mode data bundle', e);
      } finally {
        setLoadingData(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!inlineToolkit) return;
    let cancelled = false;
    setLoadingToolkit(true);
    setToolkitError(null);
    setToolkitMarkdown('');
    fetch(inlineToolkit.href)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to load toolkit: ${res.status}`);
        }
        return res.text();
      })
      .then(text => {
        if (!cancelled) {
          setToolkitMarkdown(text);
        }
      })
      .catch(err => {
        if (!cancelled) {
          console.error('Failed to fetch toolkit', err);
          setToolkitError('Unable to load toolkit. Please download the file instead.');
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoadingToolkit(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [inlineToolkit]);

  // Deep-link + event handler effect (runs when dataBundle first appears)
  useEffect(() => {
    if (!dataBundle) return; // wait until data loaded
    try {
      const hash = window.location.hash.toLowerCase();
      if (['#scl','#socratic','#scenario','#debug'].includes(hash)) {
        setActiveTab(hash.replace('#','') as any);
      }
      const search = window.location.search;
      if (search) {
        const params = new URLSearchParams(search);
        const qid = params.get('qid');
        const concept = params.get('concept');
        const preferredType = (params.get('type') as StudyModeType | null);
        if (qid) {
          const q = flattenQuestions(dataBundle).find(q => q.id === qid);
          if (q) { setSelectedQuestion(q); setActiveTab(q.type); return; }
        }
        if (concept) {
          let conceptQuestions = filterQuestionsByConcept(dataBundle, concept);
            if (preferredType) conceptQuestions = conceptQuestions.filter(q => q.type === preferredType);
          const q = conceptQuestions[0];
          if (q) { setSelectedQuestion(q); setActiveTab(q.type); return; }
        }
      }
    } catch {}
    const handler = (event: Event) => {
      try {
        const { qid, concept, type } = (event as CustomEvent<{ qid?: string; concept?: string; type?: StudyModeType }>).detail || {};
        if (qid) {
          const q = flattenQuestions(dataBundle).find(q => q.id === qid);
          if (q) { setSelectedQuestion(q); setActiveTab(q.type); toast({ title: 'Loaded Study Challenge', description: q.title }); return; }
        }
        if (concept) {
          let conceptQuestions = filterQuestionsByConcept(dataBundle, concept);
          if (type) conceptQuestions = conceptQuestions.filter(q => q.type === type);
          const q = conceptQuestions[0];
          if (q) { setSelectedQuestion(q); setActiveTab(q.type); toast({ title: 'Loaded Concept Challenge', description: q.title }); }
        }
      } catch {}
    };
    window.addEventListener('studyMode:launchQuestion', handler as EventListener);
    return () => window.removeEventListener('studyMode:launchQuestion', handler as EventListener);
  }, [dataBundle]);

  // Get all questions from all concepts (memoized)
  const allQuestions = useMemo(() => dataBundle ? flattenQuestions(dataBundle) : [], [dataBundle]);
  
  const completedQuestionIds = sessions
    .filter(s => s.isComplete)
    .map(s => s.questionId);

  // Get recommended next question (from any concept)
  const recommendedQuestion = dataBundle ? getRecommendedQuestion(dataBundle, completedQuestionIds) : null;

  // Recommended next MODE (independent of specific question) – first in order not yet at 100%
  const recommendedNextMode = useMemo(() => {
    for (const m of MODE_ORDER) {
      const pct = progress.typeProgress[m];
      if (pct === undefined) return m; // no data yet
      if (pct < 100) return m;
    }
    return MODE_ORDER[MODE_ORDER.length - 1];
  }, [progress.typeProgress]);

  // Analytics: emit recommendation event once per recommended mode
  const lastRecSentRef = useRef<string | null>(null);
  useEffect(() => {
    if (!recommendedNextMode) return;
    if (lastRecSentRef.current === recommendedNextMode) return;
    try {
      window.dispatchEvent(new CustomEvent('analytics:recommendedMode', { detail: { mode: recommendedNextMode, gatingEnabled, typeProgress: progress.typeProgress } }));
      lastRecSentRef.current = recommendedNextMode;
    } catch {}
  }, [recommendedNextMode, gatingEnabled, progress.typeProgress]);

  // Helper functions
  const getTypeIcon = (type: StudyModeType) => {
    switch (type) {
      case 'socratic': return <Brain size={20} />;
      case 'scenario': return <PuzzlePiece size={20} />;
      case 'debug': return <Bug size={20} />;
      case 'guided': return <Lightbulb size={20} />;
      case 'scl': return <TrendUp size={20} />;
      default: return <BookOpen size={20} />;
    }
  };

  const getTypeColor = (type: StudyModeType) => {
    switch (type) {
  case 'socratic': return 'bg-blue-100 text-black border-blue-200 dark:text-blue-200 dark:bg-blue-900';
  case 'scenario': return 'bg-green-100 text-black border-green-200 dark:text-green-200 dark:bg-green-900';
  case 'debug': return 'bg-red-100 text-black border-red-200 dark:text-red-200 dark:bg-red-900';
  case 'guided': return 'bg-purple-100 text-black border-purple-200 dark:text-purple-200 dark:bg-purple-900';
  case 'scl': return 'bg-orange-100 text-black border-orange-200 dark:text-orange-200 dark:bg-orange-900';
  default: return 'bg-gray-100 text-black border-gray-200 dark:text-gray-200 dark:bg-gray-900';
    }
  };

  const handleQuestionStart = (question: StudyModeQuestion) => {
    if (!isTypeUnlocked(question.type)) {
      toast({ title: 'Locked Mode', description: 'Complete prerequisite sessions to unlock this mode.' });
      try { window.dispatchEvent(new CustomEvent('analytics:gatingBlocked', { detail: { attempted: question.type } })); } catch {}
      return;
    }
    setSelectedQuestion(question);
    setActiveTab(question.type);
    try { window.dispatchEvent(new CustomEvent('analytics:questionStart', { detail: { id: question.id, type: question.type } })); } catch {}
  };

  const handleOpenToolkitInline = (toolkit: typeof strategicToolkits[number]) => {
    setInlineToolkit(toolkit);
    try {
      emitTelemetry({ kind: 'hint_used', meta: { event: 'toolkit_inline_open', toolkitId: toolkit.id } });
    } catch {}
  };

  const handleCloseToolkitInline = () => {
    setInlineToolkit(null);
    setToolkitMarkdown('');
    setToolkitError(null);
  };

  const handleSessionComplete = (session: StudyModeSession) => {
  const updatedSessions = [...sessions, session];
    setSessions(updatedSessions);
    setProgress(calculateStudyModeProgress(updatedSessions));
    setSelectedQuestion(null);
  setActiveTab('overview');
  try { window.dispatchEvent(new CustomEvent('analytics:sessionComplete', { detail: { type: session.type, score: session.score } })); } catch {}
  try { emitTelemetry({ kind: 'pattern_attempt', patternId: session.conceptId, challengeId: session.questionId }); } catch {}

    // Multi-dimensional scoring (#11) – derive simple proxies
    const correctness = (session.score || 0) / 100;
    const riskBudget = { costLimit: 10, latencyMs: 3000, sensitivity: 'medium' as const };
    const simulatedActual = { cost: Math.random()*12, latencyMs: 1500 + Math.random()*2500, sensitivity: 'medium' as const };
    const riskScore = scoreRiskDecision(correctness, riskBudget, simulatedActual);
    try { emitTelemetry({ kind: 'multi_dimensional_score', patternId: session.conceptId, challengeId: session.questionId, correctness: riskScore.correctness, riskAlignment: riskScore.riskAlignment, efficiency: riskScore.efficiency, generalization: Math.min(1, correctness * (session.type === 'scl' ? 1.1 : 0.9)) }); } catch {}

    // Adaptive rule firing simulation (#2) – check any rule triggers by keywords in insights / question id
    try {
      const fired = evaluateAdaptiveRules(session, updatedSessions);
      fired.forEach(r => emitTelemetry({ kind: 'adaptive_rule_fired', patternId: session.conceptId, challengeId: session.questionId, meta: { rule: r.id, action: r.prescribe.action, resource: r.prescribe.resourceRef } }));
    } catch {}

    // Misconception refutation emission (#15)
    try {
      const refutes = misconceptionRefutations.filter(m => m.patternId === session.conceptId);
      if (refutes.length) emitTelemetry({ kind: 'failure_mode_triggered', patternId: session.conceptId, challengeId: session.questionId, meta: { refutations: refutes.slice(0,2) } });
    } catch {}

    // Governance impact estimator stub (#18) – only for policy pattern
    if (session.conceptId === 'policy-gated-tool-invocation') {
      try { emitTelemetry({ kind: 'governance_impact_estimated', patternId: session.conceptId, meta: { hypotheticalBreach: 'Unauthorized PII exfiltration if gating disabled', severity: 'high' } }); } catch {}
    }
    // Accessible completion announcement
    const msg = `Completed ${session.type} session${typeof session.score === 'number' ? ' with score ' + session.score + '%' : ''}`;
    setLastCompletionMessage(msg);
    // Clear after a few seconds to allow subsequent announcements
    setTimeout(() => setLastCompletionMessage(null), 6000);
    
    if (onComplete) {
      onComplete(session);
    }
  };

  const handleRetakeSocratic = () => {
    setSelectedQuestion(null);
  setActiveTab('socratic');
  try { window.dispatchEvent(new CustomEvent('analytics:retakeMode', { detail: { type: 'socratic' } })); } catch {}
    
    // Clear all Socratic mode progress using utility function
    clearTypeProgress('socratic');
    
    // Update the local progress state
    const updatedSessions = getStudyModeProgress();
    setProgress(calculateStudyModeProgress(updatedSessions));
  };
  const handleRetakeScenario = () => {
    setSelectedQuestion(null);
  setActiveTab('scenario');
  try { window.dispatchEvent(new CustomEvent('analytics:retakeMode', { detail: { type: 'scenario' } })); } catch {}
    
    // Clear all Scenario mode progress using utility function
    clearTypeProgress('scenario');
    
    // Update the local progress state
    const updatedSessions = getStudyModeProgress();
    setProgress(calculateStudyModeProgress(updatedSessions));
  };

  const handleRetakeDebug = () => {
    setSelectedQuestion(null);
  setActiveTab('debug');
  try { window.dispatchEvent(new CustomEvent('analytics:retakeMode', { detail: { type: 'debug' } })); } catch {}
    
    // Clear all Debug mode progress using utility function
    clearTypeProgress('debug');
    
    // Update the local progress state
    const updatedSessions = getStudyModeProgress();
    setProgress(calculateStudyModeProgress(updatedSessions));
  };

  const renderQuestionCard = (question: StudyModeQuestion, isCompleted: boolean = false) => (
    <Card 
      key={question.id}
      className={cn(
        // Base interactive styling
        "relative transition-all hover:shadow-md outline-none",
        // Pointer & cursor semantics
        !isCompleted ? "cursor-pointer" : "cursor-default",
        // Completed styling: neutral text in light mode + subtle green background + accent stripe
        isCompleted
          ? [
              "border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-900/25",
              "before:content-[''] before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-green-500 dark:before:bg-green-600/70 before:rounded-l",
              // Dark mode readable text tint only (avoid low-contrast green-on-pale-green in light)
              "dark:[&_*]:text-green-200"
            ].join(' ')
          : "hover:border-primary"
      )}
      role={!isCompleted ? 'button' : undefined}
      tabIndex={!isCompleted ? 0 : -1}
      aria-disabled={isCompleted || undefined}
      aria-label={`${question.title}${isCompleted ? ' (completed)' : ''}`}
      onClick={() => !isCompleted && handleQuestionStart(question)}
      onKeyDown={(e) => {
        if (isCompleted) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleQuestionStart(question);
        }
      }}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            {getTypeIcon(question.type)}
            <Badge className={cn("text-xs", getTypeColor(question.type))}>
              {question.type}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {question.level}
            </Badge>
          </div>
          {isCompleted && <CheckCircle size={20} className="text-green-600" />}
        </div>
        
        <h3 className="font-medium mb-1">{question.title}</h3>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{question.timeEstimate || 15} min</span>
          </div>
          {question.relatedConcepts && (
            <div className="flex items-center gap-1">
              <Target size={14} />
              <span>{question.relatedConcepts.length} concepts</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  // If a question is selected, show the specific mode component
  if (selectedQuestion) {
    const commonProps = {
      question: selectedQuestion,
      onComplete: handleSessionComplete,
      onBack: () => setSelectedQuestion(null)
    };

    const ModeWrapper: React.FC<{children: React.ReactNode}> = ({ children }) => (
      <React.Suspense fallback={<div className="p-8 text-center">Loading module…</div>}>{children}</React.Suspense>
    );
    switch (selectedQuestion.type) {
      case 'socratic':
        return <ModeWrapper><SocraticQuestionMode {...commonProps} /></ModeWrapper>;
      case 'scenario':
        if (!selectedQuestion.scenario || typeof selectedQuestion.scenario === 'string') {
          return <div>Scenario data not found</div>;
        }
        return <ModeWrapper><InteractiveScenarioMode scenario={selectedQuestion.scenario} onComplete={handleSessionComplete} onBack={() => setSelectedQuestion(null)} /></ModeWrapper>;
      case 'debug':
        if (!selectedQuestion.debugChallenge) {
          return <div>Debug challenge data not found</div>;
        }
        return <ModeWrapper><DebugChallengeMode challenge={selectedQuestion.debugChallenge} onComplete={handleSessionComplete} onBack={() => setSelectedQuestion(null)} /></ModeWrapper>;
      default:
        return <div>Question type not implemented yet</div>;
    }
  }

  // Loading skeleton while data bundle is being fetched
  if (loadingData) {
    return (
      <Card className="w-full max-w-5xl mx-auto animate-pulse">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain size={24} className="text-primary" />
            Loading Study Mode Resources…
          </CardTitle>
          <CardDescription>
            Large adaptive learning content is being streamed in on-demand to keep the initial app fast.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-6 bg-muted rounded w-1/3" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Live region (polite) for screen reader users to hear completion updates */}
      <div
        ref={liveRegionRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {lastCompletionMessage || ''}
      </div>
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mb-2">
          <Lightbulb size={32} className="text-primary" />
          Study Mode
        </h1>
        <p className="text-lg text-muted-foreground">
          Learn through Socratic questioning, interactive scenarios, debugging and super critical learning challenges
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => {
        setActiveTab(value as any);
        try { window.dispatchEvent(new CustomEvent('analytics:studyTabChange', { detail: { tab: value, gatingEnabled } })); } catch {}
      }}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="socratic" className="relative">
            Socratic
            {recommendedNextMode === 'socratic' && <span className="absolute -top-1 -right-2 text-[10px] px-1 py-0.5 rounded bg-primary text-white">Next</span>}
          </TabsTrigger>
            <TabsTrigger value="scenario" className="relative" disabled={!isTypeUnlocked('scenario')}>
              Scenarios
              {recommendedNextMode === 'scenario' && <span className="absolute -top-1 -right-2 text-[10px] px-1 py-0.5 rounded bg-primary text-white">Next</span>}
            </TabsTrigger>
          <TabsTrigger value="debug" className="relative" disabled={!isTypeUnlocked('debug')}>
            Debug
            {recommendedNextMode === 'debug' && <span className="absolute -top-1 -right-2 text-[10px] px-1 py-0.5 rounded bg-primary text-white">Next</span>}
          </TabsTrigger>
          <TabsTrigger value="scl" className="relative" disabled={!isTypeUnlocked('scl')}>
            SCL
            {recommendedNextMode === 'scl' && <span className="absolute -top-1 -right-2 text-[10px] px-1 py-0.5 rounded bg-primary text-white">Next</span>}
          </TabsTrigger>
        </TabsList>

  {/* Overview Tab */}
  <TabsContent value="overview" className="space-y-6">
        {/* Flashcard quick review (#14) */}
        <Card>
          <CardHeader><CardTitle className="text-sm">Active Recall Flashcards</CardTitle><CardDescription>Due now: {getDueFlashcards().length}</CardDescription></CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {getDueFlashcards().slice(0,6).map(fc => (
              <div key={fc.id} className="p-2 border rounded-md text-xs dark:border-neutral-700 w-56">
                <div className="font-medium mb-1 line-clamp-3" title={fc.prompt}>{fc.prompt}</div>
                <div className="text-[10px] mb-1 text-muted-foreground">Interval: {fc.interval}d • EF {fc.easiness.toFixed(2)}</div>
                <div className="flex gap-1" role="group" aria-label="Flashcard grading buttons">
                  {[0,1,2,3,4,5].map(q => (
                    <button
                      key={q}
                      aria-label={`Grade ${q}`}
                      className="px-1 py-0.5 border rounded hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                      onClick={() => { const upd = reviewFlashcard(fc, q as any); persistFlashcard(upd); try { emitTelemetry({ kind: 'hint_used', patternId: fc.patternId, challengeId: fc.id, meta: { event: 'flashcard_review', quality: q } }); } catch {} }}
                      title={`Grade ${q}`}>{q}</button>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Cohort benchmark mock (#16) */}
        <Card>
          <CardHeader><CardTitle className="text-sm">Cohort Benchmark (Mock)</CardTitle><CardDescription>Local vs synthetic cohort</CardDescription></CardHeader>
          <CardContent className="text-xs space-y-1">
            {['query-intent-structured-access','policy-gated-tool-invocation'].map(pid => {
              const localScores = sessions.filter(s => s.conceptId===pid && typeof s.score==='number').map(s => (s.score||0)/100);
              const r = mockBenchmark(pid, localScores);
              try { emitTelemetry({ kind: 'hint_used', patternId: pid, meta: { event: 'benchmark_viewed', percentile: r.percentile } }); } catch {}
              return <div key={pid} className="flex justify-between border rounded p-1 dark:border-neutral-700"><span className="truncate max-w-[60%]" title={pid}>{pid}</span><span>{r.percentile.toFixed(0)}p ({r.deltaFromMedian>=0?'+':''}{(r.deltaFromMedian*100).toFixed(1)}%)</span></div>;
            })}
          </CardContent>
        </Card>


        {/* Drift Lab teaser (#13) */}
        <Card>
          <CardHeader><CardTitle className="text-sm">Drift Lab Events</CardTitle><CardDescription>Upcoming simulation hooks</CardDescription></CardHeader>
          <CardContent className="flex flex-col gap-2 text-xs">
            {driftEvents.map(ev => (
              <div key={ev.id} className="p-2 border rounded-md dark:border-neutral-700">
                <div className="font-medium">{ev.type}</div>
                <div>{ev.description}</div>
                <div className="text-[10px] text-muted-foreground">Affected: {ev.affectedPatterns.join(', ')}</div>
              </div>
            ))}
          </CardContent>
        </Card>
          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendUp size={24} className="text-primary" />
                Your Study Progress
              </CardTitle>
              <CardDescription>
                Track your learning journey across different study modes. {gatingEnabled ? 'Gating is enabled; progress in earlier modes unlocks later modes.' : 'All modes are open. Enable experimental gating via console: localStorage.setItem("studyModeGating","1"); location.reload();'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-2">
                    {progress.completedSessions}
                  </div>
                  <div className="text-sm text-muted-foreground">Sessions Completed</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-2">
                    {Math.round(progress.averageScore)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Average Score</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-2">
                    {progress.insights.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Key Insights</div>
                </div>
              </div>

              {/* Progress by Type */}
              <div className="space-y-3">
                <h4 className="font-medium">Progress by Study Mode</h4>
                {Object.entries(progress.typeProgress).map(([type, percentage]) => (
                  <div key={type} className="flex items-center gap-3">
                    <div className="flex items-center gap-2 w-24">
                      {getTypeIcon(type as StudyModeType)}
                      <span className="text-sm capitalize">{type}</span>
                    </div>
                    <div className="flex-1">
                      <Progress value={percentage} className="h-2" />
                    </div>
                    <span className="text-sm text-muted-foreground w-12">
                      {Math.round(percentage)}%
                    </span>
                  </div>
                ))}
                {/* Completion badges grid */}
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {(['socratic','scenario','debug','scl'] as StudyModeType[]).map(mode => {
                    const pct = progress.typeProgress[mode] || 0;
                    if (pct <= 0) return null;
                    const complete = pct >= 100;
                    return (
                      <div
                        key={mode}
                        className={cn(
                          "relative border rounded-md p-3 flex items-center justify-between text-xs sm:text-sm",
                          complete ? "border-green-400 bg-green-50 dark:bg-green-900/20" : "border-border bg-muted/30"
                        )}
                        aria-label={`${mode} progress ${pct.toFixed(0)}%${complete ? ' complete' : ''}`}
                      >
                        <span className="capitalize">{mode}</span>
                        <div className="flex items-center gap-2">
                          <span className="tabular-nums font-medium">{pct.toFixed(0)}%</span>
                          {complete && (
                            <Badge
                              variant="secondary"
                              className="bg-green-600 text-white dark:bg-green-500 dark:text-black flex items-center gap-1"
                              aria-label={`${mode} completed`}
                            >
                              <CheckCircle size={12} /> Done
                            </Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Next */}
          {recommendedQuestion && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star size={24} className="text-primary" />
                  Recommended Next
                </CardTitle>
                <CardDescription>
                  Continue your learning journey with this recommended activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(recommendedQuestion.type)}
                    <div>
                      <h3 className="font-medium">{recommendedQuestion.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {recommendedQuestion.type === 'socratic' && 'Discover concepts through guided questioning'}
                        {recommendedQuestion.type === 'scenario' && 'Build systems through realistic challenges'}
                        {recommendedQuestion.type === 'debug' && 'Learn by fixing broken implementations'}
                      </p>
                    </div>
                  </div>
                  <Button onClick={() => handleQuestionStart(recommendedQuestion)}>
                    <Play size={16} className="mr-1" />
                    Start
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DownloadSimple size={24} className="text-primary" />
                Strategy Toolkits Library
              </CardTitle>
              <CardDescription>Download canvases and playbooks that extend each strategic theme into action.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {strategicToolkits.map((toolkit) => (
                  <div key={toolkit.id} className="border rounded-lg p-4 flex flex-col justify-between bg-muted/40 dark:bg-background/60">
                    <div className="space-y-2">
                      <h4 className="font-semibold">{toolkit.title}</h4>
                      <div className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
                        <BookOpen size={16} className="mt-0.5 text-primary" />
                        <span>{toolkit.description}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-col sm:flex-row gap-2">
                      <Button size="sm" variant="ghost" className="justify-center gap-2" onClick={() => handleOpenToolkitInline(toolkit)}>
                        <BookOpen size={16} />
                        <span>Open Inline</span>
                      </Button>
                      <Button asChild variant="outline" size="sm" className="justify-center gap-2">
                        <a href={toolkit.href} download={toolkit.downloadName}>
                          <DownloadSimple size={16} />
                          <span>Download</span>
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Data Autonomy Mastery Section */}
          <Card className="border border-orange-300/60 dark:border-orange-700/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendUp size={24} className="text-orange-500" />
                Data Autonomy Mastery & Fusion
              </CardTitle>
              <CardDescription>Track mastery tiers, anticipate failure modes, and attempt cross-pattern fusion challenges.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <MasteryPanel patternId="strategy-memory-replay" currentTier={computeMasteryTier('strategy-memory-replay', []) || undefined} />
                <FailureModesPanel patternId="strategy-memory-replay" />
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold">Fusion Challenges</h4>
                  <TransferChallengesView onLaunchScenario={(id) => {
                    const fusion = allQuestions.find(q => q.id === 'fusion-replay-perception');
                    if (fusion) {
                      handleQuestionStart(fusion);
                      emitTelemetry({ kind: 'transfer_challenge_start', transferId: id });
                    }
                  }} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Study Mode Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categories.map((category) => {
              // Map category IDs to tab values
              const getTabValue = (categoryId: string): StudyModeType => {
                switch (categoryId) {
                  case 'socratic-thinking': return 'socratic';
                  case 'interactive-scenarios': return 'scenario';
                  case 'debug-challenges': return 'debug';
                  case 'super-critical-learning': return 'scl';
                  default: return 'socratic';
                }
              };

              const tabValue = getTabValue(category.id);
              const categoryQuestions = allQuestions.filter(q => q.type === tabValue);
              const completedCount = categoryQuestions.filter(q => 
                completedQuestionIds.includes(q.id)
              ).length;
              const isUnlocked = isTypeUnlocked(tabValue);
              const isRecommendedMode = tabValue === recommendedNextMode;

              return (
                <Card 
                  key={category.id}
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-md", 
                    isRecommendedMode && 'ring-2 ring-primary/60',
                    !isUnlocked && 'opacity-60'
                  )}
                  onClick={() => {
                    if (!isUnlocked) {
                      toast({ title: 'Locked Mode', description: 'Progress further in previous modes to unlock.' });
                      try { window.dispatchEvent(new CustomEvent('analytics:gatingBlocked', { detail: { attempted: tabValue } })); } catch {}
                      return;
                    }
                    setActiveTab(tabValue);
                  }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-3">
                      <div className="p-3 bg-primary/10 rounded-full">
                        {getTypeIcon(tabValue)}
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2">{category.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <span>{completedCount}/{categoryQuestions.length} completed</span>
                      {isRecommendedMode && <Badge className="bg-primary text-white">Next</Badge>}
                      {!isUnlocked && gatingEnabled && <Badge variant="outline" className="text-xs">Locked</Badge>}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Socratic Questions Tab */}
        <TabsContent value="socratic" className="space-y-6">
          <div className="flex justify-end mb-4">
            <Button variant="ghost" size="sm" onClick={handleRetakeSocratic} title="Retake Socratic Mode">
              <Brain size={16} className="mr-1" />
              Retake Socratic
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain size={24} className="text-primary" />
                Socratic Discovery
              </CardTitle>
              <CardDescription>
                Learn by discovering concepts through guided questioning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allQuestions
                  .filter(q => q.type === 'socratic')
                  .map(question => renderQuestionCard(
                    question, 
                    completedQuestionIds.includes(question.id)
                  ))
                }
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Interactive Scenarios Tab */}
        <TabsContent value="scenario" className="space-y-6">
          <div className="flex justify-end mb-4">
            <Button variant="ghost" size="sm" onClick={handleRetakeScenario} title="Retake Scenario Mode">
              <PuzzlePiece size={16} className="mr-1" />
              Retake Scenario
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PuzzlePiece size={24} className="text-primary" />
                Interactive Scenarios
              </CardTitle>
              <CardDescription>
                Build systems step-by-step through realistic implementation challenges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allQuestions
                  .filter(q => q.type === 'scenario')
                  .map(question => renderQuestionCard(
                    question, 
                    completedQuestionIds.includes(question.id)
                  ))
                }
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Debug Challenges Tab */}
        <TabsContent value="debug" className="space-y-6">
          <div className="flex justify-end mb-4">
            <Button variant="ghost" size="sm" onClick={handleRetakeDebug} title="Retake Debug Mode">
              <Bug size={16} className="mr-1" />
              Retake Debug
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug size={24} className="text-primary" />
                Debug Challenges
              </CardTitle>
              <CardDescription>
                Analyze broken systems and learn by fixing real-world problems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allQuestions
                  .filter(q => q.type === 'debug')
                  .map(question => renderQuestionCard(
                    question, 
                    completedQuestionIds.includes(question.id)
                  ))
                }
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Super Critical Learning Tab */}
        <TabsContent value="scl" className="space-y-6">
          <SuperCriticalLearning
            concept={conceptId}
            onBack={() => setActiveTab('overview')}
          />
        </TabsContent>
      </Tabs>

      <Dialog open={!!inlineToolkit} onOpenChange={(open) => { if (!open) handleCloseToolkitInline(); }}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{inlineToolkit?.title ?? 'Toolkit'}</DialogTitle>
            <DialogDescription>
              View the toolkit without leaving Study Mode. Download remains available if you prefer working offline.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] pr-4">
            {loadingToolkit && (
              <div className="py-8 text-center text-sm text-muted-foreground">Loading toolkit…</div>
            )}
            {!loadingToolkit && toolkitError && (
              <div className="py-8 text-center text-sm text-destructive">{toolkitError}</div>
            )}
            {!loadingToolkit && !toolkitError && inlineToolkit && (
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <MarkdownRenderer>{toolkitMarkdown}</MarkdownRenderer>
              </div>
            )}
          </ScrollArea>
          <div className="flex justify-end gap-2 pt-4">
            {inlineToolkit && (
              <Button asChild variant="outline" size="sm" className="gap-2">
                <a href={inlineToolkit.href} download={inlineToolkit.downloadName}>
                  <DownloadSimple size={16} />
                  <span>Download</span>
                </a>
              </Button>
            )}
            <Button size="sm" onClick={handleCloseToolkitInline}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudyMode;
