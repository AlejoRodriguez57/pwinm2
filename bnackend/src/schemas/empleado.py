from pydantic import BaseModel

class UsuarioSimple(BaseModel):
    nombre: str
    email: str
    telefono: str

class EmpleadoBase(BaseModel):
    whatsappLink: str | None = None
    img: str | None = None
    activo: bool = True
    id_usuario: int

class EmpleadoCreate(EmpleadoBase):
    pass

class EmpleadoUpdate(BaseModel):
    whatsappLink: str | None = None
    img: str | None = None
    activo: bool | None = None
    id_usuario: int | None = None

class EmpleadoResponse(EmpleadoBase):
    id_empleado: int
    id_usuario: int

    class Config:
        from_attributes = True

class ArticuloPropiedadAsesor(EmpleadoBase):
    id_empleado: int
    whatsappLink: str | None = None
    img: str | None = None
    usuario: UsuarioSimple | None = None

    class Config:
        from_attributes = True