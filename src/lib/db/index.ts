import Dexie, { Table } from 'dexie';

export interface CachedConcept {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  content?: string;
  objectives?: string[];
  cachedAt: number;
  lastAccessed: number;
}

export interface PendingBookmark {
  id: string;
  conceptId: string;
  userId: string;
  notes?: string;
  createdAt: number;
  synced: boolean;
}

export interface CachedSearch {
  query: string;
  results: string[];
  timestamp: number;
}

export interface UserPreference {
  key: string;
  value: string;
  updatedAt: number;
}

class OpenAgentSchoolDB extends Dexie {
  concepts!: Table<CachedConcept, string>;
  bookmarks!: Table<PendingBookmark, string>;
  searches!: Table<CachedSearch, string>;
  preferences!: Table<UserPreference, string>;

  constructor() {
    super('OpenAgentSchoolDB');
    
    this.version(1).stores({
      concepts: 'id, category, *tags, cachedAt, lastAccessed',
      bookmarks: 'id, conceptId, userId, synced, createdAt',
      searches: 'query, timestamp',
      preferences: 'key, updatedAt'
    });
  }
}

export const db = new OpenAgentSchoolDB();

// Database helper functions
export const conceptsCache = {
  // Add or update a concept in cache
  async set(concept: Omit<CachedConcept, 'cachedAt' | 'lastAccessed'>): Promise<void> {
    const now = Date.now();
    await db.concepts.put({
      ...concept,
      cachedAt: now,
      lastAccessed: now
    });
  },

  // Get a concept from cache
  async get(id: string): Promise<CachedConcept | undefined> {
    const concept = await db.concepts.get(id);
    if (concept) {
      // Update last accessed time
      await db.concepts.update(id, { lastAccessed: Date.now() });
    }
    return concept;
  },

  // Get all concepts
  async getAll(): Promise<CachedConcept[]> {
    return await db.concepts.toArray();
  },

  // Search concepts by tag
  async getByTag(tag: string): Promise<CachedConcept[]> {
    return await db.concepts.where('tags').equals(tag).toArray();
  },

  // Search concepts by category
  async getByCategory(category: string): Promise<CachedConcept[]> {
    return await db.concepts.where('category').equals(category).toArray();
  },

  // Clear old cache entries (older than 7 days)
  async clearOld(maxAge: number = 7 * 24 * 60 * 60 * 1000): Promise<number> {
    const cutoff = Date.now() - maxAge;
    return await db.concepts.where('lastAccessed').below(cutoff).delete();
  },

  // Clear all cached concepts
  async clear(): Promise<void> {
    await db.concepts.clear();
  }
};

export const bookmarksQueue = {
  // Add a pending bookmark to sync queue
  async add(bookmark: Omit<PendingBookmark, 'id' | 'synced' | 'createdAt'>): Promise<string> {
    const id = `bookmark_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await db.bookmarks.add({
      ...bookmark,
      id,
      synced: false,
      createdAt: Date.now()
    });
    return id;
  },

  // Get all pending (unsynced) bookmarks
  async getPending(): Promise<PendingBookmark[]> {
    return await db.bookmarks.where('synced').equals(0).toArray();
  },

  // Mark bookmark as synced
  async markSynced(id: string): Promise<void> {
    await db.bookmarks.update(id, { synced: true });
  },

  // Remove synced bookmarks older than 30 days
  async cleanupSynced(): Promise<number> {
    const cutoff = Date.now() - (30 * 24 * 60 * 60 * 1000);
    return await db.bookmarks
      .where('synced').equals(1)
      .and(b => b.createdAt < cutoff)
      .delete();
  },

  // Get all bookmarks
  async getAll(): Promise<PendingBookmark[]> {
    return await db.bookmarks.toArray();
  },

  // Clear all bookmarks
  async clear(): Promise<void> {
    await db.bookmarks.clear();
  }
};

export const searchCache = {
  // Cache search results
  async set(query: string, results: string[]): Promise<void> {
    await db.searches.put({
      query: query.toLowerCase(),
      results,
      timestamp: Date.now()
    });
  },

  // Get cached search results
  async get(query: string): Promise<string[] | undefined> {
    const cached = await db.searches.get(query.toLowerCase());
    if (!cached) return undefined;
    
    // Return results if less than 1 hour old
    const maxAge = 60 * 60 * 1000; // 1 hour
    if (Date.now() - cached.timestamp < maxAge) {
      return cached.results;
    }
    
    // Clean up old entry
    await db.searches.delete(query.toLowerCase());
    return undefined;
  },

  // Clear old search cache (older than 1 day)
  async clearOld(): Promise<number> {
    const cutoff = Date.now() - (24 * 60 * 60 * 1000);
    return await db.searches.where('timestamp').below(cutoff).delete();
  },

  // Clear all searches
  async clear(): Promise<void> {
    await db.searches.clear();
  }
};

export const preferences = {
  // Set a preference
  async set(key: string, value: string): Promise<void> {
    await db.preferences.put({
      key,
      value,
      updatedAt: Date.now()
    });
  },

  // Get a preference
  async get(key: string): Promise<string | undefined> {
    const pref = await db.preferences.get(key);
    return pref?.value;
  },

  // Get all preferences
  async getAll(): Promise<Record<string, string>> {
    const prefs = await db.preferences.toArray();
    return prefs.reduce((acc, p) => {
      acc[p.key] = p.value;
      return acc;
    }, {} as Record<string, string>);
  },

  // Delete a preference
  async delete(key: string): Promise<void> {
    await db.preferences.delete(key);
  },

  // Clear all preferences
  async clear(): Promise<void> {
    await db.preferences.clear();
  }
};

// Initialize database and handle upgrades
export async function initializeDB(): Promise<void> {
  try {
    await db.open();
    console.log('IndexedDB initialized successfully');
    
    // Clean up old data on initialization
    await Promise.all([
      conceptsCache.clearOld(),
      bookmarksQueue.cleanupSynced(),
      searchCache.clearOld()
    ]);
  } catch (error) {
    console.error('Failed to initialize IndexedDB:', error);
  }
}

// Export database info for debugging
export async function getDatabaseInfo(): Promise<{
  conceptsCount: number;
  bookmarksCount: number;
  pendingBookmarks: number;
  searchesCount: number;
  preferencesCount: number;
  estimatedSize?: number;
}> {
  const [conceptsCount, bookmarksCount, pendingBookmarks, searchesCount, preferencesCount] = await Promise.all([
    db.concepts.count(),
    db.bookmarks.count(),
    db.bookmarks.where('synced').equals(0).count(),
    db.searches.count(),
    db.preferences.count()
  ]);

  let estimatedSize: number | undefined;
  if ('estimate' in navigator.storage) {
    const estimate = await navigator.storage.estimate();
    estimatedSize = estimate.usage;
  }

  return {
    conceptsCount,
    bookmarksCount,
    pendingBookmarks,
    searchesCount,
    preferencesCount,
    estimatedSize
  };
}

// Clear all data (for testing or user request)
export async function clearAllData(): Promise<void> {
  await Promise.all([
    conceptsCache.clear(),
    bookmarksQueue.clear(),
    searchCache.clear(),
    preferences.clear()
  ]);
}
