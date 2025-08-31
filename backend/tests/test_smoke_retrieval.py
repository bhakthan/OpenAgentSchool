import os
import asyncio
import httpx
import pytest

BASE = os.getenv("BASE_URL", "http://localhost:8000")
API = f"{BASE}/api/v1"

async def post_json(url, json, headers=None):
    async with httpx.AsyncClient(timeout=10) as client:
        r = await client.post(url, json=json, headers=headers)
        r.raise_for_status()
        return r.json()

async def _check_attribution(kind: str, payload: dict, headers=None):
    url = f"{API}/study/{kind}/invoke"
    data = await post_json(url, payload, headers=headers)
    sources = (((data or {}).get("attribution") or {}).get("sources"))
    assert isinstance(sources, list), f"missing sources for {kind}"
    # at least one item with required keys
    if sources:
        s = sources[0]
        for k in ["id", "title", "url", "snippet"]:
            assert k in s, f"{kind} source missing {k}"

async def run_suite(headers=None):
    # Socratic
    await _check_attribution("socratic", {"query": "What is agentic RAG?"}, headers=headers)
    # SCL
    await _check_attribution("scl", {"source": "Explain vector stores and embeddings."}, headers=headers)

@pytest.mark.asyncio
async def test_smoke_attribution():
    hdrs = None
    api_key = os.getenv("API_KEY") or os.getenv("X_API_KEY")
    if api_key:
        hdrs = {"x-api-key": api_key}
    await run_suite(headers=hdrs)

if __name__ == "__main__":
    # Example runs:
    #   BASE_URL=http://localhost:8000 API_KEYS=dev-key-1 python backend/tests/test_smoke_retrieval.py
    hdrs = None
    api_key = os.getenv("API_KEY") or os.getenv("X_API_KEY")
    if api_key:
        hdrs = {"x-api-key": api_key}
    asyncio.run(run_suite(headers=hdrs))
