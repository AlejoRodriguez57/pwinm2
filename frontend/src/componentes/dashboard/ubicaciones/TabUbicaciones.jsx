"use client";

import { useEffect, useState } from "react";

import FormularioPostUbicacion from "@/componentes/dashboard/ubicaciones/formularios/PostUbicacion.jsx";
import FormularioDeleteUbicacion from "@/componentes/dashboard/ubicaciones/formularios/DeleteUbicacion.jsx";
import FormularioPutUbicacion from "@/componentes/dashboard/ubicaciones/formularios/PutUbicacion.jsx";
import GetUbicaciones from "@/componentes/dashboard/ubicaciones/GetUbicaciones.jsx";

import { obtenerUbicaciones } from "@/adapters/catalogos";


export default function TabUbicaciones() {

    const [ubicaciones, setUbicaciones] = useState([]);

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const [formularioPostUbicacion, setFormularioPostUbicacion] = useState(false);
    const [formularioPutUbicacion, setFormularioPutUbicacion] = useState(false);
    const [formularioDeleteUbicacion, setFormularioDeleteUbicacion] = useState(false);


    useEffect(() => {

        let activo = true;


        async function cargarUbicaciones(esCargaInicial = false) {

            try {

                if (esCargaInicial) {
                    setCargando(true);
                }

                const ubicacionesNuevas = await obtenerUbicaciones();


                if (!activo) return;


                // Solo actualiza el estado si realmente hubo cambios.
                setUbicaciones(actuales => {

                    if (
                        JSON.stringify(actuales) ===
                        JSON.stringify(ubicacionesNuevas)
                    ) {
                        return actuales;
                    }

                    return ubicacionesNuevas;

                });


            } catch (error) {

                console.error(error);

                if (activo) {
                    setError("No se pudieron cargar las ubicaciones.");
                }

            } finally {

                if (activo && esCargaInicial) {
                    setCargando(false);
                }

            }

        }


        // Primera carga
        cargarUbicaciones(true);


        // Comprobación silenciosa de cambios
        const intervalo = setInterval(() => {

            cargarUbicaciones(false);

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
                    Cargando ubicaciones...
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
                    Ubicaciones
                </h2>


                <button
                    onClick={() => setFormularioPostUbicacion(!formularioPostUbicacion)}
                    className="mb-6 bg-[#00B4E6] text-white p-3 rounded-2xl hover:bg-[#0078B4] transition-colors"
                >Añadir ubicacion</button>


                <button
                    onClick={() => setFormularioPutUbicacion(!formularioPutUbicacion)}
                    className="mb-6 bg-[#FFAA14] text-white p-3 rounded-2xl hover:bg-[#E68200] transition-colors"
                >Editar ubicacion</button>


                <button
                    onClick={() => setFormularioDeleteUbicacion(!formularioDeleteUbicacion)}
                    className="mb-6 bg-[#DC1414] text-white p-3 rounded-2xl hover:bg-[#AA0505] transition-colors"
                >Eliminar ubicacion</button>

            </div>


            {formularioPostUbicacion && (<FormularioPostUbicacion />)}

            {formularioPutUbicacion && (<FormularioPutUbicacion />)}

            {formularioDeleteUbicacion && (<FormularioDeleteUbicacion />)}

            <GetUbicaciones ubicaciones={ubicaciones} />

        </section>

    );

}
