# Open Agent School Backend

A FastAPI-based backend for the Open Agent School platform with DuckDB for local development and easy migration to Azure CosmosDB for production.

## Features

- **Community Features**: Posts, comments, and user interactions
- **Quiz Assessment**: Quiz questions, submissions, and results tracking
- **Knowledge Progress**: Learning progress tracking and analytics
- **User Management**: Registration, authentication, and user profiles
- **Database Abstraction**: Easy switching between DuckDB and Azure CosmosDB

## Quick Start

### Prerequisites

- Python 3.8+
- pip or conda

### Installation

1. **Install dependencies:**

   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Set up environment variables:**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Run the development server:**

   ```bash
   python run.py
   ```

   Or using uvicorn directly:

   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

4. **Access the API:**
   - API: <http://localhost:8000>
   - Interactive docs: <http://localhost:8000/docs>
   - OpenAPI spec: <http://localhost:8000/redoc>

## API Endpoints

### Authentication

- `POST /api/v1/users/register` - Register new user
- `POST /api/v1/users/login` - Login user

### Community

- `GET /api/v1/community/posts` - Get community posts
- `POST /api/v1/community/posts` - Create new post
- `GET /api/v1/community/posts/{id}` - Get specific post
- `POST /api/v1/community/comments` - Create comment

### Quiz

- `GET /api/v1/quiz/questions/{category}` - Get quiz questions
- `POST /api/v1/quiz/submit` - Submit quiz answers
- `GET /api/v1/quiz/results` - Get quiz results

### Progress

- `POST /api/v1/progress/update` - Update learning progress
- `GET /api/v1/progress/` - Get user progress
- `GET /api/v1/progress/concept/{concept_id}` - Get concept progress

### Health

- `GET /health` - Basic health
- `GET /health/live` - Liveness probe
- `GET /health/ready` - Readiness probe

### Proxy (orchestrator bridge)

- `POST /api/v1/workflows/execute` - Proxies to Agent Orchestrator at `${ORCHESTRATOR_URL}/api/v1/workflows/execute`
- `GET  /api/v1/workflows/{id}/status` - Proxies to `${ORCHESTRATOR_URL}/api/v1/workflows/{id}/status`

### Knowledge APIs

- Concepts
   - `GET /api/v1/concepts/list`
   - `GET /api/v1/concepts/search?q=...`
   - `GET /api/v1/concepts/{id}`
- Agent Patterns
   - `GET /api/v1/patterns/list`
   - `GET /api/v1/patterns/search?q=...`
   - `GET /api/v1/patterns/{id}`
- AI‑Skills
   - `GET /api/v1/ai-skills/list`
   - `GET /api/v1/ai-skills/search?q=...`
   - `GET /api/v1/ai-skills/{id}`

Study responses include attribution and related items:

```json
{
   "attribution": {
      "sources": [/* retrieval results */],
      "curated": [/* curated Qs */],
      "concepts": [/* matched concepts */],
      "patterns": [/* matched patterns */],
      "skills": [/* matched AI‑skills */]
   },
   "relatedConcepts": [/* same as attribution.concepts */],
   "relatedPatterns": [/* same as attribution.patterns */],
   "relatedSkills": [/* same as attribution.skills */]
}
```

## Database Configuration

### DuckDB (Default)

DuckDB is used by default for local development. The database file is stored in `./data/openagentschool.db`.

### Switching to Azure CosmosDB

1. **Update environment variables:**

   ```bash
   DATABASE_TYPE=cosmosdb
   COSMOS_ENDPOINT=https://your-cosmos-account.documents.azure.com:443/
   COSMOS_KEY=your-primary-key
   COSMOS_DATABASE_NAME=openagentschool
   ```

2. **Create CosmosDB repository (future implementation):**

   ```python
   # app/database/cosmosdb_repository.py
   class CosmosDBRepository(DatabaseRepository):
       # Implementation for Azure CosmosDB
   ```

## Project Structure

```text
backend/
├── app/
│   ├── api/
│   │   └── v1/
│   │       ├── auth.py          # Authentication utilities
│   │       ├── community.py     # Community endpoints
│   │       ├── quiz.py          # Quiz endpoints
│   │       ├── progress.py      # Progress endpoints
│   │       ├── users.py         # User endpoints
│   │       └── schemas.py       # Pydantic models
│   ├── database/
│   │   ├── repository.py        # Abstract repository interface
│   │   └── duckdb_repository.py # DuckDB implementation
│   └── models/
│       └── models.py            # SQLAlchemy models
├── data/                        # Database files
├── config.py                    # Configuration settings
├── main.py                      # FastAPI application
├── run.py                       # Development server
└── requirements.txt             # Python dependencies
```

## Frontend Integration

The backend is designed to integrate seamlessly with the React frontend. Example API service:

```typescript
import { authAPI, communityAPI, quizAPI, progressAPI } from '@/lib/api/backend';

// Login user
const login = await authAPI.login({ username, password });

// Create community post
const post = await communityAPI.createPost({
  title: "My Experience",
  content: "Great learning platform!",
  tags: ["feedback", "experience"]
});

// Take a quiz
const questions = await quizAPI.getQuestions("patterns", 5);
const result = await quizAPI.submitQuiz({
  category: "patterns",
  answers: { "1": "A", "2": "B" },
  time_taken: 300
});

// Update progress
await progressAPI.updateProgress({
  concept_id: "flow-visualization",
  concept_type: "concept",
  status: "completed",
  progress_percentage: 100
});
```

## Development

### Adding New Features

1. **Create database models** in `app/models/models.py`
2. **Add repository methods** in `app/database/repository.py` and implement in `app/database/duckdb_repository.py`
3. **Create Pydantic schemas** in `app/api/v1/schemas.py`
4. **Add API endpoints** in appropriate files under `app/api/v1/`
5. **Include router** in `app/api/v1/api.py`

### Testing

```bash
pytest
```

### AI‑skills: how to run (export → ingest → query)

1) Export from UI source

```bash
node ./scripts/export-ai-skills.mjs
```

1) Ingest into DuckDB (conda env recommended)

```bash
conda run -n oas-duckdb python backend/scripts/ingest_ai_skills_json.py --file data/export/ai_skills.json
```

1) Query APIs

```bash
curl http://localhost:8000/api/v1/ai-skills/list
```

## Deployment

### Azure Deployment

1. **Deploy to Azure App Service**
2. **Set up Azure CosmosDB**
3. **Configure environment variables**
4. **Update CORS origins for production**

### Docker Deployment

```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## Security

- JWT-based authentication
- Password hashing with bcrypt
- CORS configuration
- Environment-based configuration

## Future Enhancements

- [ ] Azure CosmosDB implementation
- [ ] Real-time features with WebSockets
- [ ] File upload support
- [ ] Advanced analytics
- [ ] Rate limiting
- [ ] Caching layer
- [ ] Email notifications
