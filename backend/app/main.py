from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .routes import router as user_router
from .routes.posts import router as blog_router

app = FastAPI()

# CORS
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5174",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files serving for uploaded images
app.mount("/static", StaticFiles(directory="backend/app/static"), name="static")

# Include routes
app.include_router(user_router)
app.include_router(blog_router) 
