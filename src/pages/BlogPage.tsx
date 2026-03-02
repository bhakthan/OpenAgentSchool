import React from 'react';
import { Link } from 'react-router-dom';
import { getAllBlogPosts, type BlogPost } from '@/lib/data/blogPosts';
import { Badge } from '@/components/ui/badge';

/* ────────────────────────────────────────────────────
   Masonry Blog Landing Page
   ────────────────────────────────────────────────────*/

const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  const isTall = post.cardSize === 'tall';

  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm
        hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1
        ${isTall ? 'md:row-span-2' : ''}`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${isTall ? 'aspect-[4/3]' : 'aspect-video'}`}>
        <img
          src={post.heroImage}
          alt={post.heroImageAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {/* Featured badge */}
        {post.featured && (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 text-white border-0 text-[10px] uppercase tracking-wider">
            Featured
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 md:p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70 bg-muted px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h2 className="text-lg md:text-xl font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
          {post.title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground font-medium leading-snug">
          {post.subtitle}
        </p>

        {/* Excerpt */}
        <p className="mt-3 text-sm text-muted-foreground/80 leading-relaxed line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
          <span>{post.dateDisplay}</span>
          <span className="flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {post.readTime}
          </span>
        </div>
      </div>
    </Link>
  );
};

/* ── Placeholder slot for future posts ──────────── */
const ComingSoonCard: React.FC<{ index: number }> = ({ index }) => {
  const prompts = [
    { emoji: '🏗️', title: 'Building Production Agents', sub: 'Patterns that survive real traffic' },
    { emoji: '🧪', title: 'The Science of Retention', sub: 'Why spaced repetition actually works' },
    { emoji: '🌐', title: 'Search-Augmented Generation', sub: 'Grounding AI answers in the live web' },
    { emoji: '🤖', title: 'From Chatbot to Agent', sub: 'The tool-use revolution explained' },
    { emoji: '🎯', title: 'Adaptive Learning Engines', sub: 'How difficulty curves shape mastery' },
  ];
  const p = prompts[index % prompts.length];

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-muted/30 p-8 text-center min-h-[220px]">
      <span className="text-3xl mb-3" aria-hidden="true">{p.emoji}</span>
      <h3 className="font-semibold text-foreground/70 text-sm">{p.title}</h3>
      <p className="text-xs text-muted-foreground mt-1">{p.sub}</p>
      <Badge variant="outline" className="mt-3 text-[10px]">Coming Soon</Badge>
    </div>
  );
};

/* ── Main Page ──────────────────────────────────── */
const BlogPage: React.FC = () => {
  return (
    <div className="min-h-[80vh]">
      {/* Header */}
      <header className="border-b border-border bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 py-12 md:py-16 text-center">
          <Badge variant="secondary" className="mb-3 text-xs px-3 py-1">Insights & Ideas</Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            The Agent School Blog
          </h1>
          <p className="mt-3 max-w-xl mx-auto text-base text-muted-foreground leading-relaxed">
            Thinking, patterns, and lessons from the frontier of AI agent education.
          </p>
        </div>
      </header>

      {/* Masonry Grid */}
      <section className="container mx-auto px-4 py-10 md:py-14">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance] space-y-5">
          {/* Real posts */}
          {getAllBlogPosts().map((post) => (
            <div key={post.slug} className="break-inside-avoid">
              <BlogCard post={post} />
            </div>
          ))}

          {/* Coming-soon placeholders */}
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={`soon-${i}`} className="break-inside-avoid">
              <ComingSoonCard index={i} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
