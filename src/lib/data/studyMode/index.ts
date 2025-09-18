// This shim file formerly exported heavy question-bank utilities.
// All question data access should now go through lazy loaders in `lazy.ts`.
// Progress/session utilities live in `progress.ts`.
export * from './progress';
export * from './types';

// Intentionally no static imports of the large question libraries here to enable code-splitting.
