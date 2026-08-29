from pydantic import BaseModel, ConfigDict


class MediaBase(BaseModel):
    id_prop: int
    link: str
    id_tipo_media: int


class MediaCreate(MediaBase):
    pass


class MediaUpdate(BaseModel):
    id_prop: int | None = None
    link: str | None = None
    id_tipo_media: int | None = None


class Media(MediaBase):
    id_media: int

    model_config = ConfigDict(from_attributes=True)