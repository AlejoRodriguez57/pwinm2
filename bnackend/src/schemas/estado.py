from pydantic import BaseModel, ConfigDict

class EstadoBase(BaseModel):
    nombre: str


class EstadoCreate(EstadoBase):
    pass


class EstadoUpdate(BaseModel):
    nombre: str | None = None


class Estado(EstadoBase):
    id_estado: int

    model_config = ConfigDict(from_attributes=True)