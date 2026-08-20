from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from src.api.deps import get_db, require_roles

from src.schemas.empleado import (
    EmpleadoCreate,
    EmpleadoUpdate,
    EmpleadoResponse,
    ArticuloPropiedadAsesor,
)

from src.crud import empleado as crud



router = APIRouter(
    prefix="/empleados",
    tags=["Empleados"]
)



# Público
@router.get(
    "/",
    response_model=list[EmpleadoResponse]
)
def get_empleados(
    db: Session = Depends(get_db)
):

    return crud.get_empleados(db)



# Público
@router.get(
    "/ArticuloPropiedadAsesor/{id_empleado}",
    response_model=ArticuloPropiedadAsesor
)
def get_empleado_por_id(
    id_empleado: int,
    db: Session = Depends(get_db)
):

    empleado = crud.get_empleado(
        db,
        id_empleado
    )

    if not empleado:
        raise HTTPException(
            status_code=404,
            detail="Empleado no encontrado"
        )

    return empleado



# Admin
@router.post(
    "/",
    response_model=EmpleadoResponse
)
def crear_empleado(
    empleado: EmpleadoCreate,
    db: Session = Depends(get_db),
    usuario = Depends(require_roles("admin"))
):

    return crud.create_empleado(
        db,
        empleado
    )



# Admin
@router.put(
    "/{id_empleado}",
    response_model=EmpleadoResponse
)
def modificar_empleado(
    id_empleado: int,
    datos: EmpleadoUpdate,
    db: Session = Depends(get_db),
    usuario = Depends(require_roles("admin"))
):

    empleado = crud.get_empleado(
        db,
        id_empleado
    )


    if not empleado:
        raise HTTPException(
            status_code=404,
            detail="Empleado no encontrado"
        )


    return crud.update_empleado(
        db,
        empleado,
        datos.model_dump(
            exclude_unset=True
        )
    )



# Admin
@router.delete(
    "/{id_empleado}",
    response_model=EmpleadoResponse
)
def eliminar_empleado(
    id_empleado: int,
    db: Session = Depends(get_db),
    usuario = Depends(require_roles("admin"))
):

    empleado = crud.get_empleado(
        db,
        id_empleado
    )


    if not empleado:
        raise HTTPException(
            status_code=404,
            detail="Empleado no encontrado"
        )


    return crud.delete_empleado(
        db,
        empleado
    )