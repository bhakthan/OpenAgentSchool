import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  MagnifyingGlass, 
  Brain, 
  Lightning, 
  BookOpen,
  Link as LinkIcon,
  ArrowRight,
  Sparkle
} from "@phosphor-icons/react";
import { knowledgeAPI, SearchResult, Concept } from '@/services/api';
import { cn } from "@/lib/utils";

interface KnowledgeSearchProps {
  onSelectConcept?: (concept: Concept) => void;
}

export const KnowledgeSearch: React.FC<KnowledgeSearchProps> = ({ onSelectConcept }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('');
  const [difficulty, setDifficulty] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);
  const [relatedConcepts, setRelatedConcepts] = useState<Concept[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounce search
  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string, cat: string, diff: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const searchResults = await knowledgeAPI.searchConcepts({
          query: searchQuery,
          category: cat || undefined,
          difficulty: (diff as 'beginner' | 'intermediate' | 'advanced') || undefined,
          limit: 10,
          min_similarity: 0.5
        });
        
        setResults(searchResults);
      } catch (err) {
        console.error('Search error:', err);
        setError('Failed to search knowledge base. Make sure the Knowledge Service is running.');
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  // Trigger search when query or filters change
  useEffect(() => {
    debouncedSearch(query, category, difficulty);
  }, [query, category, difficulty, debouncedSearch]);

  // Load concept details
  const handleSelectResult = async (result: SearchResult) => {
    try {
      setLoading(true);
      const concept = await knowledgeAPI.getConcept(result.concept.id);
      setSelectedConcept(concept);
      
      // Load related concepts
      const related = await knowledgeAPI.getRelatedConcepts(result.concept.id, 5);
      setRelatedConcepts(related);
      
      if (onSelectConcept) {
        onSelectConcept(concept);
      }
    } catch (err) {
      console.error('Error loading concept:', err);
      setError('Failed to load concept details.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToResults = () => {
    setSelectedConcept(null);
    setRelatedConcepts([]);
  };

  const getSimilarityColor = (score: number) => {
    if (score >= 0.9) return 'text-green-600 dark:text-green-400';
    if (score >= 0.7) return 'text-blue-600 dark:text-blue-400';
    if (score >= 0.5) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'advanced':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain size={24} className="text-primary" />
            Knowledge Search
          </CardTitle>
          <CardDescription>
            Search the knowledge base using semantic similarity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Input */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <MagnifyingGlass 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <Input
                placeholder="Search concepts, topics, or questions..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                <SelectItem value="agent-architecture">Agent Architecture</SelectItem>
                <SelectItem value="multi-agent">Multi-Agent</SelectItem>
                <SelectItem value="protocols">Protocols</SelectItem>
                <SelectItem value="fine-tuning">Fine-Tuning</SelectItem>
                <SelectItem value="safety">Safety</SelectItem>
              </SelectContent>
            </Select>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Search Results */}
      {!selectedConcept && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {loading ? 'Searching...' : `${results.length} Results`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin">
                  <Brain size={32} className="text-primary" />
                </div>
              </div>
            )}
            
            {!loading && results.length === 0 && query && (
              <div className="text-center py-12 text-muted-foreground">
                <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
                <p>No results found for "{query}"</p>
                <p className="text-sm mt-2">Try different keywords or filters</p>
              </div>
            )}

            {!loading && results.length === 0 && !query && (
              <div className="text-center py-12 text-muted-foreground">
                <MagnifyingGlass size={48} className="mx-auto mb-4 opacity-50" />
                <p>Start typing to search the knowledge base</p>
              </div>
            )}

            <ScrollArea className="h-[600px]">
              <div className="space-y-4">
                {results.map((result) => (
                  <Card 
                    key={result.concept.id} 
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => handleSelectResult(result)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-base mb-2">{result.concept.title}</CardTitle>
                          <CardDescription className="line-clamp-2">
                            {result.concept.description}
                          </CardDescription>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={getSimilarityColor(result.score)}>
                            {(result.score * 100).toFixed(0)}% match
                          </Badge>
                          {result.concept.difficulty && (
                            <Badge className={getDifficultyColor(result.concept.difficulty)}>
                              {result.concept.difficulty}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    {result.highlights && result.highlights.length > 0 && (
                      <CardContent>
                        <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded p-3">
                          <div className="flex items-start gap-2">
                            <Sparkle size={16} className="text-yellow-600 dark:text-yellow-400 mt-0.5" />
                            <p className="text-sm text-yellow-900 dark:text-yellow-100">
                              {result.highlights[0]}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {/* Concept Detail View */}
      {selectedConcept && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleBackToResults}
                    className="mb-4"
                  >
                    <ArrowRight size={16} className="mr-2 rotate-180" />
                    Back to Results
                  </Button>
                  <CardTitle className="text-2xl mb-2">{selectedConcept.title}</CardTitle>
                  <CardDescription>{selectedConcept.description}</CardDescription>
                </div>
                {selectedConcept.difficulty && (
                  <Badge className={getDifficultyColor(selectedConcept.difficulty)}>
                    {selectedConcept.difficulty}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Main Content */}
              <div>
                <h3 className="font-semibold mb-3">Concept Overview</h3>
                <div className="prose dark:prose-invert max-w-none">
                  <p>{selectedConcept.content}</p>
                </div>
              </div>

              <Separator />

              {/* Learning Objectives */}
              {selectedConcept.learning_objectives && selectedConcept.learning_objectives.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Lightning size={18} className="text-yellow-600" />
                    Learning Objectives
                  </h3>
                  <ul className="space-y-2">
                    {selectedConcept.learning_objectives.map((objective, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Prerequisites */}
              {selectedConcept.prerequisites && selectedConcept.prerequisites.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <LinkIcon size={18} className="text-blue-600" />
                    Prerequisites
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedConcept.prerequisites.map((prereq, idx) => (
                      <Badge key={idx} variant="outline">
                        {prereq}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Related Concepts */}
          {relatedConcepts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Related Concepts</CardTitle>
                <CardDescription>
                  Explore concepts similar to {selectedConcept.title}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedConcepts.map((concept) => (
                    <Card 
                      key={concept.id}
                      className="cursor-pointer hover:bg-accent transition-colors"
                      onClick={() => {
                        setSelectedConcept(concept);
                        knowledgeAPI.getRelatedConcepts(concept.id, 5)
                          .then(setRelatedConcepts)
                          .catch(console.error);
                      }}
                    >
                      <CardHeader>
                        <CardTitle className="text-sm">{concept.title}</CardTitle>
                        <CardDescription className="line-clamp-2 text-xs">
                          {concept.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

// Debounce utility
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default KnowledgeSearch;
