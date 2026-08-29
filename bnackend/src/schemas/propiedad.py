from decimal import Decimal
from typing import Optional

from pydantic import BaseModel, ConfigDict

from src.schemas.media import Media

# -------------------------
# Base
# -------------------------

class PropiedadBase(BaseModel):
    id_operacion: int
    id_estado: int
    id_tipo_propiedad: int
    id_ubicacion: int
    id_empleado: Optional[int] = None

    titulo: Optional[str] = None
    precio: Optional[Decimal] = None
    descripcion: Optional[str] = None

    expensas: Optional[Decimal] = None
    metros_cuadrados: Optional[Decimal] = None

    ambientes: Optional[int] = None
    dormitorios: Optional[int] = None
    banios: Optional[int] = None
    antiguedad: Optional[int] = None
    cocheras: Optional[int] = None


# -------------------------
# Crear
# -------------------------

class PropiedadCreate(PropiedadBase):
    pass


# -------------------------
# Actualizar
# -------------------------

class PropiedadUpdate(BaseModel):
    id_operacion: Optional[int] = None
    id_estado: Optional[int] = None
    id_tipo_propiedad: Optional[int] = None
    id_ubicacion: Optional[int] = None
    id_empleado: Optional[int] = None

    titulo: Optional[str] = None
    precio: Optional[Decimal] = None
    descripcion: Optional[str] = None

    expensas: Optional[Decimal] = None
    metros_cuadrados: Optional[Decimal] = None

    ambientes: Optional[int] = None
    dormitorios: Optional[int] = None
    banios: Optional[int] = None
    antiguedad: Optional[int] = None
    cocheras: Optional[int] = None


# -------------------------
# Respuesta
# -------------------------

class Propiedad(PropiedadBase):
    id_prop: int

    model_config = ConfigDict(from_attributes=True)

# Respuesta con media # ------------------------- 

class PropiedadConMedia(Propiedad): 
    media: list[Media] = []