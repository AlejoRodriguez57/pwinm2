"use client";

import { useState, useEffect } from 'react';
import FiltroPorSeleccionUnica from '../buscador/filtrado/FiltroPorSeleccionUnica.jsx';
import FiltroPorRango from '../buscador/filtrado/FiltradoPorRango.jsx';
import filtrarPropiedades from '../buscador/filtrado/FiltroValores.jsx';
import GridPropiedades from './GridPropiedades.jsx';
import FiltroPorSeleccionMultiple from '../buscador/filtrado/FiltroPorSleccionMultiple.jsx';

import { obtenerPropiedadesConMedia } from "@/adapters/propiedades";
import { obtenerMedia } from "@/adapters/media";
import { obtenerOperaciones, obtenerEstados, obtenerUbicaciones, obtenerTiposPropiedad, obtenerTiposMedia } from "@/adapters/catalogos.js";

import { mapPropiedades } from "@/mappers/propiedadMapper";
import { mapOperaciones, mapTiposPropiedad, mapUbicaciones} from"@/mappers/catalogoMapper.js";


export default function Main() {
  const [propiedades, setPropiedades] = useState([]);

  useEffect(()=>{
    async function cargarPropiedades(){
      try {
            const propiedadesBackend = await obtenerPropiedadesConMedia();
            const operaciones = await obtenerOperaciones();
            const estados = await obtenerEstados();
            const tiposProps = await obtenerTiposPropiedad();
            const ubicaciones = await obtenerUbicaciones();
            const tiposMedia= await obtenerTiposMedia();

            console.log("PROPIEDADES BACKEND:", propiedadesBackend);

            const propiedades =
                mapPropiedades(
                    propiedadesBackend,
                    operaciones,
                    estados,
                    tiposProps,
                    ubicaciones,
                    tiposMedia,
                );

            console.log("PROPIEDADES MAPEADAS:", propiedades);


            setPropiedades(
                propiedades
            );

            
        } catch(error){

            console.error(
                "Error cargando propiedades:",
                error
            );

        }


    }

    cargarPropiedades();

},[]);

  const [operaciones, setOperaciones] = useState([]);
  const [tiposPropiedad, setTiposPropiedad] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);

  useEffect(()=>{
    async function cargarCatalogo(){
      try {
          const operacionesSinMapear = await obtenerOperaciones()
          const tipoDePropiedadSinMapear = await obtenerTiposPropiedad()
          const ubicacionesSinMapear = await obtenerUbicaciones()

          const operaciones = mapOperaciones(operacionesSinMapear)
          const tiposPropiedad = mapTiposPropiedad(tipoDePropiedadSinMapear)
          const ubicaciones = mapUbicaciones(ubicacionesSinMapear)

          setOperaciones(operaciones);
          setTiposPropiedad(tiposPropiedad);
          setUbicaciones(ubicaciones);

        } catch(error){

            console.error(
                "Error cargando propiedades:",
                error
            );
        }
    }
  
    cargarCatalogo()

  },[]);

  const [filtrosAMostrar, setFiltrosAMostrar] = useState(false); // guarda la variable de si se desean mostrar mas filtros o no
  
// use state de la pagina sirven para guardar los valores de un filtro
  const [operacion, setOperacion] = useState('');
  const [tipoDePropiedad, setTipoDePropiedad] = useState('');
  const [ubicacion, setUbicacion] = useState('');

  const [ambientes, setAmbientes] = useState([]);
  const [dormitorios, setDormitorios] = useState([]);
  const [cocheras, setCocheras] = useState([]);
  const [baños, setBaños] = useState([]);

  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');

  const [metrosCuadradosMin, setMetrosCuadradosMin] = useState('');
  const [metrosCuadradosMax, setMetrosCuadradosMax] = useState('');

  const [antiguedadMin, setAntiguedadMin] = useState('');
  const [antiguedadMax, setAntiguedadMax] = useState('');

// agarra los valores de esos filtros y se los pasa a propiedadesFiltrdadas
  const propiedadesFiltradas = filtrarPropiedades({
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
  });

