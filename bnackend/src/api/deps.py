from typing import Generator

from src.db.session import SessionLocal

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from sqlalchemy.orm import Session

from src.crud.usuario import get_usuario

from src.services.auth.token import decode_token

from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

def get_db() -> Generator:
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


bearer_scheme = HTTPBearer()

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db)
):
    token = credentials.credentials

    payload = decode_token(token)

    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido"
        )

    user_id = payload.get("sub")

    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido"
        )

    usuario = get_usuario(db, int(user_id))

    if usuario is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuario inexistente"
        )

    return usuario

def require_roles(*roles):

    def checker(
        current_user = Depends(get_current_user)
    ):

        if current_user.rol.nombre not in roles:

            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="No tiene permisos"
            )

        return current_user

    return checker