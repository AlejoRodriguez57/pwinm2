from pydantic import BaseModel, EmailStr, Field


class VerifyRequest(BaseModel):

    email: EmailStr

    codigo: str = Field(
        min_length=6,
        max_length=6,
        pattern=r"^\d{6}$"
    )