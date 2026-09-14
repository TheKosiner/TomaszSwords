"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PRODUCTS, formatPLN, type Product } from "@/lib/products";
import SwordArt from "@/components/ui/SwordArt";

type Answers = { use?: string; era?: string; budget?: string };

const QUESTIONS = [
  {
    key: "use" as const,
    label: "Do czego ma służyć?",
    options: [
      { id: "gablota", label: "Na ścianę, do gabloty" },
      { id: "rekonstrukcja", label: "Rekonstrukcja historyczna" },
      { id: "hema", label: "Trening HEMA" },
      { id: "prezent", label: "Prezent" },
    ],
  },
  {
    key: "era" as const,
    label: "Która epoka pociąga cię najbardziej?",
    options: [
      { id: "wczesnosredniowieczne", label: "Wikingowie, IX–XI w." },
      { id: "jednoreczne", label: "Rycerstwo, XII–XIV w." },
      { id: "poltoraraczne", label: "Długi miecz, XIV–XV w." },
      { id: "dwureczne", label: "Kolosy, XVI w." },
    ],
  },
  {
    key: "budget" as const,
    label: "Jaki budżet?",
    options: [
      { id: "low", label: "do 1500 zł" },
      { id: "mid", label: "1500–2500 zł" },
      { id: "high", label: "bez sztywnego limitu" },
    ],
  },
];

function recommend(a: Answers): Product {
  let pool = [...PRODUCTS].filter((p) => p.category !== "sztylety");

  if (a.use === "hema") {
    const hema = pool.filter((p) => p.edge === "treningowa");
    if (hema.length) pool = hema;
  }
  if (a.era) {
    const byEra = pool.filter((p) => p.category === a.era);
    if (byEra.length) pool = byEra;
  }
  if (a.budget === "low") {
    const cheap = pool.filter((p) => p.price <= 1500);
    if (cheap.length) pool = cheap;
  } else if (a.budget === "mid") {
    const mid = pool.filter((p) => p.price > 1500 && p.price <= 2500);
    if (mid.length) pool = mid;
  }

  return [...pool].sort((x, y) => y.rating - x.rating)[0] ?? PRODUCTS[0];
}

export function Chooser() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const done = step >= QUESTIONS.length;
  const result = done ? recommend(answers) : null;
  const q = QUESTIONS[Math.min(step, QUESTIONS.length - 1)];

  return (
    <div className="panel noise relative overflow-hidden rounded-3xl p-8 sm:p-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,rgba(255,107,26,0.14),transparent_70%)]"
      />

      {/* pasek postępu */}
      <div className="relative mb-10 flex gap-2">
        {QUESTIONS.map((_, i) => (
          <div key={i} className="h-0.5 flex-1 overflow-hidden rounded-full bg-forge-800">
            <motion.div
              className="h-full bg-gradient-to-r from-ember-500 to-gold-400"
              initial={false}
              animate={{ width: step > i ? "100%" : "0%" }}
              transition={{ duration: 0.5 }}
            />
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={q.key}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <p className="font-display text-[10px] uppercase tracking-[0.3em] text-gold-600">
              Pytanie {step + 1} z {QUESTIONS.length}
            </p>
            <h3 className="mt-4 font-display text-2xl text-parchment sm:text-3xl">{q.label}</h3>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {q.options.map((o) => (
                <button
                  key={o.id}
                  onClick={() => {
                    setAnswers((prev) => ({ ...prev, [q.key]: o.id }));
                    setStep((s) => s + 1);
                  }}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-forge-700 px-6 py-5 text-left text-[15px] text-parchment transition-all duration-300 hover:border-gold-500 hover:bg-gold-500/5"
                >
                  {o.label}
                  <span className="text-ash transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold-400">
                    →
                  </span>
                </button>
              ))}
            </div>

            {step > 0 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="mt-7 text-[10px] uppercase tracking-[0.24em] text-ash transition-colors hover:text-parchment"
              >
                ← Wróć
              </button>
            )}
          </motion.div>
        ) : (
          result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative grid items-center gap-10 sm:grid-cols-[160px_1fr]"
            >
              <div className="h-64">
                <SwordArt id={`chooser-${result.slug}`} art={result.art} className="h-full w-auto" />
              </div>
              <div>
                <p className="font-display text-[10px] uppercase tracking-[0.3em] text-gold-600">
                  Nasza propozycja
                </p>
                <h3 className="mt-3 font-display text-3xl text-parchment">{result.name}</h3>
                <p className="mt-2 text-sm text-ash">{result.subtitle}</p>
                <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-parchment-dim">
                  {result.summary}
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <span className="font-display text-2xl text-forged">
                    {formatPLN(result.price)}
                  </span>
                  <Link
                    href={`/sklep/${result.slug}`}
                    className="sheen rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 px-7 py-3.5 font-display text-[11px] uppercase tracking-[0.28em] text-forge-950"
                  >
                    Zobacz miecz
                  </Link>
                  <button
                    onClick={() => {
                      setAnswers({});
                      setStep(0);
                    }}
                    className="text-[10px] uppercase tracking-[0.24em] text-ash transition-colors hover:text-parchment"
                  >
                    Zacznij od nowa
                  </button>
                </div>
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
}

export default Chooser;
