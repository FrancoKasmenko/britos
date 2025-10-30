// src/components/BooksySection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { motion } from "framer-motion";

export default function BooksySection({
  fallbackUrl,
}: { fallbackUrl?: string }) {
  const [open, setOpen] = useState(false);       // mostrar agenda
  const [loaded, setLoaded] = useState(false);   // widget listo
  const [clipDone, setClipDone] = useState(false); // fin de animación
  const scriptLoadedRef = useRef(false);

  // cuando “open”, empezamos a vigilar si Booksy inyectó su contenido
  useEffect(() => {
    if (!open) return;
    let t = 0;
    const id = window.setInterval(() => {
      t += 1;
      const injected =
        document.querySelector("#booksy-widget-target iframe") ||
        document.querySelector(".booksy-widget");
      if (injected) {
        setLoaded(true);
        window.clearInterval(id);
      }
      // cortar a los 8s por seguridad
      if (t > 80) window.clearInterval(id);
    }, 100);
    return () => window.clearInterval(id);
  }, [open]);

  return (
    <section id="agenda" className="relative mx-auto w-full max-w-[1100px] px-4">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold">Agendar un corte</h2>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 font-medium"
        >
          Ver agenda
        </button>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b1526]">
        {/* alto mínimo para que no quede vacío mientras carga */}
        <div className="relative p-0">
          <div id="booksy-widget-target" className="min-h-[440px] p-4 sm:p-6" />
        </div>

        {/* Capa que se “corta” para revelar el widget */}
        <motion.div
          aria-hidden
          className="absolute inset-0 z-10 bg-[#0b1526]"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          animate={
            open
              ? { clipPath: "inset(100% 0% 0% 0%)" } // revela de arriba hacia abajo
              : {}
          }
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => setClipDone(true)}
        />

        {/* Máquina: se mueve y luego desaparece */}
        {open && !clipDone && (
          <motion.img
            src="/clippers.png"
            alt=""
            aria-hidden
            className="pointer-events-none absolute z-20 w-40 md:w-52 -top-4 left-[-20%]"
            initial={{ x: 0, y: -6, rotate: -8, opacity: 0 }}
            animate={{
              x: "140%",
              y: [ -6, 2, -3, 4 ],
              rotate: [ -8, -5, -7, -6 ],
              opacity: 1,
            }}
            transition={{ duration: 0.95, ease: "easeInOut" }}
          />
        )}

        {/* Mensaje mientras carga el widget real */}
        {open && !loaded && (
          <div className="absolute inset-x-0 bottom-3 z-0 flex justify-center">
            <span className="text-white/60 text-sm">
              Cargando agenda…
              {fallbackUrl && (
                <>
                  {" "}
                  <a
                    className="underline text-blue-300"
                    href={fallbackUrl}
                    target="_blank"
                    rel="noopener"
                  >
                    abrir en Booksy
                  </a>
                </>
              )}
            </span>
          </div>
        )}
      </div>

      {/* Script: se inyecta una sola vez al abrir */}
      {open && !scriptLoadedRef.current && (
        <Script
          src="https://booksy.com/widget/code.js?id=1347158&country=us&lang=en-US"
          strategy="afterInteractive"
          onLoad={() => {
            scriptLoadedRef.current = true;
            // algunos widgets requieren reinicializar; si Booksy expone una función, llamala aquí
          }}
        />
      )}
    </section>
  );
}
