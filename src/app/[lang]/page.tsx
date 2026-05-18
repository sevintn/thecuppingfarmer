import { notFound } from "next/navigation";
import { hasLocale, getDictionary } from "@/dictionaries";
import { getFeaturedProducts } from "@/lib/mock-data";
import { getProducts, normalizeShopifyProduct } from "@/lib/shopify";
import Hero from "@/components/home/Hero";
import MissionBlock from "@/components/home/MissionBlock";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ExperiencesTeaser from "@/components/home/ExperiencesTeaser";
import SocialLinks from "@/components/home/SocialLinks";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title:
      lang === "es"
        ? "The Cupping Farmer — Café de especialidad"
        : "The Cupping Farmer — Specialty Coffee",
    description:
      lang === "es"
        ? "Cultivamos, procesamos y compartimos el mejor café de origen. Tienda online, catas y experiencias cafeteras."
        : "We grow, process and share the finest single-origin coffee. Online shop, cuppings and coffee experiences.",
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  let featuredProducts;
  try {
    const shopifyProducts = await getProducts(10);
    const normalized = shopifyProducts.map(normalizeShopifyProduct);
    const tagged = normalized.filter((p) => p.featured);
    // If no product is tagged "featured", show the first 3
    featuredProducts = (tagged.length > 0 ? tagged : normalized).slice(0, 3);
  } catch {
    featuredProducts = getFeaturedProducts();
  }

  return (
    <>
      <Hero lang={lang} dict={dict} />
      <MissionBlock dict={dict} />
      <FeaturedProducts lang={lang} products={featuredProducts} dict={dict} />
      <ExperiencesTeaser lang={lang} dict={dict} />
      <SocialLinks dict={dict} />
    </>
  );
}
