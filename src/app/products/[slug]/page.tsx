// app/products/[slug]/page.tsx  (SERVER)
import ClientProductPage from "./product-client";

export const dynamicParams = false; // no aceptar slugs fuera de los generados

export async function generateStaticParams() {
  // lista cerrada de slugs a exportar
  return [{ slug: "gel" }, { slug: "powder" }, { slug: "salt" }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;   // unwrap en Next 16
  return <ClientProductPage slug={slug} />;
}
