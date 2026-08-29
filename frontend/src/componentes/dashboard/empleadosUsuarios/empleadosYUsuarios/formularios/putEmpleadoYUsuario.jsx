"use client";

import { useState } from "react";

import {
    editarEmpleadosYUsuario
} from "@/adapters/empleados";


export default function PutEmpleadosYUsuarios({ roles }) {

    const [formulario, setFormulario] = useState({

        id_empleado: "",

        nombre: "",
        email: "",
        telefono: "",
        password: "",
        id_rol: "",

        whatsappLink: "",
        img: "",
        activo: true

    });


    const [cargando, setCargando] = useState(false);

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");


    function manejarCambio(e) {

        const {
            name,
            value,
            type,
            checked
        } = e.target;


        setFormulario((anterior) => ({

            ...anterior,

            [name]:
                type === "checkbox"
                    ? checked
                    : value

        }));

    }


    async function manejarSubmit(e) {

        e.preventDefault();

        setMensaje("");
        setError("");

        if (!formulario.id_empleado) {
            setError("Ingresá el ID del empleado.");
            return;
        }

        const usuario = {};

        if (formulario.nombre.trim()) {
            usuario.nombre = formulario.nombre.trim();
        }

        if (formulario.email.trim()) {
            usuario.email = formulario.email.trim();
        }

        if (formulario.telefono.trim()) {
            usuario.telefono = formulario.telefono.trim();
        }

        if (formulario.password.trim()) {
            usuario.password = formulario.password.trim();
        }

        if (formulario.id_rol !== "") {
            usuario.id_rol = Number(formulario.id_rol);
        }

        const empleado = {};

        if (formulario.whatsappLink.trim()) {
            empleado.whatsappLink = formulario.whatsappLink.trim();
        }

        if (formulario.img.trim()) {
            empleado.img = formulario.img.trim();
        }

        // IMPORTANTE:
        // Se manda siempre porque false también es un valor válido.
        empleado.activo = formulario.activo;

        const data = {
            usuario,
            empleado
        };

        console.log("PUT empleadoYUsuario:");
        console.log("ID empleado:", formulario.id_empleado);
        console.log("Body:", data);

        setCargando(true);

        try {

            

                        console.log("========== PUT EMPLEADO + USUARIO ==========");
                        console.log("ID empleado:", formulario.id_empleado);
                        console.log("URL:", `/empleados/empleadoYUsuario/${formulario.id_empleado}`);
                        console.log("Datos que se envían al backend:", data);
                        console.log("JSON enviado al backend:");
                        console.log(JSON.stringify(data, null, 2));
                        console.log("============================================");

            const respuesta = await editarEmpleadosYUsuario(
                Number(formulario.id_empleado),
                data
            );

            console.log("Respuesta PUT:", respuesta);

            setMensaje(
                "Empleado y usuario actualizados correctamente."
            );

        } catch (error) {

            console.error("Error actualizando empleado:", error);

            setError(
                error.message ||
                "No se pudo actualizar el empleado y usuario."
            );

        } finally {

            setCargando(false);

        }
    }


    return (

        <section className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold text-[#4F5F4E] mb-6">
                Editar empleado
            </h2>


            <form
                onSubmit={manejarSubmit}
                className="flex flex-col gap-5"
            >


                {/* ID EMPLEADO */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        ID de empleado
                    </label>

                    <input
                        type="number"
                        name="id_empleado"
                        value={formulario.id_empleado}
                        onChange={manejarCambio}
                        required
                        min="1"
                        disabled={cargando}
                        className="w-full border rounded-xl px-4 py-3"
                        placeholder="ID del empleado"
                    />

                </div>


                <h3 className="text-lg font-semibold mt-2">
                    Datos del usuario
                </h3>


                {/* NOMBRE */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Nombre
                    </label>

                    <input
                        type="text"
                        name="nombre"
                        value={formulario.nombre}
                        onChange={manejarCambio}
                        disabled={cargando}
                        className="w-full border rounded-xl px-4 py-3"
                        placeholder="Dejar vacío para no modificar"
                    />

                </div>


                {/* EMAIL */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={formulario.email}
                        onChange={manejarCambio}
                        disabled={cargando}
                        className="w-full border rounded-xl px-4 py-3"
                        placeholder="Dejar vacío para no modificar"
                    />

                </div>


                {/* TELEFONO */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Teléfono
                    </label>

                    <input
                        type="text"
                        name="telefono"
                        value={formulario.telefono}
                        onChange={manejarCambio}
                        disabled={cargando}
                        className="w-full border rounded-xl px-4 py-3"
                        placeholder="Dejar vacío para no modificar"
                    />

                </div>


                {/* PASSWORD */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Nueva contraseña
                    </label>

                    <input
                        type="password"
                        name="password"
                        value={formulario.password}
                        onChange={manejarCambio}
                        disabled={cargando}
                        className="w-full border rounded-xl px-4 py-3"
                        placeholder="Dejar vacío para no modificar"
                    />

                </div>


                {/* ROL */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Rol
                    </label>

                    <select
                        name="id_rol"
                        value={formulario.id_rol}
                        onChange={manejarCambio}
                        disabled={cargando}
                        className="w-full border rounded-xl px-4 py-3"
                    >

                        <option value="">
                            Dejar vacío para no modificar
                        </option>


                        {Array.isArray(roles) && roles.map((rol) => (

                            <option
                                key={rol.id_rol}
                                value={rol.id_rol}
                            >

                                {rol.nombre}

                            </option>

                        ))}

                    </select>

                </div>


                <h3 className="text-lg font-semibold mt-4">
                    Datos del empleado
                </h3>


                {/* WHATSAPP */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Link de WhatsApp
                    </label>

                    <input
                        type="text"
                        name="whatsappLink"
                        value={formulario.whatsappLink}
                        onChange={manejarCambio}
                        disabled={cargando}
                        className="w-full border rounded-xl px-4 py-3"
                        placeholder="Dejar vacío para no modificar"
                    />

                </div>


                {/* IMAGEN */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Imagen
                    </label>

                    <input
                        type="text"
                        name="img"
                        value={formulario.img}
                        onChange={manejarCambio}
                        disabled={cargando}
                        className="w-full border rounded-xl px-4 py-3"
                        placeholder="Dejar vacío para no modificar"
                    />

                </div>


                {/* ACTIVO */}

                <label className="flex items-center gap-3">

                    <input
                        type="checkbox"
                        name="activo"
                        checked={formulario.activo}
                        onChange={manejarCambio}
                        disabled={cargando}
                    />

                    <span className="text-sm font-semibold">
                        Empleado activo
                    </span>

                </label>


                {/* ERROR */}

                {error && (

                    <p className="text-red-600 font-semibold text-sm">
                        {error}
                    </p>

                )}


                {/* EXITO */}

                {mensaje && (

                    <p className="text-green-600 font-semibold text-sm">
                        {mensaje}
                    </p>

                )}


                {/* BOTON */}

                <button
                    type="submit"
                    disabled={cargando}
                    className="bg-[#FFAA14] text-white rounded-xl py-3 font-semibold hover:opacity-90 disabled:opacity-50"
                >

                    {cargando
                        ? "Guardando cambios..."
                        : "Guardar cambios"
                    }

                </button>

            </form>

        </section>

    );

}