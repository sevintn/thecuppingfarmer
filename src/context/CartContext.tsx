"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import { createShopifyCart, addLineToShopifyCart } from "@/lib/shopify-client";

export interface CartItem {
  variantId: string;
  productHandle: string;
  title: string;
  price: number;
  currencyCode: string;
  quantity: number;
  image?: string;
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  itemCount: number;
  subtotal: number;
  checkoutUrl: string | null;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  // Shopify cart id kept in a ref so it's available in async callbacks
  // without causing re-renders.
  const shopifyCartId = useRef<string | null>(null);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((newItem: Omit<CartItem, "quantity">) => {
    // 1. Update local UI state immediately (optimistic)
    setItems((prev) => {
      const existing = prev.find((i) => i.variantId === newItem.variantId);
      if (existing) {
        return prev.map((i) =>
          i.variantId === newItem.variantId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
    setIsOpen(true);

    // 2. Sync with Shopify cart in the background
    const syncWithShopify = async () => {
      try {
        if (!shopifyCartId.current) {
          // First item — create a new Shopify cart
          const cart = await createShopifyCart(newItem.variantId, 1);
          shopifyCartId.current = cart.id;
          setCheckoutUrl(cart.checkoutUrl);
        } else {
          // Cart already exists — add the line
          const cart = await addLineToShopifyCart(
            shopifyCartId.current,
            newItem.variantId,
            1
          );
          setCheckoutUrl(cart.checkoutUrl);
        }
      } catch {
        // Shopify sync failed silently — local cart still works;
        // checkout button will fall back to the shop page.
      }
    };
    syncWithShopify();
  }, []);

  const removeItem = useCallback((variantId: string) => {
    setItems((prev) => prev.filter((i) => i.variantId !== variantId));
  }, []);

  const updateQuantity = useCallback(
    (variantId: string, quantity: number) => {
      if (quantity <= 0) {
        setItems((prev) => prev.filter((i) => i.variantId !== variantId));
      } else {
        setItems((prev) =>
          prev.map((i) =>
            i.variantId === variantId ? { ...i, quantity } : i
          )
        );
      }
    },
    []
  );

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        itemCount,
        subtotal,
        checkoutUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
