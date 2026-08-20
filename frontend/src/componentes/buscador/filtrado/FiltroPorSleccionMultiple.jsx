export default function FiltroPorSeleccionMultiple({
  titulo,
  opciones,
  valoresSeleccionados,
  setValoresSeleccionados,
}) {

  function toggleValor(valor) {

    if (
      valoresSeleccionados.includes(valor)
    ) {

      setValoresSeleccionados(
        valoresSeleccionados.filter(
          (v) => v !== valor
        )
      );

    } else {

      setValoresSeleccionados([
        ...valoresSeleccionados,
        valor,
      ]);
    }
  }

  return (

    <div className="flex flex-col p-5">

      {/* TITULO */}
      <label
        className="
          font-semibold
          text-[#7A9F79]
          text-center
        "
      >
        {titulo}
      </label>

      {/* BOTONES */}
      <div className="flex flex-wrap">

        {opciones.map((opcion) => {

          const activo =
            valoresSeleccionados.includes(opcion);

          return (

            <button
              key={opcion}
              type="button"
              onClick={() =>
                toggleValor(opcion)
              }
              className={`
                px-4
                py-2
                rounded-xl
                border
                font-medium
                transition-all
                duration-200

                ${
                  activo
                    ? 'bg-[#7A9F79] text-white border-[#7A9F79] shadow-md'
                    : 'bg-[#F7F8F4] text-[#5E705D] border-[#D7DDD0] hover:bg-[#E7EFE2]'
                }
              `}
            >
              {opcion}
            </button>
          );
        })}

      </div>

    </div>
  );
}