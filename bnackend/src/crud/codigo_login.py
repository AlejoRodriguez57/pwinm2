from datetime import datetime, timezone

from sqlalchemy.orm import Session

from src.models.codigo_login import CodigoLogin


# ===================================================
# OBTENER POR ID
# ===================================================

def get_codigo_login(
    db: Session,
    id_codigo: int
):

    return (
        db.query(CodigoLogin)
        .filter(
            CodigoLogin.id_codigo == id_codigo
        )
        .first()
    )


# ===================================================
# OBTENER CÓDIGO ACTIVO DEL USUARIO
# ===================================================

def get_codigo_activo(
    db: Session,
    id_usuario: int
):

    return (
        db.query(CodigoLogin)
        .filter(
            CodigoLogin.id_usuario == id_usuario,
            CodigoLogin.usado == False,
            CodigoLogin.expira_en > datetime.now(timezone.utc)
        )
        .order_by(
            CodigoLogin.creado_en.desc()
        )
        .first()
    )


# ===================================================
# CREAR
# ===================================================

def create_codigo_login(
    db: Session,
    id_usuario: int,
    codigo_hash: str,
    expira_en: datetime
):

    codigo = CodigoLogin(
        id_usuario=id_usuario,
        codigo_hash=codigo_hash,
        expira_en=expira_en,
        intentos=0,
        usado=False
    )

    db.add(codigo)
    db.commit()
    db.refresh(codigo)

    return codigo


# ===================================================
# INCREMENTAR INTENTOS
# ===================================================

def incrementar_intentos(
    db: Session,
    codigo: CodigoLogin
):

    codigo.intentos += 1

    db.commit()
    db.refresh(codigo)

    return codigo


# ===================================================
# MARCAR COMO USADO
# ===================================================

def marcar_como_usado(
    db: Session,
    codigo: CodigoLogin
):

    codigo.usado = True

    db.commit()
    db.refresh(codigo)

    return codigo


# ===================================================
# ELIMINAR
# ===================================================

def delete_codigo_login(
    db: Session,
    codigo: CodigoLogin
):

    db.delete(codigo)
    db.commit()

    return codigo