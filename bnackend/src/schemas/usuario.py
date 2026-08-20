from pydantic import BaseModel, EmailStr
from typing import Optional

class UsuarioBase(BaseModel):
    nombre: str
    email: EmailStr
    telefono: Optional[str] = None


class UsuarioCreate(UsuarioBase):
    password: str
    id_rol: int


class UsuarioUpdate(BaseModel):
    nombre: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    id_rol: Optional[int] = None
    telefono: Optional[str] = None

class UsuarioResponse(UsuarioBase):
    id_usuario: int
    #activo: bool
    id_rol: int

    class Config:
        from_attributes = True