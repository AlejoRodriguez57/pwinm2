from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from src.models.operacion import Operacion
from src.schemas.operacion import OperacionCreate


def get_operaciones(db: Session, skip: int = 0, limit: int = 100):
    return (
        db.query(Operacion)
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_operacion(db: Session, id_operacion: int):
    return (
        db.query(Operacion)
        .filter(Operacion.id_operacion == id_operacion)
        .first()
    )


def create_operacion(db: Session, operacion: OperacionCreate):

    nueva = Operacion(**operacion.model_dump())

    try:
        db.add(nueva)
        db.commit()
        db.refresh(nueva)
        return nueva

    except SQLAlchemyError:
        db.rollback()
        raise


def update_operacion(db: Session, id_operacion: int, datos: OperacionCreate):

    operacion = get_operacion(db, id_operacion)

    if operacion is None:
        return None

    for campo, valor in datos.model_dump(exclude_unset=True).items():
        setattr(operacion, campo, valor)

    try:
        db.commit()
        db.refresh(operacion)
        return operacion

    except SQLAlchemyError:
        db.rollback()
        raise


def delete_operacion(db: Session, id_operacion: int):

    operacion = get_operacion(db, id_operacion)

    if operacion is None:
        return None

    try:
        db.delete(operacion)
        db.commit()
        return operacion

    except SQLAlchemyError:
        db.rollback()
        raise