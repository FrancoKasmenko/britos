"use client";
import { motion } from "framer-motion";

const ventures = [
  {
    title: "Get Coded",
    desc: "Agencia de Desarrollo potenciada con IA",
    img: "/v2.jpg",
  },
  { title: "Silver by Britos", desc: "Productos de barberia.", img: "/v1.jpg" },
  {
    title: "Britos Barber",
    desc: "Barbero profesional de multiples influencers.",
    img: "/v3.jpg",
  },
];

export default function Ventures() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Negocios y logros</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {ventures.map((v, i) => (
          <motion.article
            key={v.title}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl overflow-hidden border border-white/5 bg-[#0b1526] hover:border-blue-400/40"
          >
            <img
              src={v.img}
              alt={v.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">{v.title}</h3>
              <p className="text-white/70">{v.desc}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
