---
name: update-llms-txt
description: |
  Generate or update an llms.txt file for LLM-friendly project discovery. Use this skill when:
  - Creating an llms.txt file per the llmstxt.org specification
  - Updating llms.txt after adding new concepts, patterns, or documentation
  - Making the project discoverable and parseable by AI agents and LLMs
  - Ensuring the project structure is well-documented for automated consumption
---

# Update llms.txt

Generate or update the `llms.txt` file in the project root following the [llmstxt.org specification](https://llmstxt.org/), making OpenAgentSchool discoverable and consumable by LLMs and AI agents.

## Overview

`llms.txt` is a markdown file at the project root that helps LLMs understand what the project is, what it contains, and where to find key resources. Think of it as a `robots.txt` for AI comprehension.

## Specification Format

```markdown
# {Project Name}

> {One-paragraph description of the project}

## {Section Name}

- [{Resource title}]({URL or path}): {Brief description}
```

---

## Structure for OpenAgentSchool

```markdown
# Open Agent School

> An interactive learning platform for mastering AI agent architecture, patterns, and evaluation. Built with React 19, TypeScript, Vite, and Tailwind CSS. Features 40+ concepts covering agent design, MCP, tool use, multi-agent systems, RAG, fine-tuning, and responsible AI. Includes study mode with Socratic learning, a D3-powered Learning Atlas visualization, and a Python microservices backend (FastAPI) for auth, quizzes, and AI orchestration.

## Documentation

- [README](README.md): Project overview, setup instructions, and architecture
- [AGENTS](AGENTS.md): Copilot agent configuration and coding conventions
- [Project Overview](PROJECT_OVERVIEW.md): Detailed architecture and design decisions
- [Workspace Guide](WORKSPACE_GUIDE.md): Development environment setup

## Concepts & Learning Content

- [ConceptsHub](src/components/concepts/ConceptsHub.tsx): Central registry of all learning concepts with IDs, descriptions, and prerequisites
- [Learning Journey Map](src/components/tutorial/LearningJourneyMap.tsx): Progression paths through concepts
- [Study Mode](src/components/study-mode/): Socratic learning, quizzes, and evaluation logic

## Key Source Files

- [App Router](src/App.tsx): All routes defined with React Router v7 and lazy loading
- [Vite Config](vite.config.ts): Build configuration, PWA setup, chunk strategy
- [Package Config](package.json): Dependencies, scripts, React overrides
- [TypeScript Config](tsconfig.json): Compiler options and path aliases

## Visualization

- [D3 Tree Visualization](src/components/visualization/D3TreeVisualization.tsx): Learning Atlas taxonomy tree with SVG/PNG/PDF export
- [UI Components](src/components/ui/): Radix UI-based design system

## API & Backend

- [Core API](https://github.com/{owner}/openagent-backend/tree/main/core-api): User auth, quizzes, progress (FastAPI, port 8000)
- [Agent Orchestrator](https://github.com/{owner}/openagent-backend/tree/main/agent-orchestrator): Multi-agent AI, critical thinking frameworks (port 8002)
- [Knowledge Service](https://github.com/{owner}/openagent-backend/tree/main/knowledge-service): Document processing, semantic search, RAG (port 8003)

## Configuration

- [ESLint Config](eslint.config.js): Linting rules for TypeScript and React
- [Tailwind Config](tailwind.config.js): Theme and plugin configuration
- [Static Web App Config](staticwebapp.config.json): Azure SWA routing and headers

## Testing

- [Test Setup](tests/setup-tests.ts): Vitest configuration with jsdom
- [Evaluation Tests](tests/unit/patternEvaluationRegistry.test.ts): Agentic eval guardrail
- [Smoke Tests](tests/smoke/): Application smoke tests

## Optional

- [Docker Compose](docker-compose.yml): Full backend stack for local development
- [CI/CD Workflow](.github/workflows/azure-static-web-apps-gray-pond-041017f10.yml): Build, test, deploy pipeline
```

---

## Process

1. **Scan the repository** — identify all key files, docs, and entry points
2. **Categorize** — group into Documentation, Source, API, Config, Testing, Optional
3. **Write descriptions** — one sentence per resource, plain language
4. **Validate links** — ensure every path exists and points to the right file
5. **Place at root** — save as `llms.txt` in the repository root

---

## When to Update

- New concept or pattern added to ConceptsHub
- New route added to App.tsx
- New documentation file created
- Backend service added or endpoint changed
- Build/test configuration changed significantly

---

## Rules

1. **Follow the spec** — H1 title, blockquote summary, H2 sections with link lists
2. **Keep it current** — stale llms.txt is worse than none
3. **Plain language** — descriptions should be understandable without project context
4. **Relative paths for local files** — use `README.md` not absolute URLs
5. **Don't list every file** — focus on entry points and key resources (< 50 entries)
6. **Validate paths** — every link must resolve to an existing file or URL
