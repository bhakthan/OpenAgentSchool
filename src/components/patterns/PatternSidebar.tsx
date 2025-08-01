import { useState, useEffect } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInput,
  useSidebar
} from "@/components/ui/sidebar";
import { agentPatterns } from '@/lib/data/patterns/index';
import { BookmarkSimple, CaretRight, GraduationCap, Keyboard, Lightbulb, MagnifyingGlass, Robot, X } from '@phosphor-icons/react';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSidebarSearch } from '@/hooks/use-sidebar-search';
import { useSidebarCollapse } from '@/hooks/use-sidebar-collapse';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import EnlightenMeButton from '@/components/enlighten/EnlightenMeButton';

interface PatternSidebarProps {
  activePatternId: string;
  onPatternSelect: (id: string) => void;
}

export function PatternSidebar({ activePatternId, onPatternSelect }: PatternSidebarProps) {
  const { 
    searchQuery, 
    setSearchQuery,
    filteredCategories,
    groupByCategory,
    categories
  } = useSidebarSearch(agentPatterns);
  
  const { isCollapsed, toggleSidebar } = useSidebarCollapse();
  
  // Add keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If "/" is pressed, focus the search input
      if (e.key === '/' && !isCollapsed && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        const searchInput = document.querySelector('.pattern-search-input') as HTMLInputElement;
        if (searchInput) searchInput.focus();
      }
      
      // If "Escape" is pressed while the sidebar is open, collapse it
      if (e.key === 'Escape' && !isCollapsed) {
        toggleSidebar();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCollapsed, toggleSidebar]);

  // Group patterns by category on component mount
  useEffect(() => {
    groupByCategory();
  }, []);

  // Get appropriate icon for pattern category
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Core':
        return <Robot />;
      case 'Advanced':
        return <GraduationCap />;
      case 'Specialized':
        return <Lightbulb />;
      default:
        return <BookmarkSimple />;
    }
  };

  const CollapsedSidebarButton = () => {
    return (
      <div className="fixed top-[50%] -translate-y-1/2 left-0 z-40">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="rounded-r-full rounded-l-none shadow-md hover:shadow-lg sidebar-transition hover:translate-x-1 hover:bg-primary hover:text-primary-foreground group bg-primary/5"
                onClick={toggleSidebar}
                aria-label="Show patterns sidebar"
              >
                <CaretRight size={16} className="mr-1 group-hover:animate-pulse" />
                <span className="text-xs">Patterns</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-primary text-primary-foreground">
              <div className="flex items-center gap-1">
                <p>Show pattern navigation</p>
                <kbd className="px-1.5 py-0.5 text-xs rounded bg-primary-foreground/20 font-mono text-xs ml-1">
                  <span className="text-xs">/</span>
                </kbd>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  };

  return (
    <div className="relative">
      {isCollapsed && <CollapsedSidebarButton />}
      
      <div 
        className={cn(
          "border-r border-border bg-background shadow-md sidebar-transition fixed z-30 top-[142px] flex flex-col",
          isCollapsed 
            ? "-translate-x-full opacity-0 pointer-events-none" 
            : "translate-x-0 opacity-100"
        )}
        style={{ width: '250px', height: 'calc(100vh - 142px)' }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-3 flex flex-col gap-2 border-b border-border">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-sm">Agent Patterns</h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 rounded-full hover:bg-muted transition-transform duration-200 hover:rotate-90"
                onClick={toggleSidebar}
                aria-label="Close sidebar"
              >
                <svg 
                  viewBox="0 0 256 256" 
                  width="16" 
                  height="16"
                  className="transition-colors duration-200"
                >
                  <path 
                    fill="currentColor" 
                    d="M224 128a8 8 0 0 1-8 8H40a8 8 0 0 1 0-16h176a8 8 0 0 1 8 8M40 72h176a8 8 0 0 0 0-16H40a8 8 0 0 0 0 16m176 112H40a8 8 0 0 0 0 16h176a8 8 0 0 0 0-16"
                  />
                </svg>
              </Button>
            </div>
            
            <div className="relative">
              <div className="relative">
                <input 
                  placeholder="Search patterns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pattern-search-input w-full py-1 px-3 pl-8 pr-8 text-sm rounded-md border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <MagnifyingGlass size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
                {searchQuery && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                    onClick={() => setSearchQuery('')}
                  >
                    <X size={14} />
                  </Button>
                )}
                <div className="absolute right-0 bottom-[-24px] flex items-center gap-1 text-muted-foreground">
                  <Keyboard size={12} />
                  <kbd className="text-[10px] font-mono px-1 rounded bg-muted">
                    /
                  </kbd>
                  <span className="text-[10px]">to search</span>
                  <span className="mx-1 text-[10px]">·</span>
                  <kbd className="text-[10px] font-mono px-1 rounded bg-muted">
                    Ctrl+/
                  </kbd>
                  <span className="text-[10px]">toggle</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Pattern List */}
          <div className="flex-1 min-h-0 overflow-hidden">
            <div className="h-full overflow-y-auto overflow-x-hidden p-2">
              <div className="space-y-2">
                {Object.entries(filteredCategories).length > 0 ? (
                  Object.entries(filteredCategories).map(([categoryName, patterns]) => (
                  <div key={categoryName} className="mb-4">
                    <div className="flex items-center gap-2 px-2 py-1 text-base font-medium text-muted-foreground">
                      {getCategoryIcon(categoryName)}
                      <span>{categoryName}</span>
                    </div>
                    <div className="mt-1 space-y-1">
                      {patterns.map(pattern => (
                        <TooltipProvider key={pattern.id}>
                          <Tooltip delayDuration={300}>
                            <TooltipTrigger asChild>
                              <div 
                                className={cn(
                                  "px-2 py-1.5 rounded-md cursor-pointer transition-all duration-150 text-base relative group hover:pr-10",
                                  activePatternId === pattern.id 
                                    ? "bg-primary/10 text-primary border-l-2 border-primary" 
                                    : "hover:bg-muted"
                                )}
                                onClick={() => {
                                  onPatternSelect(pattern.id);
                                  // Auto-collapse sidebar after pattern selection for better viewing experience
                                  if (!isCollapsed) {
                                    // Use requestAnimationFrame to ensure DOM has updated before collapsing
                                    requestAnimationFrame(() => {
                                      setTimeout(() => {
                                        toggleSidebar();
                                        // Trigger a window resize event to force layout recalculation
                                        window.dispatchEvent(new Event('resize'));
                                      }, 150);
                                    });
                                  }
                                }}
                              >
                                <span className="block truncate">{pattern.name}</span>
                                {/* EnlightenMeButton with improved hover area and alignment */}
                                <div 
                                  className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:opacity-100 z-10 transform translate-x-2 group-hover:translate-x-0"
                                  onClick={(e) => e.stopPropagation()}
                                  onMouseEnter={(e) => e.stopPropagation()}
                                >
                                  <div className="p-1 rounded-full hover:bg-yellow-100/80 dark:hover:bg-yellow-900/30 transition-colors duration-150 shadow-sm">
                                    <EnlightenMeButton 
                                      title={`${pattern.name} Agent Pattern`}
                                      contextDescription={`The ${pattern.name} agent pattern: ${pattern.description}. Learn about its architecture, implementation using Azure OpenAI Service, Azure AI Agent Service, best practices, real-world use cases, performance considerations, and integration patterns with other Azure services.`}
                                    />
                                  </div>
                                </div>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="max-w-xs text-sm">
                              {pattern.description}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-muted-foreground">
                  <p>No patterns found</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => setSearchQuery('')}
                  >
                    Clear search
                  </Button>
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}