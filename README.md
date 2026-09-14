# Tomasz Swords

Sklep z mieczami średniowiecznymi — nowoczesny front w klimacie kuźni nocą,
z modelem 3D miecza rozkładanym na części, rozbudowaną sekcją wiedzy
(historia, stale, rzemiosło) i działającym koszykiem.

## Stack

| Warstwa | Technologia |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack, RSC) |
| Język | TypeScript |
| Style | Tailwind CSS 4 (tokeny w `app/globals.css`) |
| Animacje | `motion` (następca Framer Motion) |
| 3D | `three` + `@react-three/fiber` + `@react-three/drei` |
| Fonty | Cinzel (nagłówki) + Inter (tekst), przez `next/font` |

Cała zawartość jest statyczna — `next build` robi pełny eksport
(`output: "export"`) do katalogu `out/`, więc projekt hostuje się na
GitHub Pages albo dowolnym innym serwerze plików. Zero backendu.

## Uruchomienie

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # eksport statyczny do out/
```

## Deploy na GitHub Pages

W repo jest gotowy workflow `.github/workflows/deploy.yml`. Jednorazowa
konfiguracja:

1. **Settings → Pages → Build and deployment → Source: `GitHub Actions`**
   (nie „Deploy from a branch”).
2. Zmerguj tę gałąź do `main` — workflow odpala się na push do `main`
   lub `master`, można go też uruchomić ręcznie (`Actions → Run workflow`).
3. Po przejściu builda strona stoi pod
   `https://thekosiner.github.io/TomaszSwords/`.

### Dlaczego `basePath`

GitHub Pages serwuje projekt w podkatalogu `/<nazwa-repo>`, więc wszystkie
ścieżki muszą dostać prefiks. Workflow bierze go automatycznie z akcji
`actions/configure-pages` i podaje jako `NEXT_PUBLIC_BASE_PATH`:

```
NEXT_PUBLIC_BASE_PATH=/TomaszSwords npm run build
```

Po podpięciu własnej domeny `configure-pages` zwraca pusty prefiks, więc
**nie trzeba nic zmieniać w kodzie** — wystarczy dodać domenę w Settings → Pages.

Dodatkowo w konfiguracji siedzi `trailingSlash: true` (Pages serwuje wtedy
`/sklep/` z `sklep/index.html`), a w `public/` leży `.nojekyll`, bez którego
Jekyll wyciąłby katalog `_next`. Plik `out/404.html` Pages podstawia
automatycznie pod nieistniejące adresy.

### Lokalny podgląd wersji produkcyjnej

```bash
NEXT_PUBLIC_BASE_PATH=/TomaszSwords npm run build
mkdir -p .preview/TomaszSwords && cp -r out/. .preview/TomaszSwords/
cd .preview && python3 -m http.server 3000
# http://localhost:3000/TomaszSwords/
```

## Struktura

```
app/
  page.tsx            strona główna (hero 3D + 9 sekcji)
  sklep/              lista produktów z filtrami
  sklep/[slug]/       karta produktu (SSG dla każdego miecza)
  historia/           oś czasu, typologia Oakeshotta, mity kontra fakty
  stal/               gatunki stali, obróbka cieplna, konserwacja
  rzemioslo/          proces kucia, po co miecze dziś, konfigurator doboru
  o-nas/ kontakt/ koszyk/
components/
  three/              scena R3F: proceduralny model miecza + rozkładanie
  home/               sekcje strony głównej
  shop/               karta produktu, przeglądarka sklepu, koszyk
  content/            komponenty merytoryczne (typologia, tabela stali, wykres)
  ui/                 prymitywy animacji + wektorowy generator miecza
  site/               nagłówek, stopka, szuflada koszyka, iskry
lib/
  products.ts         katalog produktów (jedno źródło prawdy)
  cart.tsx            kontekst koszyka + zapis w localStorage
```

## Model 3D

`components/three/SwordModel.tsx` buduje miecz **proceduralnie** z geometrii
Three.js — nie ma żadnego pliku GLTF ani tekstur do pobrania:

- głownia: `ExtrudeGeometry` z obrysu 2D, z fazowaniem dającym soczewkowy przekrój,
- jelec: obrys z wyciętymi otworami w kształcie krzyża (`Shape.holes`),
- rękojeść: stożek ścięty + 13 pierścieni imitujących owijkę,
- głowica: krążek z rytem krzyża,
- pochwa: osobna bryła z trzewikiem i okuciami zawiesia.

Oświetlenie to `<Environment>` zbudowane z `Lightformer`ów — mapa otoczenia
powstaje lokalnie, bez pobierania HDRI z sieci. Przycisk „Rozłóż miecz”
rozsuwa części wzdłuż osi, odsłania trzpień i pokazuje etykiety opisowe.

Fallback: przy braku WebGL komponent renderuje wektorową ilustrację miecza.

## Ilustracje produktów

Zamiast zdjęć każdy produkt ma parametryczną ilustrację SVG generowaną przez
`components/ui/SwordArt.tsx` z pól `art` w `lib/products.ts`
(kształt głowni, typ jelca, typ głowicy, kolor rękojeści, ton okuć, proporcja).
Dodanie produktu = dopisanie obiektu do `PRODUCTS` — reszta (lista, filtry,
karta produktu, powiązane, koszyk, sitemap) podłącza się sama.

## Dostępność i wydajność

- pełne wsparcie `prefers-reduced-motion` (animacje i przewijanie poziome),
- każdy stan interaktywny ma etykietę ARIA, kontrolki działają z klawiatury,
- brak przepełnienia w poziomie od 390 px wzwyż,
- koszyk działa też przy zablokowanym `localStorage` (tryb prywatny).

## Do podpięcia przed startem

Formularze i płatności są dziś atrapami działającymi po stronie klienta:

- `components/site/ContactForm.tsx` — wysyłka wiadomości,
- `components/shop/CartPage.tsx` — bramka płatnicza,
- `components/home/CallToAction.tsx` — zapis do newslettera.

Dane teleadresowe w `app/kontakt/page.tsx` i stopce są przykładowe.
