from fastapi import APIRouter, Query
from typing import Optional
from app.providers.pattern_bank import pattern_bank


router = APIRouter()


@router.get("/list")
def list_patterns(limit: int = Query(50, ge=1, le=200), offset: int = Query(0, ge=0)):
    return {"items": pattern_bank.list(limit=limit, offset=offset)}


@router.get("/search")
def search_patterns(q: Optional[str] = None, limit: int = Query(20, ge=1, le=200)):
    return {"items": pattern_bank.search(q=q, limit=limit)}


@router.get("/{pattern_id}")
def get_pattern(pattern_id: str):
    item = pattern_bank.get(pattern_id)
    return item or {"error": "not_found"}
