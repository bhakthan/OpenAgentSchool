from fastapi import APIRouter, Depends, HTTPException, status
from typing import List

from app.api.v1.schemas import ProgressUpdate, ProgressResponse
from app.database.duckdb_repository import DuckDBRepository
from app.api.v1.auth import get_current_user
from datetime import datetime

router = APIRouter()

# Dependency to get database repository
def get_db_repository():
    return DuckDBRepository()

@router.post("/update", response_model=ProgressResponse)
async def update_progress(
    progress: ProgressUpdate,
    current_user: dict = Depends(get_current_user),
    db_repo: DuckDBRepository = Depends(get_db_repository)
):
    """Update user's learning progress"""
    session = db_repo.get_session()
    try:
        progress_data = {
            "user_id": current_user["id"],
            "concept_id": progress.concept_id,
            "concept_type": progress.concept_type,
            "status": progress.status,
            "progress_percentage": progress.progress_percentage,
            "completed_sections": progress.completed_sections
        }
        
        # Set completed_at if status is completed
        if progress.status == "completed":
            progress_data["completed_at"] = datetime.utcnow()
        
        result = db_repo.update_progress(session, progress_data)
        return ProgressResponse(**result)
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update progress: {str(e)}"
        )
    finally:
        db_repo.close_session(session)

@router.get("/", response_model=List[ProgressResponse])
async def get_progress(
    current_user: dict = Depends(get_current_user),
    db_repo: DuckDBRepository = Depends(get_db_repository)
):
    """Get user's learning progress"""
    session = db_repo.get_session()
    try:
        progress_records = db_repo.get_progress(session, current_user["id"])
        return [ProgressResponse(**record) for record in progress_records]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch progress: {str(e)}"
        )
    finally:
        db_repo.close_session(session)

@router.get("/concept/{concept_id}", response_model=ProgressResponse)
async def get_concept_progress(
    concept_id: str,
    current_user: dict = Depends(get_current_user),
    db_repo: DuckDBRepository = Depends(get_db_repository)
):
    """Get progress for a specific concept"""
    session = db_repo.get_session()
    try:
        progress_records = db_repo.get_progress(session, current_user["id"])
        
        # Find the specific concept
        concept_progress = next(
            (record for record in progress_records if record["concept_id"] == concept_id),
            None
        )
        
        if not concept_progress:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Progress record not found for this concept"
            )
        
        return ProgressResponse(**concept_progress)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch concept progress: {str(e)}"
        )
    finally:
        db_repo.close_session(session)
