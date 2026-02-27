import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { agentPatterns } from '@/lib/data/patterns';
import { MOCK_CONCEPTS } from '@/data/mockConcepts';
import { trackEvent } from '@/lib/analytics/ga';
import { useUserSettings } from '@/contexts/UserSettingsContext';
import {
  buildKnowledgeGraph,
  buildLearnerSnapshot,
  createWeeklyPlan,
  scorePattern,
  type BattleWeights,
  type PatternBattleScore,
} from '@/lib/phase1/phase1Lab';
import { getDueCards } from '@/lib/spaced-repetition/store';
import { ChartLine, Path, Sparkle, Brain, Fire, ArrowRight, Trophy } from '@phosphor-icons/react';

const focusWeights: Record<'balanced' | 'quality' | 'speed', BattleWeights> = {
  balanced: { quality: 0.4, speed: 0.3, simplicity: 0.3 },
  quality: { quality: 0.6, speed: 0.2, simplicity: 0.2 },
  speed: { quality: 0.2, speed: 0.5, simplicity: 0.3 },
};

// Mini radar chart rendered with SVG
function RadarChart({ scores, color }: { scores: PatternBattleScore; color: string }) {
  const cx = 60, cy = 60, r = 45;
  const dims = [
    { label: 'Quality', value: scores.quality, angle: -90 },
    { label: 'Speed', value: scores.speed, angle: 30 },
    { label: 'Simplicity', value: scores.simplicity, angle: 150 },
  ];
  const toXY = (angle: number, val: number) => ({
    x: cx + (r * val / 100) * Math.cos((angle * Math.PI) / 180),
    y: cy + (r * val / 100) * Math.sin((angle * Math.PI) / 180),
  });

  const points = dims.map(d => toXY(d.angle, d.value));
  const polygon = points.map(p => `${p.x},${p.y}`).join(' ');
  const gridPoints = dims.map(d => toXY(d.angle, 100));
  const gridPolygon = gridPoints.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <svg viewBox="0 0 120 120" className="w-28 h-28 mx-auto">
      <polygon points={gridPolygon} fill="none" stroke="currentColor" className="text-muted-foreground/20" strokeWidth="1" />
      <polygon points={polygon} fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.5" />
      {dims.map((d, i) => {
        const label = toXY(d.angle, 115);
        return (
          <text key={i} x={label.x} y={label.y} textAnchor="middle" dominantBaseline="middle" className="text-[8px] fill-muted-foreground">
            {d.label}
          </text>
        );
      })}
    </svg>
  );
}

