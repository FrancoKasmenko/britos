// app/sitemap.ts
export default async function sitemap() {
  const base = "https://www.britos.com"; 
  const now = new Date().toISOString();

  const routes = ["", "/about", "/negocios", "/products/gel", "/products/powder", "/products/salt"]
    .map((p) => ({
      url: `${base}${p}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: p.startsWith("/products/") ? 0.7 : 0.9
    }));

  return routes;
}
