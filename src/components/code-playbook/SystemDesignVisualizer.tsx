import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, Pause, ArrowRight, ArrowsClockwise, Stack, Brain, Database, Shield, Gear, ChatCircle, GitBranch } from '@phosphor-icons/react';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SystemDesignPattern, SystemDesignStep } from '@/lib/data/systemDesign';

interface SystemDesignVisualizerProps {
  pattern: SystemDesignPattern;
  title?: string;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'prompt': return ChatCircle;
    case 'context': return Brain;
    case 'knowledge': return Database;
    case 'evaluation': return Gear;
    case 'architecture': return Stack;
    case 'tools': return GitBranch;
    case 'instruction': return Shield;
    default: return Stack;
  }
};

const getCategoryColor = (category: string) => {
  // Badge CSS variable tokens for consistent light/dark theming
  switch (category) {
    case 'prompt':
      return 'ring-1 bg-[var(--badge-blue-bg)] ring-[var(--badge-blue-ring)] text-[var(--badge-blue-text)] dark:text-[var(--badge-blue-text)]';
    case 'context':
      return 'ring-1 bg-[var(--badge-purple-bg)] ring-[var(--badge-purple-ring)] text-[var(--badge-purple-text)] dark:text-[var(--badge-purple-text)]';
    case 'knowledge':
      return 'ring-1 bg-[var(--badge-green-bg)] ring-[var(--badge-green-ring)] text-[var(--badge-green-text)] dark:text-[var(--badge-green-text)]';
    case 'evaluation':
      return 'ring-1 bg-[var(--badge-red-bg)] ring-[var(--badge-red-ring)] text-[var(--badge-red-text)] dark:text-[var(--badge-red-text)]';
    case 'architecture':
      return 'ring-1 bg-[var(--badge-gray-bg)] ring-[var(--badge-gray-ring)] text-[var(--badge-gray-text)] dark:text-[var(--badge-gray-text)]';
    case 'tools':
      return 'ring-1 bg-[var(--badge-orange-bg)] ring-[var(--badge-orange-ring)] text-[var(--badge-orange-text)] dark:text-[var(--badge-orange-text)]';
    case 'instruction':
      return 'ring-1 bg-[var(--badge-yellow-bg)] ring-[var(--badge-yellow-ring)] text-[var(--badge-yellow-text)] dark:text-[var(--badge-yellow-text)]';
    default:
      return 'ring-1 bg-[var(--badge-gray-bg)] ring-[var(--badge-gray-ring)] text-[var(--badge-gray-text)] dark:text-[var(--badge-gray-text)]';
  }
};

/**
 * Interactive system design visualizer that shows agentic patterns and system thinking approaches
 */
