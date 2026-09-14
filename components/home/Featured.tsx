import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/shop/ProductCard";
import { Reveal } from "@/components/ui/motion";

const SLUGS = [
  "miecz-templariusza-acre",
  "dlugi-miecz-czarny-wilk",
  "miecz-wikinski-jarl",
  "zweihander-landsknecht",
];

export function Featured() {
  const items = SLUGS.map((s) => PRODUCTS.find((p) => p.slug === s)!).filter(Boolean);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-forge">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Wybrane ostrza</p>
              <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05]">
                Cztery, od których <span className="text-forged">warto zacząć</span>
              </h2>
            </div>
            <Link
              href="/sklep"
              className="group inline-flex items-center gap-3 font-display text-[11px] uppercase tracking-[0.28em] text-parchment-dim transition-colors hover:text-gold-300"
            >
              Zobacz wszystkie
              <span className="h-px w-8 bg-gold-600 transition-all duration-500 group-hover:w-14" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Featured;
