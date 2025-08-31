# OpenAgent Backends – Services, Ports, and Key Endpoints

This folder contains the three backend services that power OpenAgent School. Here’s the current, minimal map you can rely on during dev and E2E smoke tests.

## Services at a glance

- Core API
  - URL: <http://localhost:8000>
  - Base path: /api/v1
  - Docs: <http://localhost:8000/docs> (OpenAPI JSON at /api/v1/openapi.json)
  - Health: GET /health
  - Focus areas: users/auth, community, quizzes, progress tracking
  - More details: ./core-api/implementation.md

- Agent Orchestrator
  - URL: <http://localhost:8002> (default)
  - Base path: /api/v1
  - Docs: <http://localhost:8002/api/v1/docs>
  - Health: GET /health
  - New endpoints (examples):
    - POST /api/v1/critical-thinking/analyze
    - POST /api/v1/educational-frameworks/blooms/assess
    - POST /api/v1/educational-frameworks/paul-elder/assess
    - GET  /api/v1/critical-thinking/frameworks
  - More details: ./agent-orchestrator/IMPLEMENTATION_COMPLETE.md

- Knowledge Service
  - URL: <http://localhost:8003>
  - Base path: /api/v1
  - Docs: <http://localhost:8003/docs> (disabled in production)
  - Health: GET /health
  - Capability areas: context summarization, semantic search, vector/embedding storage
  - Notes: GZip enabled for larger responses; request/response logging with processing-time header.

## Compression and logging

- GZip compression is enabled across services to reduce payload sizes for larger responses:
  - Core API: minimum_size=500
  - Agent Orchestrator: minimum_size=1000
  - Knowledge Service: minimum_size=500
- All services log to stdout; Knowledge Service adds per-request timing via X-Process-Time.

## Running locally

Each service can be run directly during development:

- Core API: python openagent-backends/core-api/run.py (port 8000)
- Agent Orchestrator (default): python -m uvicorn openagent-backends.agent-orchestrator.main:app --reload --port 8002
- Knowledge Service: python -m uvicorn openagent-backends.knowledge-service.main:app --reload --port 8003

Use the service-specific README files for environment variables and deeper details.
