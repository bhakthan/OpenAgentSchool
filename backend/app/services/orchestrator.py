from typing import Dict, Any

from app.providers.azure_openai_provider import azure_openai
from app.providers.vector_store import vector_store
from app.providers.question_bank import question_bank
from app.providers.concept_bank import concept_bank
from app.providers.pattern_bank import pattern_bank
from app.providers.skill_bank import search_skills as _search_skills


class Orchestrator:
    """Simple orchestrator skeleton to dispatch to capability engines.
    Replace stubs with real providers (Azure OpenAI, vector store, etc.).
    """

    def __init__(self) -> None:
        pass

    async def socratic(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        query = payload.get("query", "")
        difficulty = payload.get("difficulty")
        tenant_id = payload.get("tenantId") or payload.get("tenant_id")

        ctx = await vector_store.retrieve(query)
        concepts = concept_bank.search(q=query, limit=3)
        patterns = pattern_bank.search(q=query, limit=3)
        skills = _search_skills(q=query, limit=3)

        context_text = "\n".join(
            [f"- {c.get('title')}: {c.get('url')} (score={c.get('score')})" for c in ctx]
        )
        curated = question_bank.search(
            query=query, difficulty=difficulty, tenant_id=tenant_id, limit=3
        )
        messages = [
            {"role": "system", "content": "You are a Socratic tutor. Ask guiding questions."},
            {"role": "user", "content": f"Question: {query}\nRelevant sources:\n{context_text}"},
        ]
        answer = await azure_openai.chat(messages)
        return {
            "prompt": query,
            "questions": (
                [
                    {
                        "id": q["id"],
                        "text": q["text"],
                        "difficulty": q.get("difficulty"),
                        "topic": q.get("topic"),
                    }
                    for q in curated
                ]
                or [
                    {"id": "q1", "text": "Why is this important?"},
                    {"id": "q2", "text": "What is an example?"},
                ]
            ),
            "nextAction": "ask",
            "assistant": answer,
            "attribution": {
                "sources": ctx,
                "curated": curated,
                "concepts": concepts,
                "patterns": patterns,
                "skills": skills,
            },
            "relatedConcepts": concepts,
            "relatedPatterns": patterns,
            "relatedSkills": skills,
        }

    async def scenarios(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        topic = payload.get("topic") or ""

        ctx = await vector_store.retrieve(topic)
        curated = question_bank.search(query=topic, limit=3)
        concepts = concept_bank.search(q=topic, limit=3)
        patterns = pattern_bank.search(q=topic, limit=3)
        skills = _search_skills(q=topic, limit=3)
        return {
            "scenarioId": "scn-001",
            "narrative": f"Scenario on {topic}",
            "steps": [
                {"id": "s1", "description": "Understand the context"},
                {"id": "s2", "description": "Make a decision", "choices": ["A", "B", "C"]},
            ],
            "attribution": {
                "sources": ctx,
                "curated": curated,
                "concepts": concepts,
                "patterns": patterns,
                "skills": skills,
            },
            "relatedConcepts": concepts,
            "relatedPatterns": patterns,
            "relatedSkills": skills,
        }

    async def debug(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        code = payload.get("code", "")
        lang = payload.get("language", "")
        query_text = f"{lang} {code[:120]}"

        ctx = await vector_store.retrieve(query_text)
        curated = question_bank.search(query=lang or "code", limit=3)
        concepts = concept_bank.search(q=lang or "code", limit=3)
        patterns = pattern_bank.search(q=lang or "code", limit=3)
        skills = _search_skills(q=lang or "code", limit=3)
        return {
            "analysis": "Potential null reference",
            "probableCauses": ["Uninitialized variable"],
            "suggestedFixes": [{"steps": ["Add guard", "Initialize variable"]}],
            "attribution": {
                "sources": ctx,
                "curated": curated,
                "concepts": concepts,
                "patterns": patterns,
                "skills": skills,
            },
            "relatedConcepts": concepts,
            "relatedPatterns": patterns,
            "relatedSkills": skills,
        }

    async def scl(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        source = payload.get("source", "")
        difficulty = payload.get("difficulty")
        tenant_id = payload.get("tenantId") or payload.get("tenant_id")

        messages = [
            {"role": "system", "content": "You create structured learning plans (SCL)."},
            {"role": "user", "content": f"Create an outline and prompts for: {source}"},
        ]
        _ = await azure_openai.chat(messages)

        ctx = await vector_store.retrieve(source)
        curated = question_bank.search(
            query=source, difficulty=difficulty, tenant_id=tenant_id, limit=3
        )
        concepts = concept_bank.search(q=source, limit=3)
        patterns = pattern_bank.search(q=source, limit=3)
        skills = _search_skills(q=source, limit=3)
        return {
            "outline": [{"heading": "Key Concepts", "bullets": ["Definition", "Impact"]}],
            "prompts": ["Explain to a beginner"],
            "quizzes": [{"q": "What is X?", "a": ["A", "B", "C"]}],
            "activities": ["Make a summary"],
            "attribution": {
                "sources": ctx,
                "curated": curated,
                "concepts": concepts,
                "patterns": patterns,
                "skills": skills,
            },
            "relatedConcepts": concepts,
            "relatedPatterns": patterns,
            "relatedSkills": skills,
        }


orchestrator = Orchestrator()
