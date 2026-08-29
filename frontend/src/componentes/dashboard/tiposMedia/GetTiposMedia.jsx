"use client";


export default function GetTiposMedia({ tiposMedia }) {

    return (

        <section>

            {tiposMedia.length === 0 ? (

                <p className="text-gray-500">
                    No hay tipos de media para mostrar.
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

                            {tiposMedia.map((tipoMedia) => (

                                <tr
                                    key={tipoMedia.id_tipo_media}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="p-3">
                                        {tipoMedia.id_tipo_media}
                                    </td>

                                    <td className="p-3">
                                        {tipoMedia.nombre}
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