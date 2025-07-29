"""
Pydantic schemas for API request/response models
"""
from datetime import datetime
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from enum import Enum


class ProcessingStatus(str, Enum):
    """Document processing status"""
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"


class DocumentBase(BaseModel):
    """Base document schema"""
    title: str = Field(..., description="Document title")
    content: str = Field(..., description="Document content")
    document_type: str = Field(default="text", description="Type of document")
    source_url: Optional[str] = Field(None, description="Source URL if applicable")
    document_metadata: Optional[Dict[str, Any]] = Field(default_factory=dict, description="Additional metadata")


class DocumentCreate(DocumentBase):
    """Schema for creating a new document"""
    knowledge_base_id: Optional[str] = Field(None, description="Knowledge base ID")


class DocumentUpdate(BaseModel):
    """Schema for updating a document"""
    title: Optional[str] = None
    content: Optional[str] = None
    document_type: Optional[str] = None
    source_url: Optional[str] = None
    document_metadata: Optional[Dict[str, Any]] = None


class DocumentChunkResponse(BaseModel):
    """Schema for document chunk response"""
    id: str = Field(..., description="Chunk ID")
    content: str = Field(..., description="Chunk content")
    chunk_index: int = Field(..., description="Index of chunk in document")
    embedding_vector: Optional[List[float]] = Field(None, description="Embedding vector")
    chunk_metadata: Optional[Dict[str, Any]] = Field(default_factory=dict, description="Chunk metadata")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")

    class Config:
        from_attributes = True


class DocumentResponse(DocumentBase):
    """Schema for document response"""
    id: str = Field(..., description="Document ID")
    knowledge_base_id: Optional[str] = Field(None, description="Knowledge base ID")
    processing_status: ProcessingStatus = Field(..., description="Processing status")
    chunks: Optional[List[DocumentChunkResponse]] = Field(default_factory=list, description="Document chunks")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")

    class Config:
        from_attributes = True


class DocumentListResponse(BaseModel):
    """Schema for document list response"""
    documents: List[DocumentResponse] = Field(..., description="List of documents")
    total: int = Field(..., description="Total number of documents")
    page: int = Field(default=1, description="Current page number")
    size: int = Field(default=10, description="Page size")


class ProcessingJobResponse(BaseModel):
    """Schema for processing job response"""
    job_id: str = Field(..., description="Job ID")
    document_id: str = Field(..., description="Document ID")
    status: ProcessingStatus = Field(..., description="Job status")
    message: Optional[str] = Field(None, description="Status message")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")

    class Config:
        from_attributes = True


class SearchRequest(BaseModel):
    """Schema for search request"""
    query: str = Field(..., description="Search query")
    knowledge_base_id: Optional[str] = Field(None, description="Knowledge base ID to search in")
    limit: Optional[int] = Field(default=10, description="Maximum number of results")
    threshold: Optional[float] = Field(default=0.7, description="Similarity threshold")


class SearchResult(BaseModel):
    """Schema for search result"""
    document_id: str = Field(..., description="Document ID")
    chunk_id: str = Field(..., description="Chunk ID")
    content: str = Field(..., description="Chunk content")
    score: float = Field(..., description="Similarity score")
    document_title: str = Field(..., description="Document title")
    document_metadata: Optional[Dict[str, Any]] = Field(default_factory=dict, description="Document metadata")


class SearchResponse(BaseModel):
    """Schema for search response"""
    query: str = Field(..., description="Original query")
    results: List[SearchResult] = Field(..., description="Search results")
    total_results: int = Field(..., description="Total number of results")


class KnowledgeBaseCreate(BaseModel):
    """Schema for creating a knowledge base"""
    name: str = Field(..., description="Knowledge base name")
    description: Optional[str] = Field(None, description="Knowledge base description")
    metadata: Optional[Dict[str, Any]] = Field(default_factory=dict, description="Additional metadata")


