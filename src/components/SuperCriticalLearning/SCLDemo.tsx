import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { 
  Network, 
  Brain, 
  Zap,
  Play,
  RefreshCw,
  Download,
  BookOpen,
  Target,
  Shuffle,
  Layers
} from 'lucide-react';
import SCLGraph, { SCLEffect } from './SCLGraph';
import AdvancedFeatures from './AdvancedFeatures';
import { useNavigate } from 'react-router-dom';
import { agentPatterns } from '@/lib/data/patterns';
import type { PatternData } from '@/lib/data/patterns';
import { allMasteryPatternIds, patternMasteryBands, type MasteryTier, type PatternMasteryBand } from '@/lib/data/studyMode/patternMastery';
import { failureModes, type FailureMode } from '@/lib/data/studyMode/failureModes';
import { adaptiveRules, type AdaptiveRule } from '@/lib/data/studyMode/adaptiveRules';
import { transferChallenges, type TransferChallenge } from '@/lib/data/studyMode/transferChallenges';
import { compositeScenarioQuestions } from '@/lib/data/studyMode/compositeScenarios';
import { emitTelemetry } from '@/lib/data/studyMode/telemetry';
import type { StudyModeQuestion } from '@/lib/data/studyMode/types';

// Sample SCL effects for demonstration
export const sampleEffects: SCLEffect[] = [
  {
    id: 'foundation-effect',
    text: 'Establish foundational AI infrastructure with cloud-native architecture',
    type: 'first-order',
    confidence: 0.9,
    constraints: ['budget-limit', 'timeline-6months'],
  },
  {
    id: 'data-pipeline',
    text: 'Implement real-time data processing pipeline for continuous learning',
    type: 'higher-order',
    confidence: 0.85,
    constraints: ['data-privacy', 'performance-requirements'],
  },
  {
    id: 'ml-models',
    text: 'Deploy and optimize machine learning models with A/B testing framework',
    type: 'synthesis',
    confidence: 0.8,
    constraints: ['accuracy-threshold', 'latency-limits'],
  },
  {
    id: 'user-interface',
    text: 'Create intuitive user interface with real-time feedback and analytics',
    type: 'first-order',
    confidence: 0.75,
    constraints: ['usability-standards', 'accessibility-compliance'],
  },
  {
    id: 'monitoring-system',
    text: 'Implement comprehensive monitoring and alerting for system health',
    type: 'constraint',
    confidence: 0.9,
    constraints: ['uptime-requirements', 'alert-response-time'],
  },
  {
    id: 'security-layer',
    text: 'Deploy enterprise-grade security with encryption and access controls',
    type: 'first-order',
    confidence: 0.95,
    constraints: ['compliance-standards', 'security-audit'],
  },
  {
    id: 'scaling-mechanism',
    text: 'Implement auto-scaling capabilities for variable demand handling',
    type: 'higher-order',
    confidence: 0.7,
    constraints: ['cost-optimization', 'performance-scaling'],
  },
  {
    id: 'integration-apis',
    text: 'Develop comprehensive API layer for third-party integrations',
    type: 'synthesis',
    confidence: 0.8,
    constraints: ['api-standards', 'rate-limiting'],
  },
];

