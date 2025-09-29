from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.posts import PostCreate, PostUpdate, PostResponse
from app.crud import posts as crud_posts
from app.core.database import get_db

router = APIRouter(prefix="/posts", tags=["Posts"])


@router.post("/", response_model=PostResponse)
def create(post: PostCreate, db: Session = Depends(get_db)):
    return crud_posts.create_post(db, post)


@router.get("/", response_model=list[PostResponse])
def list_posts(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud_posts.get_all_posts(db, skip, limit)


@router.get("/{post_id}", response_model=PostResponse)
def read(post_id: int, db: Session = Depends(get_db)):
    post = crud_posts.get_post(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


@router.put("/{post_id}", response_model=PostResponse)
def update(post_id: int, post_update: PostUpdate, db: Session = Depends(get_db)):
    post = crud_posts.update_post(db, post_id, post_update)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


@router.delete("/{post_id}")
def delete(post_id: int, db: Session = Depends(get_db)):
    post = crud_posts.delete_post(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"detail": "Post deleted successfully"}
