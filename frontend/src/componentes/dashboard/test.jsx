"use client";

import { eliminarPropiedad } from "@/adapters/propiedades";


export default function Eliminar() {

    async function manejarEliminar() {

        try {

            await eliminarPropiedad(4);

            console.log("Propiedad eliminada correctamente");

        } catch (error) {

            if (error.status === 403) {

                console.log(
                    "No tenés permisos para eliminar propiedades"
                );

            } else if (error.status === 401) {

                console.log(
                    "No estás autenticado"
                );

            } else {

                console.error(error);

            }

        }
    }


    return (

        <div>

            <button
                onClick={manejarEliminar}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
                Eliminar propiedad
            </button>

        </div>

    );
}
