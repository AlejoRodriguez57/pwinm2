"use client";

import { useEffect, useState } from "react";

import FormularioPostEstado from "@/componentes/dashboard/estados/formularios/PostEstado.jsx";
import FormularioDeleteEstado from "@/componentes/dashboard/estados/formularios/DeleteEstado.jsx";
import FormularioPutEstado from "@/componentes/dashboard/estados/formularios/PutEstado.jsx";
import GetEstados from "@/componentes/dashboard/estados/GetEstados.jsx";

import { obtenerEstados } from "@/adapters/catalogos";


export default function TabEstados() {

    const [estados, setEstados] = useState([]);

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const [formularioPostEstado, setFormularioPostEstado] = useState(false);
    const [formularioPutEstado, setFormularioPutEstado] = useState(false);
    const [formularioDeleteEstado, setFormularioDeleteEstado] = useState(false);


    useEffect(() => {

        let activo = true;


        async function cargarEstados(esCargaInicial = false) {

            try {

                if (esCargaInicial) {
                    setCargando(true);
                }

                const estadosNuevos = await obtenerEstados();


                if (!activo) return;


                setEstados(actuales => {

                    if (
                        JSON.stringify(actuales) ===
                        JSON.stringify(estadosNuevos)
                    ) {
                        return actuales;
                    }

                    return estadosNuevos;

                });


            } catch (error) {

                console.error(error);

                if (activo) {
                    setError("No se pudieron cargar los estados.");
                }

            } finally {

                if (activo && esCargaInicial) {
                    setCargando(false);
                }

            }

        }


        // Primera carga
        cargarEstados(true);


        // Comprobación silenciosa de cambios
        const intervalo = setInterval(() => {

            cargarEstados(false);

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
                    Cargando estados...
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
                    Estados
                </h2>


                <button
                    onClick={() => setFormularioPostEstado(!formularioPostEstado)}
                    className="mb-6 bg-[#00B4E6] text-white p-3 rounded-2xl hover:bg-[#0078B4] transition-colors"
                >
                    Añadir estado
                </button>


                <button
                    onClick={() => setFormularioPutEstado(!formularioPutEstado)}
                    className="mb-6 bg-[#FFAA14] text-white p-3 rounded-2xl hover:bg-[#E68200] transition-colors"
                >
                    Editar estado
                </button>


                <button
                    onClick={() => setFormularioDeleteEstado(!formularioDeleteEstado)}
                    className="mb-6 bg-[#DC1414] text-white p-3 rounded-2xl hover:bg-[#AA0505] transition-colors"
                >
                    Eliminar estado
                </button>

            </div>


            {formularioPostEstado && (<FormularioPostEstado />)}

            {formularioPutEstado && (<FormularioPutEstado />)}

            {formularioDeleteEstado && (<FormularioDeleteEstado />)}

            <GetEstados estados={estados} />

        </section>

    );

}