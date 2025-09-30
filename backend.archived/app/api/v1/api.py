from fastapi import APIRouter

api_router = APIRouter()

# Import and include only available routers to avoid ImportError in this minimal backend
try:
	from . import knowledge  # type: ignore
	api_router.include_router(knowledge.router, prefix="", tags=["knowledge"])
except Exception:
	pass

try:
	from . import ai_skills  # type: ignore
	api_router.include_router(ai_skills.router, prefix="", tags=["ai-skills"])
except Exception:
	pass

try:
	from . import agent_patterns  # type: ignore
	api_router.include_router(agent_patterns.router, prefix="", tags=["agent-patterns"])
except Exception:
	pass
