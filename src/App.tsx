import React, { useState, useEffect, Suspense, lazy } from 'react'
import { Outlet, Route, Routes, Link, useLocation, Navigate, useNavigate } from 'react-router-dom'
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
import { Compass } from '@phosphor-icons/react/dist/ssr/Compass';
import { Atom } from '@phosphor-icons/react/dist/ssr/Atom';
import { Sparkles as SparklesIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area'
import { setupResizeObserverErrorHandling } from './lib/utils/resizeObserverUtils';
import { setupReactFlowErrorHandling } from './lib/utils/reactFlowUtils';
import { disableResizeObserverIfProblematic } from './lib/utils/resizeObserverUtils';
import { setupGlobalFlowHandlers } from './lib/utils/flows/globalFlowHandlers';
import LadderIcon from './components/ui/LadderIcon';
import { Logo } from './components/ui/Logo';
import { SEO, pageSEOConfigs } from './components/seo/SEO';
import { trackEvent } from './lib/analytics/ga';
import { SEORouteWrapper } from './components/seo/SEORouteWrapper';
import { QRCodeModal } from './components/ui/QRCodeModal';
import { PageLoadingFallback } from './components/common/LoadingSpinner';
import { OfflineBanner } from './components/common/OfflineBanner';
import { QueryProvider } from './lib/query/QueryProvider';
import { AuthProvider } from './lib/auth/AuthContext';
import { UserMenu } from './components/auth/UserMenu';
import { InstallPWA } from './components/pwa/InstallPWA';
import { InstallAppMenuItem } from './components/pwa/InstallAppMenuItem';
import { useIOSBehaviors } from './hooks/useStandaloneMode';
import { usePullToRefresh, getPullToRefreshStyles } from './hooks/usePullToRefresh';
import { useQueryClient } from '@tanstack/react-query';
import { useStudyModeMigration } from './lib/hooks/useStudyModeMigration';
import { useBookmarksMigration } from './lib/hooks/useBookmarksMigration';

// Lazy-loaded components
const ConceptsExplorer = lazy(() => import('./components/concepts/ConceptsExplorer'));
const PatternExplorer = lazy(() => import('./components/patterns/PatternExplorer'));
const AzureServicesOverview = lazy(() => import('./components/azure-services/AzureServicesOverview'));
const QuizSection = lazy(() => import('./components/quiz/QuizSection'));
const StudyMode = lazy(() => import('./components/study-mode/StudyMode'));
const TreeVisualizationPage = lazy(() => import('./components/pages/TreeVisualizationPage'));
const ReferencesSection = lazy(() => import('./components/references/ReferencesSection'));
const DeepDiveTaxonomyPage = lazy(() => import('./components/pages/DeepDiveTaxonomyPage'));
const ApiDocsPage = lazy(() => import('./components/pages/ApiDocsPage'));
const CommunitySharing = lazy(() => import('./components/community/CommunitySharing'));
const AgentsConsole = lazy(() => import('./components/agents/AgentsConsole'));
const AISkillsExplorer = lazy(() => import('./components/ai-skills/AISkillsExplorer'));
const SCLDemo = lazy(() => import('./components/SuperCriticalLearning/SCLDemo'));
const KnowledgeSearch = lazy(() => import('./components/search/KnowledgeSearch'));
const KnowledgeBasePage = lazy(() => import('./pages/KnowledgeBasePage'));
const BookmarksPage = lazy(() => import('./pages/BookmarksPage'));
const AchievementsPage = lazy(() => import('./pages/AchievementsPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const OAuthCallbackPage = lazy(() => import('./pages/OAuthCallbackPage'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'));
const AgenticAdoptionPlaybook = lazy(() => import('./components/pages/AgenticAdoptionPlaybook'));
const ExecutiveAlignmentCharterForm = lazy(() => import('./components/adoption/ExecutiveAlignmentCharterForm'));
const PortfolioHeatmapCanvasForm = lazy(() => import('./components/adoption/PortfolioHeatmapCanvasForm'));
const BoardReadyBriefingPackForm = lazy(() => import('./components/adoption/BoardReadyBriefingPackForm'));
const AgentsForScience = lazy(() => import('./pages/AgentsForScience'));
const AIProductFrameworkPage = lazy(() => import('./pages/AIProductFrameworkPage'));
// Marketing CTA pages (use path alias to avoid Windows path edge resolution issues)
const CTALandingPage = lazy(() => import('@/components/pages/CTALandingPage'));
const CTALandingPageVariant = lazy(() => import('@/components/pages/CTALandingPageVariant'));
const AboutPage = lazy(() => import('@/components/pages/AboutPage'));
// Agent Velocity Engineering components
const VelocityScoreDashboard = lazy(() => import('./components/velocity/VelocityScoreDashboard'));
const PatternMasteryTracker = lazy(() => import('./components/velocity/PatternMasteryTracker'));
const VelocityCaseStudies = lazy(() => import('./components/velocity/VelocityCaseStudies'));
const AVEWorkshopCurriculum = lazy(() => import('./components/velocity/AVEWorkshopCurriculum'));
const ValueMapPage = lazy(() => import('./pages/ValueMapPage'));
import { setupSimulationButtonHandlers } from './lib/utils/flows/visualizationFix';
import LearningJourneyMap from './components/tutorial/LearningJourneyMap';
import { EnlightenMeProvider } from './components/enlighten/EnlightenMeProvider';
import { Toaster } from '@/components/ui/toaster';
import { AudioNarrationProvider } from './contexts/AudioNarrationContext';
import { EnlightenMeButton as AskAIFab } from './components/enlighten/EnlightenMeButton';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useGAPageViews } from './hooks/useGAPageViews';
// Micro CTA ribbon extracted for independent chunk
import { MicroCtaRibbon } from './components/marketing/MicroCtaRibbon';
import { useCTAVariantAssigner } from '@/components/marketing/useABAssignment';
import { useAnalyticsCustomEventBridge } from '@/lib/analytics/customEventsBridge';

