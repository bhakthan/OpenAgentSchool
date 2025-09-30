from __future__ import annotations

import json
from pathlib import Path
from threading import Lock
from typing import List, Optional

try:  # pragma: no cover
    from backend.config import settings  # type: ignore
    from backend.app.schemas.agent_patterns import (  # type: ignore
        AgentPattern,
        EvaluationCohort,
    )
except ImportError:  # pragma: no cover
    from ...config import settings
    from ..schemas.agent_patterns import AgentPattern, EvaluationCohort


class _PatternCache:
    """File-backed cache for agent pattern definitions."""

    def __init__(self) -> None:
        self._lock = Lock()
        self._patterns: Optional[List[AgentPattern]] = None
        self._mtime: Optional[float] = None
        self._path: Optional[Path] = None

    def _resolve_path(self) -> Path:
        path = Path(settings.AGENT_PATTERNS_EXPORT_PATH)
        if not path.is_file():
            raise FileNotFoundError(f"Agent patterns export not found at {path}")
        return path

    def _load_patterns(self, path: Path) -> List[AgentPattern]:
        with path.open("r", encoding="utf-8") as fh:
            raw = json.load(fh)
        patterns: List[AgentPattern] = []
        for item in raw:
            patterns.append(AgentPattern.model_validate(item))
        return sorted(patterns, key=lambda pattern: pattern.name.lower())

    def _ensure_cache(self) -> None:
        path = self._resolve_path()
        try:
            mtime = path.stat().st_mtime
        except OSError as exc:  # pragma: no cover
            raise FileNotFoundError(f"Unable to stat agent patterns export: {exc}") from exc

        if (
            self._patterns is None
            or self._mtime != mtime
            or self._path is None
            or path != self._path
        ):
            self._patterns = self._load_patterns(path)
            self._mtime = mtime
            self._path = path

    def get_all(self, cohort: Optional[EvaluationCohort] = None) -> List[AgentPattern]:
        with self._lock:
            self._ensure_cache()
            items = list(self._patterns or [])
        if cohort is None:
            return items
        cohort_value = cohort.value if isinstance(cohort, EvaluationCohort) else str(cohort)
        cohort_value = cohort_value.lower()
        filtered: List[AgentPattern] = []
        for pattern in items:
            profile = pattern.evaluationProfile
            if profile and profile.cohort and profile.cohort.value.lower() == cohort_value:
                filtered.append(pattern)
        return filtered

    def get_by_id(self, pattern_id: str) -> Optional[AgentPattern]:
        patterns = self.get_all()
        target = pattern_id.strip().lower()
        for pattern in patterns:
            if pattern.id.lower() == target:
                return pattern
        return None

    def search(self, query: str, cohort: Optional[EvaluationCohort] = None) -> List[AgentPattern]:
        patterns = self.get_all(cohort=cohort)
        terms = [term for term in query.lower().split() if term]
        if not terms:
            return patterns
        results: List[AgentPattern] = []
        for pattern in patterns:
            evaluation_profile = pattern.evaluationProfile
            extra_fields: List[str] = []
            if evaluation_profile:
                extra_fields.extend(evaluation_profile.criticalMetrics)
                extra_fields.extend(evaluation_profile.evaluationNotes)
                if evaluation_profile.scenarioFocus:
                    extra_fields.append(evaluation_profile.scenarioFocus)
            haystack = " ".join(
                filter(
                    None,
                    [
                        pattern.id,
                        pattern.name,
                        pattern.description,
                        pattern.category,
                        " ".join(pattern.useCases) if pattern.useCases else None,
                        " ".join(extra_fields) if extra_fields else None,
                    ],
                )
            ).lower()
            if all(term in haystack for term in terms):
                results.append(pattern)
        return results

    def clear(self) -> None:
        with self._lock:
            self._patterns = None
            self._mtime = None
            self._path = None


_cache = _PatternCache()


def list_patterns(cohort: Optional[EvaluationCohort] = None) -> List[AgentPattern]:
    """Return all agent patterns, optionally filtered by evaluation cohort."""

    return _cache.get_all(cohort=cohort)


def get_pattern(pattern_id: str) -> Optional[AgentPattern]:
    """Return a single pattern by id (case-insensitive)."""

    return _cache.get_by_id(pattern_id)


def search_patterns(
    query: str,
    cohort: Optional[EvaluationCohort] = None,
) -> List[AgentPattern]:
    """Search patterns by id, name, description, use cases, or evaluation metadata."""

    return _cache.search(query, cohort=cohort)


def clear_cache() -> None:
    """Reset cached data; primarily used for tests and cache busting."""

    _cache.clear()
