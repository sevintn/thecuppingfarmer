"use client";

import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Button from "@/components/ui/Button";

interface CartDrawerProps {
  lang: string;
  dict: {
    shop: {
      cart_title: string;
      empty_cart: string;
      subtotal: string;
      checkout: string;
      quantity: string;
    };
  };
}

export default function CartDrawer({ lang, dict }: CartDrawerProps) {
  const {
    isOpen,
    closeCart,
    items,
    removeItem,
    updateQuantity,
    itemCount,
    subtotal,
    checkoutUrl,
  } = useCart();

  const formatPrice = (amount: number, currency = "USD") =>
    new Intl.NumberFormat(lang === "es" ? "es-CO" : "en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(amount);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm z-40"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={[
          "fixed right-0 top-0 h-full w-full max-w-md bg-brand-cream z-50 pb-safe",
          "flex flex-col shadow-2xl transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-label={dict.shop.cart_title}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-beige">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-brand-dark" />
            <h2 className="font-heading font-semibold text-brand-dark text-lg">
              {dict.shop.cart_title}
            </h2>
            {itemCount > 0 && (
              <span className="bg-brand-dark text-brand-cream text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 text-brand-mid hover:text-brand-dark transition-colors rounded"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag className="w-12 h-12 text-brand-beige" />
              <p className="font-body text-brand-mid text-sm">
                {dict.shop.empty_cart}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={closeCart}
                className="mt-2"
              >
                {lang === "es" ? "Explorar tienda" : "Explore shop"}
              </Button>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map((item) => (
                <li
                  key={item.variantId}
                  className="flex gap-4 pb-5 border-b border-brand-beige last:border-0"
                >
                  {/* Image placeholder */}
                  <div className="w-16 h-16 flex-shrink-0 bg-brand-beige overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6 text-brand-mid/40" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-medium text-brand-dark text-sm leading-tight truncate">
                      {item.title}
                    </p>
                    <p className="font-body text-brand-mid text-sm mt-1">
                      {formatPrice(item.price, item.currencyCode)}
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.variantId, item.quantity - 1)
                        }
                        className="w-6 h-6 flex items-center justify-center border border-brand-beige text-brand-dark hover:border-brand-mid transition-colors"
                        aria-label="Reducir cantidad"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-body text-brand-dark text-sm w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.variantId, item.quantity + 1)
                        }
                        className="w-6 h-6 flex items-center justify-center border border-brand-beige text-brand-dark hover:border-brand-mid transition-colors"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.variantId)}
                    className="p-1 text-brand-mid/50 hover:text-brand-mid transition-colors flex-shrink-0"
                    aria-label="Eliminar producto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-brand-beige space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-body text-brand-dark text-sm">
                {dict.shop.subtotal}
              </span>
              <span className="font-heading font-semibold text-brand-dark text-lg">
                {formatPrice(subtotal)}
              </span>
            </div>
            {checkoutUrl ? (
              <a href={checkoutUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg" fullWidth>
                  {dict.shop.checkout}
                </Button>
              </a>
            ) : (
              <Button variant="primary" size="lg" fullWidth disabled>
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin w-4 h-4 text-brand-cream"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12" cy="12" r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  {dict.shop.checkout}
                </span>
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
