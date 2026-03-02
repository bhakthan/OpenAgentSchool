import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getBlogPost } from '@/lib/data/blogPosts';
import { Badge } from '@/components/ui/badge';

/* ────────────────────────────────────────────────────
   Individual Blog Post Page (slug-routed)
   ────────────────────────────────────────────────────*/

/* ── Full JSX content per slug ───────────────────── */
const POST_CONTENT: Record<string, React.FC> = {
  'the-10-minute-edge': TheTenMinuteEdge,
};

/* ── Page Shell ─────────────────────────────────── */
const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;

  if (!post) return <Navigate to="/blog" replace />;

  const Content = POST_CONTENT[post.slug];

  return (
    <article className="min-h-[80vh]">
      {/* Hero */}
      <header className="relative isolate overflow-hidden">
        <img
          src={post.heroImage}
          alt={post.heroImageAlt}
          className="absolute inset-0 -z-10 h-full w-full object-cover brightness-[.35]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/60 to-transparent" />

        <div className="container mx-auto px-4 pt-28 pb-14 md:pt-36 md:pb-20 max-w-3xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white transition-colors mb-6"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            All Posts
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-white/10 text-white/80 border-white/20 text-[10px] uppercase tracking-wider"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.1]">
            {post.title}
          </h1>
          <p className="mt-3 text-lg text-white/70 font-medium">{post.subtitle}</p>

          <div className="mt-6 flex items-center gap-4 text-sm text-white/60">
            <span>{post.author}</span>
            <span aria-hidden="true">·</span>
            <span>{post.dateDisplay}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {post.readTime}
            </span>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto py-10 md:py-16 text-foreground">
          {Content ? (
            <Content />
          ) : post.body ? (
            <MarkdownBody body={post.body} />
          ) : (
            <p className="text-muted-foreground">Content coming soon.</p>
          )}
        </div>
      </div>
    </article>
  );
};

export default BlogPostPage;

/* ────────────────────────────────────────────────────
   Markdown renderer for admin-created posts
   Simple parser: ## headings, **bold**, *italic*, - lists, > blockquotes, paragraphs
   ────────────────────────────────────────────────────*/
function MarkdownBody({ body }: { body: string }) {
  const lines = body.split('\n');
  const elements: React.ReactNode[] = [];
  let key = 0;

  const inline = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    // bold then italic
    const regex = /\*\*(.+?)\*\*|\*(.+?)\*|__(.+?)__|_(.+?)_/g;
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = regex.exec(text)) !== null) {
      if (m.index > last) parts.push(text.slice(last, m.index));
      if (m[1] || m[3]) parts.push(<strong key={m.index}>{m[1] || m[3]}</strong>);
      else if (m[2] || m[4]) parts.push(<em key={m.index}>{m[2] || m[4]}</em>);
      last = regex.lastIndex;
    }
    if (last < text.length) parts.push(text.slice(last));
    return parts;
  };

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // blank
    if (!line.trim()) { i++; continue; }

    // headings
    if (line.startsWith('### ')) {
      elements.push(<h3 key={key++} className="text-lg font-bold mt-8 mb-3 tracking-tight text-foreground">{inline(line.slice(4))}</h3>);
      i++; continue;
    }
    if (line.startsWith('## ')) {
      elements.push(<h2 key={key++} className="text-2xl font-bold mt-12 mb-4 tracking-tight text-foreground">{inline(line.slice(3))}</h2>);
      i++; continue;
    }
    if (line.startsWith('# ')) {
      elements.push(<h1 key={key++} className="text-3xl font-extrabold mt-12 mb-4 tracking-tight text-foreground">{inline(line.slice(2))}</h1>);
      i++; continue;
    }

    // blockquote
    if (line.startsWith('> ')) {
      const bqLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('> ')) {
        bqLines.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <blockquote key={key++} className="border-l-4 border-primary bg-primary/5 py-4 px-6 rounded-r-lg my-4 text-muted-foreground italic">
          {bqLines.map((l, j) => <p key={j}>{inline(l)}</p>)}
        </blockquote>,
      );
      continue;
    }

    // unordered list
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const items: string[] = [];
      while (i < lines.length && (/^[-*] /.test(lines[i]))) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={key++} className="list-disc pl-6 space-y-1 my-4 text-muted-foreground">
          {items.map((item, j) => <li key={j}>{inline(item)}</li>)}
        </ul>,
      );
      continue;
    }

    // paragraph (collect consecutive non-special lines)
    const pLines: string[] = [];
    while (i < lines.length && lines[i].trim() && !lines[i].startsWith('#') && !lines[i].startsWith('>') && !lines[i].startsWith('- ') && !lines[i].startsWith('* ')) {
      pLines.push(lines[i]);
      i++;
    }
    elements.push(<p key={key++} className="leading-[1.8] text-muted-foreground my-3">{inline(pLines.join(' '))}</p>);
  }

  return (
    <div className="prose max-w-none">
      {elements}
    </div>
  );
}

