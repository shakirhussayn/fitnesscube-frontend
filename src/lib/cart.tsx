import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartLine = {
  slug: string;
  name: string;
  variant?: string;
  price: number;
  quantity: number;
  image: string;
};

type CartValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (line: Omit<CartLine, "quantity">, quantity?: number) => void;
  setQuantity: (slug: string, variant: string | undefined, quantity: number) => void;
  remove: (slug: string, variant?: string) => void;
  clear: () => void;
};

const STORAGE_KEY = "fitnesscube.cart.v1";

const CartContext = createContext<CartValue | null>(null);

const sameLine = (a: CartLine, slug: string, variant?: string) =>
  a.slug === slug && (a.variant ?? "") === (variant ?? "");

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore corrupt cart */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const value = useMemo<CartValue>(() => {
    return {
      lines,
      count: lines.reduce((n, l) => n + l.quantity, 0),
      subtotal: lines.reduce((n, l) => n + l.quantity * l.price, 0),
      add: (line, quantity = 1) =>
        setLines((current) => {
          const existing = current.find((l) => sameLine(l, line.slug, line.variant));
          if (existing) {
            return current.map((l) =>
              sameLine(l, line.slug, line.variant) ? { ...l, quantity: l.quantity + quantity } : l,
            );
          }
          return [...current, { ...line, quantity }];
        }),
      setQuantity: (slug, variant, quantity) =>
        setLines((current) =>
          quantity <= 0
            ? current.filter((l) => !sameLine(l, slug, variant))
            : current.map((l) => (sameLine(l, slug, variant) ? { ...l, quantity } : l)),
        ),
      remove: (slug, variant) => setLines((current) => current.filter((l) => !sameLine(l, slug, variant))),
      clear: () => setLines([]),
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
