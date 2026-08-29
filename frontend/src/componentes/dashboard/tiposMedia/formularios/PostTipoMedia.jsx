"use client";

import { useState } from "react";

import { crearTiposMedia } from "@/adapters/catalogos";


export default function FormularioPostTipoMedia() {

    const [nombre, setNombre] = useState("");

    const [cargando, setCargando] = useState(false);

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");


    function manejarCambio(e) {

        setNombre(e.target.value);

    }


    async function manejarSubmit(e) {

        e.preventDefault();

        setError("");
        setMensaje("");


        if (!nombre.trim()) {

            setError(
                "Ingresá un nombre para el tipo de media."
            );

            return;

        }


        setCargando(true);


        try {

            const data = {
                nombre: nombre.trim()
            };


            const respuesta = await crearTiposMedia(data);


            console.log(
                "Tipo de media creado:",
                respuesta
            );


            setMensaje(
                "Tipo de media creado correctamente."
            );


            setNombre("");


        } catch (error) {

            console.error(error);


            if (error.status === 401) {

                setError(
                    "No estás autenticado."
                );

            } else if (error.status === 403) {

                setError(
                    "No tenés permisos para añadir tipos de media."
                );

            } else {

                setError(
                    "No se pudo añadir el tipo de media."
                );

            }

        } finally {

            setCargando(false);

        }

    }


    return (

        <section className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold text-[#4F5F4E] mb-6">
                Añadir tipo de media
            </h2>


            <form
                onSubmit={manejarSubmit}
                className="flex flex-col gap-5"
            >

                {/* Nombre */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Nombre
                    </label>

                    <input
                        type="text"
                        value={nombre}
                        onChange={manejarCambio}
                        required
                        maxLength={150}
                        placeholder="Nombre"
                        className="w-full border rounded-xl px-4 py-3"
                    />

                </div>


                {error && (

                    <p className="text-red-500 text-sm">
                        {error}
                    </p>

                )}


                {mensaje && (

                    <p className="text-green-600 text-sm">
                        {mensaje}
                    </p>

                )}


                <button
                    type="submit"
                    disabled={cargando}
                    className="bg-[#00B4E6] text-white rounded-xl py-3 font-semibold hover:opacity-90 disabled:opacity-50"
                >

                    {cargando
                        ? "Añadiendo..."
                        : "Añadir tipo de media"}

                </button>


            </form>

        </section>

    );

}