return (
  <section className="w-full px-4 py-10 bg-[#ECEFE6]">
    <div className="mb-10 text-center">
      <h1 className="text-5xl font-black text-[#7A9F79]">
        Encontrá el hogar de tus sueños
      </h1>
      <p className="text-[#7B7B7B] mt-3 text-lg">
        Explorá propiedades según tus necesidades.
      </p>
    </div>

    <div className="relative bg-white border border-[#D9DED3] rounded-3xl shadow-lg p-6 mb-12 w-full">
    {propiedadesFiltradas.length > 0 ? 
        <p className="text-center text-[#7B7B7B] p-5">
        Se encontraron {propiedadesFiltradas.length} propiedades
        </p> : <p className="text-center text-[#7B7B7B] text-xs">No se encontraron <br /> propiedades</p>
        }
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center md:items-end w-full">

        <FiltroPorSeleccionUnica
          titulo="Venta / Alquiler"
          opciones={operaciones}
          value={operacion}
          alSeleccionar={setOperacion}
        />

        <FiltroPorSeleccionUnica
          titulo="Tipo de propiedad"
          opciones={tiposPropiedad}
          value={tipoDePropiedad}
          alSeleccionar={setTipoDePropiedad}
        />

        <FiltroPorSeleccionUnica
          titulo="Ubicación"
          opciones={ubicaciones}
          value={ubicacion}
          alSeleccionar={setUbicacion}
        />

        <button
          onClick={() => setFiltrosAMostrar(!filtrosAMostrar)} // caundo se precione el boton cambia filtrosAMostrar por su valor contrario
          className="
            h-[46px]
            px-6
            rounded-xl
            bg-[#7A9F79]
            text-white
            font-semibold
            transition-all duration-300 ease-in-out
            hover:scale-105 hover:-translate-y-1
            active:scale-95
          "
        >
          {filtrosAMostrar ? "-" : "+"}
        </button>
      </div>

      <div
        style={{
          overflow: "hidden",
          maxHeight: filtrosAMostrar ? "9999px" : "0px", // a la vez que se hace la animacion el contenedor de filtros se achica a 0 si es false, si no muestra todo el contenido.
          transform: filtrosAMostrar ? "translateY(0px)" : "translateY(-10px)", // desplaza el contenedor verticalmente hacia arriba o abajo dependiendo de si se necesitan mas filtros o no
          transition: "all 300ms ease-in-out", // hace una animacion de ease-in y ease-out que dura 300ms que afecta tanto al contenido del contenedor como elr esto de lineas del className
          background: "#ECEFE6",
          borderRadius: "12px",
        }}
      >
          <> {/*el flex-wrap baja los items cuando ya no halla mas tamaño en la pantalla, por eso es responsive.*/}
              <div className="flex flex-wrap gap-6 w-full items-center justify-center pt-8 bg-[#FFFFFF]">
                <FiltroPorSeleccionMultiple
                  titulo="Ambientes"
                  opciones={[1, 2, 3, 4, "5+"]}
                  valoresSeleccionados={ambientes}
                  setValoresSeleccionados={setAmbientes}
                />

                <FiltroPorSeleccionMultiple
                  titulo="Dormitorios"
                  opciones={[1, 2, 3, 4, "5+"]}
                  valoresSeleccionados={dormitorios}
                  setValoresSeleccionados={setDormitorios}
                />

                <FiltroPorSeleccionMultiple
                  titulo="Cocheras"
                  opciones={[1, 2, 3, 4, "5+"]}
                  valoresSeleccionados={cocheras}
                  setValoresSeleccionados={setCocheras}
                />

                <FiltroPorSeleccionMultiple
                  titulo="Baños"
                  opciones={[1, 2, 3, 4, "5+"]}
                  valoresSeleccionados={baños}
                  setValoresSeleccionados={setBaños}
                />
              </div>
              <div className="flex flex-wrap gap-6 w-full items-center justify-center pt-8 bg-[#FFFFFF]">
                  <FiltroPorRango
                    titulo="Precio"
                    min={precioMin}
                    max={precioMax}
                    setMin={setPrecioMin}
                    setMax={setPrecioMax}
                  />

                  <FiltroPorRango
                    titulo="Metros cuadrados"
                    min={metrosCuadradosMin}
                    max={metrosCuadradosMax}
                    setMin={setMetrosCuadradosMin}
                    setMax={setMetrosCuadradosMax}
                  />

                  <FiltroPorRango
                    titulo="Antigüedad"
                    min={antiguedadMin}
                    max={antiguedadMax}
                    setMin={setAntiguedadMin}
                    setMax={setAntiguedadMax}
                />
              </div>
          </>

      </div>
    </div>

    <GridPropiedades propiedadesFiltradas={propiedadesFiltradas} />

  </section>
)}