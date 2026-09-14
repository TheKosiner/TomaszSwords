"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { formatPLN, type Product } from "@/lib/products";
import SwordArt from "@/components/ui/SwordArt";
import { useCart } from "@/lib/cart";
import { Reveal } from "@/components/ui/motion";

const EDGE_LABEL: Record<Product["edge"], string> = {
  tepa: "Tępa — wersja dekoracyjna",
  treningowa: "Treningowa — 2,5 mm, zaokrąglony sztych",
  ostra: "Ostra — sprzedaż wyłącznie osobom pełnoletnim",
};

const TABS = ["Opis", "Specyfikacja", "Wysyłka"] as const;

export function ProductDetail({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<(typeof TABS)[number]>("Opis");
  const [dims, setDims] = useState(false);
  const [added, setAdded] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 20 });

  const total = product.specs.find((s) => s.label === "Długość całkowita")?.value;
  const blade = product.specs.find((s) => s.label === "Długość głowni")?.value;

  const handleAdd = () => {
    add(product.slug, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="container-forge grid gap-12 pb-20 lg:grid-cols-[0.95fr_1fr] lg:gap-20">
      {/* ------------------------------------------------- ilustracja */}
      <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:h-fit">
        <div
          ref={stageRef}
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            mx.set((e.clientX - r.left) / r.width - 0.5);
            my.set((e.clientY - r.top) / r.height - 0.5);
          }}
          onPointerLeave={() => {
            mx.set(0);
            my.set(0);
          }}
          className="panel noise relative flex h-[62vh] min-h-[430px] items-center justify-center overflow-hidden rounded-3xl p-10"
          style={{ perspective: 1200 }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,107,26,0.14),transparent_65%)]"
          />
          <motion.div style={{ rotateX: rx, rotateY: ry }} className="relative h-full">
            <SwordArt
              id={`detail-${product.slug}`}
              art={product.art}
              className="h-full w-auto drop-shadow-[0_18px_50px_rgba(0,0,0,0.7)]"
            />
          </motion.div>

          {/* nakładka wymiarowa */}
          <AnimatePresence>
            {dims && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pointer-events-none absolute inset-0 p-8"
              >
                <div className="absolute inset-y-8 left-8 flex flex-col items-center">
                  <span className="h-px w-3 bg-gold-500" />
                  <span className="flex-1 w-px bg-gradient-to-b from-gold-500/70 via-gold-500/30 to-gold-500/70" />
                  <span className="h-px w-3 bg-gold-500" />
                </div>
                <span className="absolute left-14 top-1/2 -translate-y-1/2 writing-vertical font-display text-[10px] uppercase tracking-[0.3em] text-gold-400">
                  {total}
                </span>
                <span className="absolute right-10 top-[30%] rounded-full border border-gold-600/50 bg-forge-950/80 px-3 py-1 font-display text-[10px] uppercase tracking-[0.2em] text-gold-300">
                  głownia {blade}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setDims((v) => !v)}
            className="absolute bottom-5 right-5 rounded-full border border-forge-600 bg-forge-950/70 px-4 py-2 font-display text-[10px] uppercase tracking-[0.22em] text-parchment-dim backdrop-blur transition-colors hover:border-gold-600 hover:text-gold-300"
            aria-pressed={dims}
          >
            {dims ? "Ukryj wymiary" : "Pokaż wymiary"}
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------ opis */}
      <div>
        <Reveal y={16}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-forge-600 px-3 py-1 font-display text-[9px] uppercase tracking-[0.24em] text-parchment-dim">
              {product.era}
            </span>
            {product.oakeshott && (
              <span className="rounded-full border border-forge-600 px-3 py-1 font-display text-[9px] uppercase tracking-[0.24em] text-parchment-dim">
                {product.oakeshott}
              </span>
            )}
            {product.badge && (
              <span className="rounded-full border border-gold-600/60 px-3 py-1 font-display text-[9px] uppercase tracking-[0.24em] text-gold-300">
                {product.badge}
              </span>
            )}
          </div>

          <h1 className="mt-6 font-display text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.03]">
            {product.name}
          </h1>
          <p className="mt-3 text-sm text-parchment-dim">{product.subtitle}</p>

          <div className="mt-6 flex items-center gap-4 text-xs text-ash">
            <span className="text-gold-500">
              {"★".repeat(Math.round(product.rating))}
              <span className="text-forge-600">{"★".repeat(5 - Math.round(product.rating))}</span>
            </span>
            <span>
              {product.rating.toFixed(1)} · {product.reviews} opinii
            </span>
          </div>

          <p className="mt-7 text-[15px] leading-relaxed text-parchment">{product.summary}</p>
        </Reveal>

        {/* cena + koszyk */}
        <Reveal delay={0.1} y={16}>
          <div className="panel mt-9 rounded-2xl p-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                {product.compareAt && (
                  <span className="mr-3 text-sm text-ash line-through">
                    {formatPLN(product.compareAt)}
                  </span>
                )}
                <span className="font-display text-4xl text-forged">
                  {formatPLN(product.price)}
                </span>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-ash">
                  z VAT · wysyłka od 0 zł
                </p>
              </div>
              <p
                className={[
                  "text-[10px] uppercase tracking-[0.2em]",
                  product.stock <= 3 ? "text-ember-400" : "text-emerald-400/80",
                ].join(" ")}
              >
                {product.stock <= 3
                  ? `Ostatnie ${product.stock} szt.`
                  : `Na stanie · ${product.stock} szt.`}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center rounded-full border border-forge-600">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid h-12 w-12 place-items-center text-parchment-dim transition-colors hover:text-gold-300"
                  aria-label="Zmniejsz ilość"
                >
                  −
                </button>
                <span className="w-8 text-center tabular-nums">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  className="grid h-12 w-12 place-items-center text-parchment-dim transition-colors hover:text-gold-300"
                  aria-label="Zwiększ ilość"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="sheen relative min-w-52 flex-1 overflow-hidden rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 py-4 font-display text-[11px] uppercase tracking-[0.3em] text-forge-950"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={added ? "added" : "add"}
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -14, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="block"
                  >
                    {added ? "Dodano do koszyka ✓" : "Dodaj do koszyka"}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>

            <ul className="mt-6 grid gap-2 border-t border-forge-800 pt-5 text-[11px] text-parchment-dim">
              {[
                "Wysyłka w 48 h · kurier z ubezpieczeniem",
                "30 dni na zwrot bez podania przyczyny",
                "2 lata gwarancji na głownię i oprawę",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <span className="h-1 w-1 rounded-full bg-gold-500" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* skrót parametrów */}
        <Reveal delay={0.15} y={16}>
          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-forge-700 bg-forge-700 sm:grid-cols-3">
            {[
              { label: "Stal", value: product.steel },
              { label: "Twardość", value: product.hardness },
              { label: "Krawędź", value: EDGE_LABEL[product.edge].split(" — ")[0] },
              ...product.specs.slice(0, 3),
            ].map((s) => (
              <div key={s.label} className="bg-forge-900 p-4">
                <dt className="text-[9px] uppercase tracking-[0.22em] text-ash">{s.label}</dt>
                <dd className="mt-1.5 text-sm text-parchment">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* zakładki */}
        <Reveal delay={0.2} y={16}>
          <div className="mt-12">
            <div className="flex gap-1 border-b border-forge-800">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="relative px-5 py-3 font-display text-[11px] uppercase tracking-[0.24em] text-parchment-dim transition-colors hover:text-parchment"
                >
                  {tab === t && (
                    <motion.span
                      layoutId="tab-underline"
                      className="absolute inset-x-0 -bottom-px h-px bg-gold-400"
                    />
                  )}
                  <span className={tab === t ? "text-gold-200" : undefined}>{t}</span>
                </button>
              ))}
            </div>

            <div className="min-h-64 pt-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                >
                  {tab === "Opis" && (
                    <div className="space-y-4">
                      {product.story.map((p) => (
                        <p key={p.slice(0, 24)} className="text-[15px] leading-relaxed text-parchment-dim">
                          {p}
                        </p>
                      ))}
                      <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                        {product.highlights.map((h) => (
                          <li key={h} className="flex gap-3 text-sm text-parchment-dim">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold-500" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {tab === "Specyfikacja" && (
                    <dl className="divide-y divide-forge-800">
                      {[
                        { label: "Gatunek stali", value: product.steel },
                        { label: "Twardość", value: product.hardness },
                        { label: "Krawędź", value: EDGE_LABEL[product.edge] },
                        ...product.specs,
                        { label: "Epoka", value: product.era },
                        ...(product.oakeshott
                          ? [{ label: "Typologia", value: product.oakeshott }]
                          : []),
                      ].map((s) => (
                        <div key={s.label} className="flex justify-between gap-6 py-3.5">
                          <dt className="text-[11px] uppercase tracking-[0.18em] text-ash">
                            {s.label}
                          </dt>
                          <dd className="text-right text-sm text-parchment">{s.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {tab === "Wysyłka" && (
                    <div className="space-y-4 text-[15px] leading-relaxed text-parchment-dim">
                      <p>
                        Wysyłka w ciągu 48 godzin roboczych kurierem z ubezpieczeniem.
                        Zamówienia powyżej 2000 zł — dostawa gratis. Miecz jedzie
                        w sztywnym kartonie, w piance profilowanej, z osobno
                        zabezpieczoną pochwą.
                      </p>
                      <p>
                        Zwrot bez podania przyczyny w ciągu 30 dni — wystarczy, że
                        broń wróci nieużywana i w komplecie. Gwarancja 2 lata obejmuje
                        wady materiałowe głowni i oprawy.
                      </p>
                      <p>
                        Sprzedaż wyłącznie osobom pełnoletnim. Repliki tępe nie są
                        w Polsce bronią w rozumieniu ustawy o broni i amunicji, ale
                        obowiązują zasady zdrowego rozsądku: nie nosimy ich publicznie
                        i nie używamy bez sprzętu ochronnego.
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default ProductDetail;
