from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from src.models.ubicacion import Ubicacion
from src.schemas.ubicacion import UbicacionCreate


def get_ubicaciones(db: Session, skip: int = 0, limit: int = 100):
    return (
        db.query(Ubicacion)
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_ubicacion(db: Session, id_ubicacion: int):
    return (
        db.query(Ubicacion)
        .filter(Ubicacion.id_ubicacion == id_ubicacion)
        .first()
    )


def create_ubicacion(db: Session, ubicacion: UbicacionCreate):

    nueva = Ubicacion(**ubicacion.model_dump())

    try:
        db.add(nueva)
        db.commit()
        db.refresh(nueva)
        return nueva

    except SQLAlchemyError:
        db.rollback()
        raise


def update_ubicacion(
    db: Session,
    id_ubicacion: int,
    datos: UbicacionCreate
):

    ubicacion = get_ubicacion(db, id_ubicacion)

    if ubicacion is None:
        return None

    for campo, valor in datos.model_dump(exclude_unset=True).items():
        setattr(ubicacion, campo, valor)

    try:
        db.commit()
        db.refresh(ubicacion)
        return ubicacion

    except SQLAlchemyError:
        db.rollback()
        raise


def delete_ubicacion(db: Session, id_ubicacion: int):

    ubicacion = get_ubicacion(db, id_ubicacion)

    if ubicacion is None:
        return None

    try:
        db.delete(ubicacion)
        db.commit()
        return ubicacion

    except SQLAlchemyError:
        db.rollback()
        raise