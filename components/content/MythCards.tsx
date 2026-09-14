"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Reveal } from "@/components/ui/motion";

const MYTHS = [
  {
    myth: "Miecze ważyły 10–15 kg i trzeba było siłacza, żeby je unieść.",
    truth:
      "Miecz jednoręczny waży zwykle 1,0–1,4 kg, długi 1,3–1,8 kg. Nawet dwuręczny Zweihänder rzadko przekracza 3 kg. Mit wziął się z XIX-wiecznych katalogów muzealnych i z mieczy paradnych, które faktycznie bywały cięższe — ale nikt nimi nie walczył.",
  },
  {
    myth: "Zbrocze to „rowek na krew”, żeby ostrze łatwiej wychodziło z rany.",
    truth:
      "Zbrocze to zabieg inżynierski: odbiera masę ze środka przekroju, gdzie materiał niewiele wnosi do sztywności. Efekt jest taki, jak w dwuteowniku — lżej przy tej samej wytrzymałości na zginanie.",
  },
  {
    myth: "Mieczem można przeciąć zbroję płytową.",
    truth:
      "Nie można — i wiedziano o tym w XV wieku. Dlatego powstały techniki półmiecza (chwyt za głownię), mordschlag (uderzenie głowicą) oraz typy XV i XVIII: ostry sztych szukający szczelin pod pachą, w kroku i przy przyłbicy.",
  },
  {
    myth: "Japońska katana była lepsza od europejskich mieczy.",
    truth:
      "To dwie odpowiedzi na dwa różne problemy. Katana powstała z kiepskiej rudy i przeciw przeciwnikowi w zbroi lamelkowej. Europejski miecz z lepszej stali walczył z kolczugą i płytą. Porównywanie ich to jak porównywanie siekiery z piłą.",
  },
  {
    myth: "Miecz był podstawową bronią średniowiecznego pola bitwy.",
    truth:
      "Podstawą była włócznia, potem pika, kusza i łuk. Miecz to broń boczna i statusowa — drogi, prestiżowy, noszony przy pasie. Dokładnie dlatego przetrwał w symbolice do dziś.",
  },
  {
    myth: "Kowal hartował głownię w krwi wroga albo w ciele niewolnika.",
    truth:
      "Legendy z kronik i romansów rycerskich. Hartowano w wodzie, oleju lub solance — istotna była szybkość odbioru ciepła, a nie „magia” medium. Za to selektywne hartowanie gliną to fakt i daje efekt hartu na krawędzi przy sprężystym grzbiecie.",
  },
];

export function MythCards() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-forge">
        <Reveal>
          <p className="eyebrow">Mit kontra fakt</p>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.9rem,4.2vw,3.2rem)] leading-[1.05]">
            Sześć rzeczy, które <span className="text-forged">wszyscy wiedzą</span> — i są nieprawdą
          </h2>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-parchment-dim">
            Kliknij kartę, żeby ją odwrócić.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MYTHS.map((m, i) => (
            <MythCard key={m.myth} {...m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MythCard({ myth, truth, index }: { myth: string; truth: string; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={() => setFlipped((v) => !v)}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
      className="group relative h-72 w-full text-left [perspective:1400px]"
      aria-pressed={flipped}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* awers */}
        <div className="panel noise absolute inset-0 flex flex-col justify-between rounded-2xl p-7 [backface-visibility:hidden]">
          <span className="font-display text-[10px] uppercase tracking-[0.3em] text-blood-500">
            Mit
          </span>
          <p className="font-display text-lg leading-snug text-parchment">„{myth}”</p>
          <span className="text-[10px] uppercase tracking-[0.24em] text-ash">
            Odwróć →
          </span>
        </div>

        {/* rewers */}
        <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-gold-600/40 bg-gradient-to-b from-forge-800 to-forge-900 p-7 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="font-display text-[10px] uppercase tracking-[0.3em] text-gold-400">
            Fakt
          </span>
          <p className="text-[13px] leading-relaxed text-parchment-dim">{truth}</p>
          <span className="text-[10px] uppercase tracking-[0.24em] text-ash">← Wróć</span>
        </div>
      </motion.div>
    </motion.button>
  );
}

export default MythCards;
