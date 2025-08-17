import React, { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Brain, Target } from '@phosphor-icons/react';
import type { 
  SCLSession as SCLSessionType, 
  SCLMode, 
  SCLObjective
} from '@/types/supercritical';
import { SCLSession } from './SCLSession';

interface SuperCriticalLearningProps {
  onBack?: () => void;
  concept?: string;
  pattern?: string;
}

export function SuperCriticalLearning({ 
  onBack, 
  concept: initialConcept, 
  pattern: initialPattern 
}: SuperCriticalLearningProps) {
  const [currentSession, setCurrentSession] = useState<SCLSessionType | null>(null);
  const [isActive, setIsActive] = useState(false);

  const createNewSession = useCallback((mode: SCLMode, objective: SCLObjective) => {
    const sessionId = `scl-${Date.now()}`;
    
    const newSession: SCLSessionType = {
      id: sessionId,
      mode,
      seeds: {
        conceptIds: initialConcept ? [initialConcept] : [],
        patternIds: initialPattern ? [initialPattern] : [],
        practices: [],
      },
      objectives: [objective],
      constraints: {
        budget: 'medium',
        timeHorizon: '3months',
        complianceProfile: 'basic',
      },
      effectGraph: {
        nodes: [],
        edges: [],
      },
      leaps: [],
      synthesis: {
        risks: [],
        opportunities: [],
        recommendedPractices: [],
        kpis: [],
        actionPlan: [],
        implementationOrder: [],
        successMetrics: [],
      },
      score: {
        completeness: 0,
        secondOrderDepth: 0,
        thirdOrderDepth: 0,
        novelty: 0,
        feasibility: 0,
        leapDetection: 0,
      },
      audit: {
        sources: [],
        model: 'placeholder',
        version: '1.0.0',
        timestamp: Date.now(),
        promptTokens: 0,
        responseTokens: 0,
      },
      createdAt: Date.now(),
      updatedAt: Date.now(),
      status: 'draft',
    };

    setCurrentSession(newSession);
    setIsActive(true);
  }, [initialConcept, initialPattern]);

  const updateSession = useCallback((updatedSession: SCLSessionType) => {
    setCurrentSession({
      ...updatedSession,
      updatedAt: Date.now(),
    });
  }, []);

  const handleSessionComplete = useCallback((session: SCLSessionType) => {
    // Here you could save the session, send analytics, etc.
    console.log('Session completed:', session);
    
    // Calculate final scores based on the effects and synthesis
    const completedSession = {
      ...session,
      score: {
        completeness: calculateCompleteness(session),
        secondOrderDepth: session.effectGraph.nodes.filter(n => n.order === 2).length,
        thirdOrderDepth: session.effectGraph.nodes.filter(n => n.order === 3).length,
        novelty: calculateNovelty(session),
        feasibility: calculateFeasibility(session),
        leapDetection: session.leaps.length > 0 ? 0.8 : 0.2,
      },
    };
    
    setCurrentSession(completedSession);
  }, []);

  // Helper scoring functions
  const calculateCompleteness = (session: SCLSessionType): number => {
    const firstOrderCount = session.effectGraph.nodes.filter(n => n.order === 1).length;
    const secondOrderCount = session.effectGraph.nodes.filter(n => n.order === 2).length;
    const thirdOrderCount = session.effectGraph.nodes.filter(n => n.order === 3).length;
    
    // Scoring based on depth and breadth
    if (thirdOrderCount >= 3) return 0.9;
    if (secondOrderCount >= 5) return 0.8;
    if (firstOrderCount >= 3) return 0.6;
    return 0.3;
  };

  const calculateNovelty = (session: SCLSessionType): number => {
    // This would be enhanced with LLM analysis
    const hasUnconventionalConnections = session.effectGraph.nodes.some(
      node => node.confidence < 0.7
    );
    return hasUnconventionalConnections ? 0.8 : 0.5;
  };

  const calculateFeasibility = (session: SCLSessionType): number => {
    // Based on synthesis actionable plans
    return session.synthesis.actionPlan.length > 2 ? 0.8 : 0.4;
  };

  if (isActive && currentSession) {
    return (
      <SCLSession
        initialSeeds={currentSession.seeds}
        onClose={() => setIsActive(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="shrink-0"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Super Critical Learning
              </h1>
              <p className="text-muted-foreground">
                Explore second and third-order effects in agentic systems
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            Beta
          </Badge>
        </div>

        {/* Introduction */}
        <Card className="p-8">
          <div className="text-center space-y-6">
            <div className="space-y-3">
              <Brain className="h-16 w-16 mx-auto text-primary" />
              <h2 className="text-2xl font-semibold">
                Ready to Think Beyond the Obvious?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                SCL helps you discover the hidden cascades and unexpected consequences 
                that emerge when AI agents interact with complex systems. Go beyond 
                first-order thinking to uncover the insights that matter.
              </p>
            </div>

            {initialConcept && (
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Starting with concept:</p>
                <p className="font-medium">{initialConcept}</p>
              </div>
            )}

            {initialPattern && (
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Starting with pattern:</p>
                <p className="font-medium">{initialPattern}</p>
              </div>
            )}

            <div className="pt-4 border-t border-border">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('/scl-demo', '_blank')}
                className="text-xs"
              >
                Open SCL Interactive Demo
              </Button>
            </div>
          </div>
        </Card>

        {/* Mode Selection */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => createNewSession('consolidate', 'optimize')}>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Target className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="text-xl font-semibold">Consolidate Mode</h3>
                  <p className="text-sm text-muted-foreground">Systematic exploration</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                Build comprehensive effect maps methodically. Perfect for understanding 
                established patterns and their downstream implications.
              </p>
              <div className="flex gap-2 text-xs">
                <Badge variant="outline">Structured</Badge>
                <Badge variant="outline">Comprehensive</Badge>
                <Badge variant="outline">Low Risk</Badge>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => createNewSession('extrapolate', 'minimizeRisk')}>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Brain className="h-8 w-8 text-secondary-foreground" />
                <div>
                  <h3 className="text-xl font-semibold">Extrapolate Mode</h3>
                  <p className="text-sm text-muted-foreground">Creative exploration</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                Push beyond known boundaries with constraints and perturbations. 
                Discover novel insights through controlled creative tension.
              </p>
              <div className="flex gap-2 text-xs">
                <Badge variant="outline">Creative</Badge>
                <Badge variant="outline">Constrained</Badge>
                <Badge variant="outline">High Insight</Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Stats or Recent Sessions could go here */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">How SCL Works</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-2">
              <div className="font-medium text-primary">1. Seed & Constraints</div>
              <p className="text-muted-foreground">
                Start with a concept and set boundary conditions for exploration
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-medium text-primary">2. Effect Mapping</div>
              <p className="text-muted-foreground">
                Build cascading effect chains with confidence scoring and leap detection
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-medium text-primary">3. Synthesis</div>
              <p className="text-muted-foreground">
                Generate actionable insights and implementation strategies
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default SuperCriticalLearning;
