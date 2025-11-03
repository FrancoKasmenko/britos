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
        <a href="https://www.britos.com" className="flex items-center gap-3 min-w-0">
          <Image
            src="/logo-britos.png"
            alt="Britos"
            width={320}
            height={80}
            priority
            sizes="(max-width:640px) 160px, (max-width:1024px) 220px, 320px"
            className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
          />
        </a>

        {/* Links desktop */}
        <ul className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <li><a href="#productos" className="hover:text-white">Productos</a></li>
          <li><a href="#about" className="hover:text-white">Sobre mí</a></li>
          <li><a href="#negocios" className="hover:text-white">Negocios</a></li>

          {/* Coaching destacado */}
          <li className="relative">
            {/* Aura animada detrás */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -inset-3 -z-10 rounded-xl blur-xl"
              style={{ background:
                "radial-gradient(60% 60% at 50% 50%, rgba(56,189,248,0.25), rgba(124,58,237,0.12) 60%, transparent 70%)"
              }}
              animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.98, 1.02, 0.98] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <a href="/coaching-barberia/" className="relative px-3 py-1.5 rounded-lg hover:text-white ring-1 ring-white/10">
              <span className="relative z-10">Coaching</span>

              {/* Brillo superior */}
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-lg"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(59,130,246,0.18), rgba(59,130,246,0.00))"
                }}
                animate={{ opacity: [0.25, 0.5, 0.25] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Subrayado vivo */}
              <motion.div
                aria-hidden
                className="absolute left-2 right-2 -bottom-1 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />

              {/* Sparkle */}
              <motion.span
                aria-hidden
                className="absolute -bottom-2 left-0 h-1 w-1 rounded-full"
                style={{ background:
                  "radial-gradient(circle, rgba(165,243,252,1) 0%, rgba(59,130,246,0.6) 50%, transparent 70%)"
                }}
                animate={{ x: ["0%", "100%"], opacity: [0, 1, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
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
              <a href="#productos" onClick={() => setOpen(false)} className="block py-2 text-white/90">Productos</a>
              <a href="#about" onClick={() => setOpen(false)} className="block py-2 text-white/90">Sobre mí</a>
              <a href="#negocios" onClick={() => setOpen(false)} className="block py-2 text-white/90">Negocios</a>

              {/* Coaching destacado en móvil */}
              <a
                href="/coaching-barberia/"
                onClick={() => setOpen(false)}
                className="mt-3 block w-full text-center px-4 py-2 rounded-xl font-semibold
                           bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500
                           hover:opacity-90 text-white ring-1 ring-white/10"
              >
                Coaching
              </a>

              <a
                href="#productos"
                onClick={() => setOpen(false)}
                className="mt-3 inline-block w-full text-center px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 font-medium"
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
