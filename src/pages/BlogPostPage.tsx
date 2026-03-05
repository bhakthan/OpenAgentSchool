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
  'micro-listening-daily-audio-learning': MicroListeningBlog,
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

/* ────────────────────────────────────────────────────
   Full blog content: Micro-Listening — Daily Audio Learning
   ────────────────────────────────────────────────────*/
function MicroListeningBlog() {
  return (
    <div className="prose max-w-none">

      {/* ── Section 1 ──────────────────────────── */}
      <h2>The Hard Truth About Knowledge Workers</h2>
      <p>You already know AI is moving fast. You already know you should be learning.</p>
      <p>
        But here's what nobody tells you: <strong>you don't have a knowledge problem — you have an access problem.</strong>
      </p>
      <p>
        The best educational content in the world doesn't help if it requires you to sit at a desk, open a browser, and
        carve out 45 minutes of undivided attention. That's not how most people's days work. Between meetings, commutes,
        errands, and the hundred small interruptions that define modern life, your most available time is your{' '}
        <em>in-between</em> time.
      </p>
      <p>That time was wasted. Until now.</p>

      {/* ── Section 2 ──────────────────────────── */}
      <h2>Introducing Micro-Listening</h2>

      <figure className="my-8">
        <img
          src="/images/micro_listening_hero.webp"
          alt="Micro-Listening feature overview — headphones over a glowing waveform of AI concept narration episodes"
          className="w-full rounded-2xl shadow-lg"
          loading="lazy"
        />
      </figure>

      <p>
        <strong>Micro-Listening</strong> is a new way to learn AI agent concepts — through short, focused audio episodes
        you can absorb while walking, commuting, cooking, or exercising.
      </p>
      <p>Think of it as a private podcast, curated for you, that gets smarter every day.</p>
      <p>Here's what makes it different from just listening to a tech podcast:</p>

      <ul>
        <li>
          <strong>Four depth levels per episode.</strong> Every topic has Beginner, Intermediate, Advanced, and Expert
          narrations. You pick the depth that matches where you are.
        </li>
        <li>
          <strong>Daily Mix.</strong> Each morning, an algorithm builds a personalized playlist based on what you've
          completed, what's due for reinforcement, and what's new in your learning path.
        </li>
        <li>
          <strong>Streaks and achievements.</strong> Daily listening streaks and unlockable achievements keep you coming
          back without guilt or friction.
        </li>
        <li>
          <strong>Smart recommendations.</strong> Finished an episode on Agent Architecture? The system surfaces related
          episodes on MCP, multi-agent orchestration, or evaluation.
        </li>
        <li>
          <strong>Offline-ready.</strong> Service worker caching means your episodes work on the subway, on a plane, or
          anywhere your signal drops.
        </li>
      </ul>

      {/* ── Section 3 ──────────────────────────── */}
      <h2>Why Audio? Why Now?</h2>
      <p>
        The research is unambiguous: <strong>dual-coding theory</strong> shows that combining auditory and visual learning
        creates stronger memory traces than either channel alone. But more practically, audio unlocks time that screens
        can't reach.
      </p>

      <blockquote>
        You have 20 minutes on your morning commute. You <em>could</em> pull up a tutorial on your phone, but the
        screen is small, you're jostled by the train, and you can't code along anyway. So you scroll social media instead.
      </blockquote>

      <p>
        With Micro-Listening, those 20 minutes become a focused learning session. Two or three episodes, each explaining
        a concept at the right level, narrated clearly, reinforced by the same spaced-repetition engine that powers our
        micro-learning capsules.
      </p>
      <p>
        <strong>
          Twenty minutes a day. Five days a week. That's 86 hours of structured AI education per year — from time you
          were already spending on nothing.
        </strong>
      </p>

      {/* ── Section 4 ──────────────────────────── */}
      <h2>How It Complements Micro-Learning</h2>
      <p>
        If you're already using our micro-learning tracks, Micro-Listening isn't a replacement — it's an accelerator.
      </p>
      <p>
        <strong>Micro-Learning</strong> gives you the read-quiz-apply-reflect cycle at your desk.{' '}
        <strong>Micro-Listening</strong> primes your brain during the gaps between desk sessions.
      </p>

      <ul>
        <li><strong>Morning commute</strong> — Listen to an episode on Agent Evaluation at Intermediate level.</li>
        <li><strong>Desk time</strong> — Do the micro-learning capsule quiz. Recall is faster because you heard the concepts two hours ago.</li>
        <li><strong>Lunch walk</strong> — Daily Mix surfaces a related Advanced episode on LLM-Judge Calibration.</li>
        <li><strong>Afternoon</strong> — In a design review, someone mentions evaluation benchmarks. You don't just recognize the term — you remember the tradeoffs.</li>
      </ul>

      <p>That's not studying harder. That's studying <em>through your day.</em></p>

      {/* ── Section 5 ──────────────────────────── */}
      <h2>What's In the Library</h2>
      <p>At launch, Micro-Listening spans six series categories covering the full Open Agent School curriculum:</p>

      <ul>
        <li><strong>Core Concepts</strong> — Agent architecture, reasoning patterns, memory systems, observability</li>
        <li><strong>Agent Patterns</strong> — ReAct, Chain-of-Thought, tool-calling flows, multi-agent coordination</li>
        <li><strong>Science Agents</strong> — Cross-domain data mining, AI factories, surrogate simulators</li>
        <li><strong>Science Factory</strong> — Ingest → Mine → Synthesize → Generate pipeline with specialised agents</li>
        <li><strong>Adoption Playbook</strong> — Pilot-to-production strategies, governance, organizational transformation</li>
        <li><strong>AI Skills</strong> — Hands-on LLM integration, prompt engineering, evaluation automation</li>
      </ul>

      {/* ── Section 6 ──────────────────────────── */}
      <h2>Built for Real Learners</h2>
      <p>
        We didn't build Micro-Listening because it was trendy. We built it because we watched what learners actually do:
      </p>

      <ul>
        <li>
          <strong>67% of active users</strong> access Open Agent School on mobile at least once per week — but spend less
          than 3 minutes per session, because screen-based learning on a phone is uncomfortable.
        </li>
        <li>
          <strong>The top-requested feature</strong> in our community survey was "something I can learn from while driving."
        </li>
        <li>
          <strong>Audio-assisted completion rates</strong> across the ed-tech industry are 40–60% higher than text-only
          equivalents at comparable depth.
        </li>
      </ul>

      <p>So we built a feature that meets learners where they are: in motion, hands-busy, but minds ready.</p>

      {/* ── CTA ──────────────────────────────── */}
      <div className="my-12 rounded-2xl bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 border border-violet-500/20 p-8 text-center">
        <h3 className="text-xl font-bold text-foreground mb-2">Try It Today</h3>
        <p className="text-muted-foreground mb-6">
          Micro-Listening is live now. No signup required. Pick a level. Press play. Your commute just became the most
          productive part of your day.
        </p>
        <Link
          to="/micro-listening"
          className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:brightness-110 transition-all"
        >
          Start Micro-Listening
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
