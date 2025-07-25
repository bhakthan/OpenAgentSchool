from fastapi import APIRouter, Depends, HTTPException, status
from datetime import timedelta

from app.api.v1.schemas import UserCreate, UserResponse, UserLogin, Token
from app.database.duckdb_repository import DuckDBRepository
from app.api.v1.auth import (
    get_password_hash, authenticate_user, create_access_token
)
from config import settings

router = APIRouter()

# Dependency to get database repository
def get_db_repository():
    return DuckDBRepository()

@router.post("/register", response_model=UserResponse)
async def register_user(
    user: UserCreate,
    db_repo: DuckDBRepository = Depends(get_db_repository)
):
    """Register a new user"""
    session = db_repo.get_session()
    try:
        # Check if user already exists
        existing_user = db_repo.get_user_by_username(session, user.username)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already registered"
            )
        
        existing_email = db_repo.get_user_by_email(session, user.email)
        if existing_email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Create new user
        hashed_password = get_password_hash(user.password)
        user_data = {
            "username": user.username,
            "email": user.email,
            "hashed_password": hashed_password
        }
        
        created_user = db_repo.create_user(session, user_data)
        return UserResponse(**created_user)
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to register user: {str(e)}"
        )
    finally:
        db_repo.close_session(session)

@router.post("/login", response_model=Token)
async def login_for_access_token(
    form_data: UserLogin,
    db_repo: DuckDBRepository = Depends(get_db_repository)
):
    """Login user and return access token"""
    user = authenticate_user(db_repo, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["username"]}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}
