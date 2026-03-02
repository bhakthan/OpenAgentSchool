/**
 * BlogManagementTab — Admin-only blog post creation & management.
 * Creates posts stored in localStorage via blogPosts helpers.
 */

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  getAllBlogPosts,
  getUserCreatedPosts,
  addBlogPost,
  deleteBlogPost,
  type BlogPost,
} from '@/lib/data/blogPosts';

/* ── Helpers ──────────────────────────────────────── */

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function estimateReadTime(body: string): string {
  const words = body.split(/\s+/).length;
  const mins = Math.max(1, Math.ceil(words / 200));
  return `${mins} min read`;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

/* ── Create Form ──────────────────────────────────── */

interface FormState {
  title: string;
  subtitle: string;
  excerpt: string;
  heroImage: string;
  heroImageAlt: string;
  tags: string;
  body: string;
  featured: boolean;
  cardSize: 'normal' | 'tall' | 'wide';
}

const EMPTY_FORM: FormState = {
  title: '',
  subtitle: '',
  excerpt: '',
  heroImage: '',
  heroImageAlt: '',
  tags: '',
  body: '',
  featured: false,
  cardSize: 'normal',
};

const BlogCreateForm: React.FC<{ onCreated: () => void }> = ({ onCreated }) => {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  const set = useCallback(
    <K extends keyof FormState>(key: K, value: FormState[K]) =>
      setForm((prev) => ({ ...prev, [key]: value })),
    [],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim() || !form.body.trim()) {
      toast.error('Title and body are required.');
      return;
    }

    const slug = slugify(form.title);
    if (getAllBlogPosts().some((p) => p.slug === slug)) {
      toast.error('A post with a similar title already exists. Choose a different title.');
      return;
    }

    const now = new Date().toISOString().slice(0, 10);

    const post: BlogPost = {
      slug,
      title: form.title.trim(),
      subtitle: form.subtitle.trim(),
      excerpt: form.excerpt.trim() || form.body.trim().slice(0, 140) + '…',
      heroImage: form.heroImage.trim() || '/images/concept_sphere.webp',
      heroImageAlt: form.heroImageAlt.trim() || form.title.trim(),
      author: 'Open Agent School',
      date: now,
      dateDisplay: formatDate(now),
      readTime: estimateReadTime(form.body),
      tags: form.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      featured: form.featured,
      cardSize: form.cardSize,
      body: form.body.trim(),
      isUserCreated: true,
    };

    addBlogPost(post);
    toast.success(`Published "${post.title}"`);
    setForm(EMPTY_FORM);
    onCreated();
  };

  const inputCls =
    'w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">Title *</label>
        <input
          className={inputCls}
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
          placeholder="e.g. Building Production Agents"
        />
      </div>

      {/* Subtitle */}
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">Subtitle</label>
        <input
          className={inputCls}
          value={form.subtitle}
          onChange={(e) => set('subtitle', e.target.value)}
          placeholder="A short tagline"
        />
      </div>

      {/* Excerpt */}
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">Excerpt</label>
        <input
          className={inputCls}
          value={form.excerpt}
          onChange={(e) => set('excerpt', e.target.value)}
          placeholder="Auto-generated from body if blank"
        />
      </div>

      {/* Hero image */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Hero Image URL</label>
          <input
            className={inputCls}
            value={form.heroImage}
            onChange={(e) => set('heroImage', e.target.value)}
            placeholder="/images/concept_sphere.webp"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Image Alt Text</label>
          <input
            className={inputCls}
            value={form.heroImageAlt}
            onChange={(e) => set('heroImageAlt', e.target.value)}
            placeholder="Descriptive alt text"
          />
        </div>
      </div>

      {/* Tags + card size */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Tags (comma-separated)</label>
          <input
            className={inputCls}
            value={form.tags}
            onChange={(e) => set('tags', e.target.value)}
            placeholder="AI, Agents, Learning"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Card Size</label>
          <select
            className={inputCls}
            value={form.cardSize}
            onChange={(e) => set('cardSize', e.target.value as FormState['cardSize'])}
          >
            <option value="normal">Normal</option>
            <option value="tall">Tall (featured)</option>
            <option value="wide">Wide</option>
          </select>
        </div>
      </div>

      {/* Featured toggle */}
      <label className="flex items-center gap-2 text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => set('featured', e.target.checked)}
          className="rounded border-border"
        />
        Featured post
      </label>

      {/* Body */}
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">
          Body (Markdown) *
        </label>
        <Textarea
          className="min-h-[220px] font-mono text-sm"
          value={form.body}
          onChange={(e) => set('body', e.target.value)}
          placeholder={'## Introduction\n\nWrite your post in Markdown…'}
        />
      </div>

      <Button type="submit" className="w-full">
        Publish Post
      </Button>
    </form>
  );
};

/* ── Post List ────────────────────────────────────── */

const PostList: React.FC<{ posts: BlogPost[]; onDelete: (slug: string) => void }> = ({
  posts,
  onDelete,
}) => {
  if (posts.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-6 text-center">
        No admin-created posts yet. Use the form above to publish your first article.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <div
          key={post.slug}
          className="flex items-center justify-between gap-4 rounded-lg border border-border px-4 py-3"
        >
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{post.title}</p>
            <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
              <span>{post.dateDisplay}</span>
              <span>·</span>
              <span>{post.readTime}</span>
              {post.featured && <Badge variant="secondary" className="text-[9px] px-1.5">Featured</Badge>}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`/blog/${post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline"
            >
              View
            </a>
            {post.isUserCreated && (
              <Button
                size="sm"
                variant="ghost"
                className="text-destructive hover:text-destructive h-7 px-2 text-xs"
                onClick={() => {
                  if (window.confirm(`Delete "${post.title}"? This cannot be undone.`)) {
                    onDelete(post.slug);
                  }
                }}
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ── Tab Root ─────────────────────────────────────── */

export const BlogManagementTab: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const allPosts = getAllBlogPosts();
  const userPosts = getUserCreatedPosts();

  const handleRefresh = useCallback(() => setRefreshKey((k) => k + 1), []);

  const handleDelete = useCallback(
    (slug: string) => {
      deleteBlogPost(slug);
      toast.success('Post deleted');
      handleRefresh();
    },
    [handleRefresh],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2" key={refreshKey}>
      {/* Create */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Create Post</CardTitle>
          <CardDescription>Publish a new blog article. Markdown supported for the body.</CardDescription>
        </CardHeader>
        <CardContent>
          <BlogCreateForm onCreated={handleRefresh} />
        </CardContent>
      </Card>

      {/* Manage */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            All Posts{' '}
            <Badge variant="outline" className="ml-2 text-xs">
              {allPosts.length}
            </Badge>
          </CardTitle>
          <CardDescription>
            {userPosts.length} admin-created · {allPosts.length - userPosts.length} seed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PostList posts={allPosts} onDelete={handleDelete} />
        </CardContent>
      </Card>
    </div>
  );
};
