from sqlalchemy.orm import Session

from src.models.rol import Rol


def get_roles(db: Session):
    return (
        db.query(Rol)
        .order_by(Rol.id_rol)
        .all()
    )