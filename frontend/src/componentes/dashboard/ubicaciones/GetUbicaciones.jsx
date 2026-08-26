"use client";

import { useEffect, useState } from "react";

import {
    obtenerUbicaciones,
} from "@/adapters/catalogos";

export default function GetUbicaciones() {

    const [ubicaciones, setUbicaciones] = useState([]);

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        async function cargarUbicaciones() {

            try {

                setCargando(true);
                setError("");

                setUbicaciones(await obtenerUbicaciones())



            } catch (error) {

                console.error(error);

                setError(
                    "No se pudieron cargar las ubicaciones."
                );

            } finally {

                setCargando(false);

            }

        }


        cargarUbicaciones();

    }, []);


    if (cargando) {

        return (
            <p>
                Cargando ubicaciones...
            </p>
        );

    }


    if (error) {

        return (
            <p className="text-red-500">
                {error}
            </p>
        );

    }

    console.log("UBICACIONES:", ubicaciones);

    return (

        <section>

            {ubicaciones.length === 0 ? (

                <p className="text-gray-500">
                    No hay ubicaciones para mostrar.
                </p>

            ) : (

                <div className="overflow-x-auto">

                    <table className="w-full border-collapse">

                        <thead>

                            <tr className="border-b text-left">

                                <th className="p-3">
                                    ID
                                </th>

                                <th className="p-3">
                                    Nombre
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {ubicaciones.map((ubicacion) => (

                                <tr
                                    key={ubicacion.nombre}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="p-3">
                                        {ubicacion.id_ubicacion}
                                    </td>

                                     <td className="p-3">
                                        {ubicacion.nombre}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </section>
    );
}