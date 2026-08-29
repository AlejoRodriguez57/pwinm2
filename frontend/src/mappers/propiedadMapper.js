export function mapPropiedades(
    propiedadesSinMapear,
    operaciones,
    estados,
    tiposProps,
    ubicaciones,
    tiposMedia,
) {
    const propiedades = propiedadesSinMapear.map(function(current) {

        return {
            id: current.id_prop,
            id_empleado: current.id_empleado,
            id_usuario: current.id_usuario,

            operacion: operaciones.find(op => op.id_operacion === current.id_operacion)?.nombre,
            estado: estados.find(est => est.id_estado === current.id_estado)?.nombre,
            tipoDePropiedad: tiposProps.find(tiprop => tiprop.id_tipo_propiedad === current.id_tipo_propiedad)?.nombre,
            ubicacion: ubicaciones.find(ubi => ubi.id_ubicacion === current.id_ubicacion)?.nombre,

            titulo: current.titulo,
            precio: current.precio,
            descripcion: current.descripcion,
            expensas: current.expensas,
            metrosCuadrados: current.metros_cuadrados,
            ambientes: current.ambientes,
            dormitorios: current.dormitorios,
            baños: current.banios,
            antiguedad: current.antiguedad,
            cocheras: current.cocheras,

            media: (current.media ?? []).map(item => ({
                ...item,
                tipo: tiposMedia.find(
                    tipo => tipo.id_tipo_media === item.id_tipo_media
                )?.nombre
            }))
        };
    });

    return propiedades;
}