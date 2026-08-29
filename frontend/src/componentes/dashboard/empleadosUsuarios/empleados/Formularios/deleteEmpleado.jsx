"use client";

import { useState } from "react";

import {
    eliminarEmpleado,
} from "@/adapters/empleados";


export default function DeleteEmpleado() {

    const [id, setId] = useState("");

    const [cargando, setCargando] = useState(false);

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");


    async function manejarEliminar(e) {

        e.preventDefault();

        setError("");
        setMensaje("");


        const idEmpleado = Number(id);


        if (!idEmpleado) {

            setError(
                "Ingresá un ID de empleado válido."
            );

            return;

        }


        const confirmar = window.confirm(
            `¿Seguro que querés eliminar el empleado ${idEmpleado}?`
        );


        if (!confirmar) {
            return;
        }


        setCargando(true);


        try {

            await eliminarEmpleado(idEmpleado);


            setMensaje(
                `El empleado ${idEmpleado} fue eliminado correctamente.`
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
                    "No tenés permisos para eliminar empleados."
                );

            } else if (error.status === 404) {

                setError(
                    "El empleado no existe."
                );

            } else {

                setError(
                    "No se pudo eliminar el empleado."
                );

            }

        } finally {

            setCargando(false);

        }

    }


    return (

        <section className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold text-[#4F5F4E] mb-6">
                Eliminar empleado
            </h2>


            <form
                onSubmit={manejarEliminar}
                className="flex flex-col gap-5"
            >

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        ID de empleado
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
                        : "Eliminar empleado"}
                </button>

            </form>

        </section>

    );

}