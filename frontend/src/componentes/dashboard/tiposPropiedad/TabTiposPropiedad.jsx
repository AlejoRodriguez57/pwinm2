"use client";

import { useEffect, useState } from "react";

import FormularioPostTipoPropiedad from "@/componentes/dashboard/tiposPropiedad/formularios/PostTipoPropiedad.jsx";
import FormularioDeleteTipoPropiedad from "@/componentes/dashboard/tiposPropiedad/formularios/DeleteTipoPropiedad.jsx";
import FormularioPutTipoPropiedad from "@/componentes/dashboard/tiposPropiedad/formularios/PutTipoPropiedad.jsx";

import GetTiposPropiedad from "@/componentes/dashboard/tiposPropiedad/GetTiposPropiedad.jsx";

import {
    obtenerTiposPropiedad,
} from "@/adapters/catalogos";


export default function TabTiposPropiedad() {

    const [tiposPropiedad, setTiposPropiedad] = useState([]);

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const [formularioPostTipoPropiedad, setFormularioPostTipoPropiedad] = useState(false);
    const [formularioPutTipoPropiedad, setFormularioPutTipoPropiedad] = useState(false);
    const [formularioDeleteTipoPropiedad, setFormularioDeleteTipoPropiedad] = useState(false);


    useEffect(() => {

        async function cargarTiposPropiedad(esCargaInicial = false) {

            try {

                if (esCargaInicial) {
                    setCargando(true);
                }

                const nuevosTiposPropiedad = await obtenerTiposPropiedad();


                setTiposPropiedad(actuales => {

                    // Si no cambió nada, conserva el estado actual.
                    if (
                        JSON.stringify(actuales) ===
                        JSON.stringify(nuevosTiposPropiedad)
                    ) {
                        return actuales;
                    }

                    // Solo actualiza si realmente hubo un cambio.
                    return nuevosTiposPropiedad;

                });


            } catch (error) {

                console.error(error);

                setError(
                    "No se pudieron cargar los tipos de propiedad."
                );

            } finally {

                if (esCargaInicial) {
                    setCargando(false);
                }

            }

        }


        // Primera carga
        cargarTiposPropiedad(true);


        // Actualizaciones silenciosas
        const intervalo = setInterval(() => {
            cargarTiposPropiedad(false);
        }, 10000);


        return () => clearInterval(intervalo);

    }, []);


    return (

        <section className="bg-white rounded-2xl shadow-lg p-6">

            <div className="flex items-center gap-6">

                <h2 className="text-2xl font-bold text-[#4F5F4E] mb-6">Tipos de propiedad</h2>


                <button
                    onClick={() => setFormularioPostTipoPropiedad(!formularioPostTipoPropiedad)}
                    className="mb-6 bg-[#00B4E6] text-white p-3 rounded-2xl hover:bg-[#0078B4] transition-colors"
                >Añadir tipo</button>


                <button
                    onClick={() => setFormularioPutTipoPropiedad(!formularioPutTipoPropiedad)}
                    className="mb-6 bg-[#FFAA14] text-white p-3 rounded-2xl hover:bg-[#E68200] transition-colors"
                >Editar tipo</button>


                <button
                    onClick={() => setFormularioDeleteTipoPropiedad(!formularioDeleteTipoPropiedad)}
                    className="mb-6 bg-[#DC1414] text-white p-3 rounded-2xl hover:bg-[#AA0505] transition-colors"
                >Eliminar tipo</button>

            </div>


            {formularioPostTipoPropiedad &&<FormularioPostTipoPropiedad />}
            {formularioPutTipoPropiedad &&<FormularioPutTipoPropiedad />}
            {formularioDeleteTipoPropiedad &&<FormularioDeleteTipoPropiedad />}


            {cargando ? (

                <p>
                    Cargando tipos de propiedad...
                </p>

            ) : error ? (

                <p className="text-red-500">
                    {error}
                </p>

            ) : (

                <GetTiposPropiedad
                    tiposPropiedad={tiposPropiedad}
                />

            )}

        </section>

    );

}
