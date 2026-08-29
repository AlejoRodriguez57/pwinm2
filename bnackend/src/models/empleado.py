from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from src.db.base_class import Base


class Empleado(Base):
    __tablename__ = "empleados"

    id_empleado = Column(Integer,primary_key=True,index=True)
    id_usuario = Column(Integer,ForeignKey("usuarios.id_usuario"),nullable=False, unique=True)
    whatsappLink = Column(String,nullable=True)
    img = Column(String,nullable=True)
    activo = Column(Boolean,default=True)

    propiedades = relationship("Propiedad",back_populates="empleado")
    usuario = relationship("Usuario",back_populates="empleado",uselist=False)