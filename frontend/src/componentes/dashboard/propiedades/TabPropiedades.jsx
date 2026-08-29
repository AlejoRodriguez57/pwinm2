"use client";

import { useEffect, useState } from "react";

import FormularioPostPropiedad from "@/componentes/dashboard/propiedades/formularios/PostPropiedad.jsx";
import FormularioDeletePropiedad from "@/componentes/dashboard/propiedades/formularios/DeletePropiedad.jsx";
import FormularioPutPropiedad from "@/componentes/dashboard/propiedades/formularios/PutPropiedad.jsx";
import GetPropiedades from "@/componentes/dashboard/propiedades/GetPropiedades.jsx";

import { obtenerPropiedadesConMedia } from "@/adapters/propiedades";

import {
    obtenerOperaciones,
    obtenerEstados,
    obtenerTiposPropiedad,
    obtenerUbicaciones,
    obtenerTiposMedia
} from "@/adapters/catalogos";

import { mapPropiedades } from "@/mappers/propiedadMapper.js";


export default function TabPropiedades() {

    const [propiedades, setPropiedades] = useState([]);

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const [formularioPostPropiedad, setFormularioPostPropiedad] = useState(false);
    const [formularioPutPropiedad, setFormularioPutPropiedad] = useState(false);
    const [formularioDeletePropiedad, setFormularioDeletePropiedad] = useState(false);


    useEffect(() => {

        let activo = true;


        async function cargarPropiedades(esCargaInicial = false) {

            try {

                if (esCargaInicial) {
                    setCargando(true);
                }

                const [
                    propiedadesBackend,
                    operaciones,
                    estados,
                    tiposProp,
                    ubicaciones,
                    tiposMedia,
                ] = await Promise.all([

                    obtenerPropiedadesConMedia(),
                    obtenerOperaciones(),
                    obtenerEstados(),
                    obtenerTiposPropiedad(),
                    obtenerUbicaciones(),
                    obtenerTiposMedia(),

                ]);


                const propiedadesNuevas = mapPropiedades(
                    propiedadesBackend,
                    operaciones,
                    estados,
                    tiposProp,
                    ubicaciones,
                    tiposMedia
                );


                if (!activo) return;


                // Solamente actualizamos el estado si realmente hubo un cambio.
                setPropiedades(actuales => {

                    if (
                        JSON.stringify(actuales) ===
                        JSON.stringify(propiedadesNuevas)
                    ) {
                        return actuales;
                    }

                    return propiedadesNuevas;

                });


            } catch (error) {

                console.error(error);

                if (activo) {
                    setError("No se pudieron cargar las propiedades.");
                }

            } finally {

                if (activo && esCargaInicial) {
                    setCargando(false);
                }

            }

        }

        cargarPropiedades(true);

        const intervalo = setInterval(() => {

            cargarPropiedades(false);

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
                    Cargando propiedades...
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
                    Propiedades
                </h2>

                <button
                    onClick={() => setFormularioPostPropiedad(!formularioPostPropiedad)}
                    className="mb-6 bg-[#00B4E6] text-white p-3 rounded-2xl hover:bg-[#0078B4] transition-colors"
                > Añadir propiedad </button>

                <button
                    onClick={() => setFormularioPutPropiedad(!formularioPutPropiedad)}
                    className="mb-6 bg-[#FFAA14] text-white p-3 rounded-2xl hover:bg-[#E68200] transition-colors"
                > Editar propiedad </button>

                <button
                    onClick={() => setFormularioDeletePropiedad(!formularioDeletePropiedad)}
                    className="mb-6 bg-[#DC1414] text-white p-3 rounded-2xl hover:bg-[#AA0505] transition-colors"
                > Eliminar propiedad </button>

            </div>

            {formularioPostPropiedad && (<FormularioPostPropiedad />)}
            {formularioPutPropiedad && (<FormularioPutPropiedad />)}
            {formularioDeletePropiedad && (<FormularioDeletePropiedad />)}

            <GetPropiedades propiedades={propiedades} />

        </section>

    );
}