from sqlalchemy import Column, Integer, String, Numeric, Text, ForeignKey
from sqlalchemy.orm import relationship
from src.db.base_class import Base

class Estado(Base):
    __tablename__ = "estado"

    id_estado = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(30), nullable=False, unique=True)
    propiedades = relationship("Propiedad", back_populates="estado")