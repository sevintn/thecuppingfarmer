import type { MockProduct } from "@/lib/mock-data";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: MockProduct[];
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

export default function ProductGrid({ products, lang, dict }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20 text-brand-mid font-body">
        {lang === "es"
          ? "No hay productos disponibles."
          : "No products available."}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          lang={lang}
          dict={dict}
        />
      ))}
    </div>
  );
}
