from pydantic import BaseModel, ConfigDict


class UbicacionBase(BaseModel):
    nombre: str


class UbicacionCreate(UbicacionBase):
    pass


class UbicacionUpdate(BaseModel):
    nombre: str | None = None


class Ubicacion(UbicacionBase):
    id_ubicacion: int

    model_config = ConfigDict(from_attributes=True)