const SystemDesignVisualizer = ({ pattern, title = "System Design Pattern" }: SystemDesignVisualizerProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'steps' | 'architecture'>('overview');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  
  const currentStep = pattern.steps[currentStepIndex];

  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // When starting exploration, switch to Design Steps tab to show progress
    if (!isPlaying) {
      setActiveTab('steps');
    }
  };

  // Move to next step
  const nextStep = () => {
    if (currentStepIndex < pattern.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setCompletedSteps(prev => [...prev, currentStep.id]);
    } else {
      setIsPlaying(false);
    }
  };

  // Reset to beginning
  const resetDesign = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
    setCompletedSteps([]);
  };

  // Auto-advance when playing
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStepIndex < pattern.steps.length - 1) {
      // Calculate delay based on speed
      const baseDelay = 3000;
      const delay = baseDelay / speed;
      timer = setTimeout(nextStep, delay);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, currentStepIndex, speed, pattern.steps.length]);

  // Calculate progress percentage
  const progressPercentage = (currentStepIndex + 1) / pattern.steps.length * 100;

  return (
  <div className="border border-border rounded-md overflow-hidden w-full bg-card">
      {/* Header and controls */}
  <div className="bg-muted/20 p-3 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Stack size={18} />
            <h3 className="font-medium truncate text-foreground">{title}</h3>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs text-foreground">Speed:</span>
            <Slider
              value={[speed]}
              min={0.5}
              max={3}
              step={0.5}
              onValueChange={(values) => setSpeed(values[0])}
              className="w-20 sm:w-32"
            />
            <Badge variant="outline" className="text-xs text-foreground border-border">
              {speed === 1 ? 'Normal' : speed < 1 ? 'Slow' : 'Fast'}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            <Button
              size="sm"
              variant="outline"
              onClick={togglePlay}
              className="flex items-center gap-1 text-foreground border-border"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              {isPlaying ? 'Pause' : 'Explore'}
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={nextStep}
              disabled={isPlaying || currentStepIndex >= pattern.steps.length - 1}
              className="flex items-center gap-1 text-foreground"
            >
              <ArrowRight size={14} />
              <span className="hidden sm:inline">Next</span>
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={resetDesign}
              disabled={currentStepIndex === 0 && completedSteps.length === 0}
              className="flex items-center gap-1 text-foreground"
            >
              <ArrowsClockwise size={14} />
              <span className="hidden sm:inline">Reset</span>
            </Button>
          </div>
          
          <div className="text-xs text-foreground flex-shrink-0">
            Step {currentStepIndex + 1} of {pattern.steps.length}
          </div>
        </div>
        
        {/* Progress bar */}
  <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Main content */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'overview' | 'steps' | 'architecture')}>
        <TabsList className="grid grid-cols-3 w-full rounded-none border-b bg-card">
          <TabsTrigger value="overview" className="flex items-center gap-1 text-foreground">
            <Brain size={14} /> Overview
          </TabsTrigger>
          <TabsTrigger value="steps" className="flex items-center gap-1 text-foreground">
            <GitBranch size={14} /> Design Steps
          </TabsTrigger>
          <TabsTrigger value="architecture" className="flex items-center gap-1 text-foreground">
            <Stack size={14} /> Architecture
          </TabsTrigger>
        </TabsList>
        
  <TabsContent value="overview" className="p-4 border-none bg-card">
          <div className="space-y-4">
            <Card className="bg-card border border-border">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-gray-100">{pattern.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-medium mb-1 text-gray-900 dark:text-gray-100">Overview</h4>
                  <p className="text-sm text-muted-foreground">{pattern.overview}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1 text-gray-900 dark:text-gray-100">Problem Statement</h4>
                  <p className="text-sm text-muted-foreground">{pattern.problemStatement}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1 text-gray-900 dark:text-gray-100">Solution Approach</h4>
                  <p className="text-sm text-muted-foreground">{pattern.solution}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
  <TabsContent value="steps" className="p-4 border-none bg-card">
          <div className="space-y-4">
            {/* Current step details */}
            <Card className="border-primary bg-card border border-border">
              <CardHeader>
                <div className="flex items-center gap-2">
                  {(() => {
                    const Icon = getCategoryIcon(currentStep.category);
                    return <Icon size={18} className="text-foreground" />;
                  })()}
                  <CardTitle className="text-lg text-foreground">{currentStep.title}</CardTitle>
                  <Badge className={getCategoryColor(currentStep.category)}>
                    {currentStep.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">Description</h4>
                  <p className="text-sm text-muted-foreground">{currentStep.description}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">Implementation Details</h4>
                  <p className="text-sm text-muted-foreground">{currentStep.details}</p>
                </div>
                
                {currentStep.considerations.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">Key Considerations</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {currentStep.considerations.map((consideration, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          {consideration}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {currentStep.bestPractices.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">Best Practices</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {currentStep.bestPractices.map((practice, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-green-600 dark:text-green-400">✓</span>
                          {practice}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {currentStep.examples && currentStep.examples.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">Examples</h4>
                    <div className="space-y-2">
                      {currentStep.examples.map((example, idx) => (
                        <div key={idx} className="bg-muted p-3 rounded text-sm font-mono border border-border text-foreground">
                          {example}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Step progress */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              {pattern.steps.map((step, idx) => {
                const Icon = getCategoryIcon(step.category);
                const isCompleted = completedSteps.includes(step.id);
                const isCurrent = idx === currentStepIndex;
                
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0.5 }}
                    animate={{ 
                      opacity: isCurrent ? 1 : isCompleted ? 0.8 : 0.5,
                      scale: isCurrent ? 1.02 : 1
                    }}
                    className={`p-3 rounded border text-sm transition-all duration-200 ${
                      isCurrent 
                        ? 'border-primary bg-primary/10 border-2' 
                        : isCompleted 
                          ? 'border-green-500/40 bg-green-500/10' 
                          : 'border-border bg-card'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon size={14} />
                      <span className="font-medium truncate text-foreground">{step.title}</span>
                      {isCompleted && <span className="text-green-600 dark:text-green-400">✓</span>}
                      {isCurrent && <span className="text-primary">→</span>}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </TabsContent>
        
  <TabsContent value="architecture" className="p-4 border-none bg-card">
          <div className="space-y-4">
            <Card className="bg-card border border-border">
              <CardHeader>
                <CardTitle className="text-foreground">System Architecture</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-3 text-foreground">Components</h4>
                    <div className="space-y-2">
                      {pattern.architecture.components.map((component, idx) => (
                        <div key={idx} className="p-3 rounded border border-border bg-card">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-foreground border-border">{component.type}</Badge>
                            <span className="font-medium text-foreground">{component.name}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {component.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3 text-foreground">Data Flows</h4>
                    <div className="space-y-2">
                      {pattern.architecture.flows.map((flow, idx) => (
                        <div key={idx} className="p-3 rounded border border-border bg-card">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-foreground">{flow.from}</span>
                            <ArrowRight size={14} className="text-muted-foreground" />
                            <span className="text-sm font-medium text-foreground">{flow.to}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {flow.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      {currentStepIndex === pattern.steps.length - 1 && (
        <Alert className="m-4 bg-green-500/10 border-green-500/40">
          <AlertDescription className="text-green-700 dark:text-green-300">
            System design exploration complete! You can restart to review the pattern again.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default SystemDesignVisualizer;
