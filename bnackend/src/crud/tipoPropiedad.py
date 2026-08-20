from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from src.models.tipoPropiedad import TipoPropiedad
from src.schemas.tipoPropiedad import TipoPropiedadCreate


def get_tipos_propiedad(db: Session, skip: int = 0, limit: int = 100):
    return (
        db.query(TipoPropiedad)
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_tipo_propiedad(db: Session, id_tipo_propiedad: int):
    return (
        db.query(TipoPropiedad)
        .filter(TipoPropiedad.id_tipo_propiedad == id_tipo_propiedad)
        .first()
    )


def create_tipo_propiedad(db: Session, tipo_propiedad: TipoPropiedadCreate):

    nuevo = TipoPropiedad(**tipo_propiedad.model_dump())

    try:
        db.add(nuevo)
        db.commit()
        db.refresh(nuevo)
        return nuevo

    except SQLAlchemyError:
        db.rollback()
        raise


def update_tipo_propiedad(
    db: Session,
    id_tipo_propiedad: int,
    datos: TipoPropiedadCreate
):

    tipo_propiedad = get_tipo_propiedad(db, id_tipo_propiedad)

    if tipo_propiedad is None:
        return None

    for campo, valor in datos.model_dump(exclude_unset=True).items():
        setattr(tipo_propiedad, campo, valor)

    try:
        db.commit()
        db.refresh(tipo_propiedad)
        return tipo_propiedad

    except SQLAlchemyError:
        db.rollback()
        raise


def delete_tipo_propiedad(db: Session, id_tipo_propiedad: int):

    tipo_propiedad = get_tipo_propiedad(db, id_tipo_propiedad)

    if tipo_propiedad is None:
        return None

    try:
        db.delete(tipo_propiedad)
        db.commit()
        return tipo_propiedad

    except SQLAlchemyError:
        db.rollback()
        raise