import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme/ThemeProvider';
import { Play, Pause, ArrowRight, SkipForward } from '@phosphor-icons/react';

export interface AlgorithmStep {
  id: string;
  name: string;
  description: string;
  code?: string;
  data?: Record<string, any>;
  status?: 'pending' | 'active' | 'completed' | 'error';
  timing?: number; // milliseconds
  substeps?: AlgorithmStep[];
}

interface AlgorithmVisualizerProps {
  steps?: AlgorithmStep[];
  title?: string;
  description?: string;
  onStepComplete?: (step: AlgorithmStep) => void;
  autoPlay?: boolean;
  speed?: number; // playback speed multiplier
}

/**
 * Component for visualizing algorithm execution with code snippets
 */
const AlgorithmVisualizer = React.memo(({
  steps,
  title = 'Algorithm Execution',
  description,
  onStepComplete,
  autoPlay = false,
  speed = 1
}: AlgorithmVisualizerProps) => {
  const { theme } = useTheme();
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  // Provide a safe fallback set of steps when none are provided
  const safeSteps: AlgorithmStep[] = useMemo(() => {
    if (Array.isArray(steps) && steps.length > 0) return steps;
    // Minimal default to avoid empty UI and prevent undefined access
    return [
      { id: 'ingest', name: 'Ingest', description: 'Load inputs and initialize state.' },
      { id: 'process', name: 'Process', description: 'Apply core algorithm logic.' },
      { id: 'output', name: 'Output', description: 'Produce results and metrics.' }
    ];
  }, [steps]);

  // Memoize the processed steps to prevent unnecessary recalculations
  const processedSteps = useMemo(() => {
    return safeSteps.map((step, index) => ({
      ...step,
      status: (
        index < currentStepIndex ? 'completed' :
        index === currentStepIndex ? 'active' : 'pending'
      ) as 'pending' | 'active' | 'completed' | 'error'
    }));
  }, [safeSteps, currentStepIndex]);

  // Handle auto-play
  useEffect(() => {
    if (!isPlaying || currentStepIndex >= safeSteps.length - 1) return;
    
    const currentStep = safeSteps[currentStepIndex];
    const baseDelay = currentStep?.timing || 1500; // Default to 1.5 seconds
    const adjustedDelay = baseDelay / speed;
    
    const timer = setTimeout(() => {
      nextStep();
    }, adjustedDelay);
    
    return () => clearTimeout(timer);
  }, [currentStepIndex, isPlaying, safeSteps, speed]);

  // Initialize first step
  useEffect(() => {
    if (safeSteps.length > 0 && currentStepIndex === -1) {
      setCurrentStepIndex(0);
    }
  }, [safeSteps, currentStepIndex]);

  // Advance to next step
  const nextStep = useCallback(() => {
    if (currentStepIndex >= safeSteps.length - 1) return;
    
    // Mark current step as completed
    if (currentStepIndex >= 0) {
      const step = safeSteps[currentStepIndex];
      setCompletedSteps(prev => {
        const updated = new Set(prev);
        updated.add(step.id);
        return updated;
      });
      
      // Call callback if provided
      if (onStepComplete) {
        onStepComplete(step);
      }
    }
    
    // Advance to next step
    setCurrentStepIndex(prev => prev + 1);
  }, [currentStepIndex, safeSteps, onStepComplete]);

  // Skip to end
  const skipToEnd = useCallback(() => {
    if (currentStepIndex >= safeSteps.length - 1) return;
    
    // Mark all remaining steps as completed
    const newCompleted = new Set(completedSteps);
    for (let i = currentStepIndex; i < safeSteps.length; i++) {
      newCompleted.add(safeSteps[i].id);
      if (onStepComplete) {
        onStepComplete(safeSteps[i]);
      }
    }
    
    setCompletedSteps(newCompleted);
    setCurrentStepIndex(safeSteps.length - 1);
    setIsPlaying(false);
  }, [currentStepIndex, safeSteps, completedSteps, onStepComplete]);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    if (currentStepIndex >= safeSteps.length - 1) {
      // Restart if at the end
      setCurrentStepIndex(0);
      setCompletedSteps(new Set());
      setIsPlaying(true);
    } else {
      // Toggle play/pause
      setIsPlaying(prev => !prev);
    }
  }, [currentStepIndex, safeSteps.length]);

  // Get the current step
  const currentStep = processedSteps[currentStepIndex] || null;

  // Function to render step indicator
  const renderStepIndicator = useCallback((step: AlgorithmStep, index: number) => {
    const isActive = index === currentStepIndex;
    const isCompleted = index < currentStepIndex;
    
    return (
      <div
        key={step.id}
        className={`
          flex items-center gap-2 p-2 rounded-md transition-all
          ${isActive ? 'bg-primary text-primary-foreground' : 
            isCompleted ? 'bg-primary/20 text-foreground' : 
            'bg-muted text-muted-foreground'}
        `}
      >
        <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-background">
          {isCompleted ? (
            <span className="text-primary text-xs">✓</span>
          ) : (
            <span className="text-xs">{index + 1}</span>
          )}
        </div>
        <div className="text-sm font-medium truncate">{step.name}</div>
      </div>
    );
  }, [currentStepIndex]);

  // Function to highlight JSON
  const formatJSON = useCallback((data: Record<string, any>) => {
    try {
      return JSON.stringify(data, null, 2)
        .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              return `<span style="color: var(--primary);">${match}</span>`;
            } else {
              return `<span style="color: var(--accent);">${match}</span>`;
            }
          } else if (/true|false/.test(match)) {
            return `<span style="color: var(--destructive);">${match}</span>`;
          } else if (/null/.test(match)) {
            return `<span style="color: var(--muted-foreground);">${match}</span>`;
          } else {
            return `<span style="color: var(--secondary-foreground);">${match}</span>`;
          }
        });
    } catch (e) {
      return JSON.stringify(data);
    }
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={isPlaying ? 'secondary' : 'default'}
            onClick={togglePlay}
          >
            {isPlaying ? <Pause size={16} className="mr-1" /> : <Play size={16} className="mr-1" />}
            {isPlaying ? 'Pause' : currentStepIndex >= steps.length - 1 ? 'Restart' : 'Play'}
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={nextStep}
            disabled={isPlaying || currentStepIndex >= steps.length - 1}
          >
            <ArrowRight size={16} />
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={skipToEnd}
            disabled={isPlaying || currentStepIndex >= steps.length - 1}
          >
            <SkipForward size={16} />
          </Button>
        </div>
      </div>
      
  {/* Steps timeline */}
      <div className="flex gap-2 overflow-x-auto py-2">
        {processedSteps.map(renderStepIndicator)}
      </div>
      
      {/* Current step details */}
      {currentStep && (
        <Card className="p-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold">{currentStep.name}</h4>
              <Badge variant={currentStep.status === 'active' ? 'default' : 'outline'}>
                {currentStep.status}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              Step {currentStepIndex + 1} of {safeSteps.length}
            </div>
          </div>
          
          <p className="text-sm mb-4">{currentStep.description}</p>
          
          {/* Code display */}
          {currentStep.code && (
            <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm mb-4">
              <code>{currentStep.code}</code>
            </pre>
          )}
          
          {/* Data display */}
          {currentStep.data && Object.keys(currentStep.data).length > 0 && (
            <div className="bg-muted/50 p-4 rounded-md overflow-x-auto text-sm">
              <div className="font-semibold mb-2">Data:</div>
              <pre 
                className="text-xs"
                dangerouslySetInnerHTML={{ 
                  __html: formatJSON(currentStep.data) 
                }} 
              />
            </div>
          )}
        </Card>
      )}
    </div>
  );
}, (prevProps, nextProps) => {
  // Optimize re-renders
  const prevLen = Array.isArray(prevProps.steps) ? prevProps.steps.length : 0;
  const nextLen = Array.isArray(nextProps.steps) ? nextProps.steps.length : 0;
  if (prevLen !== nextLen) return false;
  if (prevProps.autoPlay !== nextProps.autoPlay) return false;
  if (prevProps.speed !== nextProps.speed) return false;
  
  // Deep compare steps array
  const prevSteps = prevProps.steps ?? [];
  const nextSteps = nextProps.steps ?? [];
  const areStepsEqual = prevSteps.every((step, index) => {
    const nextStep = nextSteps[index];
    return (
      step.id === nextStep.id &&
      step.name === nextStep.name &&
      step.status === nextStep.status
    );
  });
  
  return areStepsEqual;
});

export default AlgorithmVisualizer;