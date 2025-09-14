<!-- # AGENTS.md – Operational Guide for Automated Coding Agents

This file gives AI coding agents and new contributors the minimal, *actionable* context needed to work effectively in the **Open Agent School** repository.

---

## 1. Project Overview

Open Agent School is a React + TypeScript + Vite single-page learning platform focused on:

- Agentic AI concepts (architecture, prompting, evaluation, security, multi-agent, MCP, ACP, fine-tuning)
- Interactive visualizations ("Learning Atlas" taxonomy tree, data strategy dual-mode, tool calling flows)
- Study Mode (Socratic guided questioning & critical thinking challenges)
- Export & print pipelines (SVG / PNG 2x–3x / PDF) for the Learning Atlas
- Modular concept hub with microcopy optimized for learner motivation

Backend (optional) lives in `backend/` (Python FastAPI / Uvicorn) supporting Study Mode APIs, evaluation endpoints, and optional vector search.

---

## 2. Key Tech Stack

Frontend:

- React 18 + TypeScript + Vite
- TailwindCSS 4 + Radix UI primitives
- D3 for hierarchical & flow visualizations
- jsPDF + canvas for raster/PDF export

Backend (optional runtime):

- Python 3.12 FastAPI (`backend/main.py` / `run.py`)
- Dependencies in `backend/requirements.txt`

---

## 3. Install & Build

```powershell
# Install (frontend)
npm install

# Dev server
npm run dev

# Type build + production bundle
npm run build

# Preview production build
npm run preview

# Backend (optional)
python -m venv .venv
.venv/Scripts/Activate.ps1
pip install -r backend/requirements.txt
python backend/run.py
```

---

## 4. Scripts Summary (`package.json`)

| Script | Purpose |
|--------|---------|
| dev | Start Vite dev server |
| build | Type check (composite) + Vite build |
| preview | Serve built dist/ |
| lint | Run ESLint over repo |
| verify-routing | Validates route definitions |
| export:questions | Export quiz / study content |

> No test script yet; add before expanding CI test coverage.

---

## 5. Code Style & Conventions

- TypeScript strict-ish (enhance gradually; current build uses `--noCheck` shortcut in build step — keep runtime stable before tightening).
- Prefer functional React components with explicit prop types.
- Tailwind utility-first; group semantic clusters (layout → spacing → color → motion).
- Avoid introducing new styling systems (no CSS-in-JS) unless scoped.
- All learner-facing copy: motivational, concise, plain-language, avoids unexplained jargon.
- Keep concept IDs stable (`agent-learning`, `fine-tuning`, etc.)—they key into cross-component linking.

### Import Ordering

1. React / libs
2. Local hooks / context
3. Components
4. Styles / static

---

## 6. Architecture Hotspots

| Area | File(s) | Notes |
|------|---------|-------|
| Learning Atlas (Tree) | `src/components/visualization/D3TreeVisualization.tsx` | Export logic, theming helpers, fit-to-content, logo root node. |
| Journey Map | `src/components/tutorial/LearningJourneyMap.tsx` | Tiered progression; recently added fine-tuning to Advanced tier. |
| Concept Hub | `src/components/concepts/ConceptsHub.tsx` | Microcopy + card interactivity (card-wide click, hover arrow). |
| AI Safety | `src/components/concepts/AzureAISafetyAndGovernance.tsx` | Added References tab (Turing AI Safety, MS Responsible AI). |
| Study Mode | `src/components/study-mode/*` | Socratic flow + evaluation logic. |
| Export Scripts | `scripts/export-questions.mjs` etc. | Data extraction for skill pipelines. |
| Backend FastAPI | `backend/main.py`, `backend/run.py` | Optional; not required for static build. |

---

## 7. Adding / Modifying a Concept

1. Add concept object to `ConceptsHub.tsx` and (if part of progression) to `LearningJourneyMap.tsx`.
2. Maintain `id` naming pattern (kebab-case).
3. Update microcopy: keep under ~140 chars for card.
4. If export tree needs it, ensure label width isn’t truncated—test SVG export.

