from datetime import datetime
from pydantic import BaseModel

class MediaBase(BaseModel):
    title: str
    media_type: str
    genre: str
    rating: int
    review: str
    completed_date: datetime | None = None
    completedSeason: int | None = None
    completedEpisode: int | None = None
    status: str
    bgImg: str | None = None
    posterImg: str | None = None

class MediaCreate(MediaBase):
    pass

class MediaOut(MediaBase):
    id: int

    class Config:
        orm_mode = True
