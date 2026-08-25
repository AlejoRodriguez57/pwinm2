"use client";

import { useState } from "react";
import FormularioPostPropiedad from "@/componentes/dashboard/propiedades/formularios/PostPropiedad.jsx";
import FormularioDeletePropiedad from "@/componentes/dashboard/propiedades/formularios/DeletePropiedad.jsx";
import FormularioPutPropiedad from "@/componentes/dashboard/propiedades/formularios/PutPropiedad.jsx";
import GetPropiedades from "@/componentes/dashboard/propiedades/GetPropiedades.jsx";

export default function TabPropiedades() {
  const [formularioPostPropiedad, setFormularioPostPropiedad] = useState(false);
  const [formularioPutPropiedad, setFormularioPutPropiedad] = useState(false);
  const [formularioDeletePropiedad, setFormularioDeletePropiedad] = useState(false);  

    return (
        <>

            <section  className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-6">

                    <h2 className="text-2xl font-bold text-[#4F5F4E] mb-6">
                        Propiedades
                     </h2>

                    <button onClick={() => setFormularioPostPropiedad(!formularioPostPropiedad)} 
                    className="mb-6 bg-[#00B4E6] text-white p-3 rounded-2xl border border-blue-[#00B4E6] hover:bg-[#0078B4] transition-colors">Añadir propiedad</button>
                    
                    <button onClick={() => setFormularioPutPropiedad(!formularioPutPropiedad)}
                    className="mb-6 bg-[#FFAA14] text-white p-3 rounded-2xl border border-blue-[#FFAA14] hover:bg-[#E68200] transition-colors">Editar propiedad</button>

                    <button onClick={() => setFormularioDeletePropiedad(!formularioDeletePropiedad)}
                    className="mb-6 bg-[#DC1414] text-white p-3 rounded-2xl border border-blue-[#DC1414] hover:bg-[#AA0505] transition-colors">Eliminar propiedad</button>
                
                </div>

                    {formularioPostPropiedad && <FormularioPostPropiedad />}
                    {formularioPutPropiedad && <FormularioPutPropiedad />}
                    {formularioDeletePropiedad && <FormularioDeletePropiedad />}

                <GetPropiedades/>

            </section>


        </>
    )
}
