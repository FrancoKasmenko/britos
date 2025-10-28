
import ClientProductPage from "./product-client";

export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ slug: "gel" }, { slug: "powder" }, { slug: "salt" }];
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ClientProductPage slug={slug} />;
}
