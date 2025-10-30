// app/products/[slug]/product-client.tsx
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// ==== Tipos ====
type Media = {
  type: "image" | "video";
  src: string;
  alt?: string;
  /** Miniatura para videos. Opcional; si falta se usa <video preload="metadata"> */
  poster?: string;
};
type Product = {
  slug: string;
  name: string;
  subtitle: string;
  price: number; // centavos
  rating: number;
  reviews: number;
  stock: number;
  soldOut: boolean;
  net: string;
  badges: string[];
  priceId: string;
  gallery: Media[];
  benefits: string[];
  scales: { label: string; value: number }[];
  inci: { name: string; role: string }[];
  howTo: string[];
  forWhom: string[];
  compare: { label: string; gel: string; powder: string; salt: string }[];
  faqs: { q: string; a: string }[];
  description: string;
};

// ==== Mock DB (reemplaza por CMS/Stripe) ====
const DB: Record<string, Product> = {
  gel: {
    slug: "gel",
    name: "Gel by Britos",
    subtitle: "Fijación alta. Acabado limpio. Zero residuos.",
    price: 1800,
    rating: 4.8,
    reviews: 129,
    stock: 42,
    soldOut: false,
    net: "150 ml / 5.07 fl oz",
    badges: ["Envío 24–48h USA", "Devolución 30 días", "Pago seguro"],
    priceId: "price_xxx_gel",
    gallery: [
      { type: "image", src: "/gel.jpg", alt: "Gel by Britos packshot" },
      {
        type: "video",
        src: "/media/gel-hero.mp4",
        poster: "/media/gel-hero-poster.jpg",
      },
      { type: "image", src: "/gel_tex.jpg", alt: "Textura del gel" },
      { type: "image", src: "/gel_use.jpg", alt: "Aplicación en cabello" },
      { type: "image", src: "/gel_lifestyle.jpg", alt: "Lifestyle" },
    ],
    benefits: [
      "Fijación 24 h en climas húmedos.",
      "No descama. Se retira con agua tibia.",
      "Termoprotección ligera para secador.",
      "Fragancia fresca de barbería (hipoalergénica).",
    ],
    scales: [
      { label: "Fijación", value: 5 },
      { label: "Brillo", value: 4 },
      { label: "Volumen", value: 2 },
    ],
    inci: [
      { name: "Aqua", role: "Base" },
      { name: "VP/VA Copolymer", role: "Fijación" },
      { name: "Panthenol (Pro-Vitamina B5)", role: "Fortalecimiento" },
      { name: "Aloe Barbadensis Leaf Juice", role: "Hidratación" },
      { name: "Parfum", role: "Fragancia" },
    ],
    howTo: [
      "Toma una cantidad del tamaño de una avellana.",
      "Activa el producto frotando en las palmas 3–4 s.",
      "Aplica de raíz a puntas sobre cabello seco o húmedo.",
    ],
    forWhom: [
      "Cabello corto a medio",
      "Peinados con definición y control",
      "Todos los tipos de cabello",
    ],
    compare: [
      { label: "Fijación", gel: "Alta", powder: "Media", salt: "Baja" },
      { label: "Brillo", gel: "Medio", powder: "Mate", salt: "Mate" },
      { label: "Textura", gel: "Limpia", powder: "Aireada", salt: "Playera" },
    ],
    faqs: [
      {
        q: "¿Deja residuos blancos?",
        a: "No. La fórmula está diseñada para cero descamación si se aplica en capas finas.",
      },
      {
        q: "¿Se puede usar con secador?",
        a: "Sí. Aporta termoprotección ligera. Finaliza con aire frío para sellar.",
      },
    ],
    description:
      "Gel by Britos ofrece fijación alta con acabado limpio y sin residuos. Su polímero de control mantiene el peinado hasta 24 h, incluso en humedad. Enriquecido con pantenol y aloe para cuidar la fibra capilar.",
  },
  powder: {
    slug: "powder",
    name: "Styling Powder",
    subtitle: "Volumen instantáneo. Acabado mate. Tacto seco.",
    price: 2200,
    rating: 4.7,
    reviews: 98,
    stock: 31,
    soldOut: true,
    net: "20 g / 0.7 oz",
    badges: ["Envío 24–48h USA", "Pago en Amazon", "Hecho en USA"],
    priceId: "price_xxx_powder",
    gallery: [
      { type: "image", src: "/powder.jpg", alt: "Styling Powder packshot" },
      { type: "image", src: "/powder_tex.jpg", alt: "Textura del polvo" },
      { type: "image", src: "/powder_use.jpg", alt: "Aplicación" },
    ],
    benefits: [
      "Aporta volumen y densidad al instante.",
      "Acabado 100% mate. Tacto seco.",
      "Reactivable con las manos durante el día.",
    ],
    scales: [
      { label: "Fijación", value: 3 },
      { label: "Brillo", value: 1 },
      { label: "Volumen", value: 5 },
    ],
    inci: [
      { name: "Silica", role: "Volumen y agarre" },
      { name: "Aqua", role: "Base" },
      { name: "Sodium Benzoate", role: "Conservante" },
    ],
    howTo: [
      "Espolvorea en raíz.",
      "Distribuye con las yemas.",
      "Moldea hasta el volumen deseado.",
    ],
    forWhom: ["Cabello fino a medio", "Estilos despeinados y con altura"],
    compare: [
      { label: "Fijación", gel: "Alta", powder: "Media", salt: "Baja" },
      { label: "Brillo", gel: "Medio", powder: "Mate", salt: "Mate" },
      { label: "Textura", gel: "Limpia", powder: "Aireada", salt: "Playera" },
    ],
    faqs: [
      {
        q: "¿Se nota al tacto?",
        a: "Queda seco y ligero, sin sensación pegajosa.",
      },
    ],
    description:
      "Polvo de styling con sílica para levantar la raíz y aportar cuerpo sin brillo. Ideal para cabellos finos que buscan densidad.",
  },
  salt: {
    slug: "salt",
    name: "Sea Salt Spray",
    subtitle: "Ola playera. Textura natural. Movimiento real.",
    price: 2000,
    rating: 4.6,
    reviews: 74,
    stock: 0,
    soldOut: true,
    net: "200 ml / 6.76 fl oz",
    badges: ["Libre de parabenos", "Cruelty-free", "Pago seguro"],
    priceId: "price_xxx_salt",
    gallery: [
      {
        type: "image",
        src: "/sea_salt_spray.jpg",
        alt: "Sea Salt Spray packshot",
      },
      { type: "image", src: "/salt_tex.jpg", alt: "Textura en cabello" },
      { type: "image", src: "/salt_use.jpg", alt: "Uso en húmedo" },
    ],
    benefits: [
      "Define ondas",
      "Efecto mate natural",
      "Control suave sin rigidez",
    ],
    scales: [
      { label: "Fijación", value: 2 },
      { label: "Brillo", value: 1 },
      { label: "Volumen", value: 4 },
    ],
    inci: [
      { name: "Aqua", role: "Base" },
      { name: "Sea Salt", role: "Textura y cuerpo" },
      { name: "Glycerin", role: "Hidratación" },
    ],
    howTo: [
      "Pulveriza en húmedo.",
      "Estruja y deja secar al aire.",
      "Para más onda, usa difusor.",
    ],
    forWhom: ["Ondas y rizos suaves", "Look natural de playa"],
    compare: [
      { label: "Fijación", gel: "Alta", powder: "Media", salt: "Baja" },
      { label: "Brillo", gel: "Medio", powder: "Mate", salt: "Mate" },
      { label: "Textura", gel: "Limpia", powder: "Aireada", salt: "Playera" },
    ],
    faqs: [
      {
        q: "¿Reseca?",
        a: "Incluye glicerina para equilibrar. Sella con acondicionador sin enjuague si tu cabello es seco.",
      },
    ],
    description:
      "Spray salino que crea textura playera con movimiento real. Ideal para un acabado mate y suelto.",
  },
};

