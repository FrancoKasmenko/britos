// src/components/HeroVideo.tsx
"use client";
import { motion } from "framer-motion";

export default function HeroVideo() {
  return (
    <section className="relative h-[64vh] sm:h-[78vh] lg:h-[90vh] w-full">
      <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-30" />
      <div className="pointer-events-none absolute -top-16 left-0 right-0 h-[60%] bg-gradient-to-b from-[#08111d] via-[#08111d]/40 to-transparent" />

      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.97, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full sm:w-[90%] lg:w-[70%] aspect-video rounded-2xl sm:rounded-3xl ring-1 sm:ring-2 ring-blue-400/70 bg-black overflow-hidden shadow-[0_0_25px_-12px_rgba(56,189,248,0.25)]"
        >
          <video
            className="w-full h-full object-cover"
            src="/placeholder.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </motion.div>
      </div>

      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a
          href="#productos"
          className="px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold bg-blue-500 hover:bg-blue-400 text-white text-sm sm:text-base"
        >
          Ver productos
        </a>
      </div>
    </section>
  );
}
