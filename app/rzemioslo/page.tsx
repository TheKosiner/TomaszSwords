import type { Metadata } from "next";
import PageHeader from "@/components/site/PageHeader";
import Chooser from "@/components/content/Chooser";
import { Reveal, Counter } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Rzemiosło — jak powstaje miecz",
  description:
    "Od sztaby do gotowej głowni: kucie, normalizacja, hartowanie, odpuszczanie, szlif i oprawa. Oraz odpowiedź na pytanie, po co dziś kuje się miecze.",
};

const STEPS = [
  {
    n: "I",
    title: "Przygotowanie i kucie",
    temp: "900–1150 °C",
    lead: "Kształt rodzi się z masy, nie ze szlifu.",
    body: [
      "Sztaba rozgrzana do jasnej czerwieni trafia pod młot. Kowal najpierw wyciąga długość, potem zakłada zbieżność — głownia musi być szersza przy jelcu i węższa przy sztychu, i ta różnica ma powstać przez przesunięcie materiału, a nie przez zeszlifowanie nadmiaru.",
      "Zbrocze wykuwa się na specjalnym narzędziu lub frezuje później. W obu przypadkach cel jest ten sam: zabrać materiał ze środka przekroju, gdzie mało wnosi do sztywności.",
    ],
    note: "Miecz szlifowany „z płaskownika” bez kucia też działa, ale ma inny rozkład włókien i zwykle gorzej znosi obciążenia dynamiczne.",
  },
  {
    n: "II",
    title: "Normalizacja",
    temp: "ok. 850 °C, 2–3 cykle",
    lead: "Wyrównanie tego, co kucie rozstroiło.",
    body: [
      "Kucie rozciąga i rozdrabnia ziarno nierównomiernie, a w materiale zostają naprężenia. Kilka cykli grzania do temperatury przemiany i studzenia na powietrzu wyrównuje strukturę.",
      "To krok, który najłatwiej pominąć i najtrudniej odzyskać. Głownia bez normalizacji potrafi wypaczyć się dopiero podczas hartowania — kiedy jest już za późno.",
    ],
    note: "Każdy kolejny cykl prowadzi się w nieco niższej temperaturze. Ziarno robi się drobniejsze z każdym powtórzeniem.",
  },
  {
    n: "III",
    title: "Hartowanie",
    temp: "780–830 °C → olej",
    lead: "Kilka sekund, które decydują o wszystkim.",
    body: [
      "Głownia rozgrzana powyżej punktu przemiany trafia do oleju. Studzenie musi być szybsze niż krytyczna szybkość dla danej stali — inaczej struktura nie zamieni się w martenzyt.",
      "Efekt: stal twarda jak szkło i tak samo krucha. W tym momencie głownia potrafi pęknąć od samego postukania. Przy hartowaniu selektywnym grzbiet zabezpiecza się warstwą gliny, żeby stygł wolniej — to daje twardą krawędź, sprężysty grzbiet i widoczną linię hartu.",
    ],
    note: "Dłuższe głownie hartuje się w pionie, zanurzając równomiernie — wsunięcie pod kątem to najprostsza droga do trwałego wygięcia.",
  },
  {
    n: "IV",
    title: "Odpuszczanie",
    temp: "180–250 °C, 2 × 1 h",
    lead: "Zamiana części twardości na życie.",
    body: [
      "Kontrolowane podgrzanie rozładowuje naprężenia w świeżo zahartowanej stali. Traci się kilka punktów twardości, zyskuje odporność na pękanie — i dopiero teraz głownia zaczyna zachowywać się jak miecz.",
      "Temperatura odpuszczania to najważniejsza decyzja projektowa w całym procesie. Niżej: twardsza krawędź, większe ryzyko złamania. Wyżej: głownia bardziej wybacza, ale szybciej traci ostrość.",
    ],
    note: "Kolory nalotowe na czystej stali zdradzają temperaturę: słomkowy ok. 220 °C, brązowy 255 °C, fioletowy 280 °C.",
  },
  {
    n: "V",
    title: "Szlif, oprawa, pochwa",
    temp: "—",
    lead: "Miecz staje się przedmiotem.",
    body: [
      "Profilowanie krawędzi, wyrównanie płaszczyzn, polerowanie do zadanej gradacji. Potem oprawa: jelec nabity ciasno na trzpień, rękojeść z drewnianego rdzenia kryta skórą, głowica nitowana na gorąco lub na zimno.",
      "Na końcu pochwa: dwie deseczki wyżłobione dokładnie pod przekrój głowni, sklejone, obciągnięte skórą, wykończone trzewikiem. Dobrze zrobiona trzyma miecz samym tarciem przy wylocie — bez zatrzasków i rzemyków.",
    ],
    note: "Punkt równowagi ustawia się masą głowicy. Ten sam miecz z cięższą głowicą prowadzi się zupełnie inaczej.",
  },
];

