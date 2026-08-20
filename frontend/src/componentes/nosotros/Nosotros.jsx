export default function Nosotros() {
  return (
    <>
    <section className="w-full bg-[#ECEFE6] px-6 py-12 relative">
    <div id="nosotros" className="absolute -top-24"></div>
      {/* QUIÉNES SOMOS */}
      <div className="
        max-w-7xl mx-auto
        bg-white
        border border-[#D9DED3]
        rounded-3xl
        shadow-lg
        p-8
        mb-12
      ">
        <div className="
          flex flex-col lg:flex-row
          justify-center
          items-center
          gap-10
        ">

          <img
            src="/imagenes/FotosPersonal/Equipo.jpeg"
            alt="Equipo Corbalan Vedoya"
            className="
              w-full
              max-w-[600px]
              h-auto
              rounded-2xl
              shadow-md
              object-cover
            "
          />

          <div className="flex flex-col gap-6 max-w-2xl">

            <h1 className="
              text-4xl
              font-black
              text-[#7A9F79]
            ">
              Nuestros valores
            </h1>

            <p className="
              text-[#5F5F5F]
              leading-8
              text-lg
            "> 
              En "Corbalan Vedoya Propiedades", sabemos que detrás de cada
              compra, venta o alquiler hay una historia, un sueño y un nuevo
              comienzo. <br /> <br />

              No nos vemos como simples intermediarios, sino como tus
              compañeros de viaje en una de las decisiones más importantes de
              tu vida. <br /> <br />

              Desde el 2013 trabajamos con el propósito de hacer el
              proceso inmobiliario algo sencillo, transparente y, sobre todo,
              humano. <br /> <br />

              Nos tomamos el tiempo de escucharte para entender exactamente qué
              necesitas. Porque para nosotros no se trata de cerrar
              transacciones; se trata de abrir puertas a tu futuro. <br /> <br />
            </p>

          </div>
        </div>
      </div>
    </section>

   <section id="contacto" className="scroll-mt-24 py-12">
  {/* TRABAJÁ CON NOSOTROS */}
  <div className="
    max-w-5xl mx-auto
    bg-white
    border border-[#D9DED3]
    rounded-3xl
    shadow-lg
    mb-34
    p-8 md:p-12
    text-center
  ">
    <h2 className="text-4xl font-black text-[#7A9F79] mb-6">
      Trabajá con nosotros
    </h2>

    <p className="text-[#5F5F5F] text-lg leading-8 max-w-3xl mx-auto mb-10">
      Si te apasiona el sector inmobiliario y te interesa formar parte de un
      equipo comprometido con la excelencia, la transparencia y el trato humano,
      ¡queremos conocerte!
    </p>

    {/* BENEFICIOS Y QUÉ BUSCAMOS */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto mb-10">
      <div className="bg-[#ECEFE6]/40 p-6 rounded-2xl border border-[#D9DED3]/60">
        <h3 className="font-bold text-[#7A9F79] text-xl mb-3">¿Qué buscamos?</h3>
        <ul className="text-[#5F5F5F] space-y-2 list-disc list-inside">
          <li>Perfil proactivo y con vocación comercial.</li>
          <li>Excelente capacidad de comunicación y empatía.</li>
          <li>Compromiso con la ética profesional.</li>
        </ul>
      </div>

      <div className="bg-[#ECEFE6]/40 p-6 rounded-2xl border border-[#D9DED3]/60">
        <h3 className="font-bold text-[#7A9F79] text-xl mb-3">¿Qué ofrecemos?</h3>
        <ul className="text-[#5F5F5F] space-y-2 list-disc list-inside">
          <li>Un excelente ambiente de trabajo en equipo.</li>
          <li>Capacitación constante en el mercado inmobiliario.</li>
        </ul>
      </div>
    </div>

    {/* BOTONES DE ACCIÓN */}
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
      {/* Opción Principal: WhatsApp */}
      <a
        href="https://wa.me."
        target="_blank"
        rel="noopener noreferrer"
        className="w-full sm:w-auto flex items-center justify-center border-2 border-[#7A9F79] gap-2 bg-[#7A9F79] text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:bg-white hover:text-[#7A9F79] hover:scale-105 hover:-translate-y-1 shadow-md hover:shadow-lg"
      >
        Enviar CV por WhatsApp
      </a>

      {/* Opción Secundaria: Correo Electrónico */}
      <a
        href="mailto:rrhh@corbalanvedoya.com.ar?subject=Postulación%20Laboral%20-%20CV"
        className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-[#7A9F79] bg-[#7A9F79] text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:bg-white hover:text-[#7A9F79] hover:scale-105 hover:-translate-y-1"
      >
        Enviar por Correo
      </a>
    </div>
  </div>
</section>
</>
  );
}
