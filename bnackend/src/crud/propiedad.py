from sqlalchemy.exc import SQLAlchemyError
from src.models.propiedad import Propiedad
from sqlalchemy.orm import selectinload
from sqlalchemy.orm import joinedload

# ===========================================================
# CONSULTAS
# ===========================================================

def get_propiedades(
    db: Session,
    skip: int = 0,
    limit: int = 100
):
    return (
        db.query(Propiedad)
        .offset(skip)
        .limit(limit)
        .all()
    )

def get_propiedad(db: Session, id_prop: int):
    """Devuelve una propiedad por ID."""
    return db.query(Propiedad).filter(Propiedad.id_prop == id_prop).first()

def get_propiedades_con_media(
    db: Session,
    skip: int = 0,
    limit: int = 100
):

    return (
        db.query(Propiedad)
        .options(
            selectinload(Propiedad.media)
        )
        .offset(skip)
        .limit(limit)
        .all()
    )

def get_propiedad_con_media(
    db: Session,
    id_prop: int
):

    return (
        db.query(Propiedad)
        .options(joinedload(Propiedad.media))
        .filter(Propiedad.id_prop == id_prop)
        .first()
    )

# ===========================================================
# CREAR
# ===========================================================

def create_propiedad(
    db: Session,
    propiedad: PropiedadCreate
):
    nueva = Propiedad(**propiedad.model_dump())

    try:
        db.add(nueva)
        db.commit()
        db.refresh(nueva)
        return nueva

    except SQLAlchemyError:
        db.rollback()
        raise


# ===========================================================
# ACTUALIZAR
# ===========================================================

def update_propiedad(
    db: Session,
    id_prop: int,
    datos: PropiedadUpdate
):
    propiedad = get_propiedad(db, id_prop)

    if propiedad is None:
        return None

    cambios = datos.model_dump(exclude_unset=True)

    for campo, valor in cambios.items():
        setattr(propiedad, campo, valor)

    try:
        db.commit()
        db.refresh(propiedad)
        return propiedad

    except SQLAlchemyError:
        db.rollback()
        raise


# ===========================================================
# ELIMINAR
# ===========================================================

def delete_propiedad(
    db: Session,
    id_prop: int
):
    propiedad = get_propiedad(db, id_prop)

    if propiedad is None:
        return None

    try:
        db.delete(propiedad)
        db.commit()
        return propiedad

    except SQLAlchemyError:
        db.rollback()
        raise

# ===========================================================
# BUSCAR
# ===========================================================
def buscar_propiedades(
    db: Session,

    id_operacion: Optional[int] = None,
    id_estado: Optional[int] = None,
    id_tipo_propiedad: Optional[int] = None,
    id_ubicacion: Optional[int] = None,
    id_empleado: Optional[int] = None,


    precio: Optional[float] = None,
    precio_min: Optional[float] = None,
    precio_max: Optional[float] = None,


    expensas: Optional[float] = None,
    expensas_min: Optional[float] = None,
    expensas_max: Optional[float] = None,


    metros_cuadrados: Optional[float] = None,
    metros_cuadrados_min: Optional[float] = None,
    metros_cuadrados_max: Optional[float] = None,


    ambientes: Optional[int] = None,
    ambientes_min: Optional[int] = None,
    ambientes_max: Optional[int] = None,


    dormitorios: Optional[int] = None,
    dormitorios_min: Optional[int] = None,
    dormitorios_max: Optional[int] = None,


    banios: Optional[int] = None,
    banios_min: Optional[int] = None,
    banios_max: Optional[int] = None,


    antiguedad: Optional[int] = None,
    antiguedad_min: Optional[int] = None,
    antiguedad_max: Optional[int] = None,


    cocheras: Optional[int] = None,
    cocheras_min: Optional[int] = None,
    cocheras_max: Optional[int] = None,


    skip: int = 0,
    limit: int = 100
):

    consulta = db.query(Propiedad)


    filtros = [
        ("id_operacion", id_operacion),
        ("id_estado", id_estado),
        ("id_tipo_propiedad", id_tipo_propiedad),
        ("id_ubicacion", id_ubicacion),
        ("id_empleado", id_empleado),
    ]

    for campo, valor in filtros:
        if valor is not None:
            consulta = consulta.filter(
                getattr(Propiedad, campo) == valor
            )


    rangos = [

        ("precio", precio, precio_min, precio_max),

        ("expensas", expensas, expensas_min, expensas_max),

        (
            "metros_cuadrados",
            metros_cuadrados,
            metros_cuadrados_min,
            metros_cuadrados_max
        ),

        ("ambientes", ambientes, ambientes_min, ambientes_max),

        (
            "dormitorios",
            dormitorios,
            dormitorios_min,
            dormitorios_max
        ),

        ("banios", banios, banios_min, banios_max),

        (
            "antiguedad",
            antiguedad,
            antiguedad_min,
            antiguedad_max
        ),

        (
            "cocheras",
            cocheras,
            cocheras_min,
            cocheras_max
        )
    ]


    for campo, exacto, minimo, maximo in rangos:

        columna = getattr(
            Propiedad,
            campo
        )

        if exacto is not None:
            consulta = consulta.filter(
                columna == exacto
            )

        if minimo is not None:
            consulta = consulta.filter(
                columna >= minimo
            )

        if maximo is not None:
            consulta = consulta.filter(
                columna <= maximo
            )


    return (
        consulta
        .offset(skip)
        .limit(limit)
        .all()
    )