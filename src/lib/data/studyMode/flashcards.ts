// Active Recall Flashcards scaffold (#14)
export interface Flashcard { id: string; patternId: string; prompt: string; answer: string; easiness: number; interval: number; due: string; repetitions?: number; lapses?: number; }
export const flashcards: Flashcard[] = [
  { id: 'fc-query-intent-1', patternId: 'query-intent-structured-access', prompt: 'Why structure user intent before retrieval?', answer: 'Reduces ambiguity, improves retrieval precision, prevents wasted tool calls.', easiness: 2.5, interval: 1, due: new Date().toISOString(), repetitions: 0, lapses: 0 }
];

// SM-2 lite scheduling (#14)
export function reviewFlashcard(card: Flashcard, quality: 0|1|2|3|4|5): Flashcard {
  let easiness = card.easiness + (0.1 - (5-quality)*(0.08 + (5-quality)*0.02));
  if (easiness < 1.3) easiness = 1.3;
  let repetitions = (card.repetitions || 0) + 1;
  let interval = 1;
  if (repetitions === 1) interval = 1;
  else if (repetitions === 2) interval = 6;
  else interval = Math.round((card.interval || 1) * easiness);
  if (quality < 3) { repetitions = 0; interval = 1; }
  const due = new Date(Date.now() + interval*24*60*60*1000).toISOString();
  return { ...card, easiness, interval, repetitions, due };
}

export function getDueFlashcards(now = new Date()): Flashcard[] {
  return flashcards.filter(c => new Date(c.due) <= now).sort((a,b) => new Date(a.due).getTime() - new Date(b.due).getTime());
}

// Persist (placeholder localStorage)
export function persistFlashcard(card: Flashcard) {
  try {
    const existing: Flashcard[] = JSON.parse(localStorage.getItem('flashcards')||'[]');
    const idx = existing.findIndex(c => c.id === card.id);
    if (idx >=0) existing[idx] = card; else existing.push(card);
    localStorage.setItem('flashcards', JSON.stringify(existing));
  } catch {}
}

