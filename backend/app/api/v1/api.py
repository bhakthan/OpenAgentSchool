from fastapi import APIRouter
from app.api.v1 import community, quiz, progress, users, study_socratic, study_scenarios, study_debug, study_scl, concepts, patterns, ai_skills

api_router = APIRouter()

api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(community.router, prefix="/community", tags=["community"])
api_router.include_router(quiz.router, prefix="/quiz", tags=["quiz"])
api_router.include_router(progress.router, prefix="/progress", tags=["progress"])
api_router.include_router(study_socratic.router, prefix="/socratic", tags=["study-socratic"])
api_router.include_router(study_scenarios.router, prefix="/scenarios", tags=["study-scenarios"])
api_router.include_router(study_debug.router, prefix="/debug", tags=["study-debug"])
api_router.include_router(study_scl.router, prefix="/scl", tags=["study-scl"])
api_router.include_router(concepts.router, prefix="/concepts", tags=["concepts"])
api_router.include_router(patterns.router, prefix="/patterns", tags=["patterns"])
api_router.include_router(ai_skills.router, prefix="/ai-skills", tags=["ai-skills"])
