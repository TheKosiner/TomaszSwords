import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/koszyk"] },
    sitemap: "https://tomaszswords.pl/sitemap.xml",
  };
}
