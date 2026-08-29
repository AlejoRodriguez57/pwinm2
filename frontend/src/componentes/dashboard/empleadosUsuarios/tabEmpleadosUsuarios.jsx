"use client";

import { useEffect, useState } from "react";

// ==============================
// EMPLEADOS
// ==============================

import FormularioPostEmpleado from "@/componentes/dashboard/empleadosUsuarios/empleados/formularios/postEmpleado.jsx";
import FormularioDeleteEmpleado from "@/componentes/dashboard/empleadosUsuarios/empleados/formularios/deleteEmpleado.jsx";
import FormularioPutEmpleado from "@/componentes/dashboard/empleadosUsuarios/empleados/formularios/putEmpleado.jsx";

import GetEmpleado from "@/componentes/dashboard/empleadosUsuarios/empleados/getEmpleados.jsx";

// ==============================
// USUARIOS
// ==============================

import FormularioPostUsuario from "@/componentes/dashboard/empleadosUsuarios/usuarios/formularios/postUsuario.jsx";
import FormularioDeleteUsuario from "@/componentes/dashboard/empleadosUsuarios/usuarios/formularios/deleteUsuario.jsx";
import FormularioPutUsuario from "@/componentes/dashboard/empleadosUsuarios/usuarios/formularios/putUsuario.jsx";

import GetUsuario from "@/componentes/dashboard/empleadosUsuarios/usuarios/getUsuarios.jsx";

// ==============================
// EMPLEADO + USUARIO
// ==============================

import FormularioPostEmpleadoYUsuario from "@/componentes/dashboard/empleadosUsuarios/empleadosYUsuarios/formularios/postEmpleadoYUsuario.jsx";
import FormularioDeleteEmpleadoYUsuario from "@/componentes/dashboard/empleadosUsuarios/empleadosYUsuarios/formularios/deleteEmpleadoYUsuario.jsx";
import FormularioPutEmpleadoYUsuario from "@/componentes/dashboard/empleadosUsuarios/empleadosYUsuarios/formularios/putEmpleadoYUsuario.jsx";

import GetEmpleadoYUsuario from "@/componentes/dashboard/empleadosUsuarios/empleadosYUsuarios/getEmpleadosYUsuarios.jsx";

// ==============================
// ADAPTERS
// ==============================

import { obtenerUsuarios } from "@/adapters/usuarios.js";

import {
    obtenerEmpleadoYUsuario,
    obtenerEmpleados
} from "@/adapters/empleados.js";

import { obtenerRoles } from "@/adapters/catalogos.js";

