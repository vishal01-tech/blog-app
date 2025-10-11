import datetime
import jwt
import os
import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv
from jose import JWTError
from fastapi import Request
from passlib.context import CryptContext
# from main import oauth2_scheme
from app.core.database import get_db
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from app.crud.users import get_user_by_email


from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USERNAME = os.getenv("SMTP_USERNAME")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")


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
        return jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.exceptions.DecodeError:
        return None


# to get the current user
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

# send OTP email
def send_otp_email(to_email: str, otp: str):
    # Temporary: Print OTP to console for testing since SMTP is not configured
    print(f"OTP for {to_email}: {otp}")
    # Uncomment below to send actual email once SMTP is configured
    # msg = MIMEText(f"Your OTP for password reset is: {otp}. It expires in 10 minutes.")
    # msg['Subject'] = 'Password Reset OTP'
    # msg['From'] = SMTP_USERNAME
    # msg['To'] = to_email
    # try:
    #     server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
    #     server.starttls()
    #     server.login(SMTP_USERNAME, SMTP_PASSWORD)
    #     server.sendmail(SMTP_USERNAME, to_email, msg.as_string())
    #     server.quit()
    # except Exception as e:
    #     print(f"Failed to send email: {e}")
