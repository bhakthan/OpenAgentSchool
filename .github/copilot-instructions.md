# Copilot Instructions for Open Agent School

This workspace contains two repositories:
- **OpenAgentSchool** - React frontend (this repo)
- **openagent-backend** - Python microservices backend (sibling folder at `C:\code\openagent-backend`)

## Frontend (OpenAgentSchool)

### Build, Test, and Lint

```bash
# Install dependencies
npm install

# Development server (http://localhost:5000)
npm run dev

# Build (TypeScript check + Vite production build)
npm run build

# Lint
npm run lint

# Run all tests
npm run test

# Run a single test file
npx vitest run tests/dataAutonomyPatterns.test.ts

# Run tests matching a pattern
npx vitest run -t "pattern name"

# Watch mode
npm run test:watch
```

## Backend (openagent-backend)

Three microservices with independent Docker Compose setups:

| Service | Port | Purpose |
|---------|------|---------|
| **core-api** | 8000 | User auth, community, quizzes, progress tracking |
| **agent-orchestrator** | 8002 | Multi-agent AI, critical thinking, educational frameworks |
| **knowledge-service** | 8003 | Document processing, semantic search, RAG |

### Running Services

```powershell
# Start all services (from openagent-backend directory)
cd C:\code\openagent-backend\core-api
docker compose up -d --build

cd C:\code\openagent-backend\agent-orchestrator
docker compose up -d --build

cd C:\code\openagent-backend\knowledge-service
docker compose up -d --build

# Health checks
curl http://localhost:8000/health
curl http://localhost:8002/api/v1/health/live
curl http://localhost:8003/health
```

### Running Without Docker

```powershell
# Core API
cd C:\code\openagent-backend\core-api
pip install -r requirements.txt
cp .env.example .env
python run.py

# Agent Orchestrator (requires Redis)
cd C:\code\openagent-backend\agent-orchestrator
pip install -r requirements.txt
docker run -d -p 6379:6379 redis:7-alpine
uvicorn main:app --reload --port 8002
```

### Backend Tests

```bash
# Core API
cd C:\code\openagent-backend\core-api
pytest -q

# Agent Orchestrator
cd C:\code\openagent-backend\agent-orchestrator
pytest

# Knowledge Service
cd C:\code\openagent-backend\knowledge-service
pytest --cov
```

### Frontend-Backend Integration

Create `.env.local` in OpenAgentSchool:
```env
VITE_CORE_API_URL=http://localhost:8000
VITE_ORCHESTRATOR_SERVICE_URL=http://localhost:8002
VITE_KNOWLEDGE_SERVICE_URL=http://localhost:8003
```

## Architecture

### Frontend (OpenAgentSchool)

**React 18 + TypeScript + Vite** single-page learning platform. Works standalone; backend enables advanced features.

**Key Directories:**
- `src/components/concepts/` - Individual concept pages (AgentArchitectureConcept.tsx, MCPConcept.tsx, etc.)
- `src/components/patterns/` - Agent pattern implementations
- `src/components/visualization/` - D3 visualizations including the Learning Atlas taxonomy tree
- `src/components/study-mode/` - Socratic learning and evaluation logic
- `src/components/ui/` - Radix UI-based design system components
- `tests/` - Vitest tests with jsdom environment

**Routing:** Defined in `src/App.tsx` using react-router-dom v7. Components are lazy-loaded via `React.lazy()`.

**Data Flow:**
- Concept definitions live inline in component files (e.g., `ConceptsHub.tsx`)
- Stable concept IDs (kebab-case like `agent-learning`, `fine-tuning`) are used for cross-component linking
- State is component-local or React Query for API calls

### Backend (openagent-backend)

**Microservices architecture** with polyglot persistence:

| Service | Database | Vector Store |
|---------|----------|--------------|
| core-api | DuckDB (dev) / Cosmos DB (prod) | Optional ChromaDB |
| agent-orchestrator | SQLite (dev) / PostgreSQL (prod) | N/A |
| knowledge-service | PostgreSQL | ChromaDB / Qdrant |

**Service Communication:**
- REST APIs with OpenAPI docs at `/docs` for each service
- No service mesh; direct HTTP calls between services
- JWT auth from core-api, API keys for service-to-service

