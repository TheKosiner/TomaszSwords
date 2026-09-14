import type { Metadata } from "next";
import { Suspense } from "react";
import ShopBrowser from "@/components/shop/ShopBrowser";
import PageHeader from "@/components/site/PageHeader";

export const metadata: Metadata = {
  title: "Zbrojownia — wszystkie miecze",
  description:
    "Miecze jednoręczne, półtoraręczne, dwuręczne, wikińskie, falchiony i sztylety. Filtruj po typie, krawędzi i cenie.",
};

export default function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="Zbrojownia"
        title="Wszystko, co ma ostrze"
        lead="Czternaście pozycji: od sztyletu za sześćset złotych po dwuręczny Zweihänder na sto sześćdziesiąt osiem centymetrów. Każda z pełną specyfikacją — długość, masa, punkt równowagi, gatunek stali."
      />
      <Suspense fallback={<div className="container-forge py-24 text-center text-ash">Ładowanie…</div>}>
        <ShopBrowser />
      </Suspense>
    </>
  );
}
