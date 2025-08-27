from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse
import uuid

from config import settings
from app.api.v1.api import api_router
from app.api.v1.proxy import proxy_router

def create_app() -> FastAPI:
    """Create FastAPI application"""
    app = FastAPI(
        title=settings.PROJECT_NAME,
        openapi_url=f"{settings.API_V1_STR}/openapi.json"
    )
    
    # Set up CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.BACKEND_CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    # GZip compression for larger responses (e.g., OpenAPI JSON)
    app.add_middleware(GZipMiddleware, minimum_size=500)
    
    # Include API router(s)
    app.include_router(api_router, prefix=settings.API_V1_STR)
    app.include_router(proxy_router, prefix=settings.API_V1_STR)
    
    @app.get("/")
    async def root():
        return {"message": "Open Agent School API", "version": "1.0.0"}
    
    @app.get("/health")
    async def health_check():
        return {"status": "healthy"}

    @app.get("/health/live")
    async def health_live():
        return {"status": "live"}

    @app.get("/health/ready")
    async def health_ready():
        # In a fuller setup, check DB/cache etc. For now, always ready.
        return {"status": "ready"}
    
    # Simple request timing header
    @app.middleware("http")
    async def add_process_time_header(request: Request, call_next):
        import time
        start_time = time.perf_counter()
        response = await call_next(request)
        process_time = time.perf_counter() - start_time
        response.headers["X-Process-Time"] = f"{process_time:.3f}"
        return response

    # X-Request-Id middleware
    @app.middleware("http")
    async def add_request_id(request: Request, call_next):
        req_id = request.headers.get("X-Request-Id") or str(uuid.uuid4())
        request.state.request_id = req_id
        response = await call_next(request)
        response.headers["X-Request-Id"] = req_id
        return response

    # Global error handlers with consistent shape
    @app.exception_handler(Exception)
    async def unhandled_exception_handler(request: Request, exc: Exception):
        req_id = getattr(request.state, "request_id", None)
        return JSONResponse(
            status_code=500,
            content={
                "error": "Internal Server Error",
                "detail": "An unexpected error occurred",
                "path": str(request.url.path),
                "request_id": req_id,
            },
        )
    
    return app

app = create_app()
