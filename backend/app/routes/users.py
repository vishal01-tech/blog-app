from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.users import UserLogin, TokenResponse, UserSignUp, ForgotPasswordRequest, VerifyOtpRequest, ResetPasswordRequest
from app.utils.auth import verify_password, create_access_token, hash_password, send_otp_email
from datetime import timedelta
from app.crud.users import get_user_by_email, create_user, generate_otp, set_user_otp, verify_user_otp

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

    # Hash the password 
    hashed_password = hash_password(user_signup.password)

    # Create a new user
    new_user = create_user(db, user_signup.username, user_signup.email, hashed_password)

    # Create JWT token for new user
    token_data = {"sub": new_user.email}
    access_token = create_access_token(data=token_data, time_delta=timedelta(minutes=30))

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "email": new_user.email,
        "username": new_user.username
    }

# Forgot Password - send OTP
@router.post("/forgot-password")
def forgot_password(request: ForgotPasswordRequest, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    user = get_user_by_email(db, request.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    otp = generate_otp()
    set_user_otp(db, user, otp)
    background_tasks.add_task(send_otp_email, user.email, otp)
    return {"detail": "OTP sent to registered email"}

# Verify OTP
@router.post("/verify-otp")
def verify_otp(request: VerifyOtpRequest, db: Session = Depends(get_db)):
    user = get_user_by_email(db, request.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if not verify_user_otp(db, user, request.otp):
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")
    return {"detail": "OTP verified"}

# Reset Password
@router.post("/reset-password")
def reset_password(request: ResetPasswordRequest, db: Session = Depends(get_db)):
    user = get_user_by_email(db, request.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if not verify_user_otp(db, user, request.otp):
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")
    hashed_password = hash_password(request.new_password)
    user.password = hashed_password
    user.otp = None
    user.otp_expiry = None
    db.commit()
    return {"detail": "Password reset successful"}
