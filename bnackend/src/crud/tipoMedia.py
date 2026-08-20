from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from src.models.tipoMedia import TipoMedia
from src.schemas.tipoMedia import TipoMediaCreate


def get_tipos_media(db: Session, skip: int = 0, limit: int = 100):
    return (
        db.query(TipoMedia)
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_tipo_media(db: Session, id_tipo_media: int):
    return (
        db.query(TipoMedia)
        .filter(TipoMedia.id_tipo_media == id_tipo_media)
        .first()
    )


def create_tipo_media(db: Session, tipo_media: TipoMediaCreate):

    nuevo = TipoMedia(**tipo_media.model_dump())

    try:
        db.add(nuevo)
        db.commit()
        db.refresh(nuevo)
        return nuevo

    except SQLAlchemyError:
        db.rollback()
        raise


def update_tipo_media(
    db: Session,
    id_tipo_media: int,
    datos: TipoMediaCreate
):

    tipo_media = get_tipo_media(db, id_tipo_media)

    if tipo_media is None:
        return None

    for campo, valor in datos.model_dump(exclude_unset=True).items():
        setattr(tipo_media, campo, valor)

    try:
        db.commit()
        db.refresh(tipo_media)
        return tipo_media

    except SQLAlchemyError:
        db.rollback()
        raise


def delete_tipo_media(db: Session, id_tipo_media: int):

    tipo_media = get_tipo_media(db, id_tipo_media)

    if tipo_media is None:
        return None

    try:
        db.delete(tipo_media)
        db.commit()
        return tipo_media

    except SQLAlchemyError:
        db.rollback()
        raise