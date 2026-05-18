"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ShoppingBag, Eye } from "lucide-react";
import type { MockProduct } from "@/lib/mock-data";
import Badge from "@/components/ui/Badge";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: MockProduct;
  lang: string;
  dict: {
    add_to_cart: string;
    view_details: string;
    origin: string;
    process: string;
    flavor_notes: string;
    in_stock: string;
    out_of_stock: string;
  };
}

export default function ProductCard({ product, lang, dict }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addItem({
      variantId: product.variantId,
      productHandle: product.handle,
      title: product.title,
      price: product.price,
      currencyCode: product.currencyCode,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const formatPrice = (amount: number, currency: string) =>
    new Intl.NumberFormat(lang === "es" ? "es-CO" : "en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(amount);

  return (
    <article className="group bg-brand-cream border border-brand-beige hover:border-brand-mid/40 hover:shadow-lg transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-brand-beige/50">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-brand-dark/50 flex items-center justify-center">
            <Badge variant="dark">{dict.out_of_stock}</Badge>
          </div>
        )}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.tags.includes("featured") && (
            <Badge variant="green">
              {lang === "es" ? "Destacado" : "Featured"}
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <p className="font-body text-brand-mid text-xs uppercase tracking-wider mb-1">
          {product.origin} · {product.process}
        </p>
        <h3 className="font-heading font-semibold text-brand-dark text-lg leading-tight mb-2 flex-1">
          {product.title}
        </h3>

        {/* Flavor notes */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.flavorNotes.map((note) => (
            <span
              key={note}
              className="text-xs font-body text-brand-mid bg-brand-beige px-2 py-0.5"
            >
              {note}
            </span>
          ))}
        </div>

        {/* Price + weight */}
        <div className="flex items-end justify-between mb-4">
          <p className="font-heading font-bold text-brand-dark text-xl">
            {formatPrice(product.price, product.currencyCode)}
          </p>
          <span className="font-body text-brand-mid/60 text-xs">
            {product.weight}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || added}
            className={[
              "flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-body font-medium transition-all duration-200",
              product.inStock && !added
                ? "bg-brand-dark text-brand-cream hover:bg-brand-mid active:scale-[0.98]"
                : added
                ? "bg-brand-green text-brand-cream"
                : "bg-brand-beige text-brand-mid/50 cursor-not-allowed",
            ].join(" ")}
          >
            <ShoppingBag className="w-4 h-4" />
            {added
              ? lang === "es"
                ? "¡Agregado!"
                : "Added!"
              : dict.add_to_cart}
          </button>
          <Link
            href={`/${lang}/tienda/${product.handle}`}
            className="flex items-center justify-center w-10 h-10 border border-brand-beige text-brand-mid hover:border-brand-mid hover:text-brand-dark transition-colors"
            aria-label={dict.view_details}
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
