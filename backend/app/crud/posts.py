from sqlalchemy.orm import Session
from app.models.posts import Post
from app.schemas.posts import PostCreate, PostUpdate


def create_post(db: Session, post_data: PostCreate, author_id: int = None) -> Post:
    post_dict = post_data.dict()
    if author_id:
        post_dict['author_id'] = author_id
    new_post = Post(**post_dict)
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post


def get_post(db: Session, post_id: int) -> Post | None:
    return db.query(Post).filter(Post.id == post_id).first()


def get_all_posts(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Post).order_by(Post.created_at.desc()).offset(skip).limit(limit).all()


def update_post(db: Session, post_id: int, update_data: PostUpdate) -> Post | None:
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        return None

    for key, value in update_data.dict(exclude_unset=True).items():
        setattr(post, key, value)

    db.commit()
    db.refresh(post)
    return post


def delete_post(db: Session, post_id: int) -> Post | None:
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        return None

    db.delete(post)
    db.commit()
    return post
