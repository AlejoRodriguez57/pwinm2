from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from src.crud.usuario import (
    get_usuario_by_email,
    get_usuario
)

from src.crud.codigo_login import (
    post_codigo_login,
    get_codigo_login,
    get_codigo_activo,
    marcar_como_usado
)

from src.core.security import (
    verify_password,
    generate_otp,
    hash_otp,
    verify_otp
)

from src.services.auth.email import send_login_code

from src.services.auth.token import (
    create_access_token,
    create_refresh_token,
    decode_token
)

from src.core.config import settings

from datetime import datetime, timedelta, timezone


# ===========================================================
# LOGIN
# ===========================================================

def login(
    db: Session,
    email: str,
    password: str
):

    usuario = get_usuario_by_email(
        db,
        email
    )

    # No revelar si el email existe
    if not usuario:

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

    # Generar código
    codigo = generate_otp()

    codigo_hash = hash_otp(codigo)

    expira_en = (
        datetime.now(timezone.utc)
        + timedelta(minutes=settings.OTP_EXPIRE_MINUTES)
    )

    post_codigo_login(
        db,
        usuario.id_usuario,
        codigo_hash,
        expira_en
    )

    send_login_code(
        usuario.email,
        codigo
    )

    return {
        "message": "Código enviado al correo"
    }


# ===========================================================
# VERIFICAR LOGIN
# ===========================================================

def verify_login(
    db: Session,
    email: str,
    codigo: str
):

    usuario = get_usuario_by_email(
        db,
        email
    )

    if not usuario:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Código inválido"
        )

    codigo_db = get_codigo_activo(
        db,
        usuario.id_usuario
    )

    if not codigo_db:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Código inválido"
        )

    # Comprobar expiración
    ahora = datetime.now(timezone.utc)

    if codigo_db.expira_en < ahora:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Código expirado"
        )

        # Comprobar expiración
        ahora = datetime.now(timezone.utc)

        print("AHORA:", ahora, "EXPIRA_EN:", codigo_db.expira_en, "DIFERENCIA:", codigo_db.expira_en - ahora)

        if codigo_db.expira_en < ahora:

            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Código expirado"
            )

        # Comprobar intentos
        if codigo_db.intentos >= settings.OTP_MAX_ATTEMPTS:

            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Demasiados intentos"
            )

    # Verificar código
    if not verify_otp(
        codigo,
        codigo_db.codigo_hash
    ):

        codigo_db.intentos += 1

        db.commit()

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Código inválido"
        )

    # Marcar código como utilizado
    marcar_como_usado(
        db,
        codigo_db
    )

    # Crear tokens
    access_token = create_access_token(
        usuario.id_usuario,
        usuario.rol.nombre
    )

    refresh_token = create_refresh_token(
        usuario.id_usuario
    )

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }


# ===========================================================
# REFRESH
# ===========================================================

def refresh_access_token(
    db: Session,
    refresh_token: str
):

    payload = decode_token(
        refresh_token
    )

    if payload is None:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token inválido"
        )

    # Asegurarnos de que sea realmente un refresh token
    if payload.get("type") != "refresh":

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido"
        )

    user_id = payload.get("sub")

    if user_id is None:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token inválido"
        )

    usuario = get_usuario(
        db,
        int(user_id)
    )

    if usuario is None:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuario inexistente"
        )

    # Crear nuevo access token
    access_token = create_access_token(
        usuario.id_usuario,
        usuario.rol.nombre
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }