import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/site/PageHeader";
import { Reveal, Counter } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "O nas",
  description:
    "Kim jesteśmy, jak dobieramy miecze do oferty i co sprawdzamy w każdym egzemplarzu, zanim trafi do klienta.",
};

const CHECKS = [
  {
    t: "Geometria głowni",
    d: "Sprawdzamy prostość w dwóch płaszczyznach i symetrię zbieżności. Głownia skrzywiona o więcej niż 2 mm na metr wraca do dostawcy.",
  },
  {
    t: "Punkt równowagi",
    d: "Mierzymy odległość od jelca i porównujemy z deklaracją producenta. Ta liczba trafia do opisu — jeśli się nie zgadza, poprawiamy opis, nie pomiar.",
  },
  {
    t: "Osadzenie oprawy",
    d: "Jelec musi siedzieć bez luzu, głowica być pewnie zanitowana, rękojeść nie obracać się na trzpieniu. Klekoczący miecz nie jedzie dalej.",
  },
  {
    t: "Krawędź i sztych",
    d: "Kontrola grubości krawędzi i zaokrąglenia sztychu — zwłaszcza przy sprzęcie opisanym jako treningowy, gdzie te wartości mają znaczenie dla bezpieczeństwa.",
  },
  {
    t: "Pochwa",
    d: "Głownia musi wchodzić bez oporu i trzymać się tarciem przy wylocie. Sprawdzamy też szwy i okucia zawiesia.",
  },
  {
    t: "Dokumentacja",
    d: "Każdy egzemplarz dostaje kartę z wymiarami i masą zmierzonymi u nas. Jeżeli jakiś parametr odbiega od serii — piszemy to wprost w opisie.",
  },
];

const VALUES = [
  {
    t: "Liczby zamiast przymiotników",
    d: "„Świetnie wyważony” nic nie znaczy. Punkt równowagi 11 cm od jelca — znaczy. Wszystkie nasze opisy budujemy na pomiarach.",
  },
  {
    t: "Miecz to nie zabawka",
    d: "Sprzedajemy wyłącznie osobom pełnoletnim i zawsze piszemy, do czego dany egzemplarz się nadaje, a do czego nie. Replika dekoracyjna nie jest sprzętem treningowym, choćby wyglądała identycznie.",
  },
  {
    t: "Wiedza jest za darmo",
    d: "Cała sekcja o historii, stali i rzemiośle jest dostępna bez zakupu i bez maila. Klient, który rozumie, co kupuje, rzadziej zwraca towar — i częściej wraca po drugi.",
  },
];

export default function ONasPage() {
  return (
    <>
      <PageHeader
        eyebrow="O nas"
        title="Zbrojownia z obsesją na punkcie szczegółów"
        lead="Zaczęło się od jednego miecza kupionego w ciemno, który okazał się kompletnie inny niż opis. Uznaliśmy, że da się to robić uczciwiej: mierzyć, opisywać zgodnie z prawdą i mówić wprost, czego po danym egzemplarzu nie oczekiwać."
      />

      <section className="container-forge">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="space-y-5 text-[15px] leading-relaxed text-parchment-dim">
              <p>
                Tomasz Swords to sklep, nie kuźnia — i nie udajemy, że jest inaczej.
                Naszą robotą jest dobór: przeglądamy to, co dostępne na rynku,
                zamawiamy próbki, mierzymy je, testujemy i wybieramy egzemplarze,
                które trzymają zadeklarowane parametry.
              </p>
              <p>
                Ta selekcja to w praktyce większość pracy. Między dwoma mieczami
                wyglądającymi na zdjęciu identycznie potrafi być przepaść:
                w wyważeniu, w osadzeniu jelca, w tym, czy głownia jest prosta.
                Dlatego każda sztuka przed wysyłką przechodzi u nas kontrolę
                z listy poniżej.
              </p>
              <p>
                Drugą połową jest opis. Staramy się pisać tak, żeby osoba, która
                nigdy nie trzymała miecza, wiedziała po lekturze, czego się
                spodziewać — łącznie z rzeczami niewygodnymi, jak to, że replika
                dekoracyjna nie nadaje się do sparingu, a stal węglowa zardzewieje,
                jeśli o nią nie zadbasz.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-forge-700 bg-forge-700">
              {[
                { v: 14, s: "", l: "pozycji w ofercie" },
                { v: 6, s: "", l: "punktów kontroli przed wysyłką" },
                { v: 48, s: " h", l: "czas wysyłki" },
                { v: 30, s: " dni", l: "na zwrot" },
              ].map((s) => (
                <div key={s.l} className="bg-forge-900 p-7">
                  <p className="font-display text-3xl text-forged">
                    <Counter to={s.v} suffix={s.s} />
                  </p>
                  <p className="mt-2 text-[10px] uppercase leading-tight tracking-[0.2em] text-ash">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-forge">
          <Reveal>
            <p className="eyebrow">Kontrola</p>
            <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.9rem,4.2vw,3.2rem)] leading-[1.05]">
              Sześć rzeczy sprawdzanych <span className="text-forged">przed wysyłką</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-forge-700 bg-forge-700 sm:grid-cols-2 lg:grid-cols-3">
            {CHECKS.map((c, i) => (
              <div key={c.t} className="group bg-forge-900 p-8 transition-colors duration-500 hover:bg-forge-850">
                <span className="font-display text-[10px] tracking-[0.3em] text-gold-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-lg text-parchment">{c.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-parchment-dim">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-forge">
          <Reveal>
            <p className="eyebrow">Zasady</p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,4.2vw,3.2rem)] leading-[1.05]">
              Trzy rzeczy, <span className="text-forged">na których nie schodzimy</span>
            </h2>
          </Reveal>

          <div className="mt-14 space-y-px overflow-hidden rounded-3xl border border-forge-700 bg-forge-700">
            {VALUES.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.07}>
                <div className="grid gap-4 bg-forge-900 p-8 sm:grid-cols-[280px_1fr] sm:gap-10 sm:p-10">
                  <h3 className="font-display text-xl text-parchment">{v.t}</h3>
                  <p className="text-[15px] leading-relaxed text-parchment-dim">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="panel mt-12 flex flex-col items-start justify-between gap-6 rounded-3xl p-10 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-display text-2xl text-parchment">Masz pytanie o konkretny egzemplarz?</h2>
                <p className="mt-2 text-sm text-parchment-dim">
                  Odpowiadamy w ciągu jednego dnia roboczego. Także na te trudne.
                </p>
              </div>
              <Link
                href="/kontakt"
                className="sheen shrink-0 rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 px-8 py-4 font-display text-[11px] uppercase tracking-[0.28em] text-forge-950"
              >
                Napisz do nas
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