const TODAY = [
  {
    title: "HEMA",
    text: "Kluby rekonstruujące europejskie sztuki walki pracują na traktatach z XIV–XVI wieku. Żeby technika z Liechtenauera zadziałała, sprzęt musi mieć właściwą masę, sztywność i punkt równowagi. Stąd rosnący rynek broni treningowej, projektowanej pod pomiar, a nie pod wygląd.",
    stat: { v: 40000, s: "+", l: "ćwiczących HEMA na świecie" },
  },
  {
    title: "Rekonstrukcja historyczna",
    text: "Grupy odtwórcze potrzebują wyposażenia zgodnego z epoką i bezpiecznego w kontakcie: tępe krawędzie o określonej grubości, zaokrąglone sztychy, sprężysta stal. Miecz jest tu częścią kostiumu i narzędziem edukacji — na festynach częściej służy do opowiadania niż do walki.",
    stat: { v: 2, s: " mm", l: "minimalna grubość tępej krawędzi" },
  },
  {
    title: "Kolekcjonerstwo",
    text: "Oryginał z XIV wieku kosztuje jak mieszkanie i stoi w muzeum. Dobra replika daje to samo doświadczenie dotyku, masy i wyważenia — za ułamek ceny i bez ryzyka zniszczenia zabytku. Dla wielu kolekcjonerów to jedyny sposób, żeby faktycznie potrzymać typ XVIII w dłoni.",
    stat: { v: 13, s: "", l: "typów głowni do skompletowania" },
  },
  {
    title: "Rzemiosło jako praktyka",
    text: "Osobna kategoria: ludzie, którzy kują, bo lubią kuć. Kurs kowalstwa, pierwszy nóż, potem pierwsza głownia. Miecz jest tu egzaminem — wymaga jednocześnie kucia, obróbki cieplnej, ślusarki, stolarki i pracy w skórze.",
    stat: { v: 5, s: " rzemiosł", l: "w jednym przedmiocie" },
  },
];

export default function RzemiosloPage() {
  return (
    <>
      <PageHeader
        eyebrow="Wiedza"
        title="Jak powstaje miecz"
        lead="Pięć etapów, z których każdy potrafi zniszczyć pracę poprzedniego. Od rozgrzanej sztaby po pochwę, która trzyma głownię samym tarciem."
      />

      {/* ------------------------------------------------------- etapy */}
      <section className="container-forge">
        <div className="space-y-6">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <article className="panel noise grid gap-8 rounded-3xl p-8 sm:p-10 lg:grid-cols-[260px_1fr] lg:gap-14">
                <div>
                  <span className="font-display text-6xl text-forge-700">{s.n}</span>
                  <h2 className="mt-4 font-display text-2xl leading-tight text-parchment">
                    {s.title}
                  </h2>
                  <p className="mt-3 font-display text-[10px] uppercase tracking-[0.24em] text-ember-400">
                    {s.temp}
                  </p>
                  <p className="mt-4 text-sm italic leading-relaxed text-ash">{s.lead}</p>
                </div>

                <div>
                  <div className="space-y-4">
                    {s.body.map((p) => (
                      <p key={p.slice(0, 20)} className="text-[15px] leading-relaxed text-parchment-dim">
                        {p}
                      </p>
                    ))}
                  </div>
                  <p className="mt-6 border-l-2 border-gold-600/50 pl-5 text-sm leading-relaxed text-parchment">
                    {s.note}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------ po co dzisiaj */}
      <section id="dzisiaj" className="scroll-mt-28 py-24 sm:py-32">
        <div className="container-forge">
          <Reveal>
            <p className="eyebrow">Pytanie zasadnicze</p>
            <h2 className="mt-4 max-w-3xl font-display text-[clamp(1.9rem,4.2vw,3.2rem)] leading-[1.05]">
              Po co w XXI wieku <span className="text-forged">kuć miecze?</span>
            </h2>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-parchment-dim">
              Miecz przestał być bronią użytkową jakieś czterysta lat temu, a mimo
              to produkuje się go dziś więcej niż w niejednym stuleciu jego
              świetności. Powodów jest kilka i żaden nie ma związku z walką.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {TODAY.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.08}>
                <article className="panel h-full rounded-2xl p-8">
                  <h3 className="font-display text-xl text-parchment">{t.title}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-parchment-dim">{t.text}</p>
                  <div className="mt-7 border-t border-forge-800 pt-5">
                    <p className="font-display text-2xl text-gold-300">
                      <Counter to={t.stat.v} suffix={t.stat.s} />
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-ash">
                      {t.stat.l}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <blockquote className="mx-auto mt-16 max-w-3xl text-center">
              <p className="font-display text-[clamp(1.2rem,2.6vw,1.9rem)] leading-snug text-parchment">
                „Miecz to jedyne narzędzie, które człowiek wymyślił wyłącznie po to,
                by go używać przeciwko drugiemu człowiekowi. Może dlatego tak
                uporczywie wraca — nie jako broń, ale jako pytanie.”
              </p>
              <footer className="mt-6 text-[10px] uppercase tracking-[0.3em] text-ash">
                Parafraza myśli przypisywanej Ewartowi Oakeshottowi
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------- konfigurator */}
      <section className="pb-24">
        <div className="container-forge">
          <Reveal>
            <p className="eyebrow">Dobór</p>
            <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.9rem,4.2vw,3.2rem)] leading-[1.05]">
              Nie wiesz, od czego zacząć? <span className="text-forged">Trzy pytania.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="mt-12">
            <Chooser />
          </Reveal>
        </div>
      </section>
    </>
  );
}
