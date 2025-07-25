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
    
    # Security
    SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-this-in-production")
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 30
    
    # CORS
    BACKEND_CORS_ORIGINS = ["http://localhost:3000", "http://localhost:5173"]

settings = Settings()
