from sqlalchemy.exc import SQLAlchemyError

from src.models.media import Media
from src.schemas.media import MediaCreate, MediaUpdate


def get_media(db: Session, skip: int = 0, limit: int = 100):
    return (
        db.query(Media)
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_media_by_id(db: Session, id_media: int):
    return (
        db.query(Media)
        .filter(Media.id_media == id_media)
        .first()
    )


def get_media_propiedad(db: Session, id_prop: int):
    return (
        db.query(Media)
        .filter(Media.id_prop == id_prop)
        .all()
    )


def create_media(db: Session, media: MediaCreate):

    nueva = Media(**media.model_dump())

    try:
        db.add(nueva)
        db.commit()
        db.refresh(nueva)
        return nueva

    except SQLAlchemyError:
        db.rollback()
        raise


def update_media(db: Session, id_media: int, datos: MediaUpdate):

    media = get_media_by_id(db, id_media)

    if media is None:
        return None

    for campo, valor in datos.model_dump(exclude_unset=True).items():
        setattr(media, campo, valor)

    try:
        db.commit()
        db.refresh(media)
        return media

    except SQLAlchemyError:
        db.rollback()
        raise


def delete_media(db: Session, id_media: int):

    media = get_media_by_id(db, id_media)

    if media is None:
        return None

    try:
        db.delete(media)
        db.commit()
        return media

    except SQLAlchemyError:
        db.rollback()
        raise