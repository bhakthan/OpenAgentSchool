/**
 * Bookmarks Migration Hook
 * Syncs localStorage bookmarks to backend after login
 */

import { useEffect, useRef } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { bookmarksAPI, type BookmarkResponse } from '@/services/api/bookmarks';
import { bookmarkManager, type Bookmark } from '@/lib/bookmarks';
import { toast } from 'sonner';

const MIGRATION_SYNCED_KEY = 'bookmarks_migration_synced';

/**
 * Check if migration already completed
 */
function isMigrationComplete(): boolean {
  return localStorage.getItem(MIGRATION_SYNCED_KEY) === 'true';
}

/**
 * Mark migration as complete
 */
function markMigrationComplete() {
  localStorage.setItem(MIGRATION_SYNCED_KEY, 'true');
}

/**
 * Convert backend BookmarkResponse to local Bookmark format
 */
function convertToLocalBookmark(serverBookmark: BookmarkResponse): Bookmark {
  return {
    id: serverBookmark.id,
    type: serverBookmark.type,
    title: serverBookmark.title,
    description: serverBookmark.description,
    url: serverBookmark.url,
    tags: serverBookmark.tags || [],
    timestamp: new Date(serverBookmark.created_at).getTime(),
  };
}

/**
 * Hook to automatically sync localStorage bookmarks to backend on login
 */
export function useBookmarksMigration() {
  const { isAuthenticated, user } = useAuth();
  const hasSyncedRef = useRef(false);

  useEffect(() => {
    // Only run once per session when user logs in
    if (!isAuthenticated || !user || hasSyncedRef.current) {
      return;
    }

    // Check if migration already completed previously
    if (isMigrationComplete()) {
      hasSyncedRef.current = true;
      return;
    }

    // Extract localStorage bookmarks
    const localBookmarks = bookmarkManager.getAll();

    // Nothing to sync
    if (localBookmarks.length === 0) {
      markMigrationComplete();
      hasSyncedRef.current = true;
      return;
    }

    // Sync to backend
    const syncBookmarks = async () => {
      try {
        const result = await bookmarksAPI.sync(localBookmarks);
        
        if (result.synced > 0 || result.conflicts > 0) {
          const totalSynced = result.synced + result.conflicts;
          toast.success(`✅ Synced ${totalSynced} bookmark${totalSynced > 1 ? 's' : ''} to your account!`, {
            description: result.conflicts > 0 
              ? `${result.conflicts} conflict${result.conflicts > 1 ? 's' : ''} resolved using server data.`
              : 'Your bookmarks are now saved across all devices.',
            duration: 5000,
          });
        }

        // Replace localStorage with server bookmarks (source of truth)
        bookmarkManager.clear();
        result.server_bookmarks.forEach(serverBookmark => {
          const localBookmark = convertToLocalBookmark(serverBookmark);
          bookmarkManager.add(localBookmark);
        });

        markMigrationComplete();
        hasSyncedRef.current = true;
      } catch (error) {
        console.error('Failed to sync bookmarks:', error);
        toast.error('Failed to sync bookmarks', {
          description: 'Your local bookmarks are safe. We\'ll try again next time.',
        });
      }
    };

    // Delay sync slightly to let auth fully initialize
    const timer = setTimeout(syncBookmarks, 1000);
    return () => clearTimeout(timer);
  }, [isAuthenticated, user]);
}

/**
 * Manual sync trigger (for settings page or manual migration)
 */
export async function manualSyncBookmarks(): Promise<void> {
  const localBookmarks = bookmarkManager.getAll();

  if (localBookmarks.length === 0) {
    toast.info('No local bookmarks to sync');
    return;
  }

  try {
    const result = await bookmarksAPI.sync(localBookmarks);
    
    const totalSynced = result.synced + result.conflicts;
    if (totalSynced > 0) {
      toast.success(`✅ Synced ${totalSynced} bookmark${totalSynced > 1 ? 's' : ''}!`);
      
      // Replace localStorage with server bookmarks
      bookmarkManager.clear();
      result.server_bookmarks.forEach(serverBookmark => {
        const localBookmark = convertToLocalBookmark(serverBookmark);
        bookmarkManager.add(localBookmark);
      });
      
      markMigrationComplete();
    }
  } catch (error) {
    console.error('Failed to sync bookmarks:', error);
    toast.error('Failed to sync bookmarks');
    throw error;
  }
}
