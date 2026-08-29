"use client";

import { useEffect, useState } from "react";

import FormularioPostOperacion from "@/componentes/dashboard/operaciones/formularios/PostOperacion.jsx";
import FormularioDeleteOperacion from "@/componentes/dashboard/operaciones/formularios/DeleteOperacion.jsx";
import FormularioPutOperacion from "@/componentes/dashboard/operaciones/formularios/PutOperacion.jsx";
import GetOperaciones from "@/componentes/dashboard/operaciones/GetOperaciones.jsx";

import { obtenerOperaciones } from "@/adapters/catalogos";


export default function TabOperaciones() {

    const [operaciones, setOperaciones] = useState([]);

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const [formularioPostOperacion, setFormularioPostOperacion] = useState(false);
    const [formularioPutOperacion, setFormularioPutOperacion] = useState(false);
    const [formularioDeleteOperacion, setFormularioDeleteOperacion] = useState(false);


    useEffect(() => {

        let activo = true;


        async function cargarOperaciones(esCargaInicial = false) {

            try {

                if (esCargaInicial) {
                    setCargando(true);
                }

                const operacionesNuevas = await obtenerOperaciones();


                if (!activo) return;


                setOperaciones(actuales => {

                    if (
                        JSON.stringify(actuales) ===
                        JSON.stringify(operacionesNuevas)
                    ) {
                        return actuales;
                    }

                    return operacionesNuevas;

                });


            } catch (error) {

                console.error(error);

                if (activo) {
                    setError("No se pudieron cargar las operaciones.");
                }

            } finally {

                if (activo && esCargaInicial) {
                    setCargando(false);
                }

            }

        }


        // Primera carga
        cargarOperaciones(true);


        // Comprobación silenciosa de cambios
        const intervalo = setInterval(() => {

            cargarOperaciones(false);

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
                    Cargando operaciones...
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
                    Operaciones
                </h2>


                <button
                    onClick={() => setFormularioPostOperacion(!formularioPostOperacion)}
                    className="mb-6 bg-[#00B4E6] text-white p-3 rounded-2xl hover:bg-[#0078B4] transition-colors"
                >
                    Añadir operacion
                </button>


                <button
                    onClick={() => setFormularioPutOperacion(!formularioPutOperacion)}
                    className="mb-6 bg-[#FFAA14] text-white p-3 rounded-2xl hover:bg-[#E68200] transition-colors"
                >
                    Editar operacion
                </button>


                <button
                    onClick={() => setFormularioDeleteOperacion(!formularioDeleteOperacion)}
                    className="mb-6 bg-[#DC1414] text-white p-3 rounded-2xl hover:bg-[#AA0505] transition-colors"
                >
                    Eliminar operacion
                </button>

            </div>


            {formularioPostOperacion && (<FormularioPostOperacion />)}

            {formularioPutOperacion && (<FormularioPutOperacion />)}

            {formularioDeleteOperacion && (<FormularioDeleteOperacion />)}

            <GetOperaciones operaciones={operaciones} />

        </section>

    );

}