from sqlalchemy import Column, Integer, String, Numeric, Text, ForeignKey
from sqlalchemy.orm import relationship
from src.db.base_class import Base

class TipoMedia(Base):
    __tablename__ = "tipo_media"

    id_tipo_media = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(20), nullable=False, unique=True)
    media = relationship("Media", back_populates="tipo_media")