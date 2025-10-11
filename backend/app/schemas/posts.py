from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime


# Shared fields for Create/Read
class PostBase(BaseModel):
    title: str
    content: str
    author: str
    category: Optional[str] = None
    image: Optional[str] = None  # image is optional


# When creating a post (input from frontend)
class PostCreate(PostBase):
    category: str


# When updating a post
class PostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    author: Optional[str] = None
    category: Optional[str] = None
    image: Optional[str] = None


# When returning a post (e.g., from a DB)
class PostResponse(PostBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    model_config = ConfigDict(from_attributes=True)
