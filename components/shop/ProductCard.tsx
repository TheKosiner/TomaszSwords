"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { formatPLN, type Product } from "@/lib/products";
import SwordArt from "@/components/ui/SwordArt";
import { useCart } from "@/lib/cart";

const BADGE_TONE: Record<NonNullable<Product["badge"]>, string> = {
  Bestseller: "border-gold-600/60 text-gold-300",
  Nowość: "border-emerald-700/60 text-emerald-300",
  "Ostatnie sztuki": "border-blood-500/70 text-red-300",
  "Edycja limitowana": "border-gold-400/70 text-gold-200",
};

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add } = useCart();

  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <Link href={`/sklep/${product.slug}`} className="block">
        <div className="panel noise relative overflow-hidden rounded-2xl">
          {/* poświata przy hoverze */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(255,107,26,0.16),transparent_62%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

          {product.badge && (
            <span
              className={`absolute left-4 top-4 z-10 rounded-full border bg-forge-950/70 px-3 py-1 font-display text-[9px] uppercase tracking-[0.24em] backdrop-blur ${BADGE_TONE[product.badge]}`}
            >
              {product.badge}
            </span>
          )}

          <span className="absolute right-4 top-4 z-10 font-display text-[9px] uppercase tracking-[0.24em] text-ash">
            {product.era}
          </span>

          <div className="flex h-72 items-center justify-center px-6 pt-8 pb-4 sm:h-80">
            <motion.div
              className="h-full"
              whileHover={{ rotate: -3, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
            >
              <SwordArt
                id={product.slug}
                art={product.art}
                animated={false}
                className="h-full w-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
              />
            </motion.div>
          </div>

          <div className="relative border-t border-forge-700/70 p-5">
            <h3 className="font-display text-base leading-snug text-parchment transition-colors group-hover:text-gold-200">
              {product.name}
            </h3>
            <p className="mt-1 line-clamp-1 text-xs text-ash">{product.subtitle}</p>

            <dl className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[10px] uppercase tracking-[0.16em] text-parchment-dim">
              <div className="flex gap-1.5">
                <dt className="text-ash">Stal</dt>
                <dd>{product.steel.split(" ")[0]}</dd>
              </div>
              {product.oakeshott && (
                <div className="flex gap-1.5">
                  <dt className="text-ash">Typ</dt>
                  <dd>{product.oakeshott.replace("Typ ", "")}</dd>
                </div>
              )}
            </dl>

            <div className="mt-5 flex items-end justify-between gap-3">
              <div>
                {product.compareAt && (
                  <span className="mr-2 text-xs text-ash line-through">
                    {formatPLN(product.compareAt)}
                  </span>
                )}
                <span className="font-display text-xl text-forged">
                  {formatPLN(product.price)}
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-ash">
                ★ {product.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </Link>

      <button
        type="button"
        onClick={() => add(product.slug)}
        className="sheen mt-3 w-full rounded-full border border-forge-600 py-3 font-display text-[10px] uppercase tracking-[0.3em] text-parchment-dim transition-all duration-500 hover:border-gold-500 hover:text-gold-200"
      >
        Do koszyka
      </button>
    </motion.article>
  );
}

export default ProductCard;
