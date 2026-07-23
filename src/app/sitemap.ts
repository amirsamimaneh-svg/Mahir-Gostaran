import type { MetadataRoute } from "next";
import { ARTICLES } from "@/data/blog";
import { CASES } from "@/data/portfolio";

export const dynamic = "force-static";

const SITE = "https://mahir.ir";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = ["", "/about", "/submit", "/privacy", "/terms"].map((path) => ({
    url: `${SITE}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const portfolio = CASES.map((c) => ({
    url: `${SITE}/portfolio/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blog = ARTICLES.map((a) => ({
    url: `${SITE}/blog/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...portfolio, ...blog];
}
