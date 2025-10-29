// src/components/Navbar.tsx
"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 inset-x-0 z-50 border-b border-white/10 backdrop-blur supports-[backdrop-filter]:bg-[#060e1a]/60"
    >
      <nav className="mx-auto w-full max-w-[1200px] px-3 sm:px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="https://www.britos.com"
          className="flex items-center gap-3 min-w-0"
        >
          <Image
            src="/logo-britos.png"
            alt="Britos"
            width={320} // valor de reserva, no manda sobre class
            height={80}
            priority
            sizes="(max-width:640px) 160px, (max-width:1024px) 220px, 320px"
            className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
          />
        </a>

        {/* Links desktop */}
        <ul className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <li>
            <a href="#productos" className="hover:text-white">
              Productos
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-white">
              Sobre mí
            </a>
          </li>
          <li>
            <a href="#negocios" className="hover:text-white">
              Negocios
            </a>
          </li>
        </ul>

        {/* CTA desktop */}
        <a
          href="#productos"
          className="hidden md:inline-block px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 text-sm font-medium"
        >
          Comprar
        </a>

        {/* Trigger móvil */}
        <button
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 rounded-lg border border-white/10 text-white/90"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* Menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            className="md:hidden border-t border-white/10 bg-[#060e1a]/95"
          >
            <div className="mx-auto w-full max-w-[1200px] px-3 sm:px-4 py-3">
              <a
                href="#productos"
                onClick={() => setOpen(false)}
                className="block py-2 text-white/90"
              >
                Productos
              </a>
              <a
                href="#about"
                onClick={() => setOpen(false)}
                className="block py-2 text-white/90"
              >
                Sobre mí
              </a>
              <a
                href="#negocios"
                onClick={() => setOpen(false)}
                className="block py-2 text-white/90"
              >
                Negocios
              </a>
              <a
                href="#productos"
                onClick={() => setOpen(false)}
                className="mt-2 inline-block w-full text-center px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 font-medium"
              >
                Comprar
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
