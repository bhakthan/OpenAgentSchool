from fastapi import APIRouter, Request
from .study_common import ScenarioInput, ScenarioResponse
from app.services.orchestrator import orchestrator
import time

router = APIRouter()

@router.post("/invoke", response_model=ScenarioResponse)
async def scenarios_invoke(payload: ScenarioInput, request: Request):
    start = time.perf_counter()
    core = await orchestrator.scenarios(payload.model_dump())
    resp = {
        "sessionId": payload.sessionId or "generated-session",
        "requestId": request.state.request_id if hasattr(request.state, "request_id") else None,
        "latencyMs": None,
        **core
    }
    resp["latencyMs"] = (time.perf_counter() - start) * 1000.0
    return resp
