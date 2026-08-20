from sqlalchemy.orm import Session

from src.models.usuario import Usuario
from src.schemas.usuario import UsuarioCreate
from src.core.security import hash_password

from pydantic import EmailStr

def get_usuario(
    db: Session,
    id_usuario: int
):
    return (
        db.query(Usuario)
        .filter(Usuario.id_usuario == id_usuario)
        .first()
    )


def get_usuario_by_email(
    db: Session,
    email: EmailStr
):
    return (
        db.query(Usuario)
        .filter(Usuario.email == email)
        .first()
    )


def get_usuarios(
    db: Session,
    skip: int = 0,
    limit: int = 100
):
    return (
        db.query(Usuario)
        .offset(skip)
        .limit(limit)
        .all()
    )


def create_usuario(
    db: Session,
    usuario: UsuarioCreate
):
    password_hash = hash_password(
        usuario.password
    )

    db_usuario = Usuario(
        nombre=usuario.nombre,
        email=usuario.email,
        telefono=usuario.telefono,
        #whatsappLink=usuario.whatsappLink,
        password_hash=password_hash,
        id_rol=usuario.id_rol,
        #img=usuario.img
    )

    db.add(db_usuario)
    db.commit()
    db.refresh(db_usuario)

    return db_usuario


def update_usuario(
    db: Session,
    usuario: Usuario,
    datos: dict
):
    if "password" in datos:
        datos["password_hash"] = hash_password(
            datos.pop("password")
        )

    for campo, valor in datos.items():
        setattr(usuario, campo, valor)

    db.commit()
    db.refresh(usuario)

    return usuario


def delete_usuario(
    db: Session,
    usuario: Usuario
):
    db.delete(usuario)
    db.commit()

    return usuario