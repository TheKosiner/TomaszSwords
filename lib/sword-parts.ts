/**
 * Opisy części miecza — jedno źródło dla etykiet w scenie 3D
 * i dla kart wyświetlanych pod sceną na wąskich ekranach.
 */
export type SwordPart = {
  id: string;
  title: string;
  /** krótki podpis do listy przy scenie */
  note: string;
  /** pełny opis w etykiecie i na karcie */
  desc: string;
};

export const SWORD_PARTS: SwordPart[] = [
  {
    id: "glowica",
    title: "Głowica",
    note: "przeciwwaga",
    desc: "Przeciwwaga przesuwająca punkt równowagi do dłoni. Bez niej miecz ciągnąłby rękę w przód.",
  },
  {
    id: "rekojesc",
    title: "Rękojeść",
    note: "drewno + skóra",
    desc: "Drewniany rdzeń kryty skórą i owinięty rzemieniem — chwyt nie ślizga się w dłoni.",
  },
  {
    id: "trzpien",
    title: "Trzpień",
    note: "rdzeń konstrukcji",
    desc: "Przedłużenie głowni biegnące przez całą rękojeść, nitowane na głowicy.",
  },
  {
    id: "jelec",
    title: "Jelec",
    note: "ochrona dłoni",
    desc: "Chroni dłoń i pozwala wiązać broń przeciwnika. Przekrój ósemkowy, ramiona przewężone.",
  },
  {
    id: "glownia",
    title: "Głownia",
    note: "stal sprężynowa",
    desc: "Hartowana stal sprężynowa. Zbrocze odbiera masę ze środka, zostawiając sztywność przy krawędziach.",
  },
  {
    id: "pochwa",
    title: "Pochwa",
    note: "rdzeń drewniany",
    desc: "Drewniany rdzeń kryty skórą, stalowy trzewik i pas zawiesia z okuciami.",
  },
];

export const PART = Object.fromEntries(
  SWORD_PARTS.map((p) => [p.id, p]),
) as Record<string, SwordPart>;
