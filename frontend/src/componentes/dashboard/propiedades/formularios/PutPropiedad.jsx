"use client";

import { useEffect, useState } from "react";

import { editarPropiedad } from "@/adapters/propiedades";

import {
    obtenerOperaciones,
    obtenerEstados,
    obtenerTiposPropiedad,
    obtenerUbicaciones,
} from "@/adapters/catalogos";

import { obtenerEmpleados } from "@/adapters/empleados";
import { obtenerUsuarios } from "@/adapters/usuarios";


export default function EditarPropiedad() {

    const [operaciones, setOperaciones] = useState([]);
    const [estados, setEstados] = useState([]);
    const [tiposPropiedad, setTiposPropiedad] = useState([]);
    const [ubicaciones, setUbicaciones] = useState([]);
    const [empleados, setEmpleados] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    const [cargandoCatalogos, setCargandoCatalogos] = useState(true);
    const [cargando, setCargando] = useState(false);

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    const [formulario, setFormulario] = useState({

        id_prop: "",

        id_operacion: "",
        id_estado: "",
        id_tipo_propiedad: "",
        id_ubicacion: "",
        id_empleado: "",

        titulo: "",
        precio: "",
        descripcion: "",
        expensas: "",
        metros_cuadrados: "",
        ambientes: "",
        dormitorios: "",
        banios: "",
        antiguedad: "",
        cocheras: "",

    });


    // Cargar los datos necesarios para los select
    useEffect(() => {

        async function cargarCatalogos() {

            try {

                const [
                    operacionesData,
                    estadosData,
                    tiposPropiedadData,
                    ubicacionesData,
                    empleadosData,
                    usuariosData,
                ] = await Promise.all([
                    obtenerOperaciones(),
                    obtenerEstados(),
                    obtenerTiposPropiedad(),
                    obtenerUbicaciones(),
                    obtenerEmpleados(),
                    obtenerUsuarios(),
                ]);

                setOperaciones(operacionesData);
                setEstados(estadosData);
                setTiposPropiedad(tiposPropiedadData);
                setUbicaciones(ubicacionesData);
                setEmpleados(empleadosData);
                setUsuarios(usuariosData);

            } catch (error) {

                console.error(error);

                setError(
                    "No se pudieron cargar los datos necesarios."
                );

            } finally {

                setCargandoCatalogos(false);

            }

        }

        cargarCatalogos();

    }, []);


    function manejarCambio(e) {

        const { name, value } = e.target;

        setFormulario((anterior) => ({
            ...anterior,
            [name]: value,
        }));

    }


    async function manejarSubmit(e) {

        e.preventDefault();

        setError("");
        setMensaje("");


        // Verificamos que haya ID
        if (!formulario.id_prop) {

            setError(
                "Ingresá el ID de la propiedad."
            );

            return;
        }


        /*
         * Creamos el body vacío.
         * Solamente agregaremos los campos
         * que el usuario haya completado.
         */

        const data = {};


        // Relaciones

        if (formulario.id_operacion !== "") {

            data.id_operacion =
                Number(formulario.id_operacion);

        }


        if (formulario.id_estado !== "") {

            data.id_estado =
                Number(formulario.id_estado);

        }


        if (formulario.id_tipo_propiedad !== "") {

            data.id_tipo_propiedad =
                Number(formulario.id_tipo_propiedad);

        }


        if (formulario.id_ubicacion !== "") {

            data.id_ubicacion =
                Number(formulario.id_ubicacion);

        }


        if (formulario.id_empleado !== "") {

            data.id_empleado =
                Number(formulario.id_empleado);

        }


        // Datos de la propiedad

        if (formulario.titulo !== "") {

            data.titulo =
                formulario.titulo;

        }


        if (formulario.precio !== "") {

            data.precio =
                Number(formulario.precio);

        }


        if (formulario.descripcion !== "") {

            data.descripcion =
                formulario.descripcion;

        }


        if (formulario.expensas !== "") {

            data.expensas =
                Number(formulario.expensas);

        }


        if (formulario.metros_cuadrados !== "") {

            data.metros_cuadrados =
                Number(formulario.metros_cuadrados);

        }


        if (formulario.ambientes !== "") {

            data.ambientes =
                Number(formulario.ambientes);

        }


        if (formulario.dormitorios !== "") {

            data.dormitorios =
                Number(formulario.dormitorios);

        }


        if (formulario.banios !== "") {

            data.banios =
                Number(formulario.banios);

        }


        if (formulario.antiguedad !== "") {

            data.antiguedad =
                Number(formulario.antiguedad);

        }


        if (formulario.cocheras !== "") {

            data.cocheras =
                Number(formulario.cocheras);

        }


        // Si no modificó ningún campo
        if (Object.keys(data).length === 0) {

            setError(
                "Tenés que completar al menos un campo para modificar."
            );

            return;

        }


        setCargando(true);


        try {

            const respuesta = await editarPropiedad(
                Number(formulario.id_prop),
                data
            );


            console.log(
                "Propiedad editada:",
                respuesta
            );


            setMensaje(
                "Propiedad editada correctamente."
            );


            // Limpiamos el formulario
            setFormulario({

                id_prop: "",

                id_operacion: "",
                id_estado: "",
                id_tipo_propiedad: "",
                id_ubicacion: "",
                id_empleado: "",

                titulo: "",
                precio: "",
                descripcion: "",
                expensas: "",
                metros_cuadrados: "",
                ambientes: "",
                dormitorios: "",
                banios: "",
                antiguedad: "",
                cocheras: "",

            });


        } catch (error) {

            console.error(error);


            if (error.status === 401) {

                setError(
                    "No estás autenticado."
                );

            } else if (error.status === 403) {

                setError(
                    "No tenés permisos para editar propiedades."
                );

            } else if (error.status === 404) {

                setError(
                    "La propiedad no existe."
                );

            } else {

                setError(
                    "No se pudo editar la propiedad."
                );

            }

        } finally {

            setCargando(false);

        }

    }


    if (cargandoCatalogos) {

        return (
            <p>
                Cargando datos...
            </p>
        );

    }


    return (

        <section className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold text-[#4F5F4E] mb-6">
                Editar propiedad
            </h2>


            <form
                onSubmit={manejarSubmit}
                className="flex flex-col gap-5"
            >


                {/* ID DE PROPIEDAD */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        ID de propiedad
                    </label>

                    <input
                        type="number"
                        name="id_prop"
                        value={formulario.id_prop}
                        onChange={manejarCambio}
                        required
                        min="1"
                        placeholder="id"
                        className="w-full border rounded-xl px-4 py-3"
                    />

                </div>


                {/* OPERACIÓN */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Operación
                    </label>

                    <select
                        name="id_operacion"
                        value={formulario.id_operacion}
                        onChange={manejarCambio}
                        className="w-full border rounded-xl px-4 py-3"
                    >

                        <option value="">
                            No modificar
                        </option>

                        {operaciones.map((operacion) => (

                            <option
                                key={operacion.id_operacion}
                                value={operacion.id_operacion}
                            >
                                {operacion.nombre}
                            </option>

                        ))}

                    </select>

                </div>


                {/* ESTADO */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Estado
                    </label>

                    <select
                        name="id_estado"
                        value={formulario.id_estado}
                        onChange={manejarCambio}
                        className="w-full border rounded-xl px-4 py-3"
                    >

                        <option value="">
                            No modificar
                        </option>

                        {estados.map((estado) => (

                            <option
                                key={estado.id_estado}
                                value={estado.id_estado}
                            >
                                {estado.nombre}
                            </option>

                        ))}

                    </select>

                </div>


                {/* TIPO DE PROPIEDAD */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Tipo de propiedad
                    </label>

                    <select
                        name="id_tipo_propiedad"
                        value={formulario.id_tipo_propiedad}
                        onChange={manejarCambio}
                        className="w-full border rounded-xl px-4 py-3"
                    >

                        <option value="">
                            No modificar
                        </option>

                        {tiposPropiedad.map((tipo) => (

                            <option
                                key={tipo.id_tipo_propiedad}
                                value={tipo.id_tipo_propiedad}
                            >
                                {tipo.nombre}
                            </option>

                        ))}

                    </select>

                </div>


                {/* UBICACIÓN */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Ubicación
                    </label>

                    <select
                        name="id_ubicacion"
                        value={formulario.id_ubicacion}
                        onChange={manejarCambio}
                        className="w-full border rounded-xl px-4 py-3"
                    >

                        <option value="">
                            No modificar
                        </option>

                        {ubicaciones.map((ubicacion) => (

                            <option
                                key={ubicacion.id_ubicacion}
                                value={ubicacion.id_ubicacion}
                            >
                                {ubicacion.nombre}
                            </option>

                        ))}

                    </select>

                </div>


                {/* EMPLEADO */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Empleado
                    </label>

                    <select
                        name="id_empleado"
                        value={formulario.id_empleado}
                        onChange={manejarCambio}
                        className="w-full border rounded-xl px-4 py-3"
                    >

                        <option value="">
                            No modificar
                        </option>

                        {empleados.map((empleado) => {

                            const usuario = usuarios.find(
                                (usuario) =>
                                    usuario.id_usuario === empleado.id_usuario
                            );

                            return (

                                <option
                                    key={empleado.id_empleado}
                                    value={empleado.id_empleado}
                                >
                                    {usuario?.nombre ?? "Usuario desconocido"}
                                    {" — Empleado #"}
                                    {empleado.id_empleado}
                                </option>

                            );

                        })}

                    </select>

                </div>


                {/* TÍTULO */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Título
                    </label>

                    <input
                        type="text"
                        name="titulo"
                        value={formulario.titulo}
                        onChange={manejarCambio}
                        placeholder="Dejar vacío para no modificar"
                        className="w-full border rounded-xl px-4 py-3"
                    />

                </div>


                {/* PRECIO */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Precio
                    </label>

                    <input
                        type="number"
                        name="precio"
                        value={formulario.precio}
                        onChange={manejarCambio}
                        step="0.01"
                        placeholder="Dejar vacío para no modificar"
                        className="w-full border rounded-xl px-4 py-3"
                    />

                </div>


                {/* DESCRIPCIÓN */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Descripción
                    </label>

                    <textarea
                        name="descripcion"
                        value={formulario.descripcion}
                        onChange={manejarCambio}
                        rows={5}
                        placeholder="Dejar vacío para no modificar"
                        className="w-full border rounded-xl px-4 py-3"
                    />

                </div>


                {/* EXPENSAS */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Expensas
                    </label>

                    <input
                        type="number"
                        name="expensas"
                        value={formulario.expensas}
                        onChange={manejarCambio}
                        step="0.01"
                        placeholder="Dejar vacío para no modificar"
                        className="w-full border rounded-xl px-4 py-3"
                    />

                </div>


                {/* METROS */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Metros cuadrados
                    </label>

                    <input
                        type="number"
                        name="metros_cuadrados"
                        value={formulario.metros_cuadrados}
                        onChange={manejarCambio}
                        step="0.01"
                        placeholder="Dejar vacío para no modificar"
                        className="w-full border rounded-xl px-4 py-3"
                    />

                </div>


                {/* AMBIENTES */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Ambientes
                    </label>

                    <input
                        type="number"
                        name="ambientes"
                        value={formulario.ambientes}
                        onChange={manejarCambio}
                        placeholder="Dejar vacío para no modificar"
                        className="w-full border rounded-xl px-4 py-3"
                    />

                </div>


                {/* DORMITORIOS */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Dormitorios
                    </label>

                    <input
                        type="number"
                        name="dormitorios"
                        value={formulario.dormitorios}
                        onChange={manejarCambio}
                        placeholder="Dejar vacío para no modificar"
                        className="w-full border rounded-xl px-4 py-3"
                    />

                </div>


                {/* BAÑOS */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Baños
                    </label>

                    <input
                        type="number"
                        name="banios"
                        value={formulario.banios}
                        onChange={manejarCambio}
                        placeholder="Dejar vacío para no modificar"
                        className="w-full border rounded-xl px-4 py-3"
                    />

                </div>


                {/* ANTIGÜEDAD */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Antigüedad
                    </label>

                    <input
                        type="number"
                        name="antiguedad"
                        value={formulario.antiguedad}
                        onChange={manejarCambio}
                        placeholder="Dejar vacío para no modificar"
                        className="w-full border rounded-xl px-4 py-3"
                    />

                </div>


                {/* COCHERAS */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Cocheras
                    </label>

                    <input
                        type="number"
                        name="cocheras"
                        value={formulario.cocheras}
                        onChange={manejarCambio}
                        placeholder="Dejar vacío para no modificar"
                        className="w-full border rounded-xl px-4 py-3"
                    />

                </div>


                {error && (
                    <p className="text-red-500 text-sm">
                        {error}
                    </p>
                )}


                {mensaje && (
                    <p className="text-green-600 text-sm">
                        {mensaje}
                    </p>
                )}


                <button
                    type="submit"
                    disabled={cargando}
                    className="bg-[#FFAA14] text-white rounded-xl py-3 font-semibold hover:opacity-90 disabled:opacity-50"
                >
                    {cargando
                        ? "Guardando..."
                        : "Guardar cambios"}
                </button>

            </form>

        </section>

    );
}