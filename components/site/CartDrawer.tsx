"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "@/lib/cart";
import { formatPLN } from "@/lib/products";
import SwordArt from "@/components/ui/SwordArt";

const FREE_SHIPPING = 2000;

export function CartDrawer() {
  const { isOpen, close, items, total, setQty, remove, count } = useCart();
  const missing = Math.max(FREE_SHIPPING - total, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[80] bg-void/80 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
            className="fixed right-0 top-0 z-[90] flex h-full w-full max-w-md flex-col border-l border-forge-700 bg-forge-950"
            role="dialog"
            aria-label="Koszyk"
          >
            <header className="flex items-center justify-between border-b border-forge-800 px-6 py-5">
              <div>
                <p className="eyebrow">Zbrojownia</p>
                <h2 className="mt-1 text-xl text-parchment">Twój koszyk</h2>
              </div>
              <button
                onClick={close}
                className="grid h-9 w-9 place-items-center rounded-full border border-forge-600 text-parchment-dim transition-colors hover:border-gold-600 hover:text-gold-300"
                aria-label="Zamknij koszyk"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
                <div className="h-24 w-px bg-gradient-to-b from-transparent via-forge-600 to-transparent" />
                <p className="text-sm text-parchment-dim">
                  Kuźnia czeka. Jeszcze nic tu nie leży.
                </p>
                <Link
                  href="/sklep"
                  onClick={close}
                  className="rounded-full border border-gold-600/60 px-6 py-2.5 font-display text-[11px] uppercase tracking-[0.28em] text-gold-300 transition-colors hover:bg-gold-500 hover:text-forge-950"
                >
                  Do zbrojowni
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <AnimatePresence initial={false}>
                    {items.map(({ product, qty }) => (
                      <motion.div
                        key={product.slug}
                        layout
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        className="mb-4 flex gap-4 border-b border-forge-800 pb-4"
                      >
                        <Link
                          href={`/sklep/${product.slug}`}
                          onClick={close}
                          className="grid h-24 w-16 shrink-0 place-items-center rounded-lg bg-forge-900"
                        >
                          <SwordArt id={`cart-${product.slug}`} art={product.art} className="h-20 w-auto" animated={false} />
                        </Link>
                        <div className="min-w-0 flex-1">
                          <Link
                            href={`/sklep/${product.slug}`}
                            onClick={close}
                            className="block truncate font-display text-sm text-parchment hover:text-gold-300"
                          >
                            {product.name}
                          </Link>
                          <p className="mt-0.5 truncate text-[11px] text-ash">{product.steel}</p>
                          <div className="mt-3 flex items-center justify-between gap-3">
                            <div className="flex items-center rounded-full border border-forge-600">
                              <button
                                onClick={() => setQty(product.slug, qty - 1)}
                                className="grid h-7 w-7 place-items-center text-parchment-dim hover:text-gold-300"
                                aria-label="Zmniejsz ilość"
                              >
                                −
                              </button>
                              <span className="w-6 text-center text-xs tabular-nums">{qty}</span>
                              <button
                                onClick={() => setQty(product.slug, qty + 1)}
                                className="grid h-7 w-7 place-items-center text-parchment-dim hover:text-gold-300"
                                aria-label="Zwiększ ilość"
                              >
                                +
                              </button>
                            </div>
                            <span className="text-sm text-gold-300 tabular-nums">
                              {formatPLN(product.price * qty)}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => remove(product.slug)}
                          className="self-start text-ash transition-colors hover:text-blood-500"
                          aria-label={`Usuń ${product.name}`}
                        >
                          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M6 6l12 12M18 6 6 18" />
                          </svg>
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <footer className="border-t border-forge-800 px-6 py-5">
                  <div className="mb-4">
                    <div className="mb-2 flex justify-between text-[11px] uppercase tracking-[0.2em] text-ash">
                      <span>{missing > 0 ? "Do darmowej wysyłki" : "Wysyłka gratis"}</span>
                      <span className="tabular-nums">{missing > 0 ? formatPLN(missing) : "✓"}</span>
                    </div>
                    <div className="h-1 overflow-hidden rounded-full bg-forge-800">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-ember-600 via-gold-500 to-gold-300"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((total / FREE_SHIPPING) * 100, 100)}%` }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                  <div className="mb-4 flex items-end justify-between">
                    <span className="text-sm text-parchment-dim">Razem ({count})</span>
                    <span className="font-display text-2xl text-forged">{formatPLN(total)}</span>
                  </div>
                  <Link
                    href="/koszyk"
                    onClick={close}
                    className="sheen block w-full rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 py-3.5 text-center font-display text-[11px] uppercase tracking-[0.3em] text-forge-950"
                  >
                    Przejdź do zamówienia
                  </Link>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default CartDrawer;
