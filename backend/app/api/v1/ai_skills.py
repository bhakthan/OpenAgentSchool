from fastapi import APIRouter, HTTPException, Query

from app.providers.skill_bank import list_skills, get_skill, search_skills


router = APIRouter()


@router.get("/list")
def list_ai_skills(limit: int = Query(200, ge=1, le=500), offset: int = Query(0, ge=0)):
    return {"items": list_skills(limit=limit, offset=offset)}


@router.get("/search")
def search_ai_skills(q: str, limit: int = Query(50, ge=1, le=200), offset: int = Query(0, ge=0)):
    return {"items": search_skills(q=q, limit=limit, offset=offset)}


@router.get("/{skill_id}")
def get_ai_skill(skill_id: str):
    item = get_skill(skill_id)
    if not item:
        raise HTTPException(status_code=404, detail="Skill not found")
    return item
