// app/manifest.ts
export default function manifest() {
  return {
    name: "Britos",
    short_name: "Britos",
    description: "Productos de barbería y marca personal de Gastón Britos.",
    start_url: "/",
    display: "standalone",
    background_color: "#08111d",
    theme_color: "#0a1f3a",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ]
  };
}
