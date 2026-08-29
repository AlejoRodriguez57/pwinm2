
"use client";

import { useState } from "react";

import TabPropiedades from "./propiedades/TabPropiedades.jsx";
import TabUbicaciones from "./ubicaciones/TabUbicaciones.jsx";
import TabTiposPropiedad from "./tiposPropiedad/TabTiposPropiedad.jsx";
import TabMedia from "./media/TabMedia.jsx";
import TabEmpleadosUsuarios from "./empleadosUsuarios/tabEmpleadosUsuarios.jsx";
import TabOperaciones from "./operaciones/TabOperaciones.jsx";
import TabEstados from "./estados/TabEstados.jsx";
import TabTiposMedia from "./tiposMedia/TabTiposMedia.jsx";

import Header from "@/componentes/pp/Header.jsx";


export default function Dashboard() {

  const [tab, setTab] = useState("");
  const [devMode, setDevMode] = useState(false);


  const renderContenido = () => {

    if (tab === "propiedades") {return <TabPropiedades />;}
    if (tab === "media") {return <TabMedia />;}
    if (tab === "ubicaciones") {return <TabUbicaciones />;}
    if (tab === "tipos de propiedad") {return <TabTiposPropiedad />;}
    if (tab === "empleadosUsuarios") {return <TabEmpleadosUsuarios devMode={devMode} /> ;}
    if (tab === "operaciones") {return <TabOperaciones />;}
    if (tab === "estados") {return <TabEstados />;}
    if (tab === "tipos de media") {return <TabTiposMedia />;}

    return null;

  };


  return (
    <>

      <Header />

      {/* Dev Mode */}

      <div className="flex justify-end px-6 pt-4">

        <button
                    onClick={() => {

            if (!devMode) {

              const confirmar = window.confirm(
                "¿Estás seguro de que querés activar Dev Mode?"
              );

              if (confirmar) { setDevMode(true); }

            } else {

              const confirmar = window.confirm(
                "¿Estás seguro de que querés desactivar Dev Mode?"
              );

              if (confirmar) {
                setDevMode(false);
              }
              

            }

          }}
          
          className={`px-4 py-2 rounded-xl transition-colors ${
            devMode
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Dev Mode: {devMode ? "ON" : "OFF"}
        </button>

      </div>


      {/* Tabs */}

      <div className="flex items-center justify-between p-6 pb-0 w-full">

        <button onClick={() => setTab("propiedades")}
          className={`flex-1 py-2 text-center rounded-t-lg transition-colors ${
            tab === "propiedades"
              ? "bg-white text-black"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
         }`}
        > Propiedades </button>


        <button onClick={() => setTab("media")}
          className={`flex-1 py-2 text-center rounded-t-lg transition-colors ${
            tab === "media"
              ? "bg-white text-black"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >Media</button>


        <button onClick={() => setTab("ubicaciones")}
          className={`flex-1 py-2 text-center rounded-t-lg transition-colors ${
            tab === "ubicaciones"
              ? "bg-white text-black"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >Ubicaciones</button>


        <button onClick={() => setTab("tipos de propiedad")}
          className={`flex-1 py-2 text-center rounded-t-lg transition-colors ${
            tab === "tipos de propiedad"
              ? "bg-white text-black"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >Tipos de propiedad</button>

        <button onClick={() => setTab("empleadosUsuarios")}
          className={`flex-1 py-2 text-center rounded-t-lg transition-colors ${
            tab === "tipos de propiedad"
              ? "bg-white text-black"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >{devMode ? "empleados y usuarios" : "empleados"}</button>

        {devMode && (
          <>
            <button
              onClick={() => setTab("operaciones")}
              className={`flex-1 py-2 text-center rounded-t-lg transition-colors ${
                tab === "operaciones"
                  ? "bg-white text-black"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              operaciones
            </button>


            <button
              onClick={() => setTab("estados")}
              className={`flex-1 py-2 text-center rounded-t-lg transition-colors ${
                tab === "estados"
                  ? "bg-white text-black"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              estados
            </button>


            <button
              onClick={() => setTab("tipos de media")}
              className={`flex-1 py-2 text-center rounded-t-lg transition-colors ${
                tab === "tipos de media"
                  ? "bg-white text-black"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              tipos de media
            </button>
          </>
        )}

      </div>

      {/* Contenido */}

      <div>
        {renderContenido()}
      </div>

    </>
  );
}
