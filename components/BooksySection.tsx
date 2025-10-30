// src/components/BooksySection.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = { fallbackUrl?: string };

const DEFAULT_BOOKSY_URL =
  "https://booksy.com/widget/index.html?id=1347158&businessId=&appointmentUid=&lang=en-US&country=us&mode=dialog&theme=default&uniqueId=12ef89f1b8";

export default function BooksySection({ fallbackUrl }: Props) {
  const [open, setOpen] = useState(false);      // modal visible
  const [reveal, setReveal] = useState(false);  // muestra iframe
  const [sweep, setSweep] = useState(false);    // animación de “corte” activa

  // bloquear scroll al abrir modal
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const BOOKSY_URL = fallbackUrl ?? DEFAULT_BOOKSY_URL;

  const handleClickMachine = () => {
    if (sweep || open) return;
    setSweep(true);
    // cuando termina el “corte”, abrir modal y luego el iframe
    window.setTimeout(() => {
      setOpen(true);
      window.setTimeout(() => setReveal(true), 300);
      setSweep(false);
    }, 900);
  };

  const onClose = () => {
    setReveal(false);
    setOpen(false);
  };

  return (
    <section id="agenda" className="mx-auto max-w-[1100px] px-0 sm:px-4">
      <h2 className="text-3xl font-bold mb-4">Agendar un corte</h2>

      {/* Lienzo con la máquina como botón */}
      <div className="relative h-64 rounded-2xl border border-white/10 bg-[#0b1526] overflow-hidden">
        {/* Barrido de “corte” */}
        <motion.div
          className="absolute inset-0 bg-[#0b1526]"
          initial={false}
          animate={sweep ? { clipPath: "inset(100% 0% 0% 0%)" } : { clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Máquina como botón. Se oculta durante el sweep o con el modal abierto */}
        {!sweep && !open && (
          <motion.button
            type="button"
            onClick={handleClickMachine}
            className="absolute top-6 left-1/2 -translate-x-1/2 focus:outline-none"
            aria-label="Abrir agenda de turnos"
            whileHover={{ rotate: -4, y: -2 }}
            whileTap={{ scale: 0.96 }}
          >
            <img
              src="/clippers.png"
              alt="Máquina de cortar pelo Britos"
              className="w-44 md:w-56 drop-shadow-[0_6px_20px_rgba(0,0,0,0.45)]"
              draggable={false}
            />
          </motion.button>
        )}
      </div>

      {/* Overlay + modal con Booksy */}
      <AnimatePresence>
        {open && (
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

                {reveal ? (
                  <iframe
                    id="booksy-iframe"
                    src={BOOKSY_URL}
                    className="absolute inset-0 w-full h-full border-0"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-white/70 text-sm">
                    Cargando agenda…
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
