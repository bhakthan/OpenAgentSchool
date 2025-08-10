import React, { useState, useEffect, Suspense, lazy } from 'react'
import { Outlet, Route, Routes, Link, useLocation, Navigate } from 'react-router-dom'
import { ThemeProvider } from './components/theme/ThemeProvider'
import { ThemeToggle } from './components/theme/ThemeToggle'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/button'
import { Code } from '@phosphor-icons/react/dist/ssr/Code';
import { Books } from '@phosphor-icons/react/dist/ssr/Books';
import { PuzzlePiece } from '@phosphor-icons/react/dist/ssr/PuzzlePiece';
import { Plugs } from '@phosphor-icons/react/dist/ssr/Plugs';
import { StackSimple } from '@phosphor-icons/react/dist/ssr/StackSimple';
import { Article } from '@phosphor-icons/react/dist/ssr/Article';
import { Users } from '@phosphor-icons/react/dist/ssr/Users';
import { GithubLogo } from '@phosphor-icons/react/dist/ssr/GithubLogo';
import { Path } from '@phosphor-icons/react/dist/ssr/Path';
import { GraduationCap } from '@phosphor-icons/react/dist/ssr/GraduationCap';
import { Tree } from '@phosphor-icons/react/dist/ssr/Tree';
import { Lightning } from '@phosphor-icons/react/dist/ssr/Lightning';
import { ScrollArea } from '@/components/ui/scroll-area'
import { setupResizeObserverErrorHandling } from './lib/utils/resizeObserverUtils';
import { setupReactFlowErrorHandling } from './lib/utils/reactFlowUtils';
import { disableResizeObserverIfProblematic } from './lib/utils/resizeObserverUtils';
import { setupGlobalFlowHandlers } from './lib/utils/flows/globalFlowHandlers';
import LadderIcon from './components/ui/LadderIcon';
import { Logo } from './components/ui/Logo';
import { SEO, pageSEOConfigs } from './components/seo/SEO';
import { SEORouteWrapper } from './components/seo/SEORouteWrapper';

// Lazy load major components for better code splitting
const PatternExplorer = lazy(() => import('./components/patterns/PatternExplorer'))
const ConceptsExplorer = lazy(() => import('./components/concepts/ConceptsExplorer'))
const AzureServicesOverview = lazy(() => import('./components/azure-services/AzureServicesOverview'))
const CommunitySharing = lazy(() => import('./components/community/CommunitySharing'))
const ReferenceSection = lazy(() => import('./components/references/ReferenceSection'))
const ReferencesSection = lazy(() => import('./components/references/ReferencesSection'))
const QuizSection = lazy(() => import('./components/quiz/QuizSection'))
const TreeVisualizationPage = lazy(() => import('./components/pages/TreeVisualizationPage'))
const StudyMode = lazy(() => import('./components/study-mode/StudyMode'))
const AISkillsExplorer = lazy(() => import('./components/ai-skills/AISkillsExplorer'))

// Loading component for lazy-loaded routes
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);
import { setupSimulationButtonHandlers } from './lib/utils/flows/visualizationFix';
import LearningJourneyMap from './components/tutorial/LearningJourneyMap';
import { EnlightenMeProvider } from './components/enlighten/EnlightenMeProvider';
import { Toaster } from '@/components/ui/toaster';
import { AudioNarrationProvider } from './contexts/AudioNarrationContext';

// Placeholder component (disabled)
const AppTutorialButton = () => null;

