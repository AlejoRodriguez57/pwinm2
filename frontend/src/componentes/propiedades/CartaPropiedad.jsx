"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";

export default function CardPropiedad({
  id,
  estado,
  operacion,
  tipoDePropiedad,
  media = [],
  titulo,
  precio,
  ubicacion,
  metrosCuadrados,
  ambientes,
  antiguedad,
}) {

const imagenes = media
    .filter(item => item.tipo === "imagen")
    .map(item => item.link);


  // Guarda la posicion de la imagen que se esta mostrando actualmentedentro del carrusel de la tarjeta.
  const [imgActual, setImgActual] = useState(0);

  // Cada 10 segundos cambia automaticamente a la siguiente imagen. Cuando llega a la ultima vuelve a la primera.
  useEffect(() => {

      if(imagenes.length <= 1) return;

      const intervalo = setInterval(() => {

          setImgActual((prev) =>
              prev < imagenes.length - 1
              ? prev + 1
              : 0
          );

      }, 10000);


      return () => clearInterval(intervalo);

  }, [imagenes.length]);

  return (

    // Toda la tarjeta funciona como un enlace a la pagina de detalles de esa propiedad.
    <Link href={`/propiedades/${id}`}>

      <div
        className="
          flex flex-col rounded-2xl overflow-hidden
          bg-white border border-[#D8DDD3]
          shadow-md hover:shadow-xl hover:-translate-y-1
          transition-all duration-300 text-left
          min-h-[420px] max-h-[420px]
        "
      >

        {/* Imagen principal de la propiedad */}
        <div className="relative w-full h-[190px] overflow-hidden">

          {/* Etiqueta que muestra las carectiristicas de la propiedad.*/}
          <h3
            className={`
              absolute top-3 right-3
              px-4 py-1 rounded-full
              text-sm font-semibold z-10 shadow-md text-white
              ${
                estado !== "Alquiler" && estado !== "Venta"
                  ? "bg-[#7B7B7B]"
                  : "bg-[#7A9F79]"
              }
            `}
          >
            {estado}
          </h3>

          {/* Imagen actual del carrusel */}

          {imagenes.length > 0 ? (

          <img
            src={imagenes[imgActual]}
            alt="Imagen propiedad"
            className="w-full h-full object-cover"
          />) : (

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

        {/* Titulo de la propiedad */}
        <div className="text-xl font-bold text-[#ECEFE6] bg-[#7B7B7B] p-2">
          <h1>{titulo}</h1>
        </div>

        {/* Informacion principal */}
        <div className="flex flex-col gap-3 bg-white p-3">

          {/* Precio */}
          <h2 className="text-3xl font-black text-[#7A9F79]">
            ${precio.toLocaleString()}
          </h2>

          {/* Operacion y tipo de propiedad */}
          <div className="text-sm text-[#7B7B7B]">
            {operacion} • {tipoDePropiedad}
          </div>

          {/* Datos secundarios divididos en 2 columnas*/}
          <div
            className="
              flex justify-between text-sm text-[#7B7B7B]
              border-t border-[#E5E8E0] pt-3
            "
          >
            <ul className="flex flex-col gap-1">
              <li>{ubicacion}</li>
              <li>{metrosCuadrados}m²</li>
            </ul>

            <ul className="flex flex-col gap-1 text-right">
              <li>{ambientes} ambientes</li>
              <li>{antiguedad} años</li>
            </ul>

          </div>

        </div>

      </div>

    </Link>
  );
}