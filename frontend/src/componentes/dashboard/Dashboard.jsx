"use client";

import { useState } from "react";
import TabPropiedades from "./propiedades/TabPropiedades.jsx";
import TabUbicaciones from "./ubicaciones/TabUbicaciones.jsx";
import TabTiposPropiedad from "./tiposPropiedad/TabTiposPropiedad.jsx";
import TabMedia from "./media/TabMedia.jsx";


import Header from '@/componentes/pp/Header.jsx';

export default function Dashboard() {
  const [tab, setTab] = useState("");

  const renderContenido = () => {
    if (tab === "propiedades") return <TabPropiedades />;
    if (tab === "media") return <TabMedia />;
    if (tab === "ubicaciones") return <TabUbicaciones />;
    if (tab === "empleados") return <Empleados />;
    if (tab === "tipos de propiedad") return <TabTiposPropiedad />;
    else return
  };

  return (
    <>
      
      <Header />

      <div className="flex items-center justify-between p-6 pb-0 w-full"> 

        <button 
          onClick={() => setTab("propiedades")}
          className={`flex-1 py-2 text-center rounded-t-lg transition-colors ${
            tab === "propiedades" 
              ? "bg-white text-black" 
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >propiedades</button> 

        <button 
          onClick={() => setTab("media")}
          className={`flex-1 py-2 text-center rounded-t-lg transition-colors ${
            tab === "media" 
              ? "bg-white text-black" 
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}> media </button> 

        <button 
          onClick={() => setTab("ubicaciones")}
          className={`flex-1 py-2 text-center rounded-t-lg transition-colors ${
            tab === "ubicaciones" 
              ? "bg-white text-black" 
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}>ubicaciones</button> 

        <button 
          onClick={() => setTab("empleados")}
          className={` flex-1 py-2 text-center rounded-t-lg transition-colors ${
            tab === "empleados" 
              ? "bg-white text-black" 
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}>empleados</button> 

        <button 
          onClick={() => setTab("tipos de propiedad")}
          className={` flex-1 py-2 text-center rounded-t-lg transition-colors ${
            tab === "tipos de propiedad" 
              ? "bg-white text-black" 
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}>tipos de propiedad</button> 

      </div>
    
      <div>
        {renderContenido()}
      </div>

    </>
  );
}