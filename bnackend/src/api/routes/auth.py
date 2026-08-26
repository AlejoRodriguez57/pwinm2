from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Response,
    Cookie
)

from sqlalchemy.orm import Session

from src.api.deps import (
    get_db,
    get_current_user
)

from src.schemas.login import LoginRequest
from src.schemas.verify import VerifyRequest
from src.schemas.token import AccessToken

from src.services.auth import auth as auth_service


router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


# ===========================================================
# LOGIN
# ===========================================================

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


# ===========================================================
# VERIFICAR CÓDIGO
# ===========================================================

@router.post(
    "/verify",
    response_model=AccessToken
)
def verify_login(
    datos: VerifyRequest,
    response: Response,
    db: Session = Depends(get_db)
):

    tokens = auth_service.verify_login(
        db,
        datos.email,
        datos.codigo
    )

    response.set_cookie(
        key="refresh_token",
        value=tokens["refresh_token"],
        httponly=True,
        secure=False,       # True en producción con HTTPS
        samesite="lax",
        max_age=60 * 60 * 24 * 7,
        path="/auth"
    )

    return {
        "access_token": tokens["access_token"]
    }


# ===========================================================
# REFRESH TOKEN
# ===========================================================

@router.post(
    "/refresh",
    response_model=AccessToken
)
def refresh_token(
    refresh_token: str | None = Cookie(default=None),
    db: Session = Depends(get_db)
):

    if not refresh_token:
        raise HTTPException(
            status_code=401,
            detail="Refresh token no encontrado"
        )

    tokens = auth_service.refresh_access_token(
        db,
        refresh_token
    )

    return {
        "access_token": tokens["access_token"]
    }


# ===========================================================
# USUARIO ACTUAL
# ===========================================================

@router.get("/me")
def get_me(
    usuario=Depends(get_current_user)
):

    return {
        "id_usuario": usuario.id_usuario,
        "nombre": usuario.nombre,
        "email": usuario.email,
        "rol": usuario.rol.nombre
    }

# ===========================================================
# LOGOUT
# ===========================================================

@router.post("/logout")
def logout(response: Response):

    response.delete_cookie(
        key="refresh_token",
        path="/auth"
    )

    return {
        "mensaje": "Sesión cerrada correctamente"
    }