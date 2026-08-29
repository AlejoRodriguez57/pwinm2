"use client";


export default function GetEstados({ estados }) {

    return (

        <section>

            {estados.length === 0 ? (

                <p className="text-gray-500">
                    No hay estados para mostrar.
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

                            {estados.map((estado) => (

                                <tr
                                    key={estado.id_estado}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="p-3">
                                        {estado.id_estado}
                                    </td>

                                    <td className="p-3">
                                        {estado.nombre}
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