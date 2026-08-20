export default function filtrarPropiedades({
  propiedades,

  operacion,
  tipoDePropiedad,
  ubicacion,

  ambientes,
  dormitorios,
  cocheras,
  baños,

  precioMin,
  precioMax,

  metrosCuadradosMin,
  metrosCuadradosMax,

  antiguedadMin,
  antiguedadMax,
}) {

  return propiedades.filter((p) => {
 // unica
    const cumpleVenta =
      !operacion ||
      p.operacion === operacion;

    const cumpleTipo =
      !tipoDePropiedad ||
      p.tipoDePropiedad === tipoDePropiedad;

    const cumpleUbicacion =
      !ubicacion ||
      p.ubicacion === ubicacion;

// multiple
  const cumpleAmbientes =
    ambientes.length === 0 ||
    ambientes.includes(p.ambientes) ||
    (ambientes.includes("5+") && p.ambientes >= 5);

  const cumpleDormitorios =
    dormitorios.length === 0 ||
    dormitorios.includes(p.dormitorios) ||
    (dormitorios.includes("5+") && p.dormitorios >= 5);

  const cumpleCocheras =
    cocheras.length === 0 ||
    cocheras.includes(p.cocheras) ||
    (cocheras.includes("5+") && p.cocheras >= 5);

  const cumpleBaños =
    baños.length === 0 ||
    baños.includes(p.baños) ||
    (baños.includes("5+") && p.baños >= 5)
 // rango
    const cumplePrecio =
      (!precioMin || p.precio >= Number(precioMin)) &&
      (!precioMax || p.precio <= Number(precioMax));

    const cumpleMetrosCuadrados =
      (!metrosCuadradosMin || p.metrosCuadrados >= Number(metrosCuadradosMin)) &&
      (!metrosCuadradosMax || p.metrosCuadrados <= Number(metrosCuadradosMax));

    const cumpleAntiguedad =
      (!antiguedadMin || p.antiguedad >= Number(antiguedadMin)) &&
      (!antiguedadMax || p.antiguedad <= Number(antiguedadMax));

    return (
      cumpleVenta &&
      cumpleTipo &&
      cumpleUbicacion &&
      cumpleAmbientes &&
      cumpleDormitorios &&
      cumpleCocheras &&
      cumpleBaños &&
      cumplePrecio &&
      cumpleMetrosCuadrados &&
      cumpleAntiguedad
    );
  });
}