---

## 8. Learning Atlas Export Pipeline

- Buttons trigger: SVG serialization -> optional PNG raster (2x/3x) -> PDF via jsPDF.
- Fit-to-content uses computed bounding box; avoid DOM layout shifts during export.
- Transparent background toggle must set root container background to `transparent` (light mode now flat).

---

## 9. Accessibility & UX Guidelines

- All interactive elements keyboard focusable (cards currently clickable div -> ensure role+tabindex if adding non-native semantics).
- Prefer semantic headings (h1 only once per page container).
- Use `aria-label` for icon-only buttons (export controls, close, etc.).

---

## 10. Security Considerations

- Backend API key gating via `x-api-key` (see README quick start). Add rate limiting if exposing publicly.
- Avoid executing arbitrary user-supplied code client side.
- If adding auth flows: use server-side JWKS validation (see `backend/test_jwt_auth.py`).
- Sanitize any markdown before rendering (purification already in pipeline for user-provided content; confirm before new sources).

---

## 11. Performance Notes

- Some bundles exceed 500kB (warning during build). Future: dynamic `import()` for heavy concept modules & visualization components.
- D3 re-render: keep memoization for layout; avoid recalculating tree on trivial state changes.

---

## 12. Adding Fine-Tuning Related Features

- Concept ID: `fine-tuning` (card + journey + tree already aligned).
- Microcopy: "Stop overtraining—choose the lowest intervention (SFT → DPO → RFT) that proves incremental lift."
- If adding code samples: group SFT, DPO, RFT under separate tabs to mirror conceptual layout.

---

## 13. Pull Request / Commit Guidance

- Conventional-ish format: `<scope>: <brief>` (e.g., `concepts: add fine-tuning to journey map`).
- Keep commits small & logically scoped (visual polish vs data vs copy).
- Include rationale in body if change is pedagogical or UX-motivated.
- Run `npm run build` + `npm run lint` locally before pushing.

---

## 14. Extension / Automation Hooks

Potential future automation:

- Lint enforcement in CI (ESLint already scriptable).
- Visual regression (Tree export snapshots) if export fidelity becomes critical.
- Structured schema for concepts (move inline arrays to JSON for easier reuse).

---

## 15. Known Gaps / TODO Seeds

| Area | Need |
|------|------|
| Testing | No unit/integration tests yet. Introduce Vitest + react-testing-library. |
| Perf | Code-splitting heavy visual modules. |
| A11y | Audit icon-only buttons and card roles. |
| Backend | Add rate limiting / usage metrics. |
| Docs | Break README into modular docs (export, study-mode, safety). |

---

## 16. When Creating New Subpackages

If you add a package under `packages/`:

1. Create its own `package.json` with `name`, `type`, `main`.
2. Add a localized `AGENTS.md` for overrides (e.g., special build/test steps).
3. Keep dependency scope tight—prefer root dev deps.
4. Use TS project references only if necessary.

---

## 17. Quick Diagnostic Commands

```powershell
# Lint everything
npm run lint

# Bundle analyze after build
npm run build:analyze

# Verify routing assumptions
npm run verify-routing
```

---

## 18. Supportive Mental Model

Learners move: Fundamentals → Architecture → Implementation → Advanced → Applied / Community.
Keep narrative coherence: each new concept should reduce uncertainty about “how do I scale / secure / validate this?”

---

## 19. Minimal Agent Checklist Before Editing

- Locate relevant concept or visualization file (see section 6).
- Preserve IDs and stable exports used across components.
- Avoid broad refactors without need—opt for surgical patches.
- After patch: run build and ensure no type errors.

---

## 20. Contact / Attribution

Maintained by contributors at `openagentschool.org` (see LICENSE). Built collaboratively with AI assistance and human review.

---

Happy automating! Optimize for clarity, stability, and learner value.
 -->