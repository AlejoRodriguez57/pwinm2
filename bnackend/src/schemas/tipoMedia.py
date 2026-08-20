from pydantic import BaseModel, ConfigDict


class TipoMediaBase(BaseModel):
    nombre: str


class TipoMediaCreate(TipoMediaBase):
    pass


class TipoMediaUpdate(BaseModel):
    nombre: str | None = None


class TipoMedia(TipoMediaBase):
    id_tipo_media: int

    model_config = ConfigDict(from_attributes=True)