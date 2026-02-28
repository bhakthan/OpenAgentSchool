---
name: what-context-needed
description: |
  Ask what files and context are needed before answering a question about the codebase. Use this skill when:
  - Starting work on an unfamiliar part of the project
  - About to make changes that could affect multiple areas
  - Debugging an issue and unsure which files are relevant
  - Wanting to provide the most accurate answer with minimal back-and-forth
---

# What Context Is Needed

Before answering a question or making changes, identify which files and context are needed for an accurate response. This avoids hallucination and ensures relevant code is actually read before acting.

## How to Use

When asked a question about the codebase, respond with a structured context request before diving in:

```markdown
## Context Needed

### Must See (required for accurate answer)
- `{file_path}` — {why this file is needed}
- `{file_path}` — {why this file is needed}

### Should See (improves accuracy)
- `{file_path}` — {why this would help}

### Already Have
- `{file_path}` — {already visible in conversation}

### Uncertainties
- {what you're unsure about that more context would resolve}
```

---

## OpenAgentSchool Context Map

Use this map to quickly identify which files are relevant for different types of questions:

### "How does routing work?"
- **Must see**: `src/App.tsx` (all routes), `src/components/concepts/ConceptsHub.tsx` (concept registry)
- **Should see**: `vite.config.ts` (proxy config), `staticwebapp.config.json` (SWA fallbacks)

### "How do concepts/learning content work?"
- **Must see**: `src/components/concepts/ConceptsHub.tsx` (registry with IDs, prerequisites)
- **Should see**: The specific concept component file, `src/components/tutorial/LearningJourneyMap.tsx`

### "How does the build work?"
- **Must see**: `package.json` (scripts, dependencies, overrides), `vite.config.ts`, `tsconfig.json`
- **Should see**: `.github/workflows/azure-static-web-apps-gray-pond-041017f10.yml` (CI build)

### "How does authentication work?"
- **Must see**: Backend `core-api/app/api/v1/` (auth routes), frontend API client code
- **Should see**: `core-api/app/models/` (user model), CORS config in both repos

### "How does study mode / quizzes work?"
- **Must see**: `src/components/study-mode/` directory
- **Should see**: Backend `core-api/app/api/v1/quiz/` endpoints

### "How do visualizations work?"
- **Must see**: `src/components/visualization/D3TreeVisualization.tsx`
- **Should see**: `vite.config.ts` (manual chunks for D3), data source files

### "How does the backend work?"
- **Must see**: Relevant service directory at `C:\code\openagent-backend\{service}\app\`
- **Should see**: `docker-compose.yml`, `requirements.txt`, `main.py` or `run.py`

### "How do tests work?"
- **Must see**: `vitest.config.ts`, `tests/setup-tests.ts`
- **Should see**: Specific test file, `package.json` (test scripts)

### "How does deployment work?"
- **Must see**: `.github/workflows/azure-static-web-apps-gray-pond-041017f10.yml`
- **Should see**: `staticwebapp.config.json`, `netlify.toml`, backend deployment scripts

### "How does theming/styling work?"
- **Must see**: `src/index.css` or `src/styles/theme.css`, `tailwind.config.js`
- **Should see**: `theme.json`, Radix UI color imports

---

## Rules

1. **Ask before acting** — if you're unsure which files are relevant, use this skill first
2. **Be specific** — list exact file paths, not "the components folder"
3. **Explain why** — each file should have a reason for inclusion
4. **Don't over-request** — 3-5 must-see files is usually enough; too many wastes context
5. **Track what you've seen** — avoid re-requesting files already in the conversation
6. **Adapt to the question** — a styling question needs different files than an API question
