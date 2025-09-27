import json
import os
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from backend.main import app
from backend.app.services import ai_skills
from backend.config import settings


client = TestClient(app)


def setup_function() -> None:
    """Ensure cache isolation between tests."""
    ai_skills.clear_cache()


def teardown_function() -> None:
    ai_skills.clear_cache()


def test_list_returns_items_ordered() -> None:
    response = client.get("/api/v1/ai-skills/list")
    assert response.status_code == 200
    payload = response.json()
    assert "items" in payload
    assert isinstance(payload["items"], list)
    assert payload["items"], "Expected at least one skill in export"

    orders = [item.get("order", 0) for item in payload["items"]]
    assert orders == sorted(orders)


def test_get_skill_by_id() -> None:
    listing = client.get("/api/v1/ai-skills/list").json()["items"]
    sample_id = listing[0]["id"]
    detail = client.get(f"/api/v1/ai-skills/{sample_id}")
    assert detail.status_code == 200
    assert detail.json()["id"] == sample_id


def test_search_filters_results() -> None:
    response = client.get("/api/v1/ai-skills/search", params={"q": "security"})
    assert response.status_code == 200
    payload = response.json()
    assert payload["items"], "Search should return at least one result for 'security'"
    for item in payload["items"]:
        haystack = f"{item['title']} {item['description']}".lower()
        assert "security" in haystack


def test_unknown_skill_returns_404() -> None:
    response = client.get("/api/v1/ai-skills/non-existent-skill")
    assert response.status_code == 404
    assert response.json()["detail"] == "Skill not found"


def test_search_respects_limit() -> None:
    response = client.get("/api/v1/ai-skills/search", params={"q": "a", "limit": 3})
    assert response.status_code == 200
    payload = response.json()
    assert len(payload["items"]) <= 3


def test_reload_endpoint_busts_cache(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> None:
    skill_file = tmp_path / "skills.json"

    def write_payload(items) -> None:
        skill_file.write_text(json.dumps(items), encoding="utf-8")

    # Seed initial data and point settings to temp file
    write_payload([
        {"id": "initial", "title": "Initial Skill", "description": "", "level": "Beginner", "order": 0}
    ])
    monkeypatch.setattr(settings, "AI_SKILLS_EXPORT_PATH", skill_file)
    ai_skills.clear_cache()

    first = client.get("/api/v1/ai-skills/list").json()["items"][0]["title"]
    assert first == "Initial Skill"

    original_stat = skill_file.stat()

    # Rewrite without changing mtime so cache would normally retain old content
    write_payload([
        {"id": "updated", "title": "Updated Skill", "description": "", "level": "Beginner", "order": 0}
    ])
    os.utime(skill_file, (original_stat.st_atime, original_stat.st_mtime))

    still_cached = client.get("/api/v1/ai-skills/list").json()["items"][0]["title"]
    assert still_cached == "Initial Skill"

    reload_resp = client.post("/api/v1/ai-skills/reload")
    assert reload_resp.status_code == 202
    assert reload_resp.json()["count"] >= 1

    refreshed = client.get("/api/v1/ai-skills/list").json()["items"][0]["title"]
    assert refreshed == "Updated Skill"
