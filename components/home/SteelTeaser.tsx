"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Counter, Parallax, Reveal } from "@/components/ui/motion";

const STEELS = [
  {
    name: "1060 / 1065",
    label: "Stal węglowa",
    hrc: 50,
    flex: 55,
    edge: 62,
    note: "Klasyka replik. Prosty skład, dobrze przyjmuje hartowanie, wybacza błędy w obróbce.",
  },
  {
    name: "EN45 / 5160",
    label: "Stal sprężynowa",
    hrc: 52,
    flex: 88,
    edge: 70,
    note: "Dodatek krzemu i chromu daje sprężystość. Głownia wraca do prostej po zgięciu — stąd obecność w sprzęcie treningowym.",
  },
  {
    name: "9260",
    label: "Krzemowo-manganowa",
    hrc: 54,
    flex: 95,
    edge: 74,
    note: "Ok. 2% krzemu. Najbardziej wytrzymała z popularnych stali na miecze — znosi wygięcia, które trwale odkształciłyby stal węglową.",
  },
];

function Bar({ value, delay = 0 }: { value: number; delay?: number }) {
  return (
    <div className="h-1 flex-1 overflow-hidden rounded-full bg-forge-800">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-ember-600 via-gold-500 to-gold-300"
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.3, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

export function SteelTeaser() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <Parallax distance={60} className="pointer-events-none absolute inset-0 -z-10">
        <div className="mx-auto h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,107,26,0.12),transparent_65%)] blur-3xl" />
      </Parallax>

      <div className="container-forge">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow">Materiał</p>
              <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05]">
                Nie każda stal
                <br />
                <span className="text-forged">zasługuje na ostrze</span>
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-parchment-dim">
                Średniowieczny płatnerz nie miał wyboru składu — pracował na tym,
                co dała dymarka. Dziś wybór jest świadomy: inna stal na broń do
                gabloty, inna na sprzęt, który dostanie w łeb tępym mieczem
                przeciwnika trzy razy w minutę.
              </p>
              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-forge-800 pt-6">
                {[
                  { v: 0.6, s: "%", l: "węgla w 1060" },
                  { v: 815, s: "°C", l: "temperatura hartowania" },
                  { v: 200, s: "°C", l: "odpuszczanie" },
                ].map((s) => (
                  <div key={s.l}>
                    <p className="font-display text-2xl text-gold-300">
                      <Counter to={s.v} suffix={s.s} decimals={s.v < 10 ? 1 : 0} />
                    </p>
                    <p className="mt-1 text-[10px] uppercase leading-tight tracking-[0.18em] text-ash">
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                href="/stal"
                className="group mt-10 inline-flex items-center gap-3 font-display text-[11px] uppercase tracking-[0.28em] text-gold-300"
              >
                Cała wiedza o stali
                <span className="h-px w-8 bg-gold-600 transition-all duration-500 group-hover:w-14" />
              </Link>
            </Reveal>
          </div>

          <div className="space-y-5">
            {STEELS.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.12}>
                <div className="panel noise group relative overflow-hidden rounded-2xl p-6 transition-colors duration-500 hover:border-gold-600/50">
                  <div className="flex items-baseline justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl text-parchment">{s.name}</h3>
                      <p className="mt-0.5 text-[10px] uppercase tracking-[0.24em] text-gold-600">
                        {s.label}
                      </p>
                    </div>
                    <span className="font-display text-sm text-parchment-dim tabular-nums">
                      {s.hrc} HRC
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-parchment-dim">{s.note}</p>
                  <dl className="mt-6 space-y-3">
                    {[
                      ["Twardość", s.hrc + 20],
                      ["Sprężystość", s.flex],
                      ["Trzymanie krawędzi", s.edge],
                    ].map(([label, value], j) => (
                      <div key={label as string} className="flex items-center gap-4">
                        <dt className="w-40 shrink-0 text-[10px] uppercase tracking-[0.2em] text-ash">
                          {label}
                        </dt>
                        <Bar value={value as number} delay={i * 0.1 + j * 0.08} />
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SteelTeaser;
