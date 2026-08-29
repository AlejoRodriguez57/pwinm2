from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from src.models.media import Media
from src.schemas.media import MediaCreate, MediaUpdate


# ----------------------------------
# Obtener toda la media
# ----------------------------------

def get_media(
    db: Session,
    skip: int = 0,
    limit: int = 100
):
    return (
        db.query(Media)
        .offset(skip)
        .limit(limit)
        .all()
    )


# ----------------------------------
# Obtener media por ID
# ----------------------------------

def get_media_por_id(
    db: Session,
    id_media: int
):
    return (
        db.query(Media)
        .filter(Media.id_media == id_media)
        .first()
    )


# ----------------------------------
# Obtener media por propiedad
# ----------------------------------

def get_media_por_propiedad(
    db: Session,
    id_prop: int
):
    return (
        db.query(Media)
        .filter(Media.id_prop == id_prop)
        .all()
    )


# ----------------------------------
# Crear media
# ----------------------------------

def create_media(
    db: Session,
    media: MediaCreate
):
    nueva = Media(**media.model_dump())

    try:
        db.add(nueva)
        db.commit()
        db.refresh(nueva)

        return nueva

    except SQLAlchemyError:
        db.rollback()
        raise


# ----------------------------------
# Modificar media
# ----------------------------------

def update_media(
    db: Session,
    id_media: int,
    datos: MediaUpdate
):
    media = get_media_por_id(
        db,
        id_media
    )

    if media is None:
        return None

    for campo, valor in datos.model_dump(
        exclude_unset=True
    ).items():

        setattr(
            media,
            campo,
            valor
        )

    try:
        db.commit()
        db.refresh(media)

        return media

    except SQLAlchemyError:
        db.rollback()
        raise


# ----------------------------------
# Eliminar media
# ----------------------------------

def delete_media(
    db: Session,
    id_media: int
):
    media = get_media_por_id(
        db,
        id_media
    )

    if media is None:
        return None

    try:
        db.delete(media)
        db.commit()

        return media

    except SQLAlchemyError:
        db.rollback()
        raise
