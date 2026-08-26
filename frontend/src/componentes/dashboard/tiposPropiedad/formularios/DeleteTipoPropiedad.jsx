"use client";

import { useState } from "react";

import { eliminarTiposPropiedad } from "@/adapters/catalogos";


export default function FormularioDeleteTipoPropiedad() {

    const [id, setId] = useState("");

    const [cargando, setCargando] = useState(false);

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");


    async function manejarEliminar(e) {

        e.preventDefault();

        setError("");
        setMensaje("");


        const idTipoPropiedad = Number(id);

        if (!idTipoPropiedad) {

            setError(
                "Ingresá un ID de tipo de propiedad válido."
            );

            return;

        }


        const confirmar = window.confirm(
            `¿Seguro que querés eliminar la ubicacion ${idTipoPropiedad}?`
        );

        if (!confirmar) {
            return;
        }


        setCargando(true);


        try {

            await eliminarTiposPropiedad(idTipoPropiedad);

            setMensaje(
                `La ubicacion ${idTipoPropiedad} fue eliminada correctamente.`
            );

            setId("");


        } catch (error) {

            console.error(error);


            if (error.status === 401) {

                setError(
                    "No estás autenticado."
                );

            } else if (error.status === 403) {

                setError(
                    "No tenés permisos para eliminar ubicacicones."
                );

            } else if (error.status === 404) {

                setError(
                    "La ubicacion no existe."
                );

            } else if (error.status === 500) {

            setError(
                "No se puede eliminar esta ubicación porque está asociada a una o más propiedades."
            );


            } else {

                setError(
                    "No se pudo eliminar la ubicacion."
                );

            }

        } finally {

            setCargando(false);

        }

    }


    return (

        <section className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold text-[#4F5F4E] mb-6">
                Eliminar tipo de propiedad
            </h2>


            <form
                onSubmit={manejarEliminar}
                className="flex flex-col gap-5"
            >

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        ID de tipo de propiedad
                    </label>

                    <input
                        type="number"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                        min="1"
                        className="w-full border rounded-xl px-4 py-3"
                        placeholder="id"
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
                    className="bg-[#DC1414] text-white rounded-xl py-3 font-semibold hover:opacity-90 disabled:opacity-50"
                >
                    {cargando
                        ? "Eliminando..."
                        : "Eliminar tipo de propiedad"}
                </button>

            </form>

        </section>

    );
}