from __future__ import annotations

from enum import Enum
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field


class EvaluationCohort(str, Enum):
    EDUCATION = "education"
    MULTI_AGENT = "multi-agent"
    ADVANCED_AUTOMATION = "advanced-automation"
    COMMUNICATION_INTERFACE = "communication-interface"
    COGNITIVE_SENSING = "cognitive-sensing"


class PatternEvaluationProfile(BaseModel):
    scenarioFocus: str
    criticalMetrics: List[str] = Field(default_factory=list)
    evaluationNotes: List[str] = Field(default_factory=list)
    cohort: Optional[EvaluationCohort] = None
    readinessSignals: List[str] = Field(default_factory=list)
    dataNeeds: List[str] = Field(default_factory=list)


class PatternNode(BaseModel):
    id: str
    type: str
    data: Dict[str, Any] = Field(default_factory=dict)
    position: Dict[str, Any] = Field(default_factory=dict)


class PatternEdge(BaseModel):
    id: str
    source: str
    target: str
    type: Optional[str] = None
    label: Optional[str] = None
    animated: Optional[bool] = None
    style: Optional[Dict[str, Any]] = None


class BusinessUseCase(BaseModel):
    industry: str
    description: str
    enlightenMePrompt: Optional[str] = None


class AgentPattern(BaseModel):
    id: str
    name: str
    description: str
    category: Optional[str] = None
    nodes: List[PatternNode] = Field(default_factory=list)
    edges: List[PatternEdge] = Field(default_factory=list)
    useCases: List[str] = Field(default_factory=list)
    codeExample: str
    pythonCodeExample: Optional[str] = None
    implementation: List[str] = Field(default_factory=list)
    whenToUse: Optional[str] = None
    advantages: Optional[List[str]] = None
    limitations: Optional[List[str]] = None
    relatedPatterns: Optional[List[str]] = None
    businessUseCase: Optional[BusinessUseCase] = None
    completeCode: Optional[str] = None
    codeVisualizer: Optional[str] = None
    evaluation: Optional[str] = None
    evaluationProfile: Optional[PatternEvaluationProfile] = None


class AgentPatternListResponse(BaseModel):
    items: List[AgentPattern]
