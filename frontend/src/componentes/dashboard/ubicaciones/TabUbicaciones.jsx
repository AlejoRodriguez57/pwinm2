"use client";

import { useState } from "react";
import FormularioPostUbicacion from "@/componentes/dashboard/ubicaciones/formularios/PostUbicacion.jsx";
import FormularioDeleteUbicacion from "@/componentes/dashboard/ubicaciones/formularios/DeleteUbicacion.jsx";
import FormularioPutUbicacion from "@/componentes/dashboard/ubicaciones/formularios/PutUbicacion.jsx";
import GetUbicaciones from "@/componentes/dashboard/ubicaciones/GetUbicaciones.jsx";

export default function TabUbicaciones() {
  const [formularioPostUbicacion, setFormularioPostUbicacion] = useState(false);
  const [formularioPutUbicacion, setFormularioPutUbicacion] = useState(false);
  const [formularioDeleteUbicacion, setFormularioDeleteUbicacion] = useState(false);  

    return (
        <>

            <section  className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-6">

                    <h2 className="text-2xl font-bold text-[#4F5F4E] mb-6">
                        Ubicaciones
                     </h2>

                    <button onClick={() => setFormularioPostUbicacion(!formularioPostUbicacion)} 
                    className="mb-6 bg-[#00B4E6] text-white p-3 rounded-2xl border border-blue-[#00B4E6] hover:bg-[#0078B4] transition-colors">Añadir ubicacion</button>
                    
                    <button onClick={() => setFormularioPutUbicacion(!formularioPutUbicacion)}
                    className="mb-6 bg-[#FFAA14] text-white p-3 rounded-2xl border border-blue-[#FFAA14] hover:bg-[#E68200] transition-colors">Editar ubicacion</button>

                    <button onClick={() => setFormularioDeleteUbicacion(!formularioDeleteUbicacion)}
                    className="mb-6 bg-[#DC1414] text-white p-3 rounded-2xl border border-blue-[#DC1414] hover:bg-[#AA0505] transition-colors">Eliminar ubicacion</button>
                
                </div>

                    {formularioPostUbicacion && <FormularioPostUbicacion />}
                    {formularioPutUbicacion && <FormularioPutUbicacion />}
                    {formularioDeleteUbicacion && <FormularioDeleteUbicacion />}

                <GetUbicaciones/>

            </section>


        </>
    )
}
