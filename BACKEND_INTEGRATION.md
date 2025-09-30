# Backend Integration Guide

**OpenAgentSchool Frontend** ↔ **Microservices Backend**

This guide explains how the OpenAgentSchool frontend integrates with the three-service backend architecture.

---

## 🏗️ Architecture Overview

The frontend connects to three independent microservices:

```
┌─────────────────────────────────────────────────────────────┐
│                    OpenAgentSchool                          │
│                  (Next.js/React/Vite)                       │
│                     Port 3000/5173                          │
└──────────────┬──────────────┬───────────────┬──────────────┘
               │              │               │
         ┌─────▼─────┐  ┌────▼─────┐   ┌────▼──────┐
         │ Core API  │  │  Agent   │   │ Knowledge │
         │  :8000    │  │  Orch    │   │  Service  │
         │           │  │  :8002   │   │   :8003   │
         └───────────┘  └──────────┘   └───────────┘
```

### Service Responsibilities

| Service | Port | Purpose | Used By Frontend Features |
|---------|------|---------|--------------------------|
| **Core API** | 8000 | User management, quiz system, progress tracking, community features | User profiles, quiz system, progress dashboards, community |
| **Agent Orchestrator** | 8002 | AI agents, critical thinking workflows, educational frameworks | Study Mode, AI Skills, Agent Patterns, Critical Thinking |
| **Knowledge Service** | 8003 | Document processing, semantic search, knowledge bases | AI Safety docs, reference materials, semantic search |

---

## 📚 Documentation

Detailed technical documentation is available in:

- **[Architecture Overview](./docs/backend/ARCHITECTURE_OVERVIEW.md)**
  - Complete system architecture
  - Service comparison table
  - Environment variables (70+ variables)
  - Development workflow
  - Deployment architecture
  - Testing strategy

- **[Service Dependencies](./docs/backend/SERVICE_DEPENDENCIES.md)**
  - Mermaid dependency diagrams
  - Startup sequence diagrams
  - Data flow examples
  - Health check endpoints
  - Failure scenarios & mitigation

---

## 🚀 Quick Start

### 1. Start Backend Services

From the OpenAgentSchool directory:

```powershell
# Start all three backend services with health checks
.\start-backend.ps1
```

This script will:
- ✅ Build and start Core API (8000)
- ✅ Build and start Agent Orchestrator (8002)
- ✅ Build and start Knowledge Service (8003)
- ✅ Wait for health checks to pass
- ✅ Display service URLs and documentation links

### 2. Verify Backend Health

Open these URLs to verify services are running:

- **Core API Docs:** http://localhost:8000/docs
- **Agent Orchestrator Docs:** http://localhost:8002/api/v1/docs
- **Knowledge Service Docs:** http://localhost:8003/docs

### 3. Configure Frontend Environment

Your `.env.local` should have:

```env
# Backend service URLs
VITE_CORE_API_URL=http://localhost:8000
VITE_ORCHESTRATOR_SERVICE_URL=http://localhost:8002
VITE_KNOWLEDGE_SERVICE_URL=http://localhost:8003

# Knowledge service specific paths
VITE_KNOWLEDGE_INGEST_PATH=/api/v1/documents/upload
VITE_KNOWLEDGE_BASE_ID=1
```

### 4. Start Frontend

```powershell
npm run dev
```

Frontend will be available at: http://localhost:5173

### 5. Stop Backend Services

```powershell
.\stop-backend.ps1
```

---

## 🔌 Frontend Integration Points

### Core API Integration (Port 8000)

**Authentication:**
```typescript
// JWT-based authentication
const response = await fetch('http://localhost:8000/api/v1/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password })
});
const { access_token } = await response.json();
```

**Quiz System:**
```typescript
// Get quiz questions
const quizzes = await fetch('http://localhost:8000/api/v1/quiz/available', {
  headers: { 'Authorization': `Bearer ${token}` }
});

// Submit quiz answer
await fetch('http://localhost:8000/api/v1/quiz/submit', {
  method: 'POST',
  headers: { 
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ quiz_id, answer })
});
```