/* ────────────────────────────────────────────────────
   Full blog content: The 10-Minute Edge
   ────────────────────────────────────────────────────*/
function TheTenMinuteEdge() {
  return (
    <div className="prose max-w-none">

      {/* ── Section 1 ──────────────────────────── */}
      <h2>The Problem Nobody Talks About</h2>
      <p>AI moves faster than anyone can study.</p>
      <p>
        Last month alone: three new agent frameworks shipped, two protocols got major upgrades, and the best practices
        you memorized in January became yesterday's patterns by February. The people falling behind aren't lazy — they're
        drowning in a firehose of knowledge that was never designed to be absorbed by a human brain.
      </p>
      <p>
        Here's the uncomfortable truth: <strong>the traditional way we learn technology is broken for the AI era.</strong>
      </p>
      <p>
        Hour-long tutorials go stale before you finish them. Documentation assumes you have context you don't.
        Conference talks give you inspiration but not retention. And that 40-tab browser session? Your brain checked out
        twenty tabs ago.
      </p>
      <p>
        We needed a different approach. Not a better course. A better <em>rhythm.</em>
      </p>

      {/* ── Section 2 ──────────────────────────── */}
      <h2>Micro-Learning: Small Bites, Deep Roots</h2>
      <p>
        The science is clear — and it's been clear for decades. The human brain doesn't learn in marathons. It learns in
        focused bursts, followed by rest, followed by retrieval.
      </p>
      <p>
        <strong>Micro-learning is education redesigned around how your brain actually works.</strong>
      </p>
      <p>
        At Open Agent School, every AI agent concept is broken into capsules — focused 10-minute sessions that follow a
        five-stage rhythm:
      </p>

      <blockquote>
        <strong>Learn → Quiz → Apply → Reflect → Expand</strong>
      </blockquote>

      <p>
        You don't sit through a lecture. You encounter an idea, test your understanding immediately, apply it to
        something real, think about what surprised you, and then connect it to what you already know.
      </p>
      <p>
        This isn't dumbed-down learning. It's <em>compressed</em> learning. The same rigor, stripped of the filler.
      </p>

      <h3>Why It Works</h3>
      <p>
        <strong>Spaced repetition</strong> schedules your reviews right before you'd forget — turning short-term
        exposure into long-term knowledge. <strong>Adaptive difficulty</strong> means you're never bored by things
        you've mastered or crushed by things you haven't reached yet. And <strong>daily streaks</strong> turn
        learning from a chore into a habit.
      </p>
      <p>
        Ten minutes a day. That's one coffee break. One commute segment. One waiting room.
      </p>
      <p>
        And after 30 days? You've covered more ground — with better retention — than most people get from a weekend
        bootcamp.
      </p>

      {/* ── Section 3 ──────────────────────────── */}
      <h2>Just-In-Time Learning: The Right Knowledge at the Right Moment</h2>
      <p>
        But here's the thing about micro-learning: it's structured. It follows tracks. It assumes you don't know what
        you need yet.
      </p>
      <p>
        Sometimes you <em>do</em> know. Sometimes you're in the middle of building something and you need an answer{' '}
        <em>now</em> — not tomorrow's capsule, not next week's module. Now.
      </p>
      <p>
        That's where <strong>just-in-time learning</strong> changes the game.
      </p>
      <p>
        The idea is simple: instead of learning everything in advance and hoping you remember it when it matters,
        you learn <em>at the moment of need.</em> The knowledge arrives precisely when your brain is most primed to
        absorb it — because you have an immediate, real reason to use it.
      </p>
      <p>
        This isn't Googling. Googling gives you ten blue links and leaves you to sort signal from noise. Just-in-time
        learning is <strong>curated, contextual, and conversational.</strong>
      </p>

      {/* ── Section 4 ──────────────────────────── */}
      <h2>ConceptSphere: Where Micro-Learning Meets Just-In-Time</h2>
      <p>This is where it comes together.</p>
      <p>
        <strong>ConceptSphere</strong> is our AI-powered knowledge engine that sits at the intersection of structured
        learning and spontaneous curiosity. Think of it as a constellation of knowledge — every AI agent concept is a
        sphere, and your questions draw invisible lines between them.
      </p>

      <p>You can approach any topic from <strong>eight different angles:</strong></p>

      <ul>
        <li><strong>Explain</strong> — Break it down simply, at my level</li>
        <li><strong>Quiz</strong> — Test what I think I know</li>
        <li><strong>Expand</strong> — Show me what's adjacent to this idea</li>
        <li><strong>Debate</strong> — Give me the counter-arguments</li>
        <li><strong>Latest</strong> — What happened with this in the last week?</li>
        <li><strong>Analogy</strong> — Help me understand through something I already know</li>
        <li><strong>Code</strong> — Show me working implementation</li>
        <li><strong>Custom</strong> — I'll ask my own question</li>
      </ul>

      <p>
        And here's what makes it different from a chatbot:{' '}
        <strong>every answer is grounded in live web search.</strong> ConceptSphere doesn't just generate from
        training data — it reaches out to the open web, pulls in current sources, and builds its response on real,
        verifiable information.
      </p>
      <p>Your LLM. Your search engine. Your keys. Everything stays on your device.</p>

      {/* ── Section 5 ──────────────────────────── */}
      <h2>The Compound Effect</h2>
      <p>
        Alone, micro-learning builds habits. Alone, just-in-time learning solves problems. Together, they create
        something more powerful: <strong>a learning rhythm that compounds.</strong>
      </p>
      <p>
        Your daily capsules build a lattice of foundational knowledge. ConceptSphere fills in the gaps the instant they
        appear. Spaced repetition ensures nothing falls through the cracks.
      </p>
      <p>
        Over weeks, something remarkable happens. You stop feeling behind. Not because the AI world slowed down — it
        didn't. But because your <em>relationship</em> with new knowledge changed. You went from trying to drink the
        firehose to sipping from a curated stream, exactly when you're thirsty.
      </p>
      <p>
        <strong>
          The fastest learners in AI aren't the ones studying the most. They're the ones who built the right rhythm.
        </strong>
      </p>
      <p>Ten minutes a day. Any question, any time. Knowledge that sticks.</p>
      <p>That's the edge.</p>

      {/* ── CTA ────────────────────────────────── */}
      <div className="not-prose mt-14 p-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-violet-500/5 text-center">
        <p className="text-xl font-bold text-foreground mb-2">
          Ready to build your rhythm?
        </p>
        <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
          Start your micro-learning journey today — 10 minutes is all it takes.
        </p>
        <Link
          to="/micro-learning"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg hover:brightness-110 transition-all"
        >
          Start Micro-Learning
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