class KnowledgeBaseResponse(BaseModel):
    """Schema for knowledge base response"""
    id: str = Field(..., description="Knowledge base ID")
    name: str = Field(..., description="Knowledge base name")
    description: Optional[str] = Field(None, description="Knowledge base description")
    metadata: Optional[Dict[str, Any]] = Field(default_factory=dict, description="Additional metadata")
    document_count: int = Field(default=0, description="Number of documents")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")

    class Config:
        from_attributes = True


class ServiceHealthDetail(BaseModel):
    """Schema for individual service health"""
    service: str = Field(..., description="Service name")
    status: str = Field(..., description="Service status")
    details: Optional[Dict[str, Any]] = Field(default_factory=dict, description="Additional details")


class HealthResponse(BaseModel):
    """Schema for health check response"""
    status: str = Field(..., description="Overall health status")
    timestamp: datetime = Field(..., description="Health check timestamp")
    version: str = Field(..., description="Service version")
    services: List[ServiceHealthDetail] = Field(..., description="Individual service health")


class ErrorResponse(BaseModel):
    """Schema for error response"""
    error: str = Field(..., description="Error type")
    message: str = Field(..., description="Error message")
    details: Optional[Dict[str, Any]] = Field(None, description="Additional error details")
    timestamp: datetime = Field(default_factory=datetime.utcnow, description="Error timestamp")


# Agent-related schemas for Azure AI Agents integration
class AgentCreate(BaseModel):
    """Schema for creating an AI agent"""
    name: str = Field(..., description="Agent name")
    description: Optional[str] = Field(None, description="Agent description")
    instructions: str = Field(..., description="Agent instructions/system prompt")
    model: str = Field(default="gpt-4", description="Model to use for the agent")
    tools: Optional[List[str]] = Field(default_factory=list, description="Tools available to the agent")
    metadata: Optional[Dict[str, Any]] = Field(default_factory=dict, description="Agent metadata")


class AgentResponse(BaseModel):
    """Schema for agent response"""
    id: str = Field(..., description="Agent ID")
    name: str = Field(..., description="Agent name")
    description: Optional[str] = Field(None, description="Agent description")
    instructions: str = Field(..., description="Agent instructions")
    model: str = Field(..., description="Model used by the agent")
    tools: List[str] = Field(..., description="Available tools")
    metadata: Optional[Dict[str, Any]] = Field(default_factory=dict, description="Agent metadata")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")

    class Config:
        from_attributes = True


class ConversationCreate(BaseModel):
    """Schema for creating a conversation"""
    agent_id: str = Field(..., description="Agent ID")
    title: Optional[str] = Field(None, description="Conversation title")
    metadata: Optional[Dict[str, Any]] = Field(default_factory=dict, description="Conversation metadata")


class MessageCreate(BaseModel):
    """Schema for creating a message"""
    content: str = Field(..., description="Message content")
    role: str = Field(default="user", description="Message role (user, assistant, system)")
    metadata: Optional[Dict[str, Any]] = Field(default_factory=dict, description="Message metadata")


class MessageResponse(BaseModel):
    """Schema for message response"""
    id: str = Field(..., description="Message ID")
    conversation_id: str = Field(..., description="Conversation ID")
    content: str = Field(..., description="Message content")
    role: str = Field(..., description="Message role")
    metadata: Optional[Dict[str, Any]] = Field(default_factory=dict, description="Message metadata")
    created_at: datetime = Field(..., description="Creation timestamp")

    class Config:
        from_attributes = True


class ConversationResponse(BaseModel):
    """Schema for conversation response"""
    id: str = Field(..., description="Conversation ID")
    agent_id: str = Field(..., description="Agent ID")
    title: Optional[str] = Field(None, description="Conversation title")
    messages: List[MessageResponse] = Field(default_factory=list, description="Conversation messages")
    metadata: Optional[Dict[str, Any]] = Field(default_factory=dict, description="Conversation metadata")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")

    class Config:
        from_attributes = True
