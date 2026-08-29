"use client";

import { useState } from "react";

import {
eliminarEmpleadosYUsuario
} from "@/adapters/empleados";

export default function DeleteEmpleadosYUsuarios() {

    const [id, setId] = useState("");

    const [cargando, setCargando] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");


    async function manejarEliminar(e) {

        e.preventDefault();

        setError("");
        setMensaje("");


        const idEmpleado = Number(id);


        if (!idEmpleado || idEmpleado < 1) {

            setError(
                "Ingresá un ID de empleado válido."
            );

            return;

        }


        const confirmar = window.confirm(
            `¿Seguro que querés eliminar el empleado ${idEmpleado} y su usuario asociado?`
        );


        if (!confirmar) {

            return;

        }


        setCargando(true);


        try {

            console.log(
                "Eliminando empleado:",
                idEmpleado
            );


            const respuesta =
                await eliminarEmpleadosYUsuario(
                    idEmpleado
                );


            console.log(
                "Empleado eliminado:",
                respuesta
            );


            setMensaje(
                `El empleado ${idEmpleado} y su usuario fueron eliminados correctamente.`
            );


            setId("");


        } catch (error) {

            console.error(
                "Error eliminando empleado:",
                error
            );


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
                    "No se encontró el empleado."
                );

            } else {

                setError(
                    error.message ||
                    "No se pudo eliminar el empleado y su usuario."
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
                        onChange={(e) =>
                            setId(e.target.value)
                        }
                        required
                        min="1"
                        disabled={cargando}
                        className="w-full border rounded-xl px-4 py-3"
                        placeholder="ID"
                    />

                </div>


                <p className="text-sm text-gray-600">
                    Se eliminará también el usuario asociado al empleado.
                </p>


                {error && (

                    <p className="text-red-600 font-semibold">
                        {error}
                    </p>

                )}


                {mensaje && (

                    <p className="text-green-600 font-semibold">
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
                        : "Eliminar empleado"
                    }
                </button>

            </form>

        </section>

    );

}
