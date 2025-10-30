// src/components/BooksySection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = { fallbackUrl?: string };

const BOOKSY_SCRIPT_SRC =
  "https://booksy.com/widget/code.js?id=1347158&country=us&lang=en-US";

const BOOKSY_IFRAME_URL =
  "https://booksy.com/widget/index.html?id=1347158&businessId=&appointmentUid=&lang=en-US&country=us&mode=dialog&theme=default&uniqueId=booksy-ui";

export default function BooksySection({ fallbackUrl }: Props) {
  const [open, setOpen] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const [reveal, setReveal] = useState(false);
  const scriptLoaded = useRef(false);

  // Carga perezosa del script oficial de Booksy
  const ensureScript = () => {
    if (scriptLoaded.current) return;
    const s = document.createElement("script");
    s.src = BOOKSY_SCRIPT_SRC;
    s.async = true;
    s.onload = () => {
      scriptLoaded.current = true;
      setScriptReady(true);
    };
    s.onerror = () => setScriptReady(false);
    document.body.appendChild(s);
  };

  // Bloquear scroll con overlay
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Abrir usando la API del script; si falla, mostramos iframe fallback
  const onOpen = () => {
    ensureScript();
    setOpen(true);

    // Intento con el diálogo nativo de Booksy si existe la API global
    const tryBooksy = () => {
      // @ts-ignore
      const api = (window as any).booksy;
      if (api && typeof api.openDialog === "function") {
        // @ts-ignore
        api.openDialog();
        setReveal(false); // usamos diálogo de Booksy, no nuestro iframe
      } else {
        // Fallback: mostramos nuestro iframe
        setReveal(true);
      }
    };

    // pequeño delay por si el script termina de inicializar
    setTimeout(tryBooksy, scriptReady ? 0 : 300);
  };

  const onClose = () => {
    setOpen(false);
    setReveal(false);
    // cerrar overlay del script si quedó abierto
    // @ts-ignore
    const api = (window as any).booksy;
    if (api && typeof api.closeDialog === "function") {
      api.closeDialog();
    }
  };

  const FALLBACK_URL = fallbackUrl ?? BOOKSY_IFRAME_URL;

  return (
    <section id="agenda" className="mx-auto max-w-[1100px] px-0 sm:px-4">
      <div className="mb-4 flex items-center gap-3">
        <h2 className="text-3xl font-bold">Agendar un corte</h2>

        {/* Botón = imagen clippers */}
        <motion.button
          type="button"
          onClick={onOpen}
          aria-label="Abrir agenda de turnos"
          whileHover={{ rotate: -4, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex"
        >
          <img
            src="/clippers.png"
            alt="Abrir agenda Booksy"
            className="h-10 md:h-12 w-auto select-none"
            draggable={false}
          />
        </motion.button>
      </div>

      {/* Overlay propio solo para el fallback iframe */}
      <AnimatePresence>
        {open && reveal && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <div
              className="absolute inset-0 grid place-items-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="relative w-[92vw] max-w-[770px] h-[84vh] rounded-2xl shadow-2xl ring-1 ring-white/15 overflow-hidden bg-[#0b1526]"
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
              >
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-white"
                  aria-label="Cerrar"
                >
                  ✕
                </button>

                <iframe
                  key={Date.now()} // evita cachear sesión del widget
                  src={FALLBACK_URL}
                  className="absolute inset-0 w-full h-full border-0"
                  loading="eager"
                  // No uses sandbox aquí. Evitá también referrerPolicy estricto.
                  allow="clipboard-write; fullscreen; geolocation; payment"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
