from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from app.api.v1.schemas import (
    PostCreate, PostResponse, PostDetailResponse,
    CommentCreate, CommentResponse
)
from app.database.duckdb_repository import DuckDBRepository
from app.api.v1.auth import get_current_user

router = APIRouter()
security = HTTPBearer()

# Dependency to get database repository
def get_db_repository():
    return DuckDBRepository()

@router.post("/posts", response_model=PostResponse)
async def create_post(
    post: PostCreate,
    current_user: dict = Depends(get_current_user),
    db_repo: DuckDBRepository = Depends(get_db_repository)
):
    """Create a new community post"""
    session = db_repo.get_session()
    try:
        post_data = {
            "title": post.title,
            "content": post.content,
            "author_id": current_user["id"],
            "tags": post.tags
        }
        
        created_post = db_repo.create_post(session, post_data)
        created_post["author_username"] = current_user["username"]
        
        return PostResponse(**created_post)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create post: {str(e)}"
        )
    finally:
        db_repo.close_session(session)

@router.get("/posts", response_model=List[PostResponse])
async def get_posts(
    skip: int = 0,
    limit: int = 10,
    db_repo: DuckDBRepository = Depends(get_db_repository)
):
    """Get community posts"""
    session = db_repo.get_session()
    try:
        posts = db_repo.get_posts(session, skip=skip, limit=limit)
        return [PostResponse(**post) for post in posts]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch posts: {str(e)}"
        )
    finally:
        db_repo.close_session(session)

@router.get("/posts/{post_id}", response_model=PostDetailResponse)
async def get_post(
    post_id: int,
    db_repo: DuckDBRepository = Depends(get_db_repository)
):
    """Get a specific post with comments"""
    session = db_repo.get_session()
    try:
        post = db_repo.get_post_by_id(session, post_id)
        if not post:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Post not found"
            )
        
        return PostDetailResponse(**post)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch post: {str(e)}"
        )
    finally:
        db_repo.close_session(session)

@router.post("/comments", response_model=CommentResponse)
async def create_comment(
    comment: CommentCreate,
    current_user: dict = Depends(get_current_user),
    db_repo: DuckDBRepository = Depends(get_db_repository)
):
    """Create a new comment"""
    session = db_repo.get_session()
    try:
        comment_data = {
            "content": comment.content,
            "post_id": comment.post_id,
            "author_id": current_user["id"],
            "parent_id": comment.parent_id
        }
        
        created_comment = db_repo.create_comment(session, comment_data)
        created_comment["author_username"] = current_user["username"]
        
        return CommentResponse(**created_comment)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create comment: {str(e)}"
        )
    finally:
        db_repo.close_session(session)
