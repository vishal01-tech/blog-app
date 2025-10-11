from sqlalchemy.orm import Session
from app.models.users import User as Users
from app.schemas.users import UserLogin
from datetime import datetime, timedelta
import random
import string




def get_user_by_email(db: Session, email: str):
    return db.query(Users).filter(Users.email == email).first()

from fastapi import HTTPException, status

def create_user(db: Session, username: str, email: str, hashed_password: str):
    # Check if username already exists
    existing_user = db.query(Users).filter(Users.username == username).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already exists"
        )
    
    # Check if email already exists
    existing_email = db.query(Users).filter(Users.email == email).first()
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already exists"
        )

    # Create new user
    new_user = Users(username=username, email=email, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def delete_user(db: Session, user_id: int):
    user = db.query(Users).filter(Users.id == user_id).first()
    if user:
        db.delete(user)
        db.commit()
    return user

def update_user_password(db: Session, user_id: int, new_hashed_password: str):
    user = db.query(Users).filter(Users.id == user_id).first()
    if user:
        user.password = new_hashed_password
        db.commit()
        db.refresh(user)
    return user

def generate_otp():
    return ''.join(random.choices(string.digits, k=6))

def set_user_otp(db: Session, user: Users, otp: str):
    user.otp = otp
    user.otp_expiry = datetime.utcnow() + timedelta(minutes=10)  # OTP valid for 10 minutes
    db.commit()
    db.refresh(user)
    return user

def verify_user_otp(db: Session, user: Users, otp: str):
    if user.otp == otp and user.otp_expiry > datetime.utcnow():
        return True
    return False
