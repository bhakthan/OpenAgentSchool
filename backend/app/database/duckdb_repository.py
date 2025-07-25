import os
from typing import Any, Dict, List, Optional
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime

from app.models.models import Base, User, CommunityPost, CommunityComment, QuizQuestion, QuizAttempt, KnowledgeProgress
from app.database.repository import DatabaseRepository
from config import settings

class DuckDBRepository(DatabaseRepository):
    """DuckDB implementation of the database repository"""
    
    def __init__(self):
        # Ensure data directory exists
        os.makedirs(os.path.dirname(settings.DUCKDB_PATH), exist_ok=True)
        
        # Create engine with DuckDB
        self.engine = create_engine(f"duckdb:///{settings.DUCKDB_PATH}")
        self.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)
        
        # Create tables
        self.create_tables()
    
    def create_tables(self) -> None:
        """Create database tables"""
        Base.metadata.create_all(bind=self.engine)
        
        # Insert sample quiz questions if none exist
        session = self.get_session()
        try:
            existing_questions = session.query(QuizQuestion).first()
            if not existing_questions:
                self._insert_sample_quiz_questions(session)
                session.commit()
        except Exception as e:
            session.rollback()
            print(f"Error inserting sample data: {e}")
        finally:
            self.close_session(session)
    
    def get_session(self) -> Session:
        """Get database session"""
        return self.SessionLocal()
    
    def close_session(self, session: Session) -> None:
        """Close database session"""
        session.close()
    
    # Community methods
    def create_post(self, session: Session, post_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a community post"""
        try:
            post = CommunityPost(**post_data)
            session.add(post)
            session.commit()
            session.refresh(post)
            
            return {
                "id": post.id,
                "title": post.title,
                "content": post.content,
                "author_id": post.author_id,
                "likes_count": post.likes_count,
                "views_count": post.views_count,
                "tags": post.tags,
                "created_at": post.created_at.isoformat(),
                "updated_at": post.updated_at.isoformat()
            }
        except SQLAlchemyError as e:
            session.rollback()
            raise e
    
    def get_posts(self, session: Session, skip: int = 0, limit: int = 10) -> List[Dict[str, Any]]:
        """Get community posts"""
        posts = session.query(CommunityPost).offset(skip).limit(limit).all()
        return [
            {
                "id": post.id,
                "title": post.title,
                "content": post.content,
                "author_id": post.author_id,
                "author_username": post.author.username if post.author else "Unknown",
                "likes_count": post.likes_count,
                "views_count": post.views_count,
                "tags": post.tags,
                "created_at": post.created_at.isoformat(),
                "updated_at": post.updated_at.isoformat()
            }
            for post in posts
        ]
    
    def get_post_by_id(self, session: Session, post_id: int) -> Optional[Dict[str, Any]]:
        """Get a post by ID"""
        post = session.query(CommunityPost).filter(CommunityPost.id == post_id).first()
        if not post:
            return None
        
        return {
            "id": post.id,
            "title": post.title,
            "content": post.content,
            "author_id": post.author_id,
            "author_username": post.author.username if post.author else "Unknown",
            "likes_count": post.likes_count,
            "views_count": post.views_count,
            "tags": post.tags,
            "created_at": post.created_at.isoformat(),
            "updated_at": post.updated_at.isoformat(),
            "comments": [
                {
                    "id": comment.id,
                    "content": comment.content,
                    "author_username": comment.author.username if comment.author else "Unknown",
                    "likes_count": comment.likes_count,
                    "created_at": comment.created_at.isoformat()
                }
                for comment in post.comments
            ]
        }
    
    def create_comment(self, session: Session, comment_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a comment"""
        try:
            comment = CommunityComment(**comment_data)
            session.add(comment)
            session.commit()
            session.refresh(comment)
            
            return {
                "id": comment.id,
                "content": comment.content,
                "post_id": comment.post_id,
                "author_id": comment.author_id,
                "parent_id": comment.parent_id,
                "likes_count": comment.likes_count,
                "created_at": comment.created_at.isoformat()
            }
        except SQLAlchemyError as e:
            session.rollback()
            raise e
    
    # Quiz methods
    def submit_quiz(self, session: Session, quiz_data: Dict[str, Any]) -> Dict[str, Any]:
        """Submit quiz attempt"""
        try:
            quiz_attempt = QuizAttempt(**quiz_data)
            session.add(quiz_attempt)
            session.commit()
            session.refresh(quiz_attempt)
            
            return {
                "id": quiz_attempt.id,
                "user_id": quiz_attempt.user_id,
                "category": quiz_attempt.category,
                "score": quiz_attempt.score,
                "total_questions": quiz_attempt.total_questions,
                "time_taken": quiz_attempt.time_taken,
                "completed_at": quiz_attempt.completed_at.isoformat()
            }
        except SQLAlchemyError as e:
            session.rollback()
            raise e
    
    def get_quiz_results(self, session: Session, user_id: int, category: str = None) -> List[Dict[str, Any]]:
        """Get quiz results"""
        query = session.query(QuizAttempt).filter(QuizAttempt.user_id == user_id)
        if category:
            query = query.filter(QuizAttempt.category == category)
        
        attempts = query.order_by(QuizAttempt.completed_at.desc()).all()
        return [
            {
                "id": attempt.id,
                "category": attempt.category,
                "score": attempt.score,
                "total_questions": attempt.total_questions,
                "percentage": round((attempt.score / attempt.total_questions) * 100, 2),
                "time_taken": attempt.time_taken,
                "completed_at": attempt.completed_at.isoformat()
            }
            for attempt in attempts
        ]
    
    def get_quiz_questions(self, session: Session, category: str, limit: int = 10) -> List[Dict[str, Any]]:
        """Get quiz questions"""
        questions = session.query(QuizQuestion).filter(
            QuizQuestion.category == category
        ).limit(limit).all()
        
        return [
            {
                "id": question.id,
                "question": question.question,
                "options": question.options,
                "correct_answer": question.correct_answer,
                "explanation": question.explanation,
                "difficulty": question.difficulty
            }
            for question in questions
        ]
    
    # Progress methods
    def update_progress(self, session: Session, progress_data: Dict[str, Any]) -> Dict[str, Any]:
        """Update knowledge progress"""
        try:
            # Check if progress record exists
            existing_progress = session.query(KnowledgeProgress).filter(
                KnowledgeProgress.user_id == progress_data["user_id"],
                KnowledgeProgress.concept_id == progress_data["concept_id"]
            ).first()
            
            if existing_progress:
                # Update existing record
                for key, value in progress_data.items():
                    if hasattr(existing_progress, key):
                        setattr(existing_progress, key, value)
                existing_progress.last_accessed = datetime.utcnow()
                session.commit()
                session.refresh(existing_progress)
                progress = existing_progress
            else:
                # Create new record
                progress = KnowledgeProgress(**progress_data)
                session.add(progress)
                session.commit()
                session.refresh(progress)
            
            return {
                "id": progress.id,
                "user_id": progress.user_id,
                "concept_id": progress.concept_id,
                "concept_type": progress.concept_type,
                "status": progress.status,
                "progress_percentage": progress.progress_percentage,
                "completed_sections": progress.completed_sections,
                "last_accessed": progress.last_accessed.isoformat(),
                "completed_at": progress.completed_at.isoformat() if progress.completed_at else None
            }
        except SQLAlchemyError as e:
            session.rollback()
            raise e
    
    def get_progress(self, session: Session, user_id: int) -> List[Dict[str, Any]]:
        """Get user progress"""
        progress_records = session.query(KnowledgeProgress).filter(
            KnowledgeProgress.user_id == user_id
        ).order_by(KnowledgeProgress.last_accessed.desc()).all()
        
        return [
            {
                "id": record.id,
                "concept_id": record.concept_id,
                "concept_type": record.concept_type,
                "status": record.status,
                "progress_percentage": record.progress_percentage,
                "completed_sections": record.completed_sections,
                "last_accessed": record.last_accessed.isoformat(),
                "completed_at": record.completed_at.isoformat() if record.completed_at else None
            }
            for record in progress_records
        ]
    
    # User methods
    def create_user(self, session: Session, user_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a user"""
        try:
            user = User(**user_data)
            session.add(user)
            session.commit()
            session.refresh(user)
            
            return {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "is_active": user.is_active,
                "created_at": user.created_at.isoformat()
            }
        except SQLAlchemyError as e:
            session.rollback()
            raise e
    
    def get_user_by_username(self, session: Session, username: str) -> Optional[Dict[str, Any]]:
        """Get user by username"""
        user = session.query(User).filter(User.username == username).first()
        if not user:
            return None
        
        return {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "hashed_password": user.hashed_password,
            "is_active": user.is_active,
            "created_at": user.created_at.isoformat()
        }
    
    def get_user_by_email(self, session: Session, email: str) -> Optional[Dict[str, Any]]:
        """Get user by email"""
        user = session.query(User).filter(User.email == email).first()
        if not user:
            return None
        
        return {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "hashed_password": user.hashed_password,
            "is_active": user.is_active,
            "created_at": user.created_at.isoformat()
        }
    
    def _insert_sample_quiz_questions(self, session: Session) -> None:
        """Insert sample quiz questions"""
        sample_questions = [
            {
                "question": "What is the primary benefit of the Parallelization pattern?",
                "options": {
                    "A": "Reduces memory usage",
                    "B": "Improves processing speed for independent tasks",
                    "C": "Simplifies code structure",
                    "D": "Reduces network latency"
                },
                "correct_answer": "B",
                "explanation": "Parallelization allows multiple independent tasks to run concurrently, significantly reducing overall processing time.",
                "category": "patterns",
                "difficulty": "medium"
            },
            {
                "question": "Which Azure service is best for implementing AI safety controls?",
                "options": {
                    "A": "Azure Monitor",
                    "B": "Azure Content Safety",
                    "C": "Azure Storage",
                    "D": "Azure Functions"
                },
                "correct_answer": "B",
                "explanation": "Azure Content Safety provides AI-powered content moderation to detect harmful content.",
                "category": "azure-services",
                "difficulty": "easy"
            },
            {
                "question": "In Prompt Chaining, what is the key principle?",
                "options": {
                    "A": "Running prompts in parallel",
                    "B": "Using the output of one prompt as input for the next",
                    "C": "Reducing prompt length",
                    "D": "Increasing prompt complexity"
                },
                "correct_answer": "B",
                "explanation": "Prompt Chaining breaks down complex tasks by feeding the output of one prompt as input to the next prompt in sequence.",
                "category": "patterns",
                "difficulty": "medium"
            }
        ]
        
        for question_data in sample_questions:
            question = QuizQuestion(**question_data)
            session.add(question)
