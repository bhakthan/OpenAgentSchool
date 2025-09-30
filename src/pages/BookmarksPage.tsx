/**
 * Bookmarks Page
 * View and manage all bookmarked items
 */

import { useState, useEffect } from 'react';
import { bookmarkManager, Bookmark } from '@/lib/bookmarks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { BookmarkSimple, Trash, MagnifyingGlass, Download, Upload, X } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { trackEvent } from '@/lib/analytics/ga';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'concept' | 'pattern' | 'skill'>('all');

  const loadBookmarks = () => {
    setBookmarks(bookmarkManager.getAll());
  };

  useEffect(() => {
    loadBookmarks();
  }, []);

  const handleRemove = (id: string, title: string) => {
    bookmarkManager.remove(id);
    loadBookmarks();
    toast.success('Bookmark removed');
    
    trackEvent({
      action: 'bookmark_removed',
      category: 'engagement',
      label: title,
    });
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to remove all bookmarks?')) {
      bookmarkManager.clear();
      loadBookmarks();
      toast.success('All bookmarks cleared');
      
      trackEvent({
        action: 'bookmarks_cleared',
        category: 'engagement',
      });
    }
  };

  const handleExport = () => {
    const json = bookmarkManager.export();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `openagentschool-bookmarks-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Bookmarks exported');
    
    trackEvent({
      action: 'bookmarks_exported',
      category: 'engagement',
      value: bookmarks.length,
    });
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = event.target?.result as string;
          const imported = bookmarkManager.import(json);
          loadBookmarks();
          toast.success(`Imported ${imported} new bookmarks`);
          
          trackEvent({
            action: 'bookmarks_imported',
            category: 'engagement',
            value: imported,
          });
        } catch (error) {
          toast.error('Failed to import bookmarks');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const filteredBookmarks = searchQuery
    ? bookmarkManager.search(searchQuery)
    : activeTab === 'all'
    ? bookmarks
    : bookmarkManager.getAllByType(activeTab as Bookmark['type']);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <BookmarkSimple weight="fill" className="text-indigo-600 dark:text-indigo-400" />
            My Bookmarks
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {bookmarks.length} saved {bookmarks.length === 1 ? 'item' : 'items'}
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleImport}>
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport} disabled={bookmarks.length === 0}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={handleClearAll} disabled={bookmarks.length === 0}>
            <Trash className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search bookmarks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All ({bookmarks.length})</TabsTrigger>
          <TabsTrigger value="concept">
            Concepts ({bookmarkManager.getAllByType('concept').length})
          </TabsTrigger>
          <TabsTrigger value="pattern">
            Patterns ({bookmarkManager.getAllByType('pattern').length})
          </TabsTrigger>
          <TabsTrigger value="skill">
            Skills ({bookmarkManager.getAllByType('skill').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {filteredBookmarks.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <BookmarkSimple className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                <h3 className="text-lg font-semibold mb-2">
                  {searchQuery ? 'No bookmarks found' : 'No bookmarks yet'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {searchQuery
                    ? 'Try a different search term'
                    : 'Start bookmarking concepts, patterns, and skills to save them here'}
                </p>
                {!searchQuery && (
                  <Button asChild>
                    <Link to="/">Explore Concepts</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredBookmarks.map((bookmark) => (
                <Card key={bookmark.id} className="group hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">
                          <Link
                            to={bookmark.url}
                            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                          >
                            {bookmark.title}
                          </Link>
                        </CardTitle>
                        {bookmark.description && (
                          <CardDescription className="line-clamp-2">
                            {bookmark.description}
                          </CardDescription>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemove(bookmark.id, bookmark.title)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="capitalize px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                        {bookmark.type}
                      </span>
                      <span>•</span>
                      <span>{new Date(bookmark.timestamp).toLocaleDateString()}</span>
                    </div>
                    {bookmark.tags && bookmark.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {bookmark.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
