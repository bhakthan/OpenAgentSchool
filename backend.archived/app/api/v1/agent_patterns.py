from typing import Optional

from fastapi import APIRouter, HTTPException, Query

try:  # pragma: no cover
    from backend.app.schemas.agent_patterns import (  # type: ignore
        AgentPattern,
        AgentPatternListResponse,
        EvaluationCohort,
    )
    from backend.app.services.agent_patterns import (  # type: ignore
        clear_cache,
        get_pattern,
        list_patterns,
        search_patterns,
    )
except ImportError:  # pragma: no cover
    from ...schemas.agent_patterns import AgentPattern, AgentPatternListResponse, EvaluationCohort
    from ...services.agent_patterns import clear_cache, get_pattern, list_patterns, search_patterns

router = APIRouter()


@router.get(
    "/agent-patterns/list",
    response_model=AgentPatternListResponse,
    summary="List all agent patterns",
)
async def get_agent_patterns(
    cohort: Optional[EvaluationCohort] = Query(
        default=None,
        description="Optional evaluation cohort filter (education, multi-agent, advanced-automation, communication-interface, cognitive-sensing)",
    ),
) -> AgentPatternListResponse:
    try:
        items = list_patterns(cohort=cohort)
    except FileNotFoundError as exc:  # pragma: no cover
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    return AgentPatternListResponse(items=items)


@router.get(
    "/agent-patterns/search",
    response_model=AgentPatternListResponse,
    summary="Search agent patterns",
)
async def search_agent_patterns(
    q: str = Query(..., min_length=1, description="Search text"),
    limit: int = Query(50, ge=1, le=200, description="Maximum number of results to return"),
    cohort: Optional[EvaluationCohort] = Query(
        default=None,
        description="Optional evaluation cohort filter",
    ),
) -> AgentPatternListResponse:
    try:
        results = search_patterns(q, cohort=cohort)
    except FileNotFoundError as exc:  # pragma: no cover
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    return AgentPatternListResponse(items=results[:limit])


@router.get(
    "/agent-patterns/{pattern_id}",
    response_model=AgentPattern,
    summary="Retrieve a single agent pattern",
)
async def get_agent_pattern(pattern_id: str) -> AgentPattern:
    try:
        pattern = get_pattern(pattern_id)
    except FileNotFoundError as exc:  # pragma: no cover
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    if not pattern:
        raise HTTPException(status_code=404, detail="Pattern not found")
    return pattern


@router.post(
    "/agent-patterns/reload",
    status_code=202,
    summary="Invalidate and refresh the agent patterns cache",
)
async def reload_agent_patterns() -> dict:
    clear_cache()
    try:
        items = list_patterns()
    except FileNotFoundError as exc:  # pragma: no cover
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    return {"status": "reloaded", "count": len(items)}
