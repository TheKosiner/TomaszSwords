/**
 * Publiczny adres strony. Na GitHub Pages ustawiany w workflow, docelowo
 * podmieniany na własną domenę.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tomaszswords.pl"
).replace(/\/$/, "");

/** Prefiks ścieżki na GitHub Pages (np. "/TomaszSwords"); pusty przy własnej domenie. */
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
