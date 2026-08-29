"use client";

export default function GetEmpleados({ empleados }) {

    return (

        <section>

            {empleados.length === 0 ? (

                <p className="text-gray-500">
                    No hay empleados para mostrar.
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
                                    ID Usuario
                                </th>

                                <th className="p-3">
                                    WhatsApp
                                </th>

                                <th className="p-3">
                                    Imagen
                                </th>

                                <th className="p-3">
                                    Activo
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {empleados.map((empleado) => (

                                <tr
                                    key={empleado.id_empleado}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="p-3">
                                        {empleado.id_empleado}
                                    </td>

                                    <td className="p-3">
                                        {empleado.id_usuario}
                                    </td>

                                    <td className="p-3">
                                        {empleado.whatsappLink}
                                    </td>

                                    <td className="p-3">

                                        {empleado.img ? (

                                            <img
                                                src={empleado.img}
                                                alt={`Imagen del empleado ${empleado.id_empleado}`}
                                                className="w-12 h-12 object-cover rounded-lg"
                                            />

                                        ) : (

                                            "Sin imagen"

                                        )}

                                    </td>

                                    <td className="p-3">
                                        {empleado.activo ? "Sí" : "No"}
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
