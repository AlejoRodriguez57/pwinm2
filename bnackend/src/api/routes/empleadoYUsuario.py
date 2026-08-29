from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from src.api.deps import get_db, require_roles

from src.schemas.empleadoYUsuario import (
    EmpleadoYUsuarioCreate,
    EmpleadoYUsuarioUpdate,
    EmpleadoYUsuarioResponse
)

from src.crud import empleadoYUsuario as crud
from src.crud import usuario as crud_usuario


router = APIRouter(
    prefix="/empleados",
    tags=["Empleados"]
)


# ==================================
# Obtener empleados + usuarios
# ==================================

@router.get(
    "/empleadoYUsuario",
    response_model=list[EmpleadoYUsuarioResponse]
)
def get_empleadosYUsuarios(
    db: Session = Depends(get_db),
    usuario_actual=Depends(require_roles("admin"))
):

    empleados = crud.get_empleadosYUsuarios(db)

    return [
        {
            "empleado": empleado,
            "usuario": empleado.usuario
        }
        for empleado in empleados
        if empleado.usuario
    ]


# ==================================
# Crear empleado + usuario
# ==================================

@router.post(
    "/empleadoYUsuario",
    response_model=EmpleadoYUsuarioResponse
)
def crear_empleadoYUsuario(
    datos: EmpleadoYUsuarioCreate,
    db: Session = Depends(get_db),
    usuario_actual=Depends(require_roles("admin"))
):

    usuario_existente = crud_usuario.get_usuario_by_email(
        db,
        datos.usuario.email
    )

    if usuario_existente:

        raise HTTPException(
            status_code=400,
            detail="El email ya está registrado"
        )


    empleado, usuario = crud.create_empleadoYUsuario(
        db,
        datos.usuario,
        datos.empleado
    )


    return {
        "empleado": empleado,
        "usuario": usuario
    }


# ==================================
# Modificar empleado + usuario
# ==================================

@router.put(
    "/empleadoYUsuario/{id_empleado}",
    response_model=EmpleadoYUsuarioResponse
)
def modificar_empleadoYUsuario(
    id_empleado: int,
    datos: EmpleadoYUsuarioUpdate,
    db: Session = Depends(get_db),
    usuario_actual=Depends(require_roles("admin"))
):

    # Buscar UN empleado por ID

    empleado = crud.get_empleadoYUsuario(
        db,
        id_empleado
    )

    if not empleado:

        raise HTTPException(
            status_code=404,
            detail="Empleado no encontrado"
        )


    # Obtener usuario relacionado

    usuario = empleado.usuario

    if not usuario:

        raise HTTPException(
            status_code=404,
            detail="Usuario del empleado no encontrado"
        )


    # ----------------------------------
    # Datos del usuario
    # ----------------------------------

    datos_usuario = (
        datos.usuario.model_dump(
            exclude_unset=True
        )
        if datos.usuario
        else {}
    )


    # ----------------------------------
    # Datos del empleado
    # ----------------------------------

    datos_empleado = (
        datos.empleado.model_dump(
            exclude_unset=True
        )
        if datos.empleado
        else {}
    )


    # ----------------------------------
    # Verificar email
    # ----------------------------------

    if "email" in datos_usuario:

        usuario_existente = (
            crud_usuario.get_usuario_by_email(
                db,
                datos_usuario["email"]
            )
        )

        if (
            usuario_existente
            and usuario_existente.id_usuario != usuario.id_usuario
        ):

            raise HTTPException(
                status_code=400,
                detail="El email ya está registrado"
            )


    # ----------------------------------
    # Actualizar
    # ----------------------------------

    empleado, usuario = crud.update_empleadoYUsuario(
        db,
        empleado,
        usuario,
        datos_empleado,
        datos_usuario
    )


    return {
        "empleado": empleado,
        "usuario": usuario
    }


# ==================================
# Eliminar empleado + usuario
# ==================================

@router.delete(
    "/empleadoYUsuario/{id_empleado}",
    response_model=EmpleadoYUsuarioResponse
)
def eliminar_empleadoYUsuario(
    id_empleado: int,
    db: Session = Depends(get_db),
    usuario_actual=Depends(require_roles("admin"))
):

    # Buscar UN empleado por ID

    empleado = crud.get_empleadoYUsuario(
        db,
        id_empleado
    )

    if not empleado:

        raise HTTPException(
            status_code=404,
            detail="Empleado no encontrado"
        )


    # Obtener usuario relacionado

    usuario = empleado.usuario

    if not usuario:

        raise HTTPException(
            status_code=404,
            detail="Usuario del empleado no encontrado"
        )


    # ----------------------------------
    # Eliminar empleado + usuario
    # ----------------------------------

    empleado_eliminado, usuario_eliminado = (
        crud.delete_empleadoYUsuario(
            db,
            empleado,
            usuario
        )
    )


    return {
        "empleado": empleado_eliminado,
        "usuario": usuario_eliminado
    }