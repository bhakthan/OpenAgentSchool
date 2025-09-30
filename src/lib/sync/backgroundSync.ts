import { bookmarksQueue } from '../db';

// Background sync for bookmarks when online
export async function syncPendingBookmarks(): Promise<void> {
  if (!navigator.onLine) {
    console.log('Offline - skipping bookmark sync');
    return;
  }

  try {
    const pending = await bookmarksQueue.getPending();
    
    if (pending.length === 0) {
      console.log('No pending bookmarks to sync');
      return;
    }

    console.log(`Syncing ${pending.length} pending bookmarks...`);

    for (const bookmark of pending) {
      try {
        // Try to sync with backend
        const response = await fetch('/api/v1/bookmarks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            conceptId: bookmark.conceptId,
            notes: bookmark.notes,
          }),
        });

        if (response.ok) {
          // Mark as synced
          await bookmarksQueue.markSynced(bookmark.id);
          console.log(`Bookmark ${bookmark.id} synced successfully`);
        } else {
          console.warn(`Failed to sync bookmark ${bookmark.id}:`, response.statusText);
        }
      } catch (error) {
        console.error(`Error syncing bookmark ${bookmark.id}:`, error);
        // Don't mark as synced - will retry later
      }
    }

    // Cleanup old synced bookmarks
    await bookmarksQueue.cleanupSynced();
    
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Register for periodic background sync (if supported)
export async function registerBackgroundSync(): Promise<void> {
  if ('serviceWorker' in navigator && 'sync' in ServiceWorkerRegistration.prototype) {
    try {
      const registration = await navigator.serviceWorker.ready;
      await (registration as any).sync.register('sync-bookmarks');
      console.log('Background sync registered');
    } catch (error) {
      console.warn('Background sync registration failed:', error);
      // Fallback to interval-based sync
      setupIntervalSync();
    }
  } else {
    console.log('Background sync not supported, using interval-based sync');
    setupIntervalSync();
  }
}

// Fallback: interval-based sync
function setupIntervalSync(): void {
  // Sync every 5 minutes when online
  setInterval(() => {
    if (navigator.onLine) {
      syncPendingBookmarks();
    }
  }, 5 * 60 * 1000);

  // Also sync when coming back online
  window.addEventListener('online', () => {
    console.log('Back online - syncing bookmarks');
    syncPendingBookmarks();
  });
}

// Manual trigger for sync
export async function triggerSync(): Promise<void> {
  await syncPendingBookmarks();
}
