from pydantic import BaseModel, ConfigDict


class OperacionBase(BaseModel):
    nombre: str


class OperacionCreate(OperacionBase):
    pass


class OperacionUpdate(BaseModel):
    nombre: str | None = None


class Operacion(OperacionBase):
    id_operacion: int

    model_config = ConfigDict(from_attributes=True)