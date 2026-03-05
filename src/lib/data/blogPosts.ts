/**
 * Blog post data — single source of truth for the blog landing page
 * and individual post pages.
 *
 * Static seed posts live in SEED_POSTS.
 * Admin-created posts are persisted in localStorage under STORAGE_KEY.
 * getAllBlogPosts() merges both, sorted newest-first.
 */

const STORAGE_KEY = 'oas.blog.posts';

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  heroImage: string;
  heroImageAlt: string;
  author: string;
  date: string;            // ISO date string for sorting
  dateDisplay: string;     // Human readable
  readTime: string;
  tags: string[];
  featured: boolean;
  /** Masonry card size — tall cards span 2 rows */
  cardSize: 'normal' | 'tall' | 'wide';
  /** Markdown body for admin-created posts (seed posts use JSX in BlogPostPage) */
  body?: string;
  /** Whether this post was created via admin UI */
  isUserCreated?: boolean;
}

/* ── Seed (static) posts ─────────────────────────── */

export const SEED_POSTS: BlogPost[] = [
  {
    slug: 'micro-listening-daily-audio-learning',
    title: 'Why We Built Micro-Listening',
    subtitle: 'And Why Your Commute Is Now a Classroom',
    excerpt:
      'You don\'t have a knowledge problem — you have an access problem. Micro-Listening turns your in-between time into structured AI education through short, focused audio episodes.',
    heroImage: '/images/micro_listening_hero.webp',
    heroImageAlt: 'Micro-Listening — headphones over a glowing waveform of AI concept narration episodes',
    author: 'Open Agent School',
    date: '2026-03-04',
    dateDisplay: 'March 4, 2026',
    readTime: '5 min read',
    tags: ['Micro-Listening', 'Audio Learning', 'Learning Science', 'Accessibility'],
    featured: true,
    cardSize: 'tall',
  },
  {
    slug: 'the-10-minute-edge',
    title: 'The 10-Minute Edge',
    subtitle: 'How Micro-Learning and Just-In-Time Knowledge Are Rewriting the Rules of AI Education',
    excerpt:
      'AI moves faster than anyone can study. The people falling behind aren\'t lazy — they\'re drowning in a firehose of knowledge that was never designed for the human brain. There\'s a better rhythm.',
    heroImage: '/images/concept_sphere.webp',
    heroImageAlt: 'ConceptSphere diorama — micro-learning capsule path leading to a constellation of glowing knowledge spheres',
    author: 'Open Agent School',
    date: '2026-03-02',
    dateDisplay: 'March 2, 2026',
    readTime: '6 min read',
    tags: ['Micro-Learning', 'Just-In-Time', 'ConceptSphere', 'Learning Science'],
    featured: true,
    cardSize: 'tall',
  },
];

/* ── localStorage helpers ────────────────────────── */

function loadUserPosts(): BlogPost[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as BlogPost[]) : [];
  } catch {
    return [];
  }
}

function saveUserPosts(posts: BlogPost[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

/* ── Public API ──────────────────────────────────── */

/** All posts (seed + admin-created), sorted newest-first */
export function getAllBlogPosts(): BlogPost[] {
  const all = [...SEED_POSTS, ...loadUserPosts()];
  return all.sort((a, b) => b.date.localeCompare(a.date));
}

/** Kept for backwards compat — same as getAllBlogPosts() */
export const BLOG_POSTS = SEED_POSTS;

export function getBlogPost(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((p) => p.slug === slug);
}

/** Save a new blog post (admin) */
export function addBlogPost(post: BlogPost) {
  const existing = loadUserPosts();
  existing.push({ ...post, isUserCreated: true });
  saveUserPosts(existing);
}

/** Delete an admin-created blog post by slug */
export function deleteBlogPost(slug: string) {
  const existing = loadUserPosts().filter((p) => p.slug !== slug);
  saveUserPosts(existing);
}

/** Update an admin-created blog post */
export function updateBlogPost(slug: string, updates: Partial<BlogPost>) {
  const existing = loadUserPosts().map((p) =>
    p.slug === slug ? { ...p, ...updates } : p,
  );
  saveUserPosts(existing);
}

/** Get only admin-created posts */
export function getUserCreatedPosts(): BlogPost[] {
  return loadUserPosts();
}
