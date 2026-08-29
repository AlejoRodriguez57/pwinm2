"use client";

import { useEffect, useState } from "react";

import { obtenerPropiedadesConMedia } from "@/adapters/propiedades";

import {
    obtenerOperaciones,
    obtenerEstados,
    obtenerTiposPropiedad,
    obtenerUbicaciones,
    obtenerTiposMedia
} from "@/adapters/catalogos";

import { mapPropiedades } from "@/mappers/propiedadMapper.js";


export default function GetPropiedades({ propiedades }) {

    const [descripcionSeleccionada, setDescripcionSeleccionada] = useState(null);
    const [mediaSeleccionada, setMediaSeleccionada] = useState(null);

    return (

        <section>

            {propiedades.length === 0 ? (

                <p className="text-gray-500">
                    No hay propiedades para mostrar.
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
                                    Título
                                </th>

                                <th className="p-3">
                                    Operación
                                </th>

                                <th className="p-3">
                                    Estado
                                </th>

                                <th className="p-3">
                                    Tipo
                                </th>

                                <th className="p-3">
                                    Ubicación
                                </th>

                                <th className="p-3">
                                    Precio
                                </th>

                                <th className="p-3">
                                    Ambientes
                                </th>

                                <th className="p-3">
                                    Dormitorios
                                </th>

                                <th className="p-3">
                                    Baños
                                </th>

                                <th className="p-3">
                                    Cocheras
                                </th>

                                <th className="p-3">
                                    Empleado
                                </th>

                                <td className="p-3">
                                    descripción
                                </td>


                                <td className="p-3">
                                    media
                                </td>                              

                            </tr>

                        </thead>


                        <tbody>

                            {propiedades.map((propiedad) => (

                                <tr
                                    key={propiedad.id}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="p-3">
                                        {propiedad.id}
                                    </td>

                                    <td className="p-3 font-semibold">
                                        {propiedad.titulo}
                                    </td>

                                    <td className="p-3">
                                        {propiedad.operacion}
                                    </td>

                                    <td className="p-3">
                                        {propiedad.estado}
                                    </td>

                                    <td className="p-3">
                                        {propiedad.tipoDePropiedad}
                                    </td>

                                    <td className="p-3">
                                        {propiedad.ubicacion}
                                    </td>

                                    <td className="p-3">
                                        {propiedad.precio}
                                    </td>

                                    <td className="p-3">
                                        {propiedad.ambientes}
                                    </td>

                                    <td className="p-3">
                                        {propiedad.dormitorios}
                                    </td>

                                    <td className="p-3">
                                        {propiedad.baños}
                                    </td>

                                    <td className="p-3">
                                        {propiedad.cocheras}
                                    </td>

                                    <td className="p-3">
                                        {propiedad.id_empleado}
                                    </td>

                                    <td className="p-3">

                                        <button
                                            onClick={() => setDescripcionSeleccionada(propiedad.descripcion)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Ver descripción
                                        </button>

                                    </td>


                                    <td className="p-3">

                                        <button
                                            onClick={() => setMediaSeleccionada(propiedad.media)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Ver media ({propiedad.media.length})
                                        </button>

                                    </td>
                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}
                    
            {mediaSeleccionada !== null && (

                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                    <div className="bg-white rounded-2xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">

                        <h3 className="text-xl font-bold mb-4">
                            Media de la propiedad
                        </h3>

                        <div className="flex flex-col gap-6">

                            {mediaSeleccionada.map((item, index) => (

                                <div
                                    key={item.id_media ?? index}
                                    className="border border-gray-200 rounded-xl p-4"
                                >

                                    {/* Información de la media */}
                                    <div className="grid grid-cols-2 gap-2 mb-4 text-sm">

                                        <p>
                                            <span className="font-semibold">
                                                ID media:
                                            </span>{" "}
                                            {item.id_media ?? "Sin ID"}
                                        </p>

                                        <p>
                                            <span className="font-semibold">
                                                ID propiedad:
                                            </span>{" "}
                                            {item.id_prop ?? "Sin ID"}
                                        </p>

                                        <p>
                                            <span className="font-semibold">
                                                Tipo:
                                            </span>{" "}
                                            {item.tipo ?? "Sin tipo"}
                                        </p>

                                        <p>
                                            <span className="font-semibold">
                                                Índice:
                                            </span>{" "}
                                            {index}
                                        </p>

                                    </div>

                                    {/* Link */}
                                    <div className="mb-4">

                                        <p className="font-semibold text-sm mb-1">
                                            Link:
                                        </p>

                                        <p className="text-sm text-blue-600 break-all">
                                            {item.link}
                                        </p>

                                    </div>

                                    {/* Contenido multimedia */}
                                    {item.tipo === "imagen" ? (

                                        <img
                                            src={item.link}
                                            alt={`Media ${index + 1}`}
                                            className="w-full max-h-80 object-contain rounded-xl"
                                        />

                                    ) : (

                                        <video
                                            src={item.link}
                                            controls
                                            className="w-full max-h-80 rounded-xl"
                                        />

                                    )}

                                </div>

                            ))}

                        </div>

                        <button
                            onClick={() => setMediaSeleccionada(null)}
                            className="mt-6 bg-[#7A9F79] text-white rounded-xl px-4 py-2"
                        >
                            Cerrar
                        </button>

                    </div>

                </div>

            )}

            {descripcionSeleccionada !== null && (

                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                    <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4">

                        <h3 className="text-xl font-bold mb-4">
                            Descripción
                        </h3>

                        <p className="text-gray-700 whitespace-pre-wrap">
                            {descripcionSeleccionada}
                        </p>

                        <button
                            onClick={() => setDescripcionSeleccionada(null)}
                            className="mt-6 bg-[#7A9F79] text-white rounded-xl px-4 py-2"
                        >
                            Cerrar
                        </button>

                    </div>

                </div>

            )}

        </section>

    );

}
