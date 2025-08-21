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
import { DotsThree } from '@phosphor-icons/react/dist/ssr/DotsThree';
import { ScrollArea } from '@/components/ui/scroll-area'
import { setupResizeObserverErrorHandling } from './lib/utils/resizeObserverUtils';
import { setupReactFlowErrorHandling } from './lib/utils/reactFlowUtils';
import { disableResizeObserverIfProblematic } from './lib/utils/resizeObserverUtils';
import { setupGlobalFlowHandlers } from './lib/utils/flows/globalFlowHandlers';
import LadderIcon from './components/ui/LadderIcon';
import { Logo } from './components/ui/Logo';
import { SEO, pageSEOConfigs } from './components/seo/SEO';
import { SEORouteWrapper } from './components/seo/SEORouteWrapper';
import { QRCodeModal } from './components/ui/QRCodeModal';

// Lazy-loaded components
const ConceptsExplorer = lazy(() => import('./components/concepts/ConceptsExplorer'));
const PatternExplorer = lazy(() => import('./components/patterns/PatternExplorer'));
const AzureServicesOverview = lazy(() => import('./components/azure-services/AzureServicesOverview'));
const QuizSection = lazy(() => import('./components/quiz/QuizSection'));
const StudyMode = lazy(() => import('./components/study-mode/StudyMode'));
const TreeVisualizationPage = lazy(() => import('./components/pages/TreeVisualizationPage'));
const ReferencesSection = lazy(() => import('./components/references/ReferencesSection'));
const DeepDiveTaxonomyPage = lazy(() => import('./components/pages/DeepDiveTaxonomyPage'));
const CommunitySharing = lazy(() => import('./components/community/CommunitySharing'));
const AISkillsExplorer = lazy(() => import('./components/ai-skills/AISkillsExplorer'));
const SCLDemo = lazy(() => import('./components/SuperCriticalLearning/SCLDemo'));

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
import { EnlightenMeButton as AskAIFab } from './components/enlighten/EnlightenMeButton';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Placeholder component (disabled)
const AppTutorialButton = () => null;

