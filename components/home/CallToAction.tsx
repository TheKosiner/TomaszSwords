"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal } from "@/components/ui/motion";
import Logo from "@/components/site/Logo";

export function CallToAction() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-forge">
        <Reveal>
          <div className="panel noise relative overflow-hidden rounded-3xl px-6 py-16 text-center sm:px-16">
            <Logo className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-auto -translate-x-1/2 -translate-y-1/2 opacity-[0.07]" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(ellipse_at_bottom,rgba(255,107,26,0.2),transparent_70%)]"
            />

            <div className="relative">
              <p className="eyebrow">Herold</p>
              <h2 className="mx-auto mt-4 max-w-2xl font-display text-[clamp(1.8rem,4vw,3rem)] leading-[1.08]">
                Nowe głownie trafiają do zbrojowni
                <br />
                <span className="text-forged">zanim zobaczy je reszta</span>
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-parchment-dim">
                Raz na dwa tygodnie: nowe modele, krótkie teksty o typologii,
                kody rabatowe dla zapisanych. Bez spamu.
              </p>

              <div className="mx-auto mt-10 max-w-md">
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.p
                      key="ok"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-full border border-gold-600/60 px-6 py-4 font-display text-[11px] uppercase tracking-[0.26em] text-gold-300"
                    >
                      Zapisano. Pierwsza wiadomość w drodze.
                    </motion.p>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -12 }}
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (email.includes("@")) setSent(true);
                      }}
                      className="flex flex-col gap-3 sm:flex-row"
                    >
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="twoj@email.pl"
                        aria-label="Adres e-mail"
                        className="w-full rounded-full border border-forge-600 bg-forge-950/70 px-6 py-4 text-sm text-parchment outline-none transition-colors placeholder:text-ash focus:border-gold-500"
                      />
                      <button
                        type="submit"
                        className="sheen shrink-0 rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 px-8 py-4 font-display text-[11px] uppercase tracking-[0.28em] text-forge-950"
                      >
                        Zapisz się
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default CallToAction;
