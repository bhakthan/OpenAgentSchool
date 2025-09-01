from fastapi import APIRouter

api_router = APIRouter()

# Import and include only available routers to avoid ImportError in this minimal backend
try:
	from app.api.v1 import knowledge  # type: ignore
	api_router.include_router(knowledge.router, prefix="", tags=["knowledge"])  # exposes /api/v1/documents/upload
except Exception:
	pass
