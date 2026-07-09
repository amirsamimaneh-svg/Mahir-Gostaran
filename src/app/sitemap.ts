import { MetadataRoute } from "next";
import { posts } from "@/data/posts";
import { projects } from "@/data/projects";

const BASE = "https://mahir.ir";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${BASE}/blog`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${BASE}/portfolio`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/pricing`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/consult`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${BASE}/about`, priority: 0.7, changeFrequency: "monthly" as const },
  ];

  const blogPages = posts.map(p => ({
    url: `${BASE}/blog/${p.slug}`,
    priority: 0.7,
    changeFrequency: "yearly" as const,
  }));

  const portfolioPages = projects.map(p => ({
    url: `${BASE}/portfolio/${p.slug}`,
    priority: 0.6,
    changeFrequency: "yearly" as const,
  }));

  return [...staticPages, ...blogPages, ...portfolioPages];
}
