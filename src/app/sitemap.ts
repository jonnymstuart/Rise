import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { work } from "@/lib/work";
import { landingPages } from "@/lib/landing";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();

  const pages = ["", "/work", "/about", "/work-with-me", "/contact"].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
  }));

  const works = work.map((w) => ({
    url: `${base}/work/${w.slug}`,
    lastModified: now,
  }));

  // Only include indexable landing pages.
  const landers = landingPages
    .filter((l) => l.index)
    .map((l) => ({ url: `${base}/for/${l.slug}`, lastModified: now }));

  return [...pages, ...works, ...landers];
}
