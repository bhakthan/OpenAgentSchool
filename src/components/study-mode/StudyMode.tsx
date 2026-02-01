import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
  CheckCircle, Clock, Star, ArrowRight, Play, BookOpen, DownloadSimple, SignIn, DeviceMobile
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { ShareButton } from '@/components/ui/ShareButton';
import { useAuth } from '@/lib/auth/AuthContext';

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
import strategicToolkitData from '@/lib/data/studyMode/strategic-toolkits.json' with { type: 'json' };
interface StrategicToolkit {
  id: string;
  title: string;
  description: string;
  href: string;
  downloadName: string;
}

const strategicToolkits = strategicToolkitData as StrategicToolkit[];

interface StudyModeProps {
  conceptId?: string;
  onComplete?: (session: StudyModeSession) => void;
}

const StudyMode: React.FC<StudyModeProps> = ({ conceptId, onComplete }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'overview' | StudyModeType>('overview');
  const [selectedQuestion, setSelectedQuestion] = useState<StudyModeQuestion | null>(null);
  const [sessions, setSessions] = useState<StudyModeSession[]>([]);
  const [progress, setProgress] = useState(calculateStudyModeProgress([]));
  const [dataBundle, setDataBundle] = useState<any | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [inlineToolkit, setInlineToolkit] = useState<StrategicToolkit | null>(null);
  const [toolkitMarkdown, setToolkitMarkdown] = useState<string>('');
  const [loadingToolkit, setLoadingToolkit] = useState<boolean>(false);
  const [toolkitError, setToolkitError] = useState<string | null>(null);
  const [showAuthPrompt, setShowAuthPrompt] = useState<boolean>(false);
  const [pendingQuestion, setPendingQuestion] = useState<StudyModeQuestion | null>(null);
  const [showAssessmentAfterAuth, setShowAssessmentAfterAuth] = useState<boolean>(false);
  
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

  // Handle return URL parameter (?showAssessment=true) after authentication
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const shouldShowAssessment = searchParams.get('showAssessment') === 'true';
    
    if (shouldShowAssessment && isAuthenticated) {
      // User just returned from authentication
      setShowAssessmentAfterAuth(true);
      
      // Clear the URL parameter
      searchParams.delete('showAssessment');
      const newSearch = searchParams.toString();
      const newUrl = newSearch ? `${location.pathname}?${newSearch}` : location.pathname;
      navigate(newUrl, { replace: true });
      
      // Note: The actual assessment modal opening will be handled by the
      // individual Study Mode components (SocraticQuestionMode, etc.)
      // which check for pendingQuestion or use their own state management
      
      toast({
        title: "Welcome back!",
        description: "You're now authenticated. Continue your Study Mode session.",
      });
    }
  }, [location.search, isAuthenticated, navigate]);

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
    
    // Soft auth prompt: Encourage sign in to save progress
    if (!isAuthenticated) {
      // Check if user has dismissed the prompt before (using localStorage flag)
      const dismissedAuthPrompt = localStorage.getItem('studyMode:dismissedAuthPrompt');
      
      // Show prompt on first session start (unless previously dismissed)
      if (!dismissedAuthPrompt || sessions.length === 0) {
        setPendingQuestion(question);
        setShowAuthPrompt(true);
        
        // Track auth prompt shown
        try {
          window.dispatchEvent(new CustomEvent('analytics:authPromptShown', {
            detail: { context: 'study_mode_start', questionId: question.id }
          }));
        } catch {}
        return;
      }
    }
    
    // Proceed with starting the session
    startQuestion(question);
  };
  
  const startQuestion = (question: StudyModeQuestion) => {
    setSelectedQuestion(question);
    setActiveTab(question.type);
    
    // Track session start with user context if authenticated
    try {
      window.dispatchEvent(new CustomEvent('analytics:studyModeSessionStart', {
        detail: {
          questionId: question.id,
          type: question.type,
          level: question.level,
          conceptId: question.conceptId,
          userEmail: isAuthenticated ? user?.email : null,
          isAuthenticated
        }
      }));
    } catch {}
  };
  
  const handleAuthPromptSignIn = () => {
    setShowAuthPrompt(false);
    
    // Track auth prompt conversion
    try {
      window.dispatchEvent(new CustomEvent('analytics:authPromptAction', {
        detail: { action: 'sign_in', context: 'study_mode' }
      }));
    } catch {}
    
    // Navigate to auth with return URL
    const returnUrl = pendingQuestion 
      ? `/study-mode?qid=${pendingQuestion.id}`
      : '/study-mode';
    navigate(`/auth?return=${encodeURIComponent(returnUrl)}`);
  };
  
  const handleAuthPromptContinue = () => {
    setShowAuthPrompt(false);
    
    // Track dismissal
    try {
      window.dispatchEvent(new CustomEvent('analytics:authPromptAction', {
        detail: { action: 'continue_guest', context: 'study_mode' }
      }));
    } catch {}
    
    // Mark as dismissed (won't show again this session)
    localStorage.setItem('studyMode:dismissedAuthPrompt', 'true');
    
    // Start the pending question
    if (pendingQuestion) {
      startQuestion(pendingQuestion);
      setPendingQuestion(null);
    }
  };

  const handleOpenToolkitInline = (toolkit: StrategicToolkit) => {
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
    
    // Track session completion with authentication context
    try {
      window.dispatchEvent(new CustomEvent('analytics:studyModeSessionComplete', {
        detail: {
          type: session.type,
          score: session.score,
          questionId: session.questionId,
          conceptId: session.conceptId,
          userEmail: isAuthenticated ? user?.email : null,
          isAuthenticated,
          insights: session.insights?.length || 0,
          duration: session.endTime && session.startTime 
            ? (new Date(session.endTime).getTime() - new Date(session.startTime).getTime()) / 1000
            : null
        }
      }));
    } catch {}
    
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
      
      {/* Auth Prompt Dialog */}
      <Dialog open={showAuthPrompt} onOpenChange={setShowAuthPrompt}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Brain size={24} className="text-primary" />
              Save Your Learning Progress
            </DialogTitle>
            <DialogDescription className="pt-4 space-y-4">
              <p className="text-base">
                Sign in to unlock powerful learning features:
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <DeviceMobile size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <span><strong>Sync across devices</strong> - Continue your learning anywhere</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Track your progress</strong> - See your mastery levels and achievements</span>
                </li>
                <li className="flex items-start gap-3">
                  <Target size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <span><strong>AI-powered insights</strong> - Get personalized learning assessments</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star size={20} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Earn achievements</strong> - Build your learning portfolio</span>
                </li>
              </ul>
              <p className="text-xs text-muted-foreground pt-2">
                It's completely free! No credit card required.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 pt-4">
            <Button
              onClick={handleAuthPromptSignIn}
              className="w-full flex items-center justify-center gap-2"
            >
              <SignIn size={20} />
              Sign In to Save Progress
            </Button>
            <Button
              onClick={handleAuthPromptContinue}
              variant="outline"
              className="w-full"
            >
              Continue as Guest
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Header */}
      <div className="text-center relative">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mb-2">
          <Lightbulb size={32} className="text-primary" />
          Study Mode
        </h1>
        <p className="text-lg text-muted-foreground">
          Learn through Socratic questioning, interactive scenarios, debugging and super critical learning challenges
        </p>
        <div className="absolute top-0 right-0">
          <ShareButton
            url={`${window.location.origin}/study-mode${conceptId ? `?concept=${conceptId}` : ''}`}
            title="Study Mode - Open Agent School"
            description="Learn through Socratic questioning, interactive scenarios, debugging and super critical learning challenges"
            variant="outline"
            size="sm"
            analyticsCategory="Study Mode Share"
          />
        </div>
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
        {/* Overview metrics */}
          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendUp size={24} className="text-primary" />
                Your Study Progress
              </CardTitle>
              <CardDescription>
                Track your learning journey across different study modes.{gatingEnabled ? ' Progress in earlier modes unlocks later modes.' : ''}
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
            <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  <DownloadSimple size={24} className="text-primary" />
                  Strategy Toolkits Library
                </CardTitle>
                <CardDescription>Download canvases and playbooks that extend each strategic theme into action.</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm" className="gap-2">
                  <a href="/toolkits/strategic-toolkit-library.xlsx" download>
                    <DownloadSimple size={16} />
                    <span>Download Excel Library</span>
                  </a>
                </Button>
                <ShareButton
                  url={`${window.location.origin}/study-mode`}
                  title="Strategy Toolkits Library - Study Mode"
                  description="Download canvases and playbooks that extend each strategic theme into action."
                  variant="outline"
                  size="sm"
                  analyticsCategory="Study Mode Library Share"
                />
              </div>
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
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="ghost" className="flex-1 justify-center gap-2" onClick={() => handleOpenToolkitInline(toolkit)}>
                        <BookOpen size={16} />
                        <span>Open Inline</span>
                      </Button>
                      <Button asChild variant="outline" size="sm" className="flex-1 justify-center gap-2">
                        <a href={toolkit.href} download={toolkit.downloadName}>
                          <DownloadSimple size={16} />
                          <span>Download</span>
                        </a>
                      </Button>
                      <ShareButton
                        url={`${window.location.origin}${toolkit.href}`}
                        title={toolkit.title}
                        description={toolkit.description}
                        variant="outline"
                        size="sm"
                        analyticsCategory="Study Mode Toolkit Share"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Data Autonomy Mastery Section */}
          <Card className="border border-orange-200/70 bg-white shadow-sm dark:border-orange-700/60 dark:bg-orange-950/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendUp size={24} className="text-orange-500" />
                Data Autonomy Mastery & Fusion
              </CardTitle>
              <CardDescription>Track mastery tiers, anticipate failure modes, and attempt cross-pattern fusion challenges.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <MasteryPanel patternId="strategy-memory-replay" currentTier={computeMasteryTier('strategy-memory-replay', []) || undefined} />
                <FailureModesPanel patternId="strategy-memory-replay" />
                <div className="space-y-4">
                  <h4 className="text-base font-semibold text-gray-900 dark:text-indigo-200">Fusion Challenges</h4>
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
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <Brain size={24} className="text-primary" />
                    Socratic Discovery
                  </CardTitle>
                  <CardDescription>
                    Learn by discovering concepts through guided questioning
                  </CardDescription>
                </div>
                <ShareButton
                  url={`${window.location.origin}/study-mode?tab=socratic`}
                  title="Socratic Discovery - Study Mode"
                  description="Learn by discovering concepts through guided questioning"
                  variant="outline"
                  size="sm"
                  analyticsCategory="Study Mode Socratic Share"
                />
              </div>
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
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <PuzzlePiece size={24} className="text-primary" />
                    Interactive Scenarios
                  </CardTitle>
                  <CardDescription>
                    Build systems step-by-step through realistic implementation challenges
                  </CardDescription>
                </div>
                <ShareButton
                  url={`${window.location.origin}/study-mode?tab=scenario`}
                  title="Interactive Scenarios - Study Mode"
                  description="Build systems step-by-step through realistic implementation challenges"
                  variant="outline"
                  size="sm"
                  analyticsCategory="Study Mode Scenario Share"
                />
              </div>
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
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <Bug size={24} className="text-primary" />
                    Debug Challenges
                  </CardTitle>
                  <CardDescription>
                    Analyze broken systems and learn by fixing real-world problems
                  </CardDescription>
                </div>
                <ShareButton
                  url={`${window.location.origin}/study-mode?tab=debug`}
                  title="Debug Challenges - Study Mode"
                  description="Analyze broken systems and learn by fixing real-world problems"
                  variant="outline"
                  size="sm"
                  analyticsCategory="Study Mode Debug Share"
                />
              </div>
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
        <DialogContent className="max-w-none w-[min(95vw,1200px)] sm:max-w-[95vw] lg:max-w-[1200px]">
          <DialogHeader>
            <DialogTitle>{inlineToolkit?.title ?? 'Toolkit'}</DialogTitle>
            <DialogDescription>
              View the toolkit without leaving Study Mode. Download remains available if you prefer working offline.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[75vh] pr-4">
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
