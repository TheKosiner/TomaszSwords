"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import SwordStage from "@/components/three/SwordStage";
import { Magnetic } from "@/components/ui/motion";

const line = {
  hidden: { y: "110%", opacity: 0 },
  show: { y: "0%", opacity: 1 },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden pt-[var(--nav-h)]">
      {/* tło: krata i łuna */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #c8a24a 1px, transparent 1px), linear-gradient(to bottom, #c8a24a 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage: "radial-gradient(ellipse at 50% 35%, black, transparent 72%)",
        }}
      />

      <motion.div style={{ y, opacity }} className="container-forge relative grid items-center gap-8 pb-16 pt-10 lg:grid-cols-[1fr_1.05fr] lg:gap-4 lg:pb-24">
        {/* ---- kolumna tekstowa ---- */}
        <div className="relative z-20 order-2 text-center lg:order-1 lg:text-left">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="eyebrow"
          >
            Zbrojownia · Anno Domini
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.12, delayChildren: 0.5 }}
            className="mt-6 font-display text-[clamp(2.6rem,7vw,5.4rem)] font-semibold leading-[0.95] tracking-tight"
          >
            {["Stal, która", "pamięta"].map((t) => (
              <span key={t} className="block overflow-hidden">
                <motion.span
                  variants={line}
                  transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-steel"
                >
                  {t}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden">
              <motion.span
                variants={line}
                transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
                className="block text-forged italic"
              >
                każde cięcie
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.9 }}
            className="mx-auto mt-7 max-w-md text-[15px] leading-relaxed text-parchment-dim lg:mx-0"
          >
            Miecze średniowieczne dla kolekcjonerów, rekonstruktorów i ludzi,
            którzy chcą trzymać w ręku coś prawdziwego. Pełne specyfikacje,
            uczciwe wyważenie, żadnej taniej blachy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.9 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <Magnetic>
              <Link
                href="/sklep"
                className="sheen inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 px-8 py-4 font-display text-[11px] uppercase tracking-[0.3em] text-forge-950"
              >
                Wejdź do zbrojowni
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Link
                href="/historia"
                className="inline-flex items-center gap-2 rounded-full border border-forge-600 px-7 py-4 font-display text-[11px] uppercase tracking-[0.3em] text-parchment-dim transition-colors hover:border-gold-600 hover:text-gold-300"
              >
                Historia miecza
              </Link>
            </Magnetic>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-12 flex justify-center gap-8 border-t border-forge-800 pt-6 lg:justify-start"
          >
            {[
              ["14", "typów w ofercie"],
              ["48h", "wysyłka"],
              ["2 lata", "gwarancji"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="font-display text-xl text-gold-300">{v}</dt>
                <dd className="mt-1 text-[10px] uppercase tracking-[0.2em] text-ash">{l}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ---- scena 3D ---- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-1 lg:order-2"
        >
          <SwordStage />
        </motion.div>
      </motion.div>

      {/* wskazówka scrolla */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex flex-col items-center gap-2 lg:left-10 lg:right-auto lg:items-start"
      >
        <span className="font-display text-[9px] uppercase tracking-[0.42em] text-ash">
          Przewiń
        </span>
        <span className="relative block h-12 w-px overflow-hidden bg-forge-700">
          <span
            className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-gold-400 to-transparent"
            style={{ animation: "shimmerLine 2.4s ease-in-out infinite" }}
          />
        </span>
      </motion.div>
    </section>
  );
}

export default Hero;
