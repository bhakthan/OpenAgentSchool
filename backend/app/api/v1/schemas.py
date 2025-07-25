from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime

# User schemas
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    is_active: bool
    created_at: str

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# Community schemas
class PostCreate(BaseModel):
    title: str
    content: str
    tags: Optional[List[str]] = []

class PostResponse(BaseModel):
    id: int
    title: str
    content: str
    author_id: int
    author_username: Optional[str]
    likes_count: int
    views_count: int
    tags: Optional[List[str]]
    created_at: str
    updated_at: str

class PostDetailResponse(PostResponse):
    comments: List["CommentResponse"]

class CommentCreate(BaseModel):
    content: str
    post_id: int
    parent_id: Optional[int] = None

class CommentResponse(BaseModel):
    id: int
    content: str
    post_id: int
    author_id: int
    author_username: Optional[str]
    parent_id: Optional[int]
    likes_count: int
    created_at: str

# Quiz schemas
class QuizQuestionResponse(BaseModel):
    id: int
    question: str
    options: Dict[str, str]
    difficulty: str

class QuizSubmission(BaseModel):
    category: str
    answers: Dict[str, str]  # question_id -> answer
    time_taken: Optional[int] = None

class QuizResultResponse(BaseModel):
    id: int
    category: str
    score: int
    total_questions: int
    percentage: float
    time_taken: Optional[int]
    completed_at: str

class QuizAttemptResponse(BaseModel):
    id: int
    user_id: int
    category: str
    score: int
    total_questions: int
    time_taken: Optional[int]
    completed_at: str

# Progress schemas
class ProgressUpdate(BaseModel):
    concept_id: str
    concept_type: str
    status: str
    progress_percentage: int
    completed_sections: Optional[List[str]] = []

class ProgressResponse(BaseModel):
    id: int
    concept_id: str
    concept_type: str
    status: str
    progress_percentage: int
    completed_sections: Optional[List[str]]
    last_accessed: str
    completed_at: Optional[str]

# Update forward references
PostDetailResponse.model_rebuild()
