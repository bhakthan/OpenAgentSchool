import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  GitBranch, 
  Target, 
  Network,
  Gear,
  Download,
  Copy,
  ArrowCounterClockwise,
  X,
  Play,
  Pause,
  Timer,
  Prohibit
} from '@phosphor-icons/react';
import type { SCLMode, SCLUIState, SCLObjective } from '@/types/supercritical';
import { OBJECTIVE_LABELS } from '@/types/supercritical';
import { perspectiveObjectiveMap } from '@/data/perspectivesRegistry';
import { useSCLSession } from '@/hooks/useSCLSession';
import { SCLControls } from './SCLControls';
import { SCLEffectGraph } from './SCLEffectGraph';
import { SCLSynthesis } from './SCLSynthesis';
import { SCLRubric } from './SCLRubric';
// Import our new graph visualization components
import SCLGraph, { SCLNode } from '../../SuperCriticalLearning/SCLGraph';
import GraphControls from '../../SuperCriticalLearning/GraphControls';
import NodeEditor from '../../SuperCriticalLearning/NodeEditor';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SCLSessionProps {
  initialSeeds?: {
    conceptIds: string[];
    patternIds: string[];
    practices: string[];
  };
  initialMode?: SCLMode;
  onClose: () => void;
}

export function SCLSession({ initialSeeds, initialMode, onClose }: SCLSessionProps) {
  const [mode, setMode] = useState<SCLMode>(initialMode || 'consolidate');
  const [objectives, setObjectives] = useState<SCLObjective[]>(['optimize']);
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    try {
      return localStorage.getItem('oas_scl_intro_v1_dismissed') !== '1';
    } catch {
      return true;
    }
  });
  const [uiState, setUIState] = useState<SCLUIState>({
    activeTab: 'inputs',
    selectedNodes: [],
    filteredDomains: [],
    showOnlyHighConfidence: true,
    graphLayout: 'hierarchical',
    expandedSections: {
      constraints: false,
      leaps: false,
      synthesis: false,
    },
  });

  // Graph visualization state
  const [enableForceLayout, setEnableForceLayout] = useState(false);
  const [showMinimap, setShowMinimap] = useState(true);
  const [selectedNode, setSelectedNode] = useState<SCLNode | null>(null);
  const [showNodeEditor, setShowNodeEditor] = useState(false);
  // Mode-specific controls
  const [modeControls, setModeControls] = useState<any>({
    // stress-test
    latencyP99: 400,
    budget: 'medium',
    accuracy: 0.8,
    // intervene
    leverRateLimit: 100,
    leverCacheTTL: 60,
    leverCanary: true,
    // counterfactual
    cfMemory: true,
    cfToolUse: true,
    // leap-focus
    thresholdQueueDepth: 200,
    thresholdErrorSlope: 0.2,
    // mechanism-audit
    requireMechanism: true,
    requireDelay: true
  });

  const {
    session,
    isGenerating,
    progress,
    error,
    createSession,
    generateEffects,
  generateEffectsWithContext,
    updateConstraints,
  cancelBackend,
    clearSession,
  activeWorkflowId,
  } = useSCLSession({
    onProgress: (step, prog) => {
      console.log(`SCL Progress: ${step} (${Math.round(prog * 100)}%)`);
    },
    onError: (err) => {
      console.error('SCL Error:', err);
    },
  backendTimeoutMs: 20000,
  });

  // Convert session effects to graph format
  const effects = React.useMemo(() => {
    if (!session) return [];
    return session.effectGraph.nodes.map(node => ({
      id: node.id,
      text: node.title,
      type: (node.order === 1 ? 'first-order' : 
            node.order === 2 ? 'higher-order' : 
            'synthesis') as 'first-order' | 'higher-order' | 'synthesis' | 'constraint',
      confidence: node.confidence,
      category: node.domain,
      sources: node.references,
      constraints: [],
    }));
  }, [session]);

  const handleStartSession = useCallback(async () => {
    if (isGenerating) return;

    try {
      // Provide default seeds if none are provided
      const seeds = initialSeeds || {
        conceptIds: ['agentic-systems', 'product-management'],
        patternIds: ['orchestration-pattern'],
        practices: ['iterative-testing']
      };

      // Auto-augment objectives based on perspective concept IDs (registry driven)
      let sessionObjectives = [...objectives];
      seeds.conceptIds.forEach(cid => {
        const adds = perspectiveObjectiveMap[cid];
        if (adds?.length) {
          let changed = false;
            adds.forEach(obj => {
              if (!sessionObjectives.includes(obj)) {
                sessionObjectives.push(obj);
                changed = true;
              }
            });
          if (changed) setObjectives([...sessionObjectives]);
        }
      });

      console.log('SCL Session starting with seeds:', seeds);
      
  const newSession = createSession(mode, sessionObjectives, seeds);

      // Push mode-specific extras to constraints for orchestrator
      updateConstraints({
        extras: {
          mode,
          ...modeControls
        },
        // mirror some common knobs onto typed fields when relevant
        latencyP99: mode === 'stress-test' ? modeControls.latencyP99 : undefined,
        accuracy: mode === 'stress-test' ? modeControls.accuracy : undefined,
        budget: mode === 'stress-test' ? (modeControls.budget || 'medium') : undefined
      });

  await generateEffectsWithContext(newSession);
    } catch (error) {
      console.error('Failed to start SCL session:', error);
    }
  }, [mode, objectives, initialSeeds, isGenerating, createSession, generateEffects, updateConstraints, modeControls]);

  const handleModeChange = useCallback((newMode: SCLMode) => {
    setMode(newMode);
  }, []);

  const handleConstraintChange = useCallback((constraint: string, value: any) => {
    updateConstraints({ [constraint]: value });
  }, [updateConstraints]);

  const handleClearSession = useCallback(() => {
    clearSession();
    setUIState(prev => ({ ...prev, activeTab: 'inputs' }));
  }, [clearSession]);

  const handleExportSession = useCallback(() => {
    if (!session) return;

    const dataStr = JSON.stringify({
      session,
      exportedAt: new Date().toISOString(),
    }, null, 2);
    
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scl-session-${session.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [session]);

  const handleCopySession = useCallback(async () => {
    if (!session) return;

    try {
      await navigator.clipboard.writeText(JSON.stringify(session, null, 2));
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy session:', error);
    }
  }, [session]);

  const isSessionActive = session && session.status !== 'draft';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Super Critical Learning</h1>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                {session ? (
                  <>
                    <span>{`Session: ${session.id}`}</span>
                    {session.source && (
                      <Badge variant="outline" className={session.source === 'backend' ? 'border-green-500 text-green-600' : 'border-slate-400 text-slate-600'}>
                        Source: {session.source === 'backend' ? 'Backend' : 'Local'}
                      </Badge>
                    )}
                  </>
                ) : 'Configure your analysis'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {session && (
              <>
                <Badge variant={session.status === 'complete' ? 'default' : 'secondary'}>
                  {session.status}
                </Badge>
                {isGenerating && activeWorkflowId && (
                  <Button variant="destructive" size="sm" onClick={cancelBackend}>
                    <Prohibit className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={handleExportSession}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm" onClick={handleCopySession}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </>
            )}
            <Button variant="outline" size="sm" onClick={handleClearSession}>
              <ArrowCounterClockwise className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        {isGenerating && progress && (
          <div className="px-4 pb-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{progress.step}</span>
                <span>{Math.round(progress.progress * 100)}%</span>
              </div>
              <Progress value={progress.progress * 100} />
              <div className="flex items-center justify-between pt-2">
                <div className="text-xs text-muted-foreground">
                  {activeWorkflowId ? `Workflow #${activeWorkflowId}` : 'Local generation'}
                </div>
                {activeWorkflowId && (
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={cancelBackend}>
                      <Prohibit className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="px-4 pb-4">
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {!isSessionActive ? (
          /* Configuration Mode */
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Intro / Description */}
            {showIntro && (
              <Card className="border-dashed">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Brain className="h-5 w-5" />
                      What is Super Critical Learning (SCL)?
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="-mt-1"
                      onClick={() => {
                        try { localStorage.setItem('oas_scl_intro_v1_dismissed', '1'); } catch {}
                        setShowIntro(false);
                      }}
                      aria-label="Dismiss intro"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="text-[15px] md:text-base lg:text-lg text-muted-foreground leading-relaxed space-y-3">
                  <p>
                    SCL is an analysis workspace that helps you explore first-, second-, and third-order
                    effects of design choices in agentic systems. Configure a mode, provide seeds, and
                    generate an effect graph you can inspect, refine, and synthesize into takeaways.
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      Modes: Consolidate (baseline), Extrapolate (creative), Transfer (cross-domain),
                      Stress-Test (resilience), Intervene (levers), Counterfactual (assumptions),
                      Threshold/Leaps (discontinuities), Mechanism Audit (causal rigor).
                    </li>
                    <li>
                      Seeds set the starting context (concepts, patterns, practices). Use the defaults or
                      pass your own from a pattern page.
                    </li>
                    <li>
                      Output: an interactive Effect Graph, a Synthesis view that explains implications, and
                      a Rubric to evaluate solution quality.
                    </li>
                    <li>
                      Tip: Start with Consolidate or Transfer to map invariants, then Stress-Test or
                      Intervene to probe weak links.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gear className="h-5 w-5" />
                  Session Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Mode Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Analysis Mode</label>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card 
                      className={`cursor-pointer transition-colors ${
                        mode === 'consolidate' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                      }`}
                      onClick={() => handleModeChange('consolidate')}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Target className="h-5 w-5 text-primary" />
                          <span className="font-medium">Consolidate</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Systematic exploration of well-understood patterns
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card 
                      className={`cursor-pointer transition-colors ${
                        mode === 'extrapolate' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                      }`}
                      onClick={() => handleModeChange('extrapolate')}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Brain className="h-5 w-5 text-secondary-foreground" />
                          <span className="font-medium">Extrapolate</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Creative exploration with constraints and perturbations
                        </p>
                      </CardContent>
                    </Card>

                    <Card 
                      className={`cursor-pointer transition-colors ${
                        mode === 'transfer' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                      }`}
                      onClick={() => handleModeChange('transfer')}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <GitBranch className="h-5 w-5 text-secondary-foreground" />
                          <span className="font-medium">Transfer</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Apply knowledge across domains; map invariants
                        </p>
                      </CardContent>
                    </Card>

                    <Card 
                      className={`cursor-pointer transition-colors ${
                        mode === 'stress-test' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                      }`}
                      onClick={() => handleModeChange('stress-test')}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <GitBranch className="h-5 w-5 text-primary" />
                          <span className="font-medium">Stress-Test</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Perturb constraints and surface fragile links
                        </p>
                      </CardContent>
                    </Card>

                    <Card 
                      className={`cursor-pointer transition-colors ${
                        mode === 'intervene' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                      }`}
                      onClick={() => handleModeChange('intervene')}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Target className="h-5 w-5 text-primary" />
                          <span className="font-medium">Intervene</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Try levers and compare downstream outcomes
                        </p>
                      </CardContent>
                    </Card>

                    <Card 
                      className={`cursor-pointer transition-colors ${
                        mode === 'counterfactual' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                      }`}
                      onClick={() => handleModeChange('counterfactual')}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Brain className="h-5 w-5 text-secondary-foreground" />
                          <span className="font-medium">Counterfactual</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Toggle assumptions and show graph divergence
                        </p>
                      </CardContent>
                    </Card>

                    <Card 
                      className={`cursor-pointer transition-colors ${
                        mode === 'leap-focus' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                      }`}
                      onClick={() => handleModeChange('leap-focus')}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Network className="h-5 w-5 text-primary" />
                          <span className="font-medium">Threshold / Leaps</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Highlight discontinuities and trigger points
                        </p>
                      </CardContent>
                    </Card>

                    <Card 
                      className={`cursor-pointer transition-colors ${
                        mode === 'mechanism-audit' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                      }`}
                      onClick={() => handleModeChange('mechanism-audit')}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Gear className="h-5 w-5 text-primary" />
                          <span className="font-medium">Mechanism Audit</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Add mechanisms/delays; score weak links
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Seeds Display */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Analysis Seeds</label>
                  <div className="grid gap-3">
                    {((initialSeeds?.conceptIds?.length || 0) > 0 || !initialSeeds) && (
                      <div>
                        <span className="text-xs text-muted-foreground">Concepts:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {(initialSeeds?.conceptIds || ['agentic-systems','product-management']).map(id => (
                            <Badge key={id} variant="outline">
                              {id === 'agentic-systems'
                                ? 'Agentic AI Systems'
                                : id === 'product-management'
                                  ? 'AI Product Management'
                                  : id}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {((initialSeeds?.patternIds?.length || 0) > 0 || !initialSeeds) && (
                      <div>
                        <span className="text-xs text-muted-foreground">Patterns:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {(initialSeeds?.patternIds || ['orchestration-pattern']).map(id => (
                            <Badge key={id} variant="outline">
                              {id === 'orchestration-pattern' ? 'Agent Orchestration Pattern' : id}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {((initialSeeds?.practices?.length || 0) > 0 || !initialSeeds) && (
                      <div>
                        <span className="text-xs text-muted-foreground">Practices:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {(initialSeeds?.practices || ['iterative-testing']).map(id => (
                            <Badge key={id} variant="outline">
                              {id === 'iterative-testing' ? 'Iterative Agent Testing' : id}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {!initialSeeds && (
                    <p className="text-xs text-muted-foreground">
                      Using default seeds for agentic systems exploration
                    </p>
                  )}
                </div>

                {/* Start Button */}
                <div className="flex justify-center pt-4">
                  <Button 
                    onClick={handleStartSession} 
                    disabled={isGenerating}
                    size="lg"
                    className="min-w-48"
                  >
                    {isGenerating ? (
                      <>
                        <Pause className="h-4 w-4 mr-2" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Start Analysis
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Session Active - Main Interface */
          <Tabs value={uiState.activeTab} onValueChange={(tab) => 
            setUIState(prev => ({ ...prev, activeTab: tab as any }))
          }>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="inputs" className="flex items-center gap-2">
                <Gear className="h-4 w-4" />
                Controls
              </TabsTrigger>
              <TabsTrigger value="graph" className="flex items-center gap-2">
                <Network className="h-4 w-4" />
                Effect Graph
              </TabsTrigger>
              <TabsTrigger value="synthesis" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                Synthesis
              </TabsTrigger>
              <TabsTrigger value="rubric" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Rubric
              </TabsTrigger>
            </TabsList>

            <TabsContent value="inputs" className="space-y-6">
              <SCLControls
                mode={mode}
                initialSeeds={initialSeeds}
                onStartSession={handleStartSession}
                isGenerating={isGenerating}
              />

              {session && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Target className="h-4 w-4" /> Active Objectives
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {session.objectives.map(obj => (
                        <Badge key={obj} variant="outline" className="text-xs px-2 py-1">
                          {OBJECTIVE_LABELS[obj] || obj}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Mode-specific controls */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gear className="h-5 w-5" />
                    Mode-Specific Controls
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {mode === 'stress-test' && (
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <Label className="text-sm font-medium">Latency P99 (ms)</Label>
                        <div className="pt-3">
                          <Slider defaultValue={[modeControls.latencyP99]} min={50} max={2000} step={10}
                            onValueChange={(v) => setModeControls((s:any)=>({...s, latencyP99: v[0]}))}/>
                          <div className="text-xs text-muted-foreground mt-2">{modeControls.latencyP99} ms</div>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Accuracy Target</Label>
                        <div className="pt-3">
                          <Slider defaultValue={[modeControls.accuracy]} min={0.5} max={0.99} step={0.01}
                            onValueChange={(v) => setModeControls((s:any)=>({...s, accuracy: Number(v[0].toFixed(2))}))}/>
                          <div className="text-xs text-muted-foreground mt-2">{Math.round(modeControls.accuracy*100)}%</div>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Budget</Label>
                        <Input value={modeControls.budget} onChange={(e)=>setModeControls((s:any)=>({...s, budget: e.target.value}))} placeholder="low | medium | high | unlimited"/>
                      </div>
                    </div>
                  )}

                  {mode === 'intervene' && (
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <Label className="text-sm font-medium">Rate Limit (req/s)</Label>
                        <div className="pt-3">
                          <Slider defaultValue={[modeControls.leverRateLimit]} min={10} max={1000} step={10}
                            onValueChange={(v)=>setModeControls((s:any)=>({...s, leverRateLimit: v[0]}))}/>
                          <div className="text-xs text-muted-foreground mt-2">{modeControls.leverRateLimit} rps</div>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Cache TTL (s)</Label>
                        <div className="pt-3">
                          <Slider defaultValue={[modeControls.leverCacheTTL]} min={10} max={600} step={5}
                            onValueChange={(v)=>setModeControls((s:any)=>({...s, leverCacheTTL: v[0]}))}/>
                          <div className="text-xs text-muted-foreground mt-2">{modeControls.leverCacheTTL} s</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Switch checked={modeControls.leverCanary} onCheckedChange={(val)=>setModeControls((s:any)=>({...s, leverCanary: val}))}/>
                        <Label className="text-sm">Enable Canary</Label>
                      </div>
                    </div>
                  )}

                  {mode === 'counterfactual' && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex items-center gap-3">
                        <Switch checked={modeControls.cfMemory} onCheckedChange={(val)=>setModeControls((s:any)=>({...s, cfMemory: val}))}/>
                        <Label className="text-sm">Assume Memory Enabled</Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <Switch checked={modeControls.cfToolUse} onCheckedChange={(val)=>setModeControls((s:any)=>({...s, cfToolUse: val}))}/>
                        <Label className="text-sm">Assume Tool Use Enabled</Label>
                      </div>
                    </div>
                  )}

                  {mode === 'leap-focus' && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm font-medium">Queue Depth Threshold</Label>
                        <div className="pt-3">
                          <Slider defaultValue={[modeControls.thresholdQueueDepth]} min={10} max={10000} step={10}
                            onValueChange={(v)=>setModeControls((s:any)=>({...s, thresholdQueueDepth: v[0]}))}/>
                          <div className="text-xs text-muted-foreground mt-2">{modeControls.thresholdQueueDepth}</div>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Error Slope Trigger</Label>
                        <div className="pt-3">
                          <Slider defaultValue={[modeControls.thresholdErrorSlope]} min={0.01} max={1} step={0.01}
                            onValueChange={(v)=>setModeControls((s:any)=>({...s, thresholdErrorSlope: Number(v[0].toFixed(2))}))}/>
                          <div className="text-xs text-muted-foreground mt-2">{modeControls.thresholdErrorSlope}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {mode === 'mechanism-audit' && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex items-center gap-3">
                        <Switch checked={modeControls.requireMechanism} onCheckedChange={(val)=>setModeControls((s:any)=>({...s, requireMechanism: val}))}/>
                        <Label className="text-sm">Require Mechanism on Edges</Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <Switch checked={modeControls.requireDelay} onCheckedChange={(val)=>setModeControls((s:any)=>({...s, requireDelay: val}))}/>
                        <Label className="text-sm">Require Delay on Edges</Label>
                      </div>
                    </div>
                  )}

                  {['consolidate','extrapolate','transfer'].includes(mode) && (
                    <p className="text-xs text-muted-foreground">No extra controls for this mode.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="graph" className="space-y-6">
              {session ? (
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                  {/* Graph Controls */}
                  <div className="xl:col-span-1">
                    <GraphControls
                      effects={effects}
                      onEffectsChange={() => {}} // Handle filtered effects
                      enableForceLayout={enableForceLayout}
                      onForceLayoutChange={setEnableForceLayout}
                      showMinimap={showMinimap}
                      onMinimapToggle={setShowMinimap}
                      onExportGraph={() => console.log('Export graph')}
                      onResetLayout={() => console.log('Reset layout')}
                      onZoomIn={() => console.log('Zoom in')}
                      onZoomOut={() => console.log('Zoom out')}
                      onFitView={() => console.log('Fit view')}
                    />
                  </div>

                  {/* Graph Visualization */}
                  <div className="xl:col-span-3">
                    <Card className="h-[600px]">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <Network className="h-5 w-5" />
                            Interactive Effect Graph
                          </span>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              {effects.length} effects
                            </Badge>
                            <Button 
                              onClick={() => setUIState(prev => ({...prev, activeTab: 'synthesis'}))} 
                              size="sm" 
                              variant="outline"
                            >
                              View Details
                            </Button>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="h-full">
                        <SCLGraph
                          effects={effects}
                          onNodeClick={(node) => {
                            setSelectedNode(node);
                            setShowNodeEditor(true);
                          }}
                          onNodeEdit={(nodeId, updatedEffect) => {
                            console.log('Update effect:', nodeId, updatedEffect);
                          }}
                          onEdgeCreate={() => {}} // Handle edge creation
                          interactive={true}
                          showMinimap={showMinimap}
                          enableForceLayout={enableForceLayout}
                          className="h-full"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Network className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No Active Session</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      Start an analysis session to visualize effect relationships
                    </p>
                    <Button onClick={() => setUIState(prev => ({...prev, activeTab: 'inputs'}))}>
                      Configure Session
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="synthesis" className="space-y-6">
              <SCLSynthesis session={session} />
            </TabsContent>

            <TabsContent value="rubric" className="space-y-6">
              <SCLRubric session={session} />
            </TabsContent>
          </Tabs>
        )}
      </div>

      {/* Node Editor Modal */}
      {showNodeEditor && selectedNode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <NodeEditor
            node={selectedNode}
            onSave={(nodeId, updatedEffect) => {
              console.log('Save effect:', nodeId, updatedEffect);
              setShowNodeEditor(false);
              setSelectedNode(null);
            }}
            onClose={() => {
              setShowNodeEditor(false);
              setSelectedNode(null);
            }}
            onDelete={(nodeId) => {
              console.log('Delete effect:', nodeId);
              setShowNodeEditor(false);
              setSelectedNode(null);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default SCLSession;
