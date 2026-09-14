import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import CartDrawer from "@/components/site/CartDrawer";
import Embers from "@/components/site/Embers";
import { ScrollProgress } from "@/components/ui/motion";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tomasz Swords — miecze średniowieczne, repliki i akcesoria",
    template: "%s · Tomasz Swords",
  },
  description:
    "Miecze średniowieczne dla kolekcjonerów i rekonstruktorów: jednoręczne, półtoraręczne, dwuręczne, falchiony i sztylety. Stal sprężynowa i węglowa, pełne specyfikacje, wiedza o historii i rzemiośle.",
  keywords: [
    "miecze średniowieczne",
    "repliki mieczy",
    "miecz rycerski",
    "długi miecz",
    "miecz wikiński",
    "HEMA",
    "rekonstrukcja historyczna",
  ],
  openGraph: {
    type: "website",
    locale: "pl_PL",
    title: "Tomasz Swords — miecze średniowieczne",
    description:
      "Zbrojownia z mieczami średniowiecznymi. Specyfikacje, historia, stale i rzemiosło.",
    siteName: "Tomasz Swords",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pl"
      className={`${cinzel.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <ScrollProgress />
          <Embers />
          <Header />
          <main className="relative z-10 flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
