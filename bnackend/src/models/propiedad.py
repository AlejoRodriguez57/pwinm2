from sqlalchemy import Column, Integer, String, Numeric, Text, ForeignKey
from sqlalchemy.orm import relationship
from src.db.base_class import Base

class Propiedad(Base):
    __tablename__ = "propiedades"

    id_prop = Column(Integer, primary_key=True, index=True)
    id_operacion = Column(Integer,ForeignKey("operacion.id_operacion"),nullable=False)
    id_estado = Column(Integer,ForeignKey("estado.id_estado"),nullable=False)
    id_tipo_propiedad = Column(Integer,ForeignKey("tipo_propiedad.id_tipo_propiedad"),nullable=False)
    id_ubicacion = Column(Integer,ForeignKey("ubicacion.id_ubicacion"),nullable=False)
    id_empleado = Column(Integer, ForeignKey("empleados.id_empleado"), nullable=False)

    operacion = relationship("Operacion", back_populates="propiedades")
    estado = relationship("Estado", back_populates="propiedades")
    tipo_propiedad = relationship("TipoPropiedad", back_populates="propiedades")
    ubicacion = relationship("Ubicacion", back_populates="propiedades")
    empleado = relationship("Empleado", back_populates="propiedades")
    media = relationship("Media",back_populates="propiedad",cascade="all, delete-orphan")

    titulo = Column(String(150))
    precio = Column(Numeric(10, 2))
    descripcion = Column(Text)
    expensas = Column(Numeric(10, 2))
    metros_cuadrados = Column(Numeric(8, 2))
    ambientes = Column(Integer)
    dormitorios = Column(Integer)
    banios = Column(Integer)
    antiguedad = Column(Integer)
    cocheras = Column(Integer)