// Placeholder component (disabled)
const AppTutorialButton = () => null;

/**
 * Inner component that requires AuthProvider context
 * This component uses hooks that depend on AuthContext
 */
function AppContent() {
  // Sync localStorage Study Mode sessions to backend on login
  // This hook uses useAuth() so must be inside AuthProvider
  useStudyModeMigration();
  
  // Sync localStorage bookmarks to backend on login
  useBookmarksMigration();
  
  return null; // Just handles side effects
}

function App() {
  const [mounted, setMounted] = useState(false)
  const [showJourneyMap, setShowJourneyMap] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  
  // Initialize CTA variant assignment (redirect if needed before heavy renders)
  useCTAVariantAssigner();
  useAnalyticsCustomEventBridge();
  
  // iOS-specific behaviors (viewport fixes, bounce prevention)
  useIOSBehaviors();
  
  // Pull-to-refresh for mobile (only on main content pages)
  const isContentPage = ['/', '/concepts', '/patterns', '/ai-skills'].includes(location.pathname);
  const { isPulling, pullDistance, pullProgress } = usePullToRefresh({
    onRefresh: async () => {
      // Invalidate all queries to refetch data
      await queryClient.invalidateQueries();
    },
    enabled: isContentPage,
    threshold: 80,
  });

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
    
    // Initialize IndexedDB for offline support
    import('@/lib/db').then(({ initializeDB }) => {
      initializeDB().catch(error => {
        console.warn('IndexedDB initialization failed:', error);
      });
    });
    
    // Register background sync for bookmarks
    import('@/lib/sync/backgroundSync').then(({ registerBackgroundSync }) => {
      registerBackgroundSync().catch(error => {
        console.warn('Background sync registration failed:', error);
      });
    });
    
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
    // Call analytics hook even before mount gating to preserve hook order.
    // It internally guards for GA availability & env configuration.
    useGAPageViews();
    return null
  }
  // Initialize and track GA page views (must be called unconditionally every render to satisfy Hooks rules)
  useGAPageViews();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="azure-ai-agent-theme">
      <AuthProvider>
        {/* Side effects that require AuthProvider context */}
        <AppContent />
        
        <AudioNarrationProvider>
          <EnlightenMeProvider>
            {/* Skip Link for Keyboard Users */}
            <a 
              href="#main-content" 
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 
                         focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Skip to main content
            </a>
            
            <OfflineBanner />
              <div className="min-h-screen bg-background text-foreground flex flex-col">
          <header className="border-b border-border sticky top-0 z-50 bg-background" role="banner">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => navigate('/')}
                  className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:rounded-md"
                  aria-label="Go to home page - Open Agent School"
                >
                  <Logo size="small" showText={true} />
                </button>
              </div>
              
              <div className="flex items-center space-x-2 flex-wrap justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowJourneyMap(true)}
                  className="flex items-center gap-2"
                  aria-label="Open Learning Journey Map"
                >
                  <Path size={16} aria-hidden="true" />
                  <span className="hidden sm:inline">Journey Map</span>
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => { try { window.dispatchEvent(new CustomEvent('analytics:ctaClick', { detail: { source: 'header-button', tier: 'get-started' } })); } catch {} ; navigate('/cta'); }}
                  className="flex items-center gap-2 bg-primary text-white"
                  aria-label="Get Started with Open Agent School"
                >
                  <Lightning size={16} aria-hidden="true" />
                  <span className="hidden sm:inline">Get Started</span>
                </Button>
                <AppTutorialButton />
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <span className="text-xs text-muted-foreground hidden md:inline-block">Theme</span>
                </div>
                <UserMenu />
                <Link
                  to="/value-map"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-gradient-to-r from-yellow-400 to-amber-500 px-3 py-2 text-sm font-bold text-gray-900 transition-all hover:from-yellow-500 hover:to-amber-600 hover:shadow-lg hover:scale-105 animate-pulse"
                  title="Discover what you'll master at Open Agent School"
                >
                  <SparklesIcon className="mr-1 w-4 h-4" />
                  <span className="hidden md:inline">Skills Universe</span>
                </Link>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <a
                        href="https://github.com/bhakthan/openagentschool"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <GithubLogo className="mr-1" size={16} /> GitHub
                      </a>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <a
                        href="https://deepwiki.com/bhakthan/OpenAgentSchool"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                        title="Visit Open Agent School Wiki on DeepWiki"
                      >
                        <Article className="mr-1" size={16} /> Wiki
                      </a>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <InstallAppMenuItem />
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open('https://www.youtube.com/playlist?list=PL9pA6bW_V_aBCC77nHbPgPJVUXqnLkZ2C', '_blank')}
                        className="inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                        title="Click to open YouTube Podcast playlist"
                      >
                        <img 
                          src="/images/youtube-podcast-qr.svg" 
                          alt="YouTube Podcast QR Code" 
                          className="w-6 h-6 mr-2 rounded-sm"
                        />
                        <span className="hidden lg:inline">Podcast</span>
                      </Button>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>

            {/* Navigation tabs */}
            <div className="container mx-auto px-4 pb-1">
              {(() => {
                // Hierarchical mega-menu structure with 4 top-level categories
                // Color-coded to match Learning Atlas visualization
                const navCategories = [
                  {
                    label: 'Learn',
                    icon: <GraduationCap size={16} weight="duotone" />,
                    color: 'from-blue-500 to-cyan-500',
                    hoverBg: 'hover:bg-blue-500/10 dark:hover:bg-blue-400/10',
                    items: [
                      { to: '/concepts', label: 'Core Concepts', icon: <LadderIcon size={16} />, description: 'Foundational AI agent concepts', isNew: false },
                      { to: '/patterns', label: 'Agent Patterns', icon: <PuzzlePiece size={16} weight="duotone" />, description: 'Reusable design patterns', isNew: false },
                      { to: '/tree-view', label: 'Learning Atlas', icon: <Tree size={16} weight="duotone" />, description: 'Visual concept taxonomy', isNew: true },
                      { to: '/references', label: 'References', icon: <Books size={16} weight="duotone" />, description: 'Papers, videos, and resources', isNew: false },
                    ]
                  },
                  {
                    label: 'Apply',
                    icon: <Lightning size={16} weight="duotone" />,
                    color: 'from-amber-500 to-orange-500',
                    hoverBg: 'hover:bg-amber-500/10 dark:hover:bg-amber-400/10',
                    items: [
                      { to: '/agents-for-science', label: 'Agents for Science', icon: <Atom size={16} weight="duotone" />, description: 'AI-accelerated scientific discovery', isNew: true },
                      { to: '/adoption-playbook', label: 'Adoption Playbook', icon: <Compass size={16} weight="duotone" />, description: 'Enterprise adoption strategies', isNew: true },
                      { to: '/ai-skills', label: 'Applied AI Skills', icon: <Lightning size={16} weight="duotone" />, description: 'Practical AI implementation skills', isNew: false },
                      { to: '/azure-services', label: 'Azure Services', icon: <StackSimple size={16} weight="duotone" />, description: 'Cloud platform services', isNew: false },
                    ]
                  },
                  {
                    label: 'Practice',
                    icon: <Code size={16} weight="duotone" />,
                    color: 'from-emerald-500 to-teal-500',
                    hoverBg: 'hover:bg-emerald-500/10 dark:hover:bg-emerald-400/10',
                    items: [
                      { to: '/study-mode', label: 'Study Mode', icon: <GraduationCap size={16} weight="duotone" />, description: 'Interactive learning exercises', isNew: false },
                      { to: '/quiz', label: 'Knowledge Quiz', icon: <LadderIcon size={16} />, description: 'Test your understanding', isNew: false },
                      ...(import.meta.env.VITE_KNOWLEDGE_SERVICE_URL ? [{ to: '/knowledge-search', label: 'Knowledge Search', icon: <Code size={16} weight="duotone" />, description: 'Search documentation', isNew: false }] : []),
                      { to: '/community', label: 'Community', icon: <Users size={16} weight="duotone" />, description: 'Share and collaborate', isNew: false },
                    ]
                  },
                  {
                    label: 'Tools',
                    icon: <Plugs size={16} weight="duotone" />,
                    color: 'from-violet-500 to-purple-500',
                    hoverBg: 'hover:bg-violet-500/10 dark:hover:bg-violet-400/10',
                    items: [
                      { to: '/api-docs', label: 'API Docs', icon: <Article size={16} weight="duotone" />, description: 'Technical documentation', isNew: false },
                      ...(import.meta.env.VITE_ORCHESTRATOR_SERVICE_URL ? [{ to: '/agents', label: 'Agents Console', icon: <Plugs size={16} weight="duotone" />, description: 'Multi-agent orchestration', isNew: true }] : []),
                    ]
                  },
                ];

                // Helper to check if any item in a category is active
                const isCategoryActive = (category: typeof navCategories[0]) => 
                  category.items.some(item => location.pathname === item.to);
                
                // Check if category has any new items
                const hasNewItems = (category: typeof navCategories[0]) =>
                  category.items.some(item => item.isNew);

                return (
                  <>
                    {/* Desktop mega-menu */}
                    <div className="hidden md:block">
                      <NavigationMenu>
                        <NavigationMenuList className="flex space-x-1">
                          {navCategories.map(category => (
                            <NavigationMenuItem key={category.label}>
                              <NavigationMenuTrigger 
                                className={cn(
                                  "bg-transparent h-10 relative transition-all duration-200",
                                  category.hoverBg,
                                  isCategoryActive(category) && "bg-accent text-accent-foreground font-semibold"
                                )}
                              >
                                <span className="flex items-center gap-2">
                                  {category.icon}
                                  {category.label}
                                  {hasNewItems(category) && (
                                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                                    </span>
                                  )}
                                </span>
                              </NavigationMenuTrigger>
                              <NavigationMenuContent>
                                <div className={cn(
                                  "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r rounded-t-md",
                                  category.color
                                )} />
                                <ul className="grid gap-2 p-4 pt-5 w-[520px] md:grid-cols-2">
                                  {category.items.map(item => (
                                    <li key={item.to}>
                                      <NavigationMenuLink asChild>
                                        <Link
                                          to={item.to}
                                          className={cn(
                                            "group block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all duration-200",
                                            "bg-white dark:bg-gray-900",
                                            "hover:bg-gray-50 dark:hover:bg-gray-800 hover:translate-x-0.5 hover:shadow-sm",
                                            "focus:bg-gray-50 dark:focus:bg-gray-800",
                                            "border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700",
                                            location.pathname === item.to && "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                                          )}
                                        >
                                          <div className="flex items-center gap-2 text-sm font-medium leading-none mb-1.5">
                                            <span className="text-gray-700 dark:text-gray-300 transition-transform group-hover:scale-110">
                                              {item.icon}
                                            </span>
                                            <span className="text-gray-900 dark:text-white">{item.label}</span>
                                            {item.isNew && (
                                              <span className="ml-auto px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 rounded-full">
                                                New
                                              </span>
                                            )}
                                          </div>
                                          <p className="line-clamp-2 text-xs leading-snug text-gray-500 dark:text-gray-400">
                                            {item.description}
                                          </p>
                                        </Link>
                                      </NavigationMenuLink>
                                    </li>
                                  ))}
                                </ul>
                              </NavigationMenuContent>
                            </NavigationMenuItem>
                          ))}
                        </NavigationMenuList>
                      </NavigationMenu>
                    </div>

                    {/* Mobile navigation - enhanced with colors and badges */}
                    <div className="md:hidden">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="default"
                            className="h-10 px-4 relative"
                            aria-label="Navigation menu"
                          >
                            <DotsThree size={20} weight="bold" className="mr-2" />
                            <span>Menu</span>
                            {/* New indicator dot */}
                            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-500"></span>
                            </span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-[300px] max-h-[75vh] overflow-y-auto p-2">
                          {navCategories.map(category => (
                            <div key={category.label} className="mb-3 last:mb-0">
                              {/* Category header with gradient underline */}
                              <div className="px-2 py-1.5 text-sm font-semibold flex items-center gap-2 relative">
                                <span className={cn(
                                  "bg-gradient-to-r bg-clip-text text-transparent",
                                  category.color
                                )}>
                                  {category.icon}
                                </span>
                                <span className={cn(
                                  "bg-gradient-to-r bg-clip-text text-transparent font-bold",
                                  category.color
                                )}>
                                  {category.label}
                                </span>
                                {hasNewItems(category) && (
                                  <span className="ml-1 px-1.5 py-0.5 text-[9px] font-bold uppercase bg-yellow-500 text-gray-900 rounded-full">
                                    New
                                  </span>
                                )}
                              </div>
                              <div className={cn("h-0.5 mx-2 mb-1 rounded-full bg-gradient-to-r opacity-30", category.color)} />
                              {category.items.map(item => (
                                <DropdownMenuItem key={item.to} asChild>
                                  <Link 
                                    to={item.to} 
                                    className={cn(
                                      "flex items-center gap-2 pl-4 py-2 rounded-md mx-1 transition-all duration-150",
                                      "hover:translate-x-0.5",
                                      location.pathname === item.to && "bg-accent text-accent-foreground"
                                    )}
                                  >
                                    {item.icon}
                                    <span className="flex-1">{item.label}</span>
                                    {item.isNew && (
                                      <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 rounded-full">
                                        New
                                      </span>
                                    )}
                                  </Link>
                                </DropdownMenuItem>
                              ))}
                            </div>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </>
                );
              })()}
            </div>
          </header>
          
          {/* Pull-to-refresh indicator */}
          {isPulling && (
            <div 
              className="fixed top-16 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
              style={getPullToRefreshStyles(pullDistance)}
            >
              <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                <div 
                  className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"
                  style={{ 
                    opacity: pullProgress,
                    animationPlayState: pullProgress >= 1 ? 'running' : 'paused' 
                  }}
                />
                <span className="text-sm font-medium">
                  {pullProgress >= 1 ? 'Release to refresh' : 'Pull to refresh'}
                </span>
              </div>
            </div>
          )}
          
          <main id="main-content" className="flex-1 container mx-auto px-4 py-6" role="main">
            <Suspense fallback={<PageLoadingFallback />}>
              <SEORouteWrapper>
                <Routes>
                  <Route path="/" element={<ConceptsExplorer />} />
                  <Route path="/concepts/:conceptId?" element={<ConceptsExplorer />} />
                  {/* Alias path for rebrand; record analytics then redirect */}
                  <Route path="/applied-ai-skills" element={<AliasAISkillsRedirect />} />
                  <Route path="/ai-skills" element={<AISkillsExplorer />} />
                  <Route path="/ai-product-framework" element={<AIProductFrameworkPage />} />
                  <Route path="/study-mode" element={<StudyMode />} />
                  <Route path="/knowledge-search" element={<KnowledgeSearch />} />
                  <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
                  <Route path="/patterns/:patternId?" element={<PatternExplorer />} />
                  {/* Agent Velocity Engineering routes */}
                  <Route path="/velocity/dashboard" element={<VelocityScoreDashboard />} />
                  <Route path="/velocity/tracker" element={<PatternMasteryTracker />} />
                  <Route path="/velocity/case-studies" element={<VelocityCaseStudies />} />
                  <Route path="/velocity/workshop" element={<AVEWorkshopCurriculum />} />
                  <Route path="/azure-services/:serviceId?" element={<AzureServicesOverview />} />
                  <Route path="/quiz/:quizId?" element={<QuizSection />} />
                  <Route path="/tree-view" element={<TreeVisualizationPage />} />
                  <Route path="/value-map" element={<ValueMapPage />} />
                  <Route path="/scl-demo" element={<SCLDemo />} />
                  <Route path="/agents" element={<AgentsConsole />} />
                  <Route path="/references" element={<ReferencesSection />} />
                  <Route path="/deep-dive-taxonomy" element={<DeepDiveTaxonomyPage />} />
                  <Route path="/community" element={<CommunitySharing />} />
                  <Route path="/adoption-playbook" element={<AgenticAdoptionPlaybook />} />
                  <Route path="/agents-for-science" element={<AgentsForScience />} />
                  <Route path="/adoption/charter" element={<ExecutiveAlignmentCharterForm />} />
                  <Route path="/adoption/canvas" element={<PortfolioHeatmapCanvasForm />} />
                  <Route path="/adoption/briefing" element={<BoardReadyBriefingPackForm />} />
                  <Route path="/bookmarks" element={<BookmarksPage />} />
                  <Route path="/achievements" element={<AchievementsPage />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/auth/callback/:provider" element={<OAuthCallbackPage />} />
                  <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
                  <Route path="/api-docs" element={<ApiDocsPage />} />
                  <Route path="/cta-alt" element={<CTALandingPageVariant />} />
                  <Route path="/cta" element={<CTALandingPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  {/* Fallback route to redirect to home page */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </SEORouteWrapper>
            </Suspense>
            <Outlet />
          </main>
          
          <footer className="border-t border-border py-6 bg-muted transition-colors duration-300">
            <div className="container mx-auto px-4 text-center text-muted-foreground">
              <p>Open Agent School - Where Agentic AI Concepts Come to Life</p>
              <p className="text-xs mt-1 opacity-75">Learn • Build • Transform together — From concepts to production-ready agents</p>
              <p className="text-xs mt-1 opacity-75">© {new Date().getFullYear()} Open Agent School</p>
              <p className="text-sm mt-2 flex flex-col sm:flex-row gap-1 sm:gap-4 items-center justify-center">
                <span>
                  A learning initiative by
                  <span className="ml-1 font-medium">Srikanth Bhakthan</span>
                  <a
                    href="https://www.linkedin.com/in/bhakthan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-foreground ml-1"
                    aria-label="Srikanth Bhakthan LinkedIn profile"
                  >LinkedIn</a>
                </span>
                <span className="hidden sm:inline opacity-50">•</span>
                <span>
                  With contributions from
                  <span className="ml-1 font-medium">Sowmiya Ravichandran</span>
                  <a
                    href="https://www.linkedin.com/in/sowmiyar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-foreground ml-1"
                    aria-label="Sowmiya Ravichandran LinkedIn profile"
                  >LinkedIn</a>
                </span>
              </p>
            </div>
          </footer>

          {/* Persistent micro CTA ribbon (hidden on /cta) */}
          {location.pathname !== '/cta' && <MicroCtaRibbon />}
          
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
              ? 'Applied AI Skills'
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
      </AuthProvider>
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

// Simple component that fires an analytics event indicating the alias was used, then navigates.
const AliasAISkillsRedirect: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    try {
      trackEvent({ action: 'alias_redirect', category: 'navigation', label: 'applied-ai-skills->ai-skills' });
      trackEvent({ action: 'ai_skills_entry', category: 'ai_skills', entry_source: 'alias' });
      try { sessionStorage.setItem('aiSkillsAliasRedirect','1'); } catch {}
    } catch {}
    navigate('/ai-skills', { replace: true });
  }, [navigate]);
  return null;
};

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
