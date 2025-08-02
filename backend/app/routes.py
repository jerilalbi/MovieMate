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

@router.get("/hello")
def say_hello():
    return {"message": "Hello, world!"}
