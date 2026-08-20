"use client";

import { useEffect, useRef, useState } from "react";

export default function FiltroPorSeleccionUnica({
  titulo,
  opciones,
  value,
  alSeleccionar,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // cerrar al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="flex flex-col gap-2 min-w-[180px] relative">

      {/* LABEL */}
      <label className="text-sm font-semibold text-[#7A9F79]">
        {titulo}
      </label>

      {/* SELECT CUSTOM */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="
        h-[46px] 
        rounded-xl 
        border 
        border-[#C9D2C1] 
        bg-[#F8FAF6] 
        px-4 
        text-[#4F5F4E] 
        text-left 
        flex 
        items-center 
        justify-between 
        transition-all 
        duration-200 
        hover:shadow-sm 
        focus:ring-2 
        focus:ring-[#8ECC8E]/30"
      >
        <span>
          {value
            ? (
                opciones.find(
                  (o) =>
                    typeof o === "object" &&
                    o.id === value
                )?.nombre || value
              )
            : "Todos"}
        </span>

        <span className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>

      {/* DROPDOWN ANIMADO */}
      <div
        className={`
          absolute top-[78px] left-0 w-full z-50
          bg-[#F8FAF6]
          border border-[#C9D2C1]
          rounded-xl
          overflow-hidden
          shadow-lg
          transition-all duration-200 ease-in-out
          origin-top
          ${open
            ? "opacity-100 scale-y-100 translate-y-0"
            : "opacity-0 scale-y-0 -translate-y-2 pointer-events-none"
          }
        `}
      >
        {/* opción TODOS */}
        <div
          onClick={() => {
            alSeleccionar("");
            setOpen(false);
          }}
          className="
            px-4 py-3
            cursor-pointer
            hover:bg-[#E7F3E7]
            transition
            text-[#4F5F4E]
          "
        >
          Todos
        </div>

        {/* opciones */}
        {opciones.map((opcion, index) => (
          <div
            key={typeof opcion === "object" ? opcion.id : index}
            onClick={() => {
              alSeleccionar(
                typeof opcion === "object"
                  ? opcion.id
                  : opcion
              );
              setOpen(false);
            }}
            className="
              px-4 py-3
              cursor-pointer
              hover:bg-[#E7F3E7]
              transition
              text-[#4F5F4E]
            "
          >
            {typeof opcion === "object"
              ? opcion.nombre
              : opcion}
          </div>
        ))}
      </div>
    </div>
  );
}