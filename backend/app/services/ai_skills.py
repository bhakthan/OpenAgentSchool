from __future__ import annotations

import json
from pathlib import Path
from threading import Lock
from typing import List, Optional

try:  # pragma: no cover
    from backend.config import settings  # type: ignore
    from backend.app.schemas.ai_skills import Skill  # type: ignore
except ImportError:  # pragma: no cover
    from ...config import settings
    from ..schemas.ai_skills import Skill


class _SkillCache:
    """Naïve file-backed cache with mtime-based invalidation."""

    def __init__(self) -> None:
        self._lock = Lock()
        self._skills: Optional[List[Skill]] = None
        self._mtime: Optional[float] = None
        self._path: Optional[Path] = None

    def _resolve_path(self) -> Path:
        path = Path(settings.AI_SKILLS_EXPORT_PATH)
        if not path.is_file():
            raise FileNotFoundError(f"AI skills export not found at {path}")
        return path

    def _load_skills(self, path: Path) -> List[Skill]:
        with path.open("r", encoding="utf-8") as fh:
            raw = json.load(fh)
        skills: List[Skill] = []
        for idx, item in enumerate(raw):
            # Provide default order if missing
            item.setdefault("order", idx)
            skills.append(Skill(**item))
        # Ensure deterministic ordering
        return sorted(skills, key=lambda s: (s.order, s.title.lower()))

    def _ensure_cache(self) -> None:
        path = self._resolve_path()
        try:
            mtime = path.stat().st_mtime
        except OSError as exc:  # pragma: no cover - handled above but defensive
            raise FileNotFoundError(f"Unable to stat AI skills export: {exc}") from exc

        if (
            self._skills is None
            or self._mtime != mtime
            or self._path is None
            or path != self._path
        ):
            self._skills = self._load_skills(path)
            self._mtime = mtime
            self._path = path

    def get_all(self) -> List[Skill]:
        with self._lock:
            self._ensure_cache()
            # Return a shallow copy so callers can't mutate the cache list
            return list(self._skills or [])

    def get_by_id(self, skill_id: str) -> Optional[Skill]:
        skills = self.get_all()
        target = skill_id.strip().lower()
        for skill in skills:
            candidate_ids = [skill.id.lower()]
            if skill.aliases:
                candidate_ids.extend(alias.lower() for alias in skill.aliases)
            if target in candidate_ids:
                return skill
        return None

    def search(self, query: str) -> List[Skill]:
        skills = self.get_all()
        terms = [term for term in query.lower().split() if term]
        if not terms:
            return skills
        results: List[Skill] = []
        for skill in skills:
            haystack = " ".join(
                filter(
                    None,
                    [
                        skill.id,
                        skill.title,
                        skill.description,
                        skill.level,
                        " ".join(skill.aliases) if skill.aliases else None,
                    ],
                )
            ).lower()
            if all(term in haystack for term in terms):
                results.append(skill)
        return results

    def clear(self) -> None:
        with self._lock:
            self._skills = None
            self._mtime = None
            self._path = None


_cache = _SkillCache()


def list_skills() -> List[Skill]:
    """Return all AI-native skills in their canonical order."""

    return _cache.get_all()


def get_skill(skill_id: str) -> Optional[Skill]:
    """Return a single skill by id or alias."""

    return _cache.get_by_id(skill_id)


def search_skills(query: str) -> List[Skill]:
    """Search skills by fuzzy matching title, description, or aliases."""

    return _cache.search(query)


def clear_cache() -> None:
    """Reset cache; primarily useful for tests."""

    _cache.clear()
