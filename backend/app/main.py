from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router as user_router  # User routes
from app.routes.posts import router as blog_router 
# FastAPI dependency to get current user
# from fastapi import Depends, HTTPException, status
# from sqlalchemy.orm import Session
# from app.core.database import get_db
# from app.crud.users import get_user_by_email
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login") # Blog routes

app = FastAPI()

# CORS
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(user_router)
app.include_router(blog_router) 
