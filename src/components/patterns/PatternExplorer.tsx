import { useState, useEffect, Suspense, lazy } from 'react'
import { agentPatterns } from '@/lib/data/patterns/index'
import PatternDetails from './PatternDetails'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChartLine, Code, Info, Swap } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { PatternSidebar } from './PatternSidebar'
import { EnhancedTutorialButton, pagesSynopsis } from '../tutorial/EnhancedTutorialButton'
import { useTutorialContext } from '../tutorial/TutorialProvider'
import { agentPatternsTutorial } from '@/lib/tutorial'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { CriticalThinkingModal } from '@/components/common/CriticalThinkingModal'
import { useSidebarCollapse } from '@/hooks/use-sidebar-collapse'
import { cn } from '@/lib/utils'

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
  const [selectedPattern, setSelectedPattern] = useState(agentPatterns[0] || null);
  const [viewMode, setViewMode] = useState<'single' | 'compare'>('single');
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('visualization'); // Track the active tab
  const { isCollapsed } = useSidebarCollapse(); // Get sidebar collapse state
  const [forceUpdate, setForceUpdate] = useState(0); // Force re-render when needed

  const { startTutorial, registerTutorial, hasCompletedTutorial } = useTutorialContext();
  
  // Register the agent patterns tutorial
  useEffect(() => {
    registerTutorial(agentPatternsTutorial.id, agentPatternsTutorial);
  }, [registerTutorial]);
  
  // Force layout update when sidebar state changes
  useEffect(() => {
    // Add a small delay to ensure smooth transition
    const timeoutId = setTimeout(() => {
      setForceUpdate(prev => prev + 1);
      // Trigger resize event to force any responsive components to recalculate
      window.dispatchEvent(new Event('resize'));
      
      // Debug: Log the current state
      console.log('PatternExplorer layout update:', { 
        isCollapsed, 
        forceUpdate, 
        timestamp: new Date().toISOString() 
      });
    }, 350); // Wait for transition to complete

    return () => clearTimeout(timeoutId);
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

    if (activeTab === 'business-use-case') {
      return `How would you apply the ${selectedPattern.name} pattern to solve a real-world business problem?`;
    }

    return `How does the ${selectedPattern.name} pattern address challenges in AI agent design?`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Agent Patterns</h2>
        <div className="flex items-center gap-2">
          <EnhancedTutorialButton
            hasCompleted={hasCompletedTutorial(agentPatternsTutorial.id)}
            onClick={() => startTutorial(agentPatternsTutorial.id)}
            tooltip="Learn about Agent Patterns"
            pageSynopsis={pagesSynopsis['agent-patterns']}
            showDetailedView={true}
          />
          
          <Button 
            variant="outline" 
            onClick={toggleViewMode}
            className="flex items-center gap-2"
          >
            <Swap size={16} />
            {viewMode === 'single' ? 'Compare Patterns' : 'Single Pattern View'}
          </Button>

          <Button
            variant="outline"
            onClick={() => setModalOpen(true)}
          >
            Critical Thinking Challenge
          </Button>
        </div>
      </div>
      
      <CriticalThinkingModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        question={getCriticalThinkingQuestion()}
        contextTitle={selectedPattern ? selectedPattern.name : "Agent Patterns"}
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
              
              {/* Mobile Pattern Selector */}
              <Card className="md:hidden mb-4 w-full">
                <CardHeader className="py-3">
                  <h3 className="text-sm font-medium">Select Pattern</h3>
                </CardHeader>
                <CardContent className="py-2">
                  <ScrollArea className="h-[150px]">
                    <div className="space-y-2">
                      {agentPatterns.map((pattern) => (
                        <div
                          key={pattern.id}
                          className={`p-2 rounded-md cursor-pointer transition-colors ${
                            selectedPattern.id === pattern.id
                              ? 'bg-primary/10 border-l-2 border-primary'
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => setSelectedPattern(pattern)}
                        >
                          <h3 className="text-sm font-medium">{pattern.name}</h3>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
              
              {/* Main Content Area */}
              <div 
                key={forceUpdate} // Force re-render when layout should update
                className={cn(
                  "flex-1 pattern-content-area",
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
                <Tabs defaultValue="visualization" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3" data-tab-list>
                    <TabsTrigger value="visualization" className="flex items-center gap-2" data-tab="visualization">
                      <ChartLine size={16} /> Visualization
                    </TabsTrigger>
                    <TabsTrigger value="details" className="flex items-center gap-2" data-tab="details">
                      <Info size={16} /> Educational Content
                    </TabsTrigger>
                    <TabsTrigger value="implementation" className="flex items-center gap-2" data-tab="implementation">
                      <Code size={16} /> Implementation
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="visualization">
                    <div className="flow-container" data-flow>
                      <ErrorBoundary>
                        <Suspense fallback={<VisualizationLoader />}>
                          <SimplePatternVisualizer patternData={selectedPattern} />
                        </Suspense>
                      </ErrorBoundary>
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
    </div>
  )
}

export default PatternExplorer
