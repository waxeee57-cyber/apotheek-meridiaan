"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { getProduct, shippingFor } from "@/lib/catalog";
import { createBrowserStore } from "@/lib/browser-store";
import { STORAGE_KEYS } from "@/lib/storage";
import type { CartItem } from "@/lib/types";
import { createContext, useContext, type ReactNode } from "react";

const cartStore = createBrowserStore<CartItem[]>(STORAGE_KEYS.cart, []);

type CartContextValue = {
  items: CartItem[];
  ready: boolean;
  add: (slug: string, quantity?: number) => { ok: boolean; reason?: string };
  setQuantity: (slug: string, quantity: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const raw = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.snapshot,
    cartStore.getServerSnapshot,
  );
  const items = useMemo(() => cartStore.parse(raw), [raw]);

  const add = useCallback((slug: string, quantity = 1) => {
    const product = getProduct(slug);
    if (!product) {
      return { ok: false, reason: "Product niet gevonden." };
    }
    if (product.stock <= 0) {
      return { ok: false, reason: "Dit product is tijdelijk uitverkocht." };
    }
    const current = cartStore.parse(cartStore.snapshot());
    const existing = current.find((item) => item.slug === slug);
    const nextQty = Math.min((existing?.quantity ?? 0) + quantity, product.stock, 10);
    const next = existing
      ? current.map((item) => (item.slug === slug ? { ...item, quantity: nextQty } : item))
      : [...current, { slug, quantity: nextQty }];
    cartStore.set(next);
    return { ok: true };
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    const product = getProduct(slug);
    if (!product) {
      return;
    }
    const capped = Math.max(0, Math.min(quantity, product.stock, 10));
    const current = cartStore.parse(cartStore.snapshot());
    const next =
      capped === 0
        ? current.filter((item) => item.slug !== slug)
        : current.map((item) => (item.slug === slug ? { ...item, quantity: capped } : item));
    cartStore.set(next);
  }, []);

  const remove = useCallback((slug: string) => {
    const current = cartStore.parse(cartStore.snapshot());
    cartStore.set(current.filter((item) => item.slug !== slug));
  }, []);

  const clear = useCallback(() => {
    cartStore.set([]);
  }, []);

  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () =>
      items.reduce((sum, item) => {
        const product = getProduct(item.slug);
        return product ? sum + product.price * item.quantity : sum;
      }, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      ready: true,
      add,
      setQuantity,
      remove,
      clear,
      count,
      subtotal,
    }),
    [items, add, setQuantity, remove, clear, count, subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart moet binnen CartProvider.");
  }
  return ctx;
}

export function cartShipping(
  subtotal: number,
  fulfillment: "bezorging" | "afhalen",
): number {
  return shippingFor(subtotal, fulfillment);
}
