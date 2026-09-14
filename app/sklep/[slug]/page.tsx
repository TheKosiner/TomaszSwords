import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, bySlug, formatPLN } from "@/lib/products";
import ProductDetail from "@/components/shop/ProductDetail";
import ProductCard from "@/components/shop/ProductCard";
import { Reveal } from "@/components/ui/motion";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = bySlug(slug);
  if (!product) return { title: "Nie znaleziono" };
  return {
    title: product.name,
    description: `${product.summary} ${product.steel}, ${product.hardness}. Cena ${formatPLN(product.price)}.`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = bySlug(slug);
  if (!product) notFound();

  const related = PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.category === product.category,
  ).slice(0, 4);
  const filler = PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.category !== product.category,
  ).slice(0, 4 - related.length);

  return (
    <>
      <nav className="container-forge pt-[calc(var(--nav-h)+2.5rem)] pb-8" aria-label="Ścieżka nawigacji">
        <ol className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-ash">
          <li>
            <Link href="/" className="transition-colors hover:text-gold-300">
              Start
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/sklep" className="transition-colors hover:text-gold-300">
              Zbrojownia
            </Link>
          </li>
          <li>/</li>
          <li className="text-parchment-dim">{product.name}</li>
        </ol>
      </nav>

      <ProductDetail product={product} />

      <section className="container-forge pb-8">
        <Reveal>
          <div className="rule-gold mb-14" />
          <p className="eyebrow">Z tej samej półki</p>
          <h2 className="mt-4 font-display text-[clamp(1.6rem,3.6vw,2.6rem)]">
            Zobacz też
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...related, ...filler].map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
