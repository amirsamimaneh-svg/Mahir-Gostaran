import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE = "https://mahir.ir";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/thank-you"],
    },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
