"use client";

import { useState } from "react";

import {
    crearEmpleado,
} from "@/adapters/empleados";


export default function PostEmpleado() {

    const [formulario, setFormulario] = useState({

        whatsappLink: "",
        img: "",
        activo: true,
        id_usuario: ""

    });

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);


    function manejarCambio(e) {

        const { name, value, type, checked } = e.target;

        setFormulario((anterior) => ({

            ...anterior,

            [name]: type === "checkbox"
                ? checked
                : value

        }));

    }


    async function manejarSubmit(e) {

        e.preventDefault();

        setError("");
        setMensaje("");


        if (!formulario.id_usuario) {

            setError(
                "Ingresá el ID del usuario."
            );

            return;

        }


        const data = {

            whatsappLink: formulario.whatsappLink,

            img: formulario.img,

            activo: formulario.activo,

            id_usuario: Number(formulario.id_usuario)

        };


        setCargando(true);


        try {

            const respuesta = await crearEmpleado(data);

            console.log(
                "Empleado creado:",
                respuesta
            );


            setMensaje(
                "Empleado creado correctamente."
            );


            setFormulario({

                whatsappLink: "",
                img: "",
                activo: true,
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
                    "No tenés permisos para crear empleados."
                );

            } else {

                setError(
                    "No se pudo crear el empleado."
                );

            }

        } finally {

            setCargando(false);

        }

    }


    return (

        <section className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold text-[#4F5F4E] mb-6">
                Añadir empleado
            </h2>


            <form
                onSubmit={manejarSubmit}
                className="flex flex-col gap-5"
            >

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        ID de usuario
                    </label>

                    <input
                        type="number"
                        name="id_usuario"
                        value={formulario.id_usuario}
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
                        placeholder="Link de WhatsApp"
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
                        placeholder="URL de imagen"
                        className="w-full border rounded-xl px-4 py-3"
                    />

                </div>


                <div className="flex items-center gap-3">

                    <input
                        type="checkbox"
                        name="activo"
                        checked={formulario.activo}
                        onChange={manejarCambio}
                        className="w-5 h-5"
                    />

                    <label className="text-sm font-semibold">
                        Empleado activo
                    </label>

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
                        ? "Guardando..."
                        : "Crear empleado"}
                </button>

            </form>

        </section>

    );

}