// src/components/BooksySection.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = { fallbackUrl?: string };

const DEFAULT_BOOKSY_URL =
  "https://booksy.com/widget/index.html?id=1347158&businessId=&appointmentUid=&lang=en-US&country=us&mode=dialog&theme=default&uniqueId=12ef89f1b8";

export default function BooksySection({ fallbackUrl }: Props) {
  const [open, setOpen] = useState(false);
  const [reveal, setReveal] = useState(false);

  // bloquear scroll cuando el modal está abierto
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const BOOKSY_URL = fallbackUrl ?? DEFAULT_BOOKSY_URL;

  const openModal = () => {
    setOpen(true);
    setReveal(true); // sin demora: mismo modal que ya usabas
  };

  const onClose = () => {
    setReveal(false);
    setOpen(false);
  };

  return (
    <section id="agenda" className="mx-auto max-w-[1100px] px-0 sm:px-4">
      {/* Botón = imagen de la máquina */}
      <div className="flex items-center">
        <h2 className="text-3xl font-bold mr-3">Agendar un corte</h2>

        <motion.button
          type="button"
          onClick={openModal}
          aria-label="Abrir agenda de turnos"
          whileHover={{ rotate: -4, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex"
        >
          <img
            src="/clippers.png"
            alt="Máquina de cortar pelo Britos"
            className="h-10 md:h-12 w-auto select-none"
            draggable={false}
          />
        </motion.button>
      </div>

      {/* Modal con Booksy (igual al tuyo) */}
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
