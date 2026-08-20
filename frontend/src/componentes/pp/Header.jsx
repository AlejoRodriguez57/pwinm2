"use client"

import Link from "next/link"
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const {
        autenticado,
        cargando,
        cerrarSesion,
    } = useAuth();

  return (
      <header className="sticky top-0 w-full flex items-center justify-between bg-[#8ECC8E] px-6 py-4 shadow-md z-50">
        {/* Logo */}
        <img src="/imagenes/logos/logo negro sin fondo.png" alt="Logo" className="h-13 w-23" />
        
        {/* Menú de Navegación */}
        <nav className="flex space-x-6">
          <Link href="../../" className="text-[#ECEFE6] font-bold">Inicio</Link>
          <Link href="../../nosotros#nosotros" className="text-[#ECEFE6] font-bold">Nosotros</Link>
          <Link href="../../nosotros#contacto" className="text-[#ECEFE6] font-bold">Contacto</Link>
        </nav>

        <div className="flex gap-5">
          {autenticado && (
            <button className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#ECEFE6] shadow transition-transform hover:scale-105 active:scale-95">
              <Link href="../../dashboard/">crud simbolo</Link>
            </button>
          )}

            <button className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#ECEFE6] shadow transition-transform hover:scale-105 active:scale-95">
              <Link href="../../login/">👤➕</Link>
            </button>
        </div>
      </header>
    )
  }