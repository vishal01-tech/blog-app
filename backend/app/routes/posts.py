from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.schemas.posts import PostCreate, PostUpdate, PostResponse
from app.crud import posts as crud_posts
from app.core.database import get_db
from app.utils.auth import get_current_user
from app.models.users import User
import os

router = APIRouter(prefix="/posts", tags=["Posts"])

UPLOAD_DIR = "backend/app/static/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

#  post add
@router.post("/", response_model=PostResponse)
async def create(
    title: str = Form(...),
    content: str = Form(...),
    category: str = Form(...),
    author: str = Form(...),
    image: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    image_path = None
    if image:
        # Ensure upload directory exists
        os.makedirs(UPLOAD_DIR, exist_ok=True)
        file_location = os.path.join(UPLOAD_DIR, image.filename)
        with open(file_location, "wb") as f:
            f.write(await image.read())
        image_path = f"/static/uploads/{image.filename}"

    post_create = PostCreate(title=title, content=content,category=category, author=author, image=image_path)
    return crud_posts.create_post(db, post_create, author_id=current_user.id)




# post get
@router.get("/", response_model=list[PostResponse])
def list_posts(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud_posts.get_all_posts(db, skip, limit)




#  post read
@router.get("/{post_id}", response_model=PostResponse)
def read(post_id: int, db: Session = Depends(get_db)):
    post = crud_posts.get_post(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


#  post update
@router.put("/{post_id}", response_model=PostResponse)
async def update(
    post_id: int,
    title: str = Form(None),
    content: str = Form(None),
    author: str = Form(None),
    category: str = Form(...),
    image: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    post = crud_posts.get_post(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    if post.author_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this post")

    image_path = post.image
    if image:
        file_location = os.path.join(UPLOAD_DIR, image.filename)
        with open(file_location, "wb") as f:
            f.write(await image.read())
        image_path = f"/static/uploads/{image.filename}"

    post_update = PostUpdate(title=title, content=content,category=category, author=author, image=image_path)
    updated_post = crud_posts.update_post(db, post_id, post_update)
    return updated_post


# Post delete 
@router.delete("/{post_id}")
def delete(post_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    post = crud_posts.get_post(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    if post.author_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this post")
    crud_posts.delete_post(db, post_id)
    return {"detail": "Post deleted successfully"}
