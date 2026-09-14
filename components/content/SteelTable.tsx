"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type Row = {
  id: string;
  name: string;
  carbon: string;
  hrc: string;
  use: string;
  toughness: number;
  edge: number;
  care: number;
  note: string;
};

const ROWS: Row[] = [
  {
    id: "1060",
    name: "1060",
    carbon: "0,60 %",
    hrc: "48–52",
    use: "Repliki dekoracyjne, pierwsze miecze",
    toughness: 62,
    edge: 58,
    care: 45,
    note: "Prosta stal węglowa bez dodatków stopowych. Tania w obróbce, dobrze hartuje się w oleju, wybacza drobne błędy kowala. Przy poważnym kontakcie odkształca się trwale — dlatego to materiał na broń do gabloty i lekkiej rekonstrukcji.",
  },
  {
    id: "1075",
    name: "1075 / 1085",
    carbon: "0,75–0,85 %",
    hrc: "50–54",
    use: "Miecze bojowe rekonstrukcyjne",
    toughness: 68,
    edge: 68,
    care: 45,
    note: "Więcej węgla to wyższa twardość i lepsze trzymanie krawędzi, ale mniejsza tolerancja na błąd przy hartowaniu. Klasyczny wybór na głownie o zauważalnej masie: claymore'y, zweihändery.",
  },
  {
    id: "1095",
    name: "1095",
    carbon: "0,95 %",
    hrc: "56–60",
    use: "Głownie z hamonem, katany",
    toughness: 48,
    edge: 88,
    care: 35,
    note: "Bardzo twarda i bardzo wrażliwa. Świetnie pokazuje hamon przy hartowaniu selektywnym, ale przy zginaniu potrafi pęknąć zamiast się wygiąć. Materiał dla tych, którzy wiedzą, po co go biorą.",
  },
  {
    id: "en45",
    name: "EN45 / 6150",
    carbon: "0,45 %",
    hrc: "48–52",
    use: "Miecze rycerskie, pochwy, sprzęt pokazowy",
    toughness: 85,
    edge: 60,
    care: 55,
    note: "Stal sprężynowa z krzemem i manganem. Głownia wraca do prostej po wygięciu — kluczowe przy replikach, które trafiają do rąk osób bez doświadczenia.",
  },
  {
    id: "5160",
    name: "5160",
    carbon: "0,60 %",
    hrc: "50–54",
    use: "HEMA, sprzęt treningowy",
    toughness: 90,
    edge: 66,
    care: 55,
    note: "Dodatek chromu do stali sprężynowej. Najpopularniejszy materiał na miecze treningowe na świecie — kompromis między twardością a odpornością na uderzenia jest tu praktycznie idealny.",
  },
  {
    id: "9260",
    name: "9260",
    carbon: "0,60 %",
    hrc: "52–56",
    use: "Sprzęt testowy, cięcie mat",
    toughness: 96,
    edge: 72,
    care: 60,
    note: "Około 2 % krzemu daje sprężystość, która w testach pozwala wygiąć głownię o 90° i doczekać się powrotu do prostej. Najbardziej wybaczająca ze stali używanych na miecze.",
  },
  {
    id: "t10",
    name: "T10",
    carbon: "1,0 %",
    hrc: "56–60",
    use: "Głownie z wyraźnym hamonem",
    toughness: 52,
    edge: 90,
    care: 30,
    note: "Chińska stal narzędziowa z wolframem. Bardzo drobne ziarno, wyjątkowa ostrość i wyraźny hamon, ale podatna na korozję — wymaga regularnego oliwienia.",
  },
];

const METRICS: { key: keyof Pick<Row, "toughness" | "edge" | "care">; label: string }[] = [
  { key: "toughness", label: "Odporność na wygięcie" },
  { key: "edge", label: "Trzymanie krawędzi" },
  { key: "care", label: "Odporność na korozję" },
];

export function SteelTable() {
  const [open, setOpen] = useState<string | null>("5160");

  return (
    <div className="overflow-hidden rounded-3xl border border-forge-700">
      <div className="hidden grid-cols-[1.1fr_0.7fr_0.7fr_1.6fr_auto] gap-4 border-b border-forge-700 bg-forge-900 px-6 py-4 text-[10px] uppercase tracking-[0.22em] text-ash lg:grid">
        <span>Gatunek</span>
        <span>Węgiel</span>
        <span>HRC</span>
        <span>Typowe zastosowanie</span>
        <span />
      </div>

      {ROWS.map((row) => {
        const isOpen = open === row.id;
        return (
          <div key={row.id} className="border-b border-forge-800 last:border-b-0">
            <button
              onClick={() => setOpen(isOpen ? null : row.id)}
              className="grid w-full grid-cols-1 items-center gap-2 px-6 py-5 text-left transition-colors hover:bg-forge-900/60 lg:grid-cols-[1.1fr_0.7fr_0.7fr_1.6fr_auto] lg:gap-4"
              aria-expanded={isOpen}
            >
              <span className="font-display text-base text-parchment">{row.name}</span>
              <span className="text-sm text-parchment-dim">
                <span className="lg:hidden text-ash">Węgiel: </span>
                {row.carbon}
              </span>
              <span className="text-sm text-parchment-dim">
                <span className="lg:hidden text-ash">Twardość: </span>
                {row.hrc} HRC
              </span>
              <span className="text-sm text-parchment-dim">{row.use}</span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0, color: isOpen ? "#e3c178" : "#7d7264" }}
                className="hidden justify-self-end text-lg lg:block"
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden bg-forge-900/50"
                >
                  <div className="grid gap-8 px-6 pb-7 pt-2 lg:grid-cols-[1.4fr_1fr]">
                    <p className="text-[15px] leading-relaxed text-parchment-dim">{row.note}</p>
                    <dl className="space-y-3 self-center">
                      {METRICS.map((m, i) => (
                        <div key={m.key} className="flex items-center gap-4">
                          <dt className="w-44 shrink-0 text-[10px] uppercase tracking-[0.18em] text-ash">
                            {m.label}
                          </dt>
                          <dd className="h-1 flex-1 overflow-hidden rounded-full bg-forge-800">
                            <motion.div
                              className="h-full rounded-full bg-gradient-to-r from-ember-600 via-gold-500 to-gold-300"
                              initial={{ width: 0 }}
                              animate={{ width: `${row[m.key]}%` }}
                              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            />
                          </dd>
                          <span className="w-8 text-right text-[11px] text-parchment-dim tabular-nums">
                            {row[m.key]}
                          </span>
                        </div>
                      ))}
                    </dl>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default SteelTable;
