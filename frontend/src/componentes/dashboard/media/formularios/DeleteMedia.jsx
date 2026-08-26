"use client";

import { useState } from "react";

import {
    eliminarMedia,
} from "@/adapters/media";


export default function FormularioDeleteMedia() {

    const [id, setId] = useState("");

    const [cargando, setCargando] = useState(false);

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");


    async function manejarEliminar(e) {

        e.preventDefault();

        setError("");
        setMensaje("");


        const idMedia = Number(id);


        if (!idMedia) {

            setError(
                "Ingresá un ID de media válido."
            );

            return;

        }


        const confirmar = window.confirm(
            `¿Seguro que querés eliminar la media ${idMedia}?`
        );


        if (!confirmar) {
            return;
        }


        setCargando(true);


        try {

            await eliminarMedia(idMedia);


            setMensaje(
                `La media ${idMedia} fue eliminada correctamente.`
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
                    "No tenés permisos para eliminar media."
                );

            } else if (error.status === 404) {

                setError(
                    "La media no existe."
                );

            } else {

                setError(
                    "No se pudo eliminar la media."
                );

            }

        } finally {

            setCargando(false);

        }

    }


    return (

        <section className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold text-[#4F5F4E] mb-6">
                Eliminar media
            </h2>


            <form
                onSubmit={manejarEliminar}
                className="flex flex-col gap-5"
            >

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        ID de media
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
                        : "Eliminar media"}
                </button>


            </form>

        </section>

    );

}