---
name: docker-best-practices
description: |
  Audit and optimize Docker configuration for the backend microservices. Use this skill when:
  - Reviewing Dockerfiles for security, size, and build performance
  - Optimizing docker-compose.yml for local development
  - Ensuring consistent image tagging (no unintentional :latest in production)
  - Adding health checks, resource limits, or multi-stage builds
  - Debugging container startup failures or networking issues
  - Preparing Docker configuration for production deployment
---

# Docker Best Practices

Audit and optimize Docker configuration for the OpenAgentSchool backend microservices (core-api, agent-orchestrator, knowledge-service) and supporting infrastructure (Postgres, Redis, Qdrant).

## Overview

The backend at `C:\code\openagent-backend` uses Docker Compose for local orchestration with three FastAPI services and shared infrastructure (PostgreSQL, Redis, Qdrant, Nginx).

---

## Dockerfile Audit Checklist

For each service Dockerfile (`core-api/Dockerfile`, `agent-orchestrator/Dockerfile`, `knowledge-service/Dockerfile`):

### Security

```
□ Uses a specific base image tag (python:3.12-slim, not python:latest)
□ Runs as non-root user (USER appuser, not root)
□ No secrets in build args or ENV directives
□ .dockerignore excludes .env, .git, __pycache__, *.pyc, .venv
□ No unnecessary tools installed (curl, wget only if needed for health checks)
□ Base image is from a trusted source (Docker Official Images)
```

### Size Optimization

```
□ Uses slim or alpine base image (python:3.12-slim preferred over python:3.12)
□ Multi-stage build for any compiled dependencies
□ pip install --no-cache-dir to avoid caching wheels in the image
□ Combined RUN statements to reduce layers
□ Only production dependencies installed (no dev/test packages)
□ Temporary files cleaned up in the same RUN layer
```

### Build Performance

```
□ COPY requirements.txt before COPY . (leverages Docker layer cache)
□ .dockerignore is comprehensive (tests/, docs/, *.md, .git/)
□ Frequently changing files (source code) copied last
□ Build context is minimal
```

### Recommended Dockerfile Pattern

```dockerfile
# Multi-stage build for Python FastAPI service
FROM python:3.12-slim AS builder

WORKDIR /app

# Install dependencies first (cache layer)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Production stage
FROM python:3.12-slim

# Security: non-root user
RUN adduser --disabled-password --no-create-home appuser

WORKDIR /app

# Copy installed packages from builder
COPY --from=builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

# Copy application code
COPY . .

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')" || exit 1

USER appuser

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

## docker-compose.yml Audit Checklist

### Service Configuration

```
□ Pin image tags to specific versions (postgres:17-alpine, not postgres:latest)
□ Health checks defined for all services
□ Restart policy is appropriate (unless-stopped for dev, on-failure for prod)
□ Environment variables use .env file, not inline secrets
□ Volumes use named volumes, not bind mounts for data persistence
□ Resource limits set (mem_limit, cpus) for local development
```

### Networking

```
□ Services use a dedicated network (not default bridge)
□ Only necessary ports are exposed to the host
□ Internal services (postgres, redis) don't need host port mapping in production
□ Service names are used for inter-service communication (not localhost)
```

### Current Images to Track

| Image | Current Tag | Check For |
|-------|-------------|-----------|
| `postgres` | `15-alpine` | LTS status, security patches |
| `redis` | `7-alpine` | Stable release, CVEs |
| `qdrant/qdrant` | `latest` | ⚠️ Pin to specific version |
| `nginx` | `alpine` | ⚠️ Pin to specific version |
| `prom/prometheus` | `latest` | ⚠️ Pin to specific version |
| `grafana/grafana` | `latest` | ⚠️ Pin to specific version |

### Health Check Pattern

```yaml
services:
  core-api:
    healthcheck:
      test: ["CMD", "python", "-c", "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 10s
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy

  postgres:
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5
```

---

## .dockerignore Template

```
.git
.github
.env
.env.*
__pycache__
*.pyc
*.pyo
.pytest_cache
.mypy_cache
.venv
venv
node_modules
tests/
docs/
*.md
!README.md
.coverage
htmlcov/
*.egg-info/
dist/
build/
```

---

## Common Issues & Fixes

### `:latest` tag in production

```yaml
# BAD — unpredictable, can break between deployments
image: qdrant/qdrant:latest

# GOOD — reproducible builds
image: qdrant/qdrant:v1.12.0
```

### Secrets in docker-compose.yml

```yaml
# BAD — password in version control
environment:
  - POSTGRES_PASSWORD=password

# BETTER — use .env file (gitignored)
environment:
  - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}

# BEST — use Docker secrets (for Swarm/production)
secrets:
  - db_password
```

### Missing dependency ordering

```yaml
# BAD — service starts before database is ready
depends_on:
  - postgres

# GOOD — waits for health check
depends_on:
  postgres:
    condition: service_healthy
```

---

## Verification

```bash
# Lint Dockerfiles
docker run --rm -i hadolint/hadolint < core-api/Dockerfile

# Check compose config is valid
docker compose config

# Build all services
docker compose build

# Start and verify health
docker compose up -d
docker compose ps  # All should show "healthy"

# Check image sizes
docker images | grep openagent
```

---

## Rules

1. **Never use `:latest` in production** — always pin to a specific version tag
2. **Never run as root** — add a non-root user in every Dockerfile
3. **Never put secrets in Dockerfiles or docker-compose.yml** — use .env files or Docker secrets
4. **Always add health checks** — enables proper dependency ordering and monitoring
5. **Always have a .dockerignore** — prevents bloated build context
6. **Cache dependency layers** — COPY requirements.txt before COPY . .
7. **Use slim/alpine images** — minimize attack surface and image size
8. **Compose version** — the `version:` key is deprecated in Compose v2+; remove it
