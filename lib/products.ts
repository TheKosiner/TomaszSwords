export type Category =
  | "jednoreczne"
  | "poltoraraczne"
  | "dwureczne"
  | "wczesnosredniowieczne"
  | "krzywe"
  | "sztylety";

export type Edge = "tepa" | "ostra" | "treningowa";

export type SwordArt = {
  blade: "taper" | "leaf" | "broad" | "curved" | "narrow" | "falchion";
  guard: "straight" | "flared" | "curved" | "sloped" | "ring" | "short";
  pommel: "wheel" | "brazil" | "scent" | "pear" | "lobed" | "disc";
  grip: string;
  fitting: "silver" | "brass" | "blued" | "antique";
  /** długość w jednostkach rysunku – steruje proporcją głowni */
  ratio: number;
};

export type Product = {
  slug: string;
  name: string;
  subtitle: string;
  category: Category;
  era: string;
  oakeshott?: string;
  price: number;
  compareAt?: number;
  badge?: "Bestseller" | "Nowość" | "Ostatnie sztuki" | "Edycja limitowana";
  rating: number;
  reviews: number;
  stock: number;
  edge: Edge;
  steel: string;
  hardness: string;
  specs: { label: string; value: string }[];
  summary: string;
  story: string[];
  highlights: string[];
  art: SwordArt;
};

export const CATEGORIES: { id: Category; name: string; blurb: string }[] = [
  { id: "wczesnosredniowieczne", name: "Wczesne średniowiecze", blurb: "Miecze wikińskie i karolińskie, VIII–XI w." },
  { id: "jednoreczne", name: "Jednoręczne", blurb: "Miecze rycerskie do walki z tarczą, XI–XIV w." },
  { id: "poltoraraczne", name: "Półtoraręczne", blurb: "Bastardy i długie miecze, XIV–XVI w." },
  { id: "dwureczne", name: "Dwuręczne", blurb: "Zweihändery i claymore'y, XV–XVI w." },
  { id: "krzywe", name: "Krzywe i tasaki", blurb: "Falchiony, kordy, wczesne szable." },
  { id: "sztylety", name: "Sztylety i akcesoria", blurb: "Misericordia, rondele, stojaki, pochwy." },
];

