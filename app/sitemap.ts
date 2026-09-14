export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";
import { SITE_URL as BASE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/sklep", "/historia", "/stal", "/rzemioslo", "/o-nas", "/kontakt"];

  return [
    ...pages.map((path) => ({
      url: `${BASE}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...PRODUCTS.map((p) => ({
      url: `${BASE}/sklep/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
