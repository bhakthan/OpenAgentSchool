from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import JSONResponse
import httpx
from typing import Optional
try:  # pragma: no cover
    from backend.config import settings  # type: ignore
except ImportError:  # pragma: no cover
    from ....config import settings

router = APIRouter()

@router.post("/documents/upload", tags=["knowledge"], summary="Proxy document upload to knowledge-service")
async def upload_document(
    knowledge_base_id: str = Form(...),
    file: UploadFile = File(...),
    metadata: Optional[str] = Form(None),
):
    """Proxies multipart/form-data upload to the configured knowledge-service.

    For local dev, this avoids browser CORS by letting the SPA call our backend at
    /api/v1/documents/upload while we forward to KNOWLEDGE_SERVICE_URL/api/v1/documents/upload.
    """
    target_base = settings.KNOWLEDGE_SERVICE_URL.rstrip("/")
    target_url = f"{target_base}/api/v1/documents/upload"

    try:
        async with httpx.AsyncClient(timeout=30) as client:
            # Rebuild multipart form for upstream
            files = {
                "file": (file.filename or "upload.txt", await file.read(), file.content_type or "text/plain"),
            }
            data = {
                "knowledge_base_id": knowledge_base_id,
            }
            if metadata is not None:
                data["metadata"] = metadata
            upstream = await client.post(target_url, data=data, files=files)
            content_type = upstream.headers.get("content-type", "application/json")
            # Pass-through status and body
            return JSONResponse(content=upstream.json() if "application/json" in content_type else {"raw": upstream.text}, status_code=upstream.status_code)
    except httpx.RequestError as e:
        raise HTTPException(status_code=502, detail=f"Upstream error: {e}")
