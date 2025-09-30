from typing import List, Optional

from pydantic import BaseModel, Field


class Skill(BaseModel):
    """Represents a single AI-native skill."""

    id: str = Field(..., description="Unique identifier for the skill")
    title: str = Field(..., description="Display name of the skill")
    description: str = Field(default="", description="Short summary of the skill focus")
    level: Optional[str] = Field(default=None, description="Suggested experience level")
    order: int = Field(default=0, ge=0, description="Ordering hint for clients")
    aliases: Optional[List[str]] = Field(default=None, description="Optional legacy identifiers")


class SkillListResponse(BaseModel):
    """Envelope used for list/search endpoints."""

    items: List[Skill]
