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
  'byte-sized-learning-agentic-era': ByteSizedAgenticEra,
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

/* ────────────────────────────────────────────────────
   Full blog content: Byte-Sized Learning in the Agentic Era
   ────────────────────────────────────────────────────*/
function ByteSizedAgenticEra() {
  return (
    <div className="prose max-w-none">

      {/* ── Lede ────────────────────────────────── */}
      <h2>The Problem No One Talks About</h2>
      <p>
        AI agents are being deployed faster than humans can learn to build them. New frameworks arrive weekly. Paradigms
        shift quarterly. The distance between <em>"I should learn this"</em> and <em>"I actually understand it"</em>
        keeps growing — not because the content doesn't exist, but because the <strong>format</strong> is broken.
      </p>
      <p>
        Hour-long video courses. 40-page whitepapers. Weekend bootcamps. They were designed for a world that moved
        slowly enough for you to sit down and catch up. That world is gone.
      </p>

      <blockquote>
        In the agentic era, the bottleneck isn't access to information — it's the gap between what you need to learn
        and the time you actually have.
      </blockquote>

      <p>
        Byte-sized learning closes that gap. Not by dumbing things down, but by <strong>restructuring knowledge into
        the smallest unit that still produces understanding.</strong>
      </p>

      {/* ── Section 1 ──────────────────────────── */}
      <h2>What "Byte-Sized" Actually Means</h2>
      <p>
        A byte-sized learning capsule isn't a shortened tutorial. It's a self-contained micro-module engineered around
        one insight, one skill, or one mental model — delivered in 3 to 7 minutes. Each capsule follows a four-beat
        rhythm:
      </p>

      <ol>
        <li>
          <strong>Read</strong> — A concise explanation of a single concept, stripped of filler. No "let me tell you
          about my journey" preamble. Just the idea, clearly.
        </li>
        <li>
          <strong>Quiz</strong> — An immediate knowledge check that forces active recall. Not multiple-choice busywork —
          questions designed to surface the edges of your understanding.
        </li>
        <li>
          <strong>Apply</strong> — A micro-exercise that connects the concept to a real scenario. "Given this agent
          architecture, where would you add a safety guardrail?" Not hypothetical — practical.
        </li>
        <li>
          <strong>Reflect</strong> — A Socratic prompt that pushes you past surface comprehension. "Why would this
          pattern fail at scale? What assumption does it depend on?"
        </li>
      </ol>

      <p>
        This isn't pedagogy by accident. It's built on decades of learning science — <strong>spaced repetition</strong>,{' '}
        <strong>retrieval practice</strong>, <strong>interleaving</strong>, and <strong>desirable difficulty</strong> — compressed
        into a format that fits between meetings.
      </p>

      {/* ── Section 2 ──────────────────────────── */}
      <h2>Why the Agentic Era Demands This</h2>
      <p>
        Agentic AI isn't a single technology — it's a stack of capabilities you need to understand simultaneously:
        reasoning architectures, tool orchestration, memory patterns, safety guardrails, evaluation frameworks,
        multi-agent coordination. Miss one layer and the whole picture is blurry.
      </p>
      <p>
        Traditional learning treats these as separate courses. You complete "Introduction to Agent Architecture" in
        week one, "Prompt Engineering" in week three, and by the time you reach "Multi-Agent Systems" in week eight,
        you've already forgotten the architecture primitives that make multi-agent work intelligible.
      </p>

      <p>
        Byte-sized learning solves this with <strong>interleaved progression</strong>. Instead of exhausting one topic
        before starting the next, capsules alternate across domains. Monday you learn a prompting pattern. Tuesday, an
        evaluation technique. Wednesday, an architecture primitive that connects the first two. Your brain builds
        cross-links naturally, the way expert practitioners actually think.
      </p>

      <blockquote>
        Experts don't store knowledge in silos. They store it in webs. Byte-sized learning builds the web from day one.
      </blockquote>

      {/* ── Section 3 ──────────────────────────── */}
      <h2>The Science Behind the Format</h2>
      <p>
        The effectiveness of micro-learning isn't anecdotal — it's one of the most robustly replicated findings in
        cognitive science. Here's what the research actually says:
      </p>

      <ul>
        <li>
          <strong>Spacing effect</strong> (Ebbinghaus, 1885; Cepeda et al., 2006) — Distributing study across multiple
          short sessions produces significantly stronger long-term retention than massed practice. A single 5-minute
          capsule revisited three times across a week outperforms a single 30-minute session.
        </li>
        <li>
          <strong>Testing effect</strong> (Roediger & Karpicke, 2006) — Retrieving information from memory strengthens
          the memory trace far more than re-reading the same material. That's why every capsule includes a quiz, not
          as assessment, but as a learning mechanism.
        </li>
        <li>
          <strong>Interleaving</strong> (Rohrer & Taylor, 2007) — Mixing different problem types during practice
          improves transfer and discrimination. Alternating between architecture, prompting, and evaluation capsules
          produces deeper understanding than bingeing one topic.
        </li>
        <li>
          <strong>Desirable difficulty</strong> (Bjork, 1994) — Learning that feels slightly challenging during encoding
          leads to better long-term retention. The reflection prompts at the end of each capsule are calibrated to
          create productive struggle without frustration.
        </li>
      </ul>

      <p>
        Most learning platforms know this research exists. Few actually structure their content around it. We did.
      </p>

      {/* ── Section 4 ──────────────────────────── */}
      <h2>What a Week of Byte-Sized Learning Looks Like</h2>
      <p>
        Here's a realistic weekly flow for someone learning agentic AI through Open Agent School's byte-sized system:
      </p>

      <ul>
        <li>
          <strong>Monday (6 min)</strong> — Capsule on <em>ReAct pattern</em>: read the architecture, quiz on when to
          use it vs. chain-of-thought, apply it to a customer-support scenario, reflect on failure modes.
        </li>
        <li>
          <strong>Tuesday (5 min)</strong> — Capsule on <em>LLM-as-Judge evaluation</em>: read the technique, quiz on
          calibration tradeoffs, apply by writing a rubric for a real output, reflect on where human eval still wins.
        </li>
        <li>
          <strong>Wednesday (7 min)</strong> — Capsule on <em>Tool-calling flows</em>: read how function-calling works,
          quiz on schema design, apply by mapping tools for a research agent, reflect on security implications.
        </li>
        <li>
          <strong>Thursday (5 min)</strong> — Capsule on <em>Agent memory patterns</em>: read about short-term vs.
          long-term, quiz on retrieval strategies, apply by choosing a memory architecture for a coding assistant.
        </li>
        <li>
          <strong>Friday (4 min)</strong> — Weekly synthesis: a cross-cutting micro-challenge that requires you to
          combine insights from the week. "Design a two-agent system with shared memory, tool access, and an
          evaluation harness." No new content — just integration.
        </li>
      </ul>

      <p>
        <strong>Total time: 27 minutes across 5 days.</strong> That's less than half the length of a single YouTube
        tutorial — and produces dramatically better retention because the learning is distributed, active, and
        interleaved.
      </p>

      {/* ── Section 5 ──────────────────────────── */}
      <h2>The Compound Advantage</h2>
      <p>
        Byte-sized learning doesn't feel dramatic day to day. Five minutes here. Seven minutes there. But the compound
        effect is striking:
      </p>

      <ul>
        <li>
          <strong>After 1 week</strong> — You've covered 4–5 concepts across multiple domains with active recall on
          each. Traditional courses would still be in the Introduction module.
        </li>
        <li>
          <strong>After 1 month</strong> — You've completed 20+ capsules, revisited earlier concepts through spaced
          repetition, and built cross-domain mental models that connect architecture to evaluation to safety.
        </li>
        <li>
          <strong>After 3 months</strong> — You have a working mental map of the entire agentic AI stack. You can
          reason about tradeoffs in agent design, identify failure modes before they happen, and evaluate systems
          with the vocabulary of a practitioner — not a spectator.
        </li>
      </ul>

      <blockquote>
        27 minutes a week × 12 weeks = under 6 hours total. That's the difference between "I keep meaning to learn
        about agents" and "I understand how agent systems work."
      </blockquote>

      {/* ── Section 6 ──────────────────────────── */}
      <h2>Built for How You Actually Learn</h2>
      <p>
        We designed byte-sized learning for the people who <em>want</em> to learn but can't find the time — the
        practitioner with back-to-back meetings, the engineer who spends their "learning budget" on production fires,
        the curious professional who keeps bookmarking tutorials they'll never finish.
      </p>
      <p>
        Every capsule is designed to deliver value in isolation. You don't need to "complete the course" to benefit.
        Capsule 14 is still useful if you skipped capsules 8 through 13. That's intentional. Real learning isn't
        linear — it's a web of connections that strengthens every time you add a node.
      </p>
      <p>
        And because capsules follow the <strong>Read → Quiz → Apply → Reflect</strong> rhythm, you don't just
        <em>consume</em> information — you <em>do</em> something with it every single time. There's no passive watching.
        No "I'll try this later." The doing is built into the format.
      </p>

      {/* ── Section 7 ──────────────────────────── */}
      <h2>Start Now | Not Later</h2>
      <p>
        The agentic era won't wait for you to find a free weekend. The people who'll thrive aren't the ones who read
        the most — they're the ones who learn <em>consistently</em>, in small doses, with real practice baked in.
      </p>
      <p>
        Byte-sized learning is that consistency, packaged into a format that respects your time and trusts your
        intelligence. No fluff. No filler. Just the knowledge you need, structured the way your brain actually retains it.
      </p>

      {/* ── CTA ──────────────────────────────── */}
      <div className="my-12 rounded-2xl bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 border border-violet-500/20 p-8 text-center">
        <h3 className="text-xl font-bold text-foreground mb-2">Your First Capsule Is Waiting</h3>
        <p className="text-muted-foreground mb-6">
          Pick a track. Complete one capsule. It takes less than 7 minutes — and it's the most productive learning
          you'll do all week. No signup required.
        </p>
        <Link
          to="/byte-sized"
          className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:brightness-110 transition-all"
        >
          Start Byte-Sized Learning
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