export const PRODUCTS: Product[] = [
  {
    slug: "miecz-templariusza-acre",
    name: "Miecz Templariusza „Akka”",
    subtitle: "Jednoręczny miecz krzyżowy z pochwą",
    category: "jednoreczne",
    era: "XIII wiek",
    oakeshott: "Typ XII",
    price: 1890,
    compareAt: 2290,
    badge: "Bestseller",
    rating: 4.9,
    reviews: 128,
    stock: 7,
    edge: "tepa",
    steel: "EN45 (stal sprężynowa)",
    hardness: "50–52 HRC",
    specs: [
      { label: "Długość całkowita", value: "97 cm" },
      { label: "Długość głowni", value: "81 cm" },
      { label: "Szerokość przy jelcu", value: "4,8 cm" },
      { label: "Masa", value: "1,28 kg" },
      { label: "Punkt równowagi", value: "12 cm od jelca" },
      { label: "Rękojeść", value: "Drewno + skóra bydlęca" },
    ],
    summary:
      "Klasyczny miecz rycerski w typie XII: szeroka, równomiernie zbieżna głownia z płytkim zbroczem, prosty jelec z motywem krzyża i ciężka głowica krążkowa.",
    story: [
      "To archetyp miecza, który większość z nas ma przed oczami, myśląc „miecz rycerski”. Głownia typu XII zbiega się łagodnie na całej długości, a zbrocze sięga mniej więcej dwóch trzecich ostrza — dokładnie tak, jak w egzemplarzach datowanych na XII–XIII wiek.",
      "Jelec wykończono motywem krzyża maltańskiego, a głowicę — krążek z rytem krzyża — dobrano tak, by przesunąć środek ciężkości bliżej dłoni. Efekt jest odczuwalny od pierwszego machnięcia: miecz prowadzi się nadgarstkiem, nie ramieniem.",
      "Zestaw zawiera pochwę z drewnianym rdzeniem krytym skórą, stalowy trzewik i pas zawiesia z mosiężnymi okuciami.",
    ],
    highlights: [
      "Hartowana głownia ze stali sprężynowej EN45",
      "Pochwa z drewnianym rdzeniem i pasem zawiesia w zestawie",
      "Tęp o grubości 2 mm — wersja dekoracyjna i pokazowa",
      "Trzpień przechodzący przez całą rękojeść, nitowany na zimno",
    ],
    art: { blade: "taper", guard: "straight", pommel: "wheel", grip: "#5d2f22", fitting: "silver", ratio: 1 },
  },
  {
    slug: "dlugi-miecz-czarny-wilk",
    name: "Długi miecz „Czarny Wilk”",
    subtitle: "Półtoraręczny bastard z woronowaną głownią",
    category: "poltoraraczne",
    era: "XV wiek",
    oakeshott: "Typ XVIIIb",
    price: 2450,
    badge: "Nowość",
    rating: 4.8,
    reviews: 64,
    stock: 4,
    edge: "tepa",
    steel: "9260 (stal krzemowo-manganowa)",
    hardness: "52–54 HRC",
    specs: [
      { label: "Długość całkowita", value: "122 cm" },
      { label: "Długość głowni", value: "94 cm" },
      { label: "Szerokość przy jelcu", value: "4,4 cm" },
      { label: "Masa", value: "1,52 kg" },
      { label: "Punkt równowagi", value: "9 cm od jelca" },
      { label: "Rękojeść", value: "Rzemień skórzany na drewnie" },
    ],
    summary:
      "Smukły długi miecz o soczewkowym przekroju i ostro zbieżnym sztychu — konstrukcja pomyślana do walki przeciw zbroi płytowej.",
    story: [
      "Typ XVIIIb to odpowiedź płatnerzy na rozwój zbroi płytowej w XV wieku. Zamiast szerokiej, tnącej głowni dostajemy klin: sztywny, ostro zbieżny, zoptymalizowany pod kłucie w szczeliny pancerza.",
      "Głownia jest woronowana na głęboką czerń, przez co krawędzie odbijają światło jak srebrna nitka. Rękojeść owinięto rzemieniem w podwójny splot i zakończono głowicą w kształcie ściętego stożka.",
    ],
    highlights: [
      "Woronowana powierzchnia — mniejsza podatność na korozję",
      "Sprężysta stal 9260, tolerująca kontakt w sparingu pokazowym",
      "Długa rękojeść: pełny chwyt dwiema dłońmi",
      "Waga rozłożona pod dłonią — zaskakująco zwinny jak na 122 cm",
    ],
    art: { blade: "narrow", guard: "sloped", pommel: "scent", grip: "#241c19", fitting: "blued", ratio: 1.22 },
  },
  {
    slug: "miecz-wikinski-jarl",
    name: "Miecz wikiński „Jarl”",
    subtitle: "Głownia karolińska z dzielonym zbroczem",
    category: "wczesnosredniowieczne",
    era: "IX–X wiek",
    oakeshott: "Petersen typ H",
    price: 1690,
    rating: 4.7,
    reviews: 91,
    stock: 6,
    edge: "tepa",
    steel: "1065 (stal węglowa)",
    hardness: "50–52 HRC",
    specs: [
      { label: "Długość całkowita", value: "91 cm" },
      { label: "Długość głowni", value: "76 cm" },
      { label: "Szerokość przy jelcu", value: "5,4 cm" },
      { label: "Masa", value: "1,19 kg" },
      { label: "Punkt równowagi", value: "14 cm od jelca" },
      { label: "Rękojeść", value: "Jesion + skóra, okucia mosiężne" },
    ],
    summary:
      "Szeroka, niemal równoległa głownia z szerokim zbroczem i charakterystyczna, trójdzielna głowica — kanon uzbrojenia epoki wikingów.",
    story: [
      "Miecze z tego okresu ważą mniej, niż podpowiada wyobraźnia. Szerokie zbrocze odbiera masę ze środka głowni, zostawiając sztywność tam, gdzie jest potrzebna — przy krawędziach.",
      "Krótki jelec i masywna, guzowata głowica to nie ozdoba, lecz przeciwwaga: bez niej miecz z takim ostrzem ciągnąłby dłoń do przodu.",
      "Okucia wykonano z mosiądzu i wykończono ręcznie, z drobnym rytem plecionki inspirowanym stylem Borre.",
    ],
    highlights: [
      "Rekonstrukcja na podstawie typologii Petersena",
      "Mosiężne okucia z motywem plecionki",
      "Szerokie zbrocze — realistyczny rozkład masy",
      "Idealny na rekonstrukcję historyczną i do gabloty",
    ],
    art: { blade: "broad", guard: "short", pommel: "lobed", grip: "#6b4a2a", fitting: "brass", ratio: 0.92 },
  },
  {
    slug: "zweihander-landsknecht",
    name: "Zweihänder „Landsknecht”",
    subtitle: "Miecz dwuręczny z parierhakenami",
    category: "dwureczne",
    era: "XVI wiek",
    price: 4290,
    badge: "Edycja limitowana",
    rating: 5,
    reviews: 22,
    stock: 2,
    edge: "tepa",
    steel: "1075 (stal węglowa)",
    hardness: "50–52 HRC",
    specs: [
      { label: "Długość całkowita", value: "168 cm" },
      { label: "Długość głowni", value: "122 cm" },
      { label: "Szerokość przy jelcu", value: "5,2 cm" },
      { label: "Masa", value: "2,85 kg" },
      { label: "Punkt równowagi", value: "16 cm od jelca" },
      { label: "Rękojeść", value: "Dwuwarstwowa skóra, owijka drutem" },
    ],
    summary:
      "Ponad półtora metra stali: wygięte ramiona jelca, skórzane ricasso i parierhaki oddzielające część chwytową od ostrza właściwego.",
    story: [
      "Zweihänder nie był bronią pojedynkową — to narzędzie formacji. Doppelsöldnerzy używali go do rozrywania szeregów pikinierów, chwytając miecz za ricasso jak krótką włócznię.",
      "Skórzana okładzina ricasso i para parierhaków pozwalają bezpiecznie przenieść dłoń na głownię. To rozwiązanie, które w praktyce zamienia miecz w broń drzewcową.",
      "Egzemplarz jest wyważony niżej, niż sugeruje rozmiar — w rękach zachowuje się przewidywalnie, choć wymaga miejsca.",
    ],
    highlights: [
      "168 cm długości całkowitej — element dominujący w każdym wnętrzu",
      "Parierhaki i skórzane ricasso",
      "Dostarczany z certyfikatem i stojakiem ściennym",
      "Produkcja limitowana — 25 sztuk w serii",
    ],
    art: { blade: "taper", guard: "curved", pommel: "pear", grip: "#3a2b21", fitting: "antique", ratio: 1.55 },
  },
  {
    slug: "falchion-kupiecki",
    name: "Falchion „Kupiecki”",
    subtitle: "Jednosieczny tasak o ciężkim sztychu",
    category: "krzywe",
    era: "XIV wiek",
    price: 1280,
    rating: 4.6,
    reviews: 47,
    stock: 9,
    edge: "tepa",
    steel: "1060 (stal węglowa)",
    hardness: "48–50 HRC",
    specs: [
      { label: "Długość całkowita", value: "84 cm" },
      { label: "Długość głowni", value: "68 cm" },
      { label: "Szerokość maksymalna", value: "6,6 cm" },
      { label: "Masa", value: "1,34 kg" },
      { label: "Punkt równowagi", value: "17 cm od jelca" },
      { label: "Rękojeść", value: "Orzech + skóra" },
    ],
    summary:
      "Krótki, jednosieczny i celowo przeciążony ku przodowi — falchion tnie masą, nie prędkością.",
    story: [
      "Falchiony bywają w ikonografii bronią mieszczan i piechoty. Ich sylwetka — poszerzająca się ku sztychowi głownia — przypomina raczej tasak niż miecz i taki też ma charakter pracy.",
      "Przesunięty do przodu środek ciężkości sprawia, że cięcie „samo idzie”. To broń dla kogoś, kto lubi, gdy narzędzie ma wyczuwalny ciężar.",
    ],
    highlights: [
      "Wyraźnie przednie wyważenie — charakterystyczne dla typu",
      "Jednosieczna głownia z pogrubionym grzbietem",
      "Prosty, solidny jelec z zaczepem",
      "Dobry pierwszy zakup do kolekcji",
    ],
    art: { blade: "falchion", guard: "straight", pommel: "disc", grip: "#4a3524", fitting: "antique", ratio: 0.85 },
  },
  {
    slug: "miecz-jednoreczny-kasztelan",
    name: "Miecz „Kasztelan”",
    subtitle: "Jednoręczny miecz z głowicą brazil-nut",
    category: "jednoreczne",
    era: "XI–XII wiek",
    oakeshott: "Typ X",
    price: 1490,
    rating: 4.7,
    reviews: 73,
    stock: 11,
    edge: "tepa",
    steel: "1065 (stal węglowa)",
    hardness: "50–52 HRC",
    specs: [
      { label: "Długość całkowita", value: "94 cm" },
      { label: "Długość głowni", value: "78 cm" },
      { label: "Szerokość przy jelcu", value: "5,1 cm" },
      { label: "Masa", value: "1,22 kg" },
      { label: "Punkt równowagi", value: "13 cm od jelca" },
      { label: "Rękojeść", value: "Buk + skóra, okucia stalowe" },
    ],
    summary:
      "Przejście między mieczem wikińskim a rycerskim: szeroka głownia typu X, długi prosty jelec i głowica w kształcie orzecha brazylijskiego.",
    story: [
      "Typ X to broń pierwszych wypraw krzyżowych. Głownia jest jeszcze szeroka i płaska, ale jelec wydłużył się już na tyle, by chronić dłoń — to detal, który zmienił sposób fechtunku na kolejne stulecia.",
      "Głowica brazil-nut daje pewny, „pełny” chwyt i naturalnie blokuje nadgarstek przy cięciu z góry.",
    ],
    highlights: [
      "Wierna typologia Oakeshotta — typ X",
      "Szerokie zbrocze na 2/3 długości głowni",
      "Stalowe okucia wykończone na satynę",
      "Wersja dostępna również z ostrą krawędzią (na zamówienie)",
    ],
    art: { blade: "broad", guard: "straight", pommel: "brazil", grip: "#523325", fitting: "silver", ratio: 0.96 },
  },
  {
    slug: "miecz-poltoraraczny-bialy-kruk",
    name: "Półtoraręczny „Biały Kruk”",
    subtitle: "Długi miecz z jelcem tarczowym",
    category: "poltoraraczne",
    era: "XV wiek",
    oakeshott: "Typ XVa",
    price: 2790,
    rating: 4.9,
    reviews: 38,
    stock: 3,
    edge: "treningowa",
    steel: "5160 (stal sprężynowa)",
    hardness: "52–54 HRC",
    specs: [
      { label: "Długość całkowita", value: "126 cm" },
      { label: "Długość głowni", value: "97 cm" },
      { label: "Szerokość przy jelcu", value: "4,2 cm" },
      { label: "Masa", value: "1,58 kg" },
      { label: "Punkt równowagi", value: "8 cm od jelca" },
      { label: "Rękojeść", value: "Skóra bydlęca, owijka drutem mosiężnym" },
    ],
    summary:
      "Wersja z krawędzią treningową o grubości 2,5 mm i zaokrąglonym sztychem — przygotowana pod kontakt w HEMA.",
    story: [
      "Typ XV ma przekrój rombowy: sztywność zamiast szerokości. Taka głownia nie „faluje” przy pchnięciu i zachowuje geometrię nawet po serii mocnych wiązań.",
      "Krawędź o grubości 2,5 mm, zaokrąglony sztych i sprężysta stal 5160 to zestaw, którego oczekuje się od sprzętu sparingowego. Nadal jednak jest to broń — wymaga sprzętu ochronnego i nadzoru instruktora.",
    ],
    highlights: [
      "Krawędź treningowa 2,5 mm i zaokrąglony sztych",
      "Sprężysta stal 5160 — dobra odporność na odkształcenia",
      "Owijka drutem mosiężnym dla pewnego chwytu",
      "Rekomendowany do treningu HEMA pod okiem instruktora",
    ],
    art: { blade: "narrow", guard: "flared", pommel: "scent", grip: "#2f2622", fitting: "silver", ratio: 1.28 },
  },
  {
    slug: "claymore-highland",
    name: "Claymore „Highland”",
    subtitle: "Szkocki miecz dwuręczny",
    category: "dwureczne",
    era: "XVI wiek",
    price: 3390,
    rating: 4.8,
    reviews: 29,
    stock: 3,
    edge: "tepa",
    steel: "1075 (stal węglowa)",
    hardness: "50–52 HRC",
    specs: [
      { label: "Długość całkowita", value: "138 cm" },
      { label: "Długość głowni", value: "104 cm" },
      { label: "Szerokość przy jelcu", value: "4,6 cm" },
      { label: "Masa", value: "2,35 kg" },
      { label: "Punkt równowagi", value: "14 cm od jelca" },
      { label: "Rękojeść", value: "Dąb kryty skórą" },
    ],
    summary:
      "Rozpoznawalny po jelcu opadającym ku głowni i zakończonym czterolistnymi koniczynkami.",
    story: [
      "Claidheamh-mòr — „wielki miecz” — to broń szkockich klanów. Charakterystyczne, skośne ramiona jelca z quatrefoil na końcach służyły do przechwytywania broni przeciwnika.",
      "Mimo długości claymore jest wyważony niżej niż kontynentalne zweihändery i prowadzi się go zaskakująco naturalnie.",
    ],
    highlights: [
      "Jelec z koniczynkami — znak rozpoznawczy typu",
      "Dębowa rękojeść kryta skórą",
      "Dostarczany z certyfikatem autentyczności typologii",
      "Świetnie wygląda w pionowej ekspozycji",
    ],
    art: { blade: "taper", guard: "sloped", pommel: "wheel", grip: "#43302a", fitting: "antique", ratio: 1.42 },
  },
  {
    slug: "kord-messer-mistrza",
    name: "Kord „Messer”",
    subtitle: "Jednosieczny messer z nagelem",
    category: "krzywe",
    era: "XV wiek",
    price: 1150,
    rating: 4.5,
    reviews: 56,
    stock: 12,
    edge: "tepa",
    steel: "1060 (stal węglowa)",
    hardness: "48–50 HRC",
    specs: [
      { label: "Długość całkowita", value: "88 cm" },
      { label: "Długość głowni", value: "70 cm" },
      { label: "Szerokość przy jelcu", value: "3,8 cm" },
      { label: "Masa", value: "1,05 kg" },
      { label: "Punkt równowagi", value: "11 cm od jelca" },
      { label: "Rękojeść", value: "Okładziny drewniane nitowane" },
    ],
    summary:
      "Formalnie „duży nóż”, praktycznie — miecz. Rękojeść nożowa z nitowanymi okładzinami i stalowy nagel chroniący dłoń.",
    story: [
      "Messer powstał z prawnej ekwilibrystyki: w wielu miastach mieszczanom nie wolno było nosić miecza, ale nóż — owszem. Rękojeść typu nożowego robi więc różnicę formalną, a nie praktyczną.",
      "Nagel, czyli stalowy kolec wystający z boku jelca, przejmuje uderzenia schodzące po głowni. Prosty detal, który realnie ratuje palce.",
    ],
    highlights: [
      "Rękojeść nożowa z nitowanymi okładzinami",
      "Nagel chroniący grzbiet dłoni",
      "Lekki i zwinny — 1,05 kg",
      "Popularny wybór w rekonstrukcji mieszczańskiej",
    ],
    art: { blade: "curved", guard: "ring", pommel: "disc", grip: "#5a3b26", fitting: "blued", ratio: 0.88 },
  },
  {
    slug: "miecz-arming-zakonny",
    name: "Miecz zakonny „Malbork”",
    subtitle: "Jednoręczny miecz z krzyżem na głowicy",
    category: "jednoreczne",
    era: "XIV wiek",
    oakeshott: "Typ XIV",
    price: 1750,
    rating: 4.8,
    reviews: 61,
    stock: 5,
    edge: "tepa",
    steel: "EN45 (stal sprężynowa)",
    hardness: "50–52 HRC",
    specs: [
      { label: "Długość całkowita", value: "93 cm" },
      { label: "Długość głowni", value: "76 cm" },
      { label: "Szerokość przy jelcu", value: "5,6 cm" },
      { label: "Masa", value: "1,24 kg" },
      { label: "Punkt równowagi", value: "11 cm od jelca" },
      { label: "Rękojeść", value: "Skóra bydlęca, okucia srebrzone" },
    ],
    summary:
      "Krótka, szeroka i mocno zbieżna głownia typu XIV — broń późnego rycerstwa walczącego z kolczugą i wczesną płytą.",
    story: [
      "Typ XIV jest kompromisem: jeszcze tnie jak miecz rycerski, ale sztych jest już na tyle wzmocniony, by szukać przerw w pancerzu.",
      "Głowicę zdobi ryty krzyż zakonny, a jelec zakończono lekko rozszerzonymi ramionami. Detale wykończono ręcznie, więc każdy egzemplarz różni się drobiazgami.",
    ],
    highlights: [
      "Ręcznie ryty krzyż na głowicy",
      "Szeroka głownia z krótkim zbroczem",
      "Srebrzone okucia z patyną",
      "Pochwa dostępna jako dodatek",
    ],
    art: { blade: "taper", guard: "flared", pommel: "wheel", grip: "#6a2c22", fitting: "silver", ratio: 0.98 },
  },
  {
    slug: "sztylet-misericordia",
    name: "Sztylet „Misericordia”",
    subtitle: "Rycerski sztylet miłosierdzia",
    category: "sztylety",
    era: "XIV wiek",
    price: 590,
    rating: 4.6,
    reviews: 84,
    stock: 18,
    edge: "tepa",
    steel: "1060 (stal węglowa)",
    hardness: "50–52 HRC",
    specs: [
      { label: "Długość całkowita", value: "42 cm" },
      { label: "Długość głowni", value: "29 cm" },
      { label: "Szerokość przy jelcu", value: "2,8 cm" },
      { label: "Masa", value: "0,38 kg" },
      { label: "Punkt równowagi", value: "5 cm od jelca" },
      { label: "Rękojeść", value: "Drewno kryte skórą" },
    ],
    summary:
      "Wąski, sztywny sztylet o rombowym przekroju — uzupełnienie każdego zestawu rycerskiego.",
    story: [
      "Nazwa brzmi łagodniej niż zastosowanie: misericordia służyła do dobijania rannych przez szczeliny w pancerzu. Stąd wąska, sztywna głownia i minimalny jelec.",
      "Dziś to przede wszystkim element kompletu kolekcjonerskiego i rekonstrukcyjnego — lekki, precyzyjnie wyważony, świetny do ekspozycji obok miecza.",
    ],
    highlights: [
      "Rombowy przekrój głowni",
      "Pochwa skórzana w zestawie",
      "Lekka — 380 g",
      "Dopasowana stylistycznie do serii jednoręcznej",
    ],
    art: { blade: "narrow", guard: "short", pommel: "disc", grip: "#4b2f21", fitting: "blued", ratio: 0.45 },
  },
  {
    slug: "stojak-debowy-na-miecz",
    name: "Stojak dębowy na miecz",
    subtitle: "Ekspozycja pionowa, dwa poziomy",
    category: "sztylety",
    era: "Współczesny",
    price: 420,
    rating: 4.9,
    reviews: 112,
    stock: 24,
    edge: "tepa",
    steel: "Dąb olejowany + stal",
    hardness: "—",
    specs: [
      { label: "Wysokość", value: "78 cm" },
      { label: "Podstawa", value: "26 × 18 cm" },
      { label: "Masa", value: "2,1 kg" },
      { label: "Pojemność", value: "2 miecze" },
      { label: "Wykończenie", value: "Olej twardy woskowy" },
      { label: "Montaż", value: "Bez narzędzi" },
    ],
    summary:
      "Dębowy stojak z filcowanymi zaczepami — trzyma miecz pewnie i nie rysuje głowni.",
    story: [
      "Miecz źle podparty to miecz porysowany. Zaczepy wyłożono filcem, a kąt podparcia dobrano tak, by ciężar rozkładał się na jelec, a nie na krawędź.",
      "Dąb wykończono olejem twardym woskowym — matowym, odpornym na odciski palców.",
    ],
    highlights: [
      "Lity dąb, olej twardy woskowy",
      "Filcowane zaczepy chroniące głownię",
      "Montaż bez narzędzi",
      "Pasuje do mieczy do 140 cm",
    ],
    art: { blade: "taper", guard: "short", pommel: "disc", grip: "#6b4a2a", fitting: "brass", ratio: 0.6 },
  },
  {
    slug: "miecz-szeroki-grunwald",
    name: "Miecz „Grunwald”",
    subtitle: "Półtoraręczny miecz z prostym jelcem",
    category: "poltoraraczne",
    era: "Przełom XIV/XV w.",
    oakeshott: "Typ XVI",
    price: 2190,
    badge: "Ostatnie sztuki",
    rating: 4.7,
    reviews: 44,
    stock: 2,
    edge: "tepa",
    steel: "1075 (stal węglowa)",
    hardness: "50–52 HRC",
    specs: [
      { label: "Długość całkowita", value: "115 cm" },
      { label: "Długość głowni", value: "90 cm" },
      { label: "Szerokość przy jelcu", value: "4,9 cm" },
      { label: "Masa", value: "1,46 kg" },
      { label: "Punkt równowagi", value: "10 cm od jelca" },
      { label: "Rękojeść", value: "Skóra bydlęca na drewnie" },
    ],
    summary:
      "Hybryda: górna część głowni tnie jak typ XIV, dolna — sztywny romb — kłuje jak typ XV.",
    story: [
      "Typ XVI powstał, gdy płatnerze nie chcieli jeszcze rezygnować z cięcia, ale musieli już radzić sobie z płytą. Rozwiązanie: zbrocze i szeroki profil u nasady, romb przy sztychu.",
      "To jeden z najbardziej uniwersalnych układów w całej typologii — i bardzo wdzięczny do nauki podstaw fechtunku długiego miecza.",
    ],
    highlights: [
      "Dwustrefowa geometria głowni",
      "Uniwersalne wyważenie",
      "Prosty, mocny jelec o przekroju ósemkowym",
      "Ostatnie egzemplarze z serii",
    ],
    art: { blade: "taper", guard: "straight", pommel: "brazil", grip: "#4d3a2c", fitting: "silver", ratio: 1.15 },
  },
  {
    slug: "miecz-saksonski-witeź",
    name: "Miecz saksoński „Witeź”",
    subtitle: "Wczesnośredniowieczny miecz z mosiężnym jelcem",
    category: "wczesnosredniowieczne",
    era: "X wiek",
    price: 1590,
    rating: 4.6,
    reviews: 37,
    stock: 8,
    edge: "tepa",
    steel: "1065 (stal węglowa)",
    hardness: "50–52 HRC",
    specs: [
      { label: "Długość całkowita", value: "89 cm" },
      { label: "Długość głowni", value: "74 cm" },
      { label: "Szerokość przy jelcu", value: "5,2 cm" },
      { label: "Masa", value: "1,15 kg" },
      { label: "Punkt równowagi", value: "13 cm od jelca" },
      { label: "Rękojeść", value: "Jesion, owijka rzemieniem" },
    ],
    summary:
      "Prosty, użytkowy miecz o szerokiej głowni i mosiężnych okuciach, bez zdobień ponad to, co konieczne.",
    story: [
      "Nie każdy miecz z tej epoki był bogato zdobiony. Większość to narzędzia: solidna głownia, pewny chwyt, prosta oprawa.",
      "„Witeź” celowo trzyma się tej konwencji — mosiądz bez rytów, rzemień zamiast drutu, kształt zamiast ornamentu.",
    ],
    highlights: [
      "Surowa, użytkowa estetyka",
      "Mosiężne okucia bez zdobień",
      "Owijka rzemieniem — pewny chwyt",
      "Dobry wybór na start w rekonstrukcji",
    ],
    art: { blade: "leaf", guard: "short", pommel: "lobed", grip: "#7a5432", fitting: "brass", ratio: 0.9 },
  },
];

export const bySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

export const formatPLN = (value: number) =>
  new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 0,
  }).format(value);
