// app/robots.ts
export default function robots() {
  const base = "https://www.britos.com";
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
    host: base
  };
}
