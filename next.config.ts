import type { NextConfig } from "next";

/**
 * GitHub Pages serwuje projekt pod ścieżką /<nazwa-repo>, dlatego basePath
 * ustawiamy zmienną środowiskową (workflow deploy.yml podaje "/TomaszSwords").
 * Lokalnie i przy własnej domenie zostaje pusty.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
