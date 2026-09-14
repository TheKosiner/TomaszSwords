"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "@/lib/cart";
import { formatPLN } from "@/lib/products";
import SwordArt from "@/components/ui/SwordArt";

const SHIPPING = [
  { id: "kurier", label: "Kurier z ubezpieczeniem", time: "1–2 dni robocze", price: 29 },
  { id: "paczkomat", label: "Paczkomat (do 120 cm)", time: "1–2 dni robocze", price: 19 },
  { id: "odbior", label: "Odbiór osobisty", time: "po umówieniu", price: 0 },
];

const FREE_FROM = 2000;

export function CartPage() {
  const { items, total, setQty, remove, clear, count } = useCart();
  const [ship, setShip] = useState(SHIPPING[0]);
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<number | null>(null);
  const [placed, setPlaced] = useState(false);

  const shippingCost = total >= FREE_FROM ? 0 : ship.price;
  const discount = applied ? Math.round(total * applied) : 0;
  const grand = total - discount + shippingCost;

  if (items.length === 0 && !placed) {
    return (
      <div className="container-forge flex flex-col items-center gap-7 py-32 text-center">
        <div className="h-28 w-px bg-gradient-to-b from-transparent via-forge-600 to-transparent" />
        <h2 className="font-display text-2xl text-parchment">Koszyk jest pusty</h2>
        <p className="max-w-sm text-sm text-parchment-dim">
          Zbrojownia czeka. Czternaście pozycji, od sztyletu po dwuręczny kolos.
        </p>
        <Link
          href="/sklep"
          className="sheen rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 px-8 py-4 font-display text-[11px] uppercase tracking-[0.28em] text-forge-950"
        >
          Do zbrojowni
        </Link>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="container-forge flex flex-col items-center gap-6 py-32 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-full border border-gold-600/60 text-3xl text-gold-400">
          ✓
        </span>
        <h2 className="font-display text-3xl text-parchment">Zamówienie zapisane</h2>
        <p className="max-w-md text-sm leading-relaxed text-parchment-dim">
          To wersja demonstracyjna sklepu — płatności online nie są jeszcze
          podpięte, więc nic nie zostało obciążone ani wysłane. Docelowo w tym
          miejscu nastąpiłoby przekierowanie do bramki płatniczej.
        </p>
        <Link
          href="/sklep"
          className="rounded-full border border-gold-600/60 px-7 py-3.5 font-display text-[11px] uppercase tracking-[0.28em] text-gold-300 transition-colors hover:bg-gold-500 hover:text-forge-950"
        >
          Wróć do zbrojowni
        </Link>
      </div>
    );
  }

  return (
    <div className="container-forge grid gap-12 pb-24 lg:grid-cols-[1.4fr_0.9fr] lg:gap-16">
      {/* --------------------------------------------------- pozycje */}
      <div>
        <div className="flex items-center justify-between border-b border-forge-800 pb-4">
          <p className="text-[10px] uppercase tracking-[0.24em] text-ash">
            {count} {count === 1 ? "pozycja" : count < 5 ? "pozycje" : "pozycji"}
          </p>
          <button
            onClick={clear}
            className="text-[10px] uppercase tracking-[0.24em] text-ash transition-colors hover:text-blood-500"
          >
            Wyczyść koszyk
          </button>
        </div>

        <AnimatePresence initial={false}>
          {items.map(({ product, qty }) => (
            <motion.div
              key={product.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className="flex gap-6 border-b border-forge-800 py-6"
            >
              <Link
                href={`/sklep/${product.slug}`}
                className="grid h-36 w-24 shrink-0 place-items-center rounded-xl bg-forge-900"
              >
                <SwordArt id={`cartpage-${product.slug}`} art={product.art} className="h-32 w-auto" animated={false} />
              </Link>

              <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <Link
                        href={`/sklep/${product.slug}`}
                        className="font-display text-lg text-parchment transition-colors hover:text-gold-300"
                      >
                        {product.name}
                      </Link>
                      <p className="mt-1 text-xs text-ash">{product.subtitle}</p>
                    </div>
                    <button
                      onClick={() => remove(product.slug)}
                      className="shrink-0 text-ash transition-colors hover:text-blood-500"
                      aria-label={`Usuń ${product.name}`}
                    >
                      ✕
                    </button>
                  </div>
                  <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-parchment-dim">
                    {product.steel} · {product.hardness}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center rounded-full border border-forge-600">
                    <button
                      onClick={() => setQty(product.slug, qty - 1)}
                      className="grid h-10 w-10 place-items-center text-parchment-dim hover:text-gold-300"
                      aria-label="Zmniejsz ilość"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm tabular-nums">{qty}</span>
                    <button
                      onClick={() => setQty(product.slug, qty + 1)}
                      className="grid h-10 w-10 place-items-center text-parchment-dim hover:text-gold-300"
                      aria-label="Zwiększ ilość"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-display text-xl text-forged">
                    {formatPLN(product.price * qty)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* -------------------------------------------------- podsumowanie */}
      <aside className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:h-fit">
        <div className="panel noise rounded-3xl p-8">
          <h2 className="font-display text-xl text-parchment">Podsumowanie</h2>

          <div className="mt-7">
            <p className="text-[10px] uppercase tracking-[0.24em] text-ash">Dostawa</p>
            <div className="mt-3 space-y-2">
              {SHIPPING.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setShip(s)}
                  className={[
                    "flex w-full items-center justify-between gap-4 rounded-2xl border px-5 py-3.5 text-left transition-all duration-300",
                    ship.id === s.id
                      ? "border-gold-500 bg-gold-500/5"
                      : "border-forge-700 hover:border-forge-600",
                  ].join(" ")}
                >
                  <span>
                    <span className="block text-sm text-parchment">{s.label}</span>
                    <span className="block text-[10px] uppercase tracking-[0.18em] text-ash">
                      {s.time}
                    </span>
                  </span>
                  <span className="text-sm text-parchment-dim tabular-nums">
                    {total >= FREE_FROM || s.price === 0 ? "0 zł" : `${s.price} zł`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7">
            <p className="text-[10px] uppercase tracking-[0.24em] text-ash">Kod rabatowy</p>
            <div className="mt-3 flex gap-2">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="np. HEMA10"
                className="min-w-0 flex-1 rounded-full border border-forge-600 bg-forge-950/70 px-5 py-3 text-sm outline-none transition-colors placeholder:text-ash focus:border-gold-500"
              />
              <button
                onClick={() => setApplied(code.trim().toUpperCase() === "HEMA10" ? 0.1 : 0)}
                className="shrink-0 rounded-full border border-forge-600 px-5 py-3 font-display text-[10px] uppercase tracking-[0.2em] text-parchment-dim transition-colors hover:border-gold-600 hover:text-gold-300"
              >
                Zastosuj
              </button>
            </div>
            {applied !== null && (
              <p className={`mt-2 text-[11px] ${applied ? "text-emerald-400" : "text-blood-500"}`}>
                {applied ? "Kod HEMA10 aktywny — 10% rabatu." : "Nie znamy takiego kodu."}
              </p>
            )}
          </div>

          <dl className="mt-8 space-y-3 border-t border-forge-800 pt-6 text-sm">
            <Row label="Wartość koszyka" value={formatPLN(total)} />
            {discount > 0 && <Row label="Rabat" value={`− ${formatPLN(discount)}`} accent />}
            <Row label="Dostawa" value={shippingCost === 0 ? "gratis" : formatPLN(shippingCost)} />
            <div className="flex items-end justify-between border-t border-forge-800 pt-4">
              <dt className="text-[10px] uppercase tracking-[0.24em] text-ash">Do zapłaty</dt>
              <dd className="font-display text-3xl text-forged">{formatPLN(grand)}</dd>
            </div>
          </dl>

          <button
            onClick={() => setPlaced(true)}
            className="sheen mt-7 w-full rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 py-4 font-display text-[11px] uppercase tracking-[0.3em] text-forge-950"
          >
            Zamawiam i płacę
          </button>

          <p className="mt-4 text-center text-[10px] leading-relaxed text-ash">
            Wersja demonstracyjna — płatności online nie są jeszcze podpięte.
          </p>
        </div>
      </aside>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-parchment-dim">{label}</dt>
      <dd className={accent ? "text-emerald-400 tabular-nums" : "text-parchment tabular-nums"}>
        {value}
      </dd>
    </div>
  );
}

export default CartPage;
