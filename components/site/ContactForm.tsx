"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const TOPICS = ["Pytanie o produkt", "Zamówienie", "Reklamacja", "Współpraca"];

export function ContactForm() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [sent, setSent] = useState(false);

  return (
    <div className="panel noise relative overflow-hidden rounded-3xl p-8 sm:p-10">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-80 flex-col items-center justify-center gap-5 text-center"
          >
            <span className="grid h-16 w-16 place-items-center rounded-full border border-gold-600/60 text-2xl text-gold-400">
              ✓
            </span>
            <h3 className="font-display text-2xl text-parchment">Wiadomość zapisana</h3>
            <p className="max-w-sm text-sm leading-relaxed text-parchment-dim">
              To wersja demonstracyjna formularza — nic nie zostało jeszcze wysłane
              na serwer. Docelowo odpowiadamy w ciągu jednego dnia roboczego.
            </p>
            <button
              onClick={() => setSent(false)}
              className="text-[10px] uppercase tracking-[0.24em] text-ash transition-colors hover:text-parchment"
            >
              Napisz jeszcze raz
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="space-y-6"
          >
            <div>
              <span className="text-[10px] uppercase tracking-[0.24em] text-ash">Temat</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {TOPICS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTopic(t)}
                    className={[
                      "rounded-full border px-4 py-2 font-display text-[10px] uppercase tracking-[0.2em] transition-all duration-300",
                      topic === t
                        ? "border-gold-500 bg-gold-500/10 text-gold-200"
                        : "border-forge-700 text-parchment-dim hover:border-forge-600",
                    ].join(" ")}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Imię" name="name" />
              <Field label="E-mail" name="email" type="email" />
            </div>

            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.24em] text-ash">Wiadomość</span>
              <textarea
                name="message"
                required
                rows={6}
                className="mt-3 w-full resize-none rounded-2xl border border-forge-600 bg-forge-950/70 px-5 py-4 text-sm text-parchment outline-none transition-colors placeholder:text-ash focus:border-gold-500"
                placeholder="Napisz, czego szukasz — im więcej szczegółów, tym konkretniej odpowiemy."
              />
            </label>

            <button
              type="submit"
              className="sheen w-full rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 py-4 font-display text-[11px] uppercase tracking-[0.3em] text-forge-950"
            >
              Wyślij wiadomość
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.24em] text-ash">{label}</span>
      <input
        type={type}
        name={name}
        required
        className="mt-3 w-full rounded-full border border-forge-600 bg-forge-950/70 px-5 py-3.5 text-sm text-parchment outline-none transition-colors placeholder:text-ash focus:border-gold-500"
      />
    </label>
  );
}

export default ContactForm;
