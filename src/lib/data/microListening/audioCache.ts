// ─── Audio Blob Cache (IndexedDB) ────────────────────────────────────────────
// Caches TTS-generated audio blobs in IndexedDB so episodes don't need to be
// re-synthesised on every listen.

import type { ListeningLevel } from './types';

const DB_NAME = 'oas-micro-listening-audio';
const STORE_NAME = 'audio-blobs';
const DB_VERSION = 1;
const MAX_CACHE_SIZE_MB = 200;

// ─── Database ────────────────────────────────────────────────────────────────

/**
 * Opens (or creates) the IndexedDB database for audio blob caching.
 */
export function openAudioCacheDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// ─── CRUD ────────────────────────────────────────────────────────────────────

/**
 * Retrieves a cached audio blob by key, or undefined on miss/error.
 */
export async function getCachedAudio(key: string): Promise<Blob | undefined> {
  try {
    const db = await openAudioCacheDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(key);

      request.onsuccess = () => {
        const result = request.result;
        resolve(result instanceof Blob ? result : undefined);
      };
      request.onerror = () => resolve(undefined);
    });
  } catch {
    return undefined;
  }
}

/**
 * Stores an audio blob in the cache. Silently fails on error.
 */
export async function cacheAudio(key: string, blob: Blob): Promise<void> {
  try {
    // Check size budget before caching
    const currentSize = await getCacheSize();
    if (currentSize + blob.size > MAX_CACHE_SIZE_MB * 1024 * 1024) {
      // Over budget — don't cache (caller can implement eviction if needed)
      return;
    }

    const db = await openAudioCacheDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.put(blob, key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch {
    // Cache write failure — degrade silently
  }
}

/**
 * Removes a specific cached audio entry.
 */
export async function removeCachedAudio(key: string): Promise<void> {
  try {
    const db = await openAudioCacheDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.delete(key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch {
    // ignore
  }
}

/**
 * Clears all cached audio blobs.
 */
export async function clearAudioCache(): Promise<void> {
  try {
    const db = await openAudioCacheDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch {
    // ignore
  }
}

// ─── Size ────────────────────────────────────────────────────────────────────

/**
 * Returns the total size in bytes of all cached audio entries.
 */
export async function getCacheSize(): Promise<number> {
  try {
    const db = await openAudioCacheDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.openCursor();
      let totalSize = 0;

      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor) {
          const value = cursor.value;
          if (value instanceof Blob) {
            totalSize += value.size;
          }
          cursor.continue();
        } else {
          resolve(totalSize);
        }
      };

      request.onerror = () => resolve(0);
    });
  } catch {
    return 0;
  }
}

// ─── Key Builder ─────────────────────────────────────────────────────────────

/**
 * Creates a deterministic cache key from episode ID, level, and optional voice ID.
 * Format: `${episodeId}:${level}:${voiceId || 'default'}`
 */
export function buildCacheKey(
  episodeId: string,
  level: ListeningLevel,
  voiceId?: string,
): string {
  return `${episodeId}:${level}:${voiceId || 'default'}`;
}
