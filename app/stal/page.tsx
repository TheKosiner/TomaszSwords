import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/site/PageHeader";
import SteelTable from "@/components/content/SteelTable";
import HeatCurve from "@/components/content/HeatCurve";
import { Reveal } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Stal na miecze — od dymarki po 9260",
  description:
    "Z czego robi się miecze: dymarka, stal zgrzewana, damast, wootz oraz współczesne stale 1060, 1095, EN45, 5160, 9260 i T10. Hartowanie, odpuszczanie, hamon i konserwacja.",
};

const HISTORY = [
  {
    title: "Dymarka",
    period: "do XIV w.",
    text: "Ruda redukowana w piecu szybowym przy temperaturze zbyt niskiej, by żelazo się stopiło. Efektem jest łupka — gąbczasta bryła żelaza wymieszana z żużlem. Kowal musi ją przekuć, złożyć i przekuć ponownie, i tak wielokrotnie, żeby wypchnąć zanieczyszczenia.",
    detail: "Zawartość węgla w takim materiale jest nierówna: jedna część łupki to miękkie żelazo, inna to twarda stal. Cała sztuka średniowiecznego płatnerza polegała na tym, żeby wiedzieć, którą część gdzie umieścić.",
  },
  {
    title: "Stal zgrzewana",
    period: "V–XI w.",
    text: "Znane jako pattern welding. Pręty o różnej zawartości węgla skręca się, zgrzewa i przekuwa w jeden pakiet, a na to dokłada twarde krawędzie tnące. Powstaje sprężysty rdzeń i twarde ostrze — obejście problemu nierównego materiału.",
    detail: "Efektem ubocznym jest charakterystyczny wzór na powierzchni: jodełka, warkocz, słoje. W epoce wikińskiej stał się cechą prestiżową samą w sobie.",
  },
  {
    title: "Damast tyglowy (wootz)",
    period: "od III w.",
    text: "Indyjska i perska technologia: żelazo stapiane w tyglu z materiałem węglonośnym daje jednorodną stal wysokowęglową. Powolne stygnięcie tworzy pasma węglików, które po trawieniu dają słynny wzór.",
    detail: "To nie to samo co damast zgrzewany. Wzór wootzu powstaje w strukturze krystalicznej, nie ze złożenia warstw — dlatego przez stulecia nie umiano go odtworzyć.",
  },
  {
    title: "Stal przemysłowa",
    period: "od XIX w.",
    text: "Proces Bessemera i piec martenowski dają stal o kontrolowanym składzie w ilościach przemysłowych. Po raz pierwszy w historii kowal może zamówić dokładnie taki materiał, jakiego potrzebuje.",
    detail: "Współczesna replika nie jest więc „gorsza” od oryginału — jest zrobiona z materiału, o jakim średniowieczny płatnerz mógł tylko marzyć. Trudność przeniosła się z materiału na geometrię i wyważenie.",
  },
];

const CARE = [
  {
    q: "Jak często oliwić głownię?",
    a: "Raz na 4–8 tygodni przy przechowywaniu w suchym pomieszczeniu, częściej jeśli miecz wisi na ścianie zewnętrznej albo w garażu. Wystarczy cienka warstwa oleju mineralnego lub kamelii rozprowadzona miękką szmatką.",
  },
  {
    q: "Czym usunąć pierwszy nalot rdzy?",
    a: "Drobny nalot schodzi olejem i korkiem albo gumką typu „rust eraser”. Nie używaj papieru ściernego ani wełny stalowej na polerowanej głowni — zostawią rysy głębsze niż sama rdza.",
  },
  {
    q: "Czy trzymać miecz w pochwie?",
    a: "Na dłuższe przechowywanie — nie. Skóra i drewno chłoną wilgoć i trzymają ją przy stali. Do gabloty lepszy jest stojak, a pochwa obok.",
  },
  {
    q: "Odciski palców naprawdę szkodzą?",
    a: "Tak. Pot jest lekko kwaśny i solny — ślad palca potrafi wytrawić matowy odcisk w polerze w ciągu kilku dni. Po każdym pokazie przetrzyj głownię i przejedź olejem.",
  },
  {
    q: "Co z rękojeścią i pochwą?",
    a: "Skórę warto raz na sezon przetrzeć impregnatem na bazie wosku. Nie używaj środków na bazie silikonu — utwardzają skórę i po roku zaczyna pękać przy zgięciach.",
  },
];

