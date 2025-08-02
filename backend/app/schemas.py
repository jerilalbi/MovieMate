from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class MediaBase(BaseModel):
    title: str
    director: str
    media_type: str
    overview: str
    genre: str
    rating: int
    review: str
    completed_date: Optional[datetime] = None
    completedSeason: str | None = None
    completedEpisode: str | None = None
    status: str
    bgImg: str | None = None
    posterImg: str | None = None

class MediaCreate(MediaBase):
    pass

class MediaOut(MediaBase):
    id: int

    class Config:
        orm_mode = True
