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
  switch (category) {
    case 'prompt': return 'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300';
    case 'context': return 'bg-purple-100 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-300';
    case 'knowledge': return 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300';
    case 'evaluation': return 'bg-orange-100 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-300';
    case 'architecture': return 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300';
    case 'tools': return 'bg-cyan-100 dark:bg-cyan-900/30 border-cyan-200 dark:border-cyan-800 text-cyan-800 dark:text-cyan-300';
    case 'instruction': return 'bg-amber-100 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300';
    default: return 'bg-gray-100 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-300';
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
    <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden w-full bg-white dark:bg-gray-900">
      {/* Header and controls */}
      <div className="bg-gray-50 dark:bg-gray-800 p-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Stack size={18} />
            <h3 className="font-medium truncate text-gray-900 dark:text-gray-100">{title}</h3>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs text-gray-900 dark:text-gray-100">Speed:</span>
            <Slider
              value={[speed]}
              min={0.5}
              max={3}
              step={0.5}
              onValueChange={(values) => setSpeed(values[0])}
              className="w-20 sm:w-32"
            />
            <Badge variant="outline" className="text-xs text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600">
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
              className="flex items-center gap-1 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              {isPlaying ? 'Pause' : 'Explore'}
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={nextStep}
              disabled={isPlaying || currentStepIndex >= pattern.steps.length - 1}
              className="flex items-center gap-1 text-gray-900 dark:text-gray-100"
            >
              <ArrowRight size={14} />
              <span className="hidden sm:inline">Next</span>
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={resetDesign}
              disabled={currentStepIndex === 0 && completedSteps.length === 0}
              className="flex items-center gap-1 text-gray-900 dark:text-gray-100"
            >
              <ArrowsClockwise size={14} />
              <span className="hidden sm:inline">Reset</span>
            </Button>
          </div>
          
          <div className="text-xs text-gray-900 dark:text-gray-100 flex-shrink-0">
            Step {currentStepIndex + 1} of {pattern.steps.length}
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-3 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
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
        <TabsList className="grid grid-cols-3 w-full rounded-none border-b bg-white dark:bg-gray-800">
          <TabsTrigger value="overview" className="flex items-center gap-1 text-gray-900 dark:text-gray-100">
            <Brain size={14} /> Overview
          </TabsTrigger>
          <TabsTrigger value="steps" className="flex items-center gap-1 text-gray-900 dark:text-gray-100">
            <GitBranch size={14} /> Design Steps
          </TabsTrigger>
          <TabsTrigger value="architecture" className="flex items-center gap-1 text-gray-900 dark:text-gray-100">
            <Stack size={14} /> Architecture
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="p-4 border-none bg-white dark:bg-gray-900">
          <div className="space-y-4">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-gray-100">{pattern.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-medium mb-1 text-gray-900 dark:text-gray-100">Overview</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{pattern.overview}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1 text-gray-900 dark:text-gray-100">Problem Statement</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{pattern.problemStatement}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1 text-gray-900 dark:text-gray-100">Solution Approach</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{pattern.solution}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="steps" className="p-4 border-none bg-white dark:bg-gray-900">
          <div className="space-y-4">
            {/* Current step details */}
            <Card className="border-primary dark:border-primary/50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-center gap-2">
                  {(() => {
                    const Icon = getCategoryIcon(currentStep.category);
                    return <Icon size={18} className="text-gray-900 dark:text-gray-100" />;
                  })()}
                  <CardTitle className="text-lg text-gray-900 dark:text-gray-100">{currentStep.title}</CardTitle>
                  <Badge className={getCategoryColor(currentStep.category)}>
                    {currentStep.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">Description</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{currentStep.description}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">Implementation Details</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{currentStep.details}</p>
                </div>
                
                {currentStep.considerations.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">Key Considerations</h4>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
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
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
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
                        <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-sm font-mono border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
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
                        ? 'border-primary bg-blue-50 dark:bg-primary/10 border-2' 
                        : isCompleted 
                          ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20' 
                          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon size={14} />
                      <span className="font-medium truncate text-gray-900 dark:text-gray-100">{step.title}</span>
                      {isCompleted && <span className="text-green-600 dark:text-green-400">✓</span>}
                      {isCurrent && <span className="text-primary">→</span>}
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-2">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="architecture" className="p-4 border-none bg-white dark:bg-gray-900">
          <div className="space-y-4">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">System Architecture</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-3 text-gray-900 dark:text-gray-100">Components</h4>
                    <div className="space-y-2">
                      {pattern.architecture.components.map((component, idx) => (
                        <div key={idx} className="p-3 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600">{component.type}</Badge>
                            <span className="font-medium text-gray-900 dark:text-gray-100">{component.name}</span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {component.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3 text-gray-900 dark:text-gray-100">Data Flows</h4>
                    <div className="space-y-2">
                      {pattern.architecture.flows.map((flow, idx) => (
                        <div key={idx} className="p-3 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{flow.from}</span>
                            <ArrowRight size={14} className="text-gray-700 dark:text-gray-300" />
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{flow.to}</span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
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
        <Alert className="m-4 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <AlertDescription className="text-green-800 dark:text-green-300">
            System design exploration complete! You can restart to review the pattern again.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default SystemDesignVisualizer;
