"use client";

import { useEffect, useState } from "react";

import {
    editarUbicaciones,
} from "@/adapters/catalogos";

export default function FormularioPutUbicacion() {

    const [ubicaciones, setUbicaciones] = useState([]);

    const [cargandoCatalogos, setCargandoCatalogos] = useState(true);
    const [cargando, setCargando] = useState(false);

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    const [formulario, setFormulario] = useState({

        id_ubicacion: "",
        nombre: ""

    });


    // Cargar los datos necesarios para los select
    useEffect(() => {

        async function cargarCatalogos() {

            try {

                setUbicaciones(await editarUbicaciones());

            } catch (error) {

                console.error(error);

                setError(
                    "No se pudieron cargar los datos necesarios."
                );

            } finally {

                setCargandoCatalogos(false);

            }

        }

        cargarCatalogos();

    }, []);


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
        if (!formulario.id_ubicacion) {

            setError(
                "Ingresá el ID de la ubicacion."
            );

            return;
        }


        /*
         * Creamos el body vacío.
         * Solamente agregaremos los campos
         * que el usuario haya completado.
         */

        const data = {};

        // Relaciones

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

            const respuesta = await editarUbicaciones(
                Number(formulario.id_ubicacion),
                data
            );


            console.log(
                "Ubicacion editada:",
                respuesta
            );


            setMensaje(
                "Ubicacion editada correctamente."
            );


            // Limpiamos el formulario
            setFormulario({

                id_ubicacion: "",
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
                    "No tenés permisos para editar ubicaciones."
                );

            } else if (error.status === 404) {

                setError(
                    "La ubicacion no existe."
                );

            } else {

                setError(
                    "No se pudo editar la ubicacion."
                );

            }

        } finally {

            setCargando(false);

        }

    }


    if (cargandoCatalogos) {

        return (
            <p>
                Cargando datos...
            </p>
        );

    }


    return (

        <section className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold text-[#4F5F4E] mb-6">
                Editar ubicacion
            </h2>


            <form
                onSubmit={manejarSubmit}
                className="flex flex-col gap-5"
            >


                {/* ID DE Ubicacion */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        ID de ubicacion
                    </label>

                    <input
                        type="number"
                        name="id_ubicacion"
                        value={formulario.id_ubicacion}
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
                        nombre
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