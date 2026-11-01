import type { MetadataRoute } from "next";

const base = "https://www.paulskidmoreii.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-31");
  return [
    { url: `${base}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/work/boldx`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/pricing`, lastModified, changeFrequency: "monthly", priority: 0.7 },
  ];
}
