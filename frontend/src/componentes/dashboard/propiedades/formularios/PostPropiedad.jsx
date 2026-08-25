"use client";

import { useEffect, useState } from "react";

import {
    obtenerOperaciones,
    obtenerEstados,
    obtenerTiposPropiedad,
    obtenerUbicaciones,
} from "@/adapters/catalogos";

import { crearPropiedad } from "@/adapters/propiedades";
import { obtenerEmpleados } from "@/adapters/empleados";
import { obtenerUsuarios } from "@/adapters/usuarios";


export default function FormularioPostPropiedad() {

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
        setCargando(true);


        try {

            const data = {
                ...formulario,

                id_operacion: Number(formulario.id_operacion),
                id_estado: Number(formulario.id_estado),
                id_tipo_propiedad: Number(formulario.id_tipo_propiedad),
                id_ubicacion: Number(formulario.id_ubicacion),
                id_empleado: Number(formulario.id_empleado),

                precio: Number(formulario.precio),
                expensas: Number(formulario.expensas),
                metros_cuadrados: Number(formulario.metros_cuadrados),
                ambientes: Number(formulario.ambientes),
                dormitorios: Number(formulario.dormitorios),
                banios: Number(formulario.banios),
                antiguedad: Number(formulario.antiguedad),
                cocheras: Number(formulario.cocheras),
            };


            const respuesta = await crearPropiedad(data);

            console.log("Propiedad creada:", respuesta);

            setMensaje(
                "Propiedad creada correctamente."
            );


            setFormulario({
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
                    "No tenés permisos para añadir propiedades."
                );

            } else {

                setError(
                    "No se pudo añadir la propiedad."
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
                Añadir propiedad
            </h2>


            <form
                onSubmit={manejarSubmit}
                className="flex flex-col gap-5"
            >


                {/* Operación */}
                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Operación
                    </label>

                    <select
                        name="id_operacion"
                        value={formulario.id_operacion}
                        onChange={manejarCambio}
                        required
                        className="w-full border rounded-xl px-4 py-3"
                    >

                        <option value="">
                            Seleccionar operación
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


                {/* Estado */}
                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Estado
                    </label>

                    <select
                        name="id_estado"
                        value={formulario.id_estado}
                        onChange={manejarCambio}
                        required
                        className="w-full border rounded-xl px-4 py-3"
                    >

                        <option value="">
                            Seleccionar estado
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


                {/* Tipo de propiedad */}
                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Tipo de propiedad
                    </label>

                    <select
                        name="id_tipo_propiedad"
                        value={formulario.id_tipo_propiedad}
                        onChange={manejarCambio}
                        required
                        className="w-full border rounded-xl px-4 py-3"
                    >

                        <option value="">
                            Seleccionar tipo
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


                {/* Ubicación */}
                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Ubicación
                    </label>

                    <select
                        name="id_ubicacion"
                        value={formulario.id_ubicacion}
                        onChange={manejarCambio}
                        required
                        className="w-full border rounded-xl px-4 py-3"
                    >

                        <option value="">
                            Seleccionar ubicación
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


                {/* Empleado */}
                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Empleado
                    </label>

                    <select
                        name="id_empleado"
                        value={formulario.id_empleado}
                        onChange={manejarCambio}
                        required
                        className="w-full border rounded-xl px-4 py-3"
                    >

                        <option value="">
                            Seleccionar empleado
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


                {/* Título */}
                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Título
                    </label>

                    <input
                        type="text"
                        name="titulo"
                        value={formulario.titulo}
                        onChange={manejarCambio}
                        className="w-full border rounded-xl px-4 py-3"
                    />

                </div>


                {/* Precio */}
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
                        className="w-full border rounded-xl px-4 py-3"
                    />

                </div>


                {/* Descripción */}
                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Descripción
                    </label>

                    <textarea
                        name="descripcion"
                        value={formulario.descripcion}
                        onChange={manejarCambio}
                        rows={5}
                        className="w-full border rounded-xl px-4 py-3"
                    />

                </div>


                {/* Expensas */}
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
                        className="w-full border rounded-xl px-4 py-3"
                    />

                </div>


                {/* Metros cuadrados */}
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
                        className="w-full border rounded-xl px-4 py-3"
                    />

                </div>


                {/* Ambientes */}
                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Ambientes
                    </label>

                    <input
                        type="number"
                        name="ambientes"
                        value={formulario.ambientes}
                        onChange={manejarCambio}
                        className="w-full border rounded-xl px-4 py-3"
                    />

                </div>


                {/* Dormitorios */}
                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Dormitorios
                    </label>

                    <input
                        type="number"
                        name="dormitorios"
                        value={formulario.dormitorios}
                        onChange={manejarCambio}
                        className="w-full border rounded-xl px-4 py-3"
                    />

                </div>


                {/* Baños */}
                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Baños
                    </label>

                    <input
                        type="number"
                        name="banios"
                        value={formulario.banios}
                        onChange={manejarCambio}
                        className="w-full border rounded-xl px-4 py-3"
                    />

                </div>


                {/* Antigüedad */}
                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Antigüedad
                    </label>

                    <input
                        type="number"
                        name="antiguedad"
                        value={formulario.antiguedad}
                        onChange={manejarCambio}
                        className="w-full border rounded-xl px-4 py-3"
                    />

                </div>


                {/* Cocheras */}
                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Cocheras
                    </label>

                    <input
                        type="number"
                        name="cocheras"
                        value={formulario.cocheras}
                        onChange={manejarCambio}
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
                    className="bg-[#00B4E6] text-white rounded-xl py-3 font-semibold hover:opacity-90 disabled:opacity-50"
                >
                    {cargando
                        ? "Añadiendo..."
                        : "Añadir propiedad"}
                </button>


            </form>

        </section>

    );
}