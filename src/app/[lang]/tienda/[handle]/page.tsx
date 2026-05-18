import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { hasLocale, getDictionary } from "@/dictionaries";
import { getProductByHandle, mockProducts } from "@/lib/mock-data";
import AddToCartButton from "@/components/shop/AddToCartButton";
import Badge from "@/components/ui/Badge";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return mockProducts.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  if (!product) return {};
  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ lang: string; handle: string }>;
}) {
  const { lang, handle } = await params;

  if (!hasLocale(lang)) notFound();

  const product = getProductByHandle(handle);
  if (!product) notFound();

  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        {/* Back */}
        <Link
          href={`/${lang}/tienda`}
          className="inline-flex items-center gap-2 text-brand-mid hover:text-brand-dark font-body text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {lang === "es" ? "Volver a la tienda" : "Back to shop"}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <div className="relative aspect-square bg-brand-beige/50 overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              unoptimized
              priority
            />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="flex flex-wrap gap-2 mb-4">
              {product.tags.map((tag) => (
                <Badge key={tag} variant={tag === "featured" ? "green" : "beige"}>
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="font-heading font-bold text-brand-dark text-3xl sm:text-4xl mb-4">
              {product.title}
            </h1>

            <p className="font-body text-brand-mid/90 text-base leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Specs grid */}
            <div className="grid grid-cols-2 gap-4 mb-6 bg-brand-beige/50 p-5">
              {[
                { label: dict.shop.origin, value: product.origin },
                { label: dict.shop.process, value: product.process },
                { label: dict.shop.roast, value: product.roast },
                { label: dict.shop.weight, value: product.weight },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="font-body text-brand-mid text-xs uppercase tracking-wider mb-0.5">
                    {label}
                  </p>
                  <p className="font-body font-medium text-brand-dark text-sm">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Flavor notes */}
            <div className="mb-8">
              <p className="font-body text-brand-mid text-xs uppercase tracking-wider mb-2">
                {dict.shop.flavor_notes}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.flavorNotes.map((note) => (
                  <span
                    key={note}
                    className="font-body text-sm text-brand-mid bg-brand-beige px-3 py-1"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <p className="font-heading font-bold text-brand-dark text-4xl">
                {new Intl.NumberFormat(lang === "es" ? "es-CO" : "en-US", {
                  style: "currency",
                  currency: product.currencyCode,
                  minimumFractionDigits: 2,
                }).format(product.price)}
              </p>
              <span className="font-body text-brand-mid/60 text-sm">
                {product.weight}
              </span>
            </div>

            {/* Add to cart */}
            <AddToCartButton
              product={product}
              lang={lang}
              label={dict.shop.add_to_cart}
              addedLabel={dict.shop.added}
            />

            {/* Stock status */}
            <p className="font-body text-sm mt-3 text-center">
              <span
                className={
                  product.inStock
                    ? "text-brand-green"
                    : "text-red-500"
                }
              >
                ●
              </span>{" "}
              {product.inStock ? dict.shop.in_stock : dict.shop.out_of_stock}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
