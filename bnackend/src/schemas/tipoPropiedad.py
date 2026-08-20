from pydantic import BaseModel, ConfigDict


class TipoPropiedadBase(BaseModel):
    nombre: str


class TipoPropiedadCreate(TipoPropiedadBase):
    pass


class TipoPropiedadUpdate(BaseModel):
    nombre: str | None = None


class TipoPropiedad( TipoPropiedadBase ):
    id_tipo_propiedad: int

    model_config = ConfigDict(from_attributes=True)