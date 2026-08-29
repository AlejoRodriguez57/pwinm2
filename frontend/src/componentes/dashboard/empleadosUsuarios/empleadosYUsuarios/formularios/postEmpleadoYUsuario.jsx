"use client";

import { useState } from "react";

import {
    crearEmpleadoYUsuario
} from "@/adapters/empleados";


export default function PostEmpleadosYUsuarios({ roles }) {

    const [cargando, setCargando] = useState(false);

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");


    const [formulario, setFormulario] = useState({

        // Datos del usuario
        nombre: "",
        email: "",
        telefono: "",
        password: "",
        id_rol: "",

        // Datos del empleado
        whatsappLink: "",
        img: "",
        activo: true

    });


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

        setError("");
        setMensaje("");


        if (!formulario.id_rol) {

            setError(
                "Seleccioná un rol."
            );

            return;

        }


        setCargando(true);


        try {

            const data = {

                usuario: {

                    nombre: formulario.nombre.trim(),

                    email: formulario.email.trim(),

                    telefono: formulario.telefono.trim(),

                    password: formulario.password,

                    id_rol: Number(formulario.id_rol)

                },


                empleado: {

                    whatsappLink:
                        formulario.whatsappLink.trim(),

                    img:
                        formulario.img.trim(),

                    activo:
                        formulario.activo

                }

            };


            console.log(
                "Creando empleado y usuario:",
                data
            );


            const respuesta =
                await crearEmpleadoYUsuario(data);


            console.log(
                "Empleado y usuario creados:",
                respuesta
            );


            setMensaje(
                "Empleado y usuario creados correctamente."
            );


            setFormulario({

                nombre: "",
                email: "",
                telefono: "",
                password: "",
                id_rol: "",

                whatsappLink: "",
                img: "",
                activo: true

            });


        } catch (error) {

            console.error(
                "Error creando empleado:",
                error
            );


            if (error.status === 401) {

                setError(
                    "No estás autenticado."
                );

            } else if (error.status === 403) {

                setError(
                    "No tenés permisos para crear empleados."
                );

            } else if (error.status === 400) {

                setError(
                    "El email ya está registrado."
                );

            } else if (error.status === 422) {

                setError(
                    "Los datos enviados no tienen un formato válido."
                );

            } else {

                setError(
                    error.message ||
                    "No se pudo crear el empleado y usuario."
                );

            }

        } finally {

            setCargando(false);

        }

    }


    return (

        <section className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold text-[#4F5F4E] mb-6">
                Añadir empleado
            </h2>


            <form
                onSubmit={manejarSubmit}
                className="flex flex-col gap-5"
            >


                <h3 className="text-lg font-semibold">
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
                        required
                        disabled={cargando}
                        className="w-full border rounded-xl px-4 py-3"
                        placeholder="Nombre"
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
                        required
                        disabled={cargando}
                        className="w-full border rounded-xl px-4 py-3"
                        placeholder="Email"
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
                        required
                        disabled={cargando}
                        className="w-full border rounded-xl px-4 py-3"
                        placeholder="Teléfono"
                    />

                </div>


                {/* PASSWORD */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Contraseña
                    </label>

                    <input
                        type="password"
                        name="password"
                        value={formulario.password}
                        onChange={manejarCambio}
                        required
                        disabled={cargando}
                        className="w-full border rounded-xl px-4 py-3"
                        placeholder="Contraseña"
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
                        required
                        disabled={cargando}
                        className="w-full border rounded-xl px-4 py-3"
                    >

                        <option value="">
                            Seleccionar rol
                        </option>


                        {roles.map((rol) => (

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
                        type="url"
                        name="whatsappLink"
                        value={formulario.whatsappLink}
                        onChange={manejarCambio}
                        required
                        disabled={cargando}
                        className="w-full border rounded-xl px-4 py-3"
                        placeholder="https://..."
                    />

                </div>


                {/* IMAGEN */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Imagen
                    </label>

                    <input
                        type="url"
                        name="img"
                        value={formulario.img}
                        onChange={manejarCambio}
                        required
                        disabled={cargando}
                        className="w-full border rounded-xl px-4 py-3"
                        placeholder="https://..."
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

                    <p className="text-red-500 text-sm">
                        {error}
                    </p>

                )}


                {/* EXITO */}

                {mensaje && (

                    <p className="text-green-600 text-sm">
                        {mensaje}
                    </p>

                )}


                {/* BOTON */}

                <button
                    type="submit"
                    disabled={cargando}
                    className="bg-[#00B4E6] text-white rounded-xl py-3 font-semibold hover:opacity-90 disabled:opacity-50"
                >

                    {cargando
                        ? "Creando..."
                        : "Crear empleado"
                    }

                </button>

            </form>

        </section>

    );

}