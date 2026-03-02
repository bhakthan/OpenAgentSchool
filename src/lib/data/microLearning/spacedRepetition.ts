// ─── Spaced Repetition Scheduler ─────────────────────────────────────────────
// Lightweight SM-2–inspired algorithm tuned for micro-learning capsules.
//
// After a capsule is completed, we schedule its first review.  Each subsequent
// review adjusts the interval based on a self-reported quality rating (0 – 5)
// OR — for quiz-checkpoint capsules — the quiz score mapped to a quality.
//
// Data is stored in localStorage alongside the rest of MicroLearningProgress.
// ─────────────────────────────────────────────────────────────────────────────

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ReviewCard {
  /** The capsule ID being reviewed */
  capsuleId: string;
  /** Current ease factor (starts at 2.5) */
  easeFactor: number;
  /** Current interval in days */
  intervalDays: number;
  /** Number of consecutive correct recalls */
  repetition: number;
  /** ISO date when the next review is due */
  nextReviewDate: string;
  /** ISO date of the last review (or first completion if never reviewed) */
  lastReviewDate: string;
}

export type QualityRating = 0 | 1 | 2 | 3 | 4 | 5;

export interface ReviewDeck {
  /** All tracked review cards keyed by capsuleId */
  cards: Record<string, ReviewCard>;
  /** ISO timestamp of the last deck write */
  updatedAt: string;
}

// ─── Storage ─────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'micro-learning-review-deck';

function defaultDeck(): ReviewDeck {
  return { cards: {}, updatedAt: new Date().toISOString() };
}

export function loadDeck(): ReviewDeck {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultDeck();
    return JSON.parse(raw) as ReviewDeck;
  } catch {
    return defaultDeck();
  }
}

function saveDeck(deck: ReviewDeck): void {
  deck.updatedAt = new Date().toISOString();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(deck));
  } catch {
    // localStorage full or blocked — degrade silently
  }
}

// ─── Card Initialisation ─────────────────────────────────────────────────────

/**
 * Register a capsule for spaced review after its first completion.
 * No-op if a card already exists.
 */
export function registerCapsuleForReview(capsuleId: string): ReviewCard {
  const deck = loadDeck();
  if (deck.cards[capsuleId]) return deck.cards[capsuleId];

  const now = new Date();
  const card: ReviewCard = {
    capsuleId,
    easeFactor: 2.5,
    intervalDays: 1, // first review tomorrow
    repetition: 0,
    nextReviewDate: addDays(now, 1).toISOString(),
    lastReviewDate: now.toISOString(),
  };
  deck.cards[capsuleId] = card;
  saveDeck(deck);
  return card;
}

// ─── SM-2 Review ─────────────────────────────────────────────────────────────

/**
 * Process a review for a capsule.
 * @param capsuleId  The capsule that was reviewed.
 * @param quality    Recall quality 0 = blackout, 5 = perfect recall.
 * @returns The updated ReviewCard.
 */
export function processReview(capsuleId: string, quality: QualityRating): ReviewCard {
  const deck = loadDeck();
  let card = deck.cards[capsuleId];
  if (!card) {
    // Auto-register if somehow missing
    card = registerCapsuleForReview(capsuleId);
  }

  const now = new Date();

  if (quality < 3) {
    // Failed recall → reset repetition, short interval
    card.repetition = 0;
    card.intervalDays = 1;
  } else {
    // Successful recall
    if (card.repetition === 0) {
      card.intervalDays = 1;
    } else if (card.repetition === 1) {
      card.intervalDays = 3;
    } else {
      card.intervalDays = Math.round(card.intervalDays * card.easeFactor);
    }
    card.repetition += 1;
  }

  // Update ease factor (SM-2 formula, clamped to [1.3, 3.0])
  card.easeFactor = Math.max(
    1.3,
    Math.min(
      3.0,
      card.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)),
    ),
  );

  card.nextReviewDate = addDays(now, card.intervalDays).toISOString();
  card.lastReviewDate = now.toISOString();

  deck.cards[capsuleId] = card;
  saveDeck(deck);
  return card;
}

// ─── Query Helpers ───────────────────────────────────────────────────────────

/**
 * Get capsules due for review right now, ordered by urgency (most overdue first).
 */
export function getDueReviews(): ReviewCard[] {
  const deck = loadDeck();
  const now = new Date().toISOString();
  return Object.values(deck.cards)
    .filter((c) => c.nextReviewDate <= now)
    .sort((a, b) => a.nextReviewDate.localeCompare(b.nextReviewDate));
}

/**
 * Get upcoming reviews in the next N days (including today's due).
 */
export function getUpcomingReviews(days = 7): ReviewCard[] {
  const deck = loadDeck();
  const horizon = addDays(new Date(), days).toISOString();
  return Object.values(deck.cards)
    .filter((c) => c.nextReviewDate <= horizon)
    .sort((a, b) => a.nextReviewDate.localeCompare(b.nextReviewDate));
}

/**
 * Get a single card's review state (or undefined if not tracked).
 */
export function getReviewCard(capsuleId: string): ReviewCard | undefined {
  return loadDeck().cards[capsuleId];
}

/**
 * Total number of capsules currently under spaced review.
 */
export function getReviewDeckSize(): number {
  return Object.keys(loadDeck().cards).length;
}

/**
 * Convert a quiz score (0 – 100) to an SM-2 quality rating.
 * 90+→5, 80+→4, 70+→3, 50+→2, 30+→1, else→0
 */
export function quizScoreToQuality(score: number): QualityRating {
  if (score >= 90) return 5;
  if (score >= 80) return 4;
  if (score >= 70) return 3;
  if (score >= 50) return 2;
  if (score >= 30) return 1;
  return 0;
}

// ─── Utilities ───────────────────────────────────────────────────────────────

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}
