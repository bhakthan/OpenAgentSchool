# ⚠️ DEPRECATED - Backend Archived

**Status**: This backend directory has been archived as of September 30, 2025.

## Why Archived?

This backend directory was a **partial duplicate** of the full backend service located at:
- **Main Backend Repository**: `C:\code\backend` (oas-knowledge-service)

### Feature Comparison

| Feature | backend.archived | oas-knowledge-service |
|---------|------------------|----------------------|
| AI Skills API | ✅ | ✅ |
| Agent Patterns API | ✅ | ✅ |
| Knowledge API | ✅ | ✅ |
| Community API | ❌ | ✅ |
| Quiz System | ❌ | ✅ |
| Progress Tracking | ❌ | ✅ |
| User Management | ❌ | ✅ |
| Study Modes | ❌ | ✅ |
| Database Layer | ❌ | ✅ (DuckDB) |
| Docker Support | ❌ | ✅ (7 containers) |
| Tests | ❌ | ✅ (8+ tests) |
| CI/CD | ❌ | ✅ (GitHub Actions) |

**Score**: 3 features vs 15 features

## Migration Path

### For Frontend Developers

**Old Configuration** (.env):
```env
VITE_API_BASE_URL=http://localhost:8000
# Uses OpenAgentSchool/backend (limited)
```

**New Configuration** (.env):
```env
VITE_API_BASE_URL=http://localhost:8000
# Now points to oas-knowledge-service (full features)
```

### API Endpoints (Unchanged)

The following endpoints work **identically** in both backends:
- `GET /api/v1/ai-skills/list` - Get AI skills catalog
- `GET /api/v1/ai-skills/{skill_id}` - Get skill by ID
- `POST /api/v1/ai-skills/reload` - Reload skills cache
- `GET /api/v1/agent-patterns/list` - Get agent patterns
- `GET /api/v1/agent-patterns/{pattern_id}` - Get pattern by ID
- `POST /api/v1/agent-patterns/reload` - Reload patterns cache
- `GET /api/v1/knowledge/health` - Health check

### Running the Full Backend

Instead of this archived backend, use:

```powershell
# Navigate to full backend
cd C:\code\backend

# Start Docker services (recommended)
docker-compose up -d

# OR run directly with uvicorn
uvicorn backend.main:app --reload --port 8000
```

## What Was Deleted?

This directory originally contained:
- `app/api/v1/ai_skills.py` - Now in oas-knowledge-service
- `app/api/v1/agent_patterns.py` - Now in oas-knowledge-service  
- `app/api/v1/knowledge.py` - Now in oas-knowledge-service
- `app/services/ai_skills.py` - Now in oas-knowledge-service
- `app/services/agent_patterns.py` - Now in oas-knowledge-service
- `config.py` - Minimal version, full config in oas-knowledge-service
- `main.py` - Minimal version, full app in oas-knowledge-service

## Additional Features in Full Backend

By switching to oas-knowledge-service, you gain access to:

1. **Community Features** (`/api/v1/community/*`)
   - Create posts, comments
   - Like/vote system
   - Tag-based filtering

2. **Quiz System** (`/api/v1/quiz/*`)
   - Category-based quizzes
   - Score tracking
   - Progress analytics

3. **User Management** (`/api/v1/users/*`)
   - JWT authentication
   - API key support
   - Azure AD integration

4. **Study Modes** (`/api/v1/study/*`)
   - Socratic dialogue
   - Scenario-based learning
   - Debug assistance
   - SCL (Structured Collaborative Learning)

5. **Progress Tracking** (`/api/v1/progress/*`)
   - Per-concept tracking
   - Completion metrics
   - Learning analytics

6. **Database Layer**
   - DuckDB embedded database
   - Migration support
   - Transaction management

7. **Vector Storage**
   - ChromaDB integration
   - Semantic search
   - RAG capabilities

## Questions?

- **Full Backend Repo**: `C:\code\backend`
- **Documentation**: See `CLEANUP_PLAN.md`, `DUPLICATION_ANALYSIS.md`
- **Contact**: Check oas-knowledge-service README.md

## Archived On

- **Date**: September 30, 2025
- **Reason**: Duplicate code consolidation
- **Decision**: Keep oas-knowledge-service as single source of truth
