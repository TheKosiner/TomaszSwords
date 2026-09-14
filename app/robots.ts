export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { BASE_PATH, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: [`${BASE_PATH}/koszyk`] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
