
"use client";

import { useEffect } from 'react';
import CardPropiedad from "../propiedades/CartaPropiedad.jsx";
import useAnchoPantalla from "../utilidades/anchoPantalla.jsx";
import paginarArrey from "../utilidades/paginarArrey.jsx";
import useCarrusel from "../utilidades/carrusel.jsx";

export default function GridPropiedades({ propiedadesFiltradas }) {

  // Detecta el tipo de pantalla
  const screenType = useAnchoPantalla();

  // Configuracion de cuantas columnas y filas tendra la grilla dependiendo del tipo de pantalla.
  const configuracionPantalla = {
    "tablet-portrait": { cols: 2, rows: 2 },
    "tablet-landscape": { cols: 2, rows: 2 },
    "laptop": { cols: 3, rows: 2 },
    "desktop": { cols: 3, rows: 2 },
    "desktop-large": { cols: 4, rows: 2 },
    "4k": { cols: 8, rows: 3 },
  };

  // Obtiene la configuracion correspondiente a la pantalla actual.
  // Si es mobile utiliza un valor por defecto, aunque luego ese layout no llegue a utilizarse.
  const { cols, rows } =
    configuracionPantalla[screenType] ?? { cols: 1, rows: 1 };

  // Calcula cuantas propiedades entran en una pagina.
  const itemsPorPagina = cols * rows;

  // Divide el array de propiedades en varias paginas.
  const paginas = paginarArrey(propiedadesFiltradas, itemsPorPagina);

  /* 
  Hook que controla el carrusel de paginas:
    posActual -> pagina mostrada actualmente.
    setPosActual -> cambia manualmente la pagina.
    siguiente/anterior -> avanzan o retroceden una pagina.
  */

  const {
    posActual,
    setPosActual,
    siguiente,
    anterior,
  } = useCarrusel(paginas);

  // Cada vez que cambia el resultado de la busqueda, vuelve automaticamente a la primera pagina.
  useEffect(() => {
    setPosActual(0);
  }, [propiedadesFiltradas, setPosActual]);

  // Si ninguna prop cumple los filtros muestra un mensaje en lugar de la grilla.
  if (propiedadesFiltradas.length === 0) {
    return (
      <h1 className="text-center text-2xl font-semibold text-red-500">
        No hay propiedades con esos filtros
      </h1>
    );
  }

  // En dispositivos moviles no se utiliza paginacion y las propiedades simplemente se muestran una debajo de la otra.
  if (screenType === "mobile-small" || screenType === "mobile") {
    return (
      <div className="flex flex-col gap-6 px-4 items-center">
        {propiedadesFiltradas.map((p) => (
          <div key={p.id} className="w-[260px]">
            <CardPropiedad {...p} />
          </div>
        ))}
      </div>
    );
  }

  // Vista para tablets y computadoras, donde se utiliza un carrusel donde cada pagina contiene una grilla con varias propiedades.
  return (
    <div className="flex flex-row justify-center items-center">

      {/* Boton para retroceder una pagina */}
      <button
        onClick={anterior}
        disabled={posActual === 0}
        className={`z-40 px-4 py-2 rounded-full transition ${
          posActual === 0
            ? "opacity-30 cursor-not-allowed"
            : "bg-[#7A9F79] text-white"
        }`}
      >
        ◀
      </button>

      {/* Contenedor que oculta las paginas que quedan fuera de la vista */}
      <div className="overflow-hidden w-full">

        {/* Contenedor que se desplaza horizontalmente */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            // Desplaza exactamente un ancho de pantalla por cada pagina.
            transform: `translateX(-${posActual * 100}%)`,
          }}
        >

          {/* Recorre todas las paginas */}
          {paginas.map((pagina, i) => (

            // Cada pagina ocupa el 100% del ancho disponible.
            <div key={i} className="min-w-full flex justify-center py-6">

              {/* Grilla donde se acomodan las tarjetas */}
              <div
                className="grid gap-6 w-fit"
                style={{
                  gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                  gridTemplateRows: `repeat(${rows}, auto)`,
                }}
              >

                {/* Recorre todas las propiedades de esa pagina */}
                {pagina.map((p) => (
                  <div key={p.id} className="w-[280px]">
                    <CardPropiedad {...p} />
                  </div>
                ))}

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Boton para avanzar una pagina */}
      <button
        onClick={siguiente}
        disabled={posActual === paginas.length - 1}
        className={`z-40 px-4 py-2 rounded-full transition ${
          posActual === paginas.length - 1
            ? "opacity-30 cursor-not-allowed"
            : "bg-[#7A9F79] text-white"
        }`}
      >
        ▶
      </button>

    </div>
  );
}