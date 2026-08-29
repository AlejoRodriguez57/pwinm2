import Header from "@/componentes/pp/Header";
import ArticuloPropiedad from "@/componentes/propiedades/ArticuloPropiedad";

import { obtenerPropiedadPorIdConMedia } from "@/adapters/propiedades";
import {
  obtenerOperaciones,
  obtenerEstados,
  obtenerUbicaciones,
  obtenerTiposPropiedad,
  obtenerTiposMedia
} from "@/adapters/catalogos";

import { mapPropiedades } from "@/mappers/propiedadMapper";


export default async function Home({ params }) {

  const { id } = await params;


  const propiedadBackend = await obtenerPropiedadPorIdConMedia(id);

  const operaciones = await obtenerOperaciones();
  const estados = await obtenerEstados();
  const ubicaciones = await obtenerUbicaciones();
  const tipos = await obtenerTiposPropiedad();
  const tiposMedia = await obtenerTiposMedia();


  const propiedades = mapPropiedades(
    [propiedadBackend],
    operaciones,
    estados,
    tipos,
    ubicaciones,
    tiposMedia
  );


  const propiedad = propiedades[0];


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