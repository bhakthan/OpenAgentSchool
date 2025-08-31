from __future__ import annotations

import duckdb
from typing import List, Dict, Optional
from config import settings


DDL = """
CREATE TABLE IF NOT EXISTS core_concepts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  key_features TEXT,
  application_areas TEXT,
  technical_details TEXT,
  implementation_considerations TEXT,
  examples_json TEXT
);
"""


class ConceptBank:
    def __init__(self) -> None:
        self.path = settings.DUCKDB_PATH
        try:
            self._conn = duckdb.connect(self.path)
        except Exception:
            self._conn = duckdb.connect(":memory:")
        try:
            self._conn.execute(DDL)
        except Exception:
            pass

    def list(self, limit: int = 50, offset: int = 0) -> List[Dict]:
        try:
            rows = self._conn.execute(
                "SELECT id, name FROM core_concepts ORDER BY name LIMIT ? OFFSET ?",
                [limit, offset],
            ).fetchall()
        except Exception:
            rows = []
        return [{"id": r[0], "name": r[1]} for r in rows]

    def get(self, concept_id: str) -> Optional[Dict]:
        try:
            r = self._conn.execute(
                "SELECT id, name, description, key_features, application_areas, technical_details, implementation_considerations, examples_json FROM core_concepts WHERE id = ?",
                [concept_id],
            ).fetchone()
        except Exception:
            r = None
        if not r:
            return None
        return {
            "id": r[0],
            "name": r[1],
            "description": r[2],
            "keyFeatures": (r[3] or "").split("|") if r[3] else [],
            "applicationAreas": (r[4] or "").split("|") if r[4] else [],
            "technicalDetails": r[5],
            "implementationConsiderations": (r[6] or "").split("|") if r[6] else [],
            "examples": __import__("json").loads(r[7] or "[]"),
        }

    def search(self, q: Optional[str] = None, limit: int = 20) -> List[Dict]:
        if not q:
            return self.list(limit=limit)
        like = f"%{q}%"
        try:
            rows = self._conn.execute(
                """
                SELECT id, name, description FROM core_concepts
                WHERE LOWER(name) LIKE LOWER(?) OR LOWER(description) LIKE LOWER(?)
                ORDER BY name LIMIT ?
                """,
                [like, like, limit],
            ).fetchall()
        except Exception:
            rows = []
        return [{"id": r[0], "name": r[1], "snippet": (r[2] or "")[:240]} for r in rows]


concept_bank = ConceptBank()
