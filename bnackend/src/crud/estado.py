from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from src.models.estado import Estado
from src.schemas.estado import EstadoCreate


def get_estados(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Estado).offset(skip).limit(limit).all()


def get_estado(db: Session, id_estado: int):
    return db.query(Estado).filter(Estado.id_estado == id_estado).first()


def create_estado(db: Session, estado: EstadoCreate):
    nuevo = Estado(**estado.model_dump())
    try:
        db.add(nuevo)
        db.commit()
        db.refresh(nuevo)
        return nuevo
    except SQLAlchemyError:
        db.rollback()
        raise


def update_estado(db: Session, id_estado: int, datos: EstadoCreate):
    estado = get_estado(db, id_estado)
    if estado is None:
        return None

    for k, v in datos.model_dump(exclude_unset=True).items():
        setattr(estado, k, v)

    try:
        db.commit()
        db.refresh(estado)
        return estado
    except SQLAlchemyError:
        db.rollback()
        raise


def delete_estado(db: Session, id_estado: int):
    estado = get_estado(db, id_estado)

    if estado is None:
        return None

    try:
        db.delete(estado)
        db.commit()
        return estado
    except SQLAlchemyError:
        db.rollback()
        raise