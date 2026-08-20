from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship

from src.db.base_class import Base


class Usuario(Base):
    __tablename__ = "usuarios"

    id_usuario = Column(Integer,primary_key=True,index=True)
    nombre = Column(String(100),nullable=False)
    email = Column(String(150),unique=True,nullable=False,index=True)
    telefono = Column(String(20),nullable=True)
    password_hash = Column(String(255),nullable=False)
    
    id_rol = Column(Integer, ForeignKey("roles.id_rol"), nullable=False)
    rol = relationship("Rol", back_populates="usuarios")
    empleado = relationship("Empleado",back_populates="usuario",uselist=False)
    
    codigos_login = relationship(
        "CodigoLogin",
        back_populates="usuario",
        cascade="all, delete-orphan"
    )