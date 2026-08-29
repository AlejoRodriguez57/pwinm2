"use client";

export default function GetTiposPropiedad({ tiposPropiedad }) {

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

                            {tiposPropiedad.map((tipo) => (

                                <tr
                                    key={tipo.id_tipo_propiedad}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="p-3">
                                        {tipo.id_tipo_propiedad}
                                    </td>

                                    <td className="p-3">
                                        {tipo.nombre}
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
