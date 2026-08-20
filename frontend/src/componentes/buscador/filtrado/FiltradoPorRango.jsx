export default function FiltroPorRango({
  titulo,
  min,
  max,
  setMin,
  setMax,
}) {

  return (

    <div className="flex flex-col gap-3">

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

      {/* INPUTS */}
      <div className="flex gap-3">

        {/* MIN */}
        <input
          type="number"
          placeholder="Mín"
          value={min}
          onChange={(e) =>
            setMin(e.target.value)
          }
          className="
            w-45
            border
            border-[#CBD3C5]
            bg-[#F8FAF6]
            rounded-xl
            px-4
            py-3
            outline-none
            focus:border-[#8ECC8E]
            focus:ring-2
            focus:ring-[#8ECC8E]/30
            transition
          "
        />

        {/* MAX */}
        <input
          type="number"
          placeholder="Máx"
          value={max}
          onChange={(e) =>
            setMax(e.target.value)
          }
          className="
            w-45
            border
            border-[#CBD3C5]
            bg-[#F8FAF6]
            rounded-xl
            px-4
            py-3
            outline-none
            focus:border-[#8ECC8E]
            focus:ring-2
            focus:ring-[#8ECC8E]/30
            transition
          "
        />

      </div>

    </div>
  );
}