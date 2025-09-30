/**
 * Bookmark Management System
 * LocalStorage-based bookmark manager for concepts and patterns
 */

export interface Bookmark {
  id: string;
  type: 'concept' | 'pattern' | 'skill';
  title: string;
  description?: string;
  url: string;
  timestamp: number;
  tags?: string[];
}

const STORAGE_KEY = 'openagentschool_bookmarks';

export class BookmarkManager {
  private bookmarks: Map<string, Bookmark>;

  constructor() {
    this.bookmarks = new Map();
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    if (typeof window === 'undefined') return;
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Bookmark[];
        this.bookmarks = new Map(parsed.map(b => [b.id, b]));
      }
    } catch (error) {
      console.error('Failed to load bookmarks:', error);
    }
  }

  private saveToStorage(): void {
    if (typeof window === 'undefined') return;
    
    try {
      const bookmarksArray = Array.from(this.bookmarks.values());
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarksArray));
    } catch (error) {
      console.error('Failed to save bookmarks:', error);
    }
  }

  add(bookmark: Omit<Bookmark, 'timestamp'>): boolean {
    if (this.bookmarks.has(bookmark.id)) {
      return false; // Already bookmarked
    }

    this.bookmarks.set(bookmark.id, {
      ...bookmark,
      timestamp: Date.now(),
    });
    
    this.saveToStorage();
    return true;
  }

  remove(id: string): boolean {
    const deleted = this.bookmarks.delete(id);
    if (deleted) {
      this.saveToStorage();
    }
    return deleted;
  }

  has(id: string): boolean {
    return this.bookmarks.has(id);
  }

  get(id: string): Bookmark | undefined {
    return this.bookmarks.get(id);
  }

  getAll(): Bookmark[] {
    return Array.from(this.bookmarks.values())
      .sort((a, b) => b.timestamp - a.timestamp); // Most recent first
  }

  getAllByType(type: Bookmark['type']): Bookmark[] {
    return this.getAll().filter(b => b.type === type);
  }

  search(query: string): Bookmark[] {
    const lowerQuery = query.toLowerCase();
    return this.getAll().filter(b => 
      b.title.toLowerCase().includes(lowerQuery) ||
      b.description?.toLowerCase().includes(lowerQuery) ||
      b.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  clear(): void {
    this.bookmarks.clear();
    this.saveToStorage();
  }

  export(): string {
    return JSON.stringify(this.getAll(), null, 2);
  }

  import(json: string): number {
    try {
      const bookmarks = JSON.parse(json) as Bookmark[];
      let imported = 0;
      
      bookmarks.forEach(bookmark => {
        if (!this.bookmarks.has(bookmark.id)) {
          this.bookmarks.set(bookmark.id, bookmark);
          imported++;
        }
      });
      
      if (imported > 0) {
        this.saveToStorage();
      }
      
      return imported;
    } catch (error) {
      console.error('Failed to import bookmarks:', error);
      return 0;
    }
  }
}

// Singleton instance
export const bookmarkManager = new BookmarkManager();
