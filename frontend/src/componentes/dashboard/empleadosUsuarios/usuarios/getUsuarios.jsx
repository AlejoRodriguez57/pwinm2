"use client";

export default function GetUsuarios({ usuarios, roles }) {

    return (

        <section>

            {usuarios.length === 0 ? (

                <p className="text-gray-500">
                    No hay usuarios para mostrar.
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

                                <th className="p-3">
                                    Email
                                </th>

                                <th className="p-3">
                                    Teléfono
                                </th>

                                <th className="p-3">
                                    Rol
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {usuarios.map((usuario) => (

                                <tr
                                    key={usuario.id_usuario}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="p-3">
                                        {usuario.id_usuario}
                                    </td>

                                    <td className="p-3">
                                        {usuario.nombre}
                                    </td>

                                    <td className="p-3">
                                        {usuario.email}
                                    </td>

                                    <td className="p-3">
                                        {usuario.telefono}
                                    </td>

                                    <td className="p-3">
                                        {
                                            roles.find(
                                                (rol) => rol.id_rol === usuario.id_rol
                                            )?.nombre ?? "Sin rol"
                                        }
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