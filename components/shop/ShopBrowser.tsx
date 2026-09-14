"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { CATEGORIES, PRODUCTS, type Category } from "@/lib/products";
import ProductCard from "./ProductCard";

type Sort = "polecane" | "cena-rosnaco" | "cena-malejaco" | "ocena";

const SORTS: { id: Sort; label: string }[] = [
  { id: "polecane", label: "Polecane" },
  { id: "cena-rosnaco", label: "Cena ↑" },
  { id: "cena-malejaco", label: "Cena ↓" },
  { id: "ocena", label: "Ocena" },
];

const EDGES = [
  { id: "tepa", label: "Tępa (dekoracyjna)" },
  { id: "treningowa", label: "Treningowa (HEMA)" },
  { id: "ostra", label: "Ostra" },
];

export function ShopBrowser() {
  const params = useSearchParams();
  const router = useRouter();
  const initial = (params.get("kategoria") as Category) || "wszystkie";

  const [category, setCategory] = useState<Category | "wszystkie">(initial);
  const [sort, setSort] = useState<Sort>("polecane");
  const [edge, setEdge] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState(5000);

  const setCat = (c: Category | "wszystkie") => {
    setCategory(c);
    const q = c === "wszystkie" ? "" : `?kategoria=${c}`;
    router.replace(`/sklep${q}`, { scroll: false });
  };

  const products = useMemo(() => {
    let list = PRODUCTS.filter((p) => p.price <= maxPrice);
    if (category !== "wszystkie") list = list.filter((p) => p.category === category);
    if (edge) list = list.filter((p) => p.edge === edge);

    switch (sort) {
      case "cena-rosnaco":
        return [...list].sort((a, b) => a.price - b.price);
      case "cena-malejaco":
        return [...list].sort((a, b) => b.price - a.price);
      case "ocena":
        return [...list].sort((a, b) => b.rating - a.rating);
      default:
        return list;
    }
  }, [category, sort, edge, maxPrice]);

  const reset = () => {
    setCat("wszystkie");
    setEdge(null);
    setMaxPrice(5000);
    setSort("polecane");
  };

  return (
    <div className="container-forge pb-24">
      {/* --------------------------------------------------------- filtry */}
      <div className="sticky top-[var(--nav-h)] z-30 -mx-5 mb-10 border-y border-forge-800 bg-forge-950/90 px-5 py-4 backdrop-blur-xl lg:-mx-10 lg:px-10">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setCat("wszystkie")}
            className={chip(category === "wszystkie")}
          >
            Wszystkie
          </button>
          {CATEGORIES.map((c) => (
            <button key={c.id} onClick={() => setCat(c.id)} className={chip(category === c.id)}>
              {c.name}
            </button>
          ))}

          <span className="mx-2 hidden h-5 w-px bg-forge-700 lg:block" />

          <div className="ml-auto flex flex-wrap items-center gap-2">
            {SORTS.map((s) => (
              <button key={s.id} onClick={() => setSort(s.id)} className={chip(sort === s.id)}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-forge-800/70 pt-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.24em] text-ash">Krawędź</span>
            {EDGES.map((e) => (
              <button
                key={e.id}
                onClick={() => setEdge(edge === e.id ? null : e.id)}
                className={chip(edge === e.id)}
              >
                {e.label}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-ash">
            Do
            <input
              type="range"
              min={400}
              max={5000}
              step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="h-1 w-32 cursor-pointer appearance-none rounded-full bg-forge-700 accent-gold-500"
            />
            <span className="w-16 text-gold-300 tabular-nums">{maxPrice} zł</span>
          </label>

          <span className="ml-auto text-[10px] uppercase tracking-[0.24em] text-parchment-dim">
            {products.length}{" "}
            {products.length === 1 ? "pozycja" : products.length < 5 ? "pozycje" : "pozycji"}
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------ siatka */}
      <AnimatePresence mode="popLayout">
        {products.length > 0 ? (
          <motion.div
            layout
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {products.map((p, i) => (
              <motion.div key={p.slug} layout>
                <ProductCard product={p} index={i} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-6 py-24 text-center"
          >
            <div className="h-24 w-px bg-gradient-to-b from-transparent via-forge-600 to-transparent" />
            <p className="max-w-sm text-sm text-parchment-dim">
              Przy tych filtrach zbrojownia świeci pustkami.
            </p>
            <button
              onClick={reset}
              className="rounded-full border border-gold-600/60 px-6 py-2.5 font-display text-[11px] uppercase tracking-[0.28em] text-gold-300 transition-colors hover:bg-gold-500 hover:text-forge-950"
            >
              Wyczyść filtry
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function chip(active: boolean) {
  return [
    "rounded-full border px-4 py-1.5 font-display text-[10px] uppercase tracking-[0.2em] transition-all duration-300",
    active
      ? "border-gold-500 bg-gold-500/10 text-gold-200"
      : "border-forge-700 text-parchment-dim hover:border-forge-600 hover:text-parchment",
  ].join(" ");
}

export default ShopBrowser;
