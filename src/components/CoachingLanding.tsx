// src/components/CoachingLanding.tsx  (CLIENT)
"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP =
  "https://wa.me/16452234957?text=Hola%20Gast%C3%B3n%2C%20quiero%20info%20del%20coaching%20de%20barber%C3%ADa.";

export default function Coaching() {
  const [leadOpen, setLeadOpen] = useState(false);

  return (
    <main className="min-h-screen pb-28">
      {/* HERO simple, sin tecnicismos */}
      <section className="relative pt-24">
        <div className="mx-auto max-w-[1100px] px-4 grid gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight">
              Coaching de Barbería
            </h1>
            <p className="mt-3 text-white/80 text-lg">
              Hacemos crecer tu agenda, tu ticket y tu nombre. Sin vueltas.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener"
                className="px-5 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 font-semibold"
              >
                Hablar con Gastón
              </a>
              <button
                onClick={() => setLeadOpen(true)}
                className="px-5 py-3 rounded-xl border border-white/15 hover:border-white/30"
              >
                Ver checklist gratis
              </button>
            </div>

            <p className="mt-2 text-sm text-white/60">
              Cupos limitados. Mensaje directo, respuesta real.
            </p>
          </div>

          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative overflow-hidden rounded-2xl ring-1 ring-white/10 bg-black"
          >
            <Image
              src="/gaston-cut.jpg"
              alt="Gastón cortando"
              width={1100}
              height={900}
              className="w-full h-full object-cover"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* NIVELES */}
      <section className="mx-auto max-w-[1100px] px-4 mt-16">
        <h2 className="text-2xl font-semibold mb-4">Elegí tu nivel</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <LevelCard
            title="Nivel 1 · Marketing para redes"
            price="USD 89"
            bullets={[
              "Perfil que vende: bio, highlights, link",
              "Qué subir y cuándo",
              "Cómo responder DMs para cerrar turnos",
              "Ideas de contenido por 30 días",
            ]}
            cta="Empezar"
          />
          <LevelCard
            title="Nivel 2 · Creación de contenido"
            price="USD 249"
            bullets={[
              "Formatos rápidos que funcionan",
              "Grabación con celular: luz, ángulos, audio",
              "Edición simple que levanta vistas",
              "Guiones cortos para vender sin forzar",
            ]}
            highlight
            cta="Quiero más clientes"
          />
          <LevelCard
            title="Nivel 3 · 1 a 1 personalizado"
            price="USD 529"
            bullets={[
              "Plan a medida según tu barrio y público",
              "Marca personal y precios",
              "Agenda llena y re-agendado",
              "Revisión semanal y ajustes",
            ]}
            cta="Aplicar"
          />
        </div>
      </section>

      {/* TRATAR CON FAMOSOS */}
      <section className="mx-auto max-w-[1100px] px-4 mt-16 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-[#0b1526] p-5">
          <h3 className="text-lg font-semibold mb-2">Cómo tratar con famosos</h3>
          <ul className="text-sm text-white/80 space-y-2">
            <li>• Mensaje correcto: breve, claro, con propuesta.</li>
            <li>• Turno y timing: cómo encajar su agenda con la tuya.</li>
            <li>• En el sillón: trato, privacidad y contenido permitido.</li>
            <li>• Después: qué subir, cuándo etiquetar y cómo capitalizar.</li>
          </ul>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener"
            className="mt-4 inline-flex px-4 py-2 rounded-xl bg-white text-black font-semibold hover:bg-blue-100"
          >
            Quiero ese módulo
          </a>
        </div>
        <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10 bg-black">
          <Image
            src="/gaston-famous.jpg"
            alt="Sesión con famoso"
            width={1100}
            height={900}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* RESULTADOS EN SIMPLE */}
      <section className="mx-auto max-w-[1100px] px-4 mt-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Más turnos", "llenás agenda"],
            ["Más ticket", "vendés mejor tu trabajo"],
            ["Menos no-show", "gente que vuelve"],
            ["Contenido útil", "lo que te trae clientes"],
          ].map(([k, v]) => (
            <div
              key={k}
              className="rounded-2xl border border-white/10 bg-[#0b1526] p-5"
            >
              <div className="text-2xl font-bold">{k}</div>
              <div className="text-white/70">{v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CIERRE */}
      <section className="mx-auto max-w-[1100px] px-4 mt-16 text-center">
        <h3 className="text-xl font-semibold">¿Listo para subir de nivel?</h3>
        <div className="mt-4 flex justify-center gap-3">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener"
            className="px-5 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 font-semibold"
          >
            Escribile a Gastón
          </a>
          <button
            onClick={() => setLeadOpen(true)}
            className="px-5 py-3 rounded-xl border border-white/15 hover:border-white/30"
          >
            Ver checklist gratis
          </button>
        </div>
      </section>

      <LeadMagnet open={leadOpen} onClose={() => setLeadOpen(false)} />
    </main>
  );
}

/* ---------- UI ---------- */
function LevelCard({
  title,
  price,
  bullets,
  cta,
  highlight,
}: {
  title: string;
  price: string;
  bullets: string[];
  cta: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        highlight
          ? "border-blue-400/40 bg-blue-500/5"
          : "border-white/10 bg-[#0b1526]"
      }`}
    >
      <div className="text-lg font-semibold">{title}</div>
      <div className="text-2xl font-bold mt-1">{price}</div>
      <ul className="mt-3 text-sm text-white/80 space-y-1">
        {bullets.map((i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400" />
            {i}
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener"
          className={`w-full inline-flex justify-center px-4 py-2 rounded-xl font-semibold ${
            highlight
              ? "bg-blue-500 hover:bg-blue-400"
              : "bg-white text-black hover:bg-blue-100"
          }`}
        >
          {cta}
        </a>
      </div>
    </div>
  );
}

function LeadMagnet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm"
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
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="w-full max-w-[640px] rounded-2xl border border-white/10 bg-[#0b1526] p-6"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">
                  Checklist de SOPs + hoja de precios
                </h4>
                <button
                  onClick={onClose}
                  className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20"
                  aria-label="Cerrar"
                >
                  ✕
                </button>
              </div>

              <form
                className="mt-4 grid gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  onClose();
                }}
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input label="Nombre" name="name" />
                  <Input label="Email" name="email" type="email" />
                  <Input label="WhatsApp" name="whatsapp" />
                  <Input label="Ciudad/País" name="city" />
                </div>
                <label className="flex items-start gap-2 text-sm text-white/80">
                  <input type="checkbox" required className="mt-1" /> Acepto
                  recibir material del programa.
                </label>
                <button
                  type="submit"
                  className="mt-2 px-4 py-2 rounded-xl bg-white text-black font-semibold hover:bg-blue-100"
                >
                  Descargar PDF
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Input({
  label,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="text-sm">
      <span className="text-white/80">{label}</span>
      <input
        {...rest}
        className="mt-1 w-full rounded-lg bg-white/5 ring-1 ring-white/10 px-3 py-2 outline-none focus:ring-blue-400/50"
      />
    </label>
  );
}
