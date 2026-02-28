---
name: add-educational-comments
description: |
  Add teaching-style comments to code files that explain the why, not just the what. Use this skill when:
  - Onboarding contributors to unfamiliar parts of the codebase
  - Making concept component code self-documenting for learners
  - Explaining complex D3 visualization logic, state management, or data flows
  - Adding context to architectural decisions (why Radix UI, why lazy loading, etc.)
  - Preparing code for educational use in workshops or documentation
  - Adapting explanation depth to audience level (beginner, intermediate, advanced)
---

# Add Educational Comments

Transform code files into learning resources by adding teaching-style comments that explain architectural decisions, patterns, and concepts — tuned for the OpenAgentSchool codebase.

## Overview

This is an **educational platform about AI agents** — the code itself should be a teaching tool. Comments should help contributors and learners understand not just *what* the code does, but *why* it does it that way.

```
Read → Identify → Comment → Verify
  │        │          │         │
  │        │          │         └─ Code still builds, comments add clarity
  │        │          └─ Add teaching comments at key decision points
  │        └─ Find non-obvious logic, patterns, architectural choices
  └─ Understand the file's role in the project
```

---

## When to Comment (and When Not To)

### ✅ Add comments for:

- **Architectural decisions**: Why lazy loading? Why Radix UI over custom components?
- **Non-obvious patterns**: React Query cache strategies, Vite chunk splitting logic
- **Domain concepts**: How concept prerequisites form a DAG, how evaluation rubrics work
- **Complex data flows**: D3 force simulation setup, SVG export pipeline
- **Workarounds**: Why `--noCheck` in the build, why React overrides in package.json
- **Integration points**: How frontend talks to backend services, CORS setup

### ❌ Don't comment:

- Self-evident code (`const name = user.name;`)
- Tailwind utility classes (they're readable as-is)
- Standard React patterns (useState, useEffect for basic cases)
- Import statements (unless non-obvious aliasing)

---

## Comment Style Guide

### Explain the WHY, not the WHAT

```tsx
// BAD: describes what (redundant with the code)
// Set the state to true
setIsLoading(true);

// GOOD: explains why (adds understanding)
// Optimistic UI: show loading immediately while the quiz submission
// round-trips to core-api. The actual score arrives via onSuccess callback.
setIsLoading(true);
```

### Use the right granularity

```tsx
// FILE-LEVEL: Explain the component's role in the system
/**
 * ConceptsHub is the main discovery surface for all learning content.
 * Concepts are defined inline (not fetched from an API) and use stable
 * kebab-case IDs for cross-linking. Components are lazy-loaded via
 * React.lazy() so each concept page is a separate chunk.
 */

// SECTION-LEVEL: Explain a logical block
// --- Prerequisite Graph Validation ---
// Each concept declares prerequisite IDs. We validate these form a DAG
// (no cycles) and that every referenced ID exists in the registry.

// LINE-LEVEL: Explain a single non-obvious line
const root = createRoot(document.getElementById('root')!);
// Non-null assertion is safe: index.html always has <div id="root">
```

### Audience-adaptive depth

| Audience | Comment Style | Example |
|----------|---------------|---------|
| **Beginner** | Explain the concept and link to learning | `// React.lazy() splits this into a separate JS file, loaded only when visited` |
| **Intermediate** | Explain the design choice | `// Lazy loading keeps initial bundle under 200KB; each concept is ~15KB` |
| **Advanced** | Explain trade-offs and alternatives | `// manualChunks for concepts was removed — it broke shared imports between A2A components` |

---

## Project-Specific Patterns to Annotate

### Concept Registration Pattern

```tsx
// ConceptsHub.tsx — Concept Registry
// Each concept is a plain object with a stable ID used for:
// 1. URL routing (/concepts/{id})
// 2. Prerequisite cross-references (prerequisites: ['agent-architecture'])
// 3. Learning Journey Map positioning
// 4. Study Mode quiz association
// IDs are kebab-case and must never change once published.
const concepts = [
  { id: 'agent-architecture', title: 'Agent Architecture', ... },
];
```

### React Override Pattern

```json
// package.json — React Version Alignment
// "overrides" forces every transitive dependency to use our React version.
// Without this, packages like react-force-graph or reactflow may pull in
// a second React copy, causing the "Invalid hook call" error.
"overrides": {
  "react": "^19.2.4",
  "react-dom": "^19.2.4"
}
```

### Vite Chunk Strategy

```typescript
// vite.config.ts — Manual Chunks
// D3, Three.js, and XYFlow are large (50-200KB each). Splitting them
// into vendor chunks means returning users get them from browser cache
// even when app code changes. Concept components are NOT chunked here —
// React.lazy() already creates per-concept split points.
manualChunks(id) {
  if (id.includes('d3')) return 'vendor-d3';
}
```

### Build --noCheck Pattern

```bash
# package.json scripts.build
# tsc -b --noCheck skips full type-checking during build for speed.
# TypeScript errors are caught by the IDE and ESLint, not the build step.
# This is intentional — strict checking would block builds on non-critical
# type warnings in third-party type definitions.
"build": "tsc -b --noCheck && vite build"
```

---

## Process

1. **Read the file** — understand its role before commenting
2. **Identify key decisions** — what would confuse a new contributor?
3. **Write comments** — use the style guide above
4. **Keep density reasonable** — aim for ~1 comment per logical block, not per line
5. **Verify the build** — `npm run build` must still pass
6. **Don't modify logic** — comments only, zero functional changes

---

## Rules

1. **Comments are additive** — never remove existing useful comments
2. **Don't restate the code** — if the code is clear, don't comment it
3. **Use `//` for single-line, `/** */` for file/function-level JSDoc**
4. **Keep comments current** — wrong comments are worse than no comments
5. **Match the project tone** — motivational, concise, plain-language (learner-facing copy conventions)
6. **No TODO/FIXME unless actionable** — vague TODOs are noise
7. **Preserve code formatting** — don't reformat while commenting
