from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.api.deps import (
    get_db,
    require_roles
)


from src.schemas.operacion import (
    OperacionCreate,
    OperacionUpdate,
    Operacion
)

from src.schemas.estado import (
    EstadoCreate,
    EstadoUpdate,
    Estado
)

from src.schemas.ubicacion import (
    UbicacionCreate,
    UbicacionUpdate,
    Ubicacion
)

from src.schemas.tipoPropiedad import (
    TipoPropiedadCreate,
    TipoPropiedadUpdate,
    TipoPropiedad
)

from src.schemas.tipoMedia import (
    TipoMediaCreate,
    TipoMediaUpdate,
    TipoMedia
)


from src.crud import (
    operacion,
    estado,
    ubicacion,
    tipoPropiedad,
    tipoMedia
)


router = APIRouter(
    prefix="/catalogos",
    tags=["Catalogos"]
)



# ==========================================================
# OPERACIONES
# ==========================================================

@router.get("/operaciones", response_model=list[Operacion])
def get_operaciones(
    db: Session = Depends(get_db)
):
    return operacion.get_operaciones(db)


@router.post("/operaciones", response_model=Operacion)
def crear_operacion(
    data: OperacionCreate,
    db: Session = Depends(get_db),
    usuario = Depends(require_roles("admin"))
):
    return operacion.create_operacion(db, data)


@router.put("/operaciones/{id_operacion}", response_model=Operacion)
def modificar_operacion(
    id_operacion: int,
    data: OperacionUpdate,
    db: Session = Depends(get_db),
    usuario = Depends(require_roles("admin"))
):
    return operacion.update_operacion(
        db,
        id_operacion,
        data
    )


@router.delete("/operaciones/{id_operacion}", response_model=Operacion)
def eliminar_operacion(
    id_operacion: int,
    db: Session = Depends(get_db),
    usuario = Depends(require_roles("admin"))
):
    return operacion.delete_operacion(
        db,
        id_operacion
    )

# ==========================================================
# ESTADOS
# ==========================================================

@router.get("/estados", response_model=list[Estado])
def get_estados(
    db: Session = Depends(get_db)
):
    return estado.get_estados(db)


@router.post("/estados", response_model=Estado)
def crear_estado(
    data: EstadoCreate,
    db: Session = Depends(get_db),
    usuario = Depends(require_roles("admin"))
):
    return estado.create_estado(db, data)


@router.put("/estados/{id_estado}", response_model=Estado)
def modificar_estado(
    id_estado: int,
    data: EstadoUpdate,
    db: Session = Depends(get_db),
    usuario = Depends(require_roles("admin"))
):
    return estado.update_estado(
        db,
        id_estado,
        data
    )


@router.delete("/estados/{id_estado}", response_model=Estado)
def eliminar_estado(
    id_estado: int,
    db: Session = Depends(get_db),
    usuario = Depends(require_roles("admin"))
):
    return estado.delete_estado(
        db,
        id_estado
    )


# ==========================================================
# UBICACIONES
# ==========================================================

@router.get("/ubicaciones", response_model=list[Ubicacion])
def get_ubicaciones(
    db: Session = Depends(get_db)
):
    return ubicacion.get_ubicaciones(db)


@router.post("/ubicaciones", response_model=Ubicacion)
def crear_ubicacion(
    data: UbicacionCreate,
    db: Session = Depends(get_db),
    usuario = Depends(require_roles("admin"))
):
    return ubicacion.create_ubicacion(db, data)


@router.put("/ubicaciones/{id_ubicacion}", response_model=Ubicacion)
def modificar_ubicacion(
    id_ubicacion: int,
    data: UbicacionUpdate,
    db: Session = Depends(get_db),
    usuario = Depends(require_roles("admin"))
):
    return ubicacion.update_ubicacion(
        db,
        id_ubicacion,
        data
    )


@router.delete("/ubicaciones/{id_ubicacion}", response_model=Ubicacion)
def eliminar_ubicacion(
    id_ubicacion: int,
    db: Session = Depends(get_db),
    usuario = Depends(require_roles("admin"))
):
    return ubicacion.delete_ubicacion(
        db,
        id_ubicacion
    )


# ==========================================================
# TIPO PROPIEDAD
# ==========================================================

@router.get("/tipos-propiedad", response_model=list[TipoPropiedad])
def get_tipos_propiedad(
    db: Session = Depends(get_db)
):
    return tipoPropiedad.get_tipos_propiedad(db)


@router.post("/tipos-propiedad", response_model=TipoPropiedad)
def crear_tipo_propiedad(
    data: TipoPropiedadCreate,
    db: Session = Depends(get_db),
    usuario = Depends(require_roles("admin"))
):
    return tipoPropiedad.create_tipo_propiedad(db, data)


@router.put("/tipos-propiedad/{id_tipo_propiedad}", response_model=TipoPropiedad)
def modificar_tipo_propiedad(
    id_tipo_propiedad: int,
    data: TipoPropiedadUpdate,
    db: Session = Depends(get_db),
    usuario = Depends(require_roles("admin"))
):
    return tipoPropiedad.update_tipo_propiedad(
        db,
        id_tipo_propiedad,
        data
    )


@router.delete("/tipos-propiedad/{id_tipo_propiedad}", response_model=TipoPropiedad)
def eliminar_tipo_propiedad(
    id_tipo_propiedad: int,
    db: Session = Depends(get_db),
    usuario = Depends(require_roles("admin"))
):
    return tipoPropiedad.delete_tipo_propiedad(
        db,
        id_tipo_propiedad
    )


# ==========================================================
# TIPO MEDIA
# ==========================================================

@router.get("/tipos-media", response_model=list[TipoMedia])
def get_tipos_media(
    db: Session = Depends(get_db)
):
    return tipoMedia.get_tipos_media(db)


@router.post("/tipos-media", response_model=TipoMedia)
def crear_tipo_media(
    data: TipoMediaCreate,
    db: Session = Depends(get_db),
    usuario = Depends(require_roles("admin"))
):
    return tipoMedia.create_tipo_media(db, data)


@router.put("/tipos-media/{id_tipo_media}", response_model=TipoMedia)
def modificar_tipo_media(
    id_tipo_media: int,
    data: TipoMediaUpdate,
    db: Session = Depends(get_db),
    usuario = Depends(require_roles("admin"))
):
    return tipoMedia.update_tipo_media(
        db,
        id_tipo_media,
        data
    )


@router.delete("/tipos-media/{id_tipo_media}", response_model=TipoMedia)
def eliminar_tipo_media(
    id_tipo_media: int,
    db: Session = Depends(get_db),
    usuario = Depends(require_roles("admin"))
):
    return tipoMedia.delete_tipo_media(
        db,
        id_tipo_media
    )