function App() {
  const [mounted, setMounted] = useState(false)
  const [showJourneyMap, setShowJourneyMap] = useState(false)
  const location = useLocation()
  
    // Get current page for journey map
  const getCurrentPage = () => {
    switch (location.pathname) {
      case '/': return 'core-concepts';
      case '/ai-skills': return 'ai-skills';
      case '/study-mode': return 'study-mode';
      case '/patterns': return 'agent-patterns';
      case '/azure-services': return 'azure-services';
      case '/references': return 'references';
      case '/community': return 'community';
      case '/quiz': return 'quiz';
      default: return 'core-concepts';
    }
  };

  const handleNavigate = (path: string) => {
    setShowJourneyMap(false);
    // Navigate to the path
    window.location.href = path;
  };
  
  // Fix hydration issues and set up error handling
  useEffect(() => {
    setMounted(true)
    
    // Apply global ReactFlow optimizations
    import('./lib/utils/preventResizeObserverErrors').then(module => {
      module.applyReactFlowGlobalOptimizations();
    });
    
    // Set up global ResizeObserver error handling with improved prevention
    setupResizeObserverErrorHandling();
    
    // Set up specific handling for ReactFlow components
    setupReactFlowErrorHandling();
    
    // Set up global flow handlers for fitView and other ReactFlow operations
    const flowHandlers = setupGlobalFlowHandlers();
    
    // Setup handlers for simulation buttons to fix ReactFlow visibility
    setupSimulationButtonHandlers();
    
    // Advanced error handler with improved blocking of ResizeObserver errors
    const handleError = (event: ErrorEvent) => {
      if (event.message && (
        event.message.includes('ResizeObserver') ||
        event.message.includes('loop') ||
        event.message.includes('undelivered notifications')
      )) {
        // Prevent the error from propagating
        event.preventDefault();
        event.stopPropagation();
        
        // Apply emergency fixes to problematic ResizeObservers with adaptive approach
        disableResizeObserverIfProblematic();
        return false;
      }
    };
    window.addEventListener('error', handleError, true); // Use capture phase
    
    // Improved throttled resize event firing with RAF
    const debouncedDispatch = (eventName: string) => {
      let timer: ReturnType<typeof setTimeout> | null = null;
      let frameId: number | null = null;
      
      return () => {
        if (timer) clearTimeout(timer);
        if (frameId) cancelAnimationFrame(frameId);
        
        timer = setTimeout(() => {
          frameId = requestAnimationFrame(() => {
            window.dispatchEvent(new Event(eventName));
            frameId = null;
          });
        }, 150); // Increased debounce for better stability
      };
    };
    
    // Create debounced event dispatchers
    const dispatchLayoutUpdate = debouncedDispatch('layout-update');
    const dispatchContentResize = debouncedDispatch('content-resize');
    
    // Listen for ResizeObserver errors with enhanced prevention
    window.addEventListener('error', (e) => {
      if (e.message?.includes('ResizeObserver') || 
          e.message?.includes('undelivered notifications') ||
          e.message?.includes('exceeded')) {
        e.preventDefault();
        e.stopPropagation();
        
        // Track error and apply progressive fixes
        if (!(window as any).__resizeRecoveryInProgress) {
          (window as any).__resizeRecoveryInProgress = true;
          
          // Force recalculation of layout after a small delay
          setTimeout(() => {
            try {
              dispatchLayoutUpdate();
              // Apply stabilization to problematic elements
              document.querySelectorAll('.react-flow').forEach(el => {
                if (el instanceof HTMLElement) {
                  el.style.transform = 'translateZ(0)';
                }
              });
            } finally {
              setTimeout(() => {
                (window as any).__resizeRecoveryInProgress = false;
              }, 2000);
            }
          }, 250);
        }
        return false;
      }
    }, true);
    
    // Enhanced monitoring for layout shifts that might cause ResizeObserver errors
    const layoutShiftObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const value = (entry as any).value;
        if (value > 0.05) { // Only trigger for significant shifts
          // Use RAF for smoother handling
          requestAnimationFrame(() => {
            dispatchLayoutUpdate();
          });
          break;
        }
      }
    });
    
    // Try to observe layout shifts with better error handling
    try {
      layoutShiftObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      // Silently handle unsupported observer
    }
    
    return () => {
      // Clean up event listeners
      window.removeEventListener('error', handleError, true);
      
      // Clean up flow handlers if available
      if (flowHandlers && typeof flowHandlers.cleanup === 'function') {
        flowHandlers.cleanup();
      }
      
      try {
        layoutShiftObserver.disconnect();
      } catch (e) {
        // Silently handle cleanup errors
      }
    };
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="azure-ai-agent-theme">
      <AudioNarrationProvider>
        <EnlightenMeProvider>
          <div className="min-h-screen bg-background text-foreground flex flex-col">
          <header className="border-b border-border sticky top-0 z-10 bg-background">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Logo size="small" showText={true} />
              </div>
              
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowJourneyMap(true)}
                  className="flex items-center gap-2"
                >
                  <Path size={16} />
                  <span className="hidden sm:inline">Journey Map</span>
                </Button>
                <AppTutorialButton />
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <span className="text-xs text-muted-foreground hidden md:inline-block">Theme</span>
                </div>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-transparent">Resources</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                          <ListItem href="https://agentcommunicationprotocol.dev/" title="Agent Communication Protocol">
                            Open protocol for agent interoperability
                          </ListItem>
                          <ListItem href="https://modelcontextprotocol.io/" title="Model Context Protocol">
                            Protocol for efficient AI model interaction
                          </ListItem>
                          <ListItem href="https://cookbook.openai.com/" title="OpenAI Cookbook">
                            Code examples and guides for OpenAI APIs
                          </ListItem>
                          <ListItem href="https://learn.microsoft.com/azure/ai-services/" title="Azure AI Services">
                            Documentation for Azure AI Services
                          </ListItem>
                          <ListItem href="https://learn.microsoft.com/azure/machine-learning/" title="Azure AI Platform">
                            Microsoft's comprehensive AI platform
                          </ListItem>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <a
                        href="https://github.com/bhakthan/openagentschool"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <GithubLogo className="mr-1" size={16} /> GitHub Repo
                      </a>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>

            {/* Navigation tabs */}
            <div className="container mx-auto px-4 pb-1">
              <ScrollArea className="w-full">
                <div className="flex space-x-4">
                  <TabLink to="/" icon={<LadderIcon size={16} />} label="Core Concepts" />
                  <TabLink to="/patterns" icon={<PuzzlePiece size={16} weight="duotone" />} label="Agent Patterns" />
                  <TabLink to="/ai-skills" icon={<Lightning size={16} weight="duotone" />} label="AI-Native Skills" />
                  <TabLink to="/azure-services" icon={<StackSimple size={16} weight="duotone" />} label="Azure Services" />
                  <TabLink to="/tree-view" icon={<Tree size={16} weight="duotone" />} label="Tree View" />
                  <TabLink to="/study-mode" icon={<GraduationCap size={16} weight="duotone" />} label="Study Mode" />
                  <TabLink to="/quiz" icon={<LadderIcon size={16} />} label="Knowledge Quiz" />
                  <TabLink to="/references" icon={<Books size={16} weight="duotone" />} label="References" />
                  <TabLink to="/community" icon={<Users size={16} weight="duotone" />} label="Community" />
                </div>
              </ScrollArea>
            </div>
          </header>
          
          <main className="flex-1 container mx-auto px-4 py-6">
            <Suspense fallback={<LoadingSpinner />}>
              <SEORouteWrapper>
                <Routes>
                  <Route path="/" element={<ConceptsExplorer />} />
                  <Route path="/concepts/:conceptId?" element={<ConceptsExplorer />} />
                  <Route path="/ai-skills" element={<AISkillsExplorer />} />
                  <Route path="/study-mode" element={<StudyMode />} />
                  <Route path="/patterns/:patternId?" element={<PatternExplorer />} />
                  <Route path="/azure-services/:serviceId?" element={<AzureServicesOverview />} />
                  <Route path="/quiz/:quizId?" element={<QuizSection />} />
                  <Route path="/tree-view" element={<TreeVisualizationPage />} />
                  <Route path="/references" element={<ReferencesSection />} />
                  <Route path="/community" element={<CommunitySharing />} />
                  {/* Fallback route to redirect to home page */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </SEORouteWrapper>
            </Suspense>
            <Outlet />
          </main>
          
          <footer className="border-t border-border py-6 bg-muted transition-colors duration-300">
            <div className="container mx-auto px-4 text-center text-muted-foreground">
              <p>Open Agent School - Where AI Agent Concepts Come to Life</p>
            </div>
          </footer>
          
          {/* Learning Journey Map */}
          <LearningJourneyMap
            currentPage={getCurrentPage()}
            isVisible={showJourneyMap}
            onClose={() => setShowJourneyMap(false)}
            onNavigate={handleNavigate}
          />

          {/* Toast notifications */}
          <Toaster />
        </div>
      </EnlightenMeProvider>
      </AudioNarrationProvider>
    </ThemeProvider>
  );
}

const TabLink = React.memo(function TabLink({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Button
      asChild
      variant={isActive ? "default" : "ghost"}
      size="default"
      className="h-10 px-4"
    >
      <Link to={to} className="flex items-center gap-1">
        {icon}
        <span className="text-base">{label}</span>
      </Link>
    </Button>
  );
});

const ListItem = React.memo(function ListItem({ className, title, children, ...props }: React.ComponentPropsWithoutRef<"a"> & { title: string }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
});

export default App