**Key Backend Directories:**
- `core-api/app/` - User management, community, quizzes, progress
- `agent-orchestrator/app/` - Multi-agent AI, critical thinking frameworks (Bloom's, Paul-Elder)
- `knowledge-service/app/` - Document processing, semantic search, RAG pipeline

## Conventions

### Code Style

- **Functional React components** with explicit prop types
- **Tailwind utility-first** styling; group as: layout → spacing → color → motion
- **Import order**: React/libs → hooks/context → components → styles/static
- **Path alias**: `@/` maps to `src/`
- No CSS-in-JS; stick to Tailwind

### TypeScript

- Current build uses `--noCheck` shortcut; avoid introducing strict errors
- Unused vars: prefix with underscore (`_unused`) to avoid lint warnings

### Commits

- Format: `<scope>: <brief>` (e.g., `concepts: add fine-tuning to journey map`)
- Keep commits small and logically scoped

### Learner-Facing Copy

All user-visible text should be: motivational, concise, plain-language, avoids unexplained jargon. Card descriptions under ~140 chars.

## Adding a New Concept

1. Add concept object to `src/components/concepts/ConceptsHub.tsx`
2. If part of learning progression, add to `src/components/tutorial/LearningJourneyMap.tsx`
3. Use kebab-case ID matching existing patterns
4. Test SVG export if adding to taxonomy tree (check label truncation)

## Export Pipeline (Learning Atlas)

The Learning Atlas uses D3 with export to SVG/PNG/PDF:
- Export logic in `src/components/visualization/D3TreeVisualization.tsx`
- Fit-to-content uses computed bounding box
- Avoid DOM layout shifts during export

## Test Structure

Tests use Vitest with jsdom. Setup in `tests/setup-tests.ts`.

```
tests/
├── unit/           # Unit tests
├── smoke/          # Smoke tests
├── *.test.ts       # Feature tests
└── setup-tests.ts  # Test configuration
```

## API Endpoints Reference

### Core API (8000) - `/api/v1/`

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/users/register` | POST | User registration |
| `/users/login` | POST | JWT authentication |
| `/auth/microsoft/login` | GET | Microsoft OAuth |
| `/auth/google/login` | GET | Google OAuth |
| `/quiz/questions/{category}` | GET | Fetch quiz questions |
| `/quiz/submit` | POST | Submit quiz attempt |
| `/progress/update` | POST | Update learning progress |
| `/community/posts` | GET/POST | Community forum |
| `/bookmarks` | GET/POST/DELETE | User bookmarks |
| `/study-mode/sessions` | GET/POST | Study mode sessions |
| `/ai-skills/list` | GET | AI skills catalog |
| `/agent-patterns/list` | GET | Agent patterns catalog |
| `/velocity/profile` | GET | Velocity score profile |
| `/achievements` | GET | User achievements |

### Agent Orchestrator (8002) - `/api/v1/`

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/critical-thinking/analyze` | POST | Critical thinking assessment |
| `/educational-frameworks/blooms/assess` | POST | Bloom's taxonomy evaluation |
| `/educational-frameworks/paul-elder/assess` | POST | Paul-Elder framework |
| `/critical-thinking/frameworks` | GET | List available frameworks |
| `/playground/sessions` | POST | Multi-agent playground |
| `/health/live` | GET | Health check |

### Knowledge Service (8003) - `/api/v1/`

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/documents/upload` | POST | Document upload |
| `/search/semantic` | POST | Semantic search |
| `/knowledge-bases` | GET/POST | Knowledge base management |
| `/health` | GET | Health check |

## CI/CD Pipelines

### Frontend (OpenAgentSchool)
- **Workflow**: `.github/workflows/azure-static-web-apps-gray-pond-041017f10.yml`
- **Triggers**: Push to `main`, PRs to `main`
- **Steps**: npm ci → npm test → npm build → deploy to Azure Static Web Apps
- **Secrets required**: `AZURE_STATIC_WEB_APPS_API_TOKEN_*`, `VITE_CORE_API_URL`, `VITE_ORCHESTRATOR_SERVICE_URL`, `VITE_KNOWLEDGE_SERVICE_URL`

### Backend (openagent-backend)
- **Workflow**: `.github/workflows/ci.yml`
- **Triggers**: Manual (workflow_dispatch)
- **Matrix build**: Tests all 3 services in parallel with Docker Compose
- **Health checks**: Waits for HTTP 200 on each service's health endpoint

## Environment Variables

### Frontend Production Secrets
```env
VITE_GA_MEASUREMENT_ID=...
VITE_CORE_API_URL=https://your-core-api.azurecontainerapps.io
VITE_ORCHESTRATOR_SERVICE_URL=https://your-orchestrator.azurecontainerapps.io
VITE_KNOWLEDGE_SERVICE_URL=https://your-knowledge.azurecontainerapps.io
VITE_OPENROUTER_API_KEY=...  # For client-side AI features
```

### Backend Core API
```env
DATABASE_TYPE=duckdb  # or cosmosdb
SECRET_KEY=your-jwt-secret
BACKEND_CORS_ORIGINS=http://localhost:5000,https://openagentschool.org
```

### Backend Agent Orchestrator
```env
LLM_PROVIDER=openrouter  # or openai, azure
OPENROUTER_API_KEY=...
REDIS_URL=redis://localhost:6379
```

### Backend Knowledge Service
```env
AZURE_OPENAI_ENDPOINT=https://...openai.azure.com/
AZURE_OPENAI_KEY=...
DATABASE_URL=postgresql+asyncpg://user:pass@host:5432/db
```

## Backend Python Conventions

- **Framework**: FastAPI with Pydantic models
- **API versioning**: All routes under `/api/v1/`
- **Response format**: JSON with Pydantic schema validation
- **Error handling**: HTTP status codes + `{"detail": "message"}` objects
- **Auth**: JWT tokens from core-api, API keys for service-to-service
- **OpenAPI docs**: Available at `/docs` for each service (disabled in prod for knowledge-service)

## Documentation Routing

Generated documentation should go to the separate `openagent-wiki` repository, not `docs/` in this repo.

## MCP Server Configuration

For enhanced Copilot capabilities, configure these MCP servers in your VS Code settings:

### Playwright MCP (Browser Testing)
```json
{
  "mcp": {
    "servers": {
      "playwright": {
        "command": "npx",
        "args": ["@anthropic/mcp-playwright"]
      }
    }
  }
}
```
Useful for: E2E testing, visual regression, debugging UI components.

### PostgreSQL MCP (Database Queries)
```json
{
  "mcp": {
    "servers": {
      "postgres": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-postgres"],
        "env": {
          "POSTGRES_CONNECTION_STRING": "postgresql://knowledge:knowledge@localhost:5434/knowledge_db"
        }
      }
    }
  }
}
```
Useful for: Querying knowledge-service database, debugging data issues.

### Redis MCP (Cache/Queue Inspection)
```json
{
  "mcp": {
    "servers": {
      "redis": {
        "command": "npx",
        "args": ["-y", "mcp-redis"],
        "env": {
          "REDIS_URL": "redis://localhost:6379"
        }
      }
    }
  }
}
```
Useful for: Inspecting agent-orchestrator cache and queue state.
