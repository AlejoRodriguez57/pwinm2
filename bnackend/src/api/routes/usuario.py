from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from src.api.deps import (
    get_db,
    require_roles
)

from src.schemas.usuario import (
    UsuarioCreate,
    UsuarioUpdate,
    UsuarioResponse
)

from src.crud import usuario as crud


router = APIRouter(
    prefix="/usuarios",
    tags=["Usuarios"]
)


# Obtener todos los usuarios
@router.get("/", response_model=list[UsuarioResponse])
def get_usuarios(
    db: Session = Depends(get_db),
    usuario = Depends(require_roles("admin"))
):
    return crud.get_usuarios(db)

# Crear usuario
@router.post("/", response_model=UsuarioResponse)
def crear_usuario(
    usuario: UsuarioCreate,
    db: Session = Depends(get_db),
    usuario_actual = Depends(require_roles("admin"))
):

    usuario_existente = crud.get_usuario_by_email(
        db,
        usuario.email
    )

    if usuario_existente:
        raise HTTPException(
            status_code=400,
            detail="El email ya está registrado"
        )

    return crud.create_usuario(
        db,
        usuario
    )


# Actualizar usuario
@router.put("/{id_usuario}", response_model=UsuarioResponse)
def actualizar_usuario(
    id_usuario: int,
    datos: UsuarioUpdate,
    db: Session = Depends(get_db),
    usuario_actual = Depends(require_roles("admin"))
):

    usuario_db = crud.get_usuario(
        db,
        id_usuario
    )

    if not usuario_db:
        raise HTTPException(
            status_code=404,
            detail="Usuario no encontrado"
        )


    datos_actualizados = datos.model_dump(
        exclude_unset=True
    )


    return crud.update_usuario(
        db,
        usuario_db,
        datos_actualizados
    )


# Eliminar usuario
@router.delete("/{id_usuario}", response_model=UsuarioResponse)
def eliminar_usuario(
    id_usuario: int,
    db: Session = Depends(get_db),
    usuario_actual = Depends(require_roles("admin"))
):

    usuario_db = crud.get_usuario(
        db,
        id_usuario
    )

    if not usuario_db:
        raise HTTPException(
            status_code=404,
            detail="Usuario no encontrado"
        )


    return crud.delete_usuario(
        db,
        usuario_db
    )