"use client";

import { useEffect, useState } from "react";

import {
    obtenerTiposMedia,
} from "@/adapters/catalogos";

import {
    crearMedia,
} from "@/adapters/media";


export default function FormularioPostMedia() {

    const [tiposMedia, setTiposMedia] = useState([]);

    const [cargandoCatalogos, setCargandoCatalogos] = useState(true);
    const [cargando, setCargando] = useState(false);

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");


    const [formulario, setFormulario] = useState({

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
        setCargando(true);


        try {

            const data = {

                id_prop: Number(formulario.id_prop),
                link: formulario.link,
                id_tipo_media: Number(formulario.id_tipo_media)

            };


            const respuesta = await crearMedia(data);


            console.log(
                "Media creada:",
                respuesta
            );


            setMensaje(
                "Media creada correctamente."
            );


            setFormulario({

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
                    "No tenés permisos para añadir media."
                );

            } else {

                setError(
                    "No se pudo añadir la media."
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
                Añadir media
            </h2>


            <form
                onSubmit={manejarSubmit}
                className="flex flex-col gap-5"
            >


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
                        required
                        min="1"
                        placeholder="id"
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
                        required
                        placeholder="Link de la imagen o video"
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
                        required
                        className="w-full border rounded-xl px-4 py-3"
                    >

                        <option value="">
                            Seleccionar tipo de media
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
                    className="bg-[#00B4E6] text-white rounded-xl py-3 font-semibold hover:opacity-90 disabled:opacity-50"
                >
                    {cargando
                        ? "Añadiendo..."
                        : "Añadir media"}
                </button>


            </form>

        </section>

    );

}