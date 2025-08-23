import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { SCLMode } from '@/types/supercritical';

interface SCLControlsProps {
  mode: SCLMode;
  initialSeeds?: any;
  onStartSession: (seeds: any) => void;
  isGenerating?: boolean;
}

export function SCLControls({ mode, onStartSession, isGenerating }: SCLControlsProps) {
  const [concept, setConcept] = useState('');
  const [pattern, setPattern] = useState('');
  const [practice, setPractice] = useState('');

  // Pre-fill defaults per mode
  React.useEffect(() => {
    switch (mode) {
      case 'consolidate':
        setConcept('agentic-systems');
        setPattern('orchestration-pattern');
        setPractice('iterative-testing\napi-integration\ndevops-automation');
        break;
      case 'extrapolate':
        setConcept('frontier-capabilities');
        setPattern('scale-emergence');
        setPractice('counterfactual-probes\nconstraint-perturbation\nweak-signal-harvesting');
        break;
      case 'transfer':
        setConcept('cross-domain-transfer');
        setPattern('knowledge-mapping');
        setPractice('invariant-detection\nanalogy-mapping\nscaffold-reuse');
        break;
      case 'stress-test':
        setConcept('slo-enforcement');
        setPattern('circuit-breaker');
        setPractice('chaos-engineering\nload-spikes\nlatency-injection');
        break;
      case 'intervene':
        setConcept('observability-control');
        setPattern('feedback-controller');
        setPractice('rate-limits\npriority-queues\nrolled-deployments');
        break;
      case 'counterfactual':
        setConcept('assumption-mapping');
        setPattern('ablation-study');
        setPractice('toggle-memory\nturn-off-cot\nno-tools-baseline');
        break;
      case 'leap-focus':
        setConcept('threshold-effects');
        setPattern('phase-transition');
        setPractice('critical-mass-probing\nqueue-depth-thresholds\nalert-on-slope');
        break;
      case 'mechanism-audit':
        setConcept('causal-links');
        setPattern('dependency-mapping');
        setPractice('mechanism-notes\ndelay-estimation\nedge-confidence-scoring');
        break;
      default:
        break;
    }
  }, [mode]);

  const handleStart = () => {
    const seeds = {
      conceptIds: concept ? [concept] : [],
      patternIds: pattern ? [pattern] : [],
      practices: practice ? practice.split('\n').filter(p => p.trim()) : []
    };
    onStartSession(seeds);
  };

  const canStart = concept.trim() || pattern.trim() || practice.trim();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Analysis Seeds Configuration</CardTitle>
          <p className="text-sm text-muted-foreground">
            Define the foundational elements for your SCL analysis. At least one field is required.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-base font-medium">Core Concept</Label>
            <p className="text-sm text-muted-foreground mb-2">
              The primary concept or domain you want to analyze (e.g., agentic-systems, microservices, ai-integration)
            </p>
            <Input
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              placeholder="Enter a core concept..."
              className="h-10"
            />
          </div>
          
          <div>
            <Label className="text-base font-medium">Pattern</Label>
            <p className="text-sm text-muted-foreground mb-2">
              The structural or architectural pattern being applied (e.g., orchestration-pattern, event-sourcing, circuit-breaker)
            </p>
            <Input
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter a pattern..."
              className="h-10"
            />
          </div>
          
          <div>
            <Label className="text-base font-medium">Practices</Label>
            <p className="text-sm text-muted-foreground mb-2">
              Implementation practices, one per line (e.g., iterative-testing, api-integration, devops-automation)
            </p>
            <Textarea
              value={practice}
              onChange={(e) => setPractice(e.target.value)}
              placeholder="Enter practices, one per line..."
              rows={4}
              className="resize-none"
            />
          </div>
          
          <Button 
            onClick={handleStart} 
            disabled={!canStart || isGenerating}
            className="w-full h-12"
            size="lg"
          >
            {isGenerating ? 'Starting SCL Analysis...' : `Start ${String(mode).replace('-', ' ')} Analysis`}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
