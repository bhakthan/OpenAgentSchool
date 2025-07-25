from abc import ABC, abstractmethod
from typing import Any, Dict, List, Optional
from sqlalchemy.orm import Session

class DatabaseRepository(ABC):
    """Abstract base class for database operations"""
    
    @abstractmethod
    def create_tables(self) -> None:
        """Create database tables"""
        pass
    
    @abstractmethod
    def get_session(self) -> Session:
        """Get database session"""
        pass
    
    @abstractmethod
    def close_session(self, session: Session) -> None:
        """Close database session"""
        pass
    
    # Community methods
    @abstractmethod
    def create_post(self, session: Session, post_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a community post"""
        pass
    
    @abstractmethod
    def get_posts(self, session: Session, skip: int = 0, limit: int = 10) -> List[Dict[str, Any]]:
        """Get community posts"""
        pass
    
    @abstractmethod
    def get_post_by_id(self, session: Session, post_id: int) -> Optional[Dict[str, Any]]:
        """Get a post by ID"""
        pass
    
    @abstractmethod
    def create_comment(self, session: Session, comment_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a comment"""
        pass
    
    # Quiz methods
    @abstractmethod
    def submit_quiz(self, session: Session, quiz_data: Dict[str, Any]) -> Dict[str, Any]:
        """Submit quiz attempt"""
        pass
    
    @abstractmethod
    def get_quiz_results(self, session: Session, user_id: int, category: str = None) -> List[Dict[str, Any]]:
        """Get quiz results"""
        pass
    
    @abstractmethod
    def get_quiz_questions(self, session: Session, category: str, limit: int = 10) -> List[Dict[str, Any]]:
        """Get quiz questions"""
        pass
    
    # Progress methods
    @abstractmethod
    def update_progress(self, session: Session, progress_data: Dict[str, Any]) -> Dict[str, Any]:
        """Update knowledge progress"""
        pass
    
    @abstractmethod
    def get_progress(self, session: Session, user_id: int) -> List[Dict[str, Any]]:
        """Get user progress"""
        pass
    
    # User methods
    @abstractmethod
    def create_user(self, session: Session, user_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a user"""
        pass
    
    @abstractmethod
    def get_user_by_username(self, session: Session, username: str) -> Optional[Dict[str, Any]]:
        """Get user by username"""
        pass
    
    @abstractmethod
    def get_user_by_email(self, session: Session, email: str) -> Optional[Dict[str, Any]]:
        """Get user by email"""
        pass
