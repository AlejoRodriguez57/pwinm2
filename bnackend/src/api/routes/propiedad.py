from typing import Optional

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.api.deps import (
    get_db,
    require_roles
)

from src.schemas.propiedad import (
    PropiedadCreate,
    PropiedadUpdate,
    Propiedad,
    PropiedadConMedia
)

from src.crud import propiedad as crud


router = APIRouter(
    prefix="/propiedades",
    tags=["Propiedades"]
)

# ----------------------------------
# Obtener todas
# ----------------------------------

@router.get("/", response_model=list[Propiedad])
def get_propiedades(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):

    return crud.get_propiedades(
        db,
        skip,
        limit
    )


# ----------------------------------
# Buscar propiedades
# ----------------------------------
@router.get("/buscar", response_model=list[Propiedad])
def buscar_propiedades(

    id_operacion: Optional[int] = None,
    id_estado: Optional[int] = None,
    id_tipo_propiedad: Optional[int] = None,
    id_ubicacion: Optional[int] = None,
    id_empleado: Optional[int] = None,


    # Precio
    precio: Optional[float] = None,
    precio_min: Optional[float] = None,
    precio_max: Optional[float] = None,


    # Expensas
    expensas: Optional[float] = None,
    expensas_min: Optional[float] = None,
    expensas_max: Optional[float] = None,


    # Metros cuadrados
    metros_cuadrados: Optional[float] = None,
    metros_cuadrados_min: Optional[float] = None,
    metros_cuadrados_max: Optional[float] = None,


    # Ambientes
    ambientes: Optional[int] = None,
    ambientes_min: Optional[int] = None,
    ambientes_max: Optional[int] = None,


    # Dormitorios
    dormitorios: Optional[int] = None,
    dormitorios_min: Optional[int] = None,
    dormitorios_max: Optional[int] = None,


    # Baños
    banios: Optional[int] = None,
    banios_min: Optional[int] = None,
    banios_max: Optional[int] = None,


    # Antigüedad
    antiguedad: Optional[int] = None,
    antiguedad_min: Optional[int] = None,
    antiguedad_max: Optional[int] = None,


    # Cocheras
    cocheras: Optional[int] = None,
    cocheras_min: Optional[int] = None,
    cocheras_max: Optional[int] = None,


    skip: int = 0,
    limit: int = 100,


    db: Session = Depends(get_db)
):

    return crud.buscar_propiedades(
        db,

        id_operacion,
        id_estado,
        id_tipo_propiedad,
        id_ubicacion,
        id_empleado,

        precio,
        precio_min,
        precio_max,

        expensas,
        expensas_min,
        expensas_max,

        metros_cuadrados,
        metros_cuadrados_min,
        metros_cuadrados_max,

        ambientes,
        ambientes_min,
        ambientes_max,

        dormitorios,
        dormitorios_min,
        dormitorios_max,

        banios,
        banios_min,
        banios_max,

        antiguedad,
        antiguedad_min,
        antiguedad_max,

        cocheras,
        cocheras_min,
        cocheras_max,

        skip,
        limit
    )


# ----------------------------------
# Crear
# ----------------------------------

@router.post("/", response_model=Propiedad)
def crear_propiedad(
    propiedad: PropiedadCreate,
    db: Session = Depends(get_db),
    usuario = Depends(require_roles("admin"))
):

    return crud.create_propiedad(
        db,
        propiedad
    )

# ----------------------------------
# Obtener todas con media
# ----------------------------------

@router.get(
    "/con_media",
    response_model=list[PropiedadConMedia]
)
def get_propiedades_con_media(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):

    return crud.get_propiedades_con_media(
        db,
        skip,
        limit
    )

# ----------------------------------
# Obtener una
# ----------------------------------

@router.get("/{id_prop}", response_model=Propiedad)
def get_propiedad(
    id_prop: int,
    db: Session = Depends(get_db)
):

    return crud.get_propiedad(
        db,
        id_prop
    )
# ----------------------------------
# Obtener una propiedad con media
# ----------------------------------

@router.get(
    "/{id_prop}/con_media",
    response_model=PropiedadConMedia
)
def get_propiedad_con_media(
    id_prop: int,
    db: Session = Depends(get_db)
):

    return crud.get_propiedad_con_media(
        db,
        id_prop
    )
# ----------------------------------
# Modificar
# ----------------------------------

@router.put("/{id_prop}", response_model=Propiedad)
def modificar_propiedad(
    id_prop: int,
    datos: PropiedadUpdate,
    db: Session = Depends(get_db),
    usuario = Depends(require_roles("admin"))
):

    return crud.update_propiedad(
        db,
        id_prop,
        datos
    )


# ----------------------------------
# Eliminar
# ----------------------------------

@router.delete("/{id_prop}", response_model=Propiedad)
def eliminar_propiedad(
    id_prop: int,
    db: Session = Depends(get_db),
    usuario = Depends(require_roles("admin"))
):

    return crud.delete_propiedad(
        db,
        id_prop
    )
