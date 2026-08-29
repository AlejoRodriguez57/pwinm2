"use client";

import { useState } from "react";

import { editarUsuarios } from "@/adapters/usuarios";

export default function PutUsuarios({ roles = [] }) {

    const [formulario, setFormulario] = useState({

        id_usuario: "",
        nombre: "",
        email: "",
        telefono: "",
        id_rol: ""

    });


    const [cargando, setCargando] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");


    function manejarCambio(e) {

        const { name, value } = e.target;

        setFormulario((anterior) => ({
            ...anterior,
            [name]: value
        }));

    }


    async function manejarSubmit(e) {

        e.preventDefault();

        setError("");
        setMensaje("");


        // ==============================
        // VALIDAR ID
        // ==============================

        const idUsuario = Number(formulario.id_usuario);


        if (!idUsuario || idUsuario < 1) {

            setError(
                "Ingresá un ID de usuario válido."
            );

            return;

        }


        // ==============================
        // CONSTRUIR DATOS A MODIFICAR
        // ==============================

        const datos = {};


        if (formulario.nombre.trim()) {

            datos.nombre =
                formulario.nombre.trim();

        }


        if (formulario.email.trim()) {

            datos.email =
                formulario.email.trim();

        }


        if (formulario.telefono.trim()) {

            datos.telefono =
                formulario.telefono.trim();

        }


        if (formulario.id_rol) {

            datos.id_rol =
                Number(formulario.id_rol);

        }


        // ==============================
        // VALIDAR CAMBIOS
        // ==============================

        if (Object.keys(datos).length === 0) {

            setError(
                "Ingresá al menos un dato para modificar."
            );

            return;

        }


        setCargando(true);


        try {

            console.log(
                "Editando usuario:",
                idUsuario,
                datos
            );


            const respuesta =
                await editarUsuarios(
                    idUsuario,
                    datos
                );


            console.log(
                "Usuario actualizado:",
                respuesta
            );


            setMensaje(
                "Usuario actualizado correctamente."
            );


            // Limpiar campos modificables
            // Conservamos el ID por comodidad

            setFormulario({

                id_usuario: formulario.id_usuario,
                nombre: "",
                email: "",
                telefono: "",
                id_rol: ""

            });


        } catch (error) {

            console.error(
                "Error editando usuario:",
                error
            );


            if (error.status === 400) {

                setError(
                    "No se pudo actualizar el usuario. El email podría estar registrado."
                );

            } else if (error.status === 401) {

                setError(
                    "No estás autenticado."
                );

            } else if (error.status === 403) {

                setError(
                    "No tenés permisos para editar usuarios."
                );

            } else if (error.status === 404) {

                setError(
                    "No se encontró el usuario."
                );

            } else if (error.status === 422) {

                setError(
                    "Los datos ingresados no son válidos."
                );

            } else {

                setError(
                    error.message ||
                    "No se pudo actualizar el usuario."
                );

            }

        } finally {

            setCargando(false);

        }

    }


    return (

        <section className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold text-[#4F5F4E] mb-6">
                Editar usuario
            </h2>


            <form
                onSubmit={manejarSubmit}
                className="flex flex-col gap-5"
            >

                {/* ID USUARIO */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        ID de usuario
                    </label>

                    <input
                        type="number"
                        name="id_usuario"
                        value={formulario.id_usuario}
                        onChange={manejarCambio}
                        required
                        min="1"
                        disabled={cargando}
                        className="w-full border rounded-xl px-4 py-3"
                        placeholder="ID"
                    />

                </div>


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


                {/* TELÉFONO */}

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


                {/* ERROR */}

                {error && (

                    <p className="text-red-600 font-semibold">
                        {error}
                    </p>

                )}


                {/* ÉXITO */}

                {mensaje && (

                    <p className="text-green-600 font-semibold">
                        {mensaje}
                    </p>

                )}


                {/* BOTÓN */}

                <button
                    type="submit"
                    disabled={cargando}
                    className="bg-[#FFAA14] text-white rounded-xl py-3 font-semibold hover:opacity-90 disabled:opacity-50"
                >

                    {cargando
                        ? "Guardando..."
                        : "Guardar cambios"
                    }

                </button>

            </form>

        </section>

    );

}
