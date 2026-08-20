from datetime import datetime

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String
)
from sqlalchemy.orm import relationship

from src.db.base_class import Base


class CodigoLogin(Base):

    __tablename__ = "codigo_login"

    id_codigo = Column(Integer,primary_key=True,index=True)
    id_usuario = Column(Integer,ForeignKey("usuarios.id_usuario",ondelete="CASCADE"),nullable=False,index=True)
    codigo_hash = Column(String(255),nullable=False)
    expira_en = Column(DateTime(timezone=True),nullable=False)
    intentos = Column(Integer,nullable=False,default=0)
    usado = Column(Boolean,nullable=False,default=False)
    creado_en = Column(DateTime(timezone=True),nullable=False,default=datetime.utcnow)

    usuario = relationship(
        "Usuario",
        back_populates="codigos_login"
    )