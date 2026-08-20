from sqlalchemy import Column, Integer, String, Numeric, Text, ForeignKey
from sqlalchemy.orm import relationship
from src.db.base_class import Base

class Media(Base):
    __tablename__ = "media"

    id_media = Column(Integer, primary_key=True, index=True)

    id_prop = Column(
        Integer,
        ForeignKey("propiedades.id_prop", ondelete="CASCADE"),
        nullable=False
    )

    link = Column(Text, nullable=False)

    id_tipo_media = Column(
        Integer,
        ForeignKey("tipo_media.id_tipo_media"),
        nullable=False
    )

    propiedad = relationship("Propiedad", back_populates="media")
    tipo_media = relationship("TipoMedia", back_populates="media")