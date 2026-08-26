"use client";

import { useState } from "react";
import FormularioPostTipoPropiedad from "@/componentes/dashboard/tiposPropiedad/formularios/PostTipoPropiedad.jsx";
import FormularioDeleteTipoPropiedad from "@/componentes/dashboard/tiposPropiedad/formularios/DeleteTipoPropiedad.jsx";
import FormularioPutTipoPropiedad from "@/componentes/dashboard/tiposPropiedad/formularios/PutTipoPropiedad.jsx";
import GetTiposPropiedad from "@/componentes/dashboard/tiposPropiedad/GetTiposPropiedad.jsx";

export default function TabTiposPropiedad() {
  const [formularioPostTiposPropiedad, setFormularioPostTiposPropiedad] = useState(false);
  const [formularioPutTiposPropiedad, setFormularioPutTiposPropiedad] = useState(false);
  const [formularioDeleteTiposPropiedad, setFormularioDeleteTiposPropiedad] = useState(false);  

    return (
        <>

            <section  className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-6">

                    <h2 className="text-2xl font-bold text-[#4F5F4E] mb-6">
                        Tipos de propiedad
                     </h2>

                    <button onClick={() => setFormularioPostTiposPropiedad(!formularioPostTiposPropiedad)} 
                    className="mb-6 bg-[#00B4E6] text-white p-3 rounded-2xl border border-blue-[#00B4E6] hover:bg-[#0078B4] transition-colors">Añadir  tipo de propiedad</button>
                    
                    <button onClick={() => setFormularioPutTiposPropiedad(!formularioPutTiposPropiedad)}
                    className="mb-6 bg-[#FFAA14] text-white p-3 rounded-2xl border border-blue-[#FFAA14] hover:bg-[#E68200] transition-colors">Editar  tipo de propiedad</button>

                    <button onClick={() => setFormularioDeleteTiposPropiedad(!formularioDeleteTiposPropiedad)}
                    className="mb-6 bg-[#DC1414] text-white p-3 rounded-2xl border border-blue-[#DC1414] hover:bg-[#AA0505] transition-colors">Eliminar tipo de propiedad</button>
                
                </div>
                
                    {formularioPostTiposPropiedad && <FormularioPostTipoPropiedad />}
                    {formularioPutTiposPropiedad && <FormularioPutTipoPropiedad />}
                    {formularioDeleteTiposPropiedad && <FormularioDeleteTipoPropiedad />}

                <GetTiposPropiedad/>

            </section>


        </>
    )
}