export default function TabEmpleadosUsuarios({ devMode }) {

    // ==============================
    // DATOS
    // ==============================

    const [roles, setRoles] = useState([]);
    const [empleados, setEmpleados] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [empleadosYUsuarios, setEmpleadosYUsuarios] = useState([]);

    // ==============================
    // ESTADOS
    // ==============================

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    // ==============================
    // FORMULARIOS EMPLEADOS
    // ==============================

    const [formularioPostEmpleado, setFormularioPostEmpleado] = useState(false);
    const [formularioPutEmpleado, setFormularioPutEmpleado] = useState(false);
    const [formularioDeleteEmpleado, setFormularioDeleteEmpleado] = useState(false);

    // ==============================
    // FORMULARIOS USUARIOS
    // ==============================

    const [formularioPostUsuario, setFormularioPostUsuario] = useState(false);
    const [formularioPutUsuario, setFormularioPutUsuario] = useState(false);
    const [formularioDeleteUsuario, setFormularioDeleteUsuario] = useState(false);

    // ==============================
    // FORMULARIOS EMPLEADO + USUARIO
    // ==============================

    const [formularioPostEmpleadoYUsuario, setFormularioPostEmpleadoYUsuario] = useState(false);
    const [formularioPutEmpleadoYUsuario, setFormularioPutEmpleadoYUsuario] = useState(false);
    const [formularioDeleteEmpleadoYUsuario, setFormularioDeleteEmpleadoYUsuario] = useState(false);


    // ==============================
    // CARGAR DATOS
    // ==============================

    useEffect(() => {

        let activo = true;


        async function cargarDatos(esCargaInicial = false) {

            try {

                if (esCargaInicial) {
                    setCargando(true);
                    setError("");
                }


                console.log("Cargando roles...");
                const roles = await obtenerRoles();
                console.log("Roles:", roles);

                console.log("Cargando empleados + usuarios...");
                const empleadosYUsuarios = await obtenerEmpleadoYUsuario();

                console.log("Cargando empleados...");
                const empleados = await obtenerEmpleados();

                console.log("Cargando usuarios...");
                const usuarios = await obtenerUsuarios();

                if (!activo) return;


                // ==============================
                // ROLES
                // ==============================

                setRoles(actuales => {

                    if (
                        JSON.stringify(actuales) ===
                        JSON.stringify(roles)
                    ) {
                        return actuales;
                    }

                    return roles;

                });


                // ==============================
                // EMPLEADOS
                // ==============================

                setEmpleados(actuales => {

                    if (
                        JSON.stringify(actuales) ===
                        JSON.stringify(empleados)
                    ) {
                        return actuales;
                    }

                    return empleados;

                });


                // ==============================
                // USUARIOS
                // ==============================

                setUsuarios(actuales => {

                    if (
                        JSON.stringify(actuales) ===
                        JSON.stringify(usuarios)
                    ) {
                        return actuales;
                    }

                    return usuarios;

                });


                // ==============================
                // EMPLEADOS + USUARIOS
                // ==============================

                setEmpleadosYUsuarios(actuales => {

                    if (
                        JSON.stringify(actuales) ===
                        JSON.stringify(empleadosYUsuarios)
                    ) {
                        return actuales;
                    }

                    return empleadosYUsuarios;

                });


            } catch (error) {

                console.error(error);

                if (activo) {
                    setError(
                        "No se pudieron cargar los empleados y usuarios."
                    );
                }

            } finally {

                if (activo && esCargaInicial) {
                    setCargando(false);
                }

            }

        }


        // Primera carga
        cargarDatos(true);


        // Actualizaciones silenciosas
        const intervalo = setInterval(() => {

            cargarDatos(false);

        }, 10000);


        return () => {

            activo = false;
            clearInterval(intervalo);

        };

    }, []);


    // ==============================
    // CARGANDO
    // ==============================

    if (cargando) {

        return (
            <section className="bg-white rounded-2xl shadow-lg p-6">

                <p>
                    Cargando empleados y usuarios...
                </p>

            </section>
        );

    }


    // ==============================
    // ERROR
    // ==============================

    if (error) {

        return (
            <section className="bg-white rounded-2xl shadow-lg p-6">

                <p className="text-red-500">
                    {error}
                </p>

            </section>
        );

    }


    // =========================================================
    // MODO NORMAL
    // =========================================================

    if (devMode === false) {

        return (

            <section className="bg-white rounded-2xl shadow-lg p-6">

                <div className="flex items-center gap-6">

                    <h2 className="text-2xl font-bold text-[#4F5F4E] mb-6">
                        Empleados y usuarios
                    </h2>


                    <button
                        onClick={() =>
                            setFormularioPostEmpleadoYUsuario(
                                !formularioPostEmpleadoYUsuario
                            )
                        }
                        className="mb-6 bg-[#00B4E6] text-white p-3 rounded-2xl hover:bg-[#0078B4] transition-colors"
                    >
                        Añadir empleado
                    </button>


                    <button
                        onClick={() =>
                            setFormularioPutEmpleadoYUsuario(
                                !formularioPutEmpleadoYUsuario
                            )
                        }
                        className="mb-6 bg-[#FFAA14] text-white p-3 rounded-2xl hover:bg-[#E68200] transition-colors"
                    >
                        Editar empleado
                    </button>


                    <button
                        onClick={() =>
                            setFormularioDeleteEmpleadoYUsuario(
                                !formularioDeleteEmpleadoYUsuario
                            )
                        }
                        className="mb-6 bg-[#DC1414] text-white p-3 rounded-2xl hover:bg-[#AA0505] transition-colors"
                    >
                        Eliminar empleado
                    </button>

                </div>


                {formularioPostEmpleadoYUsuario && (
                    <FormularioPostEmpleadoYUsuario
                        roles={roles}
                    />
                )}


                {formularioPutEmpleadoYUsuario && (
                    <FormularioPutEmpleadoYUsuario
                        roles={roles}
                    />
                )}


                {formularioDeleteEmpleadoYUsuario && (
                    <FormularioDeleteEmpleadoYUsuario
                        roles={roles}
                    />
                )}


                <GetEmpleadoYUsuario
                    empleadosYUsuarios={empleadosYUsuarios}
                    roles={roles}
                />

            </section>

        );

    }


    // =========================================================
    // MODO DEV
    // =========================================================

    return (

        <section className="bg-white rounded-2xl shadow-lg p-6 ">


            <div className="flex items-start justify-between">
           
                {/* ==============================================
                    EMPLEADOS
                ============================================== */}
                <div className="mb-10">

                    <div className="flex items-center gap-6">

                        <h2 className="text-2xl font-bold text-[#4F5F4E] mb-6">
                            Empleados
                        </h2>


                        <button
                            onClick={() =>
                                setFormularioPostEmpleado(
                                    !formularioPostEmpleado
                                )
                            }
                            className="mb-6 bg-[#00B4E6] text-white p-3 rounded-2xl hover:bg-[#0078B4] transition-colors"
                        >
                            Añadir empleado
                        </button>


                        <button
                            onClick={() =>
                                setFormularioPutEmpleado(
                                    !formularioPutEmpleado
                                )
                            }
                            className="mb-6 bg-[#FFAA14] text-white p-3 rounded-2xl hover:bg-[#E68200] transition-colors"
                        >
                            Editar empleado
                        </button>


                        <button
                            onClick={() =>
                                setFormularioDeleteEmpleado(
                                    !formularioDeleteEmpleado
                                )
                            }
                            className="mb-6 bg-[#DC1414] text-white p-3 rounded-2xl hover:bg-[#AA0505] transition-colors"
                        >
                            Eliminar empleado
                        </button>

                    </div>


                    {formularioPostEmpleado && (
                        <FormularioPostEmpleado />
                    )}


                    {formularioPutEmpleado && (
                        <FormularioPutEmpleado />
                    )}


                    {formularioDeleteEmpleado && (
                        <FormularioDeleteEmpleado />
                    )}

                </div>


                {/* ==============================================
                    USUARIOS
                ============================================== */}

                <div>

                    <div className="flex items-center gap-6">

                        <h2 className="text-2xl font-bold text-[#4F5F4E] mb-6">
                            Usuarios
                        </h2>


                        <button
                            onClick={() =>
                                setFormularioPostUsuario(
                                    !formularioPostUsuario
                                )
                            }
                            className="mb-6 bg-[#00B4E6] text-white p-3 rounded-2xl hover:bg-[#0078B4] transition-colors"
                        >
                            Añadir usuario
                        </button>


                        <button
                            onClick={() =>
                                setFormularioPutUsuario(
                                    !formularioPutUsuario
                                )
                            }
                            className="mb-6 bg-[#FFAA14] text-white p-3 rounded-2xl hover:bg-[#E68200] transition-colors"
                        >
                            Editar usuario
                        </button>


                        <button
                            onClick={() =>
                                setFormularioDeleteUsuario(
                                    !formularioDeleteUsuario
                                )
                            }
                            className="mb-6 bg-[#DC1414] text-white p-3 rounded-2xl hover:bg-[#AA0505] transition-colors"
                        >
                            Eliminar usuario
                        </button>

                    </div>


                    {formularioPostUsuario && (
                        <FormularioPostUsuario
                            roles={roles}
                        />
                    )}


                    {formularioPutUsuario && (
                        <FormularioPutUsuario
                            roles={roles}
                        />
                    )}


                    {formularioDeleteUsuario && (
                        <FormularioDeleteUsuario />
                    )}



                </div>

            </div>

            <div className="flex flex-col gap-10">

                <div>
                    <h2 className="text-2xl font-bold text-[#4F5F4E] mb-6">
                        Empleados
                    </h2>

                    <GetEmpleado
                        empleados={empleados}
                    />
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-[#4F5F4E] mb-6">
                        Usuarios
                    </h2>

                    <GetUsuario
                        usuarios={usuarios}
                        roles={roles}
                    />
                </div>

            </div>




          


       
        </section>

    );

}