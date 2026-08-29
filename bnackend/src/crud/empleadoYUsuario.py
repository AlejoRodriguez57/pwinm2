from sqlalchemy.orm import Session

from src.models.empleado import Empleado
from src.models.usuario import Usuario

from src.core.security import hash_password


# ==================================
# Obtener empleados + usuarios
# ==================================

def get_empleadosYUsuarios(db: Session):
    return (
        db.query(Empleado)
        .all()
    )


# ==================================
# Obtener un empleado + usuario
# ==================================

def get_empleadoYUsuario(
    db: Session,
    id_empleado: int
):
    return (
        db.query(Empleado)
        .filter(
            Empleado.id_empleado == id_empleado
        )
        .first()
    )


# ==================================
# Crear empleado + usuario
# ==================================

def create_empleadoYUsuario(
    db: Session,
    usuario_data,
    empleado_data
):

    usuario = Usuario(
        nombre=usuario_data.nombre,
        email=usuario_data.email,
        telefono=usuario_data.telefono,
        password_hash=hash_password(
            usuario_data.password
        ),
        id_rol=usuario_data.id_rol
    )

    db.add(usuario)
    db.flush()

    empleado = Empleado(
        id_usuario=usuario.id_usuario,
        whatsappLink=empleado_data.whatsappLink,
        img=empleado_data.img,
        activo=empleado_data.activo
    )

    db.add(empleado)

    db.commit()

    db.refresh(usuario)
    db.refresh(empleado)

    return empleado, usuario


# ==================================
# Actualizar empleado + usuario
# ==================================

def update_empleadoYUsuario(
    db: Session,
    empleado,
    usuario,
    empleado_data,
    usuario_data
):

    # ------------------------------
    # Actualizar empleado
    # ------------------------------

    for campo, valor in empleado_data.items():

        if valor is not None:

            setattr(
                empleado,
                campo,
                valor
            )


    # ------------------------------
    # Actualizar usuario
    # ------------------------------

    if "password" in usuario_data:

        password = usuario_data.pop("password")

        if password:

            usuario.password_hash = hash_password(
                password
            )


    for campo, valor in usuario_data.items():

        if valor is not None:

            setattr(
                usuario,
                campo,
                valor
            )


    db.commit()

    db.refresh(empleado)
    db.refresh(usuario)

    return empleado, usuario


# ==================================
# Eliminar empleado + usuario
# ==================================

def delete_empleadoYUsuario(
    db: Session,
    empleado,
    usuario
):

    db.delete(empleado)

    db.flush()

    db.delete(usuario)

    db.commit()

    return empleado, usuario