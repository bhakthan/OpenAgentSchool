from fastapi import APIRouter, Query, HTTPException
from typing import Optional
from app.providers.concept_bank import concept_bank

router = APIRouter()

@router.get("/list")
async def list_concepts(limit: int = Query(50, ge=1, le=200), offset: int = Query(0, ge=0)):
    return {"items": concept_bank.list(limit=limit, offset=offset)}

@router.get("/search")
async def search_concepts(q: Optional[str] = None, limit: int = Query(20, ge=1, le=200)):
    return {"items": concept_bank.search(q=q, limit=limit)}

@router.get("/{concept_id}")
async def get_concept(concept_id: str):
    c = concept_bank.get(concept_id)
    if not c:
        raise HTTPException(status_code=404, detail={"error": "not_found", "message": "Concept not found"})
    return c
