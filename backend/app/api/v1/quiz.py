from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional

from app.api.v1.schemas import (
    QuizQuestionResponse, QuizSubmission, QuizResultResponse, QuizAttemptResponse
)
from app.database.duckdb_repository import DuckDBRepository
from app.api.v1.auth import get_current_user

router = APIRouter()

# Dependency to get database repository
def get_db_repository():
    return DuckDBRepository()

@router.get("/questions/{category}", response_model=List[QuizQuestionResponse])
async def get_quiz_questions(
    category: str,
    limit: int = 10,
    db_repo: DuckDBRepository = Depends(get_db_repository)
):
    """Get quiz questions for a category"""
    session = db_repo.get_session()
    try:
        questions = db_repo.get_quiz_questions(session, category, limit)
        # Remove correct_answer and explanation from response (only for taking quiz)
        for question in questions:
            question.pop("correct_answer", None)
            question.pop("explanation", None)
        
        return [QuizQuestionResponse(**question) for question in questions]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch quiz questions: {str(e)}"
        )
    finally:
        db_repo.close_session(session)

@router.post("/submit", response_model=QuizAttemptResponse)
async def submit_quiz(
    submission: QuizSubmission,
    current_user: dict = Depends(get_current_user),
    db_repo: DuckDBRepository = Depends(get_db_repository)
):
    """Submit quiz answers and get results"""
    session = db_repo.get_session()
    try:
        # Get the questions to check answers
        questions = db_repo.get_quiz_questions(session, submission.category, limit=50)
        question_dict = {str(q["id"]): q for q in questions}
        
        # Calculate score
        score = 0
        total_questions = len(submission.answers)
        questions_attempted = {}
        
        for question_id, user_answer in submission.answers.items():
            question = question_dict.get(question_id)
            if question:
                is_correct = question["correct_answer"] == user_answer
                if is_correct:
                    score += 1
                
                questions_attempted[question_id] = {
                    "user_answer": user_answer,
                    "correct_answer": question["correct_answer"],
                    "is_correct": is_correct,
                    "explanation": question.get("explanation", "")
                }
        
        # Save quiz attempt
        quiz_data = {
            "user_id": current_user["id"],
            "category": submission.category,
            "questions_attempted": questions_attempted,
            "score": score,
            "total_questions": total_questions,
            "time_taken": submission.time_taken
        }
        
        result = db_repo.submit_quiz(session, quiz_data)
        return QuizAttemptResponse(**result)
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to submit quiz: {str(e)}"
        )
    finally:
        db_repo.close_session(session)

@router.get("/results", response_model=List[QuizResultResponse])
async def get_quiz_results(
    category: Optional[str] = None,
    current_user: dict = Depends(get_current_user),
    db_repo: DuckDBRepository = Depends(get_db_repository)
):
    """Get user's quiz results"""
    session = db_repo.get_session()
    try:
        results = db_repo.get_quiz_results(session, current_user["id"], category)
        return [QuizResultResponse(**result) for result in results]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch quiz results: {str(e)}"
        )
    finally:
        db_repo.close_session(session)
