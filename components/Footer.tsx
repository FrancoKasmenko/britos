// src/components/Footer.tsx
"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative mt-24">
      {/* fondo sutil */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_0%,#0d203b_0%,transparent_60%)]" />

      <div className="mx-auto max-w-[1100px] px-4">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur p-6 sm:p-8">
          {/* top */}
          <div className="grid gap-8 sm:grid-cols-3">
            {/* Marca */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo-britos.png"
                  alt="Britos"
                  width={120}
                  height={40}
                  className="h-10 w-auto object-contain"
                  priority
                />
              </div>
              <p className="text-sm text-white/70">
                Productos de barbería de alto rendimiento. Contenido y servicios
                profesionales.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="https://www.instagram.com/britos_llc"
                  target="_blank"
                  rel="noopener"
                  aria-label="Instagram"
                  className="rounded-full p-2 ring-1 ring-white/15 hover:bg-white/10"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white/90">
                    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5m0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5M17.75 6a1 1 0 1 1-1 1 1 1 0 0 1 1-1" />
                  </svg>
                </a>
                <a
                  href="#productos"
                  className="text-sm font-medium rounded-lg bg-blue-500 hover:bg-blue-400 px-3 py-2"
                >
                  Ver productos
                </a>
              </div>
            </div>

            {/* Navegación */}
            <div className="grid grid-cols-2 gap-8 sm:col-span-2">
              <div>
                <h4 className="text-sm font-semibold text-white/80">Sitio</h4>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
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
                    <a href="#booksy" className="hover:text-white">
                      Agenda
                    </a>
                  </li>
                  <li>
                    <a href="#negocios" className="hover:text-white">
                      Negocios
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-white/80">
                  Contacto
                </h4>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  <li>
                    <a
                      href="https://wa.me/16452234957"
                      target="_blank"
                      rel="noopener"
                      className="hover:text-white"
                    >
                      WhatsApp: +1 (645) 223-4957
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:gaston@britos.com"
                      className="hover:text-white"
                    >
                      gaston@britos.com
                    </a>
                  </li>
                  <li className="text-white/60">Miami, FL</li>
                </ul>
              </div>
            </div>
          </div>

          {/* divider */}
          <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          {/* bottom */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-white/60">
              © {new Date().getFullYear()} Britos. Todos los derechos
              reservados.
            </p>

            <p className="text-xs text-white/70">
              Desarrollado por{" "}
              <a
                href="https://www.instagram.com/getcoded.studio"
                target="_blank"
                rel="noopener"
                className="font-semibold text-white hover:text-blue-300"
              >
                Get Coded
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
