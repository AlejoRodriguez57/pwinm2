from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from src.api.deps import (
    get_db,
    require_roles
)

from src.schemas.media import (
    MediaCreate,
    MediaUpdate,
    Media
)

from src.crud import media as crud


router = APIRouter(
    prefix="/media",
    tags=["Media"]
)


# ----------------------------------
# Obtener toda la media
# ----------------------------------

@router.get("/", response_model=list[Media])
def get_media(
    db: Session = Depends(get_db)
):
    return crud.get_media(db)


# ----------------------------------
# Obtener media por propiedad
# ----------------------------------

@router.get("/propiedad/{id_prop}", response_model=list[Media])
def get_media_por_propiedad(
    id_prop: int,
    db: Session = Depends(get_db)
):
    return crud.get_media_por_propiedad(
        db,
        id_prop
    )


# ----------------------------------
# Obtener una media
# ----------------------------------

@router.get("/{id_media}", response_model=Media)
def get_media_por_id(
    id_media: int,
    db: Session = Depends(get_db)
):

    media_db = crud.get_media_por_id(
        db,
        id_media
    )

    if not media_db:
        raise HTTPException(
            status_code=404,
            detail="Media no encontrada"
        )

    return media_db


# ----------------------------------
# Crear media
# ----------------------------------

@router.post("/", response_model=Media)
def crear_media(
    datos: MediaCreate,
    db: Session = Depends(get_db),
    usuario_actual = Depends(require_roles("admin", "editor"))
):

    return crud.create_media(
        db,
        datos
    )


# ----------------------------------
# Modificar media
# ----------------------------------

@router.put("/{id_media}", response_model=Media)
def update_media(
    id_media: int,
    datos: MediaUpdate,
    db: Session = Depends(get_db),
    usuario_actual = Depends(require_roles("admin", "editor"))
):

    media_db = crud.update_media(
        db,
        id_media,
        datos
    )

    if not media_db:
        raise HTTPException(
            status_code=404,
            detail="Media no encontrada"
        )

    return media_db


# ----------------------------------
# Eliminar media
# ----------------------------------

@router.delete("/{id_media}", response_model=Media)
def delete_media(
    id_media: int,
    db: Session = Depends(get_db),
    usuario_actual = Depends(require_roles("admin", "editor"))
):

    media_db = crud.delete_media(
        db,
        id_media
    )

    if not media_db:
        raise HTTPException(
            status_code=404,
            detail="Media no encontrada"
        )

    return media_db