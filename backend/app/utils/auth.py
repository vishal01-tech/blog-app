import datetime
import jwt
import os
from dotenv import load_dotenv
from jose import JWTError
from fastapi import Request
from passlib.context import CryptContext
from main import oauth2_scheme
from app.core.database import get_db
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from app.crud.users import get_user_by_email



load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")


# password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Function to hash a password
def hash_password(password: str):
    password = password[:72]
    return pwd_context.hash(password)

# Function to verify a password
def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)



# to create the jwt access token
def create_access_token(data : dict,time_delta : None):
    to_encode = data.copy()
    expire = datetime.datetime.now() + time_delta  
    to_encode.update({"exp":expire})
    encoded_jwt = jwt.encode(to_encode,SECRET_KEY,algorithm = ALGORITHM)

    return encoded_jwt


# to verify the access token
def verify_access_token(access_token: str):
    try:
        return jwt.decode(access_token,SECRET_KEY,ALGORITHM=(ALGORITHM))
    except JWTError:
        return None


# to get the current user
def get_current_user(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        return None
    return verify_access_token(token)


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    payload = verify_access_token(token)
    if payload is None:
        raise credentials_exception
    email: str = payload.get("sub")
    if email is None:
        raise credentials_exception
    user = get_user_by_email(db, email)
    if user is None:
        raise credentials_exception
    return user














