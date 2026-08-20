import Header from "@/componentes/pp/Header";
import ArticuloPropiedad from "@/componentes/propiedades/ArticuloPropiedad";

import { obtenerPropiedades } from "@/adapters/propiedades";
import { obtenerMedia } from "@/adapters/media";
import {
  obtenerOperaciones,
  obtenerEstados,
  obtenerUbicaciones,
  obtenerTiposPropiedad
} from "@/adapters/catalogos";

import { mapPropiedades } from "@/mappers/propiedadMapper";


export default async function Home({ params }) {

  const { id } = await params;


  const propiedadesBackend = await obtenerPropiedades();
  const media = await obtenerMedia();

  const operaciones = await obtenerOperaciones();
  const estados = await obtenerEstados();
  const ubicaciones = await obtenerUbicaciones();
  const tipos = await obtenerTiposPropiedad();


  const propiedades = mapPropiedades(
    propiedadesBackend,
    operaciones,
    estados,
    tipos,
    ubicaciones,
    media
  );

  const propiedad = propiedades.find(
    p => p.id === Number(id)
  );


  if (!propiedad) {
    return <h1>No existe la propiedad</h1>;
  }


  return (
    <>
      <Header />
      <ArticuloPropiedad propiedad={propiedad} />
    </>
  );
}