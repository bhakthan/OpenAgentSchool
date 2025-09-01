from fastapi import FastAPI, Request, Header, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse
import uuid
import os
import yaml
from typing import Optional

from config import settings
from app.api.v1.api import api_router
try:
    from app.middleware.schema_validation import schema_validation_middleware  # type: ignore
except Exception:
    schema_validation_middleware = None  # type: ignore

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
    if schema_validation_middleware:
        app.middleware("http")(schema_validation_middleware)
    
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

    # Export OpenAPI YAML so clients can consume it easily
    @app.get("/openapi.yaml", include_in_schema=False)
    async def openapi_yaml():
        spec = app.openapi()
        text = yaml.safe_dump(spec, sort_keys=False)
        outdir = settings.OPENAPI_YAML_OUTDIR
        try:
            os.makedirs(outdir, exist_ok=True)
            with open(os.path.join(outdir, "openapi.yaml"), "w", encoding="utf-8") as f:
                f.write(text)
        except Exception:
            # ignore write errors; still return content
            pass
        return JSONResponse(content={"ok": True, "message": "YAML generated", "path": f"{outdir}/openapi.yaml"})
    
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

    # Bearer/AAD JWT validation (optional) + API key fallback
    @app.middleware("http")
    async def auth_guard(request: Request, call_next):
        # Allow health and openapi endpoints without auth
        if request.url.path in ["/", "/health", "/health/live", "/health/ready", "/openapi.yaml", f"{settings.API_V1_STR}/openapi.json"]:
            return await call_next(request)
        # Prefer Bearer token if AAD config present
        if settings.AAD_JWKS_URL and settings.AAD_ISSUER and settings.AAD_AUDIENCE:
            auth = request.headers.get("authorization") or request.headers.get("Authorization")
            token = None
            if auth and auth.lower().startswith("bearer "):
                token = auth.split(" ", 1)[1].strip()
            if not token:
                return JSONResponse(status_code=401, content={"error": "unauthorized", "message": "missing bearer token"})
            try:
                # Lazy import to avoid hard dependency when AAD is not used
                from jose import jwt as jose_jwt  # type: ignore
                import httpx  # type: ignore
                # Fetch JWKS and validate
                async with httpx.AsyncClient(timeout=5) as client:
                    jwks = (await client.get(settings.AAD_JWKS_URL)).json()
                headers = jose_jwt.get_unverified_header(token)
                kid = headers.get("kid")
                key = None
                for k in jwks.get("keys", []):
                    if k.get("kid") == kid:
                        key = k
                        break
                if not key:
                    return JSONResponse(status_code=401, content={"error": "unauthorized", "message": "JWKS key not found"})
                payload = jose_jwt.decode(
                    token,
                    key,
                    algorithms=[key.get("alg", "RS256")],
                    audience=settings.AAD_AUDIENCE,
                    issuer=settings.AAD_ISSUER,
                    options={"verify_at_hash": False},
                )
                request.state.user = payload
            except Exception:
                return JSONResponse(status_code=401, content={"error": "unauthorized", "message": "invalid bearer token"})
        else:
            # API key check when no AAD configured
            keys = settings.API_KEYS
            if keys:
                api_key = request.headers.get("x-api-key") or request.query_params.get("api_key")
                if not api_key or api_key not in keys:
                    return JSONResponse(status_code=401, content={"error": "unauthorized", "message": "invalid API key"})
        return await call_next(request)

    # Rate limiter (memory or Redis)
    if settings.RATE_LIMIT_BACKEND == "redis" and settings.REDIS_URL:
        try:
            import aioredis  # type: ignore
        except Exception:
            aioredis = None  # type: ignore

        @app.on_event("startup")
        async def _init_redis():
            if aioredis:
                app.state.redis = await aioredis.from_url(settings.REDIS_URL, encoding="utf-8", decode_responses=True)

        @app.on_event("shutdown")
        async def _close_redis():
            if getattr(app.state, "redis", None):
                await app.state.redis.close()

        @app.middleware("http")
        async def rate_limit(request: Request, call_next):
            if request.url.path in ["/", "/health", "/health/live", "/health/ready", "/openapi.yaml", f"{settings.API_V1_STR}/openapi.json"]:
                return await call_next(request)
            r = getattr(app.state, "redis", None)
            if not r:
                return await call_next(request)
            key = request.client.host if request.client else "anonymous"
            import time
            window = int(time.time()) // 60
            rk = f"rl:{key}:{window}"
            # increment and set expiry
            val = await r.incr(rk)
            if val == 1:
                await r.expire(rk, 60)
            if val > settings.RATE_LIMIT_PER_MINUTE:
                return JSONResponse(status_code=429, content={"error": "rate_limited", "message": "Too many requests"})
            return await call_next(request)
    else:
        from time import time
        buckets = {}

        @app.middleware("http")
        async def rate_limit(request: Request, call_next):
            if request.url.path in ["/", "/health", "/health/live", "/health/ready", "/openapi.yaml", f"{settings.API_V1_STR}/openapi.json"]:
                return await call_next(request)
            key = request.client.host if request.client else "anonymous"
            now = int(time())
            window = now // 60
            bucket_key = f"{key}:{window}"
            count = buckets.get(bucket_key, 0)
            limit = settings.RATE_LIMIT_PER_MINUTE
            if count >= limit:
                return JSONResponse(status_code=429, content={"error": "rate_limited", "message": "Too many requests"})
            buckets[bucket_key] = count + 1
            return await call_next(request)

    # Optional: OpenTelemetry (basic) if OTEL_EXPORTER_OTLP_ENDPOINT is set
    if os.getenv("OTEL_EXPORTER_OTLP_ENDPOINT"):
        try:
            from opentelemetry import trace  # type: ignore
            from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter  # type: ignore
            from opentelemetry.sdk.trace import TracerProvider  # type: ignore
            from opentelemetry.sdk.trace.export import BatchSpanProcessor  # type: ignore
            from opentelemetry.sdk.resources import Resource  # type: ignore

            resource = Resource.create({"service.name": settings.PROJECT_NAME})
            provider = TracerProvider(resource=resource)
            trace.set_tracer_provider(provider)
            span_exporter = OTLPSpanExporter()
            span_processor = BatchSpanProcessor(span_exporter)
            provider.add_span_processor(span_processor)
        except Exception:
            pass

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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host=settings.HOST, port=settings.PORT, reload=True)