// ==== helpers ====
function getProduct(slug: string): Product | null {
  return DB[slug] ?? null;
}

// ==== Página cliente ====
export default function ClientProductPage({ slug }: { slug: string }) {
  const product = useMemo(() => getProduct(slug), [slug]);
  if (!product)
    return <div className="max-w-5xl mx-auto p-6">Producto no encontrado.</div>;

  return (
    <main className="min-h-screen pb-24">
      {/* HERO */}
      <section className="relative pt-24">
        <div className="mx-auto max-w-[1100px] px-4 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Gallery media={product.gallery} name={product.name} />
          <BuyBox p={product} />
        </div>
      </section>

      {/* BENEFICIOS + ESCALAS */}
      <section className="mx-auto max-w-[1100px] px-4 mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card title="Por qué funciona">
          <ul className="space-y-2 text-white/80 text-sm leading-relaxed">
            {product.benefits.map((b, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400" />
                {b}
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Escalas">
          <div className="space-y-4">
            {product.scales.map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-sm">
                  <span className="text-white/80">{s.label}</span>
                  <span className="text-white/60">{s.value}/5</span>
                </div>
                <div className="h-2 rounded bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${(s.value / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Ingredientes clave (INCI)">
          <ul className="space-y-2 text-white/80 text-sm">
            {product.inci.map((i, k) => (
              <li key={k} className="flex items-start justify-between gap-4">
                <span>{i.name}</span>
                <span className="text-white/60">{i.role}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* CÓMO USAR + PARA QUIÉN */}
      <section className="mx-auto max-w-[1100px] px-4 mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Cómo usarlo">
          <ol className="list-decimal list-inside space-y-2 text-white/80 text-sm">
            {product.howTo.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </Card>
        <Card title="Para quién es">
          <ul className="space-y-2 text-white/80 text-sm">
            {product.forWhom.map((s, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400" />
                {s}
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* COMPARATIVA */}
      <section className="mx-auto max-w-[1100px] px-4 mt-16">
        <Card title="Comparativa rápida">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-white/70">
                <tr>
                  <th className="py-2 pr-4">Atributo</th>
                  <th className="py-2 pr-4">Gel</th>
                  <th className="py-2 pr-4">Powder</th>
                  <th className="py-2 pr-0">Sea Salt</th>
                </tr>
              </thead>
              <tbody className="text-white/85">
                {product.compare.map((row) => (
                  <tr key={row.label} className="border-t border-white/10">
                    <td className="py-2 pr-4">{row.label}</td>
                    <td className="py-2 pr-4">{row.gel}</td>
                    <td className="py-2 pr-4">{row.powder}</td>
                    <td className="py-2 pr-0">{row.salt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* DESCRIPCIÓN LARGA + FAQ */}
      <section className="mx-auto max-w-[1100px] px-4 mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card title="Descripción">
          <p className="text-white/80 text-sm leading-relaxed">
            {product.description}
          </p>
        </Card>
        <Card title="FAQ" className="lg:col-span-2">
          <div className="divide-y divide-white/10">
            {product.faqs.map((f, i) => (
              <details key={i} className="py-3 group">
                <summary className="cursor-pointer text-white/90">
                  {f.q}
                </summary>
                <p className="mt-2 text-white/70 text-sm">{f.a}</p>
              </details>
            ))}
          </div>
        </Card>
      </section>

      {/* JSON-LD SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: product.name,
            description: product.description,
            image: product.gallery
              .filter((g) => g.type === "image")
              .map((g) => g.src),
            sku: product.slug,
            brand: { "@type": "Brand", name: "BRITOS" },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              price: (product.price / 100).toFixed(2),
              availability:
                product.stock > 0 && !product.soldOut
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.rating,
              reviewCount: product.reviews,
            },
          }),
        }}
      />
    </main>
  );
}

// ==== UI ====
function Card({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-[#0b1526] border border-white/10 rounded-2xl p-5 ${className}`}
    >
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}

function Gallery({ media, name }: { media: Media[]; name: string }) {
  const [active, setActive] = useState(0);
  const current = media[active];

  return (
    <div>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
        {current.type === "image" ? (
          <Image
            src={current.src}
            alt={current.alt ?? name}
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
            priority
          />
        ) : (
          <video
            src={current.src}
            poster={current.poster}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            controls
          />
        )}
      </div>

      <div className="mt-3 grid grid-cols-5 gap-3">
        {media.map((m, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative aspect-square overflow-hidden rounded-xl border ${
              i === active ? "border-blue-400" : "border-white/10"
            }`}
            aria-label={`Vista ${i + 1}`}
          >
            {m.type === "image" ? (
              <Image
                src={m.src}
                alt={m.alt ?? `${name} ${i + 1}`}
                fill
                className="object-cover"
                sizes="100px"
              />
            ) : (
              <VideoThumb m={m} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function VideoThumb({ m }: { m: Media }) {
  return (
    <div className="w-full h-full">
      {m.poster ? (
        <Image
          src={m.poster}
          alt={m.alt ?? "Video"}
          fill
          className="object-cover"
        />
      ) : (
        <video
          src={m.src}
          preload="metadata"
          className="w-full h-full object-cover"
          muted
        />
      )}
      {/* Overlay play */}
      <div className="absolute inset-0 grid place-items-center">
        <span className="inline-flex h-8 w-8 rounded-full bg-black/60 ring-1 ring-white/30">
          {/* triángulo play */}
          <svg viewBox="0 0 24 24" className="m-auto h-4 w-4 fill-white/90">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </div>
    </div>
  );
}

function BuyBox({ p }: { p: Product }) {
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const priceUSD = (p.price / 100).toFixed(2);

  const disableBuy = p.soldOut || p.stock <= 0;

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">{p.name}</h1>
          {p.soldOut && (
            <span className="ml-2 rounded-full bg-red-500/20 text-red-300 text-xs px-2 py-0.5">
              Agotado
            </span>
          )}
        </div>
        <p className="text-white/70 mt-1">{p.subtitle}</p>
        <div className="mt-3 flex items-center gap-3 text-sm">
          <span className="text-white/90">${priceUSD}</span>
          <span className="text-white/60">•</span>
          <span className="text-white/80">
            ⭐ {p.rating} ({p.reviews})
          </span>
          <span className="text-white/60">•</span>
          <span className={disableBuy ? "text-red-400" : "text-green-400"}>
            {disableBuy ? "Sin stock" : "En stock"}
          </span>
        </div>
        <div className="mt-3 flex gap-2 flex-wrap">
          {p.badges.map((b) => (
            <span
              key={b}
              className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10"
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm text-white/80">Cantidad</label>
        <div className="flex items-center rounded-lg border border-white/10">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-3 py-2 text-white/80"
            aria-label="menos"
          >
            −
          </button>
          <input
            value={qty}
            onChange={(e) => {
              const v = parseInt(e.target.value || "1", 10);
              setQty(Number.isNaN(v) ? 1 : Math.max(1, v));
            }}
            className="w-12 text-center bg-transparent outline-none py-2"
          />
          <button
            onClick={() => setQty((q) => q + 1)}
            className="px-3 py-2 text-white/80"
            aria-label="más"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          disabled={disableBuy || loading}
          className="px-5 py-3 rounded-xl bg-white text-black font-medium hover:bg-blue-100 disabled:opacity-60"
        >
          {disableBuy ? "Agotado" : loading ? "Procesando…" : "Comprar ahora"}
        </button>

        {/* Botón verde -> abre modal de contacto */}
        <button
          type="button"
          onClick={() => setContactOpen(true)}
          className="px-5 py-3 rounded-xl bg-green-500 hover:bg-green-400 text-black font-medium"
        >
          Enviar mensaje
        </button>
      </div>

      <div className="text-sm text-white/60">
        <p>{p.net}</p>
        <p className="mt-1">Pago seguro con Amazon. Envíos USA 24–48 h.</p>
      </div>

      {/* Sticky CTA móvil */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#0a1220]/95 backdrop-blur px-4 py-3 flex items-center justify-between lg:hidden"
      >
        <div>
          <p className="text-white/90 font-medium">{p.name}</p>
        </div>
        <div className="flex gap-2">
          <button
            disabled={disableBuy || loading}
            className="px-4 py-2 rounded-lg bg-white text-black font-medium disabled:opacity-60"
          >
            {disableBuy ? "Agotado" : "Comprar"}
          </button>
          <button
            onClick={() => setContactOpen(true)}
            className="px-4 py-2 rounded-lg bg-green-500 text-black font-medium"
          >
            Mensaje
          </button>
        </div>
      </motion.div>

      <ContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        productName={p.name}
      />
    </div>
  );
}

function ContactModal({
  open,
  onClose,
  productName,
}: {
  open: boolean;
  onClose: () => void;
  productName: string;
}) {
  const phoneIntl = "+16452234957";
  const enc = (s: string) => encodeURIComponent(s);
  const baseMsg = `Hola, quiero ${productName} — desde la web.`;
  const wa = `https://wa.me/16452234957?text=${enc(baseMsg)}`;
  const sms = `sms:${phoneIntl}?&body=${enc(baseMsg)}`;

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
              className="w-[92vw] max-w-md rounded-2xl bg-[#0b1526] border border-white/10 p-5"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Enviar mensaje</h3>
                <button
                  onClick={onClose}
                  className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white"
                  aria-label="Cerrar"
                >
                  ✕
                </button>
              </div>
              <p className="text-white/70 text-sm mb-4">
                Elegí cómo querés contactar a Britos.
              </p>
              <div className="grid gap-3">
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener"
                  className="w-full text-center px-4 py-3 rounded-xl bg-green-500 hover:bg-green-400 text-black font-medium"
                >
                  WhatsApp (+1 645 223-4957)
                </a>
                <a
                  href={sms}
                  className="w-full text-center px-4 py-3 rounded-xl bg-white hover:bg-blue-100 text-black font-medium"
                >
                  SMS / iMessage
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
