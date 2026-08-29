"use client";

import { useState } from "react";

import {
    eliminarUsuarios
} from "@/adapters/usuarios";


export default function DeleteUsuarios() {

    const [id, setId] = useState("");
    const [cargando, setCargando] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");


    async function manejarEliminar(e) {

        e.preventDefault();

        setError("");
        setMensaje("");


        const idUsuario = Number(id);


        if (!idUsuario || idUsuario < 1) {

            setError(
                "Ingresá un ID de usuario válido."
            );

            return;

        }


        const confirmar = window.confirm(
            `¿Seguro que querés eliminar el usuario ${idUsuario}?`
        );


        if (!confirmar) {
            return;
        }


        setCargando(true);


        try {

            await eliminarUsuarios(idUsuario);


            setMensaje(
                `Usuario ${idUsuario} eliminado correctamente.`
            );


            setId("");


        } catch (error) {

            console.error(error);


            if (error.status === 401) {

                setError("No estás autenticado.");

            } else if (error.status === 403) {

                setError(
                    "No tenés permisos para eliminar usuarios."
                );

            } else if (error.status === 404) {

                setError(
                    "Usuario no encontrado."
                );

            } else {

                setError(
                    error.message ||
                    "No se pudo eliminar el usuario."
                );

            }

        } finally {

            setCargando(false);

        }

    }


    return (

        <section className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold text-[#4F5F4E] mb-6">
                Eliminar usuario
            </h2>


            <form
                onSubmit={manejarEliminar}
                className="flex flex-col gap-5"
            >

                <input
                    type="number"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    required
                    min="1"
                    disabled={cargando}
                    className="w-full border rounded-xl px-4 py-3"
                    placeholder="ID"
                />


                {error && (
                    <p className="text-red-500">
                        {error}
                    </p>
                )}


                {mensaje && (
                    <p className="text-green-600">
                        {mensaje}
                    </p>
                )}


                <button
                    type="submit"
                    disabled={cargando}
                    className="bg-[#DC1414] text-white rounded-xl py-3 font-semibold disabled:opacity-50"
                >
                    {cargando
                        ? "Eliminando..."
                        : "Eliminar usuario"}
                </button>

            </form>

        </section>

    );

}