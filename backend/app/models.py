from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from .database import Base

class Media(Base):
    __tablename__ = "media"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    director = Column(String)
    overview = Column(String)
    media_type = Column(String)  
    genre = Column(String)
    rating = Column(Integer)
    status = Column(String)
    completedSeason = Column(String)
    completedEpisode = Column(String)
    completed_date = Column(DateTime, nullable=True) 
    review = Column(String)
    bgImg = Column(String)
    posterImg = Column(String)
