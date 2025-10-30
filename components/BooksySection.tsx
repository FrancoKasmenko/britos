// src/components/BooksySection.tsx
"use client";

import { useState } from "react";
import Script from "next/script";
import { motion } from "framer-motion";

type Props = {
  fallbackUrl?: string;
};

export default function BooksySection({ fallbackUrl }: Props) {
  const [show, setShow] = useState(false);

  return (
    <section id="agenda" className="relative mx-auto w-full max-w-[1100px] px-4">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold">Agendar un corte</h2>
        <button
          onClick={() => setShow(true)}
          className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 font-medium"
        >
          Ver agenda
        </button>
      </div>

      {/* Lienzo de animación */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b1526] p-0">
        {/* Capa oscura que se “corta” (revela el contenido) */}
        <motion.div
          aria-hidden
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }} // cubierto
          animate={show ? { clipPath: "inset(100% 0% 0% 0%)" } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-10 bg-[#0b1526]"
        />

        {/* Máquina de cortar desplazándose */}
        <motion.img
          src="/clippers.png" // poné el PNG en /public/clippers.png
          alt=""
          aria-hidden
          className="pointer-events-none absolute z-20 w-36 md:w-48 -top-6"
          initial={{ x: "-20%", y: -10, rotate: -8, opacity: 0 }}
          animate={
            show
              ? {
                  x: ["-20%", "20%", "60%", "110%"],
                  y: [-10, 4, -2, 6],
                  rotate: [-8, -4, -7, -5],
                  opacity: 1,
                }
              : {}
          }
          transition={{ duration: 0.9, times: [0, 0.35, 0.7, 1], ease: "easeInOut" }}
        />

        {/* Contenido Booksy */}
        <div className="relative z-0 p-4 sm:p-6">
          {/* Fallback breve antes de cargar */}
          {!show && (
            <div className="text-white/70 text-sm">
              Hacé clic en “Ver agenda” para cargar el widget de Booksy.
              {fallbackUrl ? (
                <>
                  {" "}
                  También podés{" "}
                  <a
                    href={fallbackUrl}
                    target="_blank"
                    rel="noopener"
                    className="text-blue-300 underline"
                  >
                    abrir Booksy en una pestaña nueva
                  </a>
                  .
                </>
              ) : null}
            </div>
          )}


          {show && (
            <>
              <Script
                src="https://booksy.com/widget/code.js?id=1347158&country=us&lang=en-US"
                strategy="afterInteractive"
              />
              {/* El script de Booksy escribe su propio contenido en el DOM.
                  Si en tu cuenta necesitás un contenedor específico, ponelo acá. */}
              <div id="booksy-widget-target" className="min-h-64"></div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
