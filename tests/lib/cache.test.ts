import { describe, it, expect, beforeEach, vi } from 'vitest';
import SimpleCache, { apiCache } from '@/lib/cache';

describe('SimpleCache', () => {
  let cache: SimpleCache;

  beforeEach(() => {
    cache = new SimpleCache(5); // Small cache for testing
  });

  describe('set and get', () => {
    it('should store and retrieve data', () => {
      cache.set('key1', { data: 'test' });
      const result = cache.get('key1');
      
      expect(result).toEqual({ data: 'test' });
    });

    it('should return null for non-existent key', () => {
      const result = cache.get('non-existent');
      expect(result).toBeNull();
    });

    it('should handle different data types', () => {
      cache.set('string', 'hello');
      cache.set('number', 42);
      cache.set('array', [1, 2, 3]);
      cache.set('object', { foo: 'bar' });

      expect(cache.get('string')).toBe('hello');
      expect(cache.get('number')).toBe(42);
      expect(cache.get('array')).toEqual([1, 2, 3]);
      expect(cache.get('object')).toEqual({ foo: 'bar' });
    });
  });

  describe('TTL (Time To Live)', () => {
    it('should return null for expired entries', () => {
      const shortTTL = 10; // 10ms
      cache.set('expiring', 'data', shortTTL);

      // Immediately available
      expect(cache.get('expiring')).toBe('data');

      // Wait for expiration
      return new Promise((resolve) => {
        setTimeout(() => {
          expect(cache.get('expiring')).toBeNull();
          resolve(undefined);
        }, shortTTL + 5);
      });
    });

    it('should use default TTL of 5 minutes', () => {
      cache.set('default-ttl', 'data');
      const entry = (cache as any).cache.get('default-ttl');
      
      expect(entry.ttl).toBe(5 * 60 * 1000); // 5 minutes
    });

    it('should allow custom TTL', () => {
      const customTTL = 10000; // 10 seconds
      cache.set('custom-ttl', 'data', customTTL);
      const entry = (cache as any).cache.get('custom-ttl');
      
      expect(entry.ttl).toBe(customTTL);
    });
  });

  describe('LRU eviction', () => {
    it('should evict oldest entry when cache is full', () => {
      // Fill cache to max (5)
      cache.set('key1', 'data1');
      cache.set('key2', 'data2');
      cache.set('key3', 'data3');
      cache.set('key4', 'data4');
      cache.set('key5', 'data5');

      expect(cache.size()).toBe(5);
      expect(cache.get('key1')).toBe('data1'); // key1 exists

      // Add 6th entry, should evict key1 (oldest)
      cache.set('key6', 'data6');

      expect(cache.size()).toBe(5);
      expect(cache.get('key1')).toBeNull(); // key1 evicted
      expect(cache.get('key6')).toBe('data6'); // key6 added
    });
  });

  describe('has', () => {
    it('should return true for existing keys', () => {
      cache.set('exists', 'data');
      expect(cache.has('exists')).toBe(true);
    });

    it('should return false for non-existent keys', () => {
      expect(cache.has('missing')).toBe(false);
    });

    it('should return false for expired keys', () => {
      cache.set('expired', 'data', 10); // 10ms TTL
      
      return new Promise((resolve) => {
        setTimeout(() => {
          expect(cache.has('expired')).toBe(false);
          resolve(undefined);
        }, 15);
      });
    });
  });

  describe('delete', () => {
    it('should remove entry from cache', () => {
      cache.set('to-delete', 'data');
      expect(cache.get('to-delete')).toBe('data');

      const deleted = cache.delete('to-delete');
      expect(deleted).toBe(true);
      expect(cache.get('to-delete')).toBeNull();
    });

    it('should return false when deleting non-existent key', () => {
      const deleted = cache.delete('non-existent');
      expect(deleted).toBe(false);
    });
  });

  describe('clear', () => {
    it('should remove all entries', () => {
      cache.set('key1', 'data1');
      cache.set('key2', 'data2');
      cache.set('key3', 'data3');

      expect(cache.size()).toBe(3);

      cache.clear();

      expect(cache.size()).toBe(0);
      expect(cache.get('key1')).toBeNull();
      expect(cache.get('key2')).toBeNull();
      expect(cache.get('key3')).toBeNull();
    });
  });

  describe('purgeExpired', () => {
    it('should remove only expired entries', async () => {
      cache.set('fresh1', 'data1', 10000); // 10 seconds
      cache.set('fresh2', 'data2', 10000);
      cache.set('stale1', 'data3', 10); // 10ms (will expire)
      cache.set('stale2', 'data4', 10);

      expect(cache.size()).toBe(4);

      // Wait for stale entries to expire
      await new Promise(resolve => setTimeout(resolve, 15));

      const purged = cache.purgeExpired();

      expect(purged).toBe(2); // 2 stale entries removed
      expect(cache.size()).toBe(2); // 2 fresh entries remain
      expect(cache.get('fresh1')).toBe('data1');
      expect(cache.get('fresh2')).toBe('data2');
      expect(cache.get('stale1')).toBeNull();
      expect(cache.get('stale2')).toBeNull();
    });
  });
});

describe('apiCache singleton', () => {
  beforeEach(() => {
    apiCache.clear();
  });

  it('should be pre-configured with max size 100', () => {
    expect((apiCache as any).maxSize).toBe(100);
  });

  it('should be shared across imports', () => {
    apiCache.set('shared', 'data');
    expect(apiCache.get('shared')).toBe('data');
  });
});
