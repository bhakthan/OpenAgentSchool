import React from 'react';
import { useRelatedConcepts } from '@/hooks/useKnowledge';
import { Link } from 'react-router-dom';
import { ArrowRight, Lightbulb, Sparkle } from '@phosphor-icons/react';

interface RelatedConceptsProps {
  conceptId: string;
  limit?: number;
  className?: string;
}

export function RelatedConcepts({ conceptId, limit = 5, className = '' }: RelatedConceptsProps) {
  const { data: related, isLoading, error } = useRelatedConcepts(conceptId, limit);

  if (isLoading) {
    return (
      <div className={`p-6 rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}>
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="text-blue-600 dark:text-blue-400" size={24} />
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Related Concepts
          </h3>
        </div>
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !related || related.length === 0) {
    return null;
  }

  return (
    <aside 
      className={`p-6 rounded-lg border border-gray-200 dark:border-gray-700 
                    bg-gradient-to-br from-blue-50 to-indigo-50 
                    dark:from-gray-800 dark:to-gray-900 ${className}`}
      aria-label="Related concepts"
    >
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="text-blue-600 dark:text-blue-400" size={24} weight="fill" aria-hidden="true" />
        <h2 className="font-semibold text-gray-900 dark:text-white">
          Related Concepts
        </h2>
        <Sparkle className="text-yellow-500 ml-auto" size={16} weight="fill" aria-hidden="true" />
      </div>

      <nav aria-label="Related concept links">
        <ul className="space-y-3">
        {related.map((concept) => (
          <li key={concept.id}>
          <Link
            to={`/concepts/${concept.id}`}
            className="block p-3 rounded-lg bg-white dark:bg-gray-800 
                       hover:shadow-md transition-all group
                       border border-transparent hover:border-blue-200 dark:hover:border-blue-800
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                       dark:focus:ring-offset-gray-800"
            aria-label={`${concept.title} - ${concept.difficulty} level`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 dark:text-white 
                               group-hover:text-blue-600 dark:group-hover:text-blue-400 
                               transition-colors mb-1">
                  {concept.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                  {concept.description}
                </p>
                
                {/* Difficulty Badge */}
                <div className="mt-2">
                  <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium
                    ${concept.difficulty === 'beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : ''}
                    ${concept.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : ''}
                    ${concept.difficulty === 'advanced' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : ''}
                  `}>
                    {concept.difficulty}
                  </span>
                </div>
              </div>
              <ArrowRight 
                className="ml-2 text-gray-400 group-hover:text-blue-600 
                           dark:group-hover:text-blue-400 transition-all flex-shrink-0
                           group-hover:translate-x-1" 
                size={18}
                aria-hidden="true"
              />
            </div>
          </Link>
          </li>
        ))}
        </ul>
      </nav>

      {/* Footer Hint */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          AI-powered recommendations based on semantic similarity
        </p>
      </div>
    </aside>
  );
}
