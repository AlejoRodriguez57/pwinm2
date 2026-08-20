"use client";

import useCarrusel from "../utilidades/carrusel";
import { useState, useEffect } from "react";
import { mapAsesor } from "@/mappers/asesorMapper.js";
import { obtenerEmpleadoPorPropiedad } from "@/adapters/empleados.js";

export default function ArticuloPropiedad({ propiedad }) {
    const [asesor, setAsesor] = useState({});
  
    useEffect(()=>{
      async function cargarAsesor(){
        try {
              const asesorSinMapear = await obtenerEmpleadoPorPropiedad(propiedad.id_empleado);

              const asesor = mapAsesor(asesorSinMapear);
              console.log(asesor);
          
              setAsesor(asesor);

          } catch(error){
  
              console.error(
                  "Error cargando propiedades:",
                  error
              );
  
          }
  
  
      }
      console.log(asesor);
  
      cargarAsesor();
  
  },[]);

  // Crea un unico array que contiene tanto imagenes como videos.
  // Cada elemento indica de que tipo de archivo se trata para poder enderizar luego la etiqueta correspondiente (img o video).
  const media = propiedad.media ?? [];

  /* Hook que controla el carrusel de multimedia:
     posActual -> elemento que se esta mostrando.
     setPosActual -> permite seleccionar una miniatura.
     siguiente/anterior -> avanzan o retroceden dentro del carrusel. */
  const {
    posActual,
    setPosActual,
    siguiente,
    anterior,
  } = useCarrusel(media);

  const mensaje = `Hola ${asesor.nombre}, me interesa la siguiente propiedad:

  • ${propiedad.titulo}
  • Operación: ${propiedad.operacion}
  • Tipo: ${propiedad.tipoDePropiedad}
  • Ubicación: ${propiedad.ubicacion}
  • Precio: $${propiedad.precio.toLocaleString()}

  ¿Podrías brindarme más información? Muchas gracias.`;

  const mensajeCodificado = encodeURIComponent(mensaje);

  const whatsappLink =`https://wa.me/${asesor.telefono}?text=${mensajeCodificado}`;

  const emailLink =
    `mailto:${asesor.email}?subject=${encodeURIComponent(`Consulta por ${propiedad.titulo}`)}&body=${mensajeCodificado}`;

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">

      {/* VISOR PRINCIPAL DEL CARRUSEL */}

      {/* Contenedor de botones + imagen/video */}
      <div className="flex justify-center items-center gap-4">

        {/* Boton para ir al elemento anterior.*/}
        <button
          onClick={anterior}
          disabled={posActual === 0}
          className={`px-4 py-3 rounded-full transition ${
            posActual === 0
              ? "opacity-30 cursor-not-allowed"
              : "bg-[#7A9F79] text-white hover:scale-105"
          }`}
        >
          ◀
        </button>

        {/* Contenedor del elemento multimedia */}
        <div className="w-[800px] h-[500px]">

          {/* Dependiendo del tipo del elemento actual,
              renderiza una imagen o un video. */}
          {media.length > 0 ? (

  media[posActual].tipo === "imagen" ? (

    <img
      src={media[posActual].link}
      alt=""
      className="w-full h-full object-cover rounded-xl"
    />

  ) : (

    <video
      src={media[posActual].link}
      controls
      className="w-full h-full object-cover rounded-xl"
    />

  )

) : (

  <div className="
      w-full 
      h-full 
      flex 
      items-center 
      justify-center
      bg-gray-200
  ">
      Sin imagen
  </div>

)}

        </div>

        {/* Boton para avanzar al siguiente elemento.*/}
        <button
          onClick={siguiente}
          disabled={posActual === media.length - 1}
          className={`px-4 py-3 rounded-full transition ${
            posActual === media.length - 1
              ? "opacity-30 cursor-not-allowed"
              : "bg-[#7A9F79] text-white hover:scale-105"
          }`}
        >
          ▶
        </button>

      </div>

      {/*  MINIATURAS DEL CARRUSEL */}

      {/* Recorre todo el contenido multimedia mostrando una miniatura
          de cada elemento para poder seleccionarlo directamente. */}
      <div className="flex justify-center gap-3 mt-4">

        {media.map((item, index) => (

          <div
            key={index}

            // Al hacer click cambia el elemento mostrado.
            onClick={() => setPosActual(index)}

            className={`
              cursor-pointer
              rounded-lg
              overflow-hidden
              w-24
              h-24
              ${
                posActual === index
                  ? "border-4 border-[#7A9F79]"
                  : "border border-gray-300"
              }
            `}
          >

            {/* Si es una imagen se muestra normalmente.
                Si es un video se utiliza una miniatura generica. */}
            {item.tipo === "imagen" ? (

              <img
                src={item.link}
                alt=""
                className="w-full h-full object-cover"
              />

            ) : (

              <div className="w-full h-full bg-black text-white flex items-center justify-center">
                ▶ Video
              </div>

            )}

          </div>

        ))}
      </div>

      {/* CONTENIDO PRINCIPAL */}

      {/* Divide la pagina en dos columnas:
          izquierda -> descripcion
          derecha -> asesor */}
      <div className="grid lg:grid-cols-[2fr_1fr] gap-8 mt-10">

        {/*COLUMNA IZQUIERDA */}
        <div className="flex flex-col gap-8 w-full">

          {/* Tarjeta con la descripcion completa de la prop */}
          <div
            className="
              bg-white
              border border-[#D8DDD3]
              rounded-2xl
              p-6
              shadow-sm
              h-full
            "
          >
            <h3 className="text-2xl font-bold text-[#4F5F4E] mb-4">
              Descripción
            </h3>

            <p className="text-[#5F5F5F] leading-relaxed">
              {propiedad.descripcion}
            </p>
          </div>

        </div>

        {/*COLUMNA DERECHA DEL ASESOR*/}
        <div>

          {/* Tarjeta del asesor*/}
          <div
            className="
              bg-white
              border border-[#D8DDD3]
              rounded-2xl
              p-6
              shadow-sm
            "
          >

            <h3 className="text-2xl font-bold text-[#4F5F4E] mb-5">
              Asesor asignado
            </h3>

            {/* Foto y datos del asesor */}
            <div className="flex items-center gap-4">

              <img
                src={asesor.img}
                alt=""
                className="w-20 h-20 rounded-full object-cover"
              />

              <div>
                <h4 className="font-bold text-lg">
                  {asesor.nombre}
                </h4>

                <p className="text-sm text-gray-500">
                  Asesor inmobiliario
                </p>
              </div>

            </div>

            {/* Botones de contacto */}
            <div className="flex flex-col gap-3 mt-6">

              <button className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-[#7A9F79] bg-[#7A9F79] text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:bg-white hover:text-[#7A9F79] hover:scale-105 hover:-translate-y-1">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
                >  WhatsApp </a>
              </button>

              <button className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-[#7A9F79] bg-[#7A9F79] text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:bg-white hover:text-[#7A9F79] hover:scale-105 hover:-translate-y-1">
                <a href={`tel:+${asesor?.telefono}`}
                > Llamar </a>
              </button>

              <button className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-[#7A9F79] bg-[#7A9F79] text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:bg-white hover:text-[#7A9F79] hover:scale-105 hover:-translate-y-1">
                <a href={emailLink} target="_blank" rel="noopener noreferrer"
                > Enviar email </a>
              </button>

            </div>
          </div>
        </div>

        {/*CARACTERISTICAS*/}

        <div
          className="
            lg:col-span-2
            bg-white
            border border-[#D8DDD3]
            rounded-2xl
            p-6
            shadow-sm
          "
        >
          {/* Titulo */}
          <h3 className="text-2xl font-bold text-[#4F5F4E] mb-6">
            Características
          </h3>

          {/* Grilla responsive donde cada tarjeta representa una caracteristica de la propiedad. */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

            <div className="bg-[#ECEFE6] rounded-xl p-4">
              <p className="text-sm text-gray-500">Tipo</p>
              <p className="font-semibold">{propiedad.tipoDePropiedad}</p>
            </div>

            <div className="bg-[#ECEFE6] rounded-xl p-4">
              <p className="text-sm text-gray-500">Ubicación</p>
              <p className="font-semibold">{propiedad.ubicacion}</p>
            </div>

            <div className="bg-[#ECEFE6] rounded-xl p-4">
              <p className="text-sm text-gray-500">Metros²</p>
              <p className="font-semibold">{propiedad.metrosCuadrados} m²</p>
            </div>

            <div className="bg-[#ECEFE6] rounded-xl p-4">
              <p className="text-sm text-gray-500">Ambientes</p>
              <p className="font-semibold">{propiedad.ambientes}</p>
            </div>

            <div className="bg-[#ECEFE6] rounded-xl p-4">
              <p className="text-sm text-gray-500">Dormitorios</p>
              <p className="font-semibold">{propiedad.dormitorios}</p>
            </div>

            <div className="bg-[#ECEFE6] rounded-xl p-4">
              <p className="text-sm text-gray-500">Baños</p>
              <p className="font-semibold">{propiedad.baños}</p>
            </div>

            <div className="bg-[#ECEFE6] rounded-xl p-4">
              <p className="text-sm text-gray-500">Cocheras</p>
              <p className="font-semibold">{propiedad.cocheras}</p>
            </div>

            <div className="bg-[#ECEFE6] rounded-xl p-4">
              <p className="text-sm text-gray-500">Antigüedad</p>
              <p className="font-semibold">
                {propiedad.antiguedad} años
              </p>
            </div>

            <div className="bg-[#ECEFE6] rounded-xl p-4">
              <p className="text-sm text-gray-500">Estado</p>
              <p className="font-semibold">{propiedad.estado}</p>
            </div>

            <div className="bg-[#ECEFE6] rounded-xl p-4">
              <p className="text-sm text-gray-500">Expensas</p>
              <p className="font-semibold">
                ${propiedad.expensas.toLocaleString()}
              </p>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}