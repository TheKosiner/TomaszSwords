import type { Metadata } from "next";
import PageHeader from "@/components/site/PageHeader";
import CartPage from "@/components/shop/CartPage";

export const metadata: Metadata = {
  title: "Koszyk",
  description: "Podsumowanie zamówienia, wybór dostawy i kod rabatowy.",
};

export default function KoszykPage() {
  return (
    <>
      <PageHeader
        eyebrow="Zamówienie"
        title="Koszyk"
        lead="Sprawdź, co zabierasz ze zbrojowni. Przy zamówieniu powyżej 2000 zł dostawa jest po naszej stronie."
      />
      <CartPage />
    </>
  );
}
