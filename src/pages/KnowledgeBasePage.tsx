import React, { useState } from 'react';
import { KnowledgeSearch, ConceptCard } from '@/components/knowledge';
import { useConceptsByCategory } from '@/hooks/useKnowledge';
import { Brain, Books, Sparkle } from '@phosphor-icons/react';

const categories = [
  { id: 'all', label: 'All Concepts', icon: Books },
  { id: 'architecture', label: 'Architecture', icon: Brain },
  { id: 'patterns', label: 'Patterns', icon: Sparkle },
  { id: 'evaluation', label: 'Evaluation', icon: Brain },
  { id: 'security', label: 'Security', icon: Brain },
];

export default function KnowledgeBasePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const { data: concepts, isLoading, error } = useConceptsByCategory(
    selectedCategory === 'all' ? '' : selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-4">
            <Brain size={40} className="text-blue-600 dark:text-blue-400" weight="duotone" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Knowledge Base
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Explore AI agent concepts with semantic search
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="mt-6">
            <KnowledgeSearch limit={10} />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h2 className="sr-only">Filter by category</h2>
        <div 
          className="flex flex-wrap gap-2 mb-8"
          role="tablist"
          aria-label="Concept categories"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                role="tab"
                aria-selected={selectedCategory === category.id}
                aria-controls="concepts-panel"
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2
                  min-h-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  dark:focus:ring-offset-gray-900
                  ${selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-500'
                  }`}
              >
                <Icon size={18} weight={selectedCategory === category.id ? 'fill' : 'regular'} aria-hidden="true" />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Concepts Grid */}
        <div id="concepts-panel" role="tabpanel" aria-label={`${selectedCategory === 'all' ? 'All' : selectedCategory} concepts`}>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-busy="true" aria-label="Loading concepts">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" aria-hidden="true"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12" role="alert">
            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 
                            text-red-600 dark:text-red-400 inline-block">
              <p className="font-semibold mb-1">Failed to load concepts</p>
              <p className="text-sm">Knowledge service may be offline</p>
            </div>
          </div>
        ) : concepts && concepts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {concepts.map((concept) => (
              <ConceptCard 
                key={concept.id} 
                concept={concept}
                showFullDescription={false}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Books size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" aria-hidden="true" />
            <p className="text-gray-500 dark:text-gray-400">
              No concepts found in this category
            </p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
