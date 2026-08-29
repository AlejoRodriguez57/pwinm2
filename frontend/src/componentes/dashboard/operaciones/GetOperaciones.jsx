"use client";

import { useState } from "react";


export default function GetOperaciones({ operaciones }) {

    return (

        <section>

            {operaciones.length === 0 ? (

                <p className="text-gray-500">
                    No hay operaciones para mostrar.
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

                            {operaciones.map((operacion) => (

                                <tr
                                    key={operacion.id_operacion}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="p-3">
                                        {operacion.id_operacion}
                                    </td>

                                    <td className="p-3">
                                        {operacion.nombre}
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