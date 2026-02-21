import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MagnifyingGlass, Robot, GraduationCap, Lightbulb, BookmarkSimple, X } from '@phosphor-icons/react';
import { agentPatterns, PatternData } from '@/lib/data/patterns/index';
import { cn } from '@/lib/utils';
import { VelocityBadge } from './VelocityBadge';

interface TopPatternSelectorProps {
  selectedPattern: PatternData | null;
  onPatternSelect: (pattern: PatternData) => void;
}

export function TopPatternSelector({ selectedPattern, onPatternSelect }: TopPatternSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAllPatterns, setShowAllPatterns] = useState(false);

  // Group patterns by category
  const patternsByCategory = agentPatterns.reduce((acc, pattern) => {
    const category = pattern.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(pattern);
    return acc;
  }, {} as Record<string, PatternData[]>);

  // Filter patterns based on search and category
  const allFilteredPatterns = agentPatterns.filter(pattern => {
    const searchTerms = searchQuery.toLowerCase().split(' ').filter(term => term.length > 0);
    const matchesSearch = searchTerms.length === 0 || searchTerms.some(term => 
      pattern.name.toLowerCase().includes(term) ||
      pattern.description.toLowerCase().includes(term)
    );
    const matchesCategory = selectedCategory === 'all' || pattern.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Limit patterns for "All" tab when not expanded
  const filteredPatterns = selectedCategory === 'all' && !showAllPatterns && !searchQuery
    ? allFilteredPatterns.slice(0, 10)
    : allFilteredPatterns;

  // Detect if we're showing a truncated list (top 10) in the All category without a search
  const isLimitedAllView = selectedCategory === 'all' && !showAllPatterns && !searchQuery && allFilteredPatterns.length > 10;

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Core': return <Robot size={16} />;
      case 'Advanced': return <GraduationCap size={16} />;
      case 'Specialized': return <Lightbulb size={16} />;
      case 'Learner': return <BookmarkSimple size={16} />;
      default: return <BookmarkSimple size={16} />;
    }
  };

  // Build list of categories (unused for rendering directly but may be helpful later)
  const categories = ['all', ...Object.keys(patternsByCategory)];

  // Responsive abbreviation for long category names on small screens
  const abbreviateCategory = (category: string) => {
    switch (category) {
      case 'Advanced':
        return 'Adv';
      case 'Specialized':
        return 'Spec';
      case 'Learner':
        return 'Learn';
      default:
        return category.length > 8 ? `${category.slice(0, 6)}…` : category;
    }
  };

  const handlePatternSelect = (pattern: PatternData) => {
    onPatternSelect(pattern);
    setIsOpen(false);
  };

  // Reset showAllPatterns when category changes or dialog opens
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setShowAllPatterns(false);
  };

  const handleDialogOpen = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setShowAllPatterns(false);
    }
  };

  return (
    <div className="flex items-center gap-2 flex-1 min-w-0">
      {/* Current Pattern Display */}
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <span className="text-sm text-foreground/70 whitespace-nowrap">Pattern:</span>
        <Button
          variant="outline"
          className="justify-start flex-1 min-w-0"
          onClick={() => setIsOpen(true)}
        >
          <div className="flex items-center gap-2 min-w-0">
            {selectedPattern?.category && getCategoryIcon(selectedPattern.category)}
            <span className="truncate">
              {selectedPattern?.name || 'Select Pattern'}
            </span>
          </div>
        </Button>
      </div>

      {/* Pattern Browser Dialog */}
      <Dialog open={isOpen} onOpenChange={handleDialogOpen}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="shrink-0 gap-1.5">
                  <MagnifyingGlass size={16} />
                  <Badge variant="secondary" className="text-xs px-1.5 py-0 h-5">
                    {agentPatterns.length}
                  </Badge>
                </Button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Browse all {agentPatterns.length} agent patterns</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DialogContent className="w-[85vw] !max-w-[1400px] max-h-[90vh] overflow-hidden p-0 sm:!max-w-[1400px]">
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-center justify-between gap-4">
              <DialogTitle>Select Agent Pattern</DialogTitle>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                {filteredPatterns.length} {filteredPatterns.length === 1 ? 'pattern' : 'patterns'}
                {(searchQuery || selectedCategory !== 'all') && (
                  <span className="text-muted-foreground ml-1">/ {agentPatterns.length} total</span>
                )}
              </Badge>
            </div>
          </DialogHeader>
          
          <div className="flex flex-col min-h-0 max-h-[calc(90vh-80px)]">
            {/* Scrollable content with sticky filter header */}
            <ScrollArea className="min-h-0 flex-1 overflow-x-hidden">
              <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b px-6 pt-4 pb-3">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Search Input */}
                  <div className="relative flex-1 min-w-0">
                    <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" />
                    <Input
                      placeholder="Search patterns..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-10"
                    />
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
                  </div>

                  {/* Results Count */}
                  <div className="flex items-center gap-2 text-sm text-foreground/60 whitespace-nowrap">
                    {isLimitedAllView ? (
                      <span>
                        Showing {filteredPatterns.length} of {allFilteredPatterns.length} patterns
                      </span>
                    ) : (
                      <span>
                        {allFilteredPatterns.length} pattern{allFilteredPatterns.length !== 1 ? 's' : ''} found
                      </span>
                    )}
                  </div>
                </div>

                {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={handleCategoryChange} className="mt-3">
                  <TabsList className="!flex w-full max-w-full shrink-0 flex-nowrap overflow-x-auto overscroll-contain gap-1 !h-8 !p-1">
                    <TabsTrigger
                      value="all"
                      className="flex-none shrink-0 whitespace-nowrap !h-7 !px-2 !py-1 !text-sm !font-medium transition-colors hover:bg-muted/60 data-[state=active]:bg-primary/10 data-[state=active]:border data-[state=active]:border-primary/30"
                    >
          <span className="truncate">All</span>
                    </TabsTrigger>
                    {Object.keys(patternsByCategory).map(category => (
                      <TabsTrigger
                        key={category}
                        value={category}
                        className="flex-none shrink-0 whitespace-nowrap !h-7 !px-2 !py-1 !text-sm !font-medium transition-colors hover:bg-muted/60 data-[state=active]:bg-primary/10 data-[state=active]:border data-[state=active]:border-primary/30"
                      >
                        {getCategoryIcon(category)}
                        <span className="ml-1 truncate hidden sm:inline">{category}</span>
                        <span className="ml-1 truncate sm:hidden">{abbreviateCategory(category)}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>

              {/* Pattern Grid */}
              <div className="px-6 pb-6">
                <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 py-4">
                {filteredPatterns.map((pattern) => (
                    <Card
                    key={pattern.id}
                    className={cn(
                      "cursor-pointer transition-all duration-200 hover:shadow-md hover:border-border hover:-translate-y-[1px]",
                      selectedPattern?.id === pattern.id && "ring-2 ring-primary"
                    )}
                    onClick={() => handlePatternSelect(pattern)}
                  >
                    <CardHeader className="pb-1 px-3">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-base leading-tight">
                          {pattern.name}
                        </CardTitle>
                        {pattern.category && (
                          <Badge variant="secondary" className="shrink-0 text-xs">
                            {pattern.category}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 pb-2 px-3">
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {pattern.description}
                      </p>
                      {pattern.velocityProfile && (
                        <div className="mt-2">
                          <VelocityBadge impact={pattern.velocityProfile.impact} size="sm" showLabel={false} />
                        </div>
                      )}
                      {pattern.useCases && pattern.useCases.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {pattern.useCases.slice(0, 2).map((useCase, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {useCase.length > 20 ? `${useCase.slice(0, 20)}...` : useCase}
                            </Badge>
                          ))}
                          {pattern.useCases.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{pattern.useCases.length - 2} more
                            </Badge>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
                {/* Show More Button for "All" category */}
                {selectedCategory === 'all' && !showAllPatterns && !searchQuery && allFilteredPatterns.length > 10 && (
                  <div className="sticky bottom-0 pt-3 pb-3 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                    <div className="flex flex-col items-center gap-2 px-6">
                      <p className="text-xs text-foreground/60">
                        Showing 10 of {allFilteredPatterns.length} patterns
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowAllPatterns(true)}
                        className="flex items-center gap-2 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <MagnifyingGlass size={16} />
                        Show All {allFilteredPatterns.length} Patterns
                      </Button>
                    </div>
                  </div>
                )}

                {filteredPatterns.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <MagnifyingGlass size={48} className="text-foreground/40 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No patterns found</h3>
                    <p className="text-foreground/60 mb-4">
                      Try adjusting your search or category filter
                    </p>
                    <Button variant="outline" onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}>
                      Clear filters
                    </Button>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
