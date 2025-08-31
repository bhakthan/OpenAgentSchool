from jsonschema import validate, ValidationError
from fastapi import Request
from starlette.responses import JSONResponse
import json
import os

# Load abridged schemas if available (optional)
SCHEMA_PATH = os.getenv("SCHEMA_PATH", os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../specs/api-contracts.json")))
try:
    with open(SCHEMA_PATH, "r", encoding="utf-8") as f:
        SCHEMAS = json.load(f)
except Exception:
    SCHEMAS = None

def get_input_schema(path: str):
    if not SCHEMAS:
        return None
    if path.endswith("/socratic/invoke"):
        return SCHEMAS["definitions"]["SocraticInput"]
    if path.endswith("/scenarios/invoke"):
        return SCHEMAS["definitions"]["ScenarioInput"]
    if path.endswith("/debug/invoke"):
        return SCHEMAS["definitions"]["DebugInput"]
    if path.endswith("/scl/invoke"):
        return SCHEMAS["definitions"]["SCLInput"]
    return None

async def schema_validation_middleware(request: Request, call_next):
    # Only validate POST on our invoke endpoints
    if request.method == "POST" and (request.url.path.endswith("/invoke")):
        try:
            body = await request.json()
        except Exception:
            return JSONResponse(status_code=400, content={"error": "validation_error", "message": "Invalid JSON"})
        schema = get_input_schema(request.url.path)
        if schema:
            try:
                validate(instance=body, schema=schema)
            except ValidationError as e:
                return JSONResponse(status_code=400, content={"error": "validation_error", "message": e.message})
    return await call_next(request)
