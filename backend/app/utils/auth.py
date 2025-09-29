import datetime
import jwt
import os
from dotenv import load_dotenv
from jose import JWTError
from fastapi import Request
from passlib.context import CryptContext

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")


# Initialize a CryptContext for password hashing
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














