import React from 'react';
import { Link } from 'react-router-dom';
import { BookmarkSimple, ArrowRight, Lightbulb } from '@phosphor-icons/react';
import type { Concept } from '@/services/api/knowledge';

interface ConceptCardProps {
  concept: Concept;
  onBookmark?: (conceptId: string) => void;
  isBookmarked?: boolean;
  showFullDescription?: boolean;
}

export function ConceptCard({ 
  concept, 
  onBookmark, 
  isBookmarked = false,
  showFullDescription = false 
}: ConceptCardProps) {
  
  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onBookmark?.(concept.id);
  };

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    advanced: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <Link
      to={`/concepts/${concept.id}`}
      className="block p-6 rounded-lg border border-gray-200 dark:border-gray-700
                 hover:border-blue-500 dark:hover:border-blue-400
                 hover:shadow-lg transition-all
                 bg-white dark:bg-gray-800 group
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                 dark:focus:ring-offset-gray-900"
      aria-label={`View ${concept.title} concept`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb 
              className="text-blue-600 dark:text-blue-400 flex-shrink-0" 
              size={20} 
              weight="duotone"
            />
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white 
                           group-hover:text-blue-600 dark:group-hover:text-blue-400 
                           transition-colors">
              {concept.title}
            </h3>
          </div>
          
          {/* Category */}
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {concept.category}
          </div>
        </div>

        {/* Bookmark Button */}
        {onBookmark && (
          <button
            onClick={handleBookmarkClick}
            className={`p-2 rounded-lg transition-colors flex-shrink-0 min-h-[44px] min-w-[44px]
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              dark:focus:ring-offset-gray-800
              ${isBookmarked 
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400'
              }`}
            aria-label={isBookmarked ? `Remove ${concept.title} from bookmarks` : `Add ${concept.title} to bookmarks`}
            aria-pressed={isBookmarked}
          >
            <BookmarkSimple size={20} weight={isBookmarked ? 'fill' : 'regular'} />
          </button>
        )}
      </div>

      {/* Description */}
      <p className={`text-gray-600 dark:text-gray-300 mb-4 
        ${showFullDescription ? '' : 'line-clamp-3'}`}>
        {concept.description}
      </p>

      {/* Learning Objectives */}
      {concept.learning_objectives && concept.learning_objectives.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            You'll learn:
          </h4>
          <ul className="space-y-1">
            {concept.learning_objectives.slice(0, 3).map((objective, idx) => (
              <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">•</span>
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          {/* Difficulty Badge */}
          <span className={`px-2 py-1 text-xs rounded-full font-medium ${difficultyColors[concept.difficulty]}`}>
            {concept.difficulty}
          </span>

          {/* Tags */}
          {concept.tags && concept.tags.length > 0 && (
            <div className="flex gap-1">
              {concept.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs rounded-full bg-gray-100 
                             dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                >
                  {tag}
                </span>
              ))}
              {concept.tags.length > 2 && (
                <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
                  +{concept.tags.length - 2}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Arrow */}
        <ArrowRight 
          className="text-gray-400 group-hover:text-blue-500 
                     group-hover:translate-x-1 transition-all" 
          size={20} 
        />
      </div>
    </Link>
  );
}