function App() {
  const [mounted, setMounted] = useState(false)
  const [showJourneyMap, setShowJourneyMap] = useState(false)
  const location = useLocation()

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);
  
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
                    <NavigationMenuItem>
                      <div className="group relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open('https://www.youtube.com/playlist?list=PL9pA6bW_V_aBCC77nHbPgPJVUXqnLkZ2C', '_blank')}
                          className="inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          <img 
                            src="/images/youtube-podcast-qr.svg" 
                            alt="YouTube Podcast QR Code" 
                            className="w-6 h-6 mr-2 rounded-sm transition-all duration-300 group-hover:scale-[4] group-hover:z-50 group-hover:absolute group-hover:top-full group-hover:left-1/2 group-hover:transform group-hover:-translate-x-1/2 group-hover:mt-3 group-hover:bg-white group-hover:shadow-xl group-hover:border group-hover:rounded-sm"
                          />
                          <span className="hidden lg:inline">Podcast</span>
                        </Button>
                        {/* Clean instruction text that appears on hover */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-20 px-3 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-40">
                          Scan QR code or click to open playlist
                        </div>
                      </div>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>

            {/* Navigation tabs */}
            <div className="container mx-auto px-4 pb-1">
              {(() => {
                const allTabs = [
                  { to: '/', label: 'Core Concepts', icon: <LadderIcon size={16} /> },
                  { to: '/patterns', label: 'Agent Patterns', icon: <PuzzlePiece size={16} weight="duotone" /> },
                  { to: '/ai-skills', label: 'AI-Native Skills', icon: <Lightning size={16} weight="duotone" /> },
                  { to: '/azure-services', label: 'Azure Services', icon: <StackSimple size={16} weight="duotone" /> },
                  { to: '/tree-view', label: 'Tree View', icon: <Tree size={16} weight="duotone" /> },
                  { to: '/study-mode', label: 'Study Mode', icon: <GraduationCap size={16} weight="duotone" /> },
                  { to: '/quiz', label: 'Knowledge Quiz', icon: <LadderIcon size={16} /> },
                  { to: '/references', label: 'References', icon: <Books size={16} weight="duotone" /> },
                  { to: '/community', label: 'Community', icon: <Users size={16} weight="duotone" /> },
                ];
                const primaryMobileTabs = allTabs.slice(0, 3);
                const overflowMobileTabs = allTabs.slice(3);
                const isOverflowActive = overflowMobileTabs.some(t => location.pathname === t.to);

                return (
                  <>
                    {/* Desktop / md+ — keep full scrollable tabs */}
                    <div className="hidden md:block">
                      <ScrollArea className="w-full">
                        <div className="flex space-x-4">
                          {allTabs.map(t => (
                            <TabLink key={t.to} to={t.to} icon={t.icon} label={t.label} />
                          ))}
                        </div>
                      </ScrollArea>
                    </div>

                    {/* Mobile — show first few and a More (… ) menu */}
                    <div className="md:hidden">
                      <div className="flex items-center space-x-2">
                        {primaryMobileTabs.map(t => (
                          <TabLink key={t.to} to={t.to} icon={t.icon} label={t.label} />
                        ))}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant={isOverflowActive ? 'secondary' : 'ghost'}
                              size="default"
                              className="h-10 px-3"
                              aria-label="More tabs"
                            >
                              <DotsThree size={20} weight="bold" />
                              <span className="sr-only">More</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="min-w-[12rem]">
                            {overflowMobileTabs.map(t => (
                              <DropdownMenuItem key={t.to} asChild>
                                <Link to={t.to} className="flex items-center gap-2">
                                  {t.icon}
                                  <span>{t.label}</span>
                                </Link>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </>
                );
              })()}
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
                  <Route path="/scl-demo" element={<SCLDemo />} />
                  <Route path="/references" element={<ReferencesSection />} />
                  <Route path="/deep-dive-taxonomy" element={<DeepDiveTaxonomyPage />} />
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
              <p>Open Agent School - Where AI Concepts Come to Life</p>
              <p className="text-xs mt-1 opacity-75">Progressive learning • Prove your understanding through intelligent dialogue</p>
            </div>
          </footer>
          
          {/* Learning Journey Map */}
          <LearningJourneyMap
            currentPage={getCurrentPage()}
            isVisible={showJourneyMap}
            onClose={() => setShowJourneyMap(false)}
            onNavigate={handleNavigate}
          />

          {/* Global Ask AI FAB - bottom-right (only on learning pages) */}
          {(() => {
            const path = location.pathname;
            const enabled = path === '/' ||
                            path.startsWith('/concepts') ||
                            path.startsWith('/patterns') ||
                            path.startsWith('/ai-skills') ||
                            path.startsWith('/azure-services');
            if (!enabled) return null;

            const title = path.startsWith('/patterns')
              ? 'Agent Patterns'
              : path.startsWith('/ai-skills')
              ? 'AI-Native Skills'
              : path.startsWith('/azure-services')
              ? 'Azure Services'
              : 'Core Concepts';

            // Try exact path first, then fall back to base path for sections
            let desc = pageSEOConfigs[path as keyof typeof pageSEOConfigs]?.description;
            if (!desc) {
              if (path.startsWith('/patterns')) {
                desc = pageSEOConfigs['/patterns']?.description;
              } else if (path.startsWith('/ai-skills')) {
                desc = pageSEOConfigs['/ai-skills']?.description;
              } else if (path.startsWith('/azure-services')) {
                desc = pageSEOConfigs['/azure-services']?.description;
              } else if (path.startsWith('/concepts')) {
                desc = pageSEOConfigs['/concepts']?.description;
              }
            }

            return (
              <AskAIFab
                title={title}
                description={desc}
                mode="fixed"
                position="bottom-right"
              />
            );
          })()}

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
