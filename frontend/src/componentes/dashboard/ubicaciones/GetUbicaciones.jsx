"use client";

import { useState } from "react";


export default function GetUbicaciones({ ubicaciones }) {

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
                                    key={ubicacion.id_ubicacion}
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
