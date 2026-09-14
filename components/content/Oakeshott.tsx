"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import SwordArt from "@/components/ui/SwordArt";
import type { SwordArt as Art } from "@/lib/products";
import { Reveal } from "@/components/ui/motion";

type Entry = {
  id: string;
  years: string;
  headline: string;
  text: string;
  art: Art;
};

const TYPES: Entry[] = [
  {
    id: "X",
    years: "1000–1100",
    headline: "Szeroka głownia, szerokie zbrocze",
    text: "Bezpośredni spadkobierca miecza wikińskiego. Płaska, niemal równoległa głownia z szerokim zbroczem biegnącym prawie do sztychu. Jelec jeszcze krótki, głowica w kształcie orzecha brazylijskiego. Broń do cięcia — pchnięcie jest tu możliwe, ale nie o nie chodzi.",
    art: { blade: "broad", guard: "short", pommel: "brazil", grip: "#5a3b26", fitting: "silver", ratio: 0.95 },
  },
  {
    id: "XI",
    years: "1100–1175",
    headline: "Węziej i szybciej",
    text: "Głownia smuklejsza niż w typie X, zbrocze wąskie i długie. Miecz jazdy — lekki, szybki w nadgarstku, zoptymalizowany pod cięcie z konia.",
    art: { blade: "narrow", guard: "straight", pommel: "brazil", grip: "#523325", fitting: "silver", ratio: 1 },
  },
  {
    id: "XII",
    years: "1100–1300",
    headline: "Równowaga cięcia i pchnięcia",
    text: "Najbardziej „podręcznikowy” miecz rycerski. Głownia zbiega się równomiernie na całej długości, zbrocze sięga dwóch trzecich. Tnie dobrze, kłuje wystarczająco — kompromis, który utrzymał się dwieście lat.",
    art: { blade: "taper", guard: "straight", pommel: "wheel", grip: "#5d2f22", fitting: "silver", ratio: 1 },
  },
  {
    id: "XIII",
    years: "1200–1350",
    headline: "Wielki miecz wojny",
    text: "Szeroka głownia o niemal równoległych krawędziach i zaokrąglonym sztychu, do tego wydłużona rękojeść. Pierwszy krok w stronę broni półtoraręcznej — odpowiedź na kolczugę noszoną pod płytą.",
    art: { blade: "broad", guard: "straight", pommel: "wheel", grip: "#4d3a2c", fitting: "antique", ratio: 1.12 },
  },
  {
    id: "XIV",
    years: "1275–1340",
    headline: "Krótko, szeroko, ostro zbieżnie",
    text: "Krótka i szeroka u nasady głownia, która gwałtownie zbiega się do sztychu. Płaski przekrój, często głowica krążkowa. Broń przejściowa: jeszcze tnie, ale już szuka szczelin.",
    art: { blade: "taper", guard: "flared", pommel: "wheel", grip: "#6a2c22", fitting: "silver", ratio: 0.92 },
  },
  {
    id: "XV",
    years: "1290–1450",
    headline: "Romb zamiast zbrocza",
    text: "Przekrój rombowy na całej długości, brak zbrocza, sztywność zamiast szerokości. Miecz, który przestał udawać, że tnie zbroję — zaczął ją omijać.",
    art: { blade: "narrow", guard: "flared", pommel: "scent", grip: "#2f2622", fitting: "silver", ratio: 1.05 },
  },
  {
    id: "XVI",
    years: "1300–1400",
    headline: "Dwie strefy w jednej głowni",
    text: "Górna część ze zbroczem tnie jak typ XIV, dolna to sztywny romb do pchnięcia. Najbardziej uniwersalny układ w całej typologii.",
    art: { blade: "taper", guard: "straight", pommel: "brazil", grip: "#4d3a2c", fitting: "silver", ratio: 1.15 },
  },
  {
    id: "XVIII",
    years: "1410–1520",
    headline: "Klin epoki płyty",
    text: "Soczewkowy lub rombowy przekrój, wyraźne zwężenie, bardzo ostry sztych. Odmiana XVIIIb ma wydłużoną rękojeść — to klasyczny długi miecz z traktatów fechtunkowych.",
    art: { blade: "narrow", guard: "sloped", pommel: "scent", grip: "#241c19", fitting: "blued", ratio: 1.25 },
  },
];

export function Oakeshott() {
  const [active, setActive] = useState(TYPES[2]);

  return (
    <section className="py-24 sm:py-32">
      <div className="container-forge">
        <Reveal>
          <p className="eyebrow">Typologia</p>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.9rem,4.2vw,3.2rem)] leading-[1.05]">
            Skala Oakeshotta, <span className="text-forged">czyli alfabet miecza</span>
          </h2>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-parchment-dim">
            Ewart Oakeshott w 1960 roku uporządkował europejskie miecze według
            kształtu głowni, a nie daty czy kraju. Do dziś to podstawowy język
            opisu: mówiąc „typ XV”, mówisz o przekroju, wyważeniu i przeznaczeniu
            broni w jednym znaku.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t)}
              className={[
                "rounded-full border px-5 py-2 font-display text-[11px] uppercase tracking-[0.22em] transition-all duration-300",
                active.id === t.id
                  ? "border-gold-500 bg-gold-500/10 text-gold-200"
                  : "border-forge-700 text-parchment-dim hover:border-forge-600 hover:text-parchment",
              ].join(" ")}
            >
              Typ {t.id}
            </button>
          ))}
        </div>

        <div className="panel noise mt-8 grid items-center gap-10 overflow-hidden rounded-3xl p-8 sm:p-12 lg:grid-cols-[200px_1fr]">
          <div className="relative flex h-72 items-center justify-center lg:h-96">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 30, rotate: -6 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: -30, rotate: 6 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <SwordArt
                  id={`oak-${active.id}`}
                  art={active.art}
                  className="h-full w-auto drop-shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-display text-[10px] uppercase tracking-[0.3em] text-gold-500">
                {active.years}
              </p>
              <h3 className="mt-3 font-display text-2xl text-parchment sm:text-3xl">
                Typ {active.id} — {active.headline}
              </h3>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-parchment-dim">
                {active.text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default Oakeshott;
