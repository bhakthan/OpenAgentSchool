from fastapi import APIRouter, HTTPException, Query

try:  # pragma: no cover
    from backend.app.schemas.ai_skills import Skill, SkillListResponse  # type: ignore
    from backend.app.services.ai_skills import clear_cache, get_skill, list_skills, search_skills  # type: ignore
except ImportError:  # pragma: no cover
    from ...schemas.ai_skills import Skill, SkillListResponse
    from ...services.ai_skills import clear_cache, get_skill, list_skills, search_skills

router = APIRouter()


@router.get("/ai-skills/list", response_model=SkillListResponse, summary="List all AI-native skills")
async def get_skills() -> SkillListResponse:
    try:
        items = list_skills()
    except FileNotFoundError as exc:  # pragma: no cover - surfaced via 500
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    return SkillListResponse(items=items)


@router.get(
    "/ai-skills/search",
    response_model=SkillListResponse,
    summary="Search AI-native skills by keyword",
)
async def search_skills_endpoint(
    q: str = Query(..., min_length=1, description="Search text"),
    limit: int = Query(50, ge=1, le=200, description="Maximum number of results"),
) -> SkillListResponse:
    try:
        results = search_skills(q)
    except FileNotFoundError as exc:  # pragma: no cover - surfaced via 500
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    return SkillListResponse(items=results[:limit])


@router.get(
    "/ai-skills/{skill_id}",
    response_model=Skill,
    summary="Retrieve a single skill by id",
)
async def get_skill_by_id(skill_id: str) -> Skill:
    try:
        skill = get_skill(skill_id)
    except FileNotFoundError as exc:  # pragma: no cover - surfaced via 500
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    return skill


@router.post(
    "/ai-skills/reload",
    status_code=202,
    summary="Invalidate and refresh the AI-native skills cache",
)
async def reload_skills() -> dict:
    clear_cache()
    try:
        items = list_skills()
    except FileNotFoundError as exc:  # pragma: no cover - surfaced via 500
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    return {"status": "reloaded", "count": len(items)}
