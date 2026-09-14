"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

const ERAS = [
  {
    year: "ok. 1600 p.n.e.",
    title: "Brąz",
    text: "Pierwsze miecze to odlewy z brązu — krótkie, bo dłuższe pękały. Sztylet, który urósł.",
  },
  {
    year: "V–VIII w.",
    title: "Spatha",
    text: "Długa, prosta głownia jazdy rzymskiej, przejęta przez ludy germańskie. Przodek miecza wikińskiego.",
  },
  {
    year: "VIII–XI w.",
    title: "Miecz wikiński",
    text: "Szeroka głownia z szerokim zbroczem, krótki jelec, ciężka głowica. Głownie ULFBERHT trafiały na cały kontynent.",
  },
  {
    year: "XI–XIII w.",
    title: "Miecz rycerski",
    text: "Wydłużony jelec, głowica krążkowa, głownia zbieżna. Typy X–XIV w typologii Oakeshotta.",
  },
  {
    year: "XIV–XV w.",
    title: "Długi miecz",
    text: "Odpowiedź na zbroję płytową: sztywny romb, ostry sztych, rękojeść na dwie dłonie. Złoty wiek fechtunku.",
  },
  {
    year: "XVI w.",
    title: "Zweihänder",
    text: "Broń zawodowców z formacji pikinierskich. Parierhaki, skórzane ricasso, ponad półtora metra.",
  },
  {
    year: "XVI–XVII w.",
    title: "Rapier i szabla",
    text: "Miecz schodzi z pola bitwy do miasta i do jazdy. Zmienia się cel — nie zbroja, lecz człowiek.",
  },
  {
    year: "dziś",
    title: "Rekonstrukcja",
    text: "HEMA, traktaty Liechtenauera i Fiorego, kolekcjonerstwo. Miecz wraca jako przedmiot badań i pasji.",
  },
];

export function TimelineTeaser() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const extra = trackRef.current.scrollWidth - window.innerWidth;
      setDistance(Math.max(extra + 48, 0));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const cards = ERAS.map((era, i) => (
    <article
      key={era.title}
      className="panel noise group relative w-[78vw] shrink-0 overflow-hidden rounded-2xl p-7 sm:w-[360px]"
    >
      <span className="absolute right-5 top-4 font-display text-6xl text-forge-700/70 transition-colors duration-500 group-hover:text-gold-600/30">
        {String(i + 1).padStart(2, "0")}
      </span>
      <p className="font-display text-[10px] uppercase tracking-[0.3em] text-gold-500">{era.year}</p>
      <h3 className="mt-3 font-display text-2xl text-parchment">{era.title}</h3>
      <p className="mt-4 text-sm leading-relaxed text-parchment-dim">{era.text}</p>
    </article>
  ));

  if (reduce) {
    return (
      <section className="py-24">
        <div className="container-forge">
          <Header />
          <div className="mt-12 flex gap-6 overflow-x-auto pb-6">{cards}</div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `calc(100svh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="container-forge">
          <Header />
        </div>

        <motion.div ref={trackRef} style={{ x }} className="mt-12 flex gap-6 pl-5 lg:pl-10">
          {cards}
          <div className="grid w-[78vw] shrink-0 place-items-center sm:w-[360px]">
            <Link
              href="/historia"
              className="group flex flex-col items-center gap-4 text-center"
            >
              <span className="grid h-20 w-20 place-items-center rounded-full border border-gold-600/60 text-gold-400 transition-all duration-500 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-forge-950">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
              <span className="font-display text-[11px] uppercase tracking-[0.3em] text-parchment-dim">
                Pełna oś czasu
              </span>
            </Link>
          </div>
        </motion.div>

        {/* linia czasu pod kartami */}
        <div className="container-forge mt-10">
          <div className="h-px w-full bg-forge-800">
            <motion.div
              className="h-px bg-gradient-to-r from-ember-600 to-gold-300"
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Header() {
  return (
    <>
      <p className="eyebrow">Oś czasu</p>
      <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05]">
        Trzy tysiące lat <span className="text-forged">jednego pomysłu</span>
      </h2>
    </>
  );
}

export default TimelineTeaser;
