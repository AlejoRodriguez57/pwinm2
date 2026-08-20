import secrets
from datetime import datetime, timedelta, timezone

import jwt
from pwdlib import PasswordHash

from src.core.config import settings


password_hash = PasswordHash.recommended()


# ===================================================
# PASSWORDS
# ===================================================

def hash_password(password: str) -> str:
    return password_hash.hash(password)


def verify_password(
    plain_password: str,
    hashed_password: str
) -> bool:

    return password_hash.verify(
        plain_password,
        hashed_password
    )


# ===================================================
# OTP
# ===================================================

def generate_otp() -> str:
    """
    Devuelve un código de 6 dígitos.
    """

    return f"{secrets.randbelow(1_000_000):06}"


def hash_otp(codigo: str) -> str:
    return password_hash.hash(codigo)


def verify_otp(
    codigo: str,
    codigo_hash: str
) -> bool:

    return password_hash.verify(
        codigo,
        codigo_hash
    )


# ===================================================
# JWT
# ===================================================

def create_access_token(data: dict) -> str:

    to_encode = data.copy()

    expire = datetime.now(
        timezone.utc
    ) + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({
        "exp": expire
    })

    return jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )


def decode_token(token: str) -> dict | None:

    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )

        return payload

    except jwt.InvalidTokenError:
        return None