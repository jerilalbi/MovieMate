from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, schemas, database

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/media", response_model=schemas.MediaOut)
def create_media(media: schemas.MediaCreate, db: Session = Depends(get_db)):
    db_media = models.Media(**media.dict())
    db.add(db_media)
    db.commit()
    db.refresh(db_media)
    return db_media

@router.get("/media", response_model=list[schemas.MediaOut])
def get_all_media(db: Session = Depends(get_db)):
    return db.query(models.Media).all()

@router.delete("/media/{media_id}")
def delete_media(media_id: int, db: Session = Depends(get_db)):
    media = db.query(models.Media).filter(models.Media.id == media_id).first()
    if not media:
        raise HTTPException(status_code=404, detail="Media not found")
    
    db.delete(media)
    db.commit()
    return {"detail": f"Media with id {media_id} deleted successfully"}

@router.get("/hello")
def say_hello():
    return {"message": "Hello, world!"}
