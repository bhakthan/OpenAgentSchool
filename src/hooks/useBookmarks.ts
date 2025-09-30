import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookmarksAPI } from '@/services/api/bookmarks';
import { bookmarkManager, Bookmark } from '@/lib/bookmarks';
import { useAuth } from '@/lib/auth/AuthContext';
import { toast } from 'sonner';

export const bookmarkKeys = {
  all: ['bookmarks'] as const,
  user: (userId: string) => [...bookmarkKeys.all, 'user', userId] as const,
  local: () => [...bookmarkKeys.all, 'local'] as const,
};

/**
 * Get user bookmarks (from backend if logged in, local storage otherwise)
 */
export function useBookmarks() {
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: user ? bookmarkKeys.user(user.id) : bookmarkKeys.local(),
    queryFn: async () => {
      if (isAuthenticated && user) {
        // Fetch from backend
        const remoteBookmarks = await bookmarksAPI.getAll();
        
        // Convert to local format
        return remoteBookmarks.map(b => ({
          id: b.id,
          type: b.type,
          title: b.title,
          description: b.description,
          url: b.url,
          tags: b.tags,
          timestamp: new Date(b.created_at).getTime(),
        }));
      } else {
        // Use local storage
        return bookmarkManager.getAll();
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Add a bookmark
 */
export function useAddBookmark() {
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookmark: Omit<Bookmark, 'timestamp'>) => {
      if (isAuthenticated && user) {
        // Save to backend
        return await bookmarksAPI.create(bookmark);
      } else {
        // Save locally
        bookmarkManager.add(bookmark);
        return bookmark;
      }
    },
    onSuccess: () => {
      // Invalidate queries
      if (user) {
        queryClient.invalidateQueries({ queryKey: bookmarkKeys.user(user.id) });
      } else {
        queryClient.invalidateQueries({ queryKey: bookmarkKeys.local() });
      }
      toast.success('Bookmark added');
    },
    onError: (error) => {
      toast.error('Failed to add bookmark');
      console.error(error);
    },
  });
}

/**
 * Remove a bookmark
 */
export function useRemoveBookmark() {
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (isAuthenticated && user) {
        // Remove from backend
        await bookmarksAPI.delete(id);
      } else {
        // Remove locally
        bookmarkManager.remove(id);
      }
    },
    onSuccess: () => {
      if (user) {
        queryClient.invalidateQueries({ queryKey: bookmarkKeys.user(user.id) });
      } else {
        queryClient.invalidateQueries({ queryKey: bookmarkKeys.local() });
      }
      toast.success('Bookmark removed');
    },
    onError: (error) => {
      toast.error('Failed to remove bookmark');
      console.error(error);
    },
  });
}

/**
 * Sync local bookmarks with backend
 * Called automatically on login
 */
export function useSyncBookmarks() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async () => {
      const localBookmarks = bookmarkManager.getAll();
      
      if (localBookmarks.length === 0) {
        return { synced: 0, conflicts: 0, total: 0, server_bookmarks: [] };
      }

      // Sync with backend
      const result = await bookmarksAPI.sync(localBookmarks);
      
      // Clear local storage after successful sync
      // (backend is now source of truth)
      bookmarkManager.clear();
      
      return result;
    },
    onSuccess: (result) => {
      if (user) {
        queryClient.invalidateQueries({ queryKey: bookmarkKeys.user(user.id) });
      }
      
      if (result.synced > 0) {
        toast.success(`Synced ${result.synced} bookmark${result.synced > 1 ? 's' : ''}`);
      }
      
      if (result.conflicts > 0) {
        toast.info(`Resolved ${result.conflicts} conflict${result.conflicts > 1 ? 's' : ''}`);
      }
    },
    onError: (error) => {
      toast.error('Failed to sync bookmarks');
      console.error(error);
    },
  });
}

/**
 * Check if a concept/pattern/skill is bookmarked
 */
export function useIsBookmarked(id: string) {
  const { data: bookmarks } = useBookmarks();
  return bookmarks?.some(b => b.id === id) || false;
}
