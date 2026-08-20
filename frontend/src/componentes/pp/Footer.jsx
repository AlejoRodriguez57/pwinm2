export default function Footer() {
  return (

    <footer
      className="
        w-full
        bg-[#ECEFE6]
        text-[#2F2F2F]
        px-8
        py-16
        mt-20
        border-t-4
        border-[#8ECC8E]
      "
    >

      {/* TITULO */}
      <h1
        className="
          text-4xl
          font-bold
          text-center
          mb-14
          text-[#7A9F79]
        "
      >
        Nuestros servicios
      </h1>

      {/* SERVICIOS */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-8
          mb-20
        "
      >

        {/* CARD */}
        <div
          className="
            bg-white
            rounded-3xl
            p-8
            flex
            flex-col
            items-center
            text-center
            shadow-lg
            hover:-translate-y-1
            transition
            border
            border-[#D8E2D1]
          "
        >

          <img
            src="https://picsum.photos/100?1"
            alt=""
            className="
              w-24
              h-24
              rounded-full
              object-cover
              mb-5
              border-4
              border-[#8ECC8E]
            "
          />

          <h1
            className="
              text-2xl
              font-bold
              text-[#7A9F79]
            "
          >
            Venta personalizada
          </h1>

          <p className="text-[#7B7B7B] mt-3 leading-relaxed">
            Te acompañamos en todo el proceso para
            encontrar la propiedad ideal.
          </p>

        </div>

        {/* CARD */}
        <div
          className="
            bg-white
            rounded-3xl
            p-8
            flex
            flex-col
            items-center
            text-center
            shadow-lg
            hover:-translate-y-1
            transition
            border
            border-[#D8E2D1]
          "
        >

          <img
            src="https://picsum.photos/100?2"
            alt=""
            className="
              w-24
              h-24
              rounded-full
              object-cover
              mb-5
              border-4
              border-[#8ECC8E]
            "
          />

          <h1
            className="
              text-2xl
              font-bold
              text-[#7A9F79]
            "
          >
            Alquiler seguro
          </h1>

          <p className="text-[#7B7B7B] mt-3 leading-relaxed">
            Gestionamos alquileres con seguridad y
            transparencia para ambas partes.
          </p>

        </div>

        {/* CARD */}
        <div
          className="
            bg-white
            rounded-3xl
            p-8
            flex
            flex-col
            items-center
            text-center
            shadow-lg
            hover:-translate-y-1
            transition
            border
            border-[#D8E2D1]
          "
        >

          <img
            src="https://picsum.photos/100?3"
            alt=""
            className="
              w-24
              h-24
              rounded-full
              object-cover
              mb-5
              border-4
              border-[#8ECC8E]
            "
          />

          <h1
            className="
              text-2xl
              font-bold
              text-[#7A9F79]
            "
          >
            Tasaciones
          </h1>

          <p className="text-[#7B7B7B] mt-3 leading-relaxed">
            Tasaciones precisas basadas en valores
            reales del mercado actual.
          </p>

        </div>

      </div>

      {/* SECCION INFERIOR */}
      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-16
          items-center
        "
      >

        {/* IZQUIERDA */}
        <div
          className="
            flex
            flex-col
            md:flex-row
            gap-16
          "
        >

          {/* CONTACTO */}
          <div>

            <h1
              className="
                text-2xl
                font-bold
                mb-6
                text-[#7A9F79]
              "
            >
              Información de contacto
            </h1>

            <ul
              className="
                flex
                flex-col
                gap-4
                text-[#7B7B7B]
              "
            >

              <li>
                📍 Calle 14 #44, La Plata
              </li>

              <li>
                📞 +54 9 221 555-5555
              </li>

              <li>
                ✉ contacto@inmobiliaria.com
              </li>

            </ul>

          </div>

          {/* SITEMAP */}
          <div>

            <h1
              className="
                text-2xl
                font-bold
                mb-6
                text-[#7A9F79]
              "
            >
              Sitemap
            </h1>

            <ul
              className="
                flex
                flex-col
                gap-4
                text-[#7B7B7B]
              "
            >

              <li className="hover:text-[#7A9F79] transition cursor-pointer">
                Venta
              </li>

              <li className="hover:text-[#7A9F79] transition cursor-pointer">
                Alquiler
              </li>

              <li className="hover:text-[#7A9F79] transition cursor-pointer">
                Tasaciones
              </li>

            </ul>

          </div>

        </div>

        {/* DERECHA */}
        <div className="flex justify-end">

          <img
            src="https://picsum.photos/500/300?17"
            alt=""
            className="
              w-full
              max-w-[520px]
              h-[320px]
              object-cover
              rounded-[30px]
              shadow-2xl
              border-4
              border-[#8ECC8E]
            "
          />

        </div>

      </div>

      {/* FOOTER FINAL */}
      <div
        className="
          border-t
          border-[#C9D6C1]
          mt-16
          pt-8
          flex
          flex-col
          md:flex-row
          justify-between
          items-center
          gap-6
        "
      >

        {/* REDES */}
        <div className="flex gap-4 text-2xl">

          <button
            className="
              hover:scale-110
              transition
            "
          >
            🌐
          </button>

          <button
            className="
              hover:scale-110
              transition
            "            
          >
            📘
          </button>

          <button
            className="
              hover:scale-110
              transition
            "
          >
            📸
          </button>


        </div>

        {/* COPYRIGHT */}
        <p
          className="
            text-[#7B7B7B]
            text-sm
            text-center
          "
        >
          © 2026 Corbalán Vedoya Propiedades.
          Todos los derechos reservados.
        </p>

      </div>

    </footer>
  );
}