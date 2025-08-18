import { useState, useEffect, Suspense, lazy } from 'react'
import { useParams } from 'react-router-dom'
import { agentPatterns } from '@/lib/data/patterns/index'
import PatternDetails from './PatternDetails'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChartLine, Code, Info, Swap, Question } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { PatternSidebar } from './PatternSidebar'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { CriticalThinkingModal } from '@/components/common/CriticalThinkingModal'
import { useSidebarCollapse } from '@/hooks/use-sidebar-collapse'
import { getPatternCue } from '@/lib/data/patternCues'
import { cn } from '@/lib/utils'
import AudioNarrationControls from '@/components/audio/AudioNarrationControls';
import ReActAudioControls from '@/components/audio/ReActAudioControls';
import ModernToolUseAudioControls from '@/components/audio/ModernToolUseAudioControls';
import PromptChainingAudioControls from '@/components/audio/PromptChainingAudioControls';
import AgenticRAGAudioControls from '@/components/audio/AgenticRAGAudioControls';

// Lazy load heavy visualization components
const SimplePatternVisualizer = lazy(() => import('@/components/visualization/SimplePatternVisualizer'))
const CodePlaybook = lazy(() => import('@/components/code-playbook/CodePlaybook'))
const SimpleMultiPatternVisualizer = lazy(() => import('./SimpleMultiPatternVisualizer'))
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DotsThree } from '@phosphor-icons/react/dist/ssr/DotsThree'
import { ArrowsOutSimple } from '@phosphor-icons/react/dist/ssr/ArrowsOutSimple'
import { X } from '@phosphor-icons/react/dist/ssr/X'

