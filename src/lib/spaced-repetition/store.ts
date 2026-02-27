import { SM2CardState, DEFAULT_SM2_STATE, applySM2Review, shouldReviewNow, type ReviewOutcome } from './sm2';

const STORAGE_KEY = 'oas.spacedRepetition.v1';

export interface SpacedRepetitionDeck {
  cards: Record<string, SM2CardState>;
  lastReviewedAt: number | null;
}

function loadDeck(): SpacedRepetitionDeck {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { cards: {}, lastReviewedAt: null };
    return JSON.parse(raw) as SpacedRepetitionDeck;
  } catch {
    return { cards: {}, lastReviewedAt: null };
  }
}

function saveDeck(deck: SpacedRepetitionDeck): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(deck));
  } catch { /* ignore quota */ }
}

export function getCardState(conceptId: string): SM2CardState {
  return loadDeck().cards[conceptId] ?? { ...DEFAULT_SM2_STATE };
}

export function reviewCard(conceptId: string, outcome: ReviewOutcome): SM2CardState {
  const deck = loadDeck();
  const current = deck.cards[conceptId] ?? { ...DEFAULT_SM2_STATE };
  const next = applySM2Review(current, outcome);
  deck.cards[conceptId] = next;
  deck.lastReviewedAt = Date.now();
  saveDeck(deck);
  return next;
}

export function getDueCards(conceptIds: string[], now = Date.now()): string[] {
  const deck = loadDeck();
  return conceptIds.filter(id => {
    const state = deck.cards[id];
    if (!state) return true; // never reviewed = due
    return shouldReviewNow(state, now);
  });
}

export function getDeckStats(): { total: number; due: number; mastered: number } {
  const deck = loadDeck();
  const entries = Object.values(deck.cards);
  const now = Date.now();
  const due = entries.filter(c => shouldReviewNow(c, now)).length;
  const mastered = entries.filter(c => c.repetitions >= 5).length;
  return { total: entries.length, due, mastered };
}
