"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { useCart } from "@/lib/cart";
import { Logo } from "./Logo";

const NAV = [
  { href: "/sklep", label: "Zbrojownia" },
  { href: "/#anatomia", label: "Anatomia" },
  { href: "/historia", label: "Historia" },
  { href: "/stal", label: "Stal" },
  { href: "/rzemioslo", label: "Rzemiosło" },
  { href: "/o-nas", label: "O nas" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { count, open } = useCart();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-forge-700/70 bg-forge-950/95 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        ].join(" ")}
      >
        <div className="container-forge flex h-[var(--nav-h)] items-center justify-between gap-6">
          <Link href="/" className="group flex items-center gap-3" aria-label="Tomasz Swords — strona główna">
            <Logo priority className="h-14 w-auto shrink-0 transition-transform duration-700 group-hover:scale-105" />
            <span className="leading-none">
              <span className="block font-display text-[15px] uppercase tracking-[0.34em] text-parchment">
                Tomasz
              </span>
              <span className="block font-display text-[10px] uppercase tracking-[0.52em] text-gold-500">
                Swords
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const active = item.href.includes("#")
                ? false
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative px-4 py-2 font-display text-[11px] uppercase tracking-[0.26em] text-parchment-dim transition-colors hover:text-parchment"
                >
                  {item.label}
                  <span
                    className={[
                      "absolute inset-x-3 -bottom-0.5 h-px origin-left bg-gradient-to-r from-gold-600 via-gold-400 to-transparent transition-transform duration-500",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    ].join(" ")}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={open}
              className="group relative flex items-center gap-2.5 rounded-full border border-forge-600 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-parchment-dim transition-colors hover:border-gold-600 hover:text-gold-300"
              aria-label={`Koszyk, ${count} pozycji`}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 7h16l-1.4 11.2a2 2 0 0 1-2 1.8H7.4a2 2 0 0 1-2-1.8L4 7Z" />
                <path d="M9 7V5.5a3 3 0 0 1 6 0V7" />
              </svg>
              <span className="hidden sm:inline">Koszyk</span>
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-gold-500 px-1 text-[10px] font-semibold text-forge-950"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full border border-forge-600 text-parchment-dim transition-colors hover:border-gold-600 hover:text-gold-300 lg:hidden"
              aria-label="Otwórz menu"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-forge-950/97 backdrop-blur-xl lg:hidden"
          >
            <div className="container-forge flex h-[var(--nav-h)] items-center justify-end">
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-forge-600 text-parchment"
                aria-label="Zamknij menu"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
            <nav className="container-forge mt-8 flex flex-col">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    className="block border-b border-forge-800 py-5 font-display text-2xl uppercase tracking-[0.18em] text-parchment"
                  >
                    <span className="mr-4 text-xs text-gold-600">0{i + 1}</span>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
