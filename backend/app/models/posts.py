from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True,autoincrement=True)
    title = Column(String(100), nullable=False)    
    author = Column(String(255), nullable=False)    
    category = Column(String(50),nullable=False)  
    content = Column(Text, nullable=False)
    image = Column(String(2083), nullable=True)             
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)
    author_id = Column(Integer, ForeignKey("users.id"))
