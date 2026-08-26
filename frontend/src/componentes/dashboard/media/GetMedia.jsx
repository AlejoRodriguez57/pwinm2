"use client";

import { useEffect, useState } from "react";

import {
    obtenerMedia,
} from "@/adapters/media";


export default function GetMedia() {

    const [media, setMedia] = useState([]);

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        async function cargarMedia() {

            try {

                setCargando(true);
                setError("");

                setMedia(await obtenerMedia());


            } catch (error) {

                console.error(error);

                setError(
                    "No se pudo cargar la media."
                );

            } finally {

                setCargando(false);

            }

        }


        cargarMedia();

    }, []);


    if (cargando) {

        return (
            <p>
                Cargando media...
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

            {media.length === 0 ? (

                <p className="text-gray-500">
                    No hay media para mostrar.
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
                                    ID Propiedad
                                </th>

                                <th className="p-3">
                                    Link
                                </th>

                                <th className="p-3">
                                    ID Tipo Media
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {media.map((item) => (

                                <tr
                                    key={item.id_media}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="p-3">
                                        {item.id_media}
                                    </td>

                                    <td className="p-3">
                                        {item.id_prop}
                                    </td>

                                    <td className="p-3">
                                        {item.link}
                                    </td>

                                    <td className="p-3">
                                        {item.id_tipo_media}
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