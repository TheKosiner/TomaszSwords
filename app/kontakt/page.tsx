import type { Metadata } from "next";
import PageHeader from "@/components/site/PageHeader";
import ContactForm from "@/components/site/ContactForm";
import { Reveal } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Kontakt, wysyłka i stan prawny",
  description:
    "Napisz do nas, sprawdź zasady wysyłki i zwrotów oraz to, jak wygląda w Polsce stan prawny replik mieczy.",
};

const DETAILS = [
  { label: "E-mail", value: "kontakt@tomaszswords.pl" },
  { label: "Telefon", value: "+48 500 000 000" },
  { label: "Godziny", value: "pn.–pt., 9:00–17:00" },
  { label: "Odpowiedź", value: "do 1 dnia roboczego" },
];

const SHIPPING = [
  {
    t: "Czas wysyłki",
    d: "48 godzin roboczych od zaksięgowania wpłaty. Przy produktach oznaczonych „na zamówienie” termin podajemy indywidualnie w potwierdzeniu.",
  },
  {
    t: "Koszt",
    d: "Kurier z ubezpieczeniem: 29 zł. Zamówienia powyżej 2000 zł — dostawa gratis. Przesyłki powyżej 140 cm (miecze dwuręczne) wyceniamy indywidualnie.",
  },
  {
    t: "Pakowanie",
    d: "Sztywny karton, pianka profilowana pod kształt głowni, pochwa pakowana osobno. Do każdej przesyłki dołączamy kartę pomiarową egzemplarza.",
  },
  {
    t: "Zwroty",
    d: "30 dni bez podania przyczyny. Warunek: broń nieużywana, w komplecie, z nienaruszoną warstwą oleju ochronnego. Koszt przesyłki zwrotnej po stronie kupującego.",
  },
  {
    t: "Reklamacje",
    d: "2 lata gwarancji na wady materiałowe głowni i oprawy. Nie obejmuje ona korozji wynikającej z braku konserwacji ani uszkodzeń po kontakcie z twardymi celami.",
  },
];

export default function KontaktPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kontakt"
        title="Napisz, zanim kupisz"
        lead="Lepiej odpowiedzieć na pięć pytań przed zamówieniem niż przyjąć jeden zwrot. Jeśli wahasz się między dwoma modelami albo nie wiesz, czy dany egzemplarz nadaje się do tego, co planujesz — po prostu zapytaj."
      />

      <section className="container-forge">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.12}>
            <div className="space-y-10">
              <dl className="divide-y divide-forge-800 border-y border-forge-800">
                {DETAILS.map((d) => (
                  <div key={d.label} className="flex items-baseline justify-between gap-6 py-4">
                    <dt className="text-[10px] uppercase tracking-[0.22em] text-ash">{d.label}</dt>
                    <dd className="text-sm text-parchment">{d.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="panel rounded-2xl p-7">
                <p className="eyebrow">Najczęstsze pytanie</p>
                <p className="mt-4 font-display text-lg leading-snug text-parchment">
                  „Czy ten miecz nadaje się do sparingu?”
                </p>
                <p className="mt-4 text-sm leading-relaxed text-parchment-dim">
                  Jeśli w opisie widnieje „krawędź tępa — wersja dekoracyjna”, to
                  nie. Do kontaktu przeznaczone są wyłącznie pozycje opisane jako
                  treningowe, o krawędzi min. 2 mm i zaokrąglonym sztychu — i nawet
                  one wymagają pełnego sprzętu ochronnego.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="wysylka" className="scroll-mt-28 py-24 sm:py-32">
        <div className="container-forge">
          <Reveal>
            <p className="eyebrow">Logistyka</p>
            <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.9rem,4.2vw,3.2rem)] leading-[1.05]">
              Wysyłka, zwroty <span className="text-forged">i reklamacje</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-forge-700 bg-forge-700 sm:grid-cols-2 lg:grid-cols-3">
            {SHIPPING.map((s) => (
              <div key={s.t} className="bg-forge-900 p-8">
                <h3 className="font-display text-lg text-parchment">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-parchment-dim">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="prawo" className="scroll-mt-28 pb-24">
        <div className="container-forge">
          <Reveal>
            <div className="panel rounded-3xl p-8 sm:p-12">
              <p className="eyebrow">Stan prawny</p>
              <h2 className="mt-4 max-w-3xl font-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[1.08]">
                Miecz w Polsce — co wolno, a czego lepiej nie robić
              </h2>

              <div className="mt-8 grid gap-8 lg:grid-cols-2">
                <div className="space-y-4 text-[15px] leading-relaxed text-parchment-dim">
                  <p>
                    Polska ustawa o broni i amunicji wymienia jako „broń białą”
                    zamknięty katalog przedmiotów: ostrza ukryte w przedmiotach
                    niemających wyglądu broni, kastety, nunczaki oraz pałki
                    z ciężkim zakończeniem lub imitujące kij bejsbolowy. Miecz —
                    również ostry — w tym katalogu się nie znajduje, więc jego
                    posiadanie nie wymaga pozwolenia.
                  </p>
                  <p>
                    To jednak nie znaczy, że można z nim robić wszystko. Noszenie
                    miecza w miejscu publicznym może zostać zakwalifikowane jako
                    wykroczenie, a w trakcie imprez masowych obowiązuje wprost
                    zakaz wnoszenia przedmiotów niebezpiecznych.
                  </p>
                </div>

                <ul className="space-y-3.5 text-sm text-parchment-dim">
                  {[
                    "Sprzedajemy wyłącznie osobom, które ukończyły 18 lat.",
                    "Przewóz: w pochwie, zapakowany, w bagażniku — nigdy w kabinie pasażerskiej „pod ręką”.",
                    "Na pokazach i festynach obowiązują regulaminy organizatora, zwykle surowsze niż przepisy ogólne.",
                    "Do sparingu wyłącznie sprzęt treningowy i pełna ochrona: maska, rękawice, ochraniacze.",
                    "Za granicą przepisy bywają zupełnie inne — przed wyjazdem sprawdź prawo kraju docelowego.",
                  ].map((t) => (
                    <li key={t} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold-500" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-10 border-t border-forge-800 pt-6 text-xs leading-relaxed text-ash">
                Powyższe to informacja porządkowa, a nie porada prawna. Stan
                prawny opisujemy według naszej najlepszej wiedzy — w razie
                wątpliwości skonsultuj się z prawnikiem lub sprawdź aktualne
                brzmienie przepisów.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