export default function StalPage() {
  return (
    <>
      <PageHeader
        eyebrow="Wiedza"
        title="Stal, z której powstaje ostrze"
        lead="Miecz to problem materiałowy zanim stanie się problemem kowalskim. Twardość i sprężystość ciągną w przeciwne strony, a głownia musi mieć jedno i drugie naraz. Poniżej: jak radzono sobie z tym przez dwa tysiąclecia i jak robi się to dziś."
      />

      {/* -------------------------------------------------------- wstęp */}
      <section className="container-forge">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="font-display text-2xl leading-snug text-parchment">
              Wszystko sprowadza się do węgla
            </h2>
            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-parchment-dim">
              <p>
                Czyste żelazo jest miękkie i bezużyteczne na ostrze. Dodaj kilka
                dziesiątych procenta węgla, a materiał zaczyna reagować na obróbkę
                cieplną — daje się zahartować, czyli utrwalić w strukturze twardej
                i drobnoziarnistej.
              </p>
              <p>
                Poniżej ok. 0,3 % węgla stal praktycznie nie hartuje się na twardo.
                Powyżej 1 % robi się krucha i zaczyna pękać przy zginaniu. Miecze
                mieszczą się więc w wąskim oknie 0,45–0,95 %, a każdy gatunek w tym
                zakresie to inna odpowiedź na pytanie: czy ważniejsze jest, żeby
                trzymał ostrze, czy żeby się nie złamał.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="panel rounded-2xl p-7">
              <p className="eyebrow">Zasada</p>
              <p className="mt-4 font-display text-xl leading-snug text-parchment">
                Twardsze ostrze tnie dłużej. Bardziej sprężyste ostrze wraca do
                prostej. Nie da się mieć obu maksimów naraz — miecz zawsze jest
                kompromisem.
              </p>
              <p className="mt-5 text-sm leading-relaxed text-parchment-dim">
                Średniowieczny płatnerz rozwiązywał to konstrukcyjnie: miękki,
                sprężysty rdzeń i zgrzane do niego twarde krawędzie. Współczesny
                warsztat rozwiązuje to składem stopu i precyzyjną obróbką cieplną.
                Cel jest ten sam.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------- historia */}
      <section className="py-24 sm:py-32">
        <div className="container-forge">
          <Reveal>
            <p className="eyebrow">Materiał w czasie</p>
            <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.9rem,4.2vw,3.2rem)] leading-[1.05]">
              Cztery sposoby na <span className="text-forged">dobrą stal</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {HISTORY.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.08}>
                <article className="panel noise h-full rounded-2xl p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-2xl text-parchment">{h.title}</h3>
                    <span className="font-display text-[10px] uppercase tracking-[0.24em] text-gold-600">
                      {h.period}
                    </span>
                  </div>
                  <p className="mt-5 text-[15px] leading-relaxed text-parchment-dim">{h.text}</p>
                  <p className="mt-4 border-l-2 border-forge-600 pl-5 text-sm leading-relaxed text-ash">
                    {h.detail}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- porównywarka */}
      <section className="pb-24 sm:pb-32">
        <div className="container-forge">
          <Reveal>
            <p className="eyebrow">Porównanie</p>
            <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.9rem,4.2vw,3.2rem)] leading-[1.05]">
              Siedem stali, <span className="text-forged">siedem kompromisów</span>
            </h2>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-parchment-dim">
              Rozwiń wiersz, żeby zobaczyć, co dany gatunek robi dobrze, a czego
              po nim nie oczekiwać. Wartości na paskach są względne — służą
              porównaniu gatunków między sobą, nie są wynikiem normy.
            </p>
          </Reveal>
          <Reveal delay={0.12} className="mt-12">
            <SteelTable />
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------- obróbka ciep. */}
      <section className="pb-24 sm:pb-32">
        <div className="container-forge">
          <Reveal>
            <p className="eyebrow">Obróbka cieplna</p>
            <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.9rem,4.2vw,3.2rem)] leading-[1.05]">
              Wykres, który decyduje <span className="text-forged">o wszystkim</span>
            </h2>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-parchment-dim">
              Ta sama sztaba stali może wyjść z warsztatu jako sprężysta głownia
              albo jako szklany pręt, który pęknie przy pierwszym uderzeniu.
              Różnicę robi przebieg temperatury w czasie.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="mt-12">
            <HeatCurve />
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              {
                t: "Hartowanie",
                d: "Powyżej temperatury przemiany (ok. 780–830 °C dla stali węglowych) struktura zmienia się w austenit. Gwałtowne studzenie w oleju zatrzymuje ją jako martenzyt: bardzo twardy i bardzo kruchy.",
              },
              {
                t: "Odpuszczanie",
                d: "Podgrzanie do 180–250 °C częściowo rozładowuje naprężenia w martenzycie. Traci się kilka punktów HRC, zyskuje odporność na pękanie. Bez tego kroku głownia jest bezużyteczna.",
              },
              {
                t: "Hartowanie selektywne",
                d: "Grzbiet pokrywa się warstwą gliny, krawędź zostaje odsłonięta. Chłodzą się w różnym tempie: twarda krawędź, sprężysty grzbiet i widoczna linia hartu — hamon.",
              },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 0.08}>
                <div className="panel h-full rounded-2xl p-7">
                  <h3 className="font-display text-lg text-parchment">{c.t}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-parchment-dim">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- konserwacja */}
      <section className="pb-24" id="konserwacja">
        <div className="container-forge">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <p className="eyebrow">Konserwacja</p>
              <h2 className="mt-4 font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.05]">
                Stal <span className="text-forged">nie wybacza</span> zaniedbania
              </h2>
              <p className="mt-6 text-[15px] leading-relaxed text-parchment-dim">
                Żaden z gatunków używanych na miecze nie jest stalą nierdzewną —
                i to celowo. Nierdzewne stopy są przy tych przekrojach zbyt kruche.
                Cena za wytrzymałość to kilka minut uwagi raz na miesiąc.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="divide-y divide-forge-800 border-y border-forge-800">
                {CARE.map((c) => (
                  <div key={c.q} className="py-6">
                    <dt className="font-display text-base text-parchment">{c.q}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-parchment-dim">{c.a}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-forge">
          <Reveal>
            <div className="panel flex flex-col items-start justify-between gap-6 rounded-3xl p-10 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-display text-2xl text-parchment">
                  Wiesz już, z czego. Zobacz, jak.
                </h2>
                <p className="mt-2 text-sm text-parchment-dim">
                  Pięć etapów od sztaby do gotowej głowni — i odpowiedź, po co
                  w ogóle dziś kuje się miecze.
                </p>
              </div>
              <Link
                href="/rzemioslo"
                className="sheen shrink-0 rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 px-8 py-4 font-display text-[11px] uppercase tracking-[0.28em] text-forge-950"
              >
                Zobacz rzemiosło
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
