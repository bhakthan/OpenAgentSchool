from __future__ import annotations

import duckdb
from typing import List, Dict, Optional
from config import settings


DDL = """
CREATE TABLE IF NOT EXISTS agent_patterns (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  use_cases TEXT,
  when_to_use TEXT,
  advantages TEXT,
  limitations TEXT,
  related_patterns TEXT,
  implementation TEXT,
  code_example TEXT,
  python_code_example TEXT,
  complete_code TEXT,
  nodes_json TEXT,
  edges_json TEXT,
  business_use_case_json TEXT
);
"""


class PatternBank:
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
                "SELECT id, name, category FROM agent_patterns ORDER BY name LIMIT ? OFFSET ?",
                [limit, offset],
            ).fetchall()
        except Exception:
            rows = []
        return [{"id": r[0], "name": r[1], "category": r[2]} for r in rows]

    def get(self, pattern_id: str) -> Optional[Dict]:
        try:
            r = self._conn.execute(
                """
                SELECT id, name, description, category, use_cases, when_to_use, advantages, limitations,
                       related_patterns, implementation, code_example, python_code_example, complete_code,
                       nodes_json, edges_json, business_use_case_json
                FROM agent_patterns WHERE id = ?
                """,
                [pattern_id],
            ).fetchone()
        except Exception:
            r = None
        if not r:
            return None
        import json as _json
        return {
            "id": r[0],
            "name": r[1],
            "description": r[2],
            "category": r[3],
            "useCases": (r[4] or "").split("|") if r[4] else [],
            "whenToUse": r[5],
            "advantages": (r[6] or "").split("|") if r[6] else [],
            "limitations": (r[7] or "").split("|") if r[7] else [],
            "relatedPatterns": (r[8] or "").split("|") if r[8] else [],
            "implementation": (r[9] or "").split("|") if r[9] else [],
            "codeExample": r[10],
            "pythonCodeExample": r[11],
            "completeCode": r[12],
            "nodes": _json.loads(r[13] or "[]"),
            "edges": _json.loads(r[14] or "[]"),
            "businessUseCase": _json.loads(r[15] or "null"),
        }

    def search(self, q: Optional[str] = None, limit: int = 20) -> List[Dict]:
        if not q:
            return self.list(limit=limit)
        like = f"%{q}%"
        try:
            rows = self._conn.execute(
                """
                SELECT id, name, description, category FROM agent_patterns
                WHERE LOWER(name) LIKE LOWER(?) OR LOWER(description) LIKE LOWER(?)
                   OR LOWER(category) LIKE LOWER(?)
                ORDER BY name LIMIT ?
                """,
                [like, like, like, limit],
            ).fetchall()
        except Exception:
            rows = []
        return [{"id": r[0], "name": r[1], "category": r[3], "snippet": (r[2] or "")[:240]} for r in rows]


pattern_bank = PatternBank()
