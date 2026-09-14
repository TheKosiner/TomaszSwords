"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PRODUCTS, type Product } from "./products";

export type CartLine = { slug: string; qty: number };

type CartState = {
  lines: CartLine[];
  items: (CartLine & { product: Product })[];
  count: number;
  total: number;
  isOpen: boolean;
  lastAdded: string | null;
  add: (slug: string, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<CartState | null>(null);
const STORAGE_KEY = "tomasz-swords:cart:v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) setLines(parsed.filter((l) => l && typeof l.slug === "string"));
      }
    } catch {
      /* brak dostępu do localStorage – koszyk działa w pamięci sesji */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignorujemy – tryb prywatny */
    }
  }, [lines, hydrated]);

  const add = useCallback((slug: string, qty = 1) => {
    setLines((prev) => {
      const found = prev.find((l) => l.slug === slug);
      if (found) {
        return prev.map((l) => (l.slug === slug ? { ...l, qty: Math.min(l.qty + qty, 99) } : l));
      }
      return [...prev, { slug, qty }];
    });
    setLastAdded(slug);
    setIsOpen(true);
  }, []);

  const remove = useCallback((slug: string) => {
    setLines((prev) => prev.filter((l) => l.slug !== slug));
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.slug !== slug)
        : prev.map((l) => (l.slug === slug ? { ...l, qty: Math.min(qty, 99) } : l)),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const items = useMemo(
    () =>
      lines
        .map((line) => {
          const product = PRODUCTS.find((p) => p.slug === line.slug);
          return product ? { ...line, product } : null;
        })
        .filter((v): v is CartLine & { product: Product } => v !== null),
    [lines],
  );

  const value: CartState = useMemo(
    () => ({
      lines,
      items,
      count: items.reduce((sum, i) => sum + i.qty, 0),
      total: items.reduce((sum, i) => sum + i.qty * i.product.price, 0),
      isOpen,
      lastAdded,
      add,
      remove,
      setQty,
      clear,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [lines, items, isOpen, lastAdded, add, remove, setQty, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart musi być użyty wewnątrz <CartProvider>");
  return ctx;
}
