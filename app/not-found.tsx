import Link from "next/link";
import Monogram from "@/components/site/Monogram";

export default function NotFound() {
  return (
    <section className="container-forge flex min-h-[70vh] flex-col items-center justify-center gap-7 pt-[var(--nav-h)] text-center">
      <Monogram uid="nf" className="h-28 w-auto opacity-70" />
      <p className="eyebrow">Błąd 404</p>
      <h1 className="max-w-xl font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.05]">
        Ta głownia <span className="text-forged">nie istnieje</span>
      </h1>
      <p className="max-w-md text-[15px] leading-relaxed text-parchment-dim">
        Strona, której szukasz, została przekuta na coś innego albo nigdy nie
        opuściła kuźni. Wróć do zbrojowni — tam wszystko jest na swoim miejscu.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/sklep"
          className="sheen rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 px-8 py-4 font-display text-[11px] uppercase tracking-[0.28em] text-forge-950"
        >
          Do zbrojowni
        </Link>
        <Link
          href="/"
          className="rounded-full border border-forge-600 px-7 py-4 font-display text-[11px] uppercase tracking-[0.28em] text-parchment-dim transition-colors hover:border-gold-600 hover:text-gold-300"
        >
          Strona główna
        </Link>
      </div>
    </section>
  );
}
