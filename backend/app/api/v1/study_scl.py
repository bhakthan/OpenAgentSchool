from fastapi import APIRouter, Request
from .study_common import SCLInput, SCLResponse
from app.services.orchestrator import orchestrator
import time

router = APIRouter()

@router.post("/invoke", response_model=SCLResponse)
async def scl_invoke(payload: SCLInput, request: Request):
    start = time.perf_counter()
    core = await orchestrator.scl(payload.model_dump())
    resp = {
        "sessionId": payload.sessionId or "generated-session",
        "requestId": request.state.request_id if hasattr(request.state, "request_id") else None,
        "latencyMs": None,
        **core
    }
    resp["latencyMs"] = (time.perf_counter() - start) * 1000.0
    return resp
