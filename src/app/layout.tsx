// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "components/Navbar";
import { inter, sora } from "./fonts";

export const metadata: Metadata = {
  title: "Britos Barber",
  description: "Productos y marca personal de Gastón Britos",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${sora.variable}`}>
      <body className="font-sans bg-[#08111d] text-white antialiased [color-scheme:dark]">
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(90%_60%_at_50%_-10%,#10325c_0%,transparent_60%),radial-gradient(60%_50%_at_80%_20%,#0a1f3a_0%,transparent_60%)]" />
        <Navbar />
        <main className="flex flex-col gap-24 pt-20">{children}</main>
      </body>
    </html>
  );
}

