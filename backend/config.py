import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

class Settings:
    # Database
    DATABASE_TYPE = os.getenv("DATABASE_TYPE", "duckdb")  # "duckdb" or "cosmosdb"
    # Default DuckDB path relative to this file (backend/data/openagentschool.db) so it works regardless of CWD
    _default_duckdb = str((Path(__file__).parent / "data" / "openagentschool.db").resolve())
    DUCKDB_PATH = os.getenv("DUCKDB_PATH", _default_duckdb)
    
    # Azure CosmosDB (when DATABASE_TYPE is "cosmosdb")
    COSMOS_ENDPOINT = os.getenv("COSMOS_ENDPOINT")
    COSMOS_KEY = os.getenv("COSMOS_KEY")
    COSMOS_DATABASE_NAME = os.getenv("COSMOS_DATABASE_NAME", "openagentschool")
    
    # API
    API_V1_STR = "/api/v1"
    PROJECT_NAME = "Open Agent School API"
    HOST = os.getenv("HOST", "0.0.0.0")
    PORT = int(os.getenv("PORT", "8000"))
    OPENAPI_YAML_OUTDIR = os.getenv("OPENAPI_YAML_OUTDIR", "./specs")
    
    # Orchestrator
    ORCHESTRATOR_URL = os.getenv("ORCHESTRATOR_URL", "http://localhost:8001")
    ORCHESTRATOR_TIMEOUT = float(os.getenv("ORCHESTRATOR_TIMEOUT", "30"))
    
    # Vector store configuration
    VECTOR_STORE_TYPE = os.getenv("VECTOR_STORE_TYPE", "stub")  # 'stub' | 'chroma' | 'azuresearch'
    # Chroma
    CHROMA_PERSIST_DIR = os.getenv("CHROMA_PERSIST_DIR", "./data/chroma")
    CHROMA_COLLECTION = os.getenv("CHROMA_COLLECTION", "study")
    CHROMA_EMBEDDING_MODEL = os.getenv("CHROMA_EMBEDDING_MODEL", "all-MiniLM-L6-v2")
    # Azure AI Search
    AZURE_SEARCH_ENDPOINT = os.getenv("AZURE_SEARCH_ENDPOINT")
    AZURE_SEARCH_KEY = os.getenv("AZURE_SEARCH_KEY")
    AZURE_SEARCH_INDEX = os.getenv("AZURE_SEARCH_INDEX")

    # Security
    SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-this-in-production")
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 30
    # API Key auth (comma-separated list of valid keys)
    _api_keys_raw = os.getenv("API_KEYS", "")
    API_KEYS = [k.strip() for k in _api_keys_raw.split(",") if k.strip()]
    # AAD (optional) – set these to enable JWT validation
    AAD_TENANT_ID = os.getenv("AAD_TENANT_ID")
    AAD_APP_ID = os.getenv("AAD_APP_ID")
    AAD_JWKS_URL = os.getenv("AAD_JWKS_URL")
    AAD_ISSUER = os.getenv("AAD_ISSUER")
    AAD_AUDIENCE = os.getenv("AAD_AUDIENCE")

    # Rate limiting
    RATE_LIMIT_PER_MINUTE = int(os.getenv("RATE_LIMIT_PER_MINUTE", "60"))
    RATE_LIMIT_BURST = int(os.getenv("RATE_LIMIT_BURST", "120"))
    RATE_LIMIT_BACKEND = os.getenv("RATE_LIMIT_BACKEND", "memory")  # 'memory' | 'redis'
    REDIS_URL = os.getenv("REDIS_URL")
    
    # CORS
    # Accept comma-separated origins from env (e.g., http://localhost:5173,http://localhost:3000)
    _cors_raw = os.getenv("BACKEND_CORS_ORIGINS", "http://localhost:3000,http://localhost:5173")
    BACKEND_CORS_ORIGINS = [o.strip() for o in _cors_raw.split(",") if o.strip()]

settings = Settings()
