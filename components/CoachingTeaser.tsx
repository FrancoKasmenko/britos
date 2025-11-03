// src/components/CoachingTeaser.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CoachingTeaser() {
  return (
    <section className="mx-auto max-w-[1100px] px-4">
      <div className="grid gap-6 lg:grid-cols-2 items-stretch">
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-2xl ring-1 ring-white/10 bg-black"
        >
          {/* Reemplazá por tu foto */}
          <Image
            src="/gaston-cut.jpg"
            alt="Coaching de barbería por Gastón"
            width={1100}
            height={900}
            className="w-full h-full object-cover"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ y: 12, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="rounded-2xl border border-white/10 bg-[#0b1526] p-6 flex flex-col"
        >
          <h2 className="text-3xl font-bold">Coaching de Barbería</h2>
          <p className="mt-2 text-white/80">
            SOPs simples, scripts de venta y un tablero de KPIs. Subí ticket,
            re-agendado y retail en 4–8 semanas.
          </p>

          <ul className="mt-4 grid gap-2 text-white/80 text-sm">
            {[
              "+20% ticket promedio",
              "60% re-agendado al salir",
              "Retail que rota con 5 SKUs",
            ].map((i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400" />
                {i}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/coaching-barberia/"
              className="px-5 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 font-semibold"
            >
              Saber más
            </Link>
            <a
              href="https://wa.me/16452234957?text=Hola%20Gast%C3%B3n%2C%20quiero%20info%20del%20coaching."
              target="_blank"
              rel="noopener"
              className="px-5 py-3 rounded-xl border border-white/15 hover:border-white/30"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
