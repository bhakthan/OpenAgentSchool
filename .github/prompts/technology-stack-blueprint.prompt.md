---
name: technology-stack-blueprint
description: |
  Generate comprehensive technology stack documentation for the project. Use this skill when:
  - Onboarding new contributors who need to understand the full stack
  - Creating or updating architecture documentation
  - Auditing the technology landscape (what versions, what dependencies)
  - Planning migrations or evaluating technology alternatives
  - Producing a tech radar or dependency map for the project
---

# Technology Stack Blueprint

Generate a comprehensive technology stack document for OpenAgentSchool by analyzing the codebase, configuration files, and infrastructure.

## Overview

Scan the project to produce a structured blueprint covering every technology, framework, library, and service in use — with versions, purposes, and relationships.

---

## Blueprint Template

```markdown
# OpenAgentSchool Technology Stack Blueprint

> Generated: {date}

## Architecture Summary

- **Type**: Single-page application (React SPA) + Python microservices backend
- **Deployment**: Azure Static Web Apps (frontend), Azure Container Apps (backend)
- **Repository Structure**: Dual-repo — frontend (OpenAgentSchool) + backend (openagent-backend)

## Frontend Stack

### Core Framework
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | {version} | UI framework (functional components, hooks) |
| TypeScript | {version} | Type safety (build uses --noCheck) |
| Vite | {version} | Build tool, dev server, HMR |
| React Router | {version} | Client-side routing (v7, lazy loading) |

### Styling & UI
| Technology | Version | Purpose |
|-----------|---------|---------|
| Tailwind CSS | {version} | Utility-first CSS (v4 engine) |
| Radix UI | {version range} | Accessible primitive components (25+ packages) |
| Framer Motion | {version} | Animations and transitions |
| Lucide React | {version} | Icon library |

### Data & State
| Technology | Version | Purpose |
|-----------|---------|---------|
| TanStack React Query | {version} | Server state management, caching |
| React Hook Form | {version} | Form state management |
| Zod | {version} | Schema validation |
| Dexie | {version} | IndexedDB wrapper for offline data |
| Axios | {version} | HTTP client for backend API calls |

### Visualization
| Technology | Version | Purpose |
|-----------|---------|---------|
| D3 | {version} | Learning Atlas tree, force graphs |
| Recharts | {version} | Chart components (progress, stats) |
| XYFlow (React Flow) | {version} | Node-based flow diagrams |
| Three.js | {version} | 3D visualizations |
| Mermaid | {version} | Diagram rendering from markdown |

### Testing
| Technology | Version | Purpose |
|-----------|---------|---------|
| Vitest | {version} | Test runner (unit + integration) |
| Testing Library | {version} | React component testing |
| jsdom / happy-dom | {version} | DOM simulation for tests |

### Build & Tooling
| Technology | Version | Purpose |
|-----------|---------|---------|
| ESLint | {version} | Linting (typescript-eslint, react-hooks) |
| Terser | {version} | Production minification |
| Vite PWA | {version} | Progressive Web App (Workbox) |

## Backend Stack

### Core API (port 8000)
| Technology | Purpose |
|-----------|---------|
| FastAPI | Web framework |
| Pydantic | Request/response validation |
| DuckDB (dev) / Cosmos DB (prod) | Database |
| JWT (PyJWT) | Authentication |

### Agent Orchestrator (port 8002)
| Technology | Purpose |
|-----------|---------|
| FastAPI | Web framework |
| Redis | Cache and message broker |
| LLM providers (OpenRouter/OpenAI) | AI model access |

### Knowledge Service (port 8003)
| Technology | Purpose |
|-----------|---------|
| FastAPI | Web framework |
| PostgreSQL | Relational database |
| ChromaDB / Qdrant | Vector database for semantic search |
| Azure OpenAI | Embeddings and LLM |

## Infrastructure
| Technology | Purpose |
|-----------|---------|
| Docker Compose | Local development orchestration |
| Azure Static Web Apps | Frontend hosting |
| Azure Container Apps | Backend hosting |
| GitHub Actions | CI/CD pipeline |
| Nginx | API gateway (local) |

## Key Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| React.lazy() per concept | Each concept page is a separate chunk (~15KB); keeps initial load fast |
| --noCheck in build | TypeScript checking in IDE + ESLint, not build step; faster CI |
| React overrides in package.json | Prevents duplicate React copies from transitive deps |
| BYOK API keys | Users bring their own LLM keys; stored in localStorage, never on our servers |
| Dual-repo structure | Frontend deploys independently from backend; different cadences |
```

---

## How to Generate

1. **Parse `package.json`** — extract all dependencies with versions
2. **Parse backend `requirements.txt`** files — for each microservice
3. **Parse `docker-compose.yml`** — extract image tags
4. **Parse `.github/workflows/*.yml`** — extract CI tool versions
5. **Parse config files** — `tsconfig.json`, `vite.config.ts`, `tailwind.config.js`
6. **Fill the template** — replace `{version}` placeholders with actual values
7. **Add architectural decisions** — based on comments in config files and README

---

## Rules

1. **Use actual versions** — read from lock files and config, don't guess
2. **Group logically** — by function (UI, data, testing), not alphabetically
3. **Include the why** — purpose column explains why each technology was chosen
4. **Keep it maintainable** — this document should be regenerable from the codebase
5. **Flag outdated items** — note if a technology is deprecated or approaching EOL
