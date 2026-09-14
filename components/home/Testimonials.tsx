"use client";

import { Reveal } from "@/components/ui/motion";

const OPINIONS = [
  {
    text: "Zamawiałem „Akkę” na prezent. Wyważenie zaskakujące — spodziewałem się kloca, dostałem broń, która sama prowadzi rękę.",
    author: "Marcin K.",
    role: "kolekcjoner",
  },
  {
    text: "Biorę udział w rekonstrukcji od ośmiu lat. Okucia mosiężne w „Jarlu” wyglądają lepiej niż w większości tego, co widuję na obozach.",
    author: "Ola W.",
    role: "grupa rekonstrukcyjna",
  },
  {
    text: "Opis techniczny się zgadza co do grama. Rzadkość w tej branży.",
    author: "Paweł R.",
    role: "instruktor HEMA",
  },
  {
    text: "Pochwa dopracowana, nic nie klekocze, skóra pachnie skórą. Za tę cenę nie liczyłem na taki poziom.",
    author: "Tomek B.",
    role: "klient",
  },
  {
    text: "Wisi nad kominkiem i robi dokładnie to, po co go kupiłem: każdy gość pyta.",
    author: "Janusz M.",
    role: "klient",
  },
];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="container-forge">
        <Reveal>
          <p className="eyebrow text-center">Opinie</p>
          <h2 className="mt-4 text-center font-display text-[clamp(1.6rem,3.4vw,2.6rem)]">
            Co mówią ci, którzy <span className="text-forged">już trzymali</span>
          </h2>
        </Reveal>
      </div>

      <div className="relative mt-14">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-forge-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-forge-950 to-transparent" />
        <div className="flex overflow-hidden">
          {[0, 1].map((copy) => (
            <div key={copy} className="marquee-track flex shrink-0 gap-6 pr-6" aria-hidden={copy === 1}>
              {OPINIONS.map((o) => (
                <figure
                  key={o.author + copy}
                  className="panel w-[320px] shrink-0 rounded-2xl p-6 sm:w-[380px]"
                >
                  <div className="flex gap-1 text-gold-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-xs">★</span>
                    ))}
                  </div>
                  <blockquote className="mt-4 text-[15px] leading-relaxed text-parchment">
                    „{o.text}”
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-forge-800 pt-4">
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-forge-600 font-display text-xs text-gold-400">
                      {o.author[0]}
                    </span>
                    <span>
                      <span className="block text-sm text-parchment">{o.author}</span>
                      <span className="block text-[10px] uppercase tracking-[0.2em] text-ash">
                        {o.role}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
