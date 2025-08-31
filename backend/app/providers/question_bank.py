from __future__ import annotations

import duckdb
from typing import List, Dict, Optional
from config import settings


_DDL = """
CREATE TABLE IF NOT EXISTS study_questions (
  id TEXT PRIMARY KEY,
  topic TEXT,
  subtopic TEXT,
  difficulty TEXT,
  question_text TEXT NOT NULL,
  tags TEXT,
  source_url TEXT,
  tenant_id TEXT,
  created_at TIMESTAMP DEFAULT now()
);
"""


class QuestionBank:
    def __init__(self) -> None:
        self.path = settings.DUCKDB_PATH
        try:
            self._conn = duckdb.connect(self.path)
        except Exception:
            # Fall back to in-memory DB to avoid crashing the API; curated results will be empty until fixed.
            self._conn = duckdb.connect(":memory:")
        try:
            self._conn.execute(_DDL)
        except Exception:
            # If DDL fails for some reason, keep operating with empty results
            pass

    def search(
        self,
        query: Optional[str] = None,
        topic: Optional[str] = None,
        difficulty: Optional[str] = None,
        tenant_id: Optional[str] = None,
        limit: int = 5,
    ) -> List[Dict]:
        sql = "SELECT id, topic, subtopic, difficulty, question_text, tags, source_url FROM study_questions WHERE 1=1"
        params = []
        if tenant_id:
            sql += " AND (tenant_id = ? OR tenant_id IS NULL OR tenant_id = '')"
            params.append(tenant_id)
        if topic:
            sql += " AND LOWER(topic) LIKE LOWER(?)"
            params.append(f"%{topic}%")
        if difficulty:
            sql += " AND LOWER(difficulty) = LOWER(?)"
            params.append(difficulty)
        if query:
            # simple LIKE across question and tags
            sql += " AND (LOWER(question_text) LIKE LOWER(?) OR LOWER(tags) LIKE LOWER(?))"
            params.extend([f"%{query}%", f"%{query}%"])
        sql += " ORDER BY created_at DESC LIMIT ?"
        params.append(limit)
        try:
            rows = self._conn.execute(sql, params).fetchall()
        except Exception:
            rows = []
        out: List[Dict] = []
        for r in rows:
            out.append(
                {
                    "id": r[0],
                    "topic": r[1],
                    "subtopic": r[2],
                    "difficulty": r[3],
                    "text": r[4],
                    "tags": r[5],
                    "url": r[6],
                }
            )
        return out


question_bank = QuestionBank()
