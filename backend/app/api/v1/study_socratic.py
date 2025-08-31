from fastapi import APIRouter, Request
from .study_common import SocraticInput, SocraticResponse
from app.services.orchestrator import orchestrator
import time

router = APIRouter()

@router.post("/invoke", response_model=SocraticResponse)
async def socratic_invoke(payload: SocraticInput, request: Request):
    start = time.perf_counter()
    core = await orchestrator.socratic(payload.model_dump())
    resp = {
        "sessionId": payload.sessionId or "generated-session",
        "requestId": request.state.request_id if hasattr(request.state, "request_id") else None,
        "latencyMs": None,
        "usage": {"tokensIn": 0, "tokensOut": 0},
        **core
    }
    resp["latencyMs"] = (time.perf_counter() - start) * 1000.0
    return resp
