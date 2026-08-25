"use client";

import { useState } from "react";
import TabPropiedades from "./propiedades/TabPropiedades.jsx";
import Header from '@/componentes/pp/Header.jsx';



export default function Dashboard() {
  const [tab, setTab] = useState("");

  const renderContenido = () => {
    if (tab === "propiedades") return <TabPropiedades />;
    if (tab === "imagenes") return <Imagenes />;
    if (tab === "ubicaciones") return <Ubicaciones />;
    if (tab === "empleados") return <Empleados />;
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
          onClick={() => setTab("imagenes")}
          className={`flex-1 py-2 text-center rounded-t-lg transition-colors ${
            tab === "imagenes" 
              ? "bg-white text-black" 
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}> imagenes </button> 

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

      </div>
    
      <div>
        {renderContenido()}
      </div>

    </>
  );
}