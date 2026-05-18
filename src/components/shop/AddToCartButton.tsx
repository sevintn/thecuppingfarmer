"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { MockProduct } from "@/lib/mock-data";
import Button from "@/components/ui/Button";

interface AddToCartButtonProps {
  product: MockProduct;
  lang: string;
  label: string;
  addedLabel: string;
}

export default function AddToCartButton({
  product,
  lang,
  label,
  addedLabel,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
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
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product.inStock) {
    return (
      <Button variant="secondary" size="lg" fullWidth disabled>
        {lang === "es" ? "Agotado" : "Out of stock"}
      </Button>
    );
  }

  return (
    <Button
      variant={added ? "secondary" : "primary"}
      size="lg"
      fullWidth
      onClick={handleAdd}
      className={added ? "bg-brand-green text-brand-cream" : ""}
    >
      <ShoppingBag className="w-5 h-5" />
      {added ? addedLabel : label}
    </Button>
  );
}
