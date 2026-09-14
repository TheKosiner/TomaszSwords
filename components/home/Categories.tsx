"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import SwordArt from "@/components/ui/SwordArt";
import { Reveal } from "@/components/ui/motion";

export function Categories() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-forge">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Kategorie</p>
              <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05]">
                Wybierz swoją <span className="text-forged">epokę</span>
              </h2>
            </div>
            <Link
              href="/sklep"
              className="group inline-flex items-center gap-3 font-display text-[11px] uppercase tracking-[0.28em] text-parchment-dim transition-colors hover:text-gold-300"
            >
              Cała zbrojownia
              <span className="h-px w-8 bg-gold-600 transition-all duration-500 group-hover:w-14" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 border-t border-forge-800">
          {CATEGORIES.map((cat, i) => {
            const sample = PRODUCTS.find((p) => p.category === cat.id);
            const isHover = hover === cat.id;
            return (
              <Reveal key={cat.id} delay={i * 0.05} y={18}>
                <Link
                  href={`/sklep?kategoria=${cat.id}`}
                  onMouseEnter={() => setHover(cat.id)}
                  onMouseLeave={() => setHover(null)}
                  className="group relative flex items-center justify-between gap-6 overflow-hidden border-b border-forge-800 px-2 py-8 sm:py-10"
                >
                  <motion.span
                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-forge-800/70 via-forge-850/40 to-transparent"
                    initial={false}
                    animate={{ opacity: isHover ? 1 : 0, x: isHover ? 0 : -40 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />

                  <div className="relative flex min-w-0 items-baseline gap-5">
                    <span className="font-display text-[11px] text-gold-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h3
                        className={[
                          "truncate font-display text-[clamp(1.3rem,3.4vw,2.4rem)] uppercase tracking-tight transition-colors duration-500",
                          isHover ? "text-forged" : "text-parchment",
                        ].join(" ")}
                      >
                        {cat.name}
                      </h3>
                      <p className="mt-1 truncate text-xs text-ash">{cat.blurb}</p>
                    </div>
                  </div>

                  <div className="relative flex items-center gap-6">
                    {sample && (
                      <motion.div
                        className="hidden h-24 sm:block"
                        initial={false}
                        animate={{
                          opacity: isHover ? 1 : 0,
                          x: isHover ? 0 : 30,
                          rotate: isHover ? 8 : 24,
                        }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <SwordArt id={`cat-${cat.id}`} art={sample.art} className="h-24 w-auto" animated={false} />
                      </motion.div>
                    )}
                    <motion.span
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-forge-600 text-parchment-dim"
                      animate={{
                        borderColor: isHover ? "#c8a24a" : "#3b322a",
                        color: isHover ? "#f0d9a0" : "#7d7264",
                        rotate: isHover ? -45 : 0,
                      }}
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </motion.span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Categories;