**Progress Tracking:**
```typescript
// Get user progress
const progress = await fetch('http://localhost:8000/api/v1/progress/summary', {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

### Agent Orchestrator Integration (Port 8002)

**Critical Thinking Workflows:**
```typescript
// Start critical thinking session
const session = await fetch('http://localhost:8002/api/v1/workflows', {
  method: 'POST',
  headers: {
    'x-api-key': process.env.VITE_ORCHESTRATOR_API_KEY,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    workflow_type: 'critical_thinking',
    problem: 'User submitted problem',
    frameworks: ['blooms', 'paul_elder']
  })
});
```

**Agent Playground:**
```typescript
// Send message to agent
const response = await fetch('http://localhost:8002/api/v1/playground/messages', {
  method: 'POST',
  headers: {
    'x-api-key': process.env.VITE_ORCHESTRATOR_API_KEY,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    session_id,
    message: 'User query',
    agent_type: 'critical_thinker'
  })
});
```

### Knowledge Service Integration (Port 8003)

**Document Upload:**
```typescript
// Upload document for processing
const formData = new FormData();
formData.append('file', file);
formData.append('knowledge_base_id', '1');

const upload = await fetch('http://localhost:8003/api/v1/documents/upload', {
  method: 'POST',
  headers: { 'x-api-key': process.env.VITE_KNOWLEDGE_API_KEY },
  body: formData
});
```

**Semantic Search:**
```typescript
// Search knowledge base
const results = await fetch('http://localhost:8003/api/v1/search', {
  method: 'POST',
  headers: {
    'x-api-key': process.env.VITE_KNOWLEDGE_API_KEY,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: 'machine learning ethics',
    knowledge_base_id: 1,
    search_type: 'hybrid', // or 'semantic' or 'keyword'
    limit: 10
  })
});
```

---

## 🛠️ Development Workflow

### Typical Development Session

1. **Start backend services:**
   ```powershell
   .\start-backend.ps1
   ```

2. **Start frontend dev server:**
   ```powershell
   npm run dev
   ```

3. **Develop and test:**
   - Frontend available at http://localhost:5173
   - API docs at http://localhost:8000/docs (Core)
   - API docs at http://localhost:8002/api/v1/docs (Orchestrator)
   - API docs at http://localhost:8003/docs (Knowledge)

4. **Monitor logs** (if needed):
   ```powershell
   # In separate terminals
   cd c:\code\openagent-backend\core-api
   docker compose logs -f
   
   cd c:\code\openagent-backend\agent-orchestrator
   docker compose logs -f
   
   cd c:\code\openagent-backend\knowledge-service
   docker compose logs -f
   ```

5. **Stop services** when done:
   ```powershell
   .\stop-backend.ps1
   ```

### Troubleshooting

**Service won't start:**
```powershell
# Check Docker status
docker ps -a

# Restart specific service
cd c:\code\openagent-backend\<service-name>
docker compose restart

# Full rebuild
docker compose down
docker compose up -d --build
```

**Port already in use:**
```powershell
# Find process using port
netstat -ano | findstr :8000

# Kill process (use PID from above)
taskkill /PID <pid> /F
```

**CORS errors:**
- Verify `.env.local` has correct URLs
- Check backend CORS configuration allows `http://localhost:5173`
- Backend services have CORS configured in their respective `config.py` files

---

## 🧪 Testing Integration

### Manual API Testing

Use the Swagger/OpenAPI docs:
- **Core API:** http://localhost:8000/docs
- **Agent Orchestrator:** http://localhost:8002/api/v1/docs  
- **Knowledge Service:** http://localhost:8003/docs

### Frontend Integration Tests

```typescript
// Example integration test using Vitest
import { describe, it, expect } from 'vitest';

describe('Backend Integration', () => {
  it('should connect to Core API', async () => {
    const response = await fetch('http://localhost:8000/health');
    expect(response.status).toBe(200);
  });

  it('should connect to Agent Orchestrator', async () => {
    const response = await fetch('http://localhost:8002/api/v1/health/live');
    expect(response.status).toBe(200);
  });

  it('should connect to Knowledge Service', async () => {
    const response = await fetch('http://localhost:8003/health');
    expect(response.status).toBe(200);
  });
});
```

---

## 📊 Feature to Service Mapping

