import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/site/PageHeader";
import Oakeshott from "@/components/content/Oakeshott";
import MythCards from "@/components/content/MythCards";
import { Reveal, Counter } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Historia miecza — od brązu do rekonstrukcji",
  description:
    "Trzy tysiące lat historii miecza: od odlewów z brązu, przez spathę i miecz wikiński, po długi miecz i rapier. Typologia Oakeshotta, słynne głownie i obalone mity.",
};

const ERAS = [
  {
    year: "ok. 1600 p.n.e.",
    title: "Miecz z brązu",
    lead: "Sztylet, który urósł.",
    body: [
      "Pierwsze miecze pojawiają się w epoce brązu na Bliskim Wschodzie i w Europie Egejskiej. Brąz odlewa się łatwo, ale jest miękki i kruchy przy zginaniu — dlatego wczesne głownie są krótkie, rzadko przekraczają 60 cm.",
      "Najstarsze egzemplarze, jak znaleziska z Arslantepe, mają ok. 5000 lat. Były raczej przedmiotami statusu niż narzędziami wojny: rzadkie, kosztowne, składane w grobach.",
    ],
    fact: "Brązowa głownia dłuższa niż 70 cm łamała się przy mocnym uderzeniu — dopiero żelazo zdjęło to ograniczenie.",
  },
  {
    year: "V w. p.n.e. – V w. n.e.",
    title: "Żelazo, gladius, spatha",
    lead: "Rzym standaryzuje broń.",
    body: [
      "Celtowie opanowali kucie długich żelaznych głowni, Rzymianie — produkcję seryjną. Gladius to krótki miecz piechoty do walki w zwartym szyku za tarczą; spatha, dłuższa, należała najpierw do jazdy, a od III wieku wyparła gladiusa także w piechocie.",
      "Spatha jest prostą linią do miecza wikińskiego. Ta sama prosta, obosieczna głownia, ten sam sposób noszenia, to samo przeznaczenie.",
    ],
    fact: "Rzymianie kupowali celtyckie głownie, uznając je za lepsze od własnych — pierwszy udokumentowany import stali w Europie.",
  },
  {
    year: "VIII–XI w.",
    title: "Miecz wikiński",
    lead: "Głownia z kontynentu, oprawa z północy.",
    body: [
      "Szeroka, płaska głownia z szerokim zbroczem, krótki jelec i masywna, często trójdzielna głowica. Konstrukcja optymalizowana pod cięcie z pozycji za tarczą.",
      "Wiele głowni znajdowanych w Skandynawii powstało w warsztatach nadreńskich. Najsłynniejsze noszą inkrustowany napis ULFBERHT — marka, która przetrwała dwa stulecia i doczekała się średniowiecznych podróbek z błędami w pisowni.",
      "Miecz w tej epoce ma imię, rodowód i wartość gospodarstwa. Bywa dziedziczony, bywa składany do grobu, bywa celowo niszczony przed pochówkiem.",
    ],
    fact: "Analizy metalograficzne pokazują, że część głowni ULFBERHT wykonano ze stali tyglowej o zawartości węgla nieosiągalnej w ówczesnych dymarkach europejskich.",
  },
  {
    year: "XI–XIII w.",
    title: "Miecz rycerski",
    lead: "Wydłuża się jelec, rodzi się krzyż.",
    body: [
      "Wraz z rozwojem kolczugi i jazdy kopijniczej miecz zmienia proporcje: jelec rośnie w poprzeczkę chroniącą dłoń, głowica staje się krążkiem, głownia zaczyna się równomiernie zbiegać.",
      "Kształt krzyża nie jest przypadkowy ani wyłącznie funkcjonalny — miecz staje się przedmiotem obrzędu. Pasowanie na rycerza, przysięgi składane na głowicę, relikwie osadzane w pomum.",
      "To okres typów X–XIV w typologii Oakeshotta i czas, w którym miecz z narzędzia staje się symbolem władzy i stanu.",
    ],
    fact: "Szczerbiec, miecz koronacyjny królów Polski, powstał na przełomie XII i XIII wieku — to jedna z nielicznych zachowanych europejskich insygniów tej klasy.",
  },
  {
    year: "XIV–XV w.",
    title: "Długi miecz i zbroja płytowa",
    lead: "Złoty wiek fechtunku.",
    body: [
      "Płyta zmienia wszystko. Cięcie przestaje działać, więc głownia się usztywnia: przekrój rombowy, ostry sztych, mniejsza szerokość. Rękojeść wydłuża się na dwie dłonie.",
      "Powstają traktaty: Fiore dei Liberi we Włoszech, szkoła Johannesa Liechtenauera w Niemczech. Techniki półmiecza, chwyt za głownię, mordschlag — uderzenie głowicą jak młotem. Fechtunek staje się systemem nauczania z terminologią i programem.",
      "To właśnie te traktaty są dziś podstawą HEMA — współczesnej rekonstrukcji europejskich sztuk walki.",
    ],
    fact: "Ręka w rękawicy płytowej mogła bezpiecznie chwycić własną głownię — stąd techniki półmiecza, które wyglądają dziś nieintuicyjnie.",
  },
  {
    year: "XVI w.",
    title: "Dwuręczne kolosy",
    lead: "Specjalizacja zamiast uniwersalności.",
    body: [
      "Zweihänder i szkocki claymore to broń zawodowców. Doppelsöldnerzy — najemnicy na podwójnym żołdzie — używali ich do rozbijania szyków pikinierskich.",
      "Parierhaki i skórzane ricasso pozwalały chwycić broń w połowie długości i operować nią jak krótką włócznią. To moment, w którym miecz przestaje być uniwersalny i staje się narzędziem jednego zadania.",
    ],
    fact: "Zachowane zweihändery ceremonialne bywają dłuższe niż 2 metry — ale bojowe rzadko przekraczały 170 cm i 3 kg.",
  },
  {
    year: "XVI–XVIII w.",
    title: "Rapier, szpada, szabla",
    lead: "Miecz schodzi z pola bitwy.",
    body: [
      "Broń palna kończy epokę zbroi, a wraz z nią epokę ciężkich głowni. Przeciwnikiem nie jest już pancerz, lecz człowiek w kaftanie — liczy się szybkość i zasięg.",
      "Rapier z rozbudowanym koszem rękojeści staje się bronią miejską i pojedynkową. W jeździe króluje szabla, w Polsce rozwinięta w formę husarską i karabelę.",
      "Miecz obosieczny zostaje przy ceremoniale: koronacje, ordery, mundury paradne — i tam trwa do dziś.",
    ],
    fact: "Szabla przetrwała jako broń regulaminowa dłużej niż jakikolwiek inny miecz — w polskiej kawalerii formalnie do 1939 roku.",
  },
  {
    year: "XX–XXI w.",
    title: "Powrót przez badania",
    lead: "Od muzeum do treningu.",
    body: [
      "W 1960 roku Ewart Oakeshott publikuje typologię, która porządkuje europejskie miecze według geometrii głowni. To początek nowoczesnej wiedzy o przedmiocie, wcześniej opisywanym głównie przez romantyczne katalogi.",
      "Od lat 90. rozwija się HEMA: kluby czytają traktaty w oryginale, rekonstruują techniki i testują je w sparingu. Rośnie zapotrzebowanie na broń, która zachowuje się jak oryginał — właściwa masa, właściwy punkt równowagi, właściwa sztywność.",
      "Równolegle działa rekonstrukcja historyczna, kolekcjonerstwo i popkultura. Miecz wrócił — nie jako broń, lecz jako przedmiot badań, sportu i pasji.",
    ],
    fact: "Współczesne repliki bada się dziś tak samo jak zabytki: pomiar punktu równowagi, węzłów drgań i momentu bezwładności to standard w dobrym warsztacie.",
  },
];

