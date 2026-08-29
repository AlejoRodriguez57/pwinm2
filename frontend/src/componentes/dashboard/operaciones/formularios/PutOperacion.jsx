"use client";

import { useState } from "react";

import {
    editarOperaciones,
} from "@/adapters/catalogos";


export default function FormularioPutOperacion() {

    const [cargando, setCargando] = useState(false);

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");


    const [formulario, setFormulario] = useState({

        id_operacion: "",
        nombre: ""

    });


    function manejarCambio(e) {

        const { name, value } = e.target;

        setFormulario((anterior) => ({
            ...anterior,
            [name]: value,
        }));

    }


    async function manejarSubmit(e) {

        e.preventDefault();

        setError("");
        setMensaje("");


        // Verificamos que haya ID
        if (!formulario.id_operacion) {

            setError(
                "Ingresá el ID de la operacion."
            );

            return;

        }


        /*
         * Creamos el body vacío.
         * Solamente agregaremos los campos
         * que el usuario haya completado.
         */

        const data = {};


        if (formulario.nombre !== "") {

            data.nombre = formulario.nombre;

        }


        // Si no modificó ningún campo
        if (Object.keys(data).length === 0) {

            setError(
                "Tenés que completar al menos un campo para modificar."
            );

            return;

        }


        setCargando(true);


        try {

            const respuesta = await editarOperaciones(
                Number(formulario.id_operacion),
                data
            );


            console.log(
                "Operacion editada:",
                respuesta
            );


            setMensaje(
                "Operacion editada correctamente."
            );


            // Limpiamos el formulario
            setFormulario({

                id_operacion: "",
                nombre: ""

            });


        } catch (error) {

            console.error(error);


            if (error.status === 401) {

                setError(
                    "No estás autenticado."
                );

            } else if (error.status === 403) {

                setError(
                    "No tenés permisos para editar operaciones."
                );

            } else if (error.status === 404) {

                setError(
                    "La operacion no existe."
                );

            } else {

                setError(
                    "No se pudo editar la operacion."
                );

            }

        } finally {

            setCargando(false);

        }

    }


    return (

        <section className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold text-[#4F5F4E] mb-6">
                Editar operacion
            </h2>


            <form
                onSubmit={manejarSubmit}
                className="flex flex-col gap-5"
            >


                {/* ID DE OPERACION */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        ID de operacion
                    </label>

                    <input
                        type="number"
                        name="id_operacion"
                        value={formulario.id_operacion}
                        onChange={manejarCambio}
                        required
                        min="1"
                        placeholder="id"
                        className="w-full border rounded-xl px-4 py-3"
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
                        placeholder="Dejar vacío para no modificar"
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
                    className="bg-[#FFAA14] text-white rounded-xl py-3 font-semibold hover:opacity-90 disabled:opacity-50"
                >
                    {cargando
                        ? "Guardando..."
                        : "Guardar cambios"}
                </button>

            </form>

        </section>

    );

}