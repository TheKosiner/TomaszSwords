"use client";

import { useEffect, useState } from "react";

type Spark = { left: number; delay: number; duration: number; size: number; drift: number; hue: string };

/** Delikatne iskry unoszące się znad paleniska. Generowane po stronie klienta,
 *  żeby nie powodować rozjazdu przy hydracji. */
export function Embers({ count = 12 }: { count?: number }) {
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    setSparks(
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        delay: Math.random() * 18,
        duration: 16 + Math.random() * 16,
        size: 1 + Math.random() * 2.6,
        drift: (Math.random() - 0.5) * 220,
        hue: Math.random() > 0.72 ? "#ffd08a" : "#ff7a2a",
      })),
    );
  }, [count]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {sparks.map((s, i) => (
        <span
          key={i}
          className="absolute bottom-[-8vh] rounded-full"
          style={{
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            background: s.hue,
            boxShadow: `0 0 ${s.size * 3}px ${s.hue}44`,
            animation: `emberRise ${s.duration}s linear ${s.delay}s infinite`,
            ["--drift" as string]: `${s.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

export default Embers;
