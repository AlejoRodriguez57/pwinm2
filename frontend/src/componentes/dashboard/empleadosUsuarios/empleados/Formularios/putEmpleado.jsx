"use client";

import { useState } from "react";

import {
    editarEmpleado,
} from "@/adapters/empleados";


export default function PutEmpleado() {

    const [formulario, setFormulario] = useState({

        id_empleado: "",
        whatsappLink: "",
        img: "",
        activo: "",
        id_usuario: ""

    });


    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);


    function manejarCambio(e) {

        const { name, value } = e.target;

        setFormulario((anterior) => ({

            ...anterior,
            [name]: value

        }));

    }


    async function manejarSubmit(e) {

        e.preventDefault();

        setError("");
        setMensaje("");


        if (!formulario.id_empleado) {

            setError(
                "Ingresá el ID del empleado."
            );

            return;

        }


        const data = {};


        if (formulario.whatsappLink !== "") {

            data.whatsappLink =
                formulario.whatsappLink;

        }


        if (formulario.img !== "") {

            data.img =
                formulario.img;

        }


        if (formulario.activo !== "") {

            data.activo =
                formulario.activo === "true";

        }


        if (formulario.id_usuario !== "") {

            data.id_usuario =
                Number(formulario.id_usuario);

        }


        if (Object.keys(data).length === 0) {

            setError(
                "Tenés que completar al menos un campo para modificar."
            );

            return;

        }


        setCargando(true);


        try {

            const respuesta = await editarEmpleado(
                Number(formulario.id_empleado),
                data
            );


            console.log(
                "Empleado editado:",
                respuesta
            );


            setMensaje(
                "Empleado editado correctamente."
            );


            setFormulario({

                id_empleado: "",
                whatsappLink: "",
                img: "",
                activo: "",
                id_usuario: ""

            });


        } catch (error) {

            console.error(error);


            if (error.status === 401) {

                setError(
                    "No estás autenticado."
                );

            } else if (error.status === 403) {

                setError(
                    "No tenés permisos para editar empleados."
                );

            } else if (error.status === 404) {

                setError(
                    "El empleado no existe."
                );

            } else {

                setError(
                    "No se pudo editar el empleado."
                );

            }

        } finally {

            setCargando(false);

        }

    }


    return (

        <section className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold text-[#4F5F4E] mb-6">
                Editar empleado
            </h2>


            <form
                onSubmit={manejarSubmit}
                className="flex flex-col gap-5"
            >

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        ID de empleado
                    </label>

                    <input
                        type="number"
                        name="id_empleado"
                        value={formulario.id_empleado}
                        onChange={manejarCambio}
                        required
                        min="1"
                        placeholder="id"
                        className="w-full border rounded-xl px-4 py-3"
                    />

                </div>


                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Link de WhatsApp
                    </label>

                    <input
                        type="text"
                        name="whatsappLink"
                        value={formulario.whatsappLink}
                        onChange={manejarCambio}
                        placeholder="Dejar vacío para no modificar"
                        className="w-full border rounded-xl px-4 py-3"
                    />

                </div>


                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Imagen
                    </label>

                    <input
                        type="text"
                        name="img"
                        value={formulario.img}
                        onChange={manejarCambio}
                        placeholder="Dejar vacío para no modificar"
                        className="w-full border rounded-xl px-4 py-3"
                    />

                </div>


                <div>

                    <label className="block text-sm font-semibold mb-2">
                        Activo
                    </label>

                    <select
                        name="activo"
                        value={formulario.activo}
                        onChange={manejarCambio}
                        className="w-full border rounded-xl px-4 py-3"
                    >

                        <option value="">
                            Dejar sin modificar
                        </option>

                        <option value="true">
                            Sí
                        </option>

                        <option value="false">
                            No
                        </option>

                    </select>

                </div>


                <div>

                    <label className="block text-sm font-semibold mb-2">
                        ID de usuario
                    </label>

                    <input
                        type="number"
                        name="id_usuario"
                        value={formulario.id_usuario}
                        onChange={manejarCambio}
                        min="1"
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