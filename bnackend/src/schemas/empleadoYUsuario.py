from pydantic import BaseModel

from src.schemas.usuario import (
    UsuarioCreate,
    UsuarioUpdate,
    UsuarioResponse
)

from src.schemas.empleado import (
    EmpleadoResponse
)


# ==================================
# Datos del empleado para creación
# ==================================

class EmpleadoYUsuarioDatosCreate(BaseModel):
    whatsappLink: str | None = None
    img: str | None = None
    activo: bool = True


# ==================================
# Crear empleado + usuario
# ==================================

class EmpleadoYUsuarioCreate(BaseModel):
    usuario: UsuarioCreate
    empleado: EmpleadoYUsuarioDatosCreate


# ==================================
# Datos del empleado para actualización
# TODO OPCIONAL
# ==================================

class EmpleadoYUsuarioDatosUpdate(BaseModel):
    whatsappLink: str | None = None
    img: str | None = None
    activo: bool | None = None


# ==================================
# Actualizar empleado + usuario
# TODO OPCIONAL
# ==================================

class EmpleadoYUsuarioUpdate(BaseModel):
    usuario: UsuarioUpdate | None = None
    empleado: EmpleadoYUsuarioDatosUpdate | None = None


# ==================================
# Respuesta
# ==================================

class EmpleadoYUsuarioResponse(BaseModel):
    empleado: EmpleadoResponse
    usuario: UsuarioResponse