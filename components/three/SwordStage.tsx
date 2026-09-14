"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SwordArt from "@/components/ui/SwordArt";
import { SWORD_PARTS } from "@/lib/sword-parts";

const SwordScene = dynamic(() => import("./SwordScene"), { ssr: false });

const ZOOM_MIN = 0.7;
const ZOOM_MAX = 2.6;
const ZOOM_STEP = 0.3;

const clampZoom = (v: number) => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, v));

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
  const [zoom, setZoom] = useState(1);

  /** rozstaw palców z poprzedniej klatki gestu szczypania */
  const pinchStart = useRef<number | null>(null);

  useEffect(() => {
    setSupported(hasWebGL());
    const id = window.setTimeout(() => setReady(true), 120);
    return () => window.clearTimeout(id);
  }, []);

  const touchSpread = (touches: React.TouchList) => {
    const [a, b] = [touches[0], touches[1]];
    return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
  };

  return (
    <>
      <div
        className="relative mb-6 h-[54vh] min-h-[400px] w-full touch-pan-y lg:mb-0 lg:h-[100svh]"
        onTouchStart={(e) => {
          if (e.touches.length === 2) pinchStart.current = touchSpread(e.touches);
        }}
        onTouchMove={(e) => {
          if (e.touches.length !== 2 || pinchStart.current === null) return;
          const now = touchSpread(e.touches);
          setZoom((z) => clampZoom(z * (now / pinchStart.current!)));
          pinchStart.current = now;
        }}
        onTouchEnd={() => {
          pinchStart.current = null;
        }}
      >
        {/* poświata paleniska za mieczem */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,107,26,0.22),transparent_68%)] blur-2xl animate-flicker"
        />

        {supported ? (
          <>
            {ready && <SwordScene exploded={exploded} zoom={zoom} />}
            <AnimatePresence>
              {!ready && (
                <motion.div exit={{ opacity: 0 }} className="absolute inset-0 grid place-items-center">
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

        {/* --------------------------------------------------- sterowanie */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 lg:inset-x-auto lg:bottom-24 lg:right-10 lg:items-end">
          <div className="pointer-events-auto flex items-center gap-2">
            <motion.button
              type="button"
              onClick={() => setExploded((v) => !v)}
              className="group relative overflow-hidden rounded-full border border-gold-600/60 bg-forge-900/70 px-7 py-3 font-display text-xs uppercase tracking-[0.3em] text-gold-300 backdrop-blur-md transition-colors hover:border-gold-400 hover:text-gold-200"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              aria-pressed={exploded}
            >
              <span className="relative z-10">{exploded ? "Złóż miecz" : "Rozłóż miecz"}</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold-500/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </motion.button>

            {supported && (
              <div className="flex items-center gap-1 rounded-full border border-forge-600 bg-forge-900/70 px-1.5 py-1 backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setZoom((z) => clampZoom(z - ZOOM_STEP))}
                  disabled={zoom <= ZOOM_MIN + 0.01}
                  className="grid h-8 w-8 place-items-center rounded-full text-lg leading-none text-parchment-dim transition-colors hover:bg-forge-800 hover:text-gold-300 disabled:opacity-30"
                  aria-label="Oddal miecz"
                >
                  −
                </button>
                <button
                  type="button"
                  onClick={() => setZoom(1)}
                  className="min-w-11 px-1 font-display text-[10px] uppercase tracking-[0.12em] text-parchment-dim transition-colors hover:text-gold-300"
                  aria-label="Przywróć domyślne przybliżenie"
                >
                  {zoom.toFixed(1)}×
                </button>
                <button
                  type="button"
                  onClick={() => setZoom((z) => clampZoom(z + ZOOM_STEP))}
                  disabled={zoom >= ZOOM_MAX - 0.01}
                  className="grid h-8 w-8 place-items-center rounded-full text-lg leading-none text-parchment-dim transition-colors hover:bg-forge-800 hover:text-gold-300 disabled:opacity-30"
                  aria-label="Przybliż miecz"
                >
                  +
                </button>
              </div>
            )}
          </div>

          {/* skrócona lista części — tylko tam, gdzie etykiety są widoczne */}
          <motion.ul
            className="hidden flex-col items-end gap-1.5 text-[10px] uppercase tracking-[0.28em] text-parchment-dim lg:flex"
            initial={false}
            animate={{ opacity: exploded ? 1 : 0.45 }}
          >
            {SWORD_PARTS.map((p, i) => (
              <motion.li
                key={p.id}
                className="flex items-center gap-2"
                animate={exploded ? { y: 0, opacity: 1 } : { y: 4, opacity: 0.5 }}
                transition={{ delay: exploded ? i * 0.07 : 0, duration: 0.5 }}
              >
                <span className="h-1 w-1 rounded-full bg-gold-500" />
                {p.title}
                <span className="normal-case tracking-normal text-ash">· {p.note}</span>
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

      {/* ------- opisy części pod sceną: tam, gdzie etykiety się nie mieszczą ------- */}
      <div className="lg:hidden">
        <AnimatePresence initial={false}>
          {exploded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="container-forge pb-6 pt-2">
                <p className="eyebrow mb-4">Z czego składa się miecz</p>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {SWORD_PARTS.map((p, i) => (
                    <motion.li
                      key={p.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.45 }}
                      className="panel rounded-2xl p-4"
                    >
                      <p className="font-display text-[12px] uppercase tracking-[0.26em] text-gold-300">
                        {p.title}
                      </p>
                      <p className="mt-2 text-[13px] leading-relaxed text-parchment-dim">
                        {p.desc}
                      </p>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default SwordStage;
