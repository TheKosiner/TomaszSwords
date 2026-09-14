"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Reveal } from "@/components/ui/motion";

const STEPS = [
  {
    n: "I",
    title: "Kucie",
    temp: "1100 °C",
    text: "Sztaba rozgrzana do jasnej czerwieni. Kowal wyciąga zbieżność głowni i zakłada zbrocze — najpierw masa, potem kształt.",
  },
  {
    n: "II",
    title: "Normalizacja",
    temp: "850 °C",
    text: "Kilka cykli grzania i studzenia wyrównuje ziarno po kuciu i zdejmuje naprężenia, które później wyginałyby głownię.",
  },
  {
    n: "III",
    title: "Hartowanie",
    temp: "815 °C → olej",
    text: "Stal przekroczyła punkt przemiany. Gwałtowne studzenie zamienia austenit w martenzyt — twardy, ale kruchy jak szkło.",
  },
  {
    n: "IV",
    title: "Odpuszczanie",
    temp: "180–220 °C",
    text: "Kontrolowane podgrzanie oddaje stali sprężystość. To ten moment decyduje, czy miecz pęknie, czy się wygnie i wróci.",
  },
  {
    n: "V",
    title: "Szlif i montaż",
    temp: "—",
    text: "Profilowanie krawędzi, polerowanie, nabicie jelca i rękojeści, nitowanie głowicy na trzpieniu. Na końcu — pochwa.",
  },
];

export function ProcessTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-forge">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Rzemiosło</p>
              <h2 className="mt-4 max-w-xl font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05]">
                Od sztaby <span className="text-forged">do głowni</span>
              </h2>
            </div>
            <Link
              href="/rzemioslo"
              className="group inline-flex items-center gap-3 font-display text-[11px] uppercase tracking-[0.28em] text-parchment-dim transition-colors hover:text-gold-300"
            >
              Cały proces
              <span className="h-px w-8 bg-gold-600 transition-all duration-500 group-hover:w-14" />
            </Link>
          </div>
        </Reveal>

        <div ref={ref} className="relative mt-16 pl-10 sm:pl-16">
          {/* linia rysowana wraz ze scrollem */}
          <div className="absolute left-[15px] top-2 h-full w-px bg-forge-800 sm:left-[27px]">
            <motion.div
              style={{ scaleY, transformOrigin: "top" }}
              className="h-full w-px bg-gradient-to-b from-ember-500 via-gold-400 to-transparent"
            />
          </div>

          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06} className="relative pb-12 last:pb-0">
              <span className="absolute -left-10 top-0 grid h-8 w-8 place-items-center rounded-full border border-forge-600 bg-forge-950 font-display text-[11px] text-gold-400 sm:-left-16 sm:h-14 sm:w-14 sm:text-sm">
                {s.n}
              </span>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="font-display text-xl text-parchment sm:text-2xl">{s.title}</h3>
                <span className="font-display text-[10px] uppercase tracking-[0.24em] text-ember-400">
                  {s.temp}
                </span>
              </div>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-parchment-dim">
                {s.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProcessTeaser;
