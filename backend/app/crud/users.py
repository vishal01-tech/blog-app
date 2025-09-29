from sqlalchemy.orm import Session
from app.models.users import User as Users
from app.schemas.users import UserLogin
from app.utils.auth import verify_password

def get_user_by_email(db: Session, email: str):
    return db.query(Users).filter(Users.email == email).first()

def create_user(db: Session, username: str, email: str, hashed_password: str):
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
