// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "components/Navbar";
import { inter, sora } from "./fonts";

const siteUrl = "https://www.britos.com"; // tu dominio

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Britos Barber",
    template: "%s | Britos Barber"
  },
  description: "Productos de barbería de alto rendimiento. Compra gel, polvo y sea salt spray.",
  applicationName: "Britos Barber",
  keywords: ["barbería", "gel", "polvo de peinar", "sea salt spray", "Britos"],
  authors: [{ name: "Gastón Britos" }],
  creator: "Britos",
  publisher: "Britos",
  alternates: { canonical: "/" },
  category: "ecommerce",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Britos Barber",
    title: "Britos Barber",
    description: "Productos de barbería de alto rendimiento.",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Britos Barber" }],
    locale: "es_US"
  },
  twitter: {
    card: "summary_large_image",
    title: "Britos Barber",
    description: "Productos de barbería de alto rendimiento.",
    images: ["/twitter-image.png"]
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png" }]
  },
  manifest: "/manifest.webmanifest",
  verification: {
    // añade si verificas Search Console o Bing
    // google: "tu-token",
    // other: { me: ["mailto:hello@britos.com"] }
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${sora.variable}`}>
      <body className="font-sans bg-[#08111d] text-white antialiased [color-scheme:dark]">
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(90%_60%_at_50%_-10%,#10325c_0%,transparent_60%),radial-gradient(60%_50%_at_80%_20%,#0a1f3a_0%,transparent_60%)]" />
        <Navbar />
        <main className="flex flex-col gap-24 pt-20">{children}</main>

        {/* Organization + Website JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Britos Barber",
              url: siteUrl,
              logo: `${siteUrl}/logo-britos-mark.png`,
              sameAs: [
                "https://www.instagram.com/tuCuenta",
                "https://www.tiktok.com/@tuCuenta"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: siteUrl,
              name: "Britos Barber",
              potentialAction: {
                "@type": "SearchAction",
                target: `${siteUrl}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
