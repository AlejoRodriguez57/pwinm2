"use client";

import { useEffect, useState } from "react";

import FormularioPostMedia from "@/componentes/dashboard/media/formularios/PostMedia.jsx";
import FormularioDeleteMedia from "@/componentes/dashboard/media/formularios/DeleteMedia.jsx";
import FormularioPutMedia from "@/componentes/dashboard/media/formularios/PutMedia.jsx";

import GetMedia from "@/componentes/dashboard/media/GetMedia.jsx";

import {
    obtenerMedia,
} from "@/adapters/media";


export default function TabMedia() {

    const [media, setMedia] = useState([]);

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const [formularioPostMedia, setFormularioPostMedia] = useState(false);
    const [formularioPutMedia, setFormularioPutMedia] = useState(false);
    const [formularioDeleteMedia, setFormularioDeleteMedia] = useState(false);


    useEffect(() => {

        async function cargarMedia(esCargaInicial = false) {

            try {

                if (esCargaInicial) {
                    setCargando(true);
                }

                const nuevaMedia = await obtenerMedia();


                setMedia(actual => {

                    // Si la media no cambió, conserva el estado actual.
                    if (
                        JSON.stringify(actual) ===
                        JSON.stringify(nuevaMedia)
                    ) {
                        return actual;
                    }

                    // Solo actualiza si hubo un cambio real.
                    return nuevaMedia;

                });


            } catch (error) {

                console.error(error);

                setError(
                    "No se pudo cargar la media."
                );

            } finally {

                if (esCargaInicial) {
                    setCargando(false);
                }

            }

        }


        // Primera carga
        cargarMedia(true);


        // Actualizaciones silenciosas cada 10 segundos
        const intervalo = setInterval(() => {
            cargarMedia(false);
        }, 10000);


        return () => clearInterval(intervalo);

    }, []);


    return (

        <section className="bg-white rounded-2xl shadow-lg p-6">

            <div className="flex items-center gap-6">

                <h2 className="text-2xl font-bold text-[#4F5F4E] mb-6">
                    Media
                </h2>


                <button
                    onClick={() => setFormularioPostMedia(!formularioPostMedia)}
                    className="mb-6 bg-[#00B4E6] text-white p-3 rounded-2xl border border-blue-[#00B4E6] hover:bg-[#0078B4] transition-colors"
                >Añadir media</button>


                <button
                    onClick={() => setFormularioPutMedia(!formularioPutMedia)}
                    className="mb-6 bg-[#FFAA14] text-white p-3 rounded-2xl border border-blue-[#FFAA14] hover:bg-[#E68200] transition-colors"
                >Editar media</button>


                <button
                    onClick={() => setFormularioDeleteMedia(!formularioDeleteMedia)}
                    className="mb-6 bg-[#DC1414] text-white p-3 rounded-2xl border border-blue-[#DC1414] hover:bg-[#AA0505] transition-colors"
                >Eliminar media</button>

            </div>


            {formularioPostMedia && <FormularioPostMedia />}
            {formularioPutMedia && <FormularioPutMedia />}
            {formularioDeleteMedia && <FormularioDeleteMedia />}


            {cargando ? (

                <p>
                    Cargando media...
                </p>

            ) : error ? (

                <p className="text-red-500">
                    {error}
                </p>

            ) : (

                <GetMedia media={media} />

            )}

        </section>

    );

}