// Loading component for lazy-loaded visualizations
const VisualizationLoader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const PatternExplorer = () => {
  const { patternId } = useParams();
  
  // Find initial pattern based on URL parameter
  const getInitialPattern = () => {
    if (patternId) {
      const foundPattern = agentPatterns.find(pattern => pattern.id === patternId);
      return foundPattern || agentPatterns[0] || null;
    }
    return agentPatterns[0] || null;
  };
  
  const [selectedPattern, setSelectedPattern] = useState(getInitialPattern());
  const [viewMode, setViewMode] = useState<'single' | 'compare'>('single');
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('flow-diagram'); // Track the active tab
  const { isCollapsed } = useSidebarCollapse(); // Get sidebar collapse state
  const [forceUpdate, setForceUpdate] = useState(0); // Force re-render when needed
  const [isFullscreenVis, setIsFullscreenVis] = useState(false); // Mobile fullscreen for visualization
  
  // Update selected pattern when URL parameter changes
  useEffect(() => {
    if (patternId) {
      const foundPattern = agentPatterns.find(pattern => pattern.id === patternId);
      if (foundPattern) {
        setSelectedPattern(foundPattern);
      }
    }
  }, [patternId]);
  
  // Edge browser-optimized layout adjustment when sidebar state changes
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let stabilizationTimer: ReturnType<typeof setTimeout>;
    
    // Edge browser-optimized layout stabilization for PatternExplorer
    const stabilizeLayout = () => {
      // Add temporary CSS to prevent layout jumping during transitions
      const bodyElement = document.body;
      const htmlElement = document.documentElement;
      
      // Temporarily stabilize layout during sidebar transitions
      bodyElement.style.setProperty('overflow-anchor', 'none');
      htmlElement.style.setProperty('overflow-anchor', 'none');
      
      // Force layout update for responsive components
      setForceUpdate(prev => prev + 1);
      
      // Remove stabilization after transition completes
      stabilizationTimer = setTimeout(() => {
        bodyElement.style.removeProperty('overflow-anchor');
        htmlElement.style.removeProperty('overflow-anchor');
        
        // Dispatch a gentle layout update after stabilization
        window.dispatchEvent(new CustomEvent('layout-stabilized', { 
          detail: { source: 'sidebar-toggle-patterns', timestamp: Date.now() } 
        }));
      }, 300);
    };
    
    // Delay the stabilization to allow initial transition to start
    timer = setTimeout(stabilizeLayout, 50);

    return () => {
      clearTimeout(timer);
      clearTimeout(stabilizationTimer);
      // Clean up any remaining overflow-anchor styles
      document.body.style.removeProperty('overflow-anchor');
      document.documentElement.style.removeProperty('overflow-anchor');
    };
  }, [isCollapsed]);

  // Ensure agentPatterns is loaded with the new patterns
  useEffect(() => {
    // Force a re-render if patterns were updated
    if (agentPatterns.length > 2) {
      console.log("Loaded " + agentPatterns.length + " agent patterns");
    }
    
    // Debug: Log pattern data structure
    console.log("Agent patterns data:", agentPatterns);
    if (agentPatterns.length > 0) {
      console.log("First pattern structure:", agentPatterns[0]);
    }
  }, []);
  
  const handlePatternSelect = (patternId: string) => {
    const pattern = agentPatterns.find(p => p.id === patternId);
    if (pattern) {
      setSelectedPattern(pattern);
      // Force a layout update after pattern selection to ensure width adjusts properly
      setTimeout(() => {
        setForceUpdate(prev => prev + 1);
      }, 200); // Slightly longer than the sidebar auto-collapse delay
    }
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
    <div className="space-y-6 layout-stable scrollbar-stable">
      <div className="flex justify-between items-start mb-4 gap-4">
        {/* Left side: Audio Controls */}
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
        
        {/* Right side: Action Buttons */}
        <div className="flex items-center gap-2">
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
            Critical Thinking Challenge
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

      {viewMode === 'single' ? (
        <div className="flex relative">
          {/* Sidebar */}
          {selectedPattern ? (
            <>
              <div className="hidden md:block">
                <PatternSidebar 
                  activePatternId={selectedPattern.id} 
                  onPatternSelect={handlePatternSelect}
                />
              </div>
              
              {/* Mobile Pattern Selector (compact dropdown) */}
              <div className="md:hidden mb-3 w-full flex items-center justify-between gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <DotsThree size={18} weight="bold" />
                      <span className="text-sm">Patterns</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="min-w-[14rem] max-h-[60vh] overflow-y-auto">
                    {agentPatterns.map((pattern) => (
                      <DropdownMenuItem key={pattern.id} onSelect={() => setSelectedPattern(pattern)}>
                        <span className="truncate">{pattern.name}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Fullscreen visualizer trigger (mobile only, visible on flow tab) */}
                {activeTab === 'flow-diagram' && (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="md:hidden"
                    onClick={() => setIsFullscreenVis(true)}
                    aria-label="Open visualization fullscreen"
                  >
                    <ArrowsOutSimple size={18} />
                    <span className="ml-1">Fullscreen</span>
                  </Button>
                )}
              </div>
              
              {/* Main Content Area */}
              <div 
                key={forceUpdate} // Force re-render when layout should update
                className={cn(
                  "flex-1 pattern-content-area layout-stable",
                  // Edge browser scrollbar stability during transitions
                  "will-change-auto overflow-anchor-none transition-all duration-300 ease-in-out",
                  // Responsive padding based on sidebar state
                  isCollapsed 
                    ? "md:pl-[70px]" // Collapsed sidebar width + some padding
                    : "md:pl-[260px]" // Full sidebar width + padding
                )}
                style={{
                  // Force layout recalculation to ensure proper width
                  transform: `translateZ(0)`,
                }}
              >
                <Tabs defaultValue="flow-diagram" className="w-full scrollbar-stable" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3 layout-stable" data-tab-list>
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
                    {/* Ensure a good mobile height and remove page padding on small screens */}
                    <div className="flow-container" data-flow>
                      <div className="h-[60vh] md:h-[70vh] -mx-4 md:mx-0">
                      <ErrorBoundary>
                        <Suspense fallback={<VisualizationLoader />}>
                          <SimplePatternVisualizer patternData={selectedPattern} />
                        </Suspense>
                      </ErrorBoundary>
                      </div>
                    </div>
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
            </>
          ) : (
            <div className="w-full p-8 text-center border border-dashed rounded-lg">
              <p className="text-muted-foreground">No patterns available to display</p>
            </div>
          )}
        </div>
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

// Fullscreen overlay for visualization on mobile is rendered inline in the component above when triggered.
