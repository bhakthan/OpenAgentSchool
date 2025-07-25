from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, JSON, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    posts = relationship("CommunityPost", back_populates="author")
    comments = relationship("CommunityComment", back_populates="author")
    quiz_attempts = relationship("QuizAttempt", back_populates="user")
    progress_records = relationship("KnowledgeProgress", back_populates="user")

class CommunityPost(Base):
    __tablename__ = "community_posts"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    content = Column(Text, nullable=False)
    author_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    likes_count = Column(Integer, default=0)
    views_count = Column(Integer, default=0)
    tags = Column(JSON)  # Store as JSON array
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    author = relationship("User", back_populates="posts")
    comments = relationship("CommunityComment", back_populates="post")

class CommunityComment(Base):
    __tablename__ = "community_comments"
    
    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text, nullable=False)
    post_id = Column(Integer, ForeignKey("community_posts.id"), nullable=False)
    author_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    parent_id = Column(Integer, ForeignKey("community_comments.id"), nullable=True)  # For nested comments
    likes_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    post = relationship("CommunityPost", back_populates="comments")
    author = relationship("User", back_populates="comments")
    replies = relationship("CommunityComment", remote_side=[id])

class QuizQuestion(Base):
    __tablename__ = "quiz_questions"
    
    id = Column(Integer, primary_key=True, index=True)
    question = Column(Text, nullable=False)
    options = Column(JSON, nullable=False)  # Store as JSON array
    correct_answer = Column(String(10), nullable=False)  # e.g., "A", "B", "C", "D"
    explanation = Column(Text)
    category = Column(String(50), nullable=False)  # e.g., "azure-services", "patterns"
    difficulty = Column(String(20), default="medium")  # "easy", "medium", "hard"
    created_at = Column(DateTime, default=datetime.utcnow)

class QuizAttempt(Base):
    __tablename__ = "quiz_attempts"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    category = Column(String(50), nullable=False)
    questions_attempted = Column(JSON, nullable=False)  # Store question IDs and answers
    score = Column(Integer, nullable=False)
    total_questions = Column(Integer, nullable=False)
    time_taken = Column(Integer)  # in seconds
    completed_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="quiz_attempts")

class KnowledgeProgress(Base):
    __tablename__ = "knowledge_progress"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    concept_id = Column(String(100), nullable=False)  # e.g., "flow-visualization", "azure-ai-safety"
    concept_type = Column(String(50), nullable=False)  # e.g., "concept", "pattern", "tutorial"
    status = Column(String(20), default="not_started")  # "not_started", "in_progress", "completed"
    progress_percentage = Column(Integer, default=0)
    completed_sections = Column(JSON)  # Store completed sections/tabs
    last_accessed = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)
    
    # Relationships
    user = relationship("User", back_populates="progress_records")
