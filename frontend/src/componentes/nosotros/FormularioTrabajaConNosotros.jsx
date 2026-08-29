"use client";

import { useState } from "react";

export default function FormularioTrabajaConNosotros({ opcion }) {

    const [formulario, setFormulario] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
    });

    function manejarCambio(e) {
        const { name, value } = e.target;

        setFormulario({
            ...formulario,
            [name]: value,
        });
    }

    function manejarSubmit(e) {
        e.preventDefault();

        const {
            nombre,
            apellido,
            telefono,
            email,
        } = formulario;

        const mensaje = `Hola, me gustaría postularme para trabajar con ustedes.

Mis datos son:

• Nombre: ${nombre}
• Apellido: ${apellido}
• Teléfono: ${telefono}
• Email: ${email}

Muchas gracias por considerar mi postulación.`;

        // ==============================
        // WHATSAPP
        // ==============================

        if (opcion === "whatsapp") {

            const telefonoWhatsApp = "5492216691741";

            const whatsappLink =
                `https://wa.me/${telefonoWhatsApp}?text=${encodeURIComponent(mensaje)}`;

            window.open(whatsappLink, "_blank");

        }

        // ==============================
        // EMAIL
        // ==============================

        else if (opcion === "email") {

            const emailDestino = "scvpropiedades@gmail.com";

            const asunto = "Postulación para trabajar con nosotros";

            const emailLink =
                `mailto:${emailDestino}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(mensaje)}`;

            window.location.href = emailLink;
        }
    }

    return (

        <section className="max-w-4xl mx-auto px-6 py-12">

            <div
                className="
                bg-white
                border
                border-[#D8DDD3]
                rounded-3xl
                p-8
                md:p-12
                shadow-lg
                "
            >

                {/* TÍTULO */}

                <div className="text-center mb-10">

                    <h2
                        className="
                        text-3xl
                        md:text-4xl
                        font-bold
                        text-[#7A9F79]
                        "
                    >
                        ¡Trabajá con nosotros!
                    </h2>

                    <p
                        className="
                        text-[#7B7B7B]
                        mt-4
                        leading-relaxed
                        max-w-2xl
                        mx-auto
                        "
                    >
                        ¿Te gustaría formar parte de nuestro equipo?
                        Completá el siguiente formulario con tus datos
                        y envianos tu postulación.
                    </p>

                </div>


                {/* FORMULARIO */}

                <form
                    onSubmit={manejarSubmit}
                    className="flex flex-col gap-6"
                >

                    {/* NOMBRE Y APELLIDO */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>

                            <label
                                htmlFor="nombre"
                                className="
                                block
                                text-sm
                                font-semibold
                                text-[#4F5F4E]
                                mb-2
                                "
                            >
                                Nombre
                            </label>

                            <input
                                id="nombre"
                                name="nombre"
                                type="text"
                                value={formulario.nombre}
                                onChange={manejarCambio}
                                required
                                placeholder="Ingresá tu nombre"
                                className="
                                w-full
                                px-4
                                py-3
                                rounded-xl
                                border
                                border-[#D8DDD3]
                                outline-none
                                focus:border-[#7A9F79]
                                focus:ring-2
                                focus:ring-[#8ECC8E]/30
                                "
                            />

                        </div>


                        <div>

                            <label
                                htmlFor="apellido"
                                className="
                                block
                                text-sm
                                font-semibold
                                text-[#4F5F4E]
                                mb-2
                                "
                            >
                                Apellido
                            </label>

                            <input
                                id="apellido"
                                name="apellido"
                                type="text"
                                value={formulario.apellido}
                                onChange={manejarCambio}
                                required
                                placeholder="Ingresá tu apellido"
                                className="
                                w-full
                                px-4
                                py-3
                                rounded-xl
                                border
                                border-[#D8DDD3]
                                outline-none
                                focus:border-[#7A9F79]
                                focus:ring-2
                                focus:ring-[#8ECC8E]/30
                                "
                            />

                        </div>

                    </div>


                    {/* TELÉFONO Y EMAIL */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>

                            <label
                                htmlFor="telefono"
                                className="
                                block
                                text-sm
                                font-semibold
                                text-[#4F5F4E]
                                mb-2
                                "
                            >
                                Teléfono
                            </label>

                            <input
                                id="telefono"
                                name="telefono"
                                type="tel"
                                value={formulario.telefono}
                                onChange={manejarCambio}
                                required
                                placeholder="Ej: 221 555-5555"
                                className="
                                w-full
                                px-4
                                py-3
                                rounded-xl
                                border
                                border-[#D8DDD3]
                                outline-none
                                focus:border-[#7A9F79]
                                focus:ring-2
                                focus:ring-[#8ECC8E]/30
                                "
                            />

                        </div>


                        <div>

                            <label
                                htmlFor="email"
                                className="
                                block
                                text-sm
                                font-semibold
                                text-[#4F5F4E]
                                mb-2
                                "
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formulario.email}
                                onChange={manejarCambio}
                                required
                                placeholder="tuemail@ejemplo.com"
                                className="
                                w-full
                                px-4
                                py-3
                                rounded-xl
                                border
                                border-[#D8DDD3]
                                outline-none
                                focus:border-[#7A9F79]
                                focus:ring-2
                                focus:ring-[#8ECC8E]/30
                                "
                            />

                        </div>

                    </div>


                    {/* BOTÓN */}

                    <button
                        type="submit"
                        className="
                        w-full
                        mt-4
                        bg-[#7A9F79]
                        text-white
                        font-semibold
                        px-6
                        py-4
                        rounded-xl
                        transition
                        hover:bg-[#668965]
                        hover:scale-[1.01]
                        "
                    >
                        Enviar postulación
                    </button>

                </form>

            </div>

        </section>
    );
}