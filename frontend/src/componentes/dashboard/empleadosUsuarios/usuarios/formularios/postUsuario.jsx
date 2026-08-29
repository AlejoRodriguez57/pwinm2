"use client";

import { useState } from "react";

import { crearUsuarios } from "@/adapters/usuarios";

export default function PostUsuarios({ roles = [] }) {

    const [formulario, setFormulario] = useState({

        nombre: "",
        email: "",
        telefono: "",
        password: "",
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

        setMensaje("");
        setError("");


        // ==============================
        // VALIDACIONES
        // ==============================

        if (!formulario.nombre.trim()) {

            setError("Ingresá un nombre.");
            return;

        }


        if (!formulario.email.trim()) {

            setError("Ingresá un email.");
            return;

        }


        if (!formulario.telefono.trim()) {

            setError("Ingresá un teléfono.");
            return;

        }


        if (!formulario.password.trim()) {

            setError("Ingresá una contraseña.");
            return;

        }


        if (!formulario.id_rol) {

            setError("Seleccioná un rol.");
            return;

        }


        setCargando(true);


        try {

            const datos = {

                nombre: formulario.nombre.trim(),

                email: formulario.email.trim(),

                telefono: formulario.telefono.trim(),

                password: formulario.password,

                id_rol: Number(formulario.id_rol)

            };


            console.log(
                "Creando usuario:",
                datos
            );


            const usuarioCreado =
                await crearUsuarios(datos);


            console.log(
                "Usuario creado:",
                usuarioCreado
            );


            setMensaje(
                "Usuario creado correctamente."
            );


            // Limpiar formulario

            setFormulario({

                nombre: "",
                email: "",
                telefono: "",
                password: "",
                id_rol: ""

            });


        } catch (error) {

            console.error(
                "Error creando usuario:",
                error
            );


            if (error.status === 400) {

                setError(
                    "El email ya está registrado."
                );

            } else if (error.status === 401) {

                setError(
                    "No estás autenticado."
                );

            } else if (error.status === 403) {

                setError(
                    "No tenés permisos para crear usuarios."
                );

            } else if (error.status === 422) {

                setError(
                    "Los datos ingresados no son válidos."
                );

            } else {

                setError(
                    error.message ||
                    "No se pudo crear el usuario."
                );

            }

        } finally {

            setCargando(false);

        }

    }


    return (

        <section className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold text-[#4F5F4E] mb-6">
                Añadir usuario
            </h2>


            <form
                onSubmit={manejarSubmit}
                className="flex flex-col gap-5"
            >

                {/* ==============================
                    NOMBRE
                ============================== */}

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


                {/* ==============================
                    EMAIL
                ============================== */}

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


                {/* ==============================
                    TELÉFONO
                ============================== */}

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


                {/* ==============================
                    CONTRASEÑA
                ============================== */}

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


                {/* ==============================
                    ROL
                ============================== */}

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


                {/* ==============================
                    ERROR
                ============================== */}

                {error && (

                    <p className="text-red-600 font-semibold">
                        {error}
                    </p>

                )}


                {/* ==============================
                    ÉXITO
                ============================== */}

                {mensaje && (

                    <p className="text-green-600 font-semibold">
                        {mensaje}
                    </p>

                )}


                {/* ==============================
                    BOTÓN
                ============================== */}

                <button
                    type="submit"
                    disabled={cargando}
                    className="bg-[#00B4E6] text-white rounded-xl py-3 font-semibold hover:opacity-90 disabled:opacity-50"
                >

                    {cargando
                        ? "Creando usuario..."
                        : "Crear usuario"
                    }

                </button>

            </form>

        </section>

    );

}
