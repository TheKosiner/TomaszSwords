"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "@/components/ui/motion";

type Part = {
  id: string;
  name: string;
  x: number; // pozycja w % szerokości ilustracji
  latin?: string;
  text: string;
};

const PARTS: Part[] = [
  {
    id: "sztych",
    name: "Sztych",
    x: 4.5,
    latin: "cuspis",
    text: "Kłujące zakończenie głowni. Im późniejszy typ miecza, tym ostrzej zbieżny — to odpowiedź na rozwój zbroi płytowej, w której szukano szczelin zamiast ciąć.",
  },
  {
    id: "ostrze",
    name: "Słabość głowni",
    x: 21,
    latin: "debilis",
    text: "Przednia część ostrza. Szybka, ale bez siły w wiązaniu — tu wyprowadza się cięcia i pchnięcia, nie blokuje ciosów.",
  },
  {
    id: "zbrocze",
    name: "Zbrocze",
    x: 42,
    latin: "fuller",
    text: "Podłużne wklęśnięcie wykuwane lub szlifowane w głowni. Nie jest „rowkiem na krew” — odbiera masę ze środka przekroju, zostawiając sztywność przy krawędziach. Miecz staje się lżejszy, nie słabszy.",
  },
  {
    id: "zastawa",
    name: "Moc głowni",
    x: 61,
    latin: "fortis",
    text: "Część przy jelcu. Powolna, ale najsilniejsza w wiązaniu — nią odbiera się cios i wypycha broń przeciwnika.",
  },
  {
    id: "jelec",
    name: "Jelec",
    x: 70.5,
    latin: "cruciata",
    text: "Poprzeczka chroniąca dłoń i pozwalająca kontrolować broń przeciwnika. Jej pojawienie się w XI wieku zmieniło fechtunek — dłoń mogła wreszcie wyjść przed linię tarczy.",
  },
  {
    id: "rekojesc",
    name: "Rękojeść",
    x: 78,
    latin: "manubrium",
    text: "Drewniany rdzeń nabity na trzpień, kryty skórą i owinięty rzemieniem lub drutem. Długość rękojeści decyduje, czy miecz jest jedno-, pół­tora- czy dwuręczny.",
  },
  {
    id: "glowica",
    name: "Głowica",
    x: 87,
    latin: "pomum",
    text: "Przeciwwaga nitowana na końcu trzpienia. Przesuwa punkt równowagi bliżej dłoni — bez niej nawet lekki miecz ciągnąłby rękę do przodu.",
  },
];

export function Anatomy() {
  const [active, setActive] = useState<Part>(PARTS[2]);

  return (
    <section className="relative py-28 sm:py-36">
      <div className="container-forge">
        <Reveal>
          <p className="eyebrow">Anatomia</p>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05]">
            Siedem części, <span className="text-forged">jedno narzędzie</span>
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-parchment-dim">
            Miecz to nie kawałek metalu z rączką. To układ dźwigni, w którym każdy
            element ma zadanie. Dotknij punktu, żeby zobaczyć jakie.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="relative mt-16">
          <div className="relative w-full">
            <svg viewBox="0 0 1000 220" className="w-full" role="img" aria-label="Przekrój miecza z opisanymi częściami">
              <defs>
                <linearGradient id="an-steel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4b5560" />
                  <stop offset="22%" stopColor="#e8eff5" />
                  <stop offset="50%" stopColor="#97a5b2" />
                  <stop offset="78%" stopColor="#dfe8f0" />
                  <stop offset="100%" stopColor="#3f4852" />
                </linearGradient>
                <linearGradient id="an-fit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4d5965" />
                  <stop offset="35%" stopColor="#eef4f8" />
                  <stop offset="70%" stopColor="#8f9daa" />
                  <stop offset="100%" stopColor="#3a434d" />
                </linearGradient>
              </defs>

              {/* głownia */}
              <path
                d="M694 82 L360 90 Q160 100 30 110 Q160 120 360 130 L694 138 Z"
                fill="url(#an-steel)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="0.8"
              />
              {/* zbrocze */}
              <path d="M660 106 L300 107.5 L300 112.5 L660 114 Z" fill="#000" opacity="0.32" />

              {/* jelec */}
              <path
                d="M694 42 L712 50 L712 170 L694 178 L688 138 L688 82 Z"
                fill="url(#an-fit)"
                stroke="rgba(0,0,0,0.4)"
                strokeWidth="0.8"
              />

              {/* rękojeść */}
              <rect x="714" y="96" width="112" height="28" rx="12" fill="#3c1f18" />
              {Array.from({ length: 8 }).map((_, i) => (
                <line
                  key={i}
                  x1={722 + i * 13}
                  y1="97"
                  x2={728 + i * 13}
                  y2="123"
                  stroke="#000"
                  strokeOpacity="0.45"
                  strokeWidth="2.5"
                />
              ))}
              <rect x="712" y="92" width="10" height="36" rx="3" fill="url(#an-fit)" />

              {/* głowica */}
              <circle cx="856" cy="110" r="30" fill="url(#an-fit)" stroke="rgba(0,0,0,0.45)" strokeWidth="1" />
              <circle cx="856" cy="110" r="19" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="3" />
              <path d="M856 97v26M843 110h26" stroke="rgba(0,0,0,0.4)" strokeWidth="4" strokeLinecap="round" />
              <rect x="826" y="98" width="12" height="24" rx="4" fill="url(#an-fit)" />
            </svg>

            {/* punkty interaktywne */}
            {PARTS.map((part, i) => {
              const isActive = active.id === part.id;
              return (
                <button
                  key={part.id}
                  type="button"
                  onMouseEnter={() => setActive(part)}
                  onFocus={() => setActive(part)}
                  onClick={() => setActive(part)}
                  style={{ left: `${part.x}%` }}
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 outline-none"
                  aria-label={part.name}
                >
                  <span className="relative grid h-9 w-9 place-items-center">
                    <motion.span
                      className={[
                        "absolute inset-0 rounded-full border",
                        isActive ? "border-gold-400" : "border-forge-600",
                      ].join(" ")}
                      animate={isActive ? { scale: [1, 1.5, 1], opacity: [0.9, 0, 0.9] } : { scale: 1, opacity: 0.7 }}
                      transition={isActive ? { duration: 2, repeat: Infinity } : {}}
                    />
                    <span
                      className={[
                        "grid h-6 w-6 place-items-center rounded-full font-display text-[10px] transition-colors duration-300",
                        isActive
                          ? "bg-gold-400 text-forge-950 shadow-[0_0_18px_rgba(227,193,120,0.55)]"
                          : "border border-forge-600 bg-forge-850 text-parchment shadow-[0_2px_10px_rgba(0,0,0,0.8)] hover:border-gold-600 hover:bg-forge-800",
                      ].join(" ")}
                    >
                      {i + 1}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* opis aktywnej części */}
          <div className="panel mt-8 min-h-44 overflow-hidden rounded-2xl p-7 sm:min-h-40">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="grid gap-4 sm:grid-cols-[minmax(0,220px)_1fr] sm:gap-10"
              >
                <div>
                  <h3 className="font-display text-2xl text-parchment">{active.name}</h3>
                  {active.latin && (
                    <p className="mt-1 font-display text-xs italic tracking-wider text-gold-600">
                      {active.latin}
                    </p>
                  )}
                </div>
                <p className="text-[15px] leading-relaxed text-parchment-dim">{active.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Anatomy;
