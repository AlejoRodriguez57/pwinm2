"use client";

import { useEffect, useState } from "react";

import {
    obtenerTiposPropiedad,
} from "@/adapters/catalogos";

export default function GetTiposPropiedad() {

    const [tiposPropiedad, setTiposPropiedad] = useState([]);

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        async function cargarTiposPropiedad() {

            try {

                setCargando(true);
                setError("");

                setTiposPropiedad(await obtenerTiposPropiedad())



            } catch (error) {

                console.error(error);

                setError(
                    "No se pudieron cargar los tipos de propiedad."
                );

            } finally {

                setCargando(false);

            }

        }


        cargarTiposPropiedad();

    }, []);


    if (cargando) {

        return (
            <p>
                Cargando tipos de propiedad...
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

    return (

        <section>

            {tiposPropiedad.length === 0 ? (

                <p className="text-gray-500">
                    No hay tipos de propiedad para mostrar.
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

                            {tiposPropiedad.map((tiposPropiedad) => (

                                <tr
                                    key={tiposPropiedad.nombre}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="p-3">
                                        {tiposPropiedad.id_tipo_propiedad}
                                    </td>

                                     <td className="p-3">
                                        {tiposPropiedad.nombre}
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