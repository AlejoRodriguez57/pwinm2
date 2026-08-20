from sqlalchemy.orm import Session

from src.models.empleado import Empleado
from src.schemas.empleado import EmpleadoCreate



def get_empleados(db: Session):

    return db.query(Empleado).all()



def get_empleado(
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



def create_empleado(
    db: Session,
    empleado: EmpleadoCreate
):

    nuevo_empleado = Empleado(
        **empleado.model_dump()
    )

    db.add(nuevo_empleado)
    db.commit()
    db.refresh(nuevo_empleado)

    return nuevo_empleado



def update_empleado(
    db: Session,
    empleado_db,
    datos
):

    for campo, valor in datos.items():
        setattr(
            empleado_db,
            campo,
            valor
        )

    db.commit()
    db.refresh(empleado_db)

    return empleado_db



def delete_empleado(
    db: Session,
    empleado_db
):

    db.delete(empleado_db)
    db.commit()

    return empleado_db