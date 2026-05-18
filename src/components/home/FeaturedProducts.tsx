import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { MockProduct } from "@/lib/mock-data";
import ProductCard from "@/components/shop/ProductCard";

interface FeaturedProductsProps {
  lang: string;
  products: MockProduct[];
  dict: {
    featured: {
      title: string;
      subtitle: string;
      view_all: string;
    };
    shop: {
      add_to_cart: string;
      view_details: string;
      origin: string;
      process: string;
      flavor_notes: string;
      in_stock: string;
      out_of_stock: string;
    };
  };
}

export default function FeaturedProducts({
  lang,
  products,
  dict,
}: FeaturedProductsProps) {
  return (
    <section className="py-20 lg:py-28 bg-brand-beige/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="font-body text-brand-mid text-xs uppercase tracking-[0.25em] mb-2">
              {dict.featured.subtitle}
            </p>
            <h2 className="font-heading font-bold text-brand-dark text-3xl sm:text-4xl">
              {dict.featured.title}
            </h2>
          </div>
          <Link
            href={`/${lang}/tienda`}
            className="flex items-center gap-2 text-brand-mid hover:text-brand-dark font-body text-sm transition-colors group"
          >
            {dict.featured.view_all}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              lang={lang}
              dict={dict.shop}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
