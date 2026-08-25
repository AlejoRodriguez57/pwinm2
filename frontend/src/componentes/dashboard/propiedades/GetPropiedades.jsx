"use client";

import { useEffect, useState } from "react";

import { obtenerPropiedades } from "@/adapters/propiedades";

import {
    obtenerOperaciones,
    obtenerEstados,
    obtenerTiposPropiedad,
    obtenerUbicaciones,
} from "@/adapters/catalogos";

import { obtenerMedia } from "@/adapters/media";

import { mapPropiedades } from "@/mappers/propiedadMapper.js";


export default function GetPropiedades() {

    const [propiedades, setPropiedades] = useState([]);

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const [descripcionSeleccionada, setDescripcionSeleccionada] = useState(null);
    const [mediaSeleccionada, setMediaSeleccionada] = useState(null);


    useEffect(() => {

        async function cargarPropiedades() {

            try {

                setCargando(true);
                setError("");


                const [
                    propiedadesData,
                    operacionesData,
                    estadosData,
                    tiposPropData,
                    ubicacionesData,
                    mediaData,
                ] = await Promise.all([

                    obtenerPropiedades(),

                    obtenerOperaciones(),

                    obtenerEstados(),

                    obtenerTiposPropiedad(),

                    obtenerUbicaciones(),

                    obtenerMedia(),

                ]);


                const propiedadesMapeadas = mapPropiedades(
                    propiedadesData,
                    operacionesData,
                    estadosData,
                    tiposPropData,
                    ubicacionesData,
                    mediaData
                );


                setPropiedades(propiedadesMapeadas);


            } catch (error) {

                console.error(error);

                setError(
                    "No se pudieron cargar las propiedades."
                );

            } finally {

                setCargando(false);

            }

        }


        cargarPropiedades();

    }, []);


    if (cargando) {

        return (
            <p>
                Cargando propiedades...
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

                    <div className="bg-white rounded-2xl p-6 max-w-3xl w-full mx-4">

                        <h3 className="text-xl font-bold mb-4">
                            Media de la propiedad
                        </h3>

                        <div className="grid grid-cols-2 gap-4">

                            {mediaSeleccionada.map((item, index) => (

                                <div key={index}>

                                    {item.tipo === "imagen" ? (

                                        <img
                                            src={item.link}
                                            alt={`Media ${index + 1}`}
                                            className="w-full rounded-xl"
                                        />

                                    ) : (

                                        <video
                                            src={item.link}
                                            controls
                                            className="w-full rounded-xl"
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