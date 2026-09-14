import Link from "next/link";
import { Crest } from "./Crest";

const COLUMNS = [
  {
    title: "Zbrojownia",
    links: [
      { href: "/sklep", label: "Wszystkie miecze" },
      { href: "/sklep?kategoria=jednoreczne", label: "Jednoręczne" },
      { href: "/sklep?kategoria=poltoraraczne", label: "Półtoraręczne" },
      { href: "/sklep?kategoria=dwureczne", label: "Dwuręczne" },
      { href: "/sklep?kategoria=sztylety", label: "Sztylety i akcesoria" },
    ],
  },
  {
    title: "Wiedza",
    links: [
      { href: "/historia", label: "Historia miecza" },
      { href: "/stal", label: "Stale i hartowanie" },
      { href: "/rzemioslo", label: "Jak powstaje miecz" },
      { href: "/rzemioslo#dzisiaj", label: "Po co miecze dzisiaj" },
    ],
  },
  {
    title: "Sklep",
    links: [
      { href: "/o-nas", label: "O nas" },
      { href: "/kontakt", label: "Kontakt" },
      { href: "/kontakt#wysylka", label: "Wysyłka i zwroty" },
      { href: "/kontakt#prawo", label: "Stan prawny" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative z-10 mt-20 border-t border-forge-800 bg-forge-950/80">
      <div className="container-forge py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-3">
              <Crest className="h-9 w-9 text-gold-500" />
              <span>
                <span className="block font-display text-base uppercase tracking-[0.34em] text-parchment">
                  Tomasz
                </span>
                <span className="block font-display text-[10px] uppercase tracking-[0.52em] text-gold-500">
                  Swords
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-parchment-dim">
              Miecze średniowieczne dla kolekcjonerów, rekonstruktorów i tych,
              którzy chcą mieć na ścianie kawał historii. Każdy egzemplarz
              sprawdzamy przed wysyłką — geometria, wyważenie, oprawa.
            </p>
            <div className="mt-6 flex gap-3">
              {["Instagram", "YouTube", "Facebook"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="rounded-full border border-forge-700 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-parchment-dim transition-colors hover:border-gold-600 hover:text-gold-300"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="eyebrow">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center gap-2 text-sm text-parchment-dim transition-colors hover:text-parchment"
                    >
                      <span className="h-px w-0 bg-gold-500 transition-all duration-300 group-hover:w-4" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rule-gold my-12" />

        <div className="flex flex-col items-center justify-between gap-4 text-[11px] uppercase tracking-[0.2em] text-ash sm:flex-row">
          <p>© {new Date().getFullYear()} Tomasz Swords</p>
          <p className="text-center">
            Sprzedaż wyłącznie osobom pełnoletnim · Repliki kolekcjonerskie
          </p>
          <p>Regulamin · Polityka prywatności</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