const FAMOUS = [
  {
    name: "Szczerbiec",
    where: "Wawel, Kraków",
    text: "Miecz koronacyjny królów Polski, powstały na przełomie XII i XIII wieku. Głownia pierwotnie krótsza, oprawa bogato zdobiona inskrypcjami i emalią.",
  },
  {
    name: "ULFBERHT",
    where: "Europa Północna",
    text: "Nie pojedynczy miecz, lecz seria głowni z inkrustowanym napisem, produkowanych przez ponad dwa stulecia. Pierwsza rozpoznawalna marka zbrojeniowa w historii.",
  },
  {
    name: "Joyeuse",
    where: "Luwr, Paryż",
    text: "Miecz koronacyjny królów Francji, wiązany legendą z Karolem Wielkim. W rzeczywistości złożony z elementów z różnych stuleci — jak większość insygniów.",
  },
  {
    name: "Miecz św. Maurycego",
    where: "Turyn / Wiedeń",
    text: "Dwa różne miecze noszą tę nazwę. Oba używane w ceremoniale cesarskim i oba pokazują, jak szybko broń zamienia się w relikwię.",
  },
];

export default function HistoriaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Wiedza"
        title="Historia miecza"
        lead="Trzy tysiące lat rozwoju jednego pomysłu: kawałka metalu, który ma jednocześnie ciąć, kłuć, przyjmować uderzenia i mieścić się przy pasie. Poniżej najkrótsza możliwa wersja tej historii — bez legend o dziesięciokilogramowych głowniach."
      />

      {/* ------------------------------------------------ liczby wstępne */}
      <section className="container-forge">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-forge-700 bg-forge-700 sm:grid-cols-4">
          {[
            { v: 5000, s: " lat", l: "najstarsze znane miecze" },
            { v: 1.3, s: " kg", l: "typowa masa miecza rycerskiego", d: 1 },
            { v: 13, s: "", l: "typów głowni u Oakeshotta" },
            { v: 700, s: "+", l: "lat dominacji miecza w Europie" },
          ].map((s) => (
            <div key={s.l} className="bg-forge-900 p-6">
              <p className="font-display text-3xl text-forged">
                <Counter to={s.v} suffix={s.s} decimals={s.d ?? 0} />
              </p>
              <p className="mt-2 text-[10px] uppercase leading-tight tracking-[0.2em] text-ash">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------ oś czasu */}
      <section className="py-24 sm:py-32">
        <div className="container-forge">
          <Reveal>
            <p className="eyebrow">Oś czasu</p>
            <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.9rem,4.2vw,3.2rem)] leading-[1.05]">
              Osiem etapów, <span className="text-forged">jedna linia</span>
            </h2>
          </Reveal>

          <div className="relative mt-16">
            <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-forge-700 to-transparent sm:block" />

            {ERAS.map((era, i) => (
              <Reveal key={era.title} delay={0.04 * i} className="relative pb-16 sm:pl-16 last:pb-0">
                <span className="absolute left-0 top-2 hidden h-8 w-8 items-center justify-center rounded-full border border-forge-600 bg-forge-950 font-display text-[10px] text-gold-500 sm:flex">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:gap-12">
                  <div>
                    <p className="font-display text-[10px] uppercase tracking-[0.28em] text-gold-500">
                      {era.year}
                    </p>
                    <h3 className="mt-3 font-display text-2xl leading-tight text-parchment">
                      {era.title}
                    </h3>
                    <p className="mt-2 text-sm italic text-ash">{era.lead}</p>
                  </div>

                  <div>
                    <div className="space-y-4">
                      {era.body.map((p) => (
                        <p key={p.slice(0, 20)} className="text-[15px] leading-relaxed text-parchment-dim">
                          {p}
                        </p>
                      ))}
                    </div>
                    <div className="mt-6 border-l-2 border-gold-600/50 pl-5">
                      <p className="font-display text-[9px] uppercase tracking-[0.3em] text-gold-600">
                        Ciekawostka
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-parchment">{era.fact}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Oakeshott />

      {/* ------------------------------------------------ słynne głownie */}
      <section className="py-24">
        <div className="container-forge">
          <Reveal>
            <p className="eyebrow">Zachowane</p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,4.2vw,3.2rem)] leading-[1.05]">
              Cztery głownie, które <span className="text-forged">przetrwały</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FAMOUS.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.07}>
                <article className="panel noise group h-full rounded-2xl p-7 transition-colors duration-500 hover:border-gold-600/50">
                  <h3 className="font-display text-xl text-parchment">{f.name}</h3>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-gold-600">
                    {f.where}
                  </p>
                  <p className="mt-5 text-sm leading-relaxed text-parchment-dim">{f.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <MythCards />

      {/* ------------------------------------------------------ przejście */}
      <section className="pb-24">
        <div className="container-forge">
          <Reveal>
            <div className="panel flex flex-col items-start justify-between gap-6 rounded-3xl p-10 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-display text-2xl text-parchment">
                  Wiesz już, skąd się wziął. Zobacz, z czego się go robi.
                </h2>
                <p className="mt-2 text-sm text-parchment-dim">
                  Dymarka, stal zgrzewana, damast i współczesne stopy — cała chemia w jednym miejscu.
                </p>
              </div>
              <Link
                href="/stal"
                className="sheen shrink-0 rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 px-8 py-4 font-display text-[11px] uppercase tracking-[0.28em] text-forge-950"
              >
                Przejdź do stali
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
