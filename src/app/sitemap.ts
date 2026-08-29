import type { MetadataRoute } from "next";

import { projects, site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries = projects.map((project) => ({
    url: `${site.url}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: project.featured ? 0.8 : 0.5,
  }));

  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${site.url}/work`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${site.url}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projectEntries,
  ];
}
