// src/components/Products.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { motion } from "framer-motion";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  priceId: string;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

// media query segura para SSR
function useMediaQuery(query: string) {
  const [match, setMatch] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatch(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return match;
}

export default function Products() {
  const [items, setItems] = useState<Product[]>([]);
  const isLg = useMediaQuery("(min-width:1024px)");

  useEffect(() => {
    setItems([
      {
        id: "gel",
        name: "Gel",
        price: 18_00,
        image: "/gel.jpg",
        priceId: "price_xxx",
      },
      {
        id: "powder",
        name: "Styling Powder",
        price: 22_00,
        image: "/powder.jpg",
        priceId: "price_xxx",
      },
      {
        id: "salt",
        name: "Sea Salt Spray",
        price: 20_00,
        image: "/sea_salt_spray.jpg",
        priceId: "price_xxx",
      },
    ]);
  }, []);

  if (isLg === null) return null;

  return isLg ? (
    <ProductsDesktop items={items} onCheckout={checkout} />
  ) : (
    <ProductsMobile items={items} onCheckout={checkout} />
  );
}

// ≥1024: 900px exactos, 3 col
function ProductsDesktop({
  items,
  onCheckout,
}: {
  items: Product[];
  onCheckout: (priceId: string, id: string) => Promise<void>;
}) {
  const vw = 900;
  const cardsPerView = 3;
  const gap = 24;
  const cardW = Math.round((vw - gap * (cardsPerView - 1)) / cardsPerView);

  const maxIndex = Math.max(items.length - cardsPerView, 0);
  const [index, setIndex] = useState(0);
  const x = -(cardW + gap) * index;

  return (
    <div className="relative mx-auto px-4">
      <div className="mx-auto overflow-hidden w-[900px]">
        <motion.div
          className="flex"
          style={{ gap }}
          animate={{ x }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
        >
          {items.map((p) => (
            <Card
              key={p.id}
              p={p}
              cardW={cardW}
              imgH="h-80"
              onCheckout={onCheckout}
            />
          ))}
        </motion.div>
      </div>

      <Arrows
        onPrev={() => setIndex((i) => Math.max(i - 1, 0))}
        onNext={() => setIndex((i) => Math.min(i + 1, maxIndex))}
        disablePrev={index === 0}
        disableNext={index === maxIndex}
      />

      <Dots count={maxIndex + 1} index={index} goTo={setIndex} />
    </div>
  );
}

// <1024: 350 / 700, 1–2 col
function ProductsMobile({
  items,
  onCheckout,
}: {
  items: Product[];
  onCheckout: (priceId: string, id: string) => Promise<void>;
}) {
  const vpRef = useRef<HTMLDivElement | null>(null);
  const [vw, setVw] = useState(0);

  useEffect(() => {
    const el = vpRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setVw(el.clientWidth));
    ro.observe(el);
    setVw(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const cardsPerView = vw >= 640 ? 2 : 1;
  const gap = cardsPerView === 1 ? 12 : 24;
  const cardW = vw
    ? Math.round((vw - gap * (cardsPerView - 1)) / cardsPerView)
    : 0;

  const maxIndex = Math.max(items.length - cardsPerView, 0);
  const [index, setIndex] = useState(0);
  const x = -(cardW + gap) * index;

  return (
    <div className="relative mx-auto px-4">
      <div
        ref={vpRef}
        className="mx-auto overflow-hidden w-full max-w-[350px] sm:max-w-[700px]"
      >
        <motion.div
          className="flex"
          style={{ gap }}
          animate={{ x }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
        >
          {items.map((p) => (
            <Card
              key={p.id}
              p={p}
              cardW={cardW}
              imgH="h-72 sm:h-80"
              onCheckout={onCheckout}
            />
          ))}
        </motion.div>
      </div>

      <Arrows
        onPrev={() => setIndex((i) => Math.max(i - 1, 0))}
        onNext={() => setIndex((i) => Math.min(i + 1, maxIndex))}
        disablePrev={index === 0}
        disableNext={index === maxIndex}
      />

      <Dots count={maxIndex + 1} index={index} goTo={setIndex} />
    </div>
  );
}

// UI
function Card({
  p,
  cardW,
  imgH,
  onCheckout,
}: {
  p: Product;
  cardW: number;
  imgH: string;
  onCheckout: (priceId: string, id: string) => Promise<void>;
}) {
  const href = `/products/${p.id}`;
  return (
    <div
      style={{ width: cardW, minWidth: cardW }}
      className="group bg-[#0b1526] rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/5 hover:border-blue-400/40"
    >
      <Link href={href} className="block">
        <img
          src={p.image}
          alt={p.name}
          className={`w-full ${imgH} object-cover rounded-lg`}
        />
      </Link>
      <div className="mt-3 sm:mt-4 flex items-center justify-between">
        <div>
          <Link
            href={href}
            className="font-semibold text-base sm:text-lg hover:underline"
          >
            {p.name}
          </Link>
          <p className="text-blue-300 text-sm sm:text-base">
            ${(p.price / 100).toFixed(2)}
          </p>
        </div>
        <button
          onClick={() => onCheckout(p.priceId, p.id)}
          className="px-4 py-2 rounded-lg font-medium bg-white text-black hover:bg-blue-100"
        >
          Comprar
        </button>
      </div>
    </div>
  );
}

function Arrows({
  onPrev,
  onNext,
  disablePrev,
  disableNext,
}: {
  onPrev: () => void;
  onNext: () => void;
  disablePrev: boolean;
  disableNext: boolean;
}) {
  return (
    <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between">
      <motion.button
        onClick={onPrev}
        disabled={disablePrev}
        whileTap={{ scale: 0.95, x: -2 }}
        className="pointer-events-auto -ml-3 p-2 rounded-full bg-blue-500/85 hover:bg-blue-500 text-white shadow-lg disabled:opacity-40"
        aria-label="Anterior"
      >
        ‹
      </motion.button>
      <motion.button
        onClick={onNext}
        disabled={disableNext}
        whileTap={{ scale: 0.95, x: 2 }}
        className="pointer-events-auto -mr-3 p-2 rounded-full bg-blue-500/85 hover:bg-blue-500 text-white shadow-lg disabled:opacity-40"
        aria-label="Siguiente"
      >
        ›
      </motion.button>
    </div>
  );
}

function Dots({
  count,
  index,
  goTo,
}: {
  count: number;
  index: number;
  goTo: (i: number) => void;
}) {
  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => goTo(i)}
          aria-label={`Ir al slide ${i + 1}`}
          className={`h-2.5 rounded-full transition ${
            i === index
              ? "bg-blue-400 w-6"
              : "bg-white/30 w-2.5 hover:bg-white/50"
          }`}
        />
      ))}
    </div>
  );
}
