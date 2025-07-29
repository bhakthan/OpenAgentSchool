"""
Schemas package for the knowledge service API
"""
from .schemas import *

__all__ = [
    # Document schemas
    "DocumentBase",
    "DocumentCreate", 
    "DocumentUpdate",
    "DocumentResponse",
    "DocumentListResponse",
    "DocumentChunkResponse",
    
    # Processing schemas
    "ProcessingStatus",
    "ProcessingJobResponse",
    
    # Search schemas
    "SearchRequest",
    "SearchResult", 
    "SearchResponse",
    
    # Knowledge base schemas
    "KnowledgeBaseCreate",
    "KnowledgeBaseResponse",
    
    # Health and error schemas
    "HealthResponse",
    "ServiceHealthDetail",
    "ErrorResponse",
    
    # Agent schemas for Azure AI integration
    "AgentCreate",
    "AgentResponse",
    "ConversationCreate",
    "ConversationResponse", 
    "MessageCreate",
    "MessageResponse",
]
