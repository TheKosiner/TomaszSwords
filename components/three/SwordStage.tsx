"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SwordArt from "@/components/ui/SwordArt";

const SwordScene = dynamic(() => import("./SwordScene"), { ssr: false });

const PARTS = [
  { id: "glowica", name: "Głowica", note: "przeciwwaga" },
  { id: "rekojesc", name: "Rękojeść", note: "drewno + skóra" },
  { id: "jelec", name: "Jelec", note: "ochrona dłoni" },
  { id: "trzpien", name: "Trzpień", note: "rdzeń konstrukcji" },
  { id: "glownia", name: "Głownia", note: "stal sprężynowa" },
  { id: "pochwa", name: "Pochwa", note: "rdzeń drewniany" },
];

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl2") || c.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

export function SwordStage() {
  const [ready, setReady] = useState(false);
  const [supported, setSupported] = useState(true);
  const [exploded, setExploded] = useState(false);

  useEffect(() => {
    setSupported(hasWebGL());
    const id = window.setTimeout(() => setReady(true), 120);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="relative h-[68vh] min-h-[480px] w-full lg:h-[86vh]">
      {/* poświata paleniska za mieczem */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,107,26,0.22),transparent_68%)] blur-2xl animate-flicker"
      />

      {supported ? (
        <>
          {ready && <SwordScene exploded={exploded} />}
          <AnimatePresence>
            {!ready && (
              <motion.div
                exit={{ opacity: 0 }}
                className="absolute inset-0 grid place-items-center"
              >
                <div className="h-24 w-px animate-pulse bg-gradient-to-b from-transparent via-gold-500 to-transparent" />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <div className="absolute inset-0 grid place-items-center p-8">
          <SwordArt
            id="fallback"
            art={{ blade: "taper", guard: "straight", pommel: "wheel", grip: "#5d2f22", fitting: "silver", ratio: 1 }}
            className="h-full max-h-[70vh] w-auto drop-shadow-[0_0_45px_rgba(255,107,26,0.25)]"
          />
        </div>
      )}

      {/* sterowanie */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-4">
        <motion.button
          type="button"
          onClick={() => setExploded((v) => !v)}
          className="pointer-events-auto group relative overflow-hidden rounded-full border border-gold-600/60 bg-forge-900/70 px-7 py-3 font-display text-xs uppercase tracking-[0.3em] text-gold-300 backdrop-blur-md transition-colors hover:border-gold-400 hover:text-gold-200"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          aria-pressed={exploded}
        >
          <span className="relative z-10">
            {exploded ? "Złóż miecz" : "Rozłóż miecz"}
          </span>
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold-500/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </motion.button>

        <motion.ul
          className="hidden flex-wrap items-center justify-center gap-x-5 gap-y-2 px-4 text-[10px] uppercase tracking-[0.28em] text-parchment-dim sm:flex"
          initial={false}
          animate={{ opacity: exploded ? 1 : 0.45 }}
        >
          {PARTS.map((p, i) => (
            <motion.li
              key={p.id}
              className="flex items-center gap-2"
              animate={exploded ? { y: 0, opacity: 1 } : { y: 4, opacity: 0.5 }}
              transition={{ delay: exploded ? i * 0.07 : 0, duration: 0.5 }}
            >
              <span className="h-1 w-1 rounded-full bg-gold-500" />
              {p.name}
              <span className="text-ash normal-case tracking-normal">· {p.note}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {!supported && (
        <p className="absolute bottom-20 left-1/2 w-full max-w-xs -translate-x-1/2 text-center text-[11px] text-ash">
          Twoja przeglądarka nie obsługuje WebGL — pokazujemy wersję wektorową.
        </p>
      )}
    </div>
  );
}

export default SwordStage;
