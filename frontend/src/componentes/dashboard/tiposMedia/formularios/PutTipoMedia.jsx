"use client";

import { useState } from "react";

import {
    editarTiposMedia,
} from "@/adapters/catalogos";


export default function FormularioPutTipoMedia() {

    const [cargando, setCargando] = useState(false);

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");


    const [formulario, setFormulario] = useState({

        id_tipo_media: "",
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
        if (!formulario.id_tipo_media) {

            setError(
                "Ingresá el ID del tipo de media."
            );

            return;

        }


        /*
         * Creamos el body vacío.
         * Solamente agregaremos los campos
         * que el usuario haya completado.
         */

        const data = {};


        // Nombre

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

            const respuesta = await editarTiposMedia(
                Number(formulario.id_tipo_media),
                data
            );


            console.log(
                "Tipo de media editado:",
                respuesta
            );


            setMensaje(
                "Tipo de media editado correctamente."
            );


            // Limpiamos el formulario
            setFormulario({

                id_tipo_media: "",
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
                    "No tenés permisos para editar tipos de media."
                );

            } else if (error.status === 404) {

                setError(
                    "El tipo de media no existe."
                );

            } else {

                setError(
                    "No se pudo editar el tipo de media."
                );

            }

        } finally {

            setCargando(false);

        }

    }


    return (

        <section className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold text-[#4F5F4E] mb-6">
                Editar tipo de media
            </h2>


            <form
                onSubmit={manejarSubmit}
                className="flex flex-col gap-5"
            >


                {/* ID DE TIPO DE MEDIA */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        ID de tipo de media
                    </label>

                    <input
                        type="number"
                        name="id_tipo_media"
                        value={formulario.id_tipo_media}
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