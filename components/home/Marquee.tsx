"use client";

const WORDS = [
  "Oakeshott XII",
  "stal sprężynowa",
  "zbrocze",
  "hartowanie selektywne",
  "typ XVIIIb",
  "jelec ósemkowy",
  "trzpień nitowany",
  "pochwa z drewnianym rdzeniem",
  "punkt równowagi",
  "HEMA",
];

export function Marquee() {
  return (
    <div className="relative border-y border-forge-800 bg-forge-900/40 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-forge-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-forge-950 to-transparent" />
      <div className="flex overflow-hidden">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center gap-10 pr-10 marquee-track"
            aria-hidden={copy === 1}
          >
            {WORDS.map((w) => (
              <span
                key={w}
                className="flex shrink-0 items-center gap-10 font-display text-[11px] uppercase tracking-[0.35em] text-parchment-dim"
              >
                {w}
                <span className="text-gold-600">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marquee;
