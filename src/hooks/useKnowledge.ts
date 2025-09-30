import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { knowledgeAPI } from '@/services/api';
import type { Concept, SearchResult } from '@/services/api/knowledge';
import {
  MOCK_CONCEPTS,
  searchConcepts as mockSearchConcepts,
  getConceptById as mockGetConceptById,
  getRelatedConcepts as mockGetRelatedConcepts,
  getConceptsByCategory as mockGetConceptsByCategory,
  type MockConcept
} from '@/data/mockConcepts';
import { conceptsCache, searchCache } from '@/lib/db';

// 🔧 TEMPORARY: Use mock data until Knowledge Service concept endpoints are ready
// Set to false to test real API (currently returns empty results)
const USE_MOCK_DATA = true;

// Helper to convert MockConcept to Concept
const mockConceptToApiConcept = (mockConcept: MockConcept): Concept => ({
  id: mockConcept.id,
  title: mockConcept.title,
  description: mockConcept.description,
  category: mockConcept.category,
  difficulty: mockConcept.difficulty,
  tags: mockConcept.tags,
  learning_objectives: mockConcept.learning_objectives,
  content: mockConcept.content,
  prerequisites: mockConcept.prerequisites,
  related_concepts: [], // Will be populated by getRelatedConcepts
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
});

// Query Keys
export const knowledgeKeys = {
  all: ['knowledge'] as const,
  search: (query: string) => [...knowledgeKeys.all, 'search', query] as const,
  concept: (id: string) => [...knowledgeKeys.all, 'concept', id] as const,
  related: (id: string) => [...knowledgeKeys.all, 'related', id] as const,
  category: (category: string) => [...knowledgeKeys.all, 'category', category] as const,
  prerequisites: (id: string) => [...knowledgeKeys.all, 'prerequisites', id] as const,
  health: () => [...knowledgeKeys.all, 'health'] as const,
};

/**
 * Semantic Search Hook
 * Searches concepts using vector similarity
 * Auto-caches results for offline access
 */
export function useConceptSearch(query: string, limit = 10) {
  return useQuery({
    queryKey: knowledgeKeys.search(query),
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        // Use mock data - return array directly to match API
        const mockResults = mockSearchConcepts(query);
        const results = mockResults.map(r => ({
          concept: mockConceptToApiConcept(r.concept),
          score: r.similarity,
          highlights: [],
          similarity: r.similarity
        }));
        
        // Cache concepts and search result IDs for offline access
        const conceptIds: string[] = [];
        for (const result of results) {
          await conceptsCache.set(result.concept);
          conceptIds.push(result.concept.id);
        }
        await searchCache.set(query, conceptIds);
        
        return results;
      }
      
      // Real API call
      const results = await knowledgeAPI.searchConcepts({ query, limit });
      
      // Cache concepts and search result IDs for offline access
      const conceptIds: string[] = [];
      for (const result of results) {
        await conceptsCache.set(result.concept);
        conceptIds.push(result.concept.id);
      }
      await searchCache.set(query, conceptIds);
      
      return results;
    },
    enabled: query.length > 2, // Only search if query is 3+ chars
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // Only retry once for searches
    // Use cached data when offline
    placeholderData: (previousData) => previousData,
  });
}

/**
 * Get Single Concept by ID
 * Auto-caches for offline access
 */
export function useConceptById(id: string) {
  return useQuery({
    queryKey: knowledgeKeys.concept(id),
    queryFn: async () => {
      // Try cache first when offline
      const cached = await conceptsCache.get(id);
      
      if (USE_MOCK_DATA) {
        const mockConcept = mockGetConceptById(id);
        if (!mockConcept) throw new Error('Concept not found');
        const concept = mockConceptToApiConcept(mockConcept);
        
        // Cache the concept
        await conceptsCache.set(concept);
        
        return concept;
      }
      
      // Real API call
      const concept = await knowledgeAPI.getConcept(id);
      
      // Cache the concept
      await conceptsCache.set(concept);
      
      return concept;
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    // Use cached data when offline
    placeholderData: (previousData) => previousData,
  });
}

/**
 * Get Related Concepts
 * Returns concepts similar to the given concept
 */
export function useRelatedConcepts(conceptId: string, limit = 5) {
  return useQuery({
    queryKey: knowledgeKeys.related(conceptId),
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        const related = mockGetRelatedConcepts(conceptId, limit);
        return related.map(mockConceptToApiConcept);
      }
      return knowledgeAPI.getRelatedConcepts(conceptId, limit);
    },
    enabled: !!conceptId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });
}

/**
 * Get Concepts by Category
 */
export function useConceptsByCategory(category: string) {
  return useQuery({
    queryKey: knowledgeKeys.category(category),
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        const mockConceptsFiltered = mockGetConceptsByCategory(category);
        return mockConceptsFiltered.map(mockConceptToApiConcept);
      }
      return knowledgeAPI.getConceptsByCategory(category);
    },
    enabled: !!category,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}

/**
 * Get Concept Prerequisites
 * Returns concepts that should be learned before this one
 */
export function useConceptPrerequisites(conceptId: string) {
  return useQuery({
    queryKey: knowledgeKeys.prerequisites(conceptId),
    queryFn: () => knowledgeAPI.getPrerequisites(conceptId),
    enabled: !!conceptId,
    staleTime: 15 * 60 * 1000,
  });
}

/**
 * Knowledge Service Health Check
 */
export function useKnowledgeHealth() {
  return useQuery({
    queryKey: knowledgeKeys.health(),
    queryFn: () => knowledgeAPI.healthCheck(),
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // Refresh every minute
    retry: 2,
  });
}

/**
 * Create New Concept (Admin)
 */
export function useCreateConcept() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (concept: Parameters<typeof knowledgeAPI.createConcept>[0]) => 
      knowledgeAPI.createConcept(concept),
    onSuccess: () => {
      // Invalidate all concept queries to refresh
      queryClient.invalidateQueries({ queryKey: knowledgeKeys.all });
    },
  });
}

/**
 * Update Concept (Admin)
 */
export function useUpdateConcept() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: Parameters<typeof knowledgeAPI.updateConcept>[0]) =>
      knowledgeAPI.updateConcept(request),
    onSuccess: (_, variables) => {
      // Invalidate specific concept and all related queries
      queryClient.invalidateQueries({ queryKey: knowledgeKeys.concept(variables.id) });
      queryClient.invalidateQueries({ queryKey: knowledgeKeys.related(variables.id) });
    },
  });
}

/**
 * Delete Concept (Admin)
 */
export function useDeleteConcept() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => knowledgeAPI.deleteConcept(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: knowledgeKeys.all });
    },
  });
}
