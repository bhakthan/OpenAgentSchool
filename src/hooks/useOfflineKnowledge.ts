import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { conceptsCache, searchCache } from '@/lib/db';
import { useOnlineStatus } from './useNetworkStatus';
import type { Concept } from '@/services/api/knowledge';

/**
 * Enhanced knowledge hook with offline-first caching
 * Falls back to IndexedDB when offline
 */

export function useOfflineConceptSearch(query: string, limit = 10) {
  const isOnline = useOnlineStatus();
  
  return useQuery({
    queryKey: ['knowledge', 'search', query, 'offline'],
    queryFn: async () => {
      // Try cache first (even when online for instant results)
      const cached = await searchCache.get(query);
      
      if (!isOnline && cached) {
        // Offline: return cached results
        const concepts = await Promise.all(
          cached.slice(0, limit).map(id => conceptsCache.get(id))
        );
        return concepts.filter(Boolean);
      }

      // Online: fetch from API and update cache
      // This would integrate with your existing useConceptSearch
      // For now, return empty array as placeholder
      return [];
    },
    enabled: query.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useOfflineConcept(id: string) {
  const isOnline = useOnlineStatus();
  
  return useQuery({
    queryKey: ['knowledge', 'concept', id, 'offline'],
    queryFn: async () => {
      // Try cache first
      const cached = await conceptsCache.get(id);
      
      if (!isOnline && cached) {
        // Offline: return cached concept
        return cached;
      }

      // Online: fetch from API (would integrate with existing hook)
      // For now, return cached or null
      return cached || null;
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook to cache concepts for offline use
 */
export function useCacheConcept() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (concept: Concept) => {
      await conceptsCache.set({
        id: concept.id,
        title: concept.title,
        description: concept.description,
        category: concept.category,
        tags: concept.tags || [],
        content: concept.content,
        objectives: concept.learning_objectives
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['knowledge', 'offline'] });
    }
  });
}

/**
 * Hook to get offline cache stats
 */
export function useOfflineCacheStats() {
  return useQuery({
    queryKey: ['cache', 'stats'],
    queryFn: async () => {
      const [concepts, searches] = await Promise.all([
        conceptsCache.getAll(),
        searchCache.get('__all__') // Placeholder
      ]);
      
      return {
        conceptCount: concepts.length,
        totalSize: concepts.reduce((acc, c) => {
          return acc + (c.content?.length || 0) + c.description.length;
        }, 0),
        oldestCache: concepts.length > 0 
          ? Math.min(...concepts.map(c => c.cachedAt))
          : null,
        newestCache: concepts.length > 0
          ? Math.max(...concepts.map(c => c.cachedAt))
          : null
      };
    },
    staleTime: 30 * 1000 // 30 seconds
  });
}
