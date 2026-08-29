"use client";

import { useEffect, useState } from "react";

import FormularioPostTipoMedia from "@/componentes/dashboard/tiposMedia/formularios/PostTipoMedia.jsx";
import FormularioDeleteTipoMedia from "@/componentes/dashboard/tiposMedia/formularios/DeleteTipoMedia.jsx";
import FormularioPutTipoMedia from "@/componentes/dashboard/tiposMedia/formularios/PutTipoMedia.jsx";
import GetTiposMedia from "@/componentes/dashboard/tiposMedia/GetTiposMedia.jsx";

import {
    obtenerTiposMedia
} from "@/adapters/catalogos";


export default function TabTiposMedia() {

    const [tiposMedia, setTiposMedia] = useState([]);

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const [formularioPostTipoMedia, setFormularioPostTipoMedia] = useState(false);
    const [formularioPutTipoMedia, setFormularioPutTipoMedia] = useState(false);
    const [formularioDeleteTipoMedia, setFormularioDeleteTipoMedia] = useState(false);


    useEffect(() => {

        let activo = true;


        async function cargarTiposMedia(esCargaInicial = false) {

            try {

                if (esCargaInicial) {
                    setCargando(true);
                }

                const tiposMediaNuevos = await obtenerTiposMedia();


                if (!activo) return;


                // Solo actualiza el estado si realmente hubo cambios.
                setTiposMedia(actuales => {

                    if (
                        JSON.stringify(actuales) ===
                        JSON.stringify(tiposMediaNuevos)
                    ) {
                        return actuales;
                    }

                    return tiposMediaNuevos;

                });


            } catch (error) {

                console.error(error);

                if (activo) {
                    setError("No se pudieron cargar los tipos de media.");
                }

            } finally {

                if (activo && esCargaInicial) {
                    setCargando(false);
                }

            }

        }


        // Primera carga
        cargarTiposMedia(true);


        // Comprobación silenciosa de cambios
        const intervalo = setInterval(() => {

            cargarTiposMedia(false);

        }, 10000);


        return () => {

            activo = false;
            clearInterval(intervalo);

        };

    }, []);


    if (cargando) {

        return (
            <section className="bg-white rounded-2xl shadow-lg p-6">
                <p>
                    Cargando tipos de media...
                </p>
            </section>
        );

    }


    if (error) {

        return (
            <section className="bg-white rounded-2xl shadow-lg p-6">
                <p className="text-red-500">
                    {error}
                </p>
            </section>
        );

    }


    return (

        <section className="bg-white rounded-2xl shadow-lg p-6">

            <div className="flex items-center gap-6">

                <h2 className="text-2xl font-bold text-[#4F5F4E] mb-6">
                    Tipos de media
                </h2>


                <button
                    onClick={() => setFormularioPostTipoMedia(!formularioPostTipoMedia)}
                    className="mb-6 bg-[#00B4E6] text-white p-3 rounded-2xl hover:bg-[#0078B4] transition-colors"
                >
                    Añadir tipo de media
                </button>


                <button
                    onClick={() => setFormularioPutTipoMedia(!formularioPutTipoMedia)}
                    className="mb-6 bg-[#FFAA14] text-white p-3 rounded-2xl hover:bg-[#E68200] transition-colors"
                >
                    Editar tipo de media
                </button>


                <button
                    onClick={() => setFormularioDeleteTipoMedia(!formularioDeleteTipoMedia)}
                    className="mb-6 bg-[#DC1414] text-white p-3 rounded-2xl hover:bg-[#AA0505] transition-colors"
                >
                    Eliminar tipo de media
                </button>

            </div>


            {formularioPostTipoMedia && (
                <FormularioPostTipoMedia />
            )}

            {formularioPutTipoMedia && (
                <FormularioPutTipoMedia />
            )}

            {formularioDeleteTipoMedia && (
                <FormularioDeleteTipoMedia />
            )}


            <GetTiposMedia tiposMedia={tiposMedia} />

        </section>

    );

}