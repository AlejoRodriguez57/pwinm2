"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    login as loginRequest,
    autenticacion,
    usuarioActual,
    logout as logoutRequest,
} from "@/adapters/auth";


const AuthContext = createContext(null);


export function AuthProvider({ children }) {

    const [usuario, setUsuario] = useState(null);

    const [cargando, setCargando] = useState(true);

    const autenticado = usuario !== null;

    useEffect(() => {

        async function verificarSesion() {

            const token = localStorage.getItem("access_token");

            // No hay token
            if (!token) {

                setUsuario(null);
                setCargando(false);

                return;
            }


            // Hay token: comprobamos con FastAPI
            try {

                const usuario = await usuarioActual();

                setUsuario(usuario);

            } catch (error) {

                console.error(
                    "Sesión inválida:",
                    error
                );

                localStorage.removeItem(
                    "access_token"
                );

                setUsuario(null);

            } finally {

                setCargando(false);

            }
        }

        verificarSesion();

    }, []);


    async function iniciarSesion(datos) {

        return await loginRequest(datos);

    }


    async function verificarCodigo(datos) {

        const respuesta = await autenticacion(
            datos
        );


        // Guardamos JWT
        localStorage.setItem(
            "access_token",
            respuesta.access_token
        );


        // Obtenemos usuario desde FastAPI
        const usuario = await usuarioActual();


        setUsuario(usuario);


        return usuario;

    }


    function cerrarSesion() {

        logoutRequest();

        setUsuario(null);

    }


    const value = {

        usuario,

        autenticado,

        cargando,

        iniciarSesion,

        verificarCodigo,

        cerrarSesion,

    };

    return (

        <AuthContext.Provider value={value}>

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    const context = useContext(
        AuthContext
    );


    if (!context) {

        throw new Error(
            "useAuth debe utilizarse dentro de AuthProvider"
        );

    }

    return context;
}