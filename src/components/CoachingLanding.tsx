// src/components/CoachingLanding.tsx  (CLIENT COMPONENT)
"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP =
  "https://wa.me/16452234957?text=Hola%20Gast%C3%B3n%2C%20quiero%20el%20diagn%C3%B3stico%20de%2015%20min%20para%20el%20coaching%20de%20barber%C3%ADa.";
const BOOKING_ANCHOR = "#booksy";

export default function Coaching() {
  const [leadOpen, setLeadOpen] = useState(false);

  return (
    <main className="min-h-screen pb-28">
      {/* HERO */}
      <section className="relative pt-24">
        <div className="mx-auto max-w-[1100px] px-4 grid gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight">
              Coaching de Barbería
            </h1>
            <p className="mt-3 text-white/80 text-lg">
              Subí tu ticket, re-agendado y retail en 8 semanas.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={BOOKING_ANCHOR}
                data-event="cta_hero_click"
                className="px-5 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 font-semibold"
              >
                Agendar diagnóstico 15′
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener"
                data-event="whatsapp_click"
                className="px-5 py-3 rounded-xl border border-white/15 hover:border-white/30"
              >
                Hablar por WhatsApp
              </a>
            </div>

            <p className="mt-2 text-sm text-white/60">
              Diagnóstico gratis. Cupos limitados mensuales.
            </p>

            {/* Prueba social */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-[#0b1526] p-4">
              <p className="text-white/80 text-sm">
                Promedio cohortes: <b>+20%</b> ticket, <b>60%</b> re-agendado,
                <b> 0.8–1.2</b> en retail por dólar de servicio.
              </p>
            </div>
          </div>

          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative overflow-hidden rounded-2xl ring-1 ring-white/10 bg-black"
          >
            <Image
              src="/gaston-cut.jpg"
              alt="Gastón cortando el pelo"
              width={1100}
              height={900}
              className="w-full h-full object-cover"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* Beneficios en números */}
      <section className="mx-auto max-w-[1100px] px-4 mt-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["+20%", "ticket promedio"],
            ["60%", "re-agendado al salir"],
            ["−15%", "tiempo por servicio"],
            ["Retail que rota", "con 5 SKUs"],
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
        <p className="mt-3 text-xs text-white/50">
          Resultados típicos en 4–8 semanas. Dependientes de ejecución.
        </p>
      </section>

      {/* Cómo funciona */}
      <section className="mx-auto max-w-[1100px] px-4 mt-16 grid gap-6 lg:grid-cols-3">
        <Card title="Semana 0">Diagnóstico y línea base de KPIs.</Card>
        <Card title="Semanas 1–4">
          SOPs de silla, scripts de venta, precios y bundles.
        </Card>
        <Card title="Semanas 5–8">
          Retención, retail, contenido y optimización.
          <div className="mt-2 text-white/70 text-sm">
            Sesión 1:1 semanal de 45 min. Materiales listos para usar.
          </div>
        </Card>
      </section>

      {/* Qué incluye */}
      <section className="mx-auto max-w-[1100px] px-4 mt-16">
        <Card title="Qué incluye">
          <ul className="mt-1 grid gap-2 sm:grid-cols-2 text-sm text-white/80">
            {[
              "SOPs 1 página por servicio",
              "Scripts de consulta, upsell, cierre",
              "Tabla de precios y bundles",
              "Plantillas WhatsApp de recordatorio y re-agenda",
              "Planograma de mostrador y mínimos de stock",
              "Calendario de contenido IG 4×/semana con prompts",
              "Tablero de KPIs compartido",
            ].map((i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400" />
                {i}
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* Planes y precios */}
      <section className="mx-auto max-w-[1100px] px-4 mt-16">
        <h2 className="text-2xl font-semibold mb-4">Planes y precios</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Plan
            name="Starter · 4 semanas"
            audience="Para barberos individuales."
            included={[
              "Diagnóstico",
              "4 sesiones",
              "SOPs y scripts",
              "WhatsApp templates",
              "Tablero KPIs",
            ]}
            result="Ordenar agenda y bajar no-show."
            price="USD 249"
            cta="Comenzar"
          />
          <Plan
            name="Growth · 8 semanas"
            audience="Para barberías con 2–6 sillas."
            included={[
              "Todo Starter",
              "Shadowing por video",
              "Auditoría IG",
              "Plan de contenido",
              "Planograma retail",
            ]}
            result="Subir ticket y retail."
            price="USD 449"
            highlight
            cta="Comenzar"
          />
          <Plan
            name="Mentoría 90 días"
            audience="Para escalar equipo."
            included={[
              "Growth + soporte asíncrono",
              "Revisión quincenal de números",
              "Plan de contratación y comisiones",
            ]}
            result="Profesionalizar operación y equipo."
            price="USD 690"
            cta="Aplicar"
          />
        </div>
        <p className="mt-3 text-xs text-white/50">
          Cobro mensual. Cancelación con 7 días de anticipación. Cupos
          limitados.
        </p>
      </section>

      {/* Caso corto antes/después */}
      <section className="mx-auto max-w-[1100px] px-4 mt-16 grid gap-6 lg:grid-cols-2">
        <Card title="Antes">
          <ul className="text-sm text-white/80 space-y-1">
            <li>Ticket USD 18</li>
            <li>Re-agendado 22%</li>
            <li>No-show 14%</li>
            <li>Retail/cliente USD 0.2</li>
          </ul>
        </Card>
        <Card title="Después de 6 semanas">
          <ul className="text-sm text-white/80 space-y-1">
            <li>Ticket USD 22</li>
            <li>Re-agendado 61%</li>
            <li>No-show 6%</li>
            <li>Retail/cliente USD 0.9</li>
          </ul>
          <p className="mt-3 text-white/70 text-sm">
            Bundles, scripts, política de depósitos y demostración de producto
            en silla.
          </p>
        </Card>
      </section>

      {/* CTA medio + lead magnet */}
      <section className="mx-auto max-w-[1100px] px-4 mt-16 text-center">
        <h3 className="text-xl font-semibold">
          ¿Querés el checklist de SOPs y precios listo para imprimir?
        </h3>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setLeadOpen(true)}
            data-event="leadmagnet_open"
            className="px-5 py-3 rounded-xl bg-white text-black font-semibold hover:bg-blue-100"
          >
            Descargar gratis
          </button>
          <a
            href={BOOKING_ANCHOR}
            className="px-5 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 font-semibold"
          >
            Agendar ahora
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[1100px] px-4 mt-16">
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-[#0b1526]">
          {FAQS.map((f) => (
            <details key={f.q} className="p-4">
              <summary className="cursor-pointer text-white/90">
                {f.q}
              </summary>
              <p className="mt-2 text-white/70 text-sm">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Sobre Gastón */}
      <section className="mx-auto max-w-[1100px] px-4 mt-16 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-2">Sobre Gastón</h2>
          <p className="text-white/80">
            Barbero y consultor. Especialista en operación de silla, pricing y
            retail. Enfoque en SOPs simples y métricas semanales.
          </p>
        </div>
        <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10 bg-black">
          <Image
            src="/gaston-cut.jpg"
            alt="Coaching en acción"
            width={900}
            height={700}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Cierre */}
      <section className="mx-auto max-w-[1100px] px-4 mt-16 text-center">
        <h3 className="text-xl font-semibold">
          Listo para crecer con método, no con suerte.
        </h3>
        <div className="mt-4 flex justify-center gap-3">
          <a
            href={BOOKING_ANCHOR}
            className="px-5 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 font-semibold"
          >
            Agendar diagnóstico 15′
          </a>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener"
            className="px-5 py-3 rounded-xl border border-white/15 hover:border-white/30"
          >
            Hablar por WhatsApp
          </a>
        </div>
      </section>

      {/* Lead magnet modal */}
      <LeadMagnet open={leadOpen} onClose={() => setLeadOpen(false)} />
    </main>
  );
}

/* ---------- UI helpers ---------- */
function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b1526] p-5">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {children}
    </div>
  );
}

function Plan({
  name,
  audience,
  included,
  result,
  price,
  cta,
  highlight,
}: {
  name: string;
  audience: string;
  included: string[];
  result: string;
  price: string;
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
      <div className="text-lg font-semibold">{name}</div>
      <div className="text-white/70 text-sm">{audience}</div>
      <ul className="mt-3 text-sm text-white/80 space-y-1">
        {included.map((i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400" />
            {i}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-white/80 text-sm">{result}</p>
      <div className="mt-4 flex items-baseline gap-2">
        <div className="text-2xl font-bold">{price}</div>
      </div>
      <div className="mt-4">
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener"
          data-event="plan_selected"
          data-plan={name}
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
                  <Select
                    label="¿Solo o con equipo?"
                    name="team"
                    options={["Solo", "Equipo 2–3", "Equipo 4–6", "6+"]}
                  />
                </div>
                <label className="flex items-start gap-2 text-sm text-white/80">
                  <input type="checkbox" required className="mt-1" /> Acepto
                  recibir material y actualizaciones del programa.
                </label>
                <button
                  type="submit"
                  data-event="leadmagnet_submit"
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

function Select({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="text-sm">
      <span className="text-white/80">{label}</span>
      <select
        name={name}
        className="mt-1 w-full rounded-lg bg-white/5 ring-1 ring-white/10 px-3 py-2 outline-none focus:ring-blue-400/50"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

const FAQS = [
  {
    q: "¿Es para principiantes o avanzados?",
    a: "Ambos. Se ajusta al nivel y al volumen.",
  },
  {
    q: "¿Necesito invertir en productos nuevos?",
    a: "No. Empezamos con 5 SKUs foco.",
  },
  {
    q: "¿Garantizan resultados?",
    a: "Garantizamos proceso y seguimiento. Resultados dependen de ejecución.",
  },
  {
    q: "¿Horarios de sesiones?",
    a: "Lunes a viernes, franja Miami y Montevideo.",
  },
  {
    q: "¿Se puede pagar en cuotas?",
    a: "Sí, según país y método.",
  },
  {
    q: "¿Trabajan in situ?",
    a: "Bajo agenda y costos de traslado.",
  },
];
