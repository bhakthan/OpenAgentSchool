from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class Envelope(BaseModel):
    tenantId: str
    orgId: Optional[str] = None
    productId: Optional[str] = None
    sessionId: Optional[str] = None
    userId: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None

class SocraticInput(Envelope):
    query: str
    context: Optional[str] = None
    difficulty: Optional[str] = None  # beginner|intermediate|advanced
    hints: Optional[bool] = None
    
    model_config = {
        "json_schema_extra": {
            "example": {
                "tenantId": "t1",
                "sessionId": "sess-123",
                "query": "What is recursion?",
                "difficulty": "beginner"
            }
        }
    }

class ScenarioInput(Envelope):
    topic: str
    objectives: Optional[List[str]] = None
    role: Optional[str] = None
    constraints: Optional[List[str]] = None
    level: Optional[str] = None
    
    model_config = {
        "json_schema_extra": {
            "example": {
                "tenantId": "t1",
                "topic": "Incident response",
                "objectives": ["Containment", "Eradication", "Recovery"]
            }
        }
    }

class DebugInput(Envelope):
    code: str
    language: str
    error: Optional[str] = None
    tests: Optional[str] = None
    
    model_config = {
        "json_schema_extra": {
            "example": {
                "tenantId": "t1",
                "language": "python",
                "code": "print(x)",
                "error": "NameError: name 'x' is not defined"
            }
        }
    }

class SCLInput(Envelope):
    source: str
    goals: Optional[List[str]] = None
    rubric: Optional[str] = None
    
    model_config = {
        "json_schema_extra": {
            "example": {
                "tenantId": "t1",
                "source": "https://example.com/intro-to-ds",
                "goals": ["Understand basics", "Be able to explain to peers"]
            }
        }
    }

class BaseResponse(BaseModel):
    sessionId: Optional[str] = None
    requestId: Optional[str] = None
    latencyMs: Optional[float] = None
    usage: Optional[Dict[str, Any]] = None
    safety: Optional[Dict[str, Any]] = None
    attribution: Optional[Dict[str, Any]] = None


class SocraticResponse(BaseResponse):
    prompt: Optional[str] = None
    questions: Optional[List[Dict[str, Any]]] = None
    nextAction: Optional[str] = None
    assistant: Optional[str] = None

    model_config = {
        "json_schema_extra": {
            "example": {
                "sessionId": "generated-session",
                "requestId": "1f8b7d1c-9e7a-4d7c-9e6f-1234567890ab",
                "latencyMs": 12.3,
                "usage": {"tokensIn": 0, "tokensOut": 0},
                "prompt": "What is recursion?",
                "questions": [
                    {"id": "q1", "text": "Why is this important?"},
                    {"id": "q2", "text": "What is an example?"}
                ],
                "nextAction": "ask",
                "assistant": "Let's explore this step by step.",
                "attribution": {
                    "sources": [
                        {"id": "doc-1", "title": "Intro", "url": "https://example.com/intro", "snippet": "...", "score": 0.82}
                    ]
                }
            }
        }
    }


class ScenarioResponse(BaseResponse):
    scenarioId: Optional[str] = None
    narrative: Optional[str] = None
    steps: Optional[List[Dict[str, Any]]] = None

    model_config = {
        "json_schema_extra": {
            "example": {
                "sessionId": "generated-session",
                "requestId": "<uuid>",
                "latencyMs": 10.5,
                "scenarioId": "scn-001",
                "narrative": "Scenario on Incident response",
                "steps": [
                    {"id": "s1", "description": "Understand the context"},
                    {"id": "s2", "description": "Make a decision", "choices": ["A", "B", "C"]}
                ]
            }
        }
    }


class DebugResponse(BaseResponse):
    analysis: Optional[str] = None
    probableCauses: Optional[List[str]] = None
    suggestedFixes: Optional[List[Dict[str, Any]]] = None

    model_config = {
        "json_schema_extra": {
            "example": {
                "sessionId": "generated-session",
                "requestId": "<uuid>",
                "latencyMs": 8.7,
                "analysis": "Potential null reference",
                "probableCauses": ["Uninitialized variable"],
                "suggestedFixes": [{"steps": ["Add guard", "Initialize variable"]}]
            }
        }
    }


class SCLResponse(BaseResponse):
    outline: Optional[List[Dict[str, Any]]] = None
    prompts: Optional[List[str]] = None
    quizzes: Optional[List[Dict[str, Any]]] = None
    activities: Optional[List[str]] = None

    model_config = {
        "json_schema_extra": {
            "example": {
                "sessionId": "generated-session",
                "requestId": "<uuid>",
                "latencyMs": 9.2,
                "outline": [{"heading": "Key Concepts", "bullets": ["Definition", "Impact"]}],
                "prompts": ["Explain to a beginner"],
                "quizzes": [{"q": "What is X?", "a": ["A", "B", "C"]}],
                "activities": ["Make a summary"],
                "attribution": {"sources": []}
            }
        }
    }
