"use client";

import { motion } from "motion/react";

const PHASES = [
  { x: 150, label: "Kucie", temp: "1100 °C" },
  { x: 420, label: "Normalizacja", temp: "850 °C" },
  { x: 560, label: "Hartowanie", temp: "815 °C" },
  { x: 620, label: "Olej", temp: "60 °C" },
  { x: 760, label: "Odpuszczanie", temp: "200 °C" },
];

const PATH =
  "M60 320 C 90 250, 110 120, 160 82 L 300 96 C 330 130, 345 250, 365 305 C 395 230, 405 160, 425 137 C 450 200, 462 275, 478 305 C 505 220, 525 160, 545 145 L 570 150 C 585 240, 592 300, 605 315 L 660 312 C 690 290, 700 282, 730 279 L 830 281 C 850 295, 858 310, 870 320";

export function HeatCurve() {
  return (
    <div className="panel noise overflow-hidden rounded-3xl p-6 sm:p-10">
      <div className="overflow-x-auto">
        <svg viewBox="0 0 900 400" className="w-full min-w-[640px]" role="img" aria-label="Wykres obróbki cieplnej głowni">
          <defs>
            <linearGradient id="heat-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ff6b1a" />
              <stop offset="45%" stopColor="#ffb060" />
              <stop offset="100%" stopColor="#e3c178" />
            </linearGradient>
            <linearGradient id="heat-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff6b1a" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#ff6b1a" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* siatka */}
          {[
            { t: 1200, y: 60 },
            { t: 900, y: 126 },
            { t: 600, y: 192 },
            { t: 300, y: 258 },
            { t: 20, y: 320 },
          ].map((g) => (
            <g key={g.t}>
              <line x1="52" y1={g.y} x2="880" y2={g.y} stroke="#2a231e" strokeWidth="1" strokeDasharray="3 6" />
              <text x="44" y={g.y + 4} textAnchor="end" className="fill-[#7d7264]" fontSize="11">
                {g.t}°
              </text>
            </g>
          ))}

          {/* krzywa */}
          <motion.path
            d={`${PATH} L 870 340 L 60 340 Z`}
            fill="url(#heat-fill)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.8 }}
          />
          <motion.path
            d={PATH}
            fill="none"
            stroke="url(#heat-line)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 2.6, ease: "easeInOut" }}
          />

          {/* podpisy faz */}
          {PHASES.map((p, i) => (
            <motion.g
              key={p.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.35, duration: 0.6 }}
            >
              <line x1={p.x} y1="346" x2={p.x} y2="356" stroke="#3b322a" strokeWidth="1" />
              <text x={p.x} y="372" textAnchor="middle" className="fill-[#ece3d4]" fontSize="12">
                {p.label}
              </text>
              <text x={p.x} y="388" textAnchor="middle" className="fill-[#c8a24a]" fontSize="10">
                {p.temp}
              </text>
            </motion.g>
          ))}
        </svg>
      </div>
    </div>
  );
}

export default HeatCurve;
