"use client";

export default function GetEmpleadosYUsuarios({
empleadosYUsuarios = [],
roles = []
}) {

    return (

        <section>

            {empleadosYUsuarios.length === 0 ? (

                <p className="text-gray-500">
                    No hay empleados para mostrar.
                </p>

            ) : (

                <div className="overflow-x-auto">

                    <table className="w-full border-collapse">

                        <thead>

                            <tr className="border-b text-left">

                                <th className="p-3">
                                    ID Empleado
                                </th>

                                <th className="p-3">
                                    ID Usuario
                                </th>

                                <th className="p-3">
                                    Nombre
                                </th>

                                <th className="p-3">
                                    Email
                                </th>

                                <th className="p-3">
                                    Teléfono
                                </th>

                                <th className="p-3">
                                    Rol
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

                            {empleadosYUsuarios.map(
                                (item) => {

                                    const rol =
                                        roles.find(
                                            (rol) =>
                                                Number(rol.id_rol) ===
                                                Number(
                                                    item.usuario.id_rol
                                                )
                                        );


                                    return (

                                        <tr
                                            key={
                                                item.empleado.id_empleado
                                            }
                                            className="border-b hover:bg-gray-50"
                                        >

                                            <td className="p-3">
                                                {
                                                    item.empleado
                                                        .id_empleado
                                                }
                                            </td>


                                            <td className="p-3">
                                                {
                                                    item.usuario
                                                        .id_usuario
                                                }
                                            </td>


                                            <td className="p-3">
                                                {
                                                    item.usuario
                                                        .nombre
                                                }
                                            </td>


                                            <td className="p-3">
                                                {
                                                    item.usuario
                                                        .email
                                                }
                                            </td>


                                            <td className="p-3">
                                                {
                                                    item.usuario
                                                        .telefono
                                                }
                                            </td>


                                            <td className="p-3">
                                                {
                                                    rol
                                                        ? rol.nombre
                                                        : item.usuario.id_rol
                                                }
                                            </td>


                                            <td className="p-3">
                                                {
                                                    item.empleado
                                                        .whatsappLink
                                                }
                                            </td>


                                            <td className="p-3">

                                                {item.empleado.img ? (

                                                    <img
                                                        src={
                                                            item.empleado.img
                                                        }
                                                        alt={
                                                            item.usuario.nombre
                                                        }
                                                        className="w-12 h-12 object-cover rounded-lg"
                                                    />

                                                ) : (

                                                    "Sin imagen"

                                                )}

                                            </td>


                                            <td className="p-3">

                                                {
                                                    item.empleado.activo
                                                        ? "Sí"
                                                        : "No"
                                                }

                                            </td>

                                        </tr>

                                    );

                                }
                            )}

                        </tbody>

                    </table>

                </div>

            )}

        </section>

    );

}
