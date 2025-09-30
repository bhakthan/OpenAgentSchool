import { apiClient } from './client';
import type { Bookmark } from '@/lib/bookmarks';

export interface BookmarkResponse {
  id: string;
  user_id: number;
  type: 'concept' | 'pattern' | 'skill';
  title: string;
  description?: string;
  url: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface SyncResponse {
  synced: number;
  conflicts: number;
  total: number;
  server_bookmarks: BookmarkResponse[];
}

export const bookmarksAPI = {
  /**
   * Get all user bookmarks from backend
   */
  async getAll(): Promise<BookmarkResponse[]> {
    return await apiClient.get<BookmarkResponse[]>('/bookmarks');
  },

  /**
   * Create a new bookmark
   */
  async create(bookmark: Omit<Bookmark, 'timestamp'>): Promise<BookmarkResponse> {
    return await apiClient.post<BookmarkResponse>('/bookmarks', bookmark);
  },

  /**
   * Delete a bookmark
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete<void>(`/bookmarks/${id}`);
  },

  /**
   * Sync local bookmarks with backend
   * Merges local and remote, handles conflicts
   * Returns all server bookmarks after sync
   */
  async sync(localBookmarks: Bookmark[]): Promise<SyncResponse> {
    return await apiClient.post<SyncResponse>('/bookmarks/sync', {
      bookmarks: localBookmarks.map(b => ({
        id: b.id,
        type: b.type,
        title: b.title,
        description: b.description,
        url: b.url,
        tags: b.tags || [],
      })),
    });
  },
};