| Frontend Feature | Backend Service(s) | Endpoints Used |
|------------------|-------------------|----------------|
| User Login/Registration | Core API | `/api/v1/auth/*` |
| Quiz System | Core API | `/api/v1/quiz/*` |
| Progress Dashboard | Core API | `/api/v1/progress/*` |
| Community Features | Core API | `/api/v1/community/*` |
| Study Mode (Socratic) | Agent Orchestrator | `/api/v1/workflows`, `/api/v1/critical_thinking/*` |
| AI Skills Reference | Core API | `/api/v1/ai_skills/*` |
| Agent Patterns | Core API | `/api/v1/agent_patterns/*` |
| AI Safety Docs | Knowledge Service | `/api/v1/search`, `/api/v1/documents/*` |
| Learning Journey Map | Core API (progress) | `/api/v1/progress/journey` |
| Concept Hub | Core API + Agent Orchestrator | Various endpoints |

---

## 🔒 Authentication Patterns

### Core API (JWT)
```typescript
// Login and store token
const { access_token } = await login(username, password);
localStorage.setItem('auth_token', access_token);

// Use token in requests
const headers = {
  'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
  'Content-Type': 'application/json'
};
```

### Agent Orchestrator (API Key)
```typescript
// Use environment variable
const headers = {
  'x-api-key': import.meta.env.VITE_ORCHESTRATOR_API_KEY,
  'Content-Type': 'application/json'
};
```

### Knowledge Service (API Key)
```typescript
// Use environment variable
const headers = {
  'x-api-key': import.meta.env.VITE_KNOWLEDGE_API_KEY,
  'Content-Type': 'application/json'
};
```

---

## 🚢 Production Deployment

### Environment Variables (Production)

```env
# Production backend URLs (Azure Container Apps)
VITE_CORE_API_URL=https://oas-core-api.azurecontainerapps.io
VITE_ORCHESTRATOR_SERVICE_URL=https://oas-agent-orchestrator.azurecontainerapps.io
VITE_KNOWLEDGE_SERVICE_URL=https://oas-knowledge-service.azurecontainerapps.io

# API Keys (from Azure Key Vault)
VITE_ORCHESTRATOR_API_KEY=${ORCHESTRATOR_API_KEY}
VITE_KNOWLEDGE_API_KEY=${KNOWLEDGE_API_KEY}
```

### Deployment Checklist

- [ ] Backend services deployed to Azure
- [ ] Environment variables updated to production URLs
- [ ] API keys securely stored and referenced
- [ ] CORS configuration allows production frontend domain
- [ ] Health checks passing in production
- [ ] SSL certificates configured
- [ ] Rate limiting configured
- [ ] Monitoring and logging enabled

---

## 📖 Additional Resources

- **[Architecture Overview](./docs/backend/ARCHITECTURE_OVERVIEW.md)** - Complete system architecture
- **[Service Dependencies](./docs/backend/SERVICE_DEPENDENCIES.md)** - Visual dependency diagrams
- **[API Overview](./docs/API_OVERVIEW.md)** - Frontend API contracts
- **[Azure Deployment](./docs/AZURE_DEPLOYMENT.md)** - Production deployment guide

---

## 🆘 Common Issues

### "Service Unavailable" Errors

**Symptom:** Frontend shows service unavailable
**Solution:**
1. Verify backend services are running: `docker ps`
2. Check health endpoints
3. Review service logs: `docker compose logs -f`
4. Restart services: `.\start-backend.ps1`

### CORS Errors

**Symptom:** Browser console shows CORS policy errors
**Solution:**
1. Verify `.env.local` URLs match running services
2. Check backend CORS configuration in `config.py`
3. Ensure frontend dev server is on expected port (5173)

### Authentication Failures

**Symptom:** 401 Unauthorized errors
**Solution:**
1. Check JWT token validity (Core API)
2. Verify API keys are set in environment (Orchestrator, Knowledge)
3. Ensure token is being sent in correct header format

### Slow Response Times

**Symptom:** API calls take >5 seconds
**Solution:**
1. Check if services are in cold start (first request)
2. Verify Redis is running (caching)
3. Review service logs for errors
4. Consider optimizing vector search queries

---

**Last Updated:** September 30, 2025  
**Maintained By:** OpenAgentSchool Team
