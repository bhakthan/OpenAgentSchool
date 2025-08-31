from __future__ import annotations

from typing import Any, Dict, List, Optional

import duckdb

from config import settings


def _get_conn() -> duckdb.DuckDBPyConnection:
    return duckdb.connect(settings.DUCKDB_PATH)


def ensure_schema():
    with _get_conn() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS ai_skills (
                id TEXT PRIMARY KEY,
                title TEXT,
                description TEXT,
                level TEXT,
                sort_order INTEGER
            )
            """
        )


def list_skills(limit: int = 200, offset: int = 0) -> List[Dict[str, Any]]:
    ensure_schema()
    with _get_conn() as conn:
        rows = conn.execute(
            "SELECT id, title, description, level, sort_order FROM ai_skills ORDER BY sort_order, title LIMIT ? OFFSET ?",
            [limit, offset],
        ).fetchall()
        return [
            {
                "id": r[0],
                "title": r[1],
                "description": r[2],
                "level": r[3],
                "order": r[4],
            }
            for r in rows
        ]


def get_skill(skill_id: str) -> Optional[Dict[str, Any]]:
    ensure_schema()
    with _get_conn() as conn:
        row = conn.execute(
            "SELECT id, title, description, level, sort_order FROM ai_skills WHERE id = ?",
            [skill_id],
        ).fetchone()
        if not row:
            return None
        return {
            "id": row[0],
            "title": row[1],
            "description": row[2],
            "level": row[3],
            "order": row[4],
        }


def search_skills(q: str, limit: int = 50, offset: int = 0) -> List[Dict[str, Any]]:
    ensure_schema()
    q_like = f"%{q}%"
    with _get_conn() as conn:
        rows = conn.execute(
            """
            SELECT id, title, description, level, sort_order
            FROM ai_skills
            WHERE title ILIKE ? OR description ILIKE ?
            ORDER BY sort_order, title
            LIMIT ? OFFSET ?
            """,
            [q_like, q_like, limit, offset],
        ).fetchall()
        return [
            {
                "id": r[0],
                "title": r[1],
                "description": r[2],
                "level": r[3],
                "order": r[4],
            }
            for r in rows
        ]
