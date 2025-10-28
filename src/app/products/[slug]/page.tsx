// app/products/[slug]/page.tsx  // SERVER COMPONENT (sin "use client")
import ClientProductPage from "./product-client";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // Next 16: params es Promise
  return <ClientProductPage slug={slug} />;
}
