from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from src.api.deps import (
    get_db,
    get_current_user
)

from src.schemas.login import LoginRequest
from src.schemas.verify import VerifyRequest
from src.schemas.token import Token

from src.services.auth import auth as auth_service


router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


# ===================================================
# LOGIN
# ===================================================

@router.post("/login")
def login(
    datos: LoginRequest,
    db: Session = Depends(get_db)
):

    return auth_service.login(
        db,
        datos.email,
        datos.password
    )


# ===================================================
# VERIFICAR CÓDIGO
# ===================================================

@router.post(
    "/verify",
    response_model=Token
)
def verify_login(
    datos: VerifyRequest,
    db: Session = Depends(get_db)
):

    return auth_service.verify_login(
        db,
        datos.email,
        datos.codigo
    )


# ===================================================
# USUARIO ACTUAL
# ===================================================

@router.get("/me")
def get_me(
    usuario=Depends(get_current_user)
):

    return auth_service.get_me(
        usuario
    )