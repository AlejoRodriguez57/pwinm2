from datetime import datetime, timedelta, timezone

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from src.crud.usuario import get_usuario_by_email
from src.crud.codigo_login import (
    create_codigo_login,
    get_codigo_activo,
    incrementar_intentos,
    marcar_como_usado
)

from src.core.config import settings
from src.core.security import (
    verify_password,
    generate_otp,
    hash_otp,
    verify_otp
)

from src.services.auth.email import send_login_code
from src.services.auth.token import (
    create_access_token,
    create_refresh_token
)


# ===================================================
# LOGIN
# ===================================================

def login(
    db: Session,
    email: str,
    password: str
):

    usuario = get_usuario_by_email(
        db,
        email
    )

    # No diferenciamos entre usuario inexistente
    # y contraseña incorrecta.
    if usuario is None:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas"
        )

    if not verify_password(
        password,
        usuario.password_hash
    ):

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas"
        )

    # -----------------------------------------------
    # Generar código OTP
    # -----------------------------------------------

    codigo = generate_otp()

    codigo_hash = hash_otp(codigo)

    expira_en = (
        datetime.now(timezone.utc)
        + timedelta(
            minutes=settings.OTP_EXPIRE_MINUTES
        )
    )

    # -----------------------------------------------
    # Guardar código
    # -----------------------------------------------

    create_codigo_login(
        db=db,
        id_usuario=usuario.id_usuario,
        codigo_hash=codigo_hash,
        expira_en=expira_en
    )

    # -----------------------------------------------
    # Enviar email
    # -----------------------------------------------

    send_login_code(
        usuario.email,
        codigo
    )

    # -----------------------------------------------
    # No devolvemos JWT todavía
    # -----------------------------------------------

    return {
        "message": "Código de verificación enviado",
        "email": usuario.email
    }


# ===================================================
# VERIFICAR LOGIN
# ===================================================

def verify_login(
    db: Session,
    email: str,
    codigo: str
):

    usuario = get_usuario_by_email(
        db,
        email
    )

    if usuario is None:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Código inválido"
        )

    codigo_db = get_codigo_activo(
        db,
        usuario.id_usuario
    )

    if codigo_db is None:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Código inválido o expirado"
        )

    # -----------------------------------------------
    # Límite de intentos
    # -----------------------------------------------

    if codigo_db.intentos >= settings.OTP_MAX_ATTEMPTS:

        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Demasiados intentos"
        )

    # -----------------------------------------------
    # Verificar código
    # -----------------------------------------------

    if not verify_otp(
        codigo,
        codigo_db.codigo_hash
    ):

        incrementar_intentos(
            db,
            codigo_db
        )

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Código incorrecto"
        )

    # -----------------------------------------------
    # Marcar código como utilizado
    # -----------------------------------------------

    marcar_como_usado(
        db,
        codigo_db
    )

    # -----------------------------------------------
    # Crear tokens
    # -----------------------------------------------

    access_token = create_access_token(
        {
            "sub": str(usuario.id_usuario),
            "rol": usuario.rol.nombre
        }
    )

    refresh_token = create_refresh_token(
        {
            "sub": str(usuario.id_usuario)
        }
    )

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }


# ===================================================
# USUARIO ACTUAL
# ===================================================

def get_me(usuario):

    return {
        "id_usuario": usuario.id_usuario,
        "nombre": usuario.nombre,
        "email": usuario.email,
        "rol": usuario.rol.nombre
    }