export const SCLDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [effects, setEffects] = useState<SCLEffect[]>(sampleEffects);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const dataAutonomyPatterns = useMemo<PatternData[]>(() => {
    const ids = new Set(allMasteryPatternIds);
    return agentPatterns.filter(pattern => ids.has(pattern.id));
  }, []);

  const masteryByPattern = useMemo<Record<string, PatternMasteryBand[]>>(() => {
    const grouped: Record<string, PatternMasteryBand[]> = {};
    patternMasteryBands.forEach(band => {
      if (!grouped[band.patternId]) {
        grouped[band.patternId] = [];
      }
      grouped[band.patternId].push(band);
    });
    return grouped;
  }, []);

  const failureModesByPattern = useMemo<Record<string, FailureMode[]>>(() => {
    const grouped: Record<string, FailureMode[]> = {};
    failureModes.forEach(mode => {
      if (!grouped[mode.patternId]) {
        grouped[mode.patternId] = [];
      }
      grouped[mode.patternId].push(mode);
    });
    return grouped;
  }, []);

  const adaptiveRulesByPattern = useMemo<Record<string, AdaptiveRule[]>>(() => {
    const grouped: Record<string, AdaptiveRule[]> = {};
    adaptiveRules.forEach(rule => {
      if (!grouped[rule.trigger.patternId]) {
        grouped[rule.trigger.patternId] = [];
      }
      grouped[rule.trigger.patternId].push(rule);
    });
    return grouped;
  }, []);

  const transferByPattern = useMemo<Record<string, TransferChallenge[]>>(() => {
    const grouped: Record<string, TransferChallenge[]> = {};
    transferChallenges.forEach(challenge => {
      challenge.compositePatterns.forEach(patternId => {
        if (!grouped[patternId]) {
          grouped[patternId] = [];
        }
        grouped[patternId].push(challenge);
      });
    });
    return grouped;
  }, []);

  const scenariosByPattern = useMemo<Record<string, StudyModeQuestion[]>>(() => {
    const grouped: Record<string, StudyModeQuestion[]> = {};
    compositeScenarioQuestions.forEach(question => {
      const ids = new Set([question.conceptId, ...(question.relatedConcepts || [])]);
      ids.forEach(patternId => {
        if (!patternId) return;
        if (!grouped[patternId]) {
          grouped[patternId] = [];
        }
        grouped[patternId].push(question);
      });
    });
    return grouped;
  }, []);

  const telemetryEventSummaries = useMemo(
    () => [
      { kind: 'pattern_attempt', description: 'Emitted when a learner launches a pattern-focused SCL session.' },
      { kind: 'failure_mode_triggered', description: 'Recorded whenever a failure mode panel drives a remediation branch.' },
      { kind: 'mastery_tier_up', description: 'Captures progression from one mastery tier to the next for the active pattern.' },
      { kind: 'adaptive_rule_fired', description: 'Logs adaptive heuristics routing learners to hints or remediation scenarios.' },
      { kind: 'transfer_challenge_start', description: 'Marks the start of a fusion or transfer challenge session.' },
      { kind: 'transfer_challenge_complete', description: 'Marks successful completion of a fusion challenge with outcome signals.' }
    ],
    []
  );

  const [activeDataPatternId, setActiveDataPatternId] = useState(() => dataAutonomyPatterns[0]?.id ?? '');

  const activeDataPattern = useMemo(() => {
    if (!activeDataPatternId) return dataAutonomyPatterns[0];
    return dataAutonomyPatterns.find(pattern => pattern.id === activeDataPatternId) || dataAutonomyPatterns[0];
  }, [dataAutonomyPatterns, activeDataPatternId]);

  const masteryOrder: MasteryTier[] = ['recognition', 'application', 'optimization', 'governance'];

  const masteryBandsForActive = activeDataPattern ? (masteryByPattern[activeDataPattern.id] || []).slice().sort((a, b) => masteryOrder.indexOf(a.tier) - masteryOrder.indexOf(b.tier)) : [];
  const failureModesForActive = activeDataPattern ? (failureModesByPattern[activeDataPattern.id] || []) : [];
  const adaptiveRulesForActive = activeDataPattern ? (adaptiveRulesByPattern[activeDataPattern.id] || []) : [];
  const transferChallengesForActive = activeDataPattern ? (transferByPattern[activeDataPattern.id] || []) : [];
  const scenariosForActive = activeDataPattern ? (scenariosByPattern[activeDataPattern.id] || []) : [];

  const handleLaunchPattern = (patternId: string) => {
    try { emitTelemetry({ kind: 'pattern_attempt', patternId }); } catch {}
    navigate(`/study-mode?pattern=${patternId}&mode=scl`);
  };

  const handleLaunchTransfer = (challengeId: string, patternId?: string) => {
    try { emitTelemetry({ kind: 'transfer_challenge_start', patternId, transferId: challengeId }); } catch {}
    navigate(`/study-mode?mode=scenario&transfer=${challengeId}`);
  };

  const handleLaunchScenario = (questionId: string, patternId?: string) => {
    try { emitTelemetry({ kind: 'transfer_challenge_start', patternId, transferId: questionId }); } catch {}
    navigate(`/study-mode?mode=scenario&question=${questionId}`);
  };

  // Simulate loading effects
  const refreshEffects = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Add some randomization to effects
    const updatedEffects = effects.map(effect => ({
      ...effect,
      confidence: Math.max(0.5, Math.min(0.95, effect.confidence + (Math.random() - 0.5) * 0.2)),
    }));
    
    setEffects(updatedEffects);
    setIsLoading(false);
  };

  // Statistics for overview
  const stats = {
    totalEffects: effects.length,
    avgConfidence: effects.reduce((sum, e) => sum + e.confidence, 0) / effects.length,
    effectTypes: [...new Set(effects.map(e => e.type))].length,
    totalConstraints: effects.reduce((sum, e) => sum + e.constraints.length, 0),
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              SuperCritical Learning Demo
            </h1>
            <p className="text-lg text-gray-600 mt-1">
              Interactive Graph Visualization & Advanced AI-Powered Analysis
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Badge variant="outline" className="ring-1 bg-[var(--badge-green-bg)] ring-[var(--badge-green-ring)] text-[var(--badge-green-text)] dark:text-[var(--badge-green-text)]">
            <Zap className="w-3 h-3 mr-1" />
            Phase 2: Graph Visualization
          </Badge>
          <Badge variant="outline" className="ring-1 bg-[var(--badge-blue-bg)] ring-[var(--badge-blue-ring)] text-[var(--badge-blue-text)] dark:text-[var(--badge-blue-text)]">
            <Brain className="w-3 h-3 mr-1" />
            Phase 4: Advanced Features
          </Badge>
          <Badge variant="outline" className="ring-1 bg-[var(--badge-purple-bg)] ring-[var(--badge-purple-ring)] text-[var(--badge-purple-text)] dark:text-[var(--badge-purple-text)]">
            <Network className="w-3 h-3 mr-1" />
            Interactive Demo
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">
            <BookOpen className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="graph">
            <Network className="w-4 h-4 mr-2" />
            Interactive Graph
          </TabsTrigger>
          <TabsTrigger value="advanced">
            <Brain className="w-4 h-4 mr-2" />
            Advanced Analysis
          </TabsTrigger>
          <TabsTrigger value="integration">
            <Target className="w-4 h-4 mr-2" />
            Full Integration
          </TabsTrigger>
          <TabsTrigger value="data-autonomy">
            <Layers className="w-4 h-4 mr-2" />
            Data Autonomy Mastery
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Effects</p>
                    <p className="text-2xl font-bold">{stats.totalEffects}</p>
                  </div>
                  <Network className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Confidence</p>
                    <p className="text-2xl font-bold">{(stats.avgConfidence * 100).toFixed(0)}%</p>
                  </div>
                  <Target className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Effect Types</p>
                    <p className="text-2xl font-bold">{stats.effectTypes}</p>
                  </div>
                  <Shuffle className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Constraints</p>
                    <p className="text-2xl font-bold">{stats.totalConstraints}</p>
                  </div>
                  <Zap className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Feature Showcase</span>
                <Button 
                  onClick={refreshEffects}
                  disabled={isLoading}
                  variant="outline"
                  size="sm"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  {isLoading ? 'Updating...' : 'Refresh Data'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-purple-700">Graph Visualization Features</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Interactive React Flow integration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Force-directed layout algorithms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Real-time node editing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Dynamic filtering and controls</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Type-based styling and organization</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-700">Advanced AI Features</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Constraint satisfaction solving</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Genetic algorithm optimization</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Perturbation analysis engine</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Implementation roadmap generation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Multi-format export capabilities</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
                <h4 className="font-medium text-purple-800 mb-2">🚀 Getting Started</h4>
                <p className="text-sm text-purple-700">
                  Explore the Interactive Graph tab to see React Flow in action, then try the Advanced Analysis 
                  features to experience constraint solving, perturbation generation, and roadmap export capabilities.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Interactive Graph Tab */}
        <TabsContent value="graph" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="w-5 h-5" />
                React Flow Interactive Graph
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[600px] border rounded-lg overflow-hidden">
                <SCLGraph effects={effects} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Features Tab */}
        <TabsContent value="advanced" className="space-y-6">
          <AdvancedFeatures effects={effects} />
        </TabsContent>

        {/* Full Integration Tab */}
        <TabsContent value="integration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Complete SCL Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Mini Graph Preview */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Graph Overview</h3>
                  <div className="h-[300px] border rounded-lg overflow-hidden bg-gray-50">
                    <SCLGraph effects={effects.slice(0, 5)} />
                  </div>
                </div>

                {/* Integration Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">System Integration</h3>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="font-medium text-green-800">Graph Visualization</span>
                      </div>
                      <p className="text-sm text-green-700">
                        React Flow integration with D3-force layouts, interactive controls, and real-time editing
                      </p>
                    </div>

                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="font-medium text-blue-800">Constraint Solving</span>
                      </div>
                      <p className="text-sm text-blue-700">
                        Multi-algorithm optimization with genetic algorithms and simulated annealing
                      </p>
                    </div>

                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="font-medium text-purple-800">Perturbation Analysis</span>
                      </div>
                      <p className="text-sm text-purple-700">
                        Systematic scenario exploration with 5 perturbation types and impact analysis
                      </p>
                    </div>

                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="font-medium text-orange-800">Roadmap Export</span>
                      </div>
                      <p className="text-sm text-orange-700">
                        Implementation planning with 6 export formats and timeline generation
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 border rounded-lg">
                    <h4 className="font-medium mb-2">Next Steps</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div>• Test graph interactions in full SCL sessions</div>
                      <div>• Integrate with existing study mode workflows</div>
                      <div>• Export roadmaps for real project implementation</div>
                      <div>• Explore advanced constraint scenarios</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Phase Implementation Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-green-600">✅ Completed Phases</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                      <span>Phase 2: Graph Visualization</span>
                      <Badge variant="default" className="ring-1 bg-[var(--badge-green-bg)] ring-[var(--badge-green-ring)] text-[var(--badge-green-text)] dark:text-[var(--badge-green-text)]">Complete</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                      <span>Phase 4: Advanced Features</span>
                      <Badge variant="default" className="ring-1 bg-[var(--badge-green-bg)] ring-[var(--badge-green-ring)] text-[var(--badge-green-text)] dark:text-[var(--badge-green-text)]">Complete</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-blue-600">🔄 Integration Status</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                      <span>React Flow Integration</span>
                      <Badge variant="default" className="ring-1 bg-[var(--badge-blue-bg)] ring-[var(--badge-blue-ring)] text-[var(--badge-blue-text)] dark:text-[var(--badge-blue-text)]">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                      <span>Advanced AI Features</span>
                      <Badge variant="default" className="ring-1 bg-[var(--badge-blue-bg)] ring-[var(--badge-blue-ring)] text-[var(--badge-blue-text)] dark:text-[var(--badge-blue-text)]">Active</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Autonomy Mastery Layer */}
        <TabsContent value="data-autonomy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-5 h-5" />
                Data Autonomy Mastery Control Center
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Explore mastery rubrics, failure mode panels, adaptive heuristics, and fusion challenges across all nine Data Autonomy patterns.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {dataAutonomyPatterns.length === 0 ? (
                <p className="text-sm text-muted-foreground">No Data Autonomy patterns detected.</p>
              ) : (
                <>
                  <div className="flex flex-wrap gap-2">
                    {dataAutonomyPatterns.map(pattern => (
                      <Button
                        key={pattern.id}
                        size="sm"
                        variant={activeDataPattern?.id === pattern.id ? 'default' : 'outline'}
                        onClick={() => setActiveDataPatternId(pattern.id)}
                      >
                        {pattern.name}
                      </Button>
                    ))}
                  </div>
                  {activeDataPattern && (
                    <div className="border rounded-lg p-4 bg-muted/30">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="max-w-3xl space-y-2">
                          <h3 className="text-lg font-semibold">{activeDataPattern.name}</h3>
                          <p className="text-sm text-muted-foreground">{activeDataPattern.description}</p>
                          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                            {activeDataPattern.relatedPatterns?.length ? (
                              <span>Related: {activeDataPattern.relatedPatterns.join(', ')}</span>
                            ) : null}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button size="sm" onClick={() => handleLaunchPattern(activeDataPattern.id)}>
                            <Play className="w-4 h-4 mr-2" />
                            Launch in Study Mode
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => navigate(`/patterns/${activeDataPattern.id}`)}
                          >
                            <BookOpen className="w-4 h-4 mr-2" />
                            View Pattern Guide
                          </Button>
                        </div>
                      </div>
                      {activeDataPattern.businessUseCase && (
                        <div className="mt-3 text-sm text-muted-foreground">
                          <strong>Business Use Case:</strong> {activeDataPattern.businessUseCase.industry} — {activeDataPattern.businessUseCase.description}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {activeDataPattern && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Mastery Rubric (Recognition → Governance)</CardTitle>
                    <p className="text-sm text-muted-foreground">Four-tier rubric outlining advancement signals and upgrade criteria.</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {masteryBandsForActive.length === 0 && (
                      <p className="text-sm text-muted-foreground">No mastery rubric entries defined.</p>
                    )}
                    {masteryBandsForActive.map(band => (
                      <div key={`${band.patternId}-${band.tier}`} className="rounded-lg border p-4 bg-background">
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <Badge variant="secondary" className="uppercase tracking-wide">{band.tier}</Badge>
                          <span className="text-xs text-muted-foreground">Upgrade gates: {band.upgradeCriteria.length}</span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium">Signals</span>
                            <ul className="list-disc list-inside text-muted-foreground">
                              {band.signals.map((signal, idx) => (
                                <li key={idx}>{signal}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <span className="font-medium">Anti-signals</span>
                            <ul className="list-disc list-inside text-muted-foreground">
                              {band.antiSignals.map((signal, idx) => (
                                <li key={idx}>{signal}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <span className="font-medium">Advance by</span>
                            <ul className="list-disc list-inside text-muted-foreground">
                              {band.upgradeCriteria.map((criteria, idx) => (
                                <li key={idx}>{criteria}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Failure Modes & Adaptive Heuristics</CardTitle>
                    <p className="text-sm text-muted-foreground">Top failure modes surfaced inline with adaptive routing rules that trigger remediation.</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Failure Mode Panels</h4>
                      {failureModesForActive.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No failure modes defined for this pattern.</p>
                      ) : (
                        <div className="space-y-3">
                          {failureModesForActive.map(mode => (
                            <div key={`${mode.patternId}-${mode.mode}`} className="border rounded-lg p-3 text-sm">
                              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                <span className="font-medium">{mode.mode}</span>
                                <Badge variant={mode.impact === 'high' ? 'destructive' : mode.impact === 'medium' ? 'secondary' : 'outline'} className="uppercase">
                                  {mode.impact}
                                </Badge>
                              </div>
                              <p className="text-muted-foreground mb-2">{mode.description}</p>
                              <div className="text-xs text-muted-foreground space-y-1">
                                <div><strong>Detection:</strong> {mode.detectionSignal}</div>
                                <div><strong>Remediation:</strong> {mode.remediation}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold mb-2">Adaptive Heuristics</h4>
                      {adaptiveRulesForActive.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No adaptive rules currently configured.</p>
                      ) : (
                        <div className="space-y-3">
                          {adaptiveRulesForActive.map(rule => (
                            <div key={rule.id} className="border rounded-lg p-3 text-sm bg-muted/20">
                              <div className="mb-2 text-xs uppercase text-muted-foreground">Trigger: {rule.trigger.signal}{rule.trigger.topic ? ` · ${rule.trigger.topic}` : ''}</div>
                              <div className="font-medium mb-1">{rule.prescribe.action.replace(/-/g, ' ')}</div>
                              <div className="text-xs text-muted-foreground space-y-1">
                                <div><strong>Resource:</strong> {rule.prescribe.resourceRef}</div>
                                <div><strong>Rationale:</strong> {rule.prescribe.rationale}</div>
                                {typeof rule.trigger.threshold === 'number' && (
                                  <div><strong>Threshold:</strong> {rule.trigger.threshold}</div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Transfer (Fusion) Challenges</CardTitle>
                    <p className="text-sm text-muted-foreground">Run cross-pattern assessments to ensure selective strategy reuse under drift and decomposition scenarios.</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {transferChallengesForActive.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No transfer challenges available for this pattern.</p>
                    ) : (
                      transferChallengesForActive.map(challenge => (
                        <div key={challenge.id} className="border rounded-lg p-4 bg-background space-y-2 text-sm">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-medium">{challenge.title}</span>
                            <Badge variant="outline">{challenge.compositePatterns.join(' + ')}</Badge>
                          </div>
                          <p className="text-muted-foreground">{challenge.description}</p>
                          <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                            {challenge.evaluationCriteria.map((criterion, idx) => (
                              <li key={idx}>{criterion}</li>
                            ))}
                          </ul>
                          {challenge.hint && (
                            <p className="text-xs text-muted-foreground italic">Hint: {challenge.hint}</p>
                          )}
                          <div className="flex flex-wrap gap-2">
                            <Button size="sm" onClick={() => handleLaunchTransfer(challenge.id, activeDataPattern.id)}>
                              <Play className="w-4 h-4 mr-2" />
                              Launch Challenge
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => emitTelemetry({ kind: 'transfer_challenge_complete', patternId: activeDataPattern.id, transferId: challenge.id })}
                            >
                              <Zap className="w-4 h-4 mr-2" />
                              Simulate Completion
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Composite Scenarios & Telemetry</CardTitle>
                    <p className="text-sm text-muted-foreground">Launch composite scenarios and review telemetry events emitted during mastery progression.</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Composite Scenarios</h4>
                      {scenariosForActive.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No composite scenarios available.</p>
                      ) : (
                        <div className="space-y-3">
                          {scenariosForActive.map(question => (
                            <div key={question.id} className="border rounded-lg p-3 text-sm bg-muted/10">
                              <div className="font-medium mb-1">{question.title}</div>
                              <p className="text-muted-foreground mb-2">{question.explanation}</p>
                              <Button size="sm" variant="outline" onClick={() => handleLaunchScenario(question.id, activeDataPattern.id)}>
                                <Play className="w-4 h-4 mr-2" />
                                Launch Scenario
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold mb-2">Telemetry Schema</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
                        {telemetryEventSummaries.map(event => (
                          <div key={event.kind} className="border rounded-lg p-3 bg-background">
                            <div className="font-medium text-foreground mb-1">{event.kind}</div>
                            <p>{event.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SCLDemo;
