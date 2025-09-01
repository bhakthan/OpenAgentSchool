"""
Root-level ASGI entrypoint to run the FastAPI backend with `uvicorn main:app`.
This simply re-exports the app from backend.main.
"""
from backend.main import app  # noqa: F401
