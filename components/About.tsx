// src/components/About.tsx
"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="grid md:grid-cols-5 gap-8 items-center">
      <motion.img
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        src="/gaston.jpg"
        alt="Gastón Britos"
        className="md:col-span-2 rounded-2xl w-full object-cover ring-1 ring-white/10"
      />

      <motion.div
        initial={{ x: 20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="md:col-span-3"
      >
        <h2 className="text-3xl font-bold mb-3 flex items-center gap-1 leading-tight">
          ¿Quién es
          <Image
            src="/logo-britos.png"
            alt="BRITOS"
            width={320}
            height={80}
            className="h-[72px] sm:h-[84px] md:h-[96px] w-auto object-contain align-middle"
            priority
          />
          ?
        </h2>

        <p className="text-white/80">
          Barber y emprendedor en Miami. Creador de productos y contenido. Su
          enfoque combina técnica, estilo y negocios. Esta plataforma integra su
          línea BRITOS y sus iniciativas.
        </p>

        <div className="mt-6 flex gap-3">
          <a
            href="#negocios"
            className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 font-medium"
          >
            Ver logros
          </a>
          <a
            href="#productos"
            className="px-4 py-2 rounded-lg border border-white/15 hover:border-blue-400/60"
          >
            Productos
          </a>
        </div>
      </motion.div>
    </div>
  );
}
