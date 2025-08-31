import os
import httpx
import pytest

BASE = os.getenv("BASE_URL", "http://localhost:8000")
API = f"{BASE}/api/v1/ai-skills"


def test_list_ai_skills():
    with httpx.Client(timeout=10) as client:
        r = client.get(f"{API}/list")
        r.raise_for_status()
        data = r.json()
        assert isinstance(data, dict)
        items = data.get("items")
        assert isinstance(items, list)
        # if present, verify minimal shape
        if items:
            itm = items[0]
            for k in ["id", "title"]:
                assert k in itm


def test_get_ai_skill_via_list():
    with httpx.Client(timeout=10) as client:
        r1 = client.get(f"{API}/list")
        r1.raise_for_status()
        items = r1.json().get("items") or []
        if not items:
            pytest.skip("no ai-skills exported/ingested")
        skill_id = items[0]["id"]
        r2 = client.get(f"{API}/{skill_id}")
        r2.raise_for_status()
        obj = r2.json()
        assert obj.get("id") == skill_id
        assert obj.get("title")
from fastapi.testclient import TestClient
import os, sys

# Ensure workspace root (containing 'backend') is on sys.path
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir, os.pardir))
BACKEND_DIR = os.path.join(ROOT, "backend")
# Ensure 'backend' is importable as top-level (so backend/config.py can be imported as 'config')
for p in (BACKEND_DIR, ROOT):
    if p not in sys.path:
        sys.path.insert(0, p)

from backend.main import app  # type: ignore


client = TestClient(app)


def test_list_ai_skills_ok():
    r = client.get("/api/v1/ai-skills/list")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, dict)
    assert "items" in data
    assert isinstance(data["items"], list)


def test_search_ai_skills_ok():
    r = client.get("/api/v1/ai-skills/search", params={"q": "ai"})
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, dict)
    assert "items" in data


def test_get_ai_skill_404():
    r = client.get("/api/v1/ai-skills/__does_not_exist__")
    assert r.status_code == 404