export default function Phase1LabPage() {
  const [focus, setFocus] = useState<'balanced' | 'quality' | 'speed'>('balanced');
  const [patternA, setPatternA] = useState(agentPatterns[0]?.id || '');
  const [patternB, setPatternB] = useState(agentPatterns[1]?.id || '');
  const [selectedConcept, setSelectedConcept] = useState(MOCK_CONCEPTS[0]?.id || '');
  const { settings } = useUserSettings();

  const snapshot = useMemo(() => buildLearnerSnapshot(), []);
  const weeklyPlan = useMemo(
    () => createWeeklyPlan(snapshot, settings?.learningProfile),
    [snapshot, settings?.learningProfile]
  );

  // Spaced repetition due items
  const dueConceptIds = useMemo(
    () => getDueCards(MOCK_CONCEPTS.map(c => c.id)),
    []
  );
  const dueConcepts = useMemo(
    () => dueConceptIds.slice(0, 5).map(id => MOCK_CONCEPTS.find(c => c.id === id)).filter(Boolean),
    [dueConceptIds]
  );

  const graph = useMemo(
    () => buildKnowledgeGraph(MOCK_CONCEPTS.slice(0, 15), agentPatterns.slice(0, 25)),
    []
  );

  // Split edges by type for the selected concept
  const selectedConceptObj = MOCK_CONCEPTS.find(c => c.id === selectedConcept);
  const conceptEdges = useMemo(
    () => graph.edges.filter(edge => edge.from === selectedConcept || edge.to === selectedConcept),
    [graph, selectedConcept]
  );
  const prerequisiteEdges = useMemo(
    () => conceptEdges.filter(e => e.reason === 'prerequisite'),
    [conceptEdges]
  );
  const keywordEdges = useMemo(
    () => conceptEdges.filter(e => e.reason === 'keyword' || e.reason === 'suggested'),
    [conceptEdges]
  );
  const prerequisiteConcepts = useMemo(
    () => prerequisiteEdges.map(e => e.from).filter(id => id !== selectedConcept),
    [prerequisiteEdges, selectedConcept]
  );
  const dependentConcepts = useMemo(
    () => graph.edges.filter(e => e.from === selectedConcept && e.reason === 'prerequisite').map(e => e.to),
    [graph, selectedConcept]
  );
  const connectedPatterns = useMemo(
    () => keywordEdges.map(e => e.to).filter(id => graph.nodes.find(n => n.id === id && n.type === 'pattern')),
    [keywordEdges, graph]
  );

  const battle = useMemo(() => {
    const left = agentPatterns.find(pattern => pattern.id === patternA);
    const right = agentPatterns.find(pattern => pattern.id === patternB);
    if (!left || !right || left.id === right.id) return null;
    const leftScore = scorePattern(left, focusWeights[focus]);
    const rightScore = scorePattern(right, focusWeights[focus]);
    return {
      left: leftScore,
      right: rightScore,
      winner: leftScore.overall >= rightScore.overall ? left : right,
    };
  }, [focus, patternA, patternB]);

  const completionPct = Math.min(100, snapshot.quiz.totalQuizzes * 10);

  useEffect(() => {
    trackEvent({ action: 'phase1_lab_view', category: 'phase1', label: 'entry' });
  }, []);

  useEffect(() => {
    trackEvent({ action: 'phase1_battle_focus_change', category: 'phase1', label: focus });
  }, [focus]);

  useEffect(() => {
    trackEvent({ action: 'phase1_graph_concept_select', category: 'phase1', label: selectedConcept });
  }, [selectedConcept]);

  useEffect(() => {
    if (!battle) return;
    trackEvent({
      action: 'phase1_battle_result',
      category: 'phase1',
      label: `${battle.left.patternId}_vs_${battle.right.patternId}`,
      winner: battle.winner.id,
      focus,
      left_overall: battle.left.overall,
      right_overall: battle.right.overall,
    });
  }, [battle, focus]);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Phase 1 Lab</h1>
          <p className="text-muted-foreground mt-2">
            Personalized Copilot, Knowledge Graph Navigator, Pattern Battle Arena, and Spaced Repetition.
          </p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link to="/analytics" className="flex items-center gap-1">
            <ChartLine size={14} /> My Analytics <ArrowRight size={14} />
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="copilot" className="w-full">
        <TabsList>
          <TabsTrigger value="copilot"><Sparkle size={14} className="mr-1" />Learning Copilot</TabsTrigger>
          <TabsTrigger value="graph"><Path size={14} className="mr-1" />Knowledge Graph</TabsTrigger>
          <TabsTrigger value="battle"><Trophy size={14} className="mr-1" />Battle Arena</TabsTrigger>
          <TabsTrigger value="review"><Brain size={14} className="mr-1" />Review ({dueConceptIds.length})</TabsTrigger>
        </TabsList>

        {/* ── Copilot Tab ─────────────────────────────────────────────── */}
        <TabsContent value="copilot" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Sparkle size={18} /> Personalized Learning Copilot 2.0</CardTitle>
              <CardDescription>
                Adapts to your quiz telemetry, learning profile ({settings?.learningProfile?.level ?? 'intermediate'}), and study streaks.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="rounded-lg border p-3"><div className="text-xs text-muted-foreground">Quizzes</div><div className="text-xl font-semibold">{snapshot.quiz.totalQuizzes}</div></div>
                <div className="rounded-lg border p-3"><div className="text-xs text-muted-foreground">Average</div><div className="text-xl font-semibold">{snapshot.quiz.averageScore}%</div></div>
                <div className="rounded-lg border p-3"><div className="text-xs text-muted-foreground">Best</div><div className="text-xl font-semibold">{snapshot.quiz.bestScore}%</div></div>
                <div className="rounded-lg border p-3"><div className="text-xs text-muted-foreground">Sessions</div><div className="text-xl font-semibold">{snapshot.studyCompleted}/{snapshot.studySessions}</div></div>
                <div className="rounded-lg border p-3">
                  <div className="text-xs text-muted-foreground flex items-center gap-1"><Fire size={10} /> Streak</div>
                  <div className="text-xl font-semibold">{snapshot.streak} day{snapshot.streak !== 1 ? 's' : ''}</div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Weekly momentum</span>
                  <span>{completionPct}%</span>
                </div>
                <Progress value={completionPct} />
              </div>

              {/* SR nudge */}
              {dueConceptIds.length > 0 && (
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 space-y-2">
                  <div className="text-sm font-medium flex items-center gap-1"><Brain size={14} /> {dueConceptIds.length} concept{dueConceptIds.length !== 1 ? 's' : ''} due for spaced review</div>
                  <div className="flex flex-wrap gap-1">
                    {dueConcepts.map(c => <Badge key={c!.id} variant="outline" className="text-xs">{c!.title}</Badge>)}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <div className="text-sm font-medium">Your weekly plan</div>
                {weeklyPlan.map((item, idx) => (
                  <div key={idx} className="rounded-md border p-3 text-sm">{idx + 1}. {item}</div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Knowledge Graph Tab ─────────────────────────────────────── */}
        <TabsContent value="graph" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Path size={18} /> Knowledge Graph Navigator</CardTitle>
              <CardDescription>
                Explore concept prerequisites, dependencies, and linked agent patterns.
                Showing {graph.nodes.length} nodes and {graph.edges.length} edges.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {MOCK_CONCEPTS.slice(0, 15).map(concept => (
                  <Button
                    key={concept.id}
                    size="sm"
                    variant={selectedConcept === concept.id ? 'default' : 'outline'}
                    onClick={() => setSelectedConcept(concept.id)}
                  >
                    {concept.title}
                  </Button>
                ))}
              </div>

              {selectedConceptObj && (
                <div className="rounded-lg border p-4 space-y-4">
                  <div>
                    <div className="font-semibold text-lg">{selectedConceptObj.title}</div>
                    {selectedConceptObj.description && (
                      <div className="text-sm text-muted-foreground mt-1">{(selectedConceptObj as any).description}</div>
                    )}
                  </div>

                  {/* Prerequisites */}
                  {prerequisiteConcepts.length > 0 && (
                    <div>
                      <div className="text-sm font-medium mb-1">Prerequisites (learn these first)</div>
                      <div className="flex flex-wrap gap-2">
                        {prerequisiteConcepts.map(id => {
                          const c = MOCK_CONCEPTS.find(x => x.id === id);
                          return (
                            <Badge key={id} variant="secondary" className="cursor-pointer" onClick={() => setSelectedConcept(id)}>
                              ← {c?.title || id}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Leads to */}
                  {dependentConcepts.length > 0 && (
                    <div>
                      <div className="text-sm font-medium mb-1">Unlocks (learn after this)</div>
                      <div className="flex flex-wrap gap-2">
                        {dependentConcepts.map(id => {
                          const c = MOCK_CONCEPTS.find(x => x.id === id);
                          return (
                            <Badge key={id} variant="outline" className="cursor-pointer" onClick={() => setSelectedConcept(id)}>
                              {c?.title || id} →
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Related patterns */}
                  <div>
                    <div className="text-sm font-medium mb-1">Related patterns</div>
                    <div className="flex flex-wrap gap-2">
                      {connectedPatterns.map(patternId => {
                        const p = graph.nodes.find(n => n.id === patternId);
                        return <Badge key={patternId} variant="secondary">{p?.label || patternId}</Badge>;
                      })}
                      {connectedPatterns.length === 0 && <span className="text-sm text-muted-foreground">No direct pattern links yet.</span>}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {connectedPatterns.slice(0, 3).map(patternId => {
                      const p = graph.nodes.find(n => n.id === patternId);
                      return (
                        <Button asChild key={patternId} size="sm" variant="outline">
                          <Link to={`/patterns/${patternId}`}>Open {p?.label || patternId}</Link>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Battle Arena Tab ────────────────────────────────────────── */}
        <TabsContent value="battle" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Trophy size={18} /> Pattern Battle Arena</CardTitle>
              <CardDescription>Compare two patterns with weighted scoring and radar visualization.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <select className="rounded-md border bg-background p-2 text-sm" value={patternA} onChange={e => setPatternA(e.target.value)}>
                  {agentPatterns.map(pattern => <option key={pattern.id} value={pattern.id}>{pattern.name}</option>)}
                </select>
                <select className="rounded-md border bg-background p-2 text-sm" value={patternB} onChange={e => setPatternB(e.target.value)}>
                  {agentPatterns.map(pattern => <option key={pattern.id} value={pattern.id}>{pattern.name}</option>)}
                </select>
                <select className="rounded-md border bg-background p-2 text-sm" value={focus} onChange={e => setFocus(e.target.value as 'balanced' | 'quality' | 'speed')}>
                  <option value="balanced">Balanced scoring</option>
                  <option value="quality">Quality-focused</option>
                  <option value="speed">Speed-focused</option>
                </select>
              </div>

              {!battle && <div className="text-sm text-muted-foreground">Pick two different patterns to run the battle.</div>}
              {battle && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {([
                    { score: battle.left, color: '#3b82f6', isWinner: battle.left.overall >= battle.right.overall },
                    { score: battle.right, color: '#ef4444', isWinner: battle.right.overall > battle.left.overall },
                  ] as const).map(({ score, color, isWinner }) => (
                    <div key={score.patternId} className={`rounded-lg border p-4 space-y-3 ${isWinner ? 'border-primary ring-1 ring-primary/20' : ''}`}>
                      <div className="flex items-center justify-between">
                        <div className="font-semibold">{score.patternName}</div>
                        {isWinner && <Badge>Winner</Badge>}
                      </div>
                      <RadarChart scores={score} color={color} />
                      <div className="grid grid-cols-3 gap-2 text-center text-sm">
                        <div><div className="text-muted-foreground text-xs">Quality</div><div className="font-semibold">{score.quality}</div></div>
                        <div><div className="text-muted-foreground text-xs">Speed</div><div className="font-semibold">{score.speed}</div></div>
                        <div><div className="text-muted-foreground text-xs">Simple</div><div className="font-semibold">{score.simplicity}</div></div>
                      </div>
                      <div className="text-center text-lg font-bold">Overall: {score.overall}</div>
                    </div>
                  ))}
                </div>
              )}
              {battle && (
                <div className="rounded-lg border border-primary/40 bg-primary/5 p-3 text-sm text-center">
                  🏆 <span className="font-semibold">{battle.winner.name}</span> wins under <span className="capitalize">{focus}</span> scoring
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Spaced Repetition Review Tab ─────────────────────────────── */}
        <TabsContent value="review" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Brain size={18} /> Spaced Repetition Review</CardTitle>
              <CardDescription>
                SM-2 algorithm tracks concept confidence decay. Review due concepts to lock in long-term memory.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {dueConceptIds.length === 0 ? (
                <div className="text-center py-8">
                  <Brain size={48} className="mx-auto text-muted-foreground/40 mb-3" />
                  <div className="text-lg font-medium">All caught up!</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    No concepts due for review right now. Complete quizzes or study sessions to grow your deck.
                  </p>
                  <div className="flex justify-center gap-3 mt-4">
                    <Button asChild size="sm"><Link to="/quiz">Take a Quiz</Link></Button>
                    <Button asChild size="sm" variant="outline"><Link to="/study-mode">Study Mode</Link></Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-sm text-muted-foreground">
                    {dueConceptIds.length} concept{dueConceptIds.length !== 1 ? 's' : ''} are ready for review based on your spaced repetition schedule.
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {dueConceptIds.slice(0, 8).map(id => {
                      const concept = MOCK_CONCEPTS.find(c => c.id === id);
                      if (!concept) return null;
                      return (
                        <div key={id} className="rounded-lg border p-3 flex items-center justify-between">
                          <div>
                            <div className="font-medium text-sm">{concept.title}</div>
                            {concept.prerequisites && concept.prerequisites.length > 0 && (
                              <div className="text-xs text-muted-foreground mt-0.5">
                                Requires: {concept.prerequisites.slice(0, 2).join(', ')}
                              </div>
                            )}
                          </div>
                          <Button asChild size="sm" variant="outline">
                            <Link to="/study-mode">Review</Link>
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                  {dueConceptIds.length > 8 && (
                    <div className="text-sm text-muted-foreground text-center">
                      + {dueConceptIds.length - 8} more concepts due
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

