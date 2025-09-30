import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { fetchContextSummary } from '@/lib/api/knowledge';
import { apiCache } from '@/lib/cache';
import type { SCLContextSummary } from '@/types/supercritical';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch as any;

describe('Knowledge API Client', () => {
  beforeEach(() => {
    apiCache.clear();
    mockFetch.mockClear();
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockSeeds = {
    conceptIds: ['concept1', 'concept2'],
    patternIds: ['pattern1'],
    practices: ['practice1']
  };

  const mockResponse: SCLContextSummary = {
    summary: 'Test summary',
    concepts: [],
    patterns: [],
    practices: []
  };

  describe('fetchContextSummary', () => {
    it('should fetch data from API on first call', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await fetchContextSummary(mockSeeds);

      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(console.log).toHaveBeenCalledWith('✅ Fetched and cached context summary');
    });

    it('should use cached data on subsequent calls', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockResponse
      });

      // First call - hits API
      await fetchContextSummary(mockSeeds);
      expect(mockFetch).toHaveBeenCalledTimes(1);

      // Second call - uses cache
      await fetchContextSummary(mockSeeds);
      expect(mockFetch).toHaveBeenCalledTimes(1); // Still 1!
      expect(console.log).toHaveBeenCalledWith('✅ Using cached context summary');
    });

    it('should create different cache keys for different seeds', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockResponse
      });

      const seeds1 = { conceptIds: ['a'], patternIds: [], practices: [] };
      const seeds2 = { conceptIds: ['b'], patternIds: [], practices: [] };

      await fetchContextSummary(seeds1);
      await fetchContextSummary(seeds2);

      // Different seeds = 2 API calls
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    it('should throw error on API failure', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        text: async () => 'Server error'
      });

      await expect(fetchContextSummary(mockSeeds))
        .rejects
        .toThrow('KnowledgeService error 500: Server error');
    });

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network failure'));

      await expect(fetchContextSummary(mockSeeds))
        .rejects
        .toThrow('Network failure');
    });

    it('should respect AbortSignal', async () => {
      const controller = new AbortController();
      
      mockFetch.mockImplementationOnce(() => {
        controller.abort();
        return Promise.reject(new Error('Aborted'));
      });

      await expect(fetchContextSummary(mockSeeds, controller.signal))
        .rejects
        .toThrow('Aborted');
    });

    it('should cache results for 5 minutes', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      await fetchContextSummary(mockSeeds);

      const cacheKey = `knowledge:context:${JSON.stringify(mockSeeds)}`;
      const entry = (apiCache as any).cache.get(cacheKey);

      expect(entry).toBeDefined();
      expect(entry.ttl).toBe(5 * 60 * 1000); // 5 minutes
    });
  });
});
