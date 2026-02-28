import React, { useState, useMemo } from 'react';
import { useConceptSearch } from '@/hooks/useKnowledge';
import { trackEvent } from '@/lib/analytics/ga';
import { MagnifyingGlass, Spinner, BookmarkSimple, ArrowRight } from '@phosphor-icons/react';
import { debounce } from '@/lib/utils/debounce';
import { Link } from 'react-router-dom';

interface KnowledgeSearchProps {
  onResultClick?: (conceptId: string) => void;
  placeholder?: string;
  limit?: number;
}

export function KnowledgeSearch({ 
  onResultClick, 
  placeholder = "Search concepts semantically...",
  limit = 10 
}: KnowledgeSearchProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search to avoid too many API calls
  const debouncedSetQuery = useMemo(
    () => debounce((value: string) => setDebouncedQuery(value), 300),
    []
  );

  const handleSearchChange = (value: string) => {
    setQuery(value);
    debouncedSetQuery(value);
  };

  const { data: results, isLoading, error } = useConceptSearch(debouncedQuery, limit);

  const handleResultClick = (conceptId: string) => {
    trackEvent({ action: 'result_click', category: 'knowledge_search', label: conceptId });
    if (onResultClick) {
      onResultClick(conceptId);
    }
  };

  return (
    <div className="w-full max-w-2xl">
      {/* Search Input */}
      <div className="relative" role="search">
        <label htmlFor="knowledge-search" className="sr-only">
          Search concepts
        </label>
        <MagnifyingGlass 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
          size={20}
          aria-hidden="true"
        />
        <input
          id="knowledge-search"
          type="search"
          value={query}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 text-base sm:text-sm rounded-lg border border-gray-200 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     dark:bg-gray-800 dark:border-gray-700 dark:text-white
                     transition-all min-h-[44px]"
          aria-label="Search concepts by keywords or topics"
          aria-describedby={isLoading ? "search-status" : undefined}
          autoComplete="off"
        />
        {isLoading && (
          <div id="search-status" className="absolute right-3 top-1/2 -translate-y-1/2">
            <Spinner 
              className="animate-spin text-blue-500" 
              size={20}
              aria-label="Searching..."
            />
            <span className="sr-only">Searching for concepts...</span>
          </div>
        )}
      </div>

      {/* Results */}
      {results && results.length > 0 && (
        <div 
          className="mt-4 space-y-2 max-h-96 overflow-y-auto"
          role="region"
          aria-live="polite"
          aria-atomic="false"
          aria-label={`Found ${results.length} concept${results.length > 1 ? 's' : ''}`}
        >
          {results.map((result) => (
            <Link
              key={result.concept.id}
              to={`/concepts/${result.concept.id}`}
              onClick={() => handleResultClick(result.concept.id)}
              className="block p-4 rounded-lg border border-gray-200 hover:border-blue-500 
                         dark:border-gray-700 dark:hover:border-blue-400 
                         transition-all cursor-pointer group
                         hover:shadow-md dark:bg-gray-800
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                         dark:focus:ring-offset-gray-900"
              aria-label={`${result.concept.title} - ${Math.round(result.similarity * 100)}% match`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {result.concept.title}
                    </h3>
                    <ArrowRight 
                      className="text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100" 
                      size={16} 
                    />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {result.concept.description}
                  </p>
                  
                  {/* Tags */}
                  {result.concept.tags && result.concept.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {result.concept.tags.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full bg-gray-100 
                                     dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Similarity Score & Difficulty */}
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">
                    {Math.round(result.similarity * 100)}%
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {result.concept.difficulty}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* No Results */}
      {debouncedQuery.length > 2 && results?.length === 0 && !isLoading && (
        <div className="mt-4 text-center py-8 text-gray-500 dark:text-gray-400">
          <MagnifyingGlass size={48} className="mx-auto mb-3 opacity-50" />
          <p>No concepts found matching "{debouncedQuery}"</p>
          <p className="text-sm mt-1">Try different keywords or broader terms</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-4 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 
                        text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
          <p className="font-semibold mb-1">Search temporarily unavailable</p>
          <p className="text-sm">Knowledge service may be offline. Please try again later.</p>
        </div>
      )}

      {/* Search Hint */}
      {query.length > 0 && query.length <= 2 && (
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
          Type at least 3 characters to search...
        </div>
      )}
    </div>
  );
}
