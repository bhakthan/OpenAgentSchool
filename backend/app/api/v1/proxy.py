from fastapi import APIRouter, Request, HTTPException, status
import httpx
from config import settings

proxy_router = APIRouter()

@proxy_router.post("/workflows/execute")
async def proxy_workflow_execute(request: Request):
    """Proxy workflow execution to the Agent Orchestrator service.

    Forwards JSON body and X-Request-Id header. Returns upstream JSON as-is.
    """
    try:
        payload = await request.json()
    except Exception:
        payload = None

    req_id = getattr(request.state, "request_id", None) or request.headers.get("X-Request-Id")
    headers = {}
    if req_id:
        headers["X-Request-Id"] = req_id

    url = f"{settings.ORCHESTRATOR_URL.rstrip('/')}/api/v1/workflows/execute"

    timeout = httpx.Timeout(settings.ORCHESTRATOR_TIMEOUT)
    async with httpx.AsyncClient(timeout=timeout) as client:
        try:
            resp = await client.post(url, json=payload, headers=headers)
            resp.raise_for_status()
            return resp.json()
        except httpx.HTTPStatusError as e:
            # Bubble up upstream error with consistent error shape
            raise HTTPException(
                status_code=e.response.status_code,
                detail={
                    "error": "Upstream Error",
                    "upstream_status": e.response.status_code,
                    "upstream_body": e.response.text,
                    "path": str(request.url.path),
                    "request_id": req_id,
                },
            )
        except httpx.RequestError as e:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail={
                    "error": "Upstream Unavailable",
                    "detail": str(e),
                    "path": str(request.url.path),
                    "request_id": req_id,
                },
            )

@proxy_router.get("/workflows/{workflow_id}/status")
async def proxy_workflow_status(workflow_id: str, request: Request):
    """Proxy workflow status polling to the Agent Orchestrator service."""
    req_id = getattr(request.state, "request_id", None) or request.headers.get("X-Request-Id")
    headers = {}
    if req_id:
        headers["X-Request-Id"] = req_id

    url = f"{settings.ORCHESTRATOR_URL.rstrip('/')}/api/v1/workflows/{workflow_id}/status"

    timeout = httpx.Timeout(settings.ORCHESTRATOR_TIMEOUT)
    async with httpx.AsyncClient(timeout=timeout) as client:
        try:
            resp = await client.get(url, headers=headers)
            resp.raise_for_status()
            return resp.json()
        except httpx.HTTPStatusError as e:
            raise HTTPException(
                status_code=e.response.status_code,
                detail={
                    "error": "Upstream Error",
                    "upstream_status": e.response.status_code,
                    "upstream_body": e.response.text,
                    "path": str(request.url.path),
                    "request_id": req_id,
                },
            )
        except httpx.RequestError as e:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail={
                    "error": "Upstream Unavailable",
                    "detail": str(e),
                    "path": str(request.url.path),
                    "request_id": req_id,
                },
            )