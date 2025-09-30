# Workspace Quick Reference

**Multi-Root VS Code Workspace** - OpenAgentSchool + Backend Services

---

## 📁 Workspace Structure

```
VS Code Workspace (Multi-root)
├── C:\code\OpenAgentSchool          # Frontend (Next.js/React/Vite)
└── C:\code\openagent-backend        # Backend (3 microservices)
    ├── core-api/                    # Port 8000
    ├── agent-orchestrator/          # Port 8002  
    └── knowledge-service/           # Port 8003
```

---

## 🚀 Quick Commands

### Start Everything

```powershell
# From OpenAgentSchool directory
.\start-backend.ps1    # Start all 3 backend services
npm run dev            # Start frontend (separate terminal)
```

### Stop Everything

```powershell
# From OpenAgentSchool directory
.\stop-backend.ps1     # Stop all backend services
Ctrl+C                 # Stop frontend dev server
```

---

## 🌐 Service URLs

| Service | URL | Docs |
|---------|-----|------|
| **Frontend** | http://localhost:5173 | - |
| **Core API** | http://localhost:8000 | http://localhost:8000/docs |
| **Agent Orchestrator** | http://localhost:8002 | http://localhost:8002/api/v1/docs |
| **Knowledge Service** | http://localhost:8003 | http://localhost:8003/docs |

---

## 📖 Documentation Map

### OpenAgentSchool Frontend
- **Main README**: `C:\code\OpenAgentSchool\README.md`
- **Backend Integration**: `C:\code\OpenAgentSchool\BACKEND_INTEGRATION.md` 📌
- **Architecture Docs**: `C:\code\OpenAgentSchool\docs\backend\`

### Backend Services
- **Main README**: `C:\code\openagent-backend\README.md`
- **Architecture Overview**: `C:\code\openagent-backend\ARCHITECTURE_OVERVIEW.md`
- **Service Dependencies**: `C:\code\openagent-backend\SERVICE_DEPENDENCIES.md`
- **Local Development**: `C:\code\openagent-backend\LOCAL_DEV.md`
- **Deployment Guide**: `C:\code\openagent-backend\DEPLOYMENT.md`

---

## 🔧 Configuration Files

### Frontend Environment
**File**: `C:\code\OpenAgentSchool\.env.local`

```env
# Backend service URLs
VITE_CORE_API_URL=http://localhost:8000
VITE_ORCHESTRATOR_SERVICE_URL=http://localhost:8002
VITE_KNOWLEDGE_SERVICE_URL=http://localhost:8003
```

### Backend Services
Each service has its own `.env` file:
- `C:\code\openagent-backend\core-api\.env`
- `C:\code\openagent-backend\agent-orchestrator\.env`
- `C:\code\openagent-backend\knowledge-service\.env`

---

## 🐛 Troubleshooting

### Backend Not Starting
```powershell
# Check Docker
docker ps -a

# View logs for specific service
cd C:\code\openagent-backend\<service-name>
docker compose logs -f

# Full rebuild
docker compose down
docker compose up -d --build
```

### Frontend Can't Connect
1. ✅ Verify `.env.local` has correct URLs
2. ✅ Check backend health endpoints
3. ✅ Verify CORS configuration in backend

### Port Already in Use
```powershell
# Find process using port
netstat -ano | findstr :8000

# Kill process (use PID from above)
taskkill /PID <pid> /F
```

---

## 📚 Key Directories

### Frontend Development
```
C:\code\OpenAgentSchool\
├── src/                    # React components
│   ├── components/         # UI components
│   ├── hooks/              # React hooks
│   └── lib/                # Utilities
├── public/                 # Static assets
└── docs/                   # Documentation
    └── backend/            # Backend integration docs 📌
```

### Backend Development
```
C:\code\openagent-backend\
├── core-api/
│   ├── app/                # FastAPI application
│   ├── data/               # Data exports
│   └── docker-compose.yml
├── agent-orchestrator/
│   ├── app/                # Orchestrator logic
│   └── docker-compose.yml
└── knowledge-service/
    ├── app/                # Knowledge service
    └── docker-compose.yml
```

---

## 🎯 Common Tasks

### View All Logs
```powershell
# Core API
cd C:\code\openagent-backend\core-api
docker compose logs -f

# Agent Orchestrator
cd C:\code\openagent-backend\agent-orchestrator
docker compose logs -f

# Knowledge Service
cd C:\code\openagent-backend\knowledge-service
docker compose logs -f
```

### Restart a Service
```powershell
cd C:\code\openagent-backend\<service-name>
docker compose restart
```

### Test API Endpoints
```powershell
# Test Core API health
curl http://localhost:8000/health

# Test Agent Orchestrator health
curl http://localhost:8002/api/v1/health/live

# Test Knowledge Service health
curl http://localhost:8003/health
```

---

## 🔍 Finding Information

| Need | Look Here |
|------|-----------|
| **Backend API endpoints** | `ARCHITECTURE_OVERVIEW.md` → Frontend Integration section |
| **Environment variables** | `ARCHITECTURE_OVERVIEW.md` → Environment Variables section |
| **Service dependencies** | `SERVICE_DEPENDENCIES.md` → Dependency Matrix |
| **Development workflow** | `BACKEND_INTEGRATION.md` → Development Workflow |
| **Troubleshooting** | `BACKEND_INTEGRATION.md` → Common Issues |
| **Data flow examples** | `SERVICE_DEPENDENCIES.md` → Data Flow Examples |
| **Deployment** | `DEPLOYMENT.md` in backend directory |

---

## 💡 Tips

1. **Keep terminals open**: One for frontend, one for logs
2. **Use health checks**: Always verify services are healthy before coding
3. **Check docs first**: Most answers are in the integration docs
4. **Docker commands**: Always run from service directory
5. **Environment files**: Never commit `.env` files to git

---

**Last Updated**: September 30, 2025  
**Workspace**: OpenAgentSchool + Backend Services
