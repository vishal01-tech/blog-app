from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.users import UserLogin, TokenResponse, UserSignUp
from app.utils.auth import verify_password, create_access_token, hash_password
from datetime import timedelta
from app.crud.users import get_user_by_email, create_user  # Import CRUD functions

router = APIRouter()

# Login Route
@router.post("/login", response_model=TokenResponse)
def login(user_login: UserLogin, db: Session = Depends(get_db)):
    # Fetch user from database using email
    user = get_user_by_email(db, user_login.email)

    # Validate if user exists and the password is correct
    if not user or not verify_password(user_login.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # Create JWT token
    token_data = {"sub": user.email}
    access_token = create_access_token(data=token_data, time_delta=timedelta(minutes=30))

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "email": user.email,
        "username": user.username
    }

# SignUp Route
@router.post("/signup", response_model=TokenResponse)
def signup(user_signup: UserSignUp, db: Session = Depends(get_db)):
    # Check if the email already exists
    existing_user = get_user_by_email(db, user_signup.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash the password before saving it
    hashed_password = hash_password(user_signup.password)

    # Create a new user
    new_user = create_user(db, user_signup.username, user_signup.email, hashed_password)

    # Create JWT token for the newly registered user
    token_data = {"sub": new_user.email}
    access_token = create_access_token(data=token_data, time_delta=timedelta(minutes=30))

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "email": new_user.email,
        "username": new_user.username
    }
