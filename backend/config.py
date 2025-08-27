import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    # Database
    DATABASE_TYPE = os.getenv("DATABASE_TYPE", "duckdb")  # "duckdb" or "cosmosdb"
    DUCKDB_PATH = os.getenv("DUCKDB_PATH", "./data/openagentschool.db")
    
    # Azure CosmosDB (when DATABASE_TYPE is "cosmosdb")
    COSMOS_ENDPOINT = os.getenv("COSMOS_ENDPOINT")
    COSMOS_KEY = os.getenv("COSMOS_KEY")
    COSMOS_DATABASE_NAME = os.getenv("COSMOS_DATABASE_NAME", "openagentschool")
    
    # API
    API_V1_STR = "/api/v1"
    PROJECT_NAME = "Open Agent School API"
    HOST = os.getenv("HOST", "0.0.0.0")
    PORT = int(os.getenv("PORT", "8000"))
    
    # Orchestrator
    ORCHESTRATOR_URL = os.getenv("ORCHESTRATOR_URL", "http://localhost:8001")
    ORCHESTRATOR_TIMEOUT = float(os.getenv("ORCHESTRATOR_TIMEOUT", "30"))
    
    # Security
    SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-this-in-production")
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 30
    
    # CORS
    # Accept comma-separated origins from env (e.g., http://localhost:5173,http://localhost:3000)
    _cors_raw = os.getenv("BACKEND_CORS_ORIGINS", "http://localhost:3000,http://localhost:5173")
    BACKEND_CORS_ORIGINS = [o.strip() for o in _cors_raw.split(",") if o.strip()]

settings = Settings()
