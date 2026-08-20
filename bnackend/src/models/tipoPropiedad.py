from sqlalchemy import Column, Integer, String, Numeric, Text, ForeignKey
from sqlalchemy.orm import relationship
from src.db.base_class import Base

class TipoPropiedad(Base):
    __tablename__ = "tipo_propiedad"

    id_tipo_propiedad = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), nullable=False, unique=True)
    propiedades = relationship("Propiedad", back_populates="tipo_propiedad")