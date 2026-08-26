"use client";

import { useEffect, useState } from "react";

import {
    obtenerTiposMedia,
} from "@/adapters/catalogos";

import {
    editarMedia,
} from "@/adapters/media";


export default function FormularioPutMedia() {

    const [tiposMedia, setTiposMedia] = useState([]);

    const [cargandoCatalogos, setCargandoCatalogos] = useState(true);
    const [cargando, setCargando] = useState(false);

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");


    const [formulario, setFormulario] = useState({

        id_media: "",
        id_prop: "",
        link: "",
        id_tipo_media: ""

    });


    useEffect(() => {

        async function cargarCatalogos() {

            try {

                setTiposMedia(await obtenerTiposMedia());

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


        if (!formulario.id_media) {

            setError(
                "Ingresá el ID de la media."
            );

            return;

        }


        const data = {};


        if (formulario.id_prop !== "") {

            data.id_prop =
                Number(formulario.id_prop);

        }


        if (formulario.link !== "") {

            data.link =
                formulario.link;

        }


        if (formulario.id_tipo_media !== "") {

            data.id_tipo_media =
                Number(formulario.id_tipo_media);

        }


        if (Object.keys(data).length === 0) {

            setError(
                "Tenés que completar al menos un campo para modificar."
            );

            return;

        }


        setCargando(true);


        try {

            const respuesta = await editarMedia(
                Number(formulario.id_media),
                data
            );


            console.log(
                "Media editada:",
                respuesta
            );


            setMensaje(
                "Media editada correctamente."
            );


            setFormulario({

                id_media: "",
                id_prop: "",
                link: "",
                id_tipo_media: ""

            });


        } catch (error) {

            console.error(error);


            if (error.status === 401) {

                setError(
                    "No estás autenticado."
                );

            } else if (error.status === 403) {

                setError(
                    "No tenés permisos para editar media."
                );

            } else if (error.status === 404) {

                setError(
                    "La media no existe."
                );

            } else {

                setError(
                    "No se pudo editar la media."
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
                Editar media
            </h2>


            <form
                onSubmit={manejarSubmit}
                className="flex flex-col gap-5"
            >


                {/* ID DE MEDIA */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        ID de media
                    </label>

                    <input
                        type="number"
                        name="id_media"
                        value={formulario.id_media}
                        onChange={manejarCambio}
                        required
                        min="1"
                        placeholder="id"
                        className="w-full border rounded-xl px-4 py-3"
                    />

                </div>


                {/* ID DE PROPIEDAD */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        ID de propiedad
                    </label>

                    <input
                        type="number"
                        name="id_prop"
                        value={formulario.id_prop}
                        onChange={manejarCambio}
                        min="1"
                        placeholder="Dejar vacío para no modificar"
                        className="w-full border rounded-xl px-4 py-3"
                    />

                </div>


                {/* LINK */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Link
                    </label>

                    <input
                        type="text"
                        name="link"
                        value={formulario.link}
                        onChange={manejarCambio}
                        placeholder="Dejar vacío para no modificar"
                        className="w-full border rounded-xl px-4 py-3"
                    />

                </div>


                {/* TIPO DE MEDIA */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Tipo de media
                    </label>

                    <select
                        name="id_tipo_media"
                        value={formulario.id_tipo_media}
                        onChange={manejarCambio}
                        className="w-full border rounded-xl px-4 py-3"
                    >

                        <option value="">
                            Dejar sin modificar
                        </option>

                        {tiposMedia.map((tipo) => (

                            <option
                                key={tipo.id_tipo_media}
                                value={tipo.id_tipo_media}
                            >
                                {tipo.nombre}
                            </option>

                        ))}

                    </select>

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