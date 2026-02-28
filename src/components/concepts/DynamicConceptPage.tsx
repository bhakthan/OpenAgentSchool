/**
 * DynamicConceptPage — renders DB-driven content for a given slug.
 *
 * Fetches structured content blocks from the backend and renders:
 *   - markdown  → react-markdown
 *   - code      → <pre><code> with language class
 *   - tabs      → Radix UI Tabs
 *   - interactive → placeholder
 */

import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import {
  getContentItem,
  type ContentBlock,
  type ContentItem,
} from '@/lib/api/content';

interface DynamicConceptPageProps {
  slug: string;
  type?: string;
}

/* ------------------------------------------------------------------ */
/*  Block renderers                                                    */
/* ------------------------------------------------------------------ */

function MarkdownBlock({ content }: { content: string }) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <Markdown>{content}</Markdown>
    </div>
  );
}

function CodeBlock({
  content,
  language,
}: {
  content: string;
  language?: string;
}) {
  return (
    <pre className="rounded-lg bg-slate-900 p-4 overflow-x-auto text-sm leading-relaxed">
      <code className={language ? `language-${language}` : ''}>
        {content}
      </code>
    </pre>
  );
}

function TabsBlock({ tabs }: { tabs: { label: string; content: string }[] }) {
  if (!tabs || tabs.length === 0) return null;
  return (
    <Tabs defaultValue={tabs[0].label} className="w-full">
      <TabsList>
        {tabs.map((t) => (
          <TabsTrigger key={t.label} value={t.label}>
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((t) => (
        <TabsContent key={t.label} value={t.label}>
          <div className="prose prose-slate dark:prose-invert max-w-none pt-2">
            <Markdown>{t.content}</Markdown>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}

function InteractiveBlock() {
  return (
    <div className="rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 dark:border-blue-700 dark:bg-blue-950/30 p-6 text-center text-sm text-blue-600 dark:text-blue-400">
      Interactive component — coming soon
    </div>
  );
}

function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'markdown':
      return <MarkdownBlock content={block.content ?? ''} />;
    case 'code':
      return <CodeBlock content={block.content ?? ''} language={block.language} />;
    case 'tabs':
      return <TabsBlock tabs={block.tabs ?? []} />;
    case 'interactive':
      return <InteractiveBlock />;
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/*  Loading skeleton                                                   */
/* ------------------------------------------------------------------ */

function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in">
      <Skeleton className="h-10 w-3/4" />
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function DynamicConceptPage({
  slug,
  type = 'concept',
}: DynamicConceptPageProps) {
  const [item, setItem] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    getContentItem(slug, type)
      .then((data) => {
        if (!cancelled) setItem(data);
      })
      .catch(() => {
        if (!cancelled) setError('not_found');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug, type]);

  if (loading) return <LoadingSkeleton />;

  if (error || !item) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300">
          Content coming soon
        </h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          We&apos;re working on this content. Check back shortly!
        </p>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-4xl space-y-8 px-4 py-8">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {item.title}
        </h1>
        {item.description && (
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
            {item.description}
          </p>
        )}
        <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
            {item.type}
          </span>
          <span>v{item.version}</span>
          {item.metadata?.level && (
            <span className="capitalize">{String(item.metadata.level)}</span>
          )}
        </div>
      </header>

      {/* Body blocks */}
      <div className="space-y-6">
        {item.body.map((block, idx) => (
          <ContentBlockRenderer key={idx} block={block} />
        ))}
      </div>
    </article>
  );
}
