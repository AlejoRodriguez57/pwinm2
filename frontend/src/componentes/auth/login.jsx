"use client";

import { useState } from "react";

import { useAuth } from "@/context/AuthContext";
import { logout } from "@/adapters/auth";

export default function Auth() {

    const {
        autenticado,
        iniciarSesion,
        verificarCodigo,
        cerrarSesion,
        usuario,
    } = useAuth();


    const [paso, setPaso] = useState(1);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [codigo, setCodigo] = useState("");

    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);


    async function manejarLogin(e) {

        e.preventDefault();

        setError("");
        setCargando(true);

        try {

            await iniciarSesion({
                email,
                password,
            });

            setPaso(2);

        } catch (error) {

            console.error(error);

            setError(
                "El email o la contraseña son incorrectos."
            );

        } finally {

            setCargando(false);

        }
    }


    async function manejarCodigo(e) {

        e.preventDefault();

        setError("");
        setCargando(true);

        try {

            await verificarCodigo({
                email,
                codigo,
            });

        } catch (error) {

            console.error(error);

            setError(
                "El código es incorrecto o expiró."
            );

        } finally {

            setCargando(false);

        }
    }


    if (autenticado) {

        return (

            <section className="min-h-screen flex items-center justify-center bg-[#ECEFE6] px-4">

                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                    <h1 className="text-3xl font-bold text-[#4F5F4E] mb-2">
                        Validación exitosa
                    </h1>

                    <p className="text-gray-500 mb-6">
                        Tu identidad fue verificada correctamente.
                    </p>

                    <p className="font-semibold mb-6">
                        Bienvenido, {usuario?.nombre}
                    </p>

                    <button
                        onClick={cerrarSesion}
                        className="w-full bg-[#7A9F79] text-white rounded-xl py-3 font-semibold hover:opacity-90"
                    >
                        Cerrar sesión
                    </button>

                </div>

            </section>

        );
    }


    return (

        <section className="min-h-screen flex items-center justify-center bg-[#ECEFE6] px-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                {paso === 1 ? (

                    <>

                        <h1 className="text-3xl font-bold text-[#4F5F4E] mb-2">
                            Iniciar sesión
                        </h1>

                        <p className="text-gray-500 mb-6">
                            Ingresá tus datos para continuar.
                        </p>


                        <form
                            onSubmit={manejarLogin}
                            className="flex flex-col gap-5"
                        >

                            <div>

                                <label className="block text-sm font-semibold mb-2">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full border rounded-xl px-4 py-3"
                                    placeholder="ejemplo@gmail.com"
                                />

                            </div>


                            <div>

                                <label className="block text-sm font-semibold mb-2">
                                    Contraseña
                                </label>

                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full border rounded-xl px-4 py-3"
                                />

                            </div>


                            {error && (
                                <p className="text-red-500 text-sm">
                                    {error}
                                </p>
                            )}


                            <button
                                type="submit"
                                disabled={cargando}
                                className="bg-[#7A9F79] text-white rounded-xl py-3 font-semibold"
                            >
                                {cargando
                                    ? "Verificando..."
                                    : "Iniciar sesión"}
                            </button>

                        </form>

                    </>

                ) : (

                    <>

                        <h1 className="text-3xl font-bold text-[#4F5F4E] mb-2">
                            Verificación
                        </h1>

                        <p className="text-gray-500 mb-6">
                            Enviamos un código de verificación a:
                        </p>

                        <p className="font-semibold mb-6">
                            {email}
                        </p>


                        <form
                            onSubmit={manejarCodigo}
                            className="flex flex-col gap-5"
                        >

                            <div>

                                <label className="block text-sm font-semibold mb-2">
                                    Código
                                </label>

                                <input
                                    type="text"
                                    value={codigo}
                                    onChange={(e) => setCodigo(e.target.value)}
                                    required
                                    maxLength={6}
                                    className="w-full border rounded-xl px-4 py-3 text-center text-xl tracking-widest"
                                    placeholder="000000"
                                />

                            </div>


                            {error && (
                                <p className="text-red-500 text-sm">
                                    {error}
                                </p>
                            )}


                            <button
                                type="submit"
                                disabled={cargando}
                                className="bg-[#7A9F79] text-white rounded-xl py-3 font-semibold"
                            >
                                {cargando
                                    ? "Verificando..."
                                    : "Confirmar código"}
                            </button>

                        </form>


                        <button
                            onClick={() => {
                                setPaso(1);
                                setCodigo("");
                                setError("");
                            }}
                            className="mt-4 text-sm text-gray-500 hover:underline"
                        >
                            Volver
                        </button>

                    </>

                )}

            </div>

        </section>

    );
}