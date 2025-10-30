// src/components/BooksyDialog.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOKSY_URL =
  "https://booksy.com/widget/index.html?id=1347158&businessId=&appointmentUid=&lang=en-US&country=us&mode=dialog&theme=default&uniqueId=12ef89f1b8";

export default function BooksyDialog() {
  const [open, setOpen] = useState(false);
  const [reveal, setReveal] = useState(false); // muestra el iframe tras la “pasada” de la máquina

  // bloquear scroll del body cuando está abierto
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const onOpen = () => {
    setOpen(true);
    // espera a que pase la cortadora y luego muestra el iframe
    window.setTimeout(() => setReveal(true), 900);
  };

  const onClose = () => {
    setReveal(false);
    setOpen(false);
  };

  return (
    <section id="agenda" className="mx-auto max-w-[1100px] px-4">
      <div className="mb-4 flex items-center gap-3">
        <h2 className="text-3xl font-bold">Agendar un corte</h2>
        <button
          onClick={onOpen}
          className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 font-medium"
        >
          Ver agenda
        </button>
      </div>

      {/* Caja decorativa con la pasada de la máquina */}
      <div className="relative h-64 rounded-2xl border border-white/10 bg-[#0b1526] overflow-hidden">
        {/* capa que se “corta” */}
        <motion.div
          className="absolute inset-0 bg-[#0b1526]"
          initial={false}
          animate={open ? { clipPath: "inset(100% 0% 0% 0%)" } : { clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* máquina recorriendo */}
        {open && !reveal && (
          <motion.img
            src="/clippers.png"
            alt=""
            className="absolute top-2 left-[-20%] z-10 w-40 md:w-52 pointer-events-none"
            initial={{ x: 0, y: -6, rotate: -8, opacity: 0 }}
            animate={{
              x: "140%",
              y: [-6, 2, -3, 4],
              rotate: [-8, -5, -7, -6],
              opacity: 1,
            }}
            transition={{ duration: 0.95, ease: "easeInOut" }}
          />
        )}
      </div>

      {/* Overlay + diálogo Booksy */}
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
              // detener cierre al click dentro del modal
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="relative w-[92vw] max-w-[770px] h-[84vh] rounded-2xl shadow-2xl ring-1 ring-white/15 overflow-hidden bg-[#0b1526]"
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
              >
                {/* botón cerrar */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-white"
                  aria-label="Cerrar"
                >
                  ✕
                </button>

                {/* iframe */}
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
