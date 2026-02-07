import { useState, useEffect, Suspense, lazy } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { agentPatterns, PatternData } from '@/lib/data/patterns/index'
import PatternDetails from './PatternDetails'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChartLine, Code, Info, Swap, Question } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { TopPatternSelector } from './TopPatternSelector'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { CriticalThinkingModal } from '@/components/common/CriticalThinkingModal'
import { getPatternCue } from '@/lib/data/patternCues'
import AudioNarrationControls from '@/components/audio/AudioNarrationControls';
import ReActAudioControls from '@/components/audio/ReActAudioControls';
import ModernToolUseAudioControls from '@/components/audio/ModernToolUseAudioControls';
import PromptChainingAudioControls from '@/components/audio/PromptChainingAudioControls';
import AgenticRAGAudioControls from '@/components/audio/AgenticRAGAudioControls';
import { X } from '@phosphor-icons/react/dist/ssr/X'

// Lazy load heavy visualization components
const SimplePatternVisualizer = lazy(() => import('@/components/visualization/SimplePatternVisualizer'))
const CodePlaybook = lazy(() => import('@/components/code-playbook/CodePlaybook'))
const SimpleMultiPatternVisualizer = lazy(() => import('./SimpleMultiPatternVisualizer'))

// Loading component for lazy-loaded visualizations
const VisualizationLoader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const PatternExplorer = () => {
  const { patternId } = useParams();
  const [searchParams] = useSearchParams();
  
  // Get initial tab from URL parameter, default to 'flow-diagram'
  const getInitialTab = () => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['flow-diagram', 'details', 'implementation'].includes(tabParam)) {
      return tabParam;
    }
    return 'flow-diagram';
  };
  
  // Find initial pattern based on URL parameter, default to IgnitionStack Agent
  const getInitialPattern = () => {
    if (patternId) {
      const foundPattern = agentPatterns.find(pattern => pattern.id === patternId);
      return foundPattern || agentPatterns.find(p => p.id === 'ignition-stack') || agentPatterns[0] || null;
    }
    // Default to IgnitionStack Agent pattern
    return agentPatterns.find(p => p.id === 'ignition-stack') || agentPatterns[0] || null;
  };
  
  const [selectedPattern, setSelectedPattern] = useState(getInitialPattern());
  const [viewMode, setViewMode] = useState<'single' | 'compare'>('single');
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(getInitialTab());
  const [isFullscreenVis, setIsFullscreenVis] = useState(false);
  
  // Update selected pattern when URL parameter changes
  useEffect(() => {
    if (patternId) {
      const foundPattern = agentPatterns.find(pattern => pattern.id === patternId);
      if (foundPattern) {
        setSelectedPattern(foundPattern);
      }
    }
  }, [patternId]);

  // Ensure agentPatterns is loaded with the new patterns
  useEffect(() => {
    if (agentPatterns.length > 2) {
      console.log("Loaded " + agentPatterns.length + " agent patterns");
    }
    
    console.log("Agent patterns data:", agentPatterns);
    if (agentPatterns.length > 0) {
      console.log("First pattern structure:", agentPatterns[0]);
    }
  }, []);
  
  const handlePatternSelect = (pattern: PatternData) => {
    setSelectedPattern(pattern);
  };
  
  const toggleViewMode = () => {
    setViewMode(current => current === 'single' ? 'compare' : 'single');
  };
  
  // Determine the question based on the active tab and selected pattern
  const getCriticalThinkingQuestion = () => {
    if (!selectedPattern) return "What are the key challenges in designing agent patterns?";

    // Use centralized pattern cue for critical thinking question
    const patternCue = getPatternCue(selectedPattern.id);
    if (patternCue) {
      return patternCue.criticalThinkingQuestion;
    }

    // Fallback for patterns without defined cues
    if (activeTab === 'business-use-case') {
      return `How would you apply the ${selectedPattern.name} pattern to solve a real-world business problem?`;
    }

    return `How does the ${selectedPattern.name} pattern address challenges in AI agent design?`;
  };

  return (
    <div className="space-y-6 w-full">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {/* Left side: Audio Controls and Pattern Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 min-w-0 flex-1">
          {/* Audio Controls */}
          {selectedPattern && (
            <div className="flex-shrink-0">
              {selectedPattern.id === 'react-agent' ? (
                <ReActAudioControls 
                  componentName={selectedPattern.id}
                  className="react-audio-controls"
                  activeTab={activeTab}
                />
              ) : selectedPattern.id === 'modern-tool-use' ? (
                <ModernToolUseAudioControls 
                  componentName={selectedPattern.id}
                  className="modern-tool-use-audio-controls"
                  activeTab={activeTab}
                />
              ) : selectedPattern.id === 'prompt-chaining' ? (
                <PromptChainingAudioControls 
                  componentName={selectedPattern.id}
                  className="prompt-chaining-audio-controls"
                  activeTab={activeTab}
                />
              ) : selectedPattern.id === 'agentic-rag' ? (
                <AgenticRAGAudioControls 
                  componentName={selectedPattern.id}
                  className="agentic-rag-audio-controls"
                  activeTab={activeTab}
                />
              ) : (
                <AudioNarrationControls 
                  componentName={selectedPattern.id}
                  position="embedded"
                />
              )}
            </div>
          )}
          
          {/* Pattern Selector */}
          <div className="flex-1 min-w-0">
            <TopPatternSelector
              selectedPattern={selectedPattern}
              onPatternSelect={handlePatternSelect}
            />
          </div>
        </div>
        
        {/* Right side: Action Buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button 
            variant="outline" 
            onClick={toggleViewMode}
            className="flex items-center gap-2"
          >
            <Swap size={16} />
            {viewMode === 'single' ? 'Compare Patterns' : 'Single Pattern View'}
          </Button>

          <Button
            size="lg"
            onClick={() => setModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl flex items-center gap-2"
          >
            <Question size={20} weight="bold" />
            <span className="hidden sm:inline">Critical Thinking Challenge</span>
            <span className="sm:hidden">Challenge</span>
          </Button>
        </div>
      </div>
      
      <CriticalThinkingModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        question={getCriticalThinkingQuestion()}
        contextTitle={selectedPattern ? selectedPattern.name : "Agent Patterns"}
        contextCue={selectedPattern ? getPatternCue(selectedPattern.id)?.cue : undefined}
        conceptArea={selectedPattern?.name || "Agent Patterns"}
        source="agent-patterns"
        context={{
          difficulty: "intermediate",
          expectedApproaches: selectedPattern?.advantages ? selectedPattern.advantages.slice(0, 3) : undefined,
          keyConsiderations: selectedPattern?.limitations ? selectedPattern.limitations.slice(0, 3) : undefined,
          evaluationCriteria: [
            "Practical application understanding",
            "Recognition of pattern benefits and limitations", 
            "Creative problem-solving approach",
            "Real-world implementation considerations"
          ]
        }}
      />

      {/* Main Content Area - Full Width */}
      {viewMode === 'single' ? (
        selectedPattern ? (
          <div className="w-full">
            <Tabs value={activeTab} defaultValue="flow-diagram" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="flow-diagram" className="flex items-center gap-2" data-tab="flow-diagram">
                  <ChartLine size={16} /> Flow Diagram
                </TabsTrigger>
                <TabsTrigger value="details" className="flex items-center gap-2" data-tab="details">
                  <Info size={16} /> Pattern Guide
                </TabsTrigger>
                <TabsTrigger value="implementation" className="flex items-center gap-2" data-tab="implementation">
                  <Code size={16} /> Code & Practice
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="flow-diagram">
                {/* Flow visualization with scrollable content */}
                <div className="flow-container" data-flow>
                  <div className="min-h-[60vh] md:min-h-[50vh]">
                    <ErrorBoundary>
                      <Suspense fallback={<VisualizationLoader />}>
                        <SimplePatternVisualizer patternData={selectedPattern} />
                      </Suspense>
                    </ErrorBoundary>
                  </div>
                </div>

                {/* IgnitionStack Infographic */}
                {selectedPattern?.id === 'ignition-stack' && (
                  <div className="mt-6 rounded-xl border bg-muted/30 p-4">
                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <ChartLine size={16} /> IgnitionStack Agent — Full Pipeline Infographic
                    </h3>
                    <img
                      src="/images/Ignition_Stack_Ralph_Style_Agent.png"
                      alt="IgnitionStack Agent: end-to-end use-case-to-production pipeline — PRD intake, Azure Bicep IaC, AI Foundry agents, database schema, application scaffolding, and CI/CD deployment"
                      className="w-full rounded-lg shadow-sm border"
                      loading="lazy"
                    />
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      From use-case PRD to production deployment — the IgnitionStack Agent orchestrates infrastructure, agents, data, application code, and CI/CD in one pass
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="details">
                <ErrorBoundary>
                  <PatternDetails pattern={selectedPattern} />
                </ErrorBoundary>
              </TabsContent>
              
              <TabsContent value="implementation">
                <Suspense fallback={<VisualizationLoader />}>
                  <CodePlaybook patternData={selectedPattern} />
                </Suspense>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="w-full p-8 text-center border border-dashed rounded-lg">
            <p className="text-muted-foreground">No patterns available to display</p>
          </div>
        )
      ) : (
        <Tabs defaultValue="comparison">
          <TabsContent value="comparison">
            {selectedPattern ? (
              <Suspense fallback={<VisualizationLoader />}>
                <SimpleMultiPatternVisualizer initialPatterns={[selectedPattern.id]} />
              </Suspense>
            ) : (
              <div className="w-full p-8 text-center border border-dashed rounded-lg">
                <p className="text-muted-foreground">No patterns available to compare</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}

      {/* Fullscreen Visualization Overlay (mobile) */}
      {isFullscreenVis && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm md:hidden">
          <div className="absolute top-3 right-3">
            <Button variant="ghost" size="icon" onClick={() => setIsFullscreenVis(false)} aria-label="Close fullscreen">
              <X size={18} />
            </Button>
          </div>
          <div className="h-full w-full pt-10 px-2">
            <ErrorBoundary>
              <Suspense fallback={<VisualizationLoader />}>
                <SimplePatternVisualizer patternData={selectedPattern} />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      )}
    </div>
  )
}

export default PatternExplorer
