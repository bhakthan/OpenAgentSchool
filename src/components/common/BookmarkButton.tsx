/**
 * Bookmark Button Component
 * Toggleable bookmark button with visual feedback
 */

import { useState, useEffect } from 'react';
import { Bookmark, BookmarkSimple } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { bookmarkManager, Bookmark as BookmarkType } from '@/lib/bookmarks';
import { toast } from 'sonner';
import { trackEvent } from '@/lib/analytics/ga';
import { useAuth } from '@/lib/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const MAX_GUEST_BOOKMARKS = 5; // Allow 5 bookmarks before requiring auth

interface BookmarkButtonProps {
  id: string;
  type: BookmarkType['type'];
  title: string;
  description?: string;
  url: string;
  tags?: string[];
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showLabel?: boolean;
  className?: string;
}

export function BookmarkButton({
  id,
  type,
  title,
  description,
  url,
  tags,
  variant = 'ghost',
  size = 'icon',
  showLabel = false,
  className = '',
}: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsBookmarked(bookmarkManager.has(id));
  }, [id]);

  const handleToggle = () => {
    if (isBookmarked) {
      const removed = bookmarkManager.remove(id);
      if (removed) {
        setIsBookmarked(false);
        toast.success('Bookmark removed');
        
        trackEvent({
          action: 'bookmark_removed',
          category: 'engagement',
          label: title,
          bookmark_type: type,
        });
      }
    } else {
      // Check if user has reached guest limit
      const currentBookmarks = bookmarkManager.getAll();
      if (!isAuthenticated && currentBookmarks.length >= MAX_GUEST_BOOKMARKS) {
        // Show auth prompt
        toast.warning('Sign in to save more bookmarks', {
          description: `You've reached the guest limit of ${MAX_GUEST_BOOKMARKS} bookmarks. Sign in to save unlimited bookmarks across all your devices!`,
          duration: 7000,
          action: {
            label: 'Sign In',
            onClick: () => {
              trackEvent({
                action: 'bookmark_limit_auth_prompt',
                category: 'auth',
                label: 'bookmarks_full',
              });
              navigate(`/auth?return=${encodeURIComponent(url)}`);
            },
          },
        });
        
        trackEvent({
          action: 'bookmark_limit_reached',
          category: 'engagement',
          value: currentBookmarks.length,
        });
        
        return; // Don't add bookmark
      }
      
      const added = bookmarkManager.add({
        id,
        type,
        title,
        description,
        url,
        tags,
      });
      
      if (added) {
        setIsBookmarked(true);
        toast.success('Bookmarked!');
        
        trackEvent({
          action: 'bookmark_added',
          category: 'engagement',
          label: title,
          bookmark_type: type,
        });
      }
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggle}
      className={className}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
      title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      {isBookmarked ? (
        <Bookmark weight="fill" className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
      ) : (
        <BookmarkSimple weight="regular" className="w-5 h-5" />
      )}
      {showLabel && (
        <span className="ml-2">
          {isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </span>
      )}
    </Button>